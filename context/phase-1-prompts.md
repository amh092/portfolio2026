# Phase 1 — Reviewable Prompts

These prompts split Phase 1 (planning and content) into small approval gates. Run them **one at a time, in order**. Do not run the next prompt until the current result has been reviewed and approved.

## Shared rules for every prompt

- Read `context/project-overview.md` before doing any work.
- Read `context/phase-1-plan.md` if it exists.
- This phase is planning and content only. Do not implement React, Next.js, CSS, configuration, routing, animations, or 3D viewers.
- Work on only the requested step. Do not anticipate or complete later steps.
- Never invent personal details, experience, metrics, links, project results, or technical claims.
- When required information is missing, add a short `Open questions` subsection instead of guessing.
- Keep Arabic natural and professional; do not translate word-for-word when that sounds unnatural.
- Keep English concise, business-focused, and easy to scan.
- Do not create multiple planning files. Use `context/phase-1-plan.md` as the single living Phase 1 artifact.
- Do not add, copy, rename, optimize, or delete image/model assets unless the prompt explicitly requests it and I approve the exact files first.
- At the end, summarize only: what changed, unresolved questions, and what I should review.
- Stop after the requested step and wait for approval.

---

## Step 1 — Freeze the page structure

```text
Follow the shared rules in context/phase-1-prompts.md.

Create context/phase-1-plan.md with only these initial sections:
1. Phase status
2. Approved page structure
3. Open questions
4. Decision log

Review the one-page sections proposed in context/project-overview.md. Recommend the final section order and the English/Arabic navigation labels and anchor IDs. Keep anchor IDs identical across locales. For each section, add one sentence describing its purpose and one sentence explaining why it belongs in that position.

Do not write the actual section copy yet. Mark every recommendation as "Proposed" and set the phase status to "In progress — awaiting structure approval". Stop for review.
```

Review: section order, labels, anchor IDs, and whether every section is necessary.

## Step 2 — Collect the factual source material

```text
Follow the shared rules in context/phase-1-prompts.md.

Update only a new "Source information" section in context/phase-1-plan.md. Inspect the repository for existing factual content, links, project names, and assets, but do not modify anything except the Phase 1 plan.

Organize confirmed information under:
- Personal identity and professional positioning
- Contact and professional links
- Development projects
- 3D work
- Skills and tools
- Existing images and models

Clearly label each item as Confirmed, Needs verification, or Missing. Ask the smallest possible set of questions needed to fill the missing personal and portfolio facts. Do not draft marketing copy and do not infer facts from filenames alone. Stop for review and answers.
```

Review: factual accuracy and unanswered questions.

## Step 3 — Approve positioning and voice

```text
Follow the shared rules in context/phase-1-prompts.md.

Using only confirmed source information, update only a new "Positioning and voice" section in context/phase-1-plan.md.

Provide:
- One concise positioning statement in English
- One natural Arabic equivalent
- Three audience priorities, ordered by importance
- Four voice principles
- A short list of claims or tones to avoid
- A preferred first-person naming convention in both languages

Offer no more than two alternatives when a meaningful choice exists, clearly recommend one, and explain the tradeoff in one sentence. Do not write section copy yet. Stop for review.
```

Review: whether the positioning sounds truthful, distinctive, and appropriate for clients and employers.

## Step 4 — Draft the hero content

```text
Follow the shared rules in context/phase-1-prompts.md.

Update only a new "Hero content" section in context/phase-1-plan.md. Draft one recommended bilingual hero, using the approved positioning and confirmed facts.

Include in English and Arabic:
- Eyebrow text, if useful
- Main heading
- Supporting paragraph
- Primary CTA label and destination anchor
- Secondary CTA label and destination anchor
- Optional availability label only if availability is confirmed

Keep the heading short, the paragraph to no more than two sentences, and CTA labels concise. Explain any intentional difference between the Arabic and English phrasing. Do not create visual design or code. Stop for review.
```

Review: clarity in the first five seconds, factual accuracy, and CTA priority.

## Step 5 — Draft business-growth content

```text
Follow the shared rules in context/phase-1-prompts.md.

Update only a new "Business growth content" section in context/phase-1-plan.md.

Select five benefits from the project overview that best match the approved positioning. For each benefit, draft an English title and description plus a natural Arabic title and description. Each description must be one short sentence and must not promise unverified results or use invented statistics.

Add a one-sentence section introduction in each language. Do not draft services or other sections. Stop for review.
```

Review: relevance, lack of repetition, and whether every benefit explains business value.

## Step 6 — Draft service content

```text
Follow the shared rules in context/phase-1-prompts.md.

Update only a new "Services content" section in context/phase-1-plan.md.

Based on confirmed capabilities, recommend no more than six launch services. For each service include:
- Stable ID
- English title and one-sentence description
- Arabic title and one-sentence description
- The customer problem it addresses
- Whether it is a primary or supporting service

Do not include a service merely because it appears in the overview; unsupported services must go in a short "Excluded for now" list. Do not choose icons or build cards. Stop for review.
```

Review: whether Ahmed can confidently deliver and discuss every listed service.

## Step 7 — Select featured development projects

```text
Follow the shared rules in context/phase-1-prompts.md.

Update only a new "Featured project selection" section in context/phase-1-plan.md.

Evaluate only confirmed development projects. Create a compact comparison table using: relevance to target visitors, business value, visual quality, technical range, bilingual relevance, link availability, and completion status. Recommend at most three projects for launch and explain the selection order.

List missing information separately for each candidate. Do not draft full project-card copy, edit screenshots, or create project data files. If there is not enough evidence to select projects, say so and ask focused questions. Stop for review.
```

