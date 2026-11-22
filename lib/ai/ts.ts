
import { GoogleGenAI } from "@google/genai";

import type {
  AIProvider,
  ReadItem,
  ExplainResponse,
} from "../types";

// --------------------------------------------------
// PROVIDER CONFIGURATION
// --------------------------------------------------

function getProvider(): AIProvider {
  const provider = (
    process.env.AI_PROVIDER || "gemini"
  ).toLowerCase();

  if (
    provider !== "gemini" &&
    provider !== "groq" &&
    provider !== "cohere"
  ) {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }

  return provider;
}

// --------------------------------------------------
// GEMINI
// --------------------------------------------------

async function callGemini(
  systemPrompt: string,
  prompt: string,
  image?: { mimeType: string; data: string }
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const contents = image
  ? [
      {
        role: "user" as const,
        parts: [
          { text: `${systemPrompt}\n\n${prompt}` },
          {
            inlineData: {
              mimeType: image.mimeType,
              data: image.data,
            },
          },
        ],
      },
    ]
  : `${systemPrompt}\n\n${prompt}`;

const response = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents,
});

  const result = response.text;

  if (!result) {
    throw new Error("Gemini returned an empty response.");
  }

  return result;
}

// --------------------------------------------------
// GROQ
// --------------------------------------------------

async function callGroq(
  systemPrompt: string,
  prompt: string,
  image?: { mimeType: string; data: string }
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing.");
  }

  const userContent = image
    ? [
        {
          type: "text",
          text: prompt,
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${image.mimeType};base64,${image.data}`,
          },
        },
      ]
    : prompt;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: image
          ? "meta-llama/llama-4-scout-17b-16e-instruct"
          : "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userContent,
          },
        ],
        temperature: 0.2,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Groq error (${response.status}): ${await response.text()}`
    );
  }

  const data = await response.json();

  const result = data.choices?.[0]?.message?.content;

  if (typeof result !== "string" || !result) {
    throw new Error("Groq returned an empty response.");
  }

  return result;
}

// --------------------------------------------------
// COHERE
// --------------------------------------------------

async function callCohere(
  systemPrompt: string,
  prompt: string
): Promise<string> {
  const apiKey = process.env.COHERE_API_KEY;

  if (!apiKey) {
    throw new Error("COHERE_API_KEY is missing.");
  }

  const response = await fetch(
    "https://api.cohere.com/v2/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "command-a-03-2025",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Cohere error (${response.status}): ${await response.text()}`
    );
  }

  const data = await response.json();

  const result = data.message?.content
    ?.filter((part: { type?: string }) => part.type === "text")
    .map((part: { text?: string }) => part.text || "")
    .join("");

  if (!result) {
    throw new Error("Cohere returned an empty response.");
  }

  return result;
}

// --------------------------------------------------
// COMMON AI FUNCTION
// --------------------------------------------------

async function generateAI(
  systemPrompt: string,
  prompt: string,
  image?: { mimeType: string; data: string }
): Promise<string> {
  const provider = getProvider();

  switch (provider) {
    case "gemini":
      return callGemini(systemPrompt, prompt, image);

    case "groq":
      return callGroq(systemPrompt, prompt, image);

    case "cohere":
      if (image) {
        throw new Error(
          "Cohere image reading is not enabled in this implementation. Select Gemini or Groq for images."
        );
      }

      return callCohere(systemPrompt, prompt);
  }
}

// --------------------------------------------------
// JSON PARSER
// --------------------------------------------------

function parseAIJson(output: string): Record<string, unknown> {
  const cleaned = output
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("AI did not return valid JSON.");
  }

  return JSON.parse(
    cleaned.slice(start, end + 1)
  ) as Record<string, unknown>;
}

// --------------------------------------------------
// FUNCTION 1: READ DOCUMENT
// --------------------------------------------------

export async function readDocument(
  input: string | File
): Promise<ReadItem[]> {
  let content: string;

  if (typeof input === "string") {
    content = input;
  } else if (input.type.startsWith("text/")) {
    content = await input.text();
  } else if (input.type.startsWith("image/")) {
    const buffer = Buffer.from(
      await input.arrayBuffer()
    );

    const base64 = buffer.toString("base64");

    content = await generateAI(
      "You are a document reading assistant. Extract all readable text accurately. Do not invent missing information.",
      "Extract and transcribe all readable text from this image.",
      {
        mimeType: input.type,
        data: base64,
      }
    );
  } else {
    throw new Error("Unsupported document type.");
  }

  if (!content.trim()) {
    throw new Error("No readable content found.");
  }

  return [
    {
      label: "Extracted Document",
      value: content,
      confidence: 1,
      status: "success",
    },
  ];
}

// --------------------------------------------------
// FUNCTION 2: EXPLAIN DOCUMENT
// --------------------------------------------------

export async function explainItems(
  items: ReadItem[]
): Promise<ExplainResponse> {
  if (!items.length) {
    throw new Error("No document items provided.");
  }

  const systemPrompt = `
    You are Saathi AI, a helpful educational assistant.

    Explain document content using simple language.

    Return ONLY valid JSON with these fields:

    {
      "summary": "A short summary",
      "explanations": [
        "Explanation 1",
        "Explanation 2"
      ],
      "safetyReminder": "A useful reminder"
    }

    The explanations field must be an array of strings.
    Do not include Markdown code fences.
  `;

  const prompt = `
    Explain the following document content clearly.

    ${JSON.stringify(items)}
  `;

  const output = await generateAI(
    systemPrompt,
    prompt
  );

  const result = parseAIJson(output);

  if (
    typeof result.summary !== "string" ||
    !Array.isArray(result.explanations) ||
    !result.explanations.every(
      (item) => typeof item === "string"
    ) ||
    typeof result.safetyReminder !== "string"
  ) {
    throw new Error(
      "AI returned an unexpected explanation format."
    );
  }

  return {
    language: "en",
    summary: result.summary,
    explanations: result.explanations,
    safetyReminder: result.safetyReminder,
    demoMode: false,
  };
}
