# Ahmed Webcraft

English/Arabic portfolio built with Next.js, React, next-intl, Tailwind CSS, and an on-demand 3D showcase.

Live: [portfolio2026-five-delta.vercel.app](https://portfolio2026-five-delta.vercel.app).

## Local development

Use Node.js 24 and the committed npm lockfile.

```sh
npm ci
npm run dev
```

The locale routes are `/en` and `/ar`. The launch contact section uses the verified email, WhatsApp, GitHub, and LinkedIn destinations in `src/data/social-links.ts`. It does not collect or submit form data.

## Verification

```sh
npm run lint
npm run build
npm audit --omit=dev
```

The build downloads Inter and Cairo through `next/font/google`, so it needs network access. Detailed launch evidence and remaining work are recorded in `context/launch-readiness.md`.

## Deployment

Use the repository root as a Vercel Next.js project with Node.js 24.x. Keep the default install/build commands (`npm ci` / `npm run build`) and framework-managed output directory. No email API key or database is required for this launch.

Canonical URLs, language alternatives, structured data, and the sitemap use one origin, resolved in this order:

1. `NEXT_PUBLIC_SITE_URL`, an HTTPS origin such as `https://your-domain.example`.
2. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` system variable.
3. `http://localhost:3000` for local development only.

For an initial Vercel address, leave `NEXT_PUBLIC_SITE_URL` unset and keep Vercel system environment variables enabled. For a custom domain, configure it in Vercel and set `NEXT_PUBLIC_SITE_URL` before rebuilding. The origin must have no path, query, credentials, or fragment.

SEO is generated at build time: changing the domain or deployment environment requires a new build. Preview deployments and local origins emit `noindex` metadata and disallow crawling. Never deploy a local test build containing an example or localhost origin as a prebuilt production deployment.

Once signed in to the intended Vercel account and linked to the correct project:

```sh
vercel deploy --prod
```

`.vercelignore` excludes project notes, reference material, local environment files, credentials, caches, and dependency directories from CLI uploads. Keep production secrets in Vercel's environment settings.

After deployment, verify both locale routes, contact links, the 3D load/retry controls, `/robots.txt`, `/sitemap.xml`, canonical/social metadata, sharing images, and favicon on the actual public domain.
