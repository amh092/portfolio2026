"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

// Both icons are rendered; globals.css shows the right one based on
// html[data-theme], so there is no hydration mismatch and no flash.
export default function ThemeToggle() {
  const t = useTranslations("Navigation");

  const toggle = () => {
    const html = document.documentElement;
    const next = html.dataset.theme === "light" ? "dark" : "light";
    html.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // private mode / storage disabled — theme still switches for the session
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("themeToggle")}
      className="icon-btn"
    >
      <Sun size={18} aria-hidden className="theme-icon-sun" />
      <Moon size={18} aria-hidden className="theme-icon-moon" />
    </button>
  );
}
