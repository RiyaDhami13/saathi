
"use client";

import { useEffect, useState } from "react";

interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;
  phone: string;
  emergency_24h: boolean;
  opening_hours: string | null;
  website: string | null;
}

interface FacilitiesResponse {
  success: boolean;
  count: number;
  facilities: Facility[];
}

export function FacilitiesSection() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFacilities() {
      try {
        const response = await fetch("/api/facilities");

        if (!response.ok) {
          throw new Error("Failed to load facilities");
        }

        const data: FacilitiesResponse = await response.json();

        if (!data.success || !Array.isArray(data.facilities)) {
          throw new Error("Invalid facilities response");
        }

        setFacilities(data.facilities);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    loadFacilities();
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold">
          Healthcare Facilities
        </h2>
        <p className="text-sm text-gray-500">
          Find healthcare services near you
        </p>
      </div>

      {loading && <p>Loading facilities...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && facilities.length === 0 && (
        <p>No healthcare facilities found.</p>
      )}

      <div className="grid gap-4">
        {facilities.map((facility) => (
          <article
            key={facility.id}
            className="flex flex-col gap-2 rounded-xl border p-4 shadow-sm"
          >
            <h3 className="text-lg font-semibold">
              {facility.name}
            </h3>

            <p className="text-sm text-gray-600">
              {facility.address}
            </p>

            <p className="text-sm">
              District: {facility.district}
            </p>

            <p className="text-sm">
              Opening hours: {facility.opening_hours ?? "Not available"}
            </p>

            {facility.emergency_24h && (
              <span className="text-sm font-semibold text-green-600">
                24-hour emergency available
              </span>
            )}

            <a
              href={`tel:${facility.phone}`}
              className="font-medium text-blue-600"
            >
              Call: {facility.phone}
            </a>

            {facility.website && (
              <a
                href={facility.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                Visit website
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
