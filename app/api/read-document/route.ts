import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: false, error: "Document reading service is not implemented." },
    { status: 501 }
  );
}