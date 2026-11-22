"use client";

import { MapPin, Phone } from "lucide-react";
import { BigButton } from "@/components/BigButton";
import { useApp } from "@/components/AppProvider";
import type { Facility } from "@/lib/types";

export function FacilityCard({ facility }: { facility: Facility }) {
  const { t } = useApp();
  const districtLabel =
    facility.district === "Kanchanpur" ? t.Care.districtKanchanpur : t.Care.districtKailali;
  const dial = `tel:${facility.phone.replace(/[^\d+]/g, "")}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lng}`;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border-2 border-neutral-950 bg-white p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{facility.name}</h2>
        <p className="text-lg font-medium">{districtLabel}</p>
        {facility.emergency_24h && (
          <span className="inline-flex self-start rounded-full border-2 border-neutral-950 bg-[#E69F00] px-3 py-1 text-base font-bold text-neutral-950">
            {t.Care.emergencyBadge}
          </span>
        )}
      </div>

      <ul className="flex flex-wrap gap-2">
        {facility.specialties.map((s) => (
          <li
            key={s}
            className="rounded-full border-2 border-neutral-950 bg-neutral-100 px-3 py-1 text-base font-medium"
          >
            {s}
          </li>
        ))}
      </ul>

      <BigButton
        tone="primary"
        icon={<Phone aria-hidden="true" />}
        aria-label={`${t.Care.callButton}: ${facility.name}`}
        onClick={() => window.location.assign(dial)}
      >
        {t.Care.callButton}
      </BigButton>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[3.5rem] w-full items-center justify-center gap-3 rounded-2xl border-2 border-neutral-900 bg-white px-6 py-4 text-xl font-bold text-neutral-950 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-950"
      >
        <MapPin aria-hidden="true" />
        {t.Care.directions}
      </a>
    </article>
  );
}