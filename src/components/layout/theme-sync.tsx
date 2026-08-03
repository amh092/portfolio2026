"use client";

import { useLayoutEffect } from "react";
import { useLocale } from "next-intl";

// A language switch re-mounts the root layout, and React re-acquires the
// <html> singleton — stripping the script-set data-theme attribute. This
// re-applies the saved theme in the same commit, before paint, so the
// visitor's theme survives locale navigation without a flash.
export default function ThemeSync() {
  const locale = useLocale();

  useLayoutEffect(() => {
    const html = document.documentElement;
    let theme = "dark";
    try {
      if (localStorage.getItem("theme") === "light") theme = "light";
    } catch {
      // private mode / storage disabled — fall back to the default
    }
    if (html.dataset.theme !== theme) html.dataset.theme = theme;
  }, [locale]);

  return null;
}
