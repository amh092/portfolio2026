# Phase 4 — Reviewable Prompts

These prompts split Phase 4 (Main Sections) into small approval gates. Run them **one at a time, in order**. Do not run the next prompt until the current result has been reviewed and approved.

All copy was already approved in Phase 1 — this phase implements it. Each step maps to approved content:

| Step | Builds | Approved content source |
|---|---|---|
| 1 | Phase setup, shared UI primitives, page shell | `phase-1-plan.md` §15 (visual foundations) |
| 2 | Hero section | §5 |
| 3 | Business-growth section | §6 |
| 4 | Services section | §7 |
| 5 | Project card images (asset prep) | §16 manifest rows 1–3 |
| 6 | Projects section | §8, §9 |
| 7A | About section | §12 |
| 7B | Skills section | §13 |
| 8 | Contact section (UI only) | §14.1 |
| 9 | Footer + back-to-top | §14.2 |
| 10 | Final Phase 4 audit | whole plan |

## Shared rules for every prompt

- Read `context/project-overview.md`, `context/phase-1-plan.md`, `context/phase-4-plan.md`, `context/styling-reference.md`, `context/coding-standards.md`, and `context/current-feature.md` before doing any work.
- Per `context/AGENTS.md`: this Next.js version has breaking changes — read the relevant guide in `node_modules/next/dist/docs/` before writing code.
- All work happens on branch `feature/main-sections`. Commit each approved step with the overview's commit style (`feat: …`).
- **Copy is verbatim from `context/phase-1-plan.md`.** Do not redraft, "improve", shorten, or invent English or Arabic content. If a step genuinely needs a string the plan does not provide (an eyebrow line, an aria-label), draft the smallest possible text in both languages and flag it under "New strings for approval" in the step summary.
- All visible text lives in `messages/en.json` and `messages/ar.json` under one namespace per section (`Hero`, `BusinessGrowth`, `Services`, `Projects`, `ThreeD`, `About`, `Skills`, `Contact`, `Footer`). Structured content (projects, services, skills, social links) lives in typed files under `src/data/` with types in `src/types/`, following the overview's content model (`LocalizedText` etc.). Never hard-code visible text in components.
- Match the prototype's **static** look: `ahmed-portfolio-prototype.html` is the styling source of truth; compare against the baseline screenshots listed in `styling-reference.md`. Verify every step in both locales (RTL + LTR), both themes, desktop and mobile widths.
- Server components by default; `'use client'` only where interactivity requires it. Icons from `lucide-react` (installed). Do not install new dependencies without approval — in particular do **not** add Motion yet.
- In scope for styling: layout, tokens, spacing, radii, borders, static glows, and plain CSS hover/focus transitions. Out of scope: Phase 5 (scroll reveals, staggered entrances, pulsing animations, pointer-follow card glow, hero entrance motion), Phase 6 (3D viewer — the `three-d` section body stays a placeholder), Phase 7 (form submission, validation, spam protection, email — the contact form renders but must not submit).
- Accessibility: one `h1` (hero) then `h2` per section and `h3` for cards; labels on every form control; alt text only from the §16 manifest drafts; visible focus states; keep the existing skip link and `main#main` working.
- Asset actions are limited to those pre-authorized in `phase-1-plan.md` §16, and only in the step that lists them. Never modify `context/reference/**` or anything in Ahmed's other repositories.
- Before stopping: `npm run lint` and `npm run build` must pass, and the result must be checked in the browser. Append a line to the History section of `context/current-feature.md`, update the step's Status plus the Decision log in `context/phase-4-plan.md`, and add a list item (phase · step — date) to `context/progress-log.md`.
- At the end, summarize only: what changed, new strings or decisions needing approval, and what I should review.
- Stop after the requested step and wait for approval.

---

## Step 1 — Phase setup, shared primitives, and page shell

