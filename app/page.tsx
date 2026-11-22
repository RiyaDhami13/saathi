"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Siren } from "lucide-react";
import { BigButton } from "@/components/BigButton";
import { SearchBar } from "@/components/SearchBar";
import { UploadPicker } from "@/components/UploadPicker";
import { useApp } from "@/components/AppProvider";
import { fetchWithTimeout } from "@/lib/api";
import { isReadItem, isRecord } from "@/lib/guards";
import { saveItems } from "@/lib/storage";
import type { ReadItem } from "@/lib/types";
import { MOCK_READ_ITEMS } from "@/mocks/sample";

export default function HomePage() {
  const router = useRouter();
  const { t } = useApp();
  const [busy, setBusy] = useState(false);

  function goConfirm(items: ReadItem[]) {
    saveItems(items);
    router.push("/confirm");
  }

  async function handleFile(file: File) {
    setBusy(true);
    let items: ReadItem[] = MOCK_READ_ITEMS;
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetchWithTimeout("/api/read-document", { method: "POST", body }, 15000);
      if (res.ok) {
        const data: unknown = await res.json();
        if (
          isRecord(data) &&
          Array.isArray(data.items) &&
          data.items.length > 0 &&
          data.items.every(isReadItem)
        ) {
          items = data.items;
        }
      }
    } catch {
      /* offline or timeout: keep the mock items */
    } finally {
      setBusy(false);
    }
    goConfirm(items);
  }

  return (
    <div className="flex flex-col gap-8">
      <BigButton
        tone="warning"
        icon={<Siren aria-hidden="true" />}
        onClick={() => router.push("/care")}
        className="min-h-[5rem] text-2xl"
      >
        {t.Home.emergencyButton}
      </BigButton>

      <section className="flex flex-col gap-4" aria-label={t.Home.scanButton}>
        <UploadPicker
          label={t.Home.scanButton}
          busyLabel={t.Home.uploading}
          busy={busy}
          onFile={handleFile}
        />
        <BigButton
          tone="secondary"
          disabled={busy}
          onClick={() => goConfirm(MOCK_READ_ITEMS)}
          className="border-4"
        >
          {t.Home.trySample}
        </BigButton>
      </section>

<section className="flex flex-col gap-3" aria-label={t.Home.searchHeading}>
  <h2 className="text-xl font-bold">{t.Home.searchHeading}</h2>
  <SearchBar
    placeholder={t.Home.searchPlaceholder}
    buttonLabel={t.Home.searchButton}
    onSearch={(q) => router.push(`/care?q=${encodeURIComponent(q)}`)}
  />
</section>