// Phase 5 hero entrance gate (styles in globals.css HERO ENTRANCE). Same
// static-file pattern as theme-init.js: React only executes <script async src>
// resources it renders. The SSR markup never hides the hero — hiding and
// animating happen only under the html class this script adds, so no-JS,
// reduced-motion, and later-in-session visitors always get a static hero.
(function () {
  try {
    // Once per browser session: the flag is consumed on the first load, so
    // reloads and the locale-switch remount never replay the entrance.
    if (sessionStorage.heroEntrancePlayed) return;
    sessionStorage.heroEntrancePlayed = "1";
  } catch {
    return; // storage blocked → can't guarantee once-per-session → stay static
  }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var html = document.documentElement;
  html.classList.add("hero-entrance");
  // The timeline ends at ~1.4s (250ms lead-in + 0.9s + 3 × 0.09s stagger).
  // Removing the class after it is both the safety net (nothing can stay
  // hidden past 2s even if the animation never runs) and the replay guard
  // for same-session remounts.
  setTimeout(function () {
    html.classList.remove("hero-entrance");
  }, 2000);
})();