```text
Follow the shared rules in context/phase-4-prompts.md.

Create branch feature/main-sections. Rewrite context/current-feature.md for Phase 4: status In Progress, goals (the eight sections + footer from the roadmap), out-of-scope list (Phase 5 animation, Phase 6 3D viewer, Phase 7 form wiring), branch note; keep the existing History.

Then build the shared pieces every section needs, per the prototype:

1. src/components/ui/section-heading.tsx — eyebrow pill (glowing-dot prefix, uppercase EN only) + fluid-scale heading, per the prototype's section-head pattern.
2. src/components/ui/button.tsx — primary variant (accent→indigo gradient pill, static glow, no pulse animation) and secondary/ghost variant, usable as link or button.
3. src/components/ui/technology-badge.tsx and a status pill (green "Completed" per §15.2; amber exists in tokens but is unused this phase).
4. A reusable card surface style (surface bg, thin border, radius, padding) — CSS utility or component, whichever stays closest to the prototype.
5. Page background atmosphere per the prototype: fixed radial accent glows, radial-masked 64px grid, two blurred orbs — fully static (drift/pulse is Phase 5), correct in both themes.
6. Scaffold src/components/sections/{hero,business-growth,services,projects,three-d,about,skills,contact}-section.tsx, each rendering the shared SectionHeading with the approved section label plus the existing placeholder body, and compose them in src/app/[locale]/page.tsx replacing the inline placeholder map. Keep all anchor IDs and aria wiring exactly as they are so the Phase 3 scrollspy keeps working.

Heading text defaults to the approved section labels from phase-1-plan §2; any eyebrow microcopy is new-string-for-approval. Do not build any section's real content yet. Stop for review.
```

Review: primitives match the prototype (buttons, eyebrow, cards, atmosphere) in both themes and directions; scrollspy and skip link still work; the new-strings list.

## Step 2 — Hero section

```text
Follow the shared rules in context/phase-4-prompts.md.

Implement hero-section.tsx from phase-1-plan §5, verbatim in both locales: eyebrow "Hi, I'm Ahmed" / «أهلاً، أنا أحمد», the approved h1, supporting paragraph, primary CTA "View My Work" → #projects (gradient pill), secondary CTA "Start a Project" → #contact (ghost). 

There is NO availability pill and no profile image — both were permanently omitted in Phase 1 (§17); do not copy the prototype's availability dot. Static soft glow behind the heading is allowed per §15.5; entrance animation is Phase 5. Layout, spacing, and type scale per the prototype hero screenshot (prototype-hero-dark-en.png). Verify the CTAs scroll to the right sections in both locales. Stop for review.
```

Review: first-five-seconds impression against the baseline hero screenshot, Arabic line-height and RTL layout, CTA targets.

## Step 3 — Business-growth section

```text
Follow the shared rules in context/phase-4-prompts.md.

Implement business-growth-section.tsx from phase-1-plan §6, verbatim: the one-sentence intro and the five benefit cards in the approved order (Stronger Online Presence, Better User Experience, More Customer Enquiries, Interactive Brand Experiences, Built to Grow With You). 

Each card: lucide icon, h3 title, one-sentence description, card surface + thin border per the prototype (hover lift/glow animation is Phase 5; a plain border-color hover transition is fine). Choose one lucide icon per benefit and list the five choices in the summary for approval. Do not add a bilingual-reach card — it was explicitly excluded. Stop for review.
```

Review: card grid vs the prototype at desktop and mobile widths, icon choices, Arabic naturalness of rendered copy.

## Step 4 — Services section

```text
Follow the shared rules in context/phase-4-prompts.md.

Create src/types/service.ts and src/data/services.ts with the six approved services from phase-1-plan §7, using the approved stable IDs (business-websites, web-applications, interactive-3d, landing-pages, website-redesign, performance-optimization), bilingual titles/descriptions verbatim, and featured=true for the three primary services.

Implement services-section.tsx rendering the six cards in the approved order, primary services visually emphasized per the prototype (featured treatment), each with a lucide icon (list choices for approval), h3 title, and description. Stop for review.
```

Review: primary-vs-supporting visual hierarchy, data file shape, icon choices.

## Step 5 — Prepare project card images

```text
Follow the shared rules in context/phase-4-prompts.md.

Execute rows 1–3 of the phase-1-plan §16 asset manifest — this asset work is pre-authorized. From Ahmed's local repositories:

1. bookingapp/gallery/images/landing.png → public/images/projects/tavolla.webp
2. context/reference/rentflow/rentflow-desktop-en-hero.png → public/images/projects/rentflow.webp (the EN hero serves both locales — resolved decision)
3. insally/launch-kit/screenshots/insally-robot-models-desktop.png → public/images/projects/insally.webp

Target ~1600px wide, WebP, ≤ 250 KB each. Read the source images first and confirm each matches its expected content before converting. Report final dimensions and file sizes, and show the three images for visual approval. Touch no other assets; sources stay unmodified. Stop for review.
```

Review: the three optimized images — sharpness, cropping, and whether the Tavolla shot's in-app "Tavola" spelling is acceptable on screen (accepted in Phase 1, worth one last look).

## Step 6 — Projects section

