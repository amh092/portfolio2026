import type { ReactNode } from "react";

/** Prototype .container-page: min(100% - 2.5rem, --container), centered. */
export const CONTAINER_CLASSES = "mx-auto w-[min(100%_-_2.5rem,var(--container))]";

/** Prototype section padding: fluid block padding, 3.5rem under 560px. */
export const SECTION_PAD_CLASSES = "py-(--section-pad) max-[560px]:py-14";

type SectionProps = {
  /** Anchor id — must stay in sync with src/data/sections.ts (scrollspy) */
  id: string;
  /** id of the heading element inside (SectionHeading's headingId) */
  ariaLabelledby: string;
  /** Extra classes appended to the <section> element */
  className?: string;
  children: ReactNode;
};

// Shared section skeleton: padded <section> wrapping a centered container.
// The hero has its own layout and does not use this.
export default function Section({
  id,
  ariaLabelledby,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`${SECTION_PAD_CLASSES}${className ? ` ${className}` : ""}`}
    >
      <div className={CONTAINER_CLASSES}>{children}</div>
    </section>
  );
}
