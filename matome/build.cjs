// Renders an HTML file to PDF with Chromium. The page size comes from the file's
// CSS @page rule (1280x720 slides, A4 guides); 1280x720 is the fallback.
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
  // Fonts live in matome/fonts; load every @font-face the file declares and fail
  // loudly instead of silently printing with a fallback font.
  const missing = await page.evaluate(async () => {
    const faces = [...document.fonts];
    await Promise.allSettled(faces.map((f) => f.load()));
    return faces.filter((f) => f.status !== "loaded").map((f) => `${f.family.replace(/"/g, "")} ${f.weight}`);
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
