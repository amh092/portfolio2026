import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Metadata and sitemap share the configured production origin, including on aliases.
  alternateLinks: false,
});
