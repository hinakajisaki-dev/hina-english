// Renders a slides.html file to a 16:9 PDF (1280x720 per page) with Chromium.
// Usage: npm run matome -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pdf
const { chromium } = require("playwright");
const { resolve } = require("node:path");
const { pathToFileURL } = require("node:url");

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node build.cjs <slides.html> <out.pdf>");
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(pathToFileURL(resolve(input)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Fonts live in matome/fonts; fail loudly instead of silently printing with a fallback font.
  const missing = await page.evaluate(() => {
    const loaded = new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "")));
    return ["Nunito", "Zen Maru Gothic"].filter((f) => !loaded.has(f));
  });
  if (missing.length) throw new Error(`fonts failed to load: ${missing.join(", ")}`);
  await page.pdf({
    path: output,
    width: "1280px",
    height: "720px",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log(`wrote ${output}`);
})();
