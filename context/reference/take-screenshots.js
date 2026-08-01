const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const PROTO = "file:///Users/ahmed/Projects/react/portfolio/ahmed-portfolio-prototype.html";
const OUT = "/Users/ahmed/Projects/react/portfolio/context/reference";

const settle = (ms) => new Promise((r) => setTimeout(r, ms));

async function prepare(page) {
  // wait for webfonts and CDN scripts to settle
  await page.evaluate(() => document.fonts.ready);
  await settle(1500);
  // force all scroll-reveal elements visible so the full-page capture
  // (which doesn't scroll, so ScrollTrigger never fires) shows every section
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((n) => {
      n.classList.add("is-revealed");
      n.style.opacity = "1";
      n.style.transform = "none";
    });
  });
  await settle(400);
}

async function shot(page, name, fullPage = true) {
  const file = path.join(OUT, name);
  await page.screenshot({ path: file, fullPage });
  console.log("saved", name);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--hide-scrollbars", "--force-color-profile=srgb"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. desktop / dark / EN
  await page.goto(PROTO, { waitUntil: "networkidle0", timeout: 60000 });
  await prepare(page);
  await shot(page, "prototype-desktop-dark-en.png");
  await shot(page, "prototype-hero-dark-en.png", false);

  // 2. desktop / light / EN
  await page.evaluate(() => window.PROTO.setTheme("light"));
  await settle(600);
  await shot(page, "prototype-desktop-light-en.png");

  // 3. desktop / dark / AR (RTL)
  await page.evaluate(() => {
    window.PROTO.setTheme("dark");
    window.PROTO.setLocale("ar", { keepHash: false });
  });
  await settle(800);
  await shot(page, "prototype-desktop-dark-ar.png");

  // 4. mobile / dark / EN
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(PROTO, { waitUntil: "networkidle0", timeout: 60000 });
  await prepare(page);
  await shot(page, "prototype-mobile-dark-en.png");

  await browser.close();
})();
