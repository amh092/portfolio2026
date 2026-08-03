import type { routing } from "@/i18n/routing";

/** "en" | "ar", derived from the routing config so it can't drift. */
export type AppLocale = (typeof routing.locales)[number];

/** Bilingual string per the overview's content model. */
export type LocalizedText = Record<AppLocale, string>;
