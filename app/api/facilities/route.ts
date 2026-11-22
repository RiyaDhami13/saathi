
import { supabase } from "@/lib/db";
import {
  applyDistrictFilter,
  handleFacilitiesRequest,
} from "@/lib/facilities-handler";

export async function GET(request: Request) {
  return handleFacilitiesRequest(request, async (district) => {
    let query = supabase.from("facilities").select("*");
    query = applyDistrictFilter(query, district);
    return await query.order("name", { ascending: true });
  });
}
