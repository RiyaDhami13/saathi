import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET() {
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .limit(5);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Supabase connected successfully!",
    facilities: data,
  });
}