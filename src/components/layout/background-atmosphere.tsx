// Fixed page backdrop per the prototype: radial accent glows (before:),
// a radial-masked 64px grid, and two blurred orbs. Fully static in Phase 4 —
// drift/pulse animation is Phase 5. The glows live on a ::before so Phase 5
// can animate them independently of the container.
const BG_FX_CLASSES =
  "pointer-events-none fixed inset-0 -z-1 overflow-hidden before:absolute before:inset-0 before:content-[''] before:bg-[radial-gradient(60rem_40rem_at_12%_-8%,rgb(var(--accent)/calc(0.16*var(--glow-a)*2)),transparent_60%),radial-gradient(50rem_36rem_at_92%_8%,rgb(var(--accent-2)/calc(0.13*var(--glow-a)*2)),transparent_60%),radial-gradient(70rem_50rem_at_50%_108%,rgb(var(--accent)/calc(0.1*var(--glow-a)*2)),transparent_65%)]";

const BG_GRID_CLASSES =
  "absolute inset-0 bg-[linear-gradient(rgb(var(--fg)/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--fg)/0.045)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(closest-side_at_50%_30%,#000_20%,transparent_88%)]";

// -start-*/-end-* keep the logical-property RTL flip of the prototype.
const ORB_CLASSES =
  "absolute rounded-full opacity-[calc(var(--glow-a)*0.55)] blur-[80px]";
const ORB_1_CLASSES = "-top-32 -start-24 size-[32rem] bg-accent/50";
const ORB_2_CLASSES = "bottom-[10%] -end-32 size-[26rem] bg-accent-2/45";

export default function BackgroundAtmosphere() {
  return (
    <div aria-hidden className={BG_FX_CLASSES}>
      <div className={BG_GRID_CLASSES} />
      <div className={`${ORB_CLASSES} ${ORB_1_CLASSES}`} />
      <div className={`${ORB_CLASSES} ${ORB_2_CLASSES}`} />
    </div>
  );
}
