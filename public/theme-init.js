// Sets data-theme before the app hydrates (dark is the default, matching the
// attribute-less CSS tokens). Served as a static file because React only
// executes <script async src> elements it renders — inline scripts in the
// component tree are neutered on any client-side (re-)mount.
(function () {
  var t = "dark";
  try {
    if (localStorage.theme === "light") t = "light";
  } catch {}
  document.documentElement.dataset.theme = t;
})();