Review: selected projects, order, and omitted projects.

## Step 8 — Prepare one development project at a time

Run this prompt separately for each approved project.

```text
Follow the shared rules in context/phase-1-prompts.md.

Prepare content for only this approved development project: [PROJECT NAME]. Update only its subsection inside a new or existing "Featured project content" section in context/phase-1-plan.md.

Using confirmed facts only, provide:
- Slug
- English and Arabic title
- English and Arabic summary
- Business problem in both languages
- Implemented solution in both languages
- Three to five verified key features in both languages
- Technologies used
- Live URL and repository URL, when confirmed
- Status
- Recommended existing screenshot, if one exists
- Exact missing facts or asset needs

Do not process any other project. Do not create, capture, copy, rename, or optimize screenshots. Stop for review.
```

Review: one project’s accuracy, business story, links, and screenshot choice.

## Step 9 — Select and prepare 3D work one item at a time

First run the selection prompt:

```text
Follow the shared rules in context/phase-1-prompts.md.

Update only a new "3D work selection" section in context/phase-1-plan.md. Inventory confirmed 3D work without modifying assets. Recommend at most three launch items based on visual quality, relevance, file readiness, preview availability, mobile suitability, and performance risk. List missing facts and assets per item. Do not draft final descriptions. Stop for review.
```

After approving the selection, run this prompt once per item:

```text
Follow the shared rules in context/phase-1-prompts.md.

Prepare content for only this approved 3D item: [3D ITEM NAME]. Update only its subsection under "3D work content" in context/phase-1-plan.md.

Include confirmed values for slug, bilingual title, bilingual description, tools used, interactive/static status, model path, model size, preview-image path, fallback needs, and any performance concern. Do not process another item and do not modify assets. Stop for review.
```

Review: showcase readiness, fallback coverage, and performance risk for each item.

## Step 10 — Draft About, Skills, Contact, and Footer separately

Run each lettered prompt separately.

### 10A — About

```text
Follow the shared rules in context/phase-1-prompts.md. Update only a new "About content" section in context/phase-1-plan.md. Draft a concise English biography and a natural Arabic biography using confirmed facts. Include working approach, current focus, and desired project types only when confirmed. Keep each biography under 120 words. Stop for review.
```

### 10B — Skills

```text
Follow the shared rules in context/phase-1-prompts.md. Update only a new "Skills content" section in context/phase-1-plan.md. Group only confirmed skills into a small number of useful categories. Flag anything that needs verification and exclude unjustified proficiency percentages. Do not create icons or UI. Stop for review.
```

### 10C — Contact and footer

```text
Follow the shared rules in context/phase-1-prompts.md. Update only a new "Contact and footer content" section in context/phase-1-plan.md. Draft bilingual contact heading, supporting copy, CTA/form labels, social-link labels, simple footer text, and back-to-top label. Include only confirmed contact methods and links. Do not implement or select an email provider. Stop for review.
```

Review each subsection independently before running the next one.

## Step 11 — Approve colors and typography

```text
Follow the shared rules in context/phase-1-prompts.md. Also read context/styling-reference.md and inspect the existing reference images. Update only a new "Visual foundations" section in context/phase-1-plan.md.

Document one recommended design direction containing:
- Main neon accent and optional secondary accent
- Dark and light semantic color tokens with hex values
- Text, background, surface, border, focus, and status colors
- Contrast cautions that require later testing
- Arabic font choice
- English font choice
- Font-role guidance for headings, body text, labels, and code/technology text
- Restraint rules for glow, gradients, and pulsing

Stay consistent with the approved prototype direction. Do not edit CSS, download fonts, generate images, or create theme files. If you present an alternative, limit it to one and state why the recommendation is stronger. Stop for review.
```

Review: accent choice, readability, bilingual typography, and consistency with the references.

## Step 12 — Plan asset preparation without changing assets

```text
Follow the shared rules in context/phase-1-prompts.md.

Update only a new "Asset preparation checklist" section in context/phase-1-plan.md. Based on approved projects and 3D items, produce an exact asset manifest. For each required screenshot, preview, or model include its current path if present, proposed final path, intended use, required dimensions or size target, format, alt-text draft in both languages, and preparation status.

Separate actions into Keep as-is, Needs user-supplied source, Capture later, Optimize later, and Exclude. Do not touch any asset. Do not propose bulk generation. Stop for review and explicit approval of future asset work.
```

Review: whether every asset is necessary and whether its source and ownership are clear.

## Step 13 — Final Phase 1 consistency audit

```text
Follow the shared rules in context/phase-1-prompts.md.

Audit context/phase-1-plan.md against Phase 1 in context/project-overview.md. Do not rewrite approved content unless correcting a clear inconsistency; list suggested changes for approval instead.

Check:
- Every Phase 1 roadmap item is addressed
- English and Arabic content correspond naturally
- Navigation labels and anchors are consistent
- No personal facts, results, or capabilities were invented
- Selected projects and 3D items have required content and asset plans
- Links and statuses are explicit
- Colors and typography are decided
- Open questions and unresolved decisions are visible

Update only the Phase status, Open questions, and Decision log. Mark Phase 1 "Ready for approval" only if nothing required is unresolved; otherwise keep it "In progress" and give a short blocking checklist. Do not start Phase 2. Stop for final review.
```

Review: the blocking checklist and readiness to begin Phase 2.
