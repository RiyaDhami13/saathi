import type { ReadItem } from "@/lib/types";

export const newId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const TEST_WORDS = /\b(test|cbc|blood|urine|x-?ray|ultrasound|scan|sugar|glucose|ecg)\b/i;

/** A rough first guess only. The user can see and fix it on the confirm screen. */
export function makeItem(text: string): ReadItem {
  return { id: newId(), text, type: TEST_WORDS.test(text) ? "test" : "medicine" };
}

export function parseQuery(query: string): ReadItem[] {
  return query
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(makeItem);
}