import type { ReadItem } from "@/lib/types";
import { isReadItem } from "@/lib/guards";

const KEY = "saathi_items";

export function saveItems(items: ReadItem[]): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage blocked: the next screen falls back to mocks */
  }
}

export function loadItems(): ReadItem[] | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 && parsed.every(isReadItem)
      ? parsed
      : null;
  } catch {
    return null;
  }
}