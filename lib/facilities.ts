
import { supabase } from "@/lib/db";

export interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;
  phone: string | null;
  emergency_24h: boolean;
  latitude: number | null;
  longitude: number | null;
  opening_hours: string | null;
  website: string | null;
}

export interface FacilityService {
  facility_id: number;
  specialty: string;
  condition: string | null;
  days_available: string | null;
}

export interface Doctor {
  doctor_id: number;
  facility_id: number;
  doctor_name: string;
  qualification: string | null;
  specialty: string | null;
  nmc_no: number | null;
  days_available: string | null;
  time: string | null;
}

export interface FacilityHour {
  facility_id: number;
  day: string;
  open_time: string | null;
  close_time: string | null;
}

export interface FacilityPrice {
  facility_id: number;
  service_en: string;
  service_ne: string | null;
  min_price_npr: string | null;
  max_price_npr: string | null;
  confidence: string | null;
}

// ================================
// 1. GET ALL FACILITIES
// ================================

export async function getFacilities(): Promise<Facility[]> {
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .order("name");

  if (error) throw error;

  return (data ?? []) as Facility[];
}

// ================================
// 2. GET FACILITY BY ID
// ================================

export async function getFacilityById(
  id: number
): Promise<Facility> {
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Facility;
}

// ================================
// 3. SEARCH FACILITIES
// ================================

export async function searchFacilities(
  searchTerm: string
): Promise<Facility[]> {
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .ilike("name", `%${searchTerm}%`)
    .order("name");

  if (error) throw error;

  return (data ?? []) as Facility[];
}

// ================================
// 4. FILTER BY DISTRICT
// ================================

export async function getFacilitiesByDistrict(
  district: string
): Promise<Facility[]> {
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .ilike("district", district)
    .order("name");

  if (error) throw error;

  return (data ?? []) as Facility[];
}

// ================================
// 5. GET FACILITY SERVICES
// ================================

export async function getFacilityServices(
  facilityId: number
): Promise<FacilityService[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("facility_id", facilityId);

  if (error) throw error;

  return (data ?? []) as FacilityService[];
}

// ================================
// 6. FIND FACILITIES BY SPECIALTY
// ================================

export async function getFacilitiesBySpecialty(
  specialty: string
): Promise<Facility[]> {
  const { data: services, error: serviceError } =
    await supabase
      .from("services")
      .select("facility_id")
      .ilike("specialty", `%${specialty}%`);

  if (serviceError) throw serviceError;

  const ids = [
    ...new Set((services ?? []).map((item) => item.facility_id)),
  ];

  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .in("id", ids)
    .order("name");

  if (error) throw error;

  return (data ?? []) as Facility[];
}

// ================================
// 7. FIND FACILITIES BY CONDITION
// ================================

export async function getFacilitiesByCondition(
  condition: string
): Promise<Facility[]> {
  const { data: services, error: serviceError } =
    await supabase
      .from("services")
      .select("facility_id")
      .ilike("condition", `%${condition}%`);

  if (serviceError) throw serviceError;

  const ids = [
    ...new Set((services ?? []).map((item) => item.facility_id)),
  ];

  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .in("id", ids)
    .order("name");

  if (error) throw error;

  return (data ?? []) as Facility[];
}

// ================================
// 8. GET DOCTORS BY FACILITY
// ================================

export async function getFacilityDoctors(
  facilityId: number
): Promise<Doctor[]> {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("facility_id", facilityId)
    .order("doctor_name");

  if (error) throw error;

  return (data ?? []) as Doctor[];
}

// ================================
// 9. GET FACILITY OPENING HOURS
// ================================

export async function getFacilityHours(
  facilityId: number
): Promise<FacilityHour[]> {
  const { data, error } = await supabase
    .from("hours")
    .select("*")
    .eq("facility_id", facilityId);

  if (error) throw error;

  return (data ?? []) as FacilityHour[];
}

// ================================
// 10. GET FACILITY PRICES
// ================================

export async function getFacilityPrices(
  facilityId: number
): Promise<FacilityPrice[]> {
  const { data, error } = await supabase
    .from("prices")
    .select("*")
    .eq("facility_id", facilityId);

  if (error) throw error;

  return (data ?? []) as FacilityPrice[];
}
