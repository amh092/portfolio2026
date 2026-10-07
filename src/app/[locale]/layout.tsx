import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cairo, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import BackgroundAtmosphere from "@/components/layout/background-atmosphere";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SiteStructuredData from "@/components/layout/site-structured-data";
import ThemeSync from "@/components/layout/theme-sync";
import { getLanguageAlternates, getSiteUrl, isSiteIndexable } from "@/lib/site-config";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });
  const title = t("title");
  const description = t("description");
  const indexable = isSiteIndexable();
  const image = {
    url: `/images/og/portfolio-${locale}.png`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    metadataBase: getSiteUrl(),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: title,
      url: `/${locale}`,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: {
      icon: { url: "/icon.svg", type: "image/svg+xml" },
      apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    },
    robots: { index: indexable, follow: indexable },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Navigation");
  const metadata = await getTranslations("Metadata");

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets data-theme before hydration (see public/theme-init.js).
            async + src makes this a React "resource": hoisted, executed by
            the browser, and deduped when a language switch re-mounts <html>
            — an inline script here would be re-created but never re-run,
            and React logs an error for it. data-theme itself must NOT be
            rendered by React: a JSX value would overwrite the visitor's
            chosen theme on that same re-mount.
            blocking="render" holds first paint until the script has run —
            async alone races paint and loses on a busy main thread, which
            flashed dark for light-theme visitors on refresh. Browsers
            without the attribute (older Safari) fall back to that race. */}
        <script async src="/theme-init.js" blocking="render" />
        {/* Adds the session-gated hero-entrance class before first paint
            (see public/entrance-init.js) — same resource pattern as above. */}
        <script async src="/entrance-init.js" blocking="render" />
      </head>
      <body>
        <SiteStructuredData
          locale={locale}
          title={metadata("title")}
          description={metadata("description")}
        />
        <BackgroundAtmosphere />
        <NextIntlClientProvider>
          <ThemeSync />
          <a
            href="#main"
            className="fixed -top-24 start-4 z-[200] rounded-[10px] bg-accent-button px-4 py-3 text-white transition-[top] duration-200 focus:top-4"
          >
            {t("skipLink")}
          </a>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
