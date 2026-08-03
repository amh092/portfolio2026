"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { SECTIONS, type SectionId } from "@/data/sections";
import { ICON_BUTTON_CLASSES } from "@/components/ui/icon-button";
import { CONTAINER_CLASSES } from "@/components/ui/section";

// Active-section neon dot: hidden at rest, revealed + pulsing while the
// parent link (group) carries aria-current. Physical left keeps it centered
// in RTL too. v4 scale-*/translate-* emit the native scale/translate
// properties, so transition-[opacity,scale] matches the prototype exactly.
const NAV_DOT_CLASSES =
  "absolute bottom-px left-1/2 size-[5px] -translate-x-1/2 scale-40 rounded-full bg-accent opacity-0 shadow-[0_0_8px_1px_rgb(var(--accent)/0.9)] transition-[opacity,scale] duration-300 ease-smooth group-aria-[current=true]:opacity-100 group-aria-[current=true]:scale-100 group-aria-[current=true]:animate-dot-pulse";
import LanguageSwitcher from "./language-switcher";
import MobileMenu from "./mobile-menu";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking; observer band mirrors the prototype
  // (a section is "active" while it crosses the viewport's middle).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveSection(mostVisible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    for (const { id } of SECTIONS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex h-(--nav-h) items-center border-b transition-[background-color,border-color,backdrop-filter] duration-[350ms] ease-smooth ${
          scrolled
            ? "border-border bg-bg/70 backdrop-blur-[18px] backdrop-saturate-[1.6]"
            : "border-transparent"
        }`}
      >
        <div className={`${CONTAINER_CLASSES} flex items-center gap-4`}>
          <a
            href="#home"
            aria-label={t("brandAriaLabel")}
            className="flex flex-none items-center gap-2.5 text-[1.05rem] font-extrabold tracking-[-0.03em]"
          >
            <span
              aria-hidden
              className="grid size-[34px] flex-none place-items-center rounded-[11px] bg-[linear-gradient(150deg,rgb(var(--accent)),rgb(var(--accent-2)))] text-[0.9rem] font-extrabold text-white shadow-[0_0_0_1px_rgb(var(--accent)/0.4),0_8px_24px_-8px_rgb(var(--accent)/0.9)]"
            >
              A
            </span>
            <span className="hidden whitespace-nowrap sm:inline">
              {t("brandName")}
            </span>
          </a>

          <nav
            aria-label={t("primaryNavLabel")}
            className="mx-auto hidden items-center gap-0.5 lg:flex"
          >
            {SECTIONS.map(({ id, labelKey }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "true" : undefined}
                className="group relative whitespace-nowrap rounded-[9px] px-3 py-2 text-(length:--step--1) font-medium text-fg-muted transition-colors duration-250 ease-smooth hover:text-fg aria-[current=true]:text-fg"
              >
                {t(labelKey)}
                <i aria-hidden className={NAV_DOT_CLASSES} />
              </a>
            ))}
          </nav>

          <div className="ms-auto flex flex-none items-center gap-1.5 lg:ms-0">
            <LanguageSwitcher activeSection={activeSection} />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`${ICON_BUTTON_CLASSES} lg:hidden`}
            >
              {menuOpen ? (
                <X size={18} aria-hidden />
              ) : (
                <Menu size={18} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        activeSection={activeSection}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
