import Eyebrow from "@/components/ui/eyebrow";

type SectionHeadingProps = {
  /** id for the heading element, referenced by the section's aria-labelledby */
  headingId: string;
  title: string;
  /** Eyebrow pill above the title (glowing-dot prefix, uppercase EN only) */
  eyebrow?: string;
  /** Supporting line under the title (prototype .sec-sub) */
  sub?: string;
  center?: boolean;
  /** 1.5rem bottom margin instead of the fluid clamp — prototype's about head */
  tight?: boolean;
};

// Section head per the prototype's .sec-head pattern (h2 — the page's
// single h1 lives in the hero, which has its own markup).
export default function SectionHeading({
  headingId,
  title,
  eyebrow,
  sub,
  center = false,
  tight = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`${tight ? "mb-6" : "mb-[clamp(2.5rem,5vw,4rem)]"} max-w-[64ch]${
        center ? " mx-auto text-center" : ""
      }`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={headingId} className="mb-[0.9rem] text-step-3">
        {title}
      </h2>
      {sub && (
        <p
          className={`max-w-[58ch] text-step-1 font-normal text-fg-muted${
            center ? " mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
