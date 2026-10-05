// Renders every <section class="frame"> in a story.html to a 1080x1920 PNG (01.png, 02.png, ...).
// Usage: npm run story -- insta-story/techlab-interview/story.html
const { chromium } = require("playwright");
const { resolve, dirname, join } = require("node:path");
const { pathToFileURL } = require("node:url");

const [input, outDir = dirname(input || ".")] = process.argv.slice(2);
if (!input) {
  console.error("usage: node build.cjs <story.html> [out-dir]");
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(pathToFileURL(resolve(input)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Fonts live in matome/fonts and insta-story/fonts; fail loudly instead of rendering with a fallback font.
  // Every family the page declares must have loaded at least one face, and no face may have failed.
  const missing = await page.evaluate(() => {
    const faces = [...document.fonts].map((f) => ({ family: f.family.replace(/"/g, ""), status: f.status }));
    const loaded = new Set(faces.filter((f) => f.status === "loaded").map((f) => f.family));
    const failed = faces.filter((f) => f.status === "error").map((f) => f.family);
    return [...new Set([...faces.map((f) => f.family).filter((f) => !loaded.has(f)), ...failed])];
  });
  if (missing.length) throw new Error(`fonts failed to load: ${missing.join(", ")}`);
  // Instagram's reply bar covers the bottom of a story: nothing but backgrounds, the "next" hint
  // and decoration may sit below 1590px.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll("section.frame")].flatMap((frame, i) => {
      const top = frame.getBoundingClientRect().top;
      const bottom = Math.max(...[...frame.children].filter((el) => !el.matches(".bg, .next, .deco")).map((el) => el.getBoundingClientRect().bottom - top));
      return bottom > 1590 ? [`frame ${i + 1} ends at ${Math.round(bottom)}px`] : [];
    }),
  );
  if (overflow.length) throw new Error(`content runs into Instagram's reply bar: ${overflow.join(", ")}`);
  const frames = await page.$$("section.frame");
  for (const [i, frame] of frames.entries()) {
    const out = join(outDir, `${String(i + 1).padStart(2, "0")}.png`);
    await frame.screenshot({ path: out });
    console.log(`wrote ${out}`);
  }
  await browser.close();
})();
