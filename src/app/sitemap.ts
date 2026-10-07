import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getLanguageAlternates, getSiteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const languages = getLanguageAlternates();

  return routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).href,
    alternates: { languages },
  }));
}
