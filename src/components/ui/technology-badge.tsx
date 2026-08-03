import type { ReactNode } from "react";

// Technology badge per the prototype's .tag (base face at --step--1 scale;
// hover accent tint arrives with cards). rounded-[8px], not rounded-lg —
// the theme remaps --radius-lg to 24px.
export default function TechnologyBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[8px] border border-border bg-surface-2 px-[0.6rem] py-1 text-[0.72rem] font-medium text-fg-muted transition-all duration-250 ease-smooth">
      {children}
    </span>
  );
}
