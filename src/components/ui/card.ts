// Card class consts (not components — inner markup varies per section;
// Services reuses these in Step 4). Hover lift, pointer-follow glow, and
// neon shadows are Phase 5; hover here is the plain color transition.

/** Prototype .grid.g-3 — auto-fit card columns (business growth, services). */
export const CARD_GRID_CLASSES =
  "grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-[1.1rem]";

// Border color is part of each variant (not the base) so the featured
// variant replaces border-border instead of fighting it for specificity.
const CARD_BASE_CLASSES =
  "relative overflow-hidden rounded-lg border bg-surface p-[1.6rem] transition-[border-color,background-color] duration-400 ease-smooth hover:border-accent/40 hover:bg-surface-2";

/** Prototype .card: surface, border, hover tint. rounded-lg = the remapped 24px radius. */
export const CARD_SURFACE_CLASSES = `${CARD_BASE_CLASSES} border-border`;

/** Prototype .card.featured: accent-tinted resting border (primary services). */
export const CARD_FEATURED_SURFACE_CLASSES = `${CARD_BASE_CLASSES} border-accent/35`;

/** Prototype .card-icon: accent chip; sizes any lucide svg dropped inside. */
export const CARD_ICON_CLASSES =
  "mb-[1.1rem] grid size-11 place-items-center rounded-[13px] border border-accent/25 bg-accent/12 text-accent [&_svg]:size-[21px]";
