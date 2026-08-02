import type { ReactNode } from "react";

type StatusPillProps = {
  /** Phase 4 ships only green "completed"; amber exists in tokens but is unused */
  status: "completed" | "in-progress";
  children: ReactNode;
};

// Status pill per the prototype's .status; positioning inside a card
// (e.g. over project media) is the consumer's job.
export default function StatusPill({ status, children }: StatusPillProps) {
  return <span className={`status-pill status-${status}`}>{children}</span>;
}
