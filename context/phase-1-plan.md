# Phase 1 Plan — Planning and Content

Single living artifact for Phase 1. Updated only through the approved prompts in `context/phase-1-prompts.md`.

## 1. Phase status

**✅ COMPLETE — Phase 1 approved in full by Ahmed on 2026-08-01.** All 13 steps executed and approved; every section below is final. No implementation code was written and no assets were modified during this phase. **Phase 2 (Foundation) may begin.**

## 2. Approved page structure

> Approved by Ahmed on 2026-08-01, including the recommended Arabic labels.

### Approved section order, labels, and anchors

Anchor IDs are identical across both locales (`/en#services` and `/ar#services` point to the same section).

| # | Section | English label | Arabic label | Anchor ID | Status |
|---|---------|--------------|--------------|-----------|--------|
| 1 | Hero | Home | الرئيسية | `home` | Approved |
| 2 | How I Help Businesses Grow | Business Growth | تطوير الأعمال | `business-growth` | Approved |
| 3 | Services | Services | الخدمات | `services` | Approved |
| 4 | Featured Projects | Projects | المشاريع | `projects` | Approved |
| 5 | 3D Work Showcase | 3D Work | أعمال ثلاثية الأبعاد | `three-d` | Approved |
| 6 | About | About | نبذة عني | `about` | Approved |
| 7 | Skills | Skills | المهارات | `skills` | Approved |
| 8 | Contact | Contact | تواصل معي | `contact` | Approved |

The footer is part of the page but is intentionally **not** a navigation item and has no anchor; its back-to-top control targets `home`.

### Purpose and position rationale

1. **Hero (`home`)** — Purpose: instantly communicate who Ahmed is, what he builds, and what the visitor should do next. Position: it must be first because visitors decide within seconds whether the site is relevant to them.

2. **How I Help Businesses Grow (`business-growth`)** — Purpose: translate Ahmed's skills into concrete business outcomes for non-technical visitors. Position: directly after the hero so clients and business owners see value before being asked to evaluate services or technology.

3. **Services (`services`)** — Purpose: state exactly what Ahmed can be hired to deliver. Position: after the value story so services read as the practical way to obtain the benefits just described.

4. **Featured Projects (`projects`)** — Purpose: prove the service claims with real, verifiable development work. Position: immediately after services because visitors naturally ask "show me" once they know what is offered.

5. **3D Work Showcase (`three-d`)** — Purpose: showcase the interactive 3D capability that differentiates Ahmed from typical web developers. Position: after core development projects so primary hiring credibility is established first, while the differentiator still gets a full dedicated stage.

6. **About (`about`)** — Purpose: give a concise professional background and working approach for visitors who are now interested in the person behind the work. Position: after the work sections because trust in the person matters most once the work itself has persuaded.

7. **Skills (`skills`)** — Purpose: provide a scannable technical inventory for recruiters, hiring managers, and developers. Position: near the end as supporting detail — it deepens confidence for technical evaluators without interrupting the business-focused story above.

8. **Contact (`contact`)** — Purpose: convert accumulated interest into an enquiry through the form and professional links. Position: last because it is the natural endpoint of the page's persuasion flow and the target of every call-to-action above it.

### Structural notes

- **Anchor `three-d` (not `3d`)**: IDs starting with a digit are awkward to target in CSS selectors and harder to read in URLs; `three-d` matches the overview and stays locale-neutral. (Approved)
- **Anchor language**: anchors stay English/Latin in both locales so shared links, analytics, and section-preserving language switching behave identically. (Approved)
- **All eight sections retained**: each serves a distinct visitor from the target-visitor table (clients → business-growth/services, recruiters → skills/projects, collaborators → three-d); none duplicates another's job, so no section is recommended for removal. (Approved)

### Label decisions (resolved 2026-08-01)

- **Business Growth (Arabic)** — Approved: **تطوير الأعمال**. The alternative نمو الأعمال was declined.
- **3D Work (Arabic)** — Approved: **أعمال ثلاثية الأبعاد**. The shorter ثلاثي الأبعاد remains a Phase 3 fallback only if the full label proves too wide in the navbar or mobile menu.

## 3. Source information

Inventory of factual material found on 2026-08-01 by read-only inspection of this repository and Ahmed's local project repositories (with their READMEs, package manifests, and git remotes — not filenames alone). Nothing outside this plan was modified.

Status labels: **Confirmed** — verified in a repo, README, or manifest. **Needs verification** — evidence exists but Ahmed must confirm. **Missing** — no source found; covered in Open questions.

### 3.1 Personal identity and professional positioning

| Item | Value found | Status |
|---|---|---|
| Git author name | ahmed mohammed | Confirmed as git identity only |
| Public name / brand (English) | **Ahmed Webcraft** | Confirmed by Ahmed (2026-08-01) |
| Public name / brand (Arabic) | **أحمد لصناعة الويب** | Confirmed by Ahmed (2026-08-01) |
| Professional title (EN/AR) | None — Ahmed confirmed the hero should lead with his work and what he can do for clients, not a title | Confirmed by Ahmed (2026-08-01) |
| Hero direction | Show Ahmed's work and the value he delivers to clients | Confirmed by Ahmed (2026-08-01) — to be drafted at Step 4 |
| Biography facts (background, experience, current focus) | — | Missing |
| Location | — | Missing |
| Availability status | — | Missing (optional per overview) |

### 3.2 Contact and professional links

| Item | Value found | Status |
|---|---|---|
| GitHub profile | <https://github.com/amh092> | Confirmed |
| Portfolio repository | <https://github.com/amh092/portfolio2026> (public) | Confirmed |
| Public contact email | lastamh@gmail.com | Confirmed by Ahmed (2026-08-01) |
| LinkedIn profile | <https://www.linkedin.com/in/ahmed-mohammad-25aa08250/> | Confirmed by Ahmed (2026-08-01) |
| WhatsApp | +966598143173 — to be included as a contact method | Confirmed by Ahmed (2026-08-01) |

### 3.3 Development projects — candidate pool

Candidates named by Ahmed for the Featured Projects section: **Tavolla**, **Insally**, **RentFlow**. Selection and ordering happen at Step 7; this is inventory only.

Ahmed confirmed (2026-08-01): public spellings **Tavolla** and **Insally**, all three projects **completed**, and live URLs for all three (each verified reachable, HTTP 200, on 2026-08-01).

#### Tavolla — restaurant table-reservation and online-ordering platform

- **Two repositories** (Confirmed):
  - Frontend `bookingapp` — <https://github.com/amh092/bookingapp> (**public**). Next.js 16, React 19, Tailwind CSS v4, Base UI, NextAuth v5 (beta), Zod, driver.js demo tours.
  - Backend `booking-api` — <https://github.com/amh092/booking-api> (**private**). NestJS 11, Prisma + PostgreSQL, JWT + Argon2 auth with default-deny guards, global rate limiting, Swagger/OpenAPI docs, Resend email with dev fallback.
- **Confirmed features** (from READMEs): availability engine that prevents double bookings; full reservation lifecycle with confirmation codes and staff transitions; admin calendar and filtering; bilingual English/Arabic menu with dietary tags and allergens; pickup ordering with server-side pricing; seeded demo restaurant "The Golden Fork" with a guided walkthrough (`DEMO.md`).
- **Screenshots**: `gallery/images/` with bilingual READMEs in both repos — Confirmed existing.
- **Product name**: **Tavolla** confirmed by Ahmed. Note: the repo's own gallery README spells it "Tavola" — a repo-side inconsistency to be aware of if that README is ever linked; the portfolio will use Tavolla.
- **Live/demo URL**: <https://bookingapp-phi-ashy.vercel.app/> — Confirmed reachable. **Completion status**: Completed (confirmed by Ahmed).

