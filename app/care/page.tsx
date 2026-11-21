"use client";

import { useEffect, useState } from "react";
import { BigButton } from "@/components/BigButton";
import { FacilityCard } from "@/components/FacilityCard";
import { useApp } from "@/components/AppProvider";
import { fetchWithTimeout } from "@/lib/api";
import { isFacility, isRecord } from "@/lib/guards";
import type { Facility } from "@/lib/types";
import { MOCK_FACILITIES } from "@/mocks/sample";

type Filter = "all" | Facility["district"];

export default function CarePage() {
  const { t } = useApp();
  const [facilities, setFacilities] = useState<Facility[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let result: Facility[] = MOCK_FACILITIES;
      try {
        const res = await fetchWithTimeout("/api/care");
        if (res.ok) {
          const json: unknown = await res.json();
          if (
            isRecord(json) &&
            Array.isArray(json.facilities) &&
            json.facilities.length > 0 &&
            json.facilities.every(isFacility)
          ) {
            result = json.facilities;
          }
        }
      } catch {
        /* offline or timeout: keep the mock facilities */
      }
      if (!cancelled) setFacilities(result);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t.Care.districtFilterAll },
    { value: "Kanchanpur", label: t.Care.districtKanchanpur },
    { value: "Kailali", label: t.Care.districtKailali },
  ];

  const visible = (facilities ?? []).filter((f) => filter === "all" || f.district === filter);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t.Explain.careButton}</h1>

      <div
        role="note"
        className="rounded-2xl border-2 border-neutral-950 bg-[#E69F00] p-4 text-lg font-bold text-neutral-950"
      >
        {t.Care.callFirstReminder}
      </div>

      <div role="group" aria-label={t.Care.districtFilterAll} className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <BigButton
            key={f.value}
            tone={filter === f.value ? "primary" : "secondary"}
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className="w-auto px-4"
          >
            {f.label}
          </BigButton>
        ))}
      </div>

      {!facilities ? (
        <p className="text-lg font-medium" role="status">
          {t.States.loading}
        </p>
      ) : visible.length === 0 ? (
        <p className="text-lg font-medium">{t.Care.noResults}</p>
      ) : (
        visible.map((f) => <FacilityCard key={f.id} facility={f} />)
      )}
    </div>
  );
}