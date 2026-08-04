import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider, type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cairo, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import BackgroundAtmosphere from "@/components/layout/background-atmosphere";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ThemeSync from "@/components/layout/theme-sync";
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
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
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
            chosen theme on that same re-mount. */}
        <script async src="/theme-init.js" />
      </head>
      <body>
        <BackgroundAtmosphere />
        <NextIntlClientProvider>
          <ThemeSync />
          <a
            href="#main"
            className="fixed -top-24 start-4 z-[200] rounded-[10px] bg-accent px-4 py-3 text-white transition-[top] duration-200 focus:top-4"
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
