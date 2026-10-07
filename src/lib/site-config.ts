import { routing } from "@/i18n/routing";

function isLocalOrigin(url: URL) {
  return ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
}

/** One stable production origin for canonical links, sharing, and the sitemap. */
export function getSiteUrl(): URL {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const source = explicitUrl
    ? "NEXT_PUBLIC_SITE_URL"
    : "VERCEL_PROJECT_PRODUCTION_URL";
  const configuredUrl = explicitUrl
    || (productionHost ? `https://${productionHost}` : "http://localhost:3000");

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error(`${source} must be a valid site origin.`);
  }

  if (
    !["http:", "https:"].includes(url.protocol)
    || url.username
    || url.password
    || url.pathname !== "/"
    || url.search
    || url.hash
    || (url.protocol !== "https:" && !isLocalOrigin(url))
  ) {
    throw new Error(
      `${source} must be an HTTPS origin without credentials, a path, query, or fragment. HTTP is allowed only for local development.`,
    );
  }

  return url;
}

export function isSiteIndexable(): boolean {
  const vercelEnvironment = process.env.VERCEL_ENV;
  return (
    process.env.NODE_ENV === "production"
    && (!vercelEnvironment || vercelEnvironment === "production")
    && !isLocalOrigin(getSiteUrl())
  );
}

export function getLanguageAlternates(): Record<string, string> {
  const siteUrl = getSiteUrl();
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(`/${locale}`, siteUrl).href,
      ]),
    ),
    "x-default": new URL(`/${routing.defaultLocale}`, siteUrl).href,
  };
}
