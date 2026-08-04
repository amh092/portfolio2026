import type { ReactNode } from "react";

// rtl: stands in for the old html[lang="ar"] override — valid while ar is
// the only RTL locale (layout.tsx sets dir="rtl" exactly for ar).
const EYEBROW_CLASSES =
  "mb-[1.1rem] inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-[0.8rem] py-[0.35rem] text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent before:size-[5px] before:rounded-full before:bg-accent before:shadow-[0_0_8px_rgb(var(--accent))] before:content-[''] rtl:text-[0.78rem] rtl:normal-case rtl:tracking-normal";

/** Eyebrow pill with glowing-dot prefix (uppercase EN only; plain-case AR). */
export default function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className ? `${EYEBROW_CLASSES} ${className}` : EYEBROW_CLASSES}
    >
      {children}
    </span>
  );
}
