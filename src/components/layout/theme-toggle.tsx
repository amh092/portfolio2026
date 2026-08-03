"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { ICON_BUTTON_CLASSES } from "@/components/ui/icon-button";

// Both icons are rendered; the dark:/light: variants (keyed off
// html[data-theme], set pre-paint by public/theme-init.js) show the right
// one, so there is no hydration mismatch and no flash. Dark shows the sun,
// light shows the moon.
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
      className={ICON_BUTTON_CLASSES}
    >
      <Sun size={18} aria-hidden className="light:hidden" />
      <Moon size={18} aria-hidden className="dark:hidden" />
    </button>
  );
}
