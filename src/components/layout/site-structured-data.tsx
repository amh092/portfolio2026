import { SOCIAL_LINKS } from "@/data/social-links";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-config";
import type { AppLocale } from "@/types/locale";

interface SiteStructuredDataProps {
  locale: AppLocale;
  title: string;
  description: string;
}

export default function SiteStructuredData({
  locale,
  title,
  description,
}: SiteStructuredDataProps) {
  const siteUrl = getSiteUrl();
  const personId = new URL("/#person", siteUrl).href;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": new URL("/#website", siteUrl).href,
        url: siteUrl.href,
        name: title,
        description,
        inLanguage: routing.locales,
        author: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: locale === "ar" ? "أحمد" : "Ahmed",
        url: new URL(`/${locale}`, siteUrl).href,
        sameAs: SOCIAL_LINKS.filter(
          (link) => link.id === "github" || link.id === "linkedin",
        ).map((link) => link.href),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
