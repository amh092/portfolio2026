// Card class consts (not components — inner markup varies per section;
// Services reuses these in Step 4). Hover lift, pointer-follow glow, and
// neon shadows are Phase 5; hover here is the plain color transition.

/** Prototype .grid.g-3 — auto-fit card columns (business growth, services). */
export const CARD_GRID_CLASSES =
  "grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-[1.1rem]";

/** Prototype .grid.g-2 — wider auto-fit columns (skills; 3D work in Phase 6). */
export const CARD_GRID_WIDE_CLASSES =
  "grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[1.1rem]";

// Border color and padding are part of each variant (not the base) so the
// featured variant replaces border-border and the project variant drops the
// padding, instead of fighting the base for specificity.
const CARD_BASE_CLASSES =
  "relative overflow-hidden rounded-lg border bg-surface transition-[border-color,background-color] duration-400 ease-smooth hover:border-accent/40 hover:bg-surface-2";

/** Prototype .card: surface, border, hover tint. rounded-lg = the remapped 24px radius. */
export const CARD_SURFACE_CLASSES = `${CARD_BASE_CLASSES} border-border p-[1.6rem]`;

/** Prototype .card.featured: accent-tinted resting border (primary services). */
export const CARD_FEATURED_SURFACE_CLASSES = `${CARD_BASE_CLASSES} border-accent/35 p-[1.6rem]`;

/** Prototype .card.project: unpadded column card — media on top, body below. */
export const CARD_PROJECT_CLASSES = `${CARD_BASE_CLASSES} border-border flex flex-col`;

/** Prototype .card-icon: accent chip; sizes any lucide svg dropped inside. */
export const CARD_ICON_CLASSES =
  "mb-[1.1rem] grid size-11 place-items-center rounded-[13px] border border-accent/25 bg-accent/12 text-accent [&_svg]:size-[21px]";
