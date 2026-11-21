"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DICT } from "@/lib/i18n";
import type { I18nDict } from "@/lib/i18n/en";
import type { Lang, ZoomScale } from "@/lib/types";

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  zoom: ZoomScale;
  setZoom: (zoom: ZoomScale) => void;
  t: I18nDict;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ne");
  const [zoom, setZoom] = useState<ZoomScale>("A");

  const toggleLang = useCallback(
    () => setLang((l) => (l === "ne" ? "en" : "ne")),
    [],
  );

  // Keep <html lang> in sync for screen readers and correct font selection.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<AppContextValue>(
    () => ({ lang, setLang, toggleLang, zoom, setZoom, t: DICT[lang] }),
    [lang, toggleLang, zoom],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}