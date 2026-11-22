import type { ExplainResponse, Facility, ReadItem } from "@/lib/types";

export const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const ITEM_TYPES: readonly string[] = ["medicine", "test", "instruction", "other"];

export function isReadItem(v: unknown): v is ReadItem {
  return (
    isRecord(v) &&
    typeof v.id === "string" &&
    typeof v.text === "string" &&
    typeof v.type === "string" &&
    ITEM_TYPES.includes(v.type)
  );
}

export function isExplainResponse(v: unknown): v is ExplainResponse {
  return (
    isRecord(v) &&
    typeof v.summary === "string" &&
    typeof v.disclaimer === "string" &&
    Array.isArray(v.items) &&
    (v.items as unknown[]).every(
      (i) =>
        isRecord(i) &&
        typeof i.id === "string" &&
        typeof i.plain === "string" &&
        typeof i.doctorNote === "string",
    )
  );
}

export function isFacility(v: unknown): v is Facility {
  return (
    isRecord(v) &&
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    (v.district === "Kanchanpur" || v.district === "Kailali") &&
    typeof v.phone === "string" &&
    typeof v.emergency_24h === "boolean" &&
    Array.isArray(v.specialties) &&
    (v.specialties as unknown[]).every((s) => typeof s === "string") &&
    typeof v.lat === "number" &&
    typeof v.lng === "number"
  );
}