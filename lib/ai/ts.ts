
import OpenAI from "openai";
import type {
  ReadItem,
  ExplainResponse,
} from "../types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// FUNCTION 1: Read document
export async function readDocument(
  input: string | File
): Promise<ReadItem[]> {

  let content: string;

  if (typeof input === "string") {
    content = input;
  } else if (input.type.startsWith("text/")) {
    content = await input.text();
  } else if (input.type.startsWith("image/")) {
    const buffer = Buffer.from(await input.arrayBuffer());
    const base64 = buffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract and transcribe all readable text from this image.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${input.type};base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    content = response.choices[0].message.content || "";
  } else {
    throw new Error("Unsupported document type");
  }

  return [
    {
      id: crypto.randomUUID(),
      type: typeof input === "string" ||
        input.type.startsWith("text/")
        ? "text"
        : "image",
      content,
    },
  ];
}

// FUNCTION 2: Explain document
export async function explainItems(
  items: ReadItem[]
): Promise<ExplainResponse> {

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
          You are a helpful educational assistant.
          Explain document content in simple language.
          Return valid JSON with:
          title, summary, and explanations.
          Each explanation must contain itemId and explanation.
        `,
      },
      {
        role: "user",
        content: JSON.stringify(items),
      },
    ],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(
    response.choices[0].message.content || "{}"
  );

  return result as ExplainResponse;
}