```text
Follow the shared rules in context/phase-4-prompts.md.

Create src/types/project.ts (the overview's Project type) and src/data/projects.ts with the three approved projects in display order Tavolla → RentFlow → Insally, all content verbatim from phase-1-plan §9: bilingual summary, problem, solution, key features, technology lists, live URLs, status "completed". No repositoryUrl on any card — cards link live demos only (resolved decision). Alt text from the §16 manifest.

Implement projects-section.tsx per the prototype's project-card layout: screenshot via next/image (sized to prevent layout shift), title, status pill, summary, problem/solution, features, technology badges, and a "live demo" link (new-string-for-approval for its label) opening in a new tab. Hover tilt/expansion effects are Phase 5. Stop for review.
```

Review: card layout vs the prototype, all three business stories reading well in both languages, links opening correctly, image rendering without layout shift.

## Step 7 — About and Skills separately

Run each lettered prompt separately.

### 7A — About

```text
Follow the shared rules in context/phase-4-prompts.md.

Implement about-section.tsx with the approved biographies from phase-1-plan §12, verbatim, one per locale. No profile photo, no stats, no résumé — all resolved omissions. Keep the layout simple per the prototype's about area. Stop for review.
```

### 7B — Skills

```text
Follow the shared rules in context/phase-4-prompts.md.

Create src/types/skill.ts and src/data/skills.ts with the five approved categories and their exact skill lists from phase-1-plan §13. Category labels: English from §13; Arabic from the §13 note (الواجهات الأمامية / الخلفية وقواعد البيانات / ثلاثي الأبعاد والتفاعل / تعدد اللغات / الأدوات والاختبار) — flag these Arabic labels for approval since they were noted, not formally approved.

Implement skills-section.tsx: category groups with badge-style skill tags per the prototype. No proficiency bars or percentages. Stop for review.
```

Review: category grouping and Arabic labels (7B), biography rendering in both locales (7A).

## Step 8 — Contact section (UI only)

```text
Follow the shared rules in context/phase-4-prompts.md.

Implement contact-section.tsx from phase-1-plan §14.1, verbatim: heading "Let's work together" / «لنعمل معاً», supporting copy, and the form with Name, Email, Subject, Message fields and the "Send Message" submit button — every control labeled and associated.

The form must NOT submit or validate — no action, no handler, no client validation; Phase 7 wires it. Add the approved sending/success/error strings to messages now for Phase 7 reuse, but render only the idle state.

Create src/data/social-links.ts with the four confirmed methods (Email lastamh@gmail.com, GitHub github.com/amh092, LinkedIn, WhatsApp +966598143173) and render them as the section's contact links with lucide icons, per the prototype. Stop for review.
```

Review: form accessibility (labels, focus order, RTL input alignment), contact links correctness, confirmation that submission does nothing yet.

## Step 9 — Footer and back-to-top

```text
Follow the shared rules in context/phase-4-prompts.md.

Implement src/components/layout/footer.tsx from phase-1-plan §14.2: brand line "Ahmed Webcraft" / «أحمد لصناعة الويب», © {year} copyright with the current year, GitHub · LinkedIn · Email links (reuse src/data/social-links.ts), the existing language-switcher component, and a "Back to top" link targeting #home.

The footer is not a navigation item, has no anchor, and stays visually quiet per the prototype — it must not compete with the sections above. Add it to the [locale] layout or page below main. Stop for review.
```

Review: footer quietness in both themes, back-to-top behavior, language switcher still preserving the active section.

## Step 10 — Final Phase 4 audit

```text
Follow the shared rules in context/phase-4-prompts.md.

Audit the completed page. Do not restyle or rewrite approved work unless correcting a clear inconsistency; list suggested changes for approval instead.

Check:
- Full page vs every baseline screenshot in styling-reference.md (desktop dark/light EN, desktop dark AR, mobile dark EN), accepting only content-driven differences
- Every Phase 4 roadmap item built; three-d body still a clean placeholder for Phase 6
- No hard-coded visible strings in components (grep the section components); en.json and ar.json have identical key sets; no unused keys
- Heading hierarchy (one h1), landmark/aria wiring, keyboard pass through nav, form, and links
- Scrollspy, anchor navigation, and section-preserving language switch still correct now that sections have real heights
- All copy matches phase-1-plan verbatim; no invented facts, numbers, or extra bilingual mentions
- Lint and build pass

Fix only clear defects found by the audit. Update context/current-feature.md: status Completed, History entry, and a short list of anything deferred to Phases 5–8. Do not merge — merging to main happens after my approval. Stop for final review.
```

Review: the audit findings, deferred list, and readiness to merge and start Phase 5.
