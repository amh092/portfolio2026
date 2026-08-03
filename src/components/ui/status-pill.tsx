import type { ReactNode } from "react";

type StatusPillProps = {
  /** Phase 4 ships only green "completed"; amber exists in tokens but is unused */
  status: "completed" | "in-progress";
  children: ReactNode;
};

// Literal class map — Tailwind's scanner can't see interpolated names like
// `status-${status}`. rtl: stands in for the old html[lang="ar"] override.
const BASE_CLASSES =
  "inline-flex items-center rounded-full border bg-bg/60 px-[0.7rem] py-[0.3rem] text-[0.68rem] font-bold uppercase tracking-[0.08em] backdrop-blur-[10px] rtl:normal-case rtl:tracking-normal";

const STATUS_CLASSES: Record<StatusPillProps["status"], string> = {
  completed: "text-[#22c55e] border-[#22c55e40]",
  "in-progress": "text-[#f59e0b] border-[#f59e0b40]",
};

// Status pill per the prototype's .status; positioning inside a card
// (e.g. over project media) is the consumer's job.
export default function StatusPill({ status, children }: StatusPillProps) {
  return (
    <span className={`${BASE_CLASSES} ${STATUS_CLASSES[status]}`}>
      {children}
    </span>
  );
}
