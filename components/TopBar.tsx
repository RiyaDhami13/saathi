"use client";

import Link from "next/link";
import { BigButton } from "@/components/BigButton";
import { useApp } from "@/components/AppProvider";
import type { ZoomScale } from "@/lib/types";

const ZOOM_OPTIONS: ZoomScale[] = ["A", "A+", "A++"];

const FONT_SIZE: Record<ZoomScale, string> = {
  A: "16px",
  "A+": "19.2px",
  "A++": "22.4px",
};

export function TopBar() {
  const { lang, toggleLang, zoom, setZoom, t } = useApp();

  function handleZoom(next: ZoomScale) {
    setZoom(next);
    document.documentElement.style.fontSize = FONT_SIZE[next];
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-neutral-950 bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="min-h-[3.5rem] flex items-center rounded-xl text-2xl font-bold text-neutral-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-950"
        >
          {t.appTitle}
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Text size" className="flex gap-2">
            {ZOOM_OPTIONS.map((size) => (
              <BigButton
                key={size}
                tone={zoom === size ? "primary" : "secondary"}
                aria-pressed={zoom === size}
                onClick={() => handleZoom(size)}
                className="w-auto min-w-[3.5rem] px-4"
              >
                {size}
              </BigButton>
            ))}
          </div>

          <BigButton
            tone="secondary"
            onClick={toggleLang}
            className="w-auto"
          >
            <span lang={lang === "ne" ? "en" : "ne"}>{t.langToggle}</span>
          </BigButton>
        </div>
      </div>
    </header>
  );
}