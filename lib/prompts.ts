
import type { Language, ReadItem } from "./types";

export function documentPrompt(text: string) {
  return `
You are Saathi, a helpful document reading assistant.

Read the following document:

${text}

Return only valid JSON:
{
  "items": [
    {
      "label": "Field name",
      "value": "Extracted information",
      "confidence": 95,
      "status": "verified"
    }
  ]
}

Never invent missing information.
Use "Unclear" if information cannot be read.
`;
}

export function imagePrompt() {
  return `
Read the uploaded document image carefully.

Return only valid JSON:
{
  "items": [
    {
      "label": "Field name",
      "value": "Extracted information",
      "confidence": 95,
      "status": "verified"
    }
  ]
}

Do not guess unreadable information.
`;
}

export function explanationPrompt(
  items: ReadItem[],
  language: Language
) {
  return `
You are Saathi, a helpful AI assistant.

Explain the following information in ${
    language === "ne" ? "Nepali" : "English"
  }.

Information:
${JSON.stringify(items)}

Return only valid JSON:
{
  "summary": "Simple summary",
  "explanations": ["Explanation 1"],
  "safetyReminder": "Appropriate reminder"
}

Use simple language.
Never invent information.
Do not diagnose or prescribe medicines.
`;
}
