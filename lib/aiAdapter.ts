import {
  readDocument,
  explainItems,
  type ReadItem as KapilItem,
} from "@/lib/kapilAi";
import type { ExplainResponse, Lang, ReadItem } from "@/lib/types";

const DISCLAIMER: Record<Lang, string> = {
  en: "This only explains words. It does not diagnose or change treatment. Ask your doctor or pharmacist.",
  ne: "यसले शब्दको अर्थ मात्र बताउँछ। यसले रोग निदान गर्दैन र उपचार बदल्दैन। आफ्नो डाक्टर वा फार्मासिस्टसँग सोध्नुहोस्।",
};

const DOCTOR_NOTE: Record<Lang, string> = {
  en: "Ask your doctor or pharmacist to confirm this.",
  ne: "यसबारे आफ्नो डाक्टर वा फार्मासिस्टसँग सोध्नुहोस्।",
};

function guessType(line: string): ReadItem["type"] {
  if (/\b(tab|tabs|tablet|cap|capsule|syrup|syp|inj|injection|cream|ointment|drops?|mg|ml)\b/i.test(line)) return "medicine";
  if (/\b(test|blood|urine|x-?ray|scan|ecg|ultrasound|usg|cbc|sugar|hb|hemoglobin|haemoglobin|leucocyte|neutrophil|lymphocyte|eosinophil|monocyte|basophil|platelets?|rbc|wbc|hct|mcv|mch|mchc|count|sgpt|sgot|alp|creatinine|urea|glucose)\b/i.test(line)) return "test";
  if (/\b(daily|twice|once|before|after|food|days?|rest|avoid|drink|water)\b/i.test(line)) return "instruction";
  return "other";
}

const NOISE_LINE = /^[\d.,\s\-–\/%]*$|^[HL]\s*[\d.]+$|^(g\/dl|\/?cumm|mg\/dl|%|fl|pg)$/i;

const SKIP_LINE =
  /^(here is|here are|below is|sure|okay|the following|note:)|^(patient|name|sex|age|doctor|dr\.?|reg|pan|project|sample|header|address|phone|date|time|collected|ref)\b|transcription|document information|patient information/i;

function cleanLine(raw: string): string {
  return raw
    .replace(/[*#_`>]+/g, "")
    .replace(/^\s*(?:[•-]+|\d+[.)])\s*/, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

export async function readDocumentAsItems(file: File): Promise<ReadItem[]> {
  const [doc] = await readDocument(file);
  const lines = (doc?.value ?? "")
    .split(/\r?\n/)
    .map(cleanLine)
    .filter((l) => l.length > 3 && !l.endsWith(":") && !SKIP_LINE.test(l) && !NOISE_LINE.test(l))
    .slice(0, 12);
  if (lines.length === 0) throw new Error("No readable lines");
  return lines.map((text, i) => ({ id: String(i + 1), text, type: guessType(text) }));
}

export async function explainAsContract(items: ReadItem[], lang: Lang): Promise<ExplainResponse> {
  const kItems: KapilItem[] = items.map((it) => ({
    label: it.type,
    value: it.text,
    confidence: 1,
    status: "success",
  }));
  const r = await explainItems(kItems, lang);
  return {
    summary: r.summary,
    items: items.map((it, i) => ({
      id: it.id,
      plain: r.explanations[i] ?? r.explanations.join(" "),
      doctorNote: DOCTOR_NOTE[lang],
    })),
    disclaimer: DISCLAIMER[lang],
  };
}
