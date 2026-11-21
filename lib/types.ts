
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
