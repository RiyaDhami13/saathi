
import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { Facility } from "@/lib/types";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Facilities fetch error:", error.message);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch healthcare facilities",
        },
        { status: 500 }
      );
    }

    const facilities = (data ?? []) as Facility[];

    return NextResponse.json({
      success: true,
      count: facilities.length,
      facilities,
    });
  } catch (error) {
    console.error("Unexpected API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
