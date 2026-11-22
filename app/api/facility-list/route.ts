import { connection } from "next/server";
import { loadContractFacilities } from "@/lib/facilityAdapter";

export async function GET() {
  await connection();
  try {
    const facilities = await loadContractFacilities();
    return Response.json({ facilities });
  } catch (error) {
    console.error("facility-list error:", error);
    return Response.json({ error: "Could not load facilities" }, { status: 500 });
  }
}
