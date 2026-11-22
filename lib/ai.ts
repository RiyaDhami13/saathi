import {
  documentPrompt,
  explanationPrompt,
} from "./prompts";

import type {
  AIProvider,
  Language,
  ReadItem,
} from "./types";

const provider = (
  process.env.AI_PROVIDER || "gemini"
).toLowerCase() as AIProvider;

async function callAI(prompt: string): Promise<string> {
  if (provider === "gemini") {
    return callGemini(prompt);
  }

  if (provider === "groq") {
    return callGroq(prompt);
  }

  if (provider === "cohere") {
    return callCohere(prompt);
  }

  throw new Error("Unsupported AI provider");
}

// GEMINI
async function callGemini(prompt: string) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) throw new Error("Gemini API key missing");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash lite:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini error: ${await response.text()}`);
  }

  const data = await response.json();

  return data.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text || "")
    .join("") || "";
}

// GROQ
async function callGroq(prompt: string) {
  const key = process.env.GROQ_API_KEY;

  if (!key) throw new Error("Groq API key missing");

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Groq error: ${await response.text()}`);
  }

  const data = await response.json();

  return data.choices?.[0]?.message?.content || "";
}

// COHERE
async function callCohere(prompt: string) {
  const key = process.env.COHERE_API_KEY;

  if (!key) throw new Error("Cohere API key missing");

  const response = await fetch(
    "https://api.cohere.com/v2/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "command-a-03-2025",
        messages: [
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
    throw new Error(`Cohere error: ${await response.text()}`);
  }

  const data = await response.json();

  return data.message?.content
    ?.filter((p: { type?: string }) => p.type === "text")
    ?.map((p: { text?: string }) => p.text || "")
    .join("") || "";
}

// PARSE AI JSON
function parseResponse(response: string) {
  const cleaned = response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Invalid AI response");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

// EXTRACT TEXT
export async function extractDocumentText(text: string) {
  const response = await callAI(documentPrompt(text));

  const data = parseResponse(response);

  if (!Array.isArray(data.items)) {
    throw new Error("Invalid document response");
  }

  return data.items as ReadItem[];
}

// EXPLAIN DOCUMENT
export async function explainDocument(
  items: ReadItem[],
  language: Language
) {
  const prompt = explanationPrompt(items, language);

  const response = await callAI(prompt);

  const data = parseResponse(response);

  return {
    summary: data.summary,
    explanations: data.explanations,
    safetyReminder: data.safetyReminder,
  };
}
