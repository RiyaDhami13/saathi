import { supabase } from "@/lib/db";
import type { Facility } from "@/lib/types";

type FacilityRow = {
  id: number | string;
  name: string | null;
  district: string | null;
  phone: string | null;
  emergency_24h: boolean | null;
  latitude: number | null;
  longitude: number | null;
};

type ServiceRow = { facility_id: number | string; specialty: string | null };

function toDistrict(value: string | null): Facility["district"] | null {
  const v = (value ?? "").toLowerCase();
  if (v.includes("kanchan")) return "Kanchanpur";
  if (v.includes("kailali")) return "Kailali";
  return null;
}

export async function loadContractFacilities(): Promise<Facility[]> {
  const [fac, svc] = await Promise.all([
    supabase
      .from("facilities")
      .select("id,name,district,phone,emergency_24h,latitude,longitude")
      .order("name"),
    supabase.from("services").select("facility_id,specialty"),
  ]);
  if (fac.error) throw fac.error;

  const specialtiesById = new Map<string, Set<string>>();
  if (!svc.error) {
    for (const s of (svc.data ?? []) as ServiceRow[]) {
      const key = String(s.facility_id);
      const text = (s.specialty ?? "").trim();
      if (!text) continue;
      if (!specialtiesById.has(key)) specialtiesById.set(key, new Set());
      specialtiesById.get(key)!.add(text);
    }
  }

  const result: Facility[] = [];
  for (const row of (fac.data ?? []) as FacilityRow[]) {
    const district = toDistrict(row.district);
    const lat = Number(row.latitude);
    const lng = Number(row.longitude);
    if (!district || !row.name) continue;
    if (row.latitude == null || row.longitude == null) continue;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    result.push({
      id: String(row.id),
      name: row.name,
      district,
      phone: row.phone ?? "",
      emergency_24h: row.emergency_24h === true,
      specialties: [...(specialtiesById.get(String(row.id)) ?? [])],
      lat,
      lng,
    });
  }
  return result;
}
