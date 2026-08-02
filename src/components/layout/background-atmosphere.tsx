// Fixed page backdrop per the prototype: radial accent glows (via .bg-fx),
// a radial-masked 64px grid, and two blurred orbs. Fully static in Phase 4 —
// drift/pulse animation is Phase 5.
export default function BackgroundAtmosphere() {
  return (
    <div aria-hidden className="bg-fx">
      <div className="bg-grid" />
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
    </div>
  );
}