#### Insally (إنسآلي) — school robotics-competition platform

- **Repository**: <https://github.com/amh092/insally> (**private**) — Confirmed.
- **Stack** (Confirmed): Next.js 16, React 19, TypeScript (strict), three.js with React Three Fiber, Drei, and postprocessing; Supabase (Postgres, Auth, RLS) via `@supabase/ssr`; Tailwind CSS v4.
- **Confirmed features** (from README): teams earn Energy/Knowledge/Values points that evolve their robot through INS versions; public 3D live garden (`/live`) and robot model gallery (`/robots-review`); admin dashboard for seasons, stages, teams, scoring, and reports.
- **Assets**: 6 GLB robot models in `public/models/` (primary, intermed, highschool — each with an optimized variant); `launch-kit/screenshots/` folder — Confirmed existing.
- **Public name spelling**: **Insally** confirmed by Ahmed (Arabic: إنسآلي per the project README).
- **Live/demo URL**: <https://insally.vercel.app/> — Confirmed reachable. **Completion status**: Completed (confirmed by Ahmed).

#### RentFlow — property-management app for property owners

- **Repository**: <https://github.com/amh092/rentflow> (**private**) — Confirmed.
- **Stack** (Confirmed): Next.js App Router, React, TypeScript, next-intl with English and Arabic locales, Clerk authentication, Supabase (Postgres, RLS, private Storage), Vitest, Vercel Analytics.
- **Confirmed surface** (from README): localized landing, dashboard, and owner-scoped CRUD for properties, units, tenants, leases, maintenance, documents, reports, and settings; offline route; tenant phone numbers normalized to E.164 with owner-scoped duplicate checks.
- **Screenshots**: captured from the live site at Ahmed's request (2026-08-01) into `context/reference/rentflow/` — 6 candidate shots (desktop full-page + hero and mobile hero, in English and Arabic). The live landing page is public (no login wall). Final asset selection/optimization stays a Step 12 task.
- **Live/demo URL**: <https://rentflow.cfd> — Confirmed reachable on a custom domain (redirects to the Arabic locale `/ar` by default). **Completion status**: Completed (confirmed by Ahmed).

#### Notes on the pool

- **Project links (resolved 2026-08-01)**: Ahmed confirmed project cards should use only the links he provided — the three live demo URLs. No repository links on project cards (the private repos stay private, and the public `bookingapp` repo is also not linked unless Ahmed adds it later). His GitHub profile remains a contact-section link.
- Other local repositories exist (e.g. `aqar-platform`, `investment-tracker`, `qurandAcademy`, `hayy-app`) — excluded unless Ahmed adds them to the pool.
- The portfolio repository itself contains no reusable project facts: it is a fresh Next.js scaffold plus a prototype HTML file with placeholder content only.

### 3.4 3D work

Ahmed confirmed (2026-08-01) that the 3D Work showcase content will be the **Insally GLB robot models**.

| Item | Evidence | Status |
|---|---|---|
| Insally robot models — 3 designs, each with an optimized GLB variant | `insally/public/models/*.glb`, rendered via React Three Fiber in `/live` and `/robots-review` | Confirmed as the 3D showcase source material |
| Authoring tool for those models | **Meshy AI** | Confirmed by Ahmed (2026-08-01) |
| Standalone 3D work (Blender renders, videos, other models) | — | None named — pool closed to Insally models unless Ahmed adds more |
| 3D assets inside the portfolio repo | `public/` holds only default Next.js SVGs | Confirmed — none |

### 3.5 Skills and tools

**Confirmed by direct use in Ahmed's repositories**: HTML, CSS, JavaScript, TypeScript; React 19; Next.js 16 (App Router); Tailwind CSS v4; next-intl (Arabic/English); NestJS 11; Prisma with PostgreSQL; Supabase incl. RLS; REST APIs with Swagger/OpenAPI; authentication (JWT + Argon2, Clerk, NextAuth); validation with Zod and class-validator; three.js, React Three Fiber, Drei, postprocessing; testing with Vitest, Jest, and Supertest; Resend email integration; Git and GitHub.

**Confirmed by live deployments** (2026-08-01): Vercel deployment experience — all three candidate projects are deployed (two on `vercel.app`, RentFlow on a custom domain).

**Confirmed by Ahmed** (2026-08-01): **Meshy AI** for 3D model creation (the Insally robots).

**Excluded (confirmed 2026-08-01)**: Blender — the models were created with Meshy AI, not Blender. Figma — Ahmed does not use it; he prototypes with AI tools instead (whether "AI-assisted prototyping" appears as a listed skill is decided at Step 10B).

Final grouping and inclusion happen at Step 10B; only skills Ahmed can confidently discuss will be listed.

### 3.6 Existing images and models

| Asset | Location | Status |
|---|---|---|
| Default Next.js SVGs | `portfolio/public/` | Confirmed — scaffold files, not portfolio content |
| Prototype reference screenshots (5 PNGs) | `portfolio/context/reference/` | Confirmed — internal design reference only, not site content |
| Prototype HTML | `portfolio/ahmed-portfolio-prototype.html` | Confirmed — placeholder content only, no real facts |
| Tavolla frontend screenshots | `bookingapp/gallery/images/` (+ EN/AR gallery READMEs) | Confirmed existing — selection deferred to Steps 8/12 |
| Tavolla backend gallery | `booking-api/gallery/images/` | Confirmed existing |
| Insally screenshots | `insally/launch-kit/screenshots/` | Confirmed existing |
| Insally GLB models (6 files) | `insally/public/models/` | Confirmed existing — also the 3D showcase source material |
| RentFlow screenshots (6 candidates: desktop full/hero + mobile hero × EN/AR) | `portfolio/context/reference/rentflow/` | Captured from the live site 2026-08-01 at Ahmed's request — selection/optimization at Step 12 |
| Profile photo | — | Missing (optional per overview) |

No assets were added, copied, renamed, optimized, or deleted.

## 4. Positioning and voice

> **Approved by Ahmed on 2026-08-01** (after two revisions: statement made generic, Arabic redundancy removed). Built only from confirmed source information: three completed, deployed bilingual products (Tavolla, Insally, RentFlow), the confirmed stack, the Ahmed Webcraft brand, and the value-led hero direction.

### 4.1 Positioning statement

**Recommended (English):**

> I design and build modern bilingual web applications and interactive digital experiences that make everyday business simpler, faster, and available to customers in both Arabic and English.

**Recommended (Arabic, natural equivalent):**

> أبني تطبيقات ويب حديثة وتجارب رقمية تفاعلية تجعل الأعمال اليومية أبسط وأسرع وفي متناول العملاء بالعربية والإنجليزية.

The statement is intentionally generic (per Ahmed, 2026-08-01) — it names no specific project; the shipped products serve as proof further down the page. The Arabic is deliberately not a mirror of the English: «ثنائية اللغة» is omitted because «بالعربية والإنجليزية» already says it, and «أصمّم وأبني» is reduced to «أبني» — saying "bilingual" or "design and build" twice reads as redundant in Arabic.

**Alternative (differentiator-led):** "I build complete bilingual web platforms with interactive 3D experiences that make businesses stand out online." — Tradeoff: it leads with the 3D differentiator and sounds more distinctive, but reads more tech-focused and buries the everyday business value that the overview says must come first; the recommendation keeps client outcomes in front.

### 4.2 Audience priorities (ordered)

1. **Business owners and potential clients** (Arabic- and English-speaking) deciding whether to hire Ahmed — the site exists to generate enquiries, so every client-facing section speaks to them first, in business language.
2. **Recruiters and hiring managers** validating real shipped work and technical range — served by the three live products, the skills inventory, and clear structure, without needing marketing copy rewritten for them.
3. **Developers and collaborators** exploring the technical and 3D work — served by depth in the Skills and 3D sections, where technical vocabulary is welcome.

