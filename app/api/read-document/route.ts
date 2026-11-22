import { readDocumentAsItems } from "@/lib/aiAdapter";

const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "File is required." }, { status: 400 });
    }
    if (!file.type.startsWith("image/") && !file.type.startsWith("text/")) {
      return Response.json({ error: "Only image or text files." }, { status: 415 });
    }
    if (file.size > MAX_BYTES) {
      return Response.json({ error: "File too large." }, { status: 413 });
    }
    const items = await readDocumentAsItems(file);
    return Response.json({ items });
  } catch (error) {
    console.error("read-document error:", error);
    return Response.json({ error: "Could not read document" }, { status: 502 });
  }
}
