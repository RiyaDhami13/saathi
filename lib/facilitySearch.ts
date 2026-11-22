import type { Facility } from "@/lib/types";

// Everyday words mapped to the specialty words used in the facility data.
const SYNONYMS: Record<string, string[]> = {
  heart: ["cardio"],
  cardiologist: ["cardio"],
  child: ["pediatric"],
  children: ["pediatric"],
  baby: ["pediatric", "maternity"],
  pregnancy: ["maternity"],
  delivery: ["maternity"],
  bone: ["ortho"],
  fracture: ["ortho"],
  eye: ["ophthal"],
  tooth: ["dental"],
  teeth: ["dental"],
  xray: ["radiology", "x-ray"],
  "x-ray": ["radiology", "x-ray"],
  scan: ["radiology"],
  ultrasound: ["radiology"],
  blood: ["laboratory"],
  test: ["laboratory"],
  lab: ["laboratory"],
  kidney: ["dialysis", "nephro"],
  accident: ["emergency"],
};

const FILLER = new Set(["doctor", "dr", "specialist", "expert", "hospital", "clinic", "for", "a", "the"]);

export function matchesQuery(f: Facility, query: string): boolean {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t && !FILLER.has(t));
  if (tokens.length === 0) return true;
  const haystack = `${f.name} ${f.specialties.join(" ")}`.toLowerCase();
  return tokens.some(
    (tok) => haystack.includes(tok) || (SYNONYMS[tok] ?? []).some((s) => haystack.includes(s)),
  );
}