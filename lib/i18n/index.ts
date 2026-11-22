import type { Lang } from "@/lib/types";
import { EN_TEXT, type I18nDict } from "./en";
import { NE_TEXT } from "./ne";

export const DICT: Record<Lang, I18nDict> = { en: EN_TEXT, ne: NE_TEXT };