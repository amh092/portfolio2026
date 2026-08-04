import { ArrowUp } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/layout/language-switcher";
import { SOCIAL_LINK_ICONS } from "@/components/ui/brand-icons";
import { ICON_BUTTON_CLASSES } from "@/components/ui/icon-button";
import { CONTAINER_CLASSES } from "@/components/ui/section";
import { SOCIAL_LINKS } from "@/data/social-links";
import type { AppLocale } from "@/types/locale";

// Footer links per phase-1-plan §14.2, in its order (a WhatsApp-less
// subset of the contact methods).
const FOOTER_LINK_IDS = ["github", "linkedin", "email"];
const FOOTER_LINKS = FOOTER_LINK_IDS.flatMap((id) =>
  SOCIAL_LINKS.filter((link) => link.id === id)
);

export default async function Footer() {
  // The [locale] layout 404s unknown locales, so this cast is safe.
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border bg-bg-2/50 py-10">
      <div
        className={`${CONTAINER_CLASSES} flex flex-wrap items-center justify-between gap-6`}
      >
        <div>
          <div className="mb-[0.2rem] text-(length:--step--1) font-bold">
            {t("brand")}
          </div>
          <div className="text-[0.82rem] text-fg-dim">
            {t("copyright", { year: new Date().getFullYear() })}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {FOOTER_LINKS.map((link) => {
            const Icon = SOCIAL_LINK_ICONS[link.icon];
            return (
              <a
                key={link.id}
                href={link.href}
                aria-label={link.label[locale]}
                className={ICON_BUTTON_CLASSES}
              >
                <Icon aria-hidden className="size-[18px]" />
              </a>
            );
          })}
          <LanguageSwitcher activeSection="contact" />
          {/* The footer is only in view at the page bottom, so "contact" is
              the section a language switch should preserve (the navbar's
              scrollspy state doesn't reach down here). */}
          <a
            href="#home"
            className="ms-2 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-fg-muted transition-colors duration-250 ease-smooth hover:text-fg"
          >
            <ArrowUp aria-hidden className="size-[15px]" />
            {t("backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
