import type { ReactNode } from "react";

// Technology badge per the prototype's .tag (base face at --step--1 scale).
export default function TechnologyBadge({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
