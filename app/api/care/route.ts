
import { NextResponse } from "next/server";
import {
  getFacilitiesByCondition,
  getFacilitiesBySpecialty,
  getFacilityServices,
} from "@/lib/facilities";
import { getDistanceKm } from "@/lib/distance";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate the search condition
    const condition =
      typeof body.condition === "string"
        ? body.condition.trim()
        : "";

    const district =
      typeof body.district === "string"
        ? body.district.trim()
        : "";

    if (!condition) {
      return NextResponse.json(
        { success: false, error: "Please enter a condition or specialty." },
        { status: 400 }
      );
    }

    // 2. Check whether valid location coordinates were provided
    const hasCoordinates =
      Number.isFinite(body.latitude) &&
      Number.isFinite(body.longitude) &&
      body.latitude >= -90 &&
      body.latitude <= 90 &&
      body.longitude >= -180 &&
      body.longitude <= 180;

    // 3. Search by both condition and specialty
    const [conditionResults, specialtyResults] =
      await Promise.all([
        getFacilitiesByCondition(condition),
        getFacilitiesBySpecialty(condition),
      ]);

    // 4. Combine results and remove duplicate facilities
    const combined = [
      ...conditionResults,
      ...specialtyResults,
    ];

    const uniqueFacilities = Array.from(
      new Map(
        combined.map((facility) => [
          facility.id,
          facility,
        ])
      ).values()
    );

    // 5. Apply the district filter, if provided
    const filteredFacilities = uniqueFacilities.filter(
      (facility) =>
        !district ||
        facility.district?.toLowerCase() ===
          district.toLowerCase()
    );

    // 6. Add matching specialty and distance
    const results = await Promise.all(
      filteredFacilities.map(async (facility) => {
        const services = await getFacilityServices(facility.id);

        const matchedService = services.find((service) => {
          const specialty =
            service.specialty?.toLowerCase() ?? "";
          const serviceCondition =
            service.condition?.toLowerCase() ?? "";
          const search = condition.toLowerCase();

          return (
            specialty.includes(search) ||
            serviceCondition.includes(search)
          );
        });

        let distance_km: number | null = null;

        if (
          hasCoordinates &&
          facility.latitude != null &&
          facility.longitude != null
        ) {
          distance_km = getDistanceKm(
            body.latitude,
            body.longitude,
            facility.latitude,
            facility.longitude
          );
        }

        return {
          ...facility,
          distance_km,
          matched_specialty:
            matchedService?.specialty ?? null,
        };
      })
    );

    // 7. Sort by distance when location is available.
    // Otherwise, show 24-hour emergency facilities first.
    results.sort((a, b) => {
      if (hasCoordinates) {
        if (a.distance_km === null && b.distance_km !== null) {
          return 1;
        }

        if (a.distance_km !== null && b.distance_km === null) {
          return -1;
        }

        if (
          a.distance_km !== null &&
          b.distance_km !== null &&
          a.distance_km !== b.distance_km
        ) {
          return a.distance_km - b.distance_km;
        }
      }

      return Number(b.emergency_24h) -
        Number(a.emergency_24h);
    });

    return NextResponse.json({
      success: true,
      facilities: results,
    });
  } catch (error) {
    console.error("Care API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to search facilities. Please try again.",
      },
      { status: 500 }
    );
  }
}
