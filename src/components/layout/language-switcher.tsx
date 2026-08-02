"use client";

import { useLocale, useTranslations, type Locale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { SectionId } from "@/data/sections";

const BUTTON_CLASSES =
  "cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-bold tracking-[0.03em] text-fg-dim transition-colors duration-250 ease-smooth aria-pressed:bg-accent/15 aria-pressed:text-accent aria-pressed:shadow-[inset_0_0_0_1px_rgb(var(--accent)/0.35)]";

export default function LanguageSwitcher({
  activeSection,
}: {
  activeSection: SectionId;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  // Preserve the current section when switching locales
  // (/en#services -> /ar#services); scroll: false keeps the
  // visitor's scroll position while the content re-renders.
  const switchTo = (next: Locale) => {
    if (next === locale) return;
    const hash = activeSection === "home" ? "" : `#${activeSection}`;
    router.replace(pathname + hash, { locale: next, scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={t("languageLabel")}
      className="flex gap-0.5 rounded-[11px] border border-border bg-surface p-[3px]"
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        aria-label="English"
        onClick={() => switchTo("en")}
        className={BUTTON_CLASSES}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={locale === "ar"}
        aria-label="العربية"
        onClick={() => switchTo("ar")}
        className={BUTTON_CLASSES}
      >
        ع
      </button>
    </div>
  );
}
