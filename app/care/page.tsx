
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Facility } from "@/lib/facilities";

interface CareResult extends Facility {
  distance_km?: number | null;
  matched_specialty?: string | null;
}

export default function CarePage() {
  const [condition, setCondition] = useState("");
  const [district, setDistrict] = useState("");

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [facilities, setFacilities] = useState<CareResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get user's current location
  function getUserLocation() {
    if (!navigator.geolocation) {
      setError("Location is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setError("");
      },
      () => {
        setError("Could not access your location. You can search without it.");
      }
    );
  }

  // Search healthcare facilities
  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!condition.trim()) {
      setError("Please enter your medical condition.");
      return;
    }

    setLoading(true);
    setError("");
    setFacilities([]);

    try {
      const response = await fetch("/api/care", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          condition: condition.trim(),
          district: district.trim(),
          latitude: location?.latitude ?? null,
          longitude: location?.longitude ?? null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to find healthcare facilities."
        );
      }

      setFacilities(result.facilities ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Page heading */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Saathi: Your Healthcare Companion
          </h1>

          <p className="mt-2 text-gray-600">
            Find healthcare facilities that match your needs.
          </p>
        </header>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block font-medium text-gray-800">
              What medical service do you need?
            </label>

            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Example: Heart specialist, Dental, Fever..."
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-800">
              District
            </label>

            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Example: Kailali, Kanchanpur..."
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Location button */}
          <button
            type="button"
            onClick={getUserLocation}
            className="w-full rounded-lg border border-blue-500 px-4 py-3 font-medium text-blue-700 hover:bg-blue-50"
          >
            {location
              ? "✓ Location added"
              : "Use my current location"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search Facilities"}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        {/* Results */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Healthcare Facilities
          </h2>

          {facilities.length === 0 && !loading && !error && (
            <p className="rounded-lg bg-white p-5 text-gray-500">
              Search for a medical service to see matching facilities.
            </p>
          )}

          <div className="space-y-4">
            {facilities.map((facility) => (
              <article
                key={facility.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {facility.name}
                  </h3>

                  {facility.emergency_24h && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      24/7 Emergency
                    </span>
                  )}
                </div>

                <p className="mt-2 text-gray-600">
                  {facility.address}, {facility.district}
                </p>

                {facility.matched_specialty && (
                  <p className="mt-2 text-sm text-blue-700">
                    Specialty: {facility.matched_specialty}
                  </p>
                )}

                {facility.distance_km != null && (
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Distance: {facility.distance_km} km
                  </p>
                )}

                {facility.phone && (
                  <p className="mt-3">
                    <a
                      href={`tel:${facility.phone}`}
                      className="font-medium text-blue-600 underline"
                    >
                      Call: {facility.phone}
                    </a>
                  </p>
                )}

                {facility.opening_hours && (
                  <p className="mt-2 text-sm text-gray-600">
                    Opening hours: {facility.opening_hours}
                  </p>
                )}

                {facility.website && (
                  <a
                    href={facility.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-blue-600 underline"
                  >
                    Visit website
                  </a>
                )}
              </article>
            ))}
          </div>

          {facilities.length > 0 && (
            <p className="mt-5 text-sm text-gray-500">
              Found {facilities.length} matching facilities.
              Please contact the facility to confirm service availability.
            </p>
          )}
        </section>

      </div>
    </main>
  );
}
