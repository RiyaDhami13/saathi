"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { BigButton } from "@/components/BigButton";
import { useApp } from "@/components/AppProvider";
import { makeItem } from "@/lib/items";
import { loadItems, saveItems } from "@/lib/storage";
import type { ReadItem } from "@/lib/types";
import { MOCK_READ_ITEMS } from "@/mocks/sample";

const BADGE_BG: Record<ReadItem["type"], string> = {
  medicine: "bg-blue-50",
  test: "bg-amber-50",
  instruction: "bg-neutral-100",
  other: "bg-neutral-100",
};

const INPUT_CLASS =
  "min-h-[3.5rem] w-full rounded-xl border-2 border-neutral-950 bg-white px-4 text-lg font-medium text-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-950";

export function ConfirmForm() {
  const router = useRouter();
  const { t } = useApp();
  const [items, setItems] = useState<ReadItem[] | null>(null);
  const [draft, setDraft] = useState("");

  // Read sessionStorage after mount to avoid a hydration mismatch.
  useEffect(() => {
    setItems(loadItems() ?? MOCK_READ_ITEMS);
  }, []);

  if (!items) return <p className="text-lg font-medium">{t.States.loading}</p>;

  const cleaned = items.filter((i) => i.text.trim());

  function addDraft() {
    const text = draft.trim();
    if (!text) return;
    setItems((prev) => [...(prev ?? []), makeItem(text)]);
    setDraft("");
  }

  function submit() {
    saveItems(cleaned.map((i) => ({ ...i, text: i.text.trim() })));
    router.push("/explain");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t.Confirm.confirmHeading}</h1>
      <p className="rounded-xl border-2 border-neutral-950 bg-amber-50 p-4 text-lg font-bold">
        {t.Confirm.checkNumbers}
      </p>

      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border-2 border-neutral-950 bg-white p-4"
          >
            <span
              className={`inline-flex self-start rounded-full border-2 border-neutral-950 px-3 py-1 text-base font-bold ${BADGE_BG[item.type]}`}
            >
              {t.Confirm.types[item.type]}
            </span>
            <input
              type="text"
              value={item.text}
              aria-label={`${t.Confirm.itemLabel} ${index + 1}`}
              onChange={(e) =>
                setItems((prev) =>
                  (prev ?? []).map((i) =>
                    i.id === item.id ? { ...i, text: e.target.value } : i,
                  ),
                )
              }
              className={INPUT_CLASS}
            />
            <BigButton
              tone="secondary"
              icon={<Trash2 aria-hidden="true" />}
              aria-label={`${t.Confirm.removeItem}: ${item.text}`}
              onClick={() => setItems((prev) => (prev ?? []).filter((i) => i.id !== item.id))}
            >
              {t.Confirm.removeItem}
            </BigButton>
          </li>
        ))}
      </ul>

      <form
        className="flex flex-col gap-3 rounded-2xl border-2 border-dashed border-neutral-950 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          addDraft();
        }}
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t.Confirm.addItemPlaceholder}
          aria-label={t.Confirm.addItemPlaceholder}
          className={INPUT_CLASS}
        />
        <BigButton
          type="submit"
          tone="secondary"
          disabled={!draft.trim()}
          icon={<Plus aria-hidden="true" />}
        >
          {t.Confirm.addItemButton}
        </BigButton>
      </form>

      <BigButton tone="primary" disabled={cleaned.length === 0} onClick={submit}>
        {t.Confirm.confirmSubmit}
      </BigButton>
    </div>
  );
}