
import { NextResponse } from "next/server";
import { getFacilities } from "@/lib/facilities";

export async function GET() {
  try {
    const facilities = await getFacilities();

    return NextResponse.json({
      success: true,
      count: facilities.length,
      facilities,
    });
  } catch (error) {
    console.error("Facility test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not fetch facilities",
      },
      { status: 500 }
    );
  }
}
