import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider, type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cairo, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import BackgroundAtmosphere from "@/components/layout/background-atmosphere";
import Navbar from "@/components/layout/navbar";
import ThemeSync from "@/components/layout/theme-sync";
import "../globals.css";

// Sets data-theme before first paint (dark is the default); runs before
// hydration, hence suppressHydrationWarning on <html>. data-theme must NOT
// be rendered by React: a language switch re-renders <html> client-side,
// and a JSX value would overwrite the visitor's chosen theme.
const THEME_INIT_SCRIPT =
  "(function(){var t='dark';try{if(localStorage.theme==='light')t='light'}catch(e){}document.documentElement.dataset.theme=t})()";

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
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
