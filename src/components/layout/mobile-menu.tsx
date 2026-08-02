"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { SECTIONS, type SectionId } from "@/data/sections";

type MobileMenuProps = {
  open: boolean;
  activeSection: SectionId;
  onClose: () => void;
};

export default function MobileMenu({
  open,
  activeSection,
  onClose,
}: MobileMenuProps) {
  const t = useTranslations("Navigation");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-[99] lg:hidden ${open ? "visible" : "invisible"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav
        aria-label={t("mobileNavLabel")}
        className={`absolute inset-y-0 end-0 flex w-[min(86vw,340px)] flex-col gap-1 border-s border-border bg-bg-2 px-6 pt-[calc(var(--nav-h)+1rem)] pb-8 shadow-card transition-transform duration-[380ms] ease-smooth ${
          open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        {SECTIONS.map(({ id, labelKey }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={onClose}
            aria-current={activeSection === id ? "true" : undefined}
            className="rounded-xl border border-transparent px-3.5 py-3.5 font-medium text-fg-muted transition-colors duration-200 ease-smooth hover:border-border hover:bg-surface hover:text-fg aria-[current=true]:border-border aria-[current=true]:bg-surface aria-[current=true]:text-fg"
          >
            {t(labelKey)}
          </a>
        ))}
      </nav>
    </div>
  );
}
