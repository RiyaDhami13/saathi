import type { Facility } from "@/lib/types";

export type FacilityQueryResult = {
  data: Facility[] | null;
  error: { message: string } | null;
};

export type FacilityLoader = (
  district: string | null
) => PromiseLike<FacilityQueryResult>;

export function applyDistrictFilter<Query extends {
  eq(column: "district", value: string): Query;
}>(query: Query, district: string | null): Query {
  return district === null ? query : query.eq("district", district);
}

export async function handleFacilitiesRequest(
  request: Request,
  loadFacilities: FacilityLoader
): Promise<Response> {
  try {
    const district = new URL(request.url).searchParams.get("district");
    const { data, error } = await loadFacilities(district);

    if (error) {
      console.error("Facilities fetch error:", error.message);

      return Response.json(
        {
          success: false,
          message: "Failed to fetch healthcare facilities",
        },
        { status: 500 }
      );
    }

    const facilities = data ?? [];

    return Response.json({
      success: true,
      count: facilities.length,
      facilities,
    });
  } catch (error) {
    console.error("Unexpected API error:", error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
