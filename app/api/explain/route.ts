import { explainAsContract } from "@/lib/aiAdapter";
import type { Lang, ReadItem } from "@/lib/types";

const TYPES = ["medicine", "test", "instruction", "other"];

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const raw = (typeof body === "object" && body !== null ? body : {}) as {
      items?: unknown;
      lang?: unknown;
    };
    const lang: Lang = raw.lang === "ne" ? "ne" : "en";
    if (!Array.isArray(raw.items) || raw.items.length === 0 || raw.items.length > 20) {
      return Response.json({ error: "Items required." }, { status: 400 });
    }
    const items: ReadItem[] = [];
    for (const it of raw.items) {
      const o = (typeof it === "object" && it !== null ? it : {}) as Record<string, unknown>;
      if (typeof o.id !== "string" || typeof o.text !== "string" || !o.text.trim() || o.text.length > 500) {
        return Response.json({ error: "Bad item." }, { status: 400 });
      }
      const type = TYPES.includes(o.type as string) ? (o.type as ReadItem["type"]) : "other";
      items.push({ id: o.id, text: o.text, type });
    }
    return Response.json(await explainAsContract(items, lang));
  } catch (error) {
    console.error("explain error:", error);
    return Response.json({ error: "Could not explain" }, { status: 502 });
  }
}