### 4.3 Voice principles

1. **Value first, technology second** — every section leads with what the client gains; the stack appears as supporting proof, never as the headline.
2. **Concrete and verifiable** — claims are tied to the three shipped products and their live demos; nothing is written that a visitor cannot click and check.
3. **Native in both languages** — Arabic copy reads as natural Arabic, not translated English; product and technology names stay in English where that is how they are actually used.
4. **Calm confidence** — short sentences, plain words, no hype adjectives; the work itself carries the persuasion.

### 4.4 Claims and tones to avoid

- Invented numbers: client counts, revenue or conversion percentages, years of experience — none are confirmed.
- Hype vocabulary: "world-class", "award-winning", "cutting-edge", "#1".
- Guaranteed business outcomes ("will double your sales") — use "designed to help" framing instead.
- Presenting Ahmed as a 3D modeler/artist — the models are Meshy AI-generated; the verified capability is building interactive 3D web experiences (React Three Fiber) around them.
- Agency plural ("we", «نحن») — this is a personal brand.
- Jargon walls in client-facing sections — technical depth belongs in Skills and 3D, not the hero or Business Growth copy.
- Over-emphasizing bilingualism (added 2026-08-01 at Ahmed's request) — Arabic/English support is mentioned at most once per section as a plain capability, never repeated as a recurring selling theme.

### 4.5 First-person naming convention

**Recommended:** first-person singular throughout — "I" in English, «أنا / أبني / أساعد» in Arabic. The brand **Ahmed Webcraft / أحمد لصناعة الويب** appears in the navbar, footer, and metadata; in prose (About, hero) he is simply "Ahmed" / «أحمد».

**Alternative:** a studio "we" voice — rejected because it implies a team that does not exist and weakens the personal trust that a solo portfolio builds.

## 5. Hero content

> **Approved by Ahmed on 2026-08-01.** The availability label is omitted because availability is not confirmed (see Open questions).

### 5.1 English

| Element | Content |
|---|---|
| Eyebrow | Hi, I'm Ahmed |
| Main heading | Modern web experiences that help your business grow |
| Supporting paragraph | I design and build web applications and interactive digital experiences that make everyday business simpler and faster — in both Arabic and English. Every project below is live, so you can try the work yourself. |
| Primary CTA | **View My Work** → `#projects` |
| Secondary CTA | **Start a Project** → `#contact` |

### 5.2 Arabic

| Element | Content |
|---|---|
| Eyebrow | أهلاً، أنا أحمد |
| Main heading | تجارب ويب حديثة تساعد أعمالك على النمو |
| Supporting paragraph | أبني تطبيقات ويب وتجارب رقمية تفاعلية تجعل الأعمال اليومية أبسط وأسرع — بالعربية والإنجليزية. وكل مشروع في الأسفل متاح مباشرة لتجربته بنفسك. |
| Primary CTA | **شاهد أعمالي** → `#projects` |
| Secondary CTA | **ابدأ مشروعك** → `#contact` |

### 5.3 Rationale and intentional language differences

- **Primary CTA goes to `#projects`, not `#contact`** — Ahmed directed the hero to lead with his work; the contact CTA stays visible but secondary. Both CTA pairs come from the overview's approved suggestions.
- **Heading uses "help … grow" framing** — it makes a claim the next section ("How I Help Businesses Grow") immediately substantiates, and it respects the voice rule against guaranteed outcomes.
- **"Every project below is live" is a verifiable claim** — all three featured candidates have working, checked demo URLs; the hero invites proof instead of self-praise, per the voice principles.
- **Eyebrow carries identity, heading carries value** — with no professional title (per Ahmed), "Hi, I'm Ahmed" / «أهلاً، أنا أحمد» handles the introduction so the heading can sell the outcome.
- **Arabic is not a mirror of the English**: the paragraph opens with «أبني» alone (consistent with the approved positioning statement's redundancy fix), and bilingualism is stated once as «بالعربية والإنجليزية». The second Arabic sentence starts with «و» because a bare start would feel clipped in Arabic prose.

## 6. Business growth content

> **Approved by Ahmed on 2026-08-01** (after one revision: bilingual card removed per the de-emphasis rule). Five benefits from the overview's seven; each description is one short sentence with "help" framing — no promised results, no invented statistics.

### 6.1 Section introduction

- **EN:** Here is what a modern, well-built web experience can do for your business.
- **AR:** هذا ما يمكن أن تقدّمه تجربة ويب حديثة ومبنية بإتقان لأعمالك.

### 6.2 Benefits (in display order)

| # | English title | English description | Arabic title | Arabic description |
|---|---|---|---|---|
| 1 | Stronger Online Presence | A professional website makes your business easier to find and gives customers a reason to trust it. | حضور رقمي أقوى | موقع احترافي يجعل الوصول إلى أعمالك أسهل ويمنح عملاءك ثقة أكبر. |
| 2 | Better User Experience | Fast, accessible pages that work properly on every device keep visitors engaged instead of frustrated. | تجربة استخدام أفضل | صفحات سريعة وسهلة الاستخدام تعمل كما ينبغي على كل الأجهزة وتُبقي زوارك معك. |
| 3 | More Customer Enquiries | Clear content and well-placed calls-to-action guide visitors toward contacting you instead of leaving. | المزيد من استفسارات العملاء | محتوى واضح ودعوات مدروسة للتواصل توجّه الزائر نحو مراسلتك بدلاً من المغادرة. |
| 4 | Interactive Brand Experiences | Motion and interactive 3D make your products and services easier to remember. | تجارب تفاعلية لعلامتك | الحركة والعناصر التفاعلية ثلاثية الأبعاد تجعل منتجاتك وخدماتك أسهل في التذكّر. |
| 5 | Built to Grow With You | A well-structured website is easy to update and expand as your business grows. | موقع ينمو مع أعمالك | موقع منظّم البنية يسهل تحديثه وتوسيعه كلما نمت أعمالك. |

### 6.3 Ordering rationale and exclusions

- **Order**: presence → experience quality → enquiries (the site's conversion goal) → interactivity (hands off toward the 3D showcase further down the page) → longevity as the closing reassurance.
- **Excluded: Bilingual Market Reach** — per Ahmed (2026-08-01), bilingualism should not be emphasized as a selling theme; it stays a quiet capability mentioned once in the hero and available in Services, not a dedicated benefit card.
- **Excluded: Higher Conversion Potential** — it promises the same outcome as "More Customer Enquiries"; keeping both would say one thing in two cards.
- **Arabic notes**: titles and descriptions are natural rather than literal — e.g. «تُبقي زوارك معك» ("keeps your visitors with you") instead of a literal "keep visitors engaged", and «موقع ينمو مع أعمالك» ("a site that grows with your business") for "Built to Grow With You".

## 7. Services content

> **Approved by Ahmed on 2026-08-01.** Six launch services, all grounded in confirmed capabilities (three shipped products across web apps, booking/ordering, property management, and interactive 3D). Bilingual support is mentioned exactly once, inside Business Websites, per the de-emphasis rule.

### 7.1 Launch services (in display order)

#### 1. `business-websites` — Business Websites · **Primary**

- **EN:** A professional website built around your goals, services, and customers — in Arabic, English, or both.
- **AR:** مواقع الأعمال — موقع احترافي يُبنى حول أهدافك وخدماتك وعملائك، بالعربية أو الإنجليزية أو بكلتيهما.
- **Customer problem:** the business is hard to find online, or its current presence looks less credible than the business actually is.

#### 2. `web-applications` — Web Applications · **Primary**

- **EN:** Dashboards, portals, and business tools that turn day-to-day operations into smooth digital workflows.
- **AR:** تطبيقات الويب — لوحات تحكم وبوابات وأدوات عمل تحوّل عملياتك اليومية إلى أنظمة رقمية سلسة.
- **Customer problem:** daily operations run on phone calls, paper, and spreadsheets, which gets slower and messier as the business grows.

#### 3. `interactive-3d` — Interactive 3D Experiences · **Primary**

- **EN:** Interactive 3D models and scenes that run in the browser and make your product or brand memorable.
- **AR:** تجارب ثلاثية الأبعاد تفاعلية — نماذج ومشاهد ثلاثية الأبعاد تعمل داخل المتصفح وتجعل منتجك أو علامتك أصعب نسياناً.
- **Customer problem:** the product or brand is presented the same way as every competitor's and is easy to forget.

#### 4. `landing-pages` — Landing Pages · Supporting

- **EN:** A focused page for one campaign, product, or service, built to move visitors toward a single clear action.
- **AR:** صفحات هبوط — صفحة مركّزة لحملة أو منتج أو خدمة واحدة، تقود الزائر نحو إجراء واحد واضح.
- **Customer problem:** campaigns and ads send traffic to a generic homepage where visitors don't know what to do next.

#### 5. `website-redesign` — Website Redesign · Supporting

- **EN:** A modern rebuild of an outdated site's design, structure, and content flow.
- **AR:** إعادة تصميم المواقع — إعادة بناء حديثة لتصميم موقعك القديم وبنيته وتسلسل محتواه.
- **Customer problem:** the existing site is dated and no longer reflects the real quality of the business.

#### 6. `performance-optimization` — Performance Optimization · Supporting

- **EN:** Making existing websites faster, smoother, and more pleasant to use.
- **AR:** تحسين الأداء — جعل المواقع القائمة أسرع وأكثر سلاسة وأمتع في الاستخدام.
- **Customer problem:** slow pages frustrate visitors and cost the business attention it already paid to earn.

### 7.2 Excluded for now

- **Bilingual Websites** (overview) — folded into Business Websites as a plain capability («بالعربية أو الإنجليزية أو بكلتيهما»); a dedicated bilingual service card would conflict with the approved de-emphasis rule.
- **Frontend Development** (overview) — a hiring skill, not a client-facing service; recruiters and developers will find it in the Skills section instead.

### 7.3 Notes

- Primary vs supporting follows the evidence: the three primary services map one-to-one onto shipped, live products; the three supporting services are lighter engagements using the same confirmed capabilities, with no claims of past examples.
- IDs are stable slugs intended for later use in `data/services.ts` (Phase 4), matching the overview's content model.

## 8. Featured project selection

> **Approved by Ahmed on 2026-08-01.** All three confirmed projects launch, in the display order below.

### 8.1 Comparison

| Criterion | Tavolla | RentFlow | Insally |
|---|---|---|---|
| Relevance to target visitors | High — restaurants/service businesses recognize the problem instantly | High — property owners are a clear client profile | Medium for clients; high for recruiters and collaborators |
| Business value story | Replaces calls and paper with online booking + ordering | Replaces spreadsheets with structured property/tenant management | Turns a competition into an engaging public 3D experience |
| Visual quality | Not assessed in this step — screenshots exist, review at Step 8 | Not assessed — no screenshots exist yet | Not assessed — screenshots exist in `launch-kit/` |
| Technical range | Full-stack: Next.js frontend + NestJS/Prisma/PostgreSQL API, auth, email | Next.js + Supabase (RLS, Storage) + Clerk, tested with Vitest | Next.js + React Three Fiber 3D + Supabase |
| Bilingual relevance | EN/AR menu content (confirmed in API) | Full EN/AR interface via next-intl (confirmed) | Arabic-named product; UI language coverage unverified |
| Link availability | Live demo confirmed reachable | Live demo confirmed reachable (custom domain) | Live demo confirmed reachable |
| Completion status | Completed (confirmed) | Completed (confirmed) | Completed (confirmed) |

### 8.2 Recommended selection and order

1. **Tavolla** — the strongest opener: a complete, end-to-end product (customer side + staff side + API) whose business problem any visitor understands in one sentence, with a guided demo a client can actually click through.
2. **RentFlow** — proves the pattern repeats in a second industry, and it is the best evidence for the Web Applications service (real SaaS-style workflows on a custom domain).
3. **Insally** — closes the section on creative range and hands off naturally into the 3D Work showcase that follows it on the page; for client visitors it reads as bonus range rather than the headline.

No exclusions: the pool is exactly three and each maps to a distinct service claim (booking/ordering operations, business management tools, interactive 3D).

### 8.3 Missing information per candidate

- **Tavolla** — which gallery screenshot to feature (Step 8 per-project prompt / Step 12); whether the in-app "Tavola" spelling appears on screens that would contradict the "Tavolla" card title.
- **RentFlow** — ~~no screenshots~~ resolved 2026-08-01: 6 candidate shots captured from the live site into `context/reference/rentflow/`, and the landing page confirmed public (no login wall); which shot to feature is decided at Step 12.
- **Insally** — which `launch-kit/screenshots/` image to feature; whether the public pages are Arabic-only, English-only, or both (affects the card's summary wording only, not selection).

## 9. Featured project content

### 9.1 Tavolla

> **Approved by Ahmed on 2026-08-01.** Built from confirmed facts in the `booking-api` README/DEMO and the `bookingapp` gallery README only. The "Tavola" in-app spelling stays as-is alongside the "Tavolla" card title.

| Field | Value |
|---|---|
| Slug | `tavolla` |
| Title (EN) | Tavolla |
| Title (AR) | Tavolla — kept in Latin in both locales per the i18n rule that product names stay in English where natural |
| Live URL | <https://bookingapp-phi-ashy.vercel.app/> (confirmed reachable) |
| Repository URL | None on the card — per approved decision, cards link live demos only |
| Status | `completed` (confirmed) |
| Recommended screenshot | `bookingapp/gallery/images/landing.png` — the gallery's own lead image; strongest alternates: `booking-flow.png` (live slot picker) or `admin-calendar.png` (staff side) |

**Summary (EN):** A complete restaurant booking and pickup-ordering platform — customers reserve tables and order online, while staff run reservations, tables, menu, and orders from a dedicated admin panel.

**Summary (AR):** منصة متكاملة لحجز طاولات المطاعم وطلبات الاستلام — العملاء يحجزون ويطلبون عبر الموقع، والفريق يدير الحجوزات والطاولات والقائمة والطلبات من لوحة تحكم خاصة.

**Business problem (EN):** Restaurants often run bookings through phone calls, WhatsApp threads, and paper notebooks — tables get double-booked and staff time disappears into coordination.

**Business problem (AR):** كثير من المطاعم تدير حجوزاتها عبر المكالمات ورسائل واتساب والدفاتر الورقية، فتتكرر الحجوزات المزدوجة ويستهلك التنسيقُ وقتَ الفريق.

**Implemented solution (EN):** One centralized system: availability is computed live from real tables, opening hours, and existing bookings; customers book with confirmation codes and manage their own reservations; pickup orders flow through cart, checkout, and live status tracking; and staff handle everything from an admin panel with automatic email notifications.

**Implemented solution (AR):** نظام مركزي واحد: يُحسب التوافر مباشرة من الطاولات وساعات العمل والحجوزات القائمة، ويحجز العملاء برموز تأكيد ويديرون حجوزاتهم بأنفسهم، وتمر طلبات الاستلام بالسلة والدفع والمتابعة الحية، بينما يدير الفريق كل شيء من لوحة تحكم مع إشعارات بريدية تلقائية.

**Key features (EN / AR):**

1. Live availability that only offers time slots with a genuinely free table, re-checked at booking to prevent double bookings. / توافر مباشر لا يعرض إلا الأوقات التي تتوفر فيها طاولة مناسبة فعلاً، مع تحقق إضافي عند الحجز يمنع الحجز المزدوج.
2. Self-service reservations: confirmation codes, lookup by code or phone, cancel and reschedule without calling. / حجوزات ذاتية الإدارة: رموز تأكيد، والبحث بالرمز أو رقم الهاتف، والإلغاء وإعادة الجدولة دون اتصال.
3. Staff admin panel: dashboard, filterable reservation list, and a day/week booking calendar with reschedule and table assignment, behind role-based access. / لوحة تحكم للفريق: إحصاءات، وقائمة حجوزات قابلة للتصفية، وتقويم يومي/أسبوعي مع إعادة الجدولة وتعيين الطاولات، ضمن صلاحيات حسب الدور.
4. Pickup ordering with server-side pricing and live order-status tracking through a kitchen workflow. / طلبات استلام بأسعار تُحتسب في الخادم ومتابعة حية لحالة الطلب عبر مسار عمل المطبخ.
5. Guided demo tours that let any visitor try every flow — including the staff panel via a pre-filled demo login. / جولات تجريبية موجّهة تتيح لأي زائر تجربة كل المسارات، بما فيها لوحة الفريق عبر دخول تجريبي جاهز.

**Technologies:** Next.js, React, TypeScript, Tailwind CSS, NextAuth, NestJS, Prisma, PostgreSQL, Resend

**Missing facts / asset needs:**

- Screenshot selection is recommended above but final cropping/optimization/path is a Step 12 task.
- The in-app branding and gallery README spell the product "Tavola" (one L) while the card will say "Tavolla" — Ahmed should confirm the mismatch is acceptable on screenshots, or standardize the spelling in the app later.
- The menu's bilingual (EN/AR) item support is real but intentionally not among the five features, per the bilingual de-emphasis rule; it can swap in if Ahmed prefers.

### 9.2 RentFlow

> **Approved by Ahmed on 2026-08-01.** Built from confirmed facts in the `rentflow` README and the live site (landing copy verified in the captured screenshots). This card carries the projects section's single bilingual mention, per the de-emphasis rule.

| Field | Value |
|---|---|
| Slug | `rentflow` |
| Title (EN) | RentFlow |
| Title (AR) | RentFlow — kept in Latin in both locales |
| Live URL | <https://rentflow.cfd> (confirmed reachable; defaults to Arabic) |
| Repository URL | None on the card — cards link live demos only |
| Status | `completed` (confirmed) |
| Recommended screenshot | `context/reference/rentflow/rentflow-desktop-en-hero.png`; alternate: the Arabic hero (`rentflow-desktop-ar-hero.png`) — or locale-matched images per language, decided at Step 12 |

**Summary (EN):** A property-management workspace for property owners — properties, units, tenants, leases, rent, maintenance costs, documents, and profitability in one place.

**Summary (AR):** مساحة عمل لملاك العقارات — العقارات والوحدات والمستأجرون والعقود والإيجارات وتكاليف الصيانة والمستندات والربحية في مكان واحد.

**Business problem (EN):** Owners often track rentals across scattered spreadsheets, chat threads, and memory — rent dates slip, costs stay unclear, and documents end up everywhere.

**Business problem (AR):** يتابع كثير من الملاك عقاراتهم عبر جداول متفرقة ومحادثات وذاكرتهم الشخصية، فتفوت مواعيد الإيجار وتبقى التكاليف غامضة وتتبعثر المستندات.

**Implemented solution (EN):** One workspace where each owner manages properties, units, tenants, leases, maintenance, and documents, tracks rent with reminders, and reads profit and cost at a glance — with every record scoped to that owner's account.

**Implemented solution (AR):** مساحة واحدة يدير فيها كل مالك عقاراته ووحداته ومستأجريه وعقوده وصيانته ومستنداته، ويتابع الإيجارات مع التذكيرات، ويرى الأرباح والتكاليف بنظرة واحدة — مع عزل بيانات كل مالك ضمن حسابه.

**Key features (EN / AR):**

1. Complete owner-scoped management: properties, units, tenants, leases, maintenance requests, and document uploads. / إدارة كاملة ضمن حساب كل مالك: العقارات والوحدات والمستأجرون والعقود وطلبات الصيانة ورفع المستندات.
2. Manual rent tracking with clear profit and cost visibility. / متابعة يدوية للإيجارات مع وضوح كامل للأرباح والتكاليف.
3. Tenant-level WhatsApp reminders. / تذكيرات واتساب على مستوى كل مستأجر.
4. Fully bilingual Arabic and English interface. / واجهة كاملة بالعربية والإنجليزية.
5. Data protection by design: authentication, per-owner data isolation, and private document storage. / حماية بيانات مدمجة: مصادقة وعزل بيانات لكل مالك وتخزين خاص للمستندات.

**Technologies:** Next.js, React, TypeScript, next-intl, Clerk, Supabase (PostgreSQL, RLS, Storage), Vitest

**Missing facts / asset needs:**

- Final screenshot choice (EN vs AR vs locale-matched), cropping, optimization, and final path are Step 12 tasks; raw candidates already exist in `context/reference/rentflow/`.
- No other facts missing — problem/solution/features all trace to the README and the live landing page.

### 9.3 Insally

> **Approved by Ahmed on 2026-08-01**, including the previously inferred business-problem framing. Built from confirmed facts in the `insally` README, the `public/models/README.md`, and the live site. The public site is Arabic (`lang="ar" dir="rtl"`, verified live), so the card makes no bilingual claims.

| Field | Value |
|---|---|
| Slug | `insally` |
| Title (EN) | Insally |
| Title (AR) | إنسآلي |
| Live URL | <https://insally.vercel.app/> (confirmed reachable; Arabic interface) |
| Repository URL | None on the card — cards link live demos only |
| Status | `completed` (confirmed) |
| Recommended screenshot | `insally/launch-kit/screenshots/insally-robot-models-desktop.png` (shows the 3D robot gallery — the differentiator); alternates: `insally-home-gallery-desktop.png`, `insally-live-desktop.png` |

**Summary (EN):** A school robotics-competition platform where the points teams earn visibly evolve their animated 3D robot — with a public live garden and a robot gallery rendered right in the browser.

**Summary (AR):** منصة مسابقات روبوتات مدرسية تتحول فيها نقاط الفرق إلى تطورٍ مرئي لروبوتها ثلاثي الأبعاد — مع حديقة مباشرة عامة ومعرض روبوتات يُعرضان داخل المتصفح.

**Business problem (EN, framing inferred — confirm):** Competition points sitting in spreadsheets are abstract — teams can't see their progress, and there is nothing engaging for audiences to follow between stages.

**Business problem (AR):** النقاط المسجلة في جداول تبقى أرقاماً مجردة — لا ترى الفرق تقدمها، ولا يجد الجمهور ما يتابعه بين المراحل.

**Implemented solution (EN):** Every point a team earns for Energy, Knowledge, or Values evolves its robot through INS versions; a public 3D live garden and a model-review gallery render all the animated robots in the browser, while an admin dashboard manages seasons, stages, teams, scoring, and reports.

**Implemented solution (AR):** كل نقطة يكسبها الفريق في الطاقة أو المعرفة أو القيم تطوّر روبوته عبر مستويات INS؛ وتعرض حديقة مباشرة عامة ومعرضُ نماذج جميعَ الروبوتات المتحركة داخل المتصفح، بينما تدير لوحة تحكم إدارية المواسم والمراحل والفرق والنقاط والتقارير.

**Key features (EN / AR):**

1. A points system (Energy / Knowledge / Values) that visibly evolves each team's robot through INS versions. / نظام نقاط (طاقة / معرفة / قيم) يطوّر روبوت كل فريق بشكل مرئي عبر مستويات INS.
2. A public 3D live garden that renders every team's robot in one interactive scene. / حديقة مباشرة عامة تعرض روبوتات جميع الفرق في مشهد تفاعلي واحد.
3. A robot model gallery with rigged, animated characters streamed to the browser. / معرض نماذج بروبوتات متحركة مزوّدة بهياكل حركة تُعرض مباشرة في المتصفح.
4. An admin dashboard for seasons, stages, teams, scoring, and reports. / لوحة تحكم إدارية للمواسم والمراحل والفرق والنقاط والتقارير.

**Technologies:** Next.js, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Supabase

**Missing facts / asset needs:**

- The business-problem framing above is inferred from the platform's purpose, not stated in any README — Ahmed should confirm or correct it.
- Screenshot cropping/optimization is a Step 12 task.

## 10. 3D work selection

> **Approved by Ahmed on 2026-08-01.** Inventory of confirmed 3D work; no assets modified.

The confirmed 3D pool is the three Insally stage robots (created with Meshy AI, per Ahmed). Each exists as an original GLB and an optimized GLB; the optimized variants are the launch candidates.

| Criterion | Primary robot | Middle robot | High-school robot |
|---|---|---|---|
| Source file (optimized) | `primary-optimized.glb` | `intermed-optimized.glb` | `highschool-optimized.glb` |
| Optimized size | 2.15 MB | 1.96 MB | 2.18 MB |
| Original size | 16.9 MB | 7.5 MB | 16.9 MB |
| File readiness | Ready | Ready | Ready |
| Rigged/animated | Yes — skinned, named clips incl. `Walking` | Yes | Yes |
| Preview image | Missing | Missing | Missing |
| Proven in production | Yes — rendered on the live Insally site | Yes | Yes |
| Mobile suitability | Acceptable at ~2 MB with lazy loading | Same | Same |
| Performance risk | Medium — skinned + animated; needs one-at-a-time loading | Same | Same |

**Recommendation:** launch all three as one "Insally competition robots" trio — they are a coherent set, each ~2 MB optimized, already proven in production on the live site. Load strategy per the overview's performance rules: static preview first, lazy "Load 3D model" action, one model at a time, rendering paused off-screen.

**Missing per item:** a preview/fallback still for each robot (`launch-kit` screenshots are page-level, not per-model) — capture is planned at Step 12; official display names for the three robots (working names below are stage-based) — confirm.

## 11. 3D work content

> **Approved by Ahmed on 2026-08-01** — the stage-based display names are final. One subsection per approved item. Model paths are the approved final paths in this portfolio; sources are not modified.

### 11.1 `robot-primary` — Primary-Stage Robot / روبوت المرحلة الابتدائية

- **Description (EN):** The primary-school competition robot from Insally — a rigged, animated character that evolves as its team earns INS levels; generated with Meshy AI and rendered in the browser with React Three Fiber.
- **Description (AR):** روبوت المرحلة الابتدائية من إنسآلي — شخصية متحركة بهيكل حركي تتطور كلما كسب فريقها مستويات INS؛ أُنشئ بـ Meshy AI ويُعرض في المتصفح عبر React Three Fiber.
- **Tools:** Meshy AI, GLB/GLTF, Three.js, React Three Fiber · **Interactive:** yes (rotate/zoom viewer) · **Model:** `insally/public/models/primary-optimized.glb` (2.15 MB) → proposed `public/models/robot-primary.glb` · **Preview image:** missing — capture at Step 12 · **Fallback:** static preview + no-WebGL image · **Performance concern:** skinned animation — own `AnimationMixer`, lazy-load, pause off-screen.

### 11.2 `robot-middle` — Middle-Stage Robot / روبوت المرحلة المتوسطة

- **Description (EN):** The middle-school competition robot from Insally — an animated character with its own motion set, generated with Meshy AI and rendered in the browser with React Three Fiber.
- **Description (AR):** روبوت المرحلة المتوسطة من إنسآلي — شخصية متحركة بمجموعة حركات خاصة بها، أُنشئت بـ Meshy AI وتُعرض في المتصفح عبر React Three Fiber.
- **Tools / Interactive / Fallback / Performance:** same pattern as 11.1 · **Model:** `intermed-optimized.glb` (1.96 MB) → proposed `public/models/robot-middle.glb` · **Preview image:** missing — Step 12.

### 11.3 `robot-highschool` — High-School-Stage Robot / روبوت المرحلة الثانوية

- **Description (EN):** The high-school competition robot from Insally — the most advanced of the three stage robots, animated and rendered in the browser with React Three Fiber; generated with Meshy AI.
- **Description (AR):** روبوت المرحلة الثانوية من إنسآلي — أكثر روبوتات المراحل الثلاث تقدماً، متحرك ويُعرض في المتصفح عبر React Three Fiber؛ أُنشئ بـ Meshy AI.
- **Tools / Interactive / Fallback / Performance:** same pattern as 11.1 · **Model:** `highschool-optimized.glb` (2.18 MB) → proposed `public/models/robot-highschool.glb` · **Preview image:** missing — Step 12.

> "Most advanced of the three" refers to the stage tier it represents, not a quality claim about the model.

## 12. About content

> **Approved by Ahmed on 2026-08-01** as the final (minimal) biography. Built strictly from confirmed facts; working approach, current focus, and desired project types are intentionally omitted. Each biography is under 120 words.

**Biography (EN):**

I'm Ahmed, a web developer who designs and builds complete web applications — from the interface to the API and database. I've shipped products for restaurant booking and ordering (Tavolla), property management (RentFlow), and school robotics competitions (Insally), built with React, Next.js, TypeScript, NestJS, and Supabase. I also create interactive 3D experiences that run directly in the browser, using React Three Fiber with AI-generated models. I work in both Arabic and English.

**Biography (AR):**

أنا أحمد، مطوّر ويب أصمّم وأبني تطبيقات ويب كاملة — من الواجهة إلى الخادم وقاعدة البيانات. أطلقت منصات لحجز المطاعم والطلبات (Tavolla)، وإدارة العقارات (RentFlow)، ومسابقات الروبوتات المدرسية (إنسآلي)، مبنية بـ React وNext.js وTypeScript وNestJS وSupabase. كما أبني تجارب ثلاثية الأبعاد تفاعلية تعمل داخل المتصفح باستخدام React Three Fiber ونماذج مولّدة بالذكاء الاصطناعي. وأعمل بالعربية والإنجليزية.

- The bilingual line is each biography's single bilingual mention, per the rule.
- No years of experience, education, location, or client counts — none are confirmed.

## 13. Skills content

> **Approved by Ahmed on 2026-08-01.** Only skills with direct evidence in Ahmed's shipped repos; no proficiency percentages (unjustifiable per the overview).

| Category | Skills |
|---|---|
| Frontend | HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS |
| Backend & Databases | Node.js, NestJS, REST APIs, Prisma, PostgreSQL, Supabase |
| 3D & Interactive | Three.js, React Three Fiber, Drei, GLB/GLTF workflows, Meshy AI |
| Internationalization | Arabic RTL & English LTR interfaces, next-intl |
| Tools & Testing | Git, GitHub, Vercel, Zod, Vitest, Jest |

- **Excluded (confirmed):** Blender, Figma.
- **Excluded pending evidence:** Localized SEO — listed in the overview, but no shipped example yet; this portfolio itself will become the evidence, so it can be added after launch.
- Category labels need Arabic equivalents at implementation time: الواجهات الأمامية / الخلفية وقواعد البيانات / ثلاثي الأبعاد والتفاعل / تعدد اللغات / الأدوات والاختبار.

## 14. Contact and footer content

> **Approved by Ahmed on 2026-08-01.** Only confirmed contact methods appear. Location and availability are permanently omitted for the MVP (resolved decision, not a gap).

### 14.1 Contact section

| Element | EN | AR |
|---|---|---|
| Heading | Let's work together | لنعمل معاً |
| Supporting copy | Have a website, web application, or interactive 3D idea? Let's discuss how it can support your business. | لديك فكرة لموقع أو تطبيق ويب أو تجربة ثلاثية الأبعاد؟ دعنا نناقش كيف يمكن تحويلها إلى تجربة رقمية تدعم أعمالك. |
| Form: Name | Name | الاسم |
| Form: Email | Email | البريد الإلكتروني |
| Form: Subject | Subject | الموضوع |
| Form: Message | Message | الرسالة |
| Submit button | Send Message | أرسل الرسالة |
| Sending state | Sending… | جارٍ الإرسال… |
| Success state | Thanks — I'll get back to you soon. | شكراً لك — سأرد عليك قريباً. |
| Error state | Something went wrong. Please try again or email me directly. | حدث خطأ ما. حاول مرة أخرى أو راسلني مباشرة عبر البريد. |

**Contact methods (confirmed):** Email `lastamh@gmail.com` · GitHub `github.com/amh092` · LinkedIn (confirmed URL) · WhatsApp `+966598143173` (label: WhatsApp / واتساب).

Validation-message drafts (required field, invalid email, too short/long) are implementation-time strings derived from these labels; they will live in `messages/*.json` in Phase 2 and follow the same tone.

### 14.2 Footer

| Element | EN | AR |
|---|---|---|
| Brand line | Ahmed Webcraft | أحمد لصناعة الويب |
| Copyright | © {year} Ahmed Webcraft. All rights reserved. | © {year} أحمد لصناعة الويب. جميع الحقوق محفوظة. |
| Links | GitHub · LinkedIn · Email | (same labels: GitHub · LinkedIn · البريد الإلكتروني) |
| Back to top | Back to top | العودة إلى الأعلى |

Footer also carries the language switcher, per the overview; it stays visually quiet and has no anchor.

## 15. Visual foundations

> **Approved by Ahmed on 2026-08-01.** Per Ahmed's direction, colors are **exactly the prototype's tokens** (`ahmed-portfolio-prototype.html`, documented in `context/styling-reference.md`). Values below are extracted from the prototype CSS.

### 15.1 Accents

- **Main neon accent:** Electric Blue `#3B82F6` (`--accent: 59 130 246`)
- **Secondary accent:** Indigo `#6366F1` (`--accent-2: 99 102 241`) — used with the main accent in the primary-button gradient and background orbs only.

### 15.2 Semantic tokens

| Token | Dark (default) | Light |
|---|---|---|
| Background | `#090B10` | `#F8FAFD` |
| Background-2 | `#0E1118` | `#FFFFFF` |
| Surface | `rgba(255,255,255,.035)` | `rgba(9,11,16,.025)` |
| Surface-2 | `rgba(255,255,255,.06)` | `rgba(9,11,16,.05)` |
| Text | `#ECF0F8` | `#101420` |
| Text muted | `#A0AABE` | `#525C6E` |
| Text dim | `#788296` | (dark only) |
| Border | `rgba(255,255,255,.09)` | `rgba(9,11,16,.10)` |
| Border strong | `rgba(255,255,255,.16)` | `rgba(9,11,16,.20)` |
| Focus | 2px solid accent, 3px offset; inputs: accent/60% border + 3px ring accent/14% | same |
| Status: completed | `#22C55E` (tints at 12–35%) | same — verify on light |
| Status: in progress | `#F59E0B` | same — verify on light |
| Glow intensity | `--glow-a: .45` | `.22` |

### 15.3 Contrast cautions (test at Phase 8)

- Accent `#3B82F6` on dark `#090B10` is borderline for **small** text — reserve accent for large text, icons, and borders; never body copy.
- Amber `#F59E0B` on the light background fails for small text — status pills in light mode need a darker amber or a tinted background.
- White text on the accent→indigo gradient button: keep button text ≥ 16px semibold.
- `Text dim #788296` only for decorative/meta text, never paragraphs.

### 15.4 Typography

- **Arabic:** Cairo — `line-height: 1.9`, no letter-spacing, never uppercase.
- **English:** Inter (the prototype's face; chosen over Geist for prototype consistency) — headings `letter-spacing: -.02em`.
- **Roles:** headings use the fluid scale `--step-2`…`--step-4`; body `--step-0`; labels/eyebrows `--step--1` (uppercase EN only); technology badges use the base face at `--step--1` (no separate mono font in the prototype).

### 15.5 Restraint rules (from overview + prototype)

> **Amended 2026-08-04 (Phase 5 Step 2R):** hero ambient embers/bursts and the breathing heading glow were added to the allow-lists — see `phase-5-plan.md` §4 and `phase-5-liveliness-proposal.md` (Option A, approved).

- Glow only on: primary CTA, active nav indicator, viewer edges, hero heading backdrop, decorative orbs.
- Pulse cycles ≥ 3s, ease-in-out, tiny amplitude; glow alpha capped by `--glow-a`.
- Gradients limited to the accent→indigo pair.
- No glow behind body text; no flashing; full reduced-motion support.

## 16. Asset preparation checklist

> **Approved by Ahmed on 2026-08-01** — the actions below (copy, optimize, capture, design) are pre-authorized for the implementation phases. No asset has been touched during Phase 1. RentFlow card image: the English hero serves both locales (resolved).

### 16.1 Manifest

| # | Asset | Current source | Proposed final path | Use / target / format | Alt text (EN / AR) | Action |
|---|---|---|---|---|---|---|
| 1 | Tavolla card image | `bookingapp/gallery/images/landing.png` | `public/images/projects/tavolla.webp` | Project card · ~1600w · WebP ≤ 250 KB | Tavolla — restaurant booking platform landing page / Tavolla — الصفحة الرئيسية لمنصة حجز المطاعم | Optimize later |
| 2 | RentFlow card image | `context/reference/rentflow/rentflow-desktop-en-hero.png` | `public/images/projects/rentflow.webp` | Project card · same targets | RentFlow — property-management workspace landing page / RentFlow — الصفحة الرئيسية لمساحة إدارة العقارات | Optimize later (EN vs locale-matched: decide) |
| 3 | Insally card image | `insally/launch-kit/screenshots/insally-robot-models-desktop.png` | `public/images/projects/insally.webp` | Project card · same targets | Insally — 3D robot model gallery / إنسآلي — معرض نماذج الروبوتات ثلاثية الأبعاد | Optimize later |
| 4–6 | Robot GLBs (×3) | `insally/public/models/*-optimized.glb` | `public/models/robot-{primary,middle,highschool}.glb` | 3D viewers · ~2 MB each · GLB | n/a (viewer has text labels) | Copy later; evaluate further meshopt/Draco in Phase 6 |
| 7–9 | Robot preview stills (×3) | — (do not exist) | `public/images/three-d/robot-{primary,middle,highschool}.webp` | Viewer fallback/preview · ~800w · WebP | {Stage} competition robot from Insally / روبوت إنسآلي للمرحلة {…} | Capture later (render from viewer) |
| 10 | Social/OG image | — | `public/images/og.png` | Link sharing · 1200×630 · PNG | n/a | Design later |
| 11 | Profile photo | — | `public/images/profile/…` | About (optional per overview) | — | Needs user-supplied source, or Exclude |
| 12 | Favicon | `app/favicon.ico` (Next.js default) | same path, branded | Browser tab | n/a | Needs replacement (design later) |
| 13 | Prototype + RentFlow reference PNGs | `context/reference/**` | unchanged | Internal reference only | n/a | Keep as-is (never shipped) |

### 16.2 Buckets

- **Keep as-is:** #13.
- **Needs user-supplied source:** #11 (or Exclude).
- **Capture later:** #7–9, #10.
- **Optimize later:** #1–3 (plus copy #4–6).
- **Exclude:** nothing else; original (non-optimized) GLBs are explicitly excluded from the portfolio.

## 17. Open questions

**None — all resolved on 2026-08-01 with Ahmed's blanket approval:**

1. ~~Batch review~~ — sections 9.3–16 approved as drafted.
2. ~~Insally specifics~~ — inferred problem framing confirmed; stage-based robot names are final.
3. ~~Location and availability~~ — omitted from the MVP (final decision).
4. ~~Biography depth~~ — the minimal confirmed-facts biography is final.
5. ~~RentFlow card image~~ — the English hero serves both locales.
6. ~~Asset actions~~ — section 16 approved; asset work pre-authorized for implementation phases.

New questions arising during implementation belong to their phase's notes, not this document.

## 18. Decision log

| Date | Decision | Status |
|------|----------|--------|
| 2026-08-01 | Created `phase-1-plan.md` as the single Phase 1 artifact with the four initial sections. | Done |
| 2026-08-01 | Proposed 8-section order matching the project overview, with purpose and position rationale per section. | Approved 2026-08-01 |
| 2026-08-01 | Proposed bilingual navigation labels and locale-identical Latin anchor IDs (`home`, `business-growth`, `services`, `projects`, `three-d`, `about`, `skills`, `contact`). | Approved 2026-08-01 |
| 2026-08-01 | Footer confirmed as a non-navigation element with no anchor. | Approved 2026-08-01 |
| 2026-08-01 | Step 1 approved by Ahmed, including the recommended Arabic labels تطوير الأعمال and أعمال ثلاثية الأبعاد. | Done |
| 2026-08-01 | Added "Source information" inventory; candidate featured-project pool set to Tavolla (bookingapp + booking-api), Insally, and RentFlow per Ahmed's request. | Done |
| 2026-08-01 | Ahmed confirmed: public brand name "Ahmed Webcraft" / «أحمد لصناعة الويب»; contact email lastamh@gmail.com; public spellings Tavolla and Insally; live URLs for all three projects (verified reachable); all three projects completed; 3D showcase content = Insally GLB models. | Done |
| 2026-08-01 | Ahmed confirmed: no professional title — the hero leads with his work and client value; LinkedIn URL; WhatsApp +966598143173 included as a contact method; Insally robots created with Meshy AI (Blender excluded pending separate confirmation). | Done |
| 2026-08-01 | Ahmed confirmed: project cards link only the provided live demo URLs (no repository links); Figma excluded from skills — he prototypes with AI tools. | Done |
| 2026-08-01 | Proposed "Positioning and voice": outcome-led bilingual positioning statement, three audience priorities (clients → recruiters → developers), four voice principles, avoid-list (incl. no 3D-artist claims — models are Meshy AI-generated), first-person singular naming with the Ahmed Webcraft brand. | Approved 2026-08-01 |
| 2026-08-01 | Ahmed requested a generic positioning statement; project-specific references removed from it (projects remain as proof elsewhere on the page). | Approved 2026-08-01 |
| 2026-08-01 | Arabic statement tightened at Ahmed's request: removed the double mention of bilingualism («ثنائية اللغة» dropped in favor of «بالعربية والإنجليزية») and reduced «أصمّم وأبني» to «أبني». | Approved 2026-08-01 |
| 2026-08-01 | Proposed bilingual hero content: eyebrow "Hi, I'm Ahmed" / «أهلاً، أنا أحمد», value-led heading, two-sentence proof-oriented paragraph, primary CTA to `#projects` (per Ahmed's work-first direction), secondary CTA to `#contact`; availability label omitted (unconfirmed). | Approved 2026-08-01 |
| 2026-08-01 | Proposed business-growth content: 5 of 7 overview benefits (presence, bilingual reach, UX, enquiries, interactivity) with bilingual titles/descriptions and a one-sentence intro; excluded Higher Conversion Potential (duplicates enquiries) and Long-Term Maintainability (engineering-facing). | Superseded — see next row |
| 2026-08-01 | Ahmed asked to reduce bilingual emphasis: "Bilingual Market Reach" card replaced with "Built to Grow With You" (maintainability, reframed client-friendly); voice avoid-list extended — bilingual support is mentioned at most once per section, never as a recurring theme. | Approved 2026-08-01 |
| 2026-08-01 | Proposed services content: six launch services — three primary backed by shipped products (business-websites, web-applications, interactive-3d) and three supporting (landing-pages, website-redesign, performance-optimization); excluded Bilingual Websites (de-emphasis rule) and Frontend Development (hiring skill, not client service). | Approved 2026-08-01 |
| 2026-08-01 | Proposed featured project selection: all three candidates recommended, display order Tavolla → RentFlow → Insally (strongest business story first, creative/3D range last as a bridge into the 3D showcase). | Approved 2026-08-01 |
| 2026-08-01 | At Ahmed's request, captured 6 RentFlow screenshots from the live site (desktop full/hero + mobile hero × EN/AR) into `context/reference/rentflow/` using the repo's screenshot approach; landing page confirmed public. Final asset prep remains Step 12. | Done |
| 2026-08-01 | Proposed Tavolla project-card content (Step 8, project 1 of 3): bilingual summary/problem/solution, five verified features, nine technologies, live-demo link only, `landing.png` recommended as the card screenshot; flagged the in-app "Tavola" spelling mismatch. | Approved 2026-08-01 (spelling mismatch accepted) |
| 2026-08-01 | Proposed RentFlow project-card content (Step 8, project 2 of 3): bilingual summary/problem/solution, five verified features (incl. the projects section's single bilingual mention), seven technologies, live-demo link only, captured EN hero recommended as the card screenshot. | Approved 2026-08-01 |
| 2026-08-01 | Ahmed directed: colors = exactly the prototype's; complete all remaining Phase 1 steps in one pass; no implementation code. | Done |
| 2026-08-01 | Proposed Insally card (Step 8, 3 of 3) from README/live-site facts; public site verified Arabic-only (`lang="ar" dir="rtl"`); business-problem framing flagged as inferred. | Approved 2026-08-01 (framing confirmed) |
| 2026-08-01 | Proposed 3D selection (Step 9): all three Insally stage robots via their optimized GLBs (1.96–2.18 MB); per-robot content prepared (`robot-primary`, `robot-middle`, `robot-highschool`); preview stills and display names outstanding. | Approved 2026-08-01 (stage names final) |
| 2026-08-01 | Proposed About (10A, confirmed-facts-only bios < 120 words), Skills (10B, five categories, evidence-backed only; localized SEO deferred), Contact & footer (10C, overview's suggested copy + confirmed methods; availability omitted). | Approved 2026-08-01 |
| 2026-08-01 | Proposed Visual foundations (Step 11): prototype tokens verbatim per Ahmed — Electric Blue `#3B82F6` + Indigo `#6366F1`, full dark/light semantic table, contrast cautions, Cairo + Inter, restraint rules. No alternative offered (prototype pre-approved). | Approved 2026-08-01 |
| 2026-08-01 | Proposed Asset preparation checklist (Step 12): 13-row manifest with paths, targets, bilingual alt drafts, and action buckets; no assets touched. | Approved 2026-08-01 (asset actions pre-authorized) |
| 2026-08-01 | Step 13 consistency audit run: all Phase 1 roadmap items addressed; anchors/labels consistent; no invented personal facts (one flagged inference: Insally problem framing); phase held at "In progress" pending the 6-item blocking checklist. | Done |
| 2026-08-01 | **Ahmed approved Phase 1 in full** (blanket approval of the batch + all defaults: location/availability omitted, minimal bio, EN RentFlow image for both locales). Phase status set to COMPLETE. Phase 2 (Foundation) is next; no code was written in Phase 1. | Done — Phase 1 closed |
