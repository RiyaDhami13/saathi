
import { NextRequest, NextResponse } from "next/server";
import { readDocument } from "../../../lib/ai/ts";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let input: string | File;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");

      if (!(file instanceof File)) {
        return NextResponse.json(
          { error: "File is required." },
          { status: 400 }
        );
      }

      if (
        !file.type.startsWith("image/") &&
        !file.type.startsWith("text/")
      ) {
        return NextResponse.json(
          { error: "Only image and text files are supported." },
          { status: 415 }
        );
      }

      input = file;
    } else if (contentType.includes("application/json")) {
      const body = await req.json();

      if (
        typeof body.text !== "string" ||
        !body.text.trim()
      ) {
        return NextResponse.json(
          { error: "Valid text is required." },
          { status: 400 }
        );
      }

      input = body.text;
    } else {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 415 }
      );
    }

    const items = await readDocument(input);

    return NextResponse.json(
      { items },
      { status: 200 }
    );
  } catch (error) {
    console.error("Read document error:", error);

    return NextResponse.json(
      { error: "Failed to read document." },
      { status: 500 }
    );
  }
}
