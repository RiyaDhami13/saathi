export type Lang = "ne" | "en";

export type ZoomScale = "A" | "A+" | "A++";

/** An item extracted from a prescription or lab report. */
export interface ReadItem {
  id: string;
  text: string;
  type: "medicine" | "test" | "instruction" | "other";
}

/** AI explanation structure. Explains terms only; never diagnoses or gives doses. */
export interface ExplainResponse {
  summary: string;
  items: { id: string; plain: string; doctorNote: string }[];
  disclaimer: string;
}

/** Local healthcare facility in Sudurpashchim. */
export interface Facility {
  id: string;
  name: string;
  district: "Kanchanpur" | "Kailali";
  phone: string;
  emergency_24h: boolean;
  specialties: string[];
  lat: number;
  lng: number;
  distanceKm?: number;
}