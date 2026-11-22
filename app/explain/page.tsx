"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BigButton } from "@/components/BigButton";
import { ExplanationCard } from "@/components/ExplanationCard";
import { useApp } from "@/components/AppProvider";
import { fetchWithTimeout } from "@/lib/api";
import { isExplainResponse } from "@/lib/guards";
import { loadItems } from "@/lib/storage";
import type { ExplainResponse, ReadItem } from "@/lib/types";
import { MOCK_EXPLANATION } from "@/mocks/sample";

export default function ExplainPage() {
  const router = useRouter();
  const { lang, t } = useApp();
  const [items, setItems] = useState<ReadItem[]>([]);
  const [data, setData] = useState<ExplainResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    const stored = loadItems() ?? [];
    setItems(stored);
    setData(null);

    (async () => {
      let result: ExplainResponse = MOCK_EXPLANATION[lang];
      try {
        const res = await fetchWithTimeout(
          "/api/explain",
          {
            method: "",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: stored, lang }),
          },
          20000,
        );
        if (res.ok) {
          const json: unknown = await res.json();
          if (isExplainResponse(json)) result = json;
        }
      } catch {
        /* offline or timeout: keep the mock explanation */
      }
      if (!cancelled) setData(result);
    })();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <div className="flex flex-col gap-6">
      {/* The banner text always comes from our dictionary, never from the AI response. */}
      <div
        role="note"
        className="rounded-2xl border-2 border-neutral-950 bg-[#E69F00] p-4 text-lg font-bold text-neutral-950"
      >
        {t.Explain.disclaimer}
      </div>

      {!data ? (
        <p className="text-lg font-medium" role="status">
          {t.States.loading}
        </p>
      ) : (
        <>
          <ExplanationCard
            heading={t.Explain.summaryHeading}
            plain={data.summary}
            doctorNoteHeading={t.Explain.doctorNoteHeading}
          />
          {data.items.map((entry) => (
            <ExplanationCard
              key={entry.id}
              heading={items.find((i) => i.id === entry.id)?.text ?? entry.id}
              plain={entry.plain}
              doctorNote={entry.doctorNote}
              doctorNoteHeading={t.Explain.doctorNoteHeading}
            />
          ))}
        </>
      )}

      <BigButton tone="primary" onClick={() => router.push("/care")}>
        {t.Explain.careButton}
      </BigButton>
    </div>
  );
}