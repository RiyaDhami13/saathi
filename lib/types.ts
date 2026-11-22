
export interface Facility {
  id: number;
  name: string;
  district: string;
  address: string | null;
  phone: string | null;
  emergency_24h: boolean;
  latitude: number | null;
  longitude: number | null;
  opening_hours: string | null;
  website: string | null;
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

export interface Service {
  facility_id: number;
  specialty: string;
  condition: string | null;
  days_available: string | null;
}

export interface FacilityHours {
  facility_id: number;
  day: string;
  open_time: string;
  close_time: string;
}

export interface FacilityPrice {
  facility_id: number;
  service_en: string;
  service_ne: string | null;
  min_price_npr: string | null;
  max_price_npr: string | null;
  confidence: string | null;
}
