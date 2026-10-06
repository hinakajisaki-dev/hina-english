// Renders every .svg in a folder to a transparent .png (2x) for the slides.
// The PPTX export can only place raster images, so slides use the PNGs; the SVGs stay editable.
// Usage: npm run illust -- matome/a-the/illust matome/a-the/img
const { chromium } = require("playwright");
const { readdirSync, readFileSync, mkdirSync } = require("node:fs");
const { join, resolve } = require("node:path");

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node render-illust.cjs <svg-dir> <png-dir>");
  process.exit(1);
}

// Text inside an illustration (e.g. "CAFE") uses the deck's DM Sans.
const fontsDir = join(__dirname, "fonts");
const fontFace = [500, 700, 800]
  .map((w) => {
    const data = readFileSync(join(fontsDir, `DMSans-${w}.woff2`)).toString("base64");
    return `@font-face { font-family: "DM Sans"; font-weight: ${w}; src: url(data:font/woff2;base64,${data}) format("woff2"); }`;
  })
  .join("\n");

(async () => {
  mkdirSync(output, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 400 }, deviceScaleFactor: 2 });
  for (const file of readdirSync(input).filter((f) => f.endsWith(".svg")).sort()) {
    const svg = readFileSync(join(input, file), "utf8");
    await page.setContent(`<style>${fontFace} html, body { margin: 0; background: transparent; } svg { display: block; }</style>${svg}`);
    await page.evaluate(() => document.fonts.ready);
    const out = resolve(output, file.replace(/\.svg$/, ".png"));
    await page.locator("svg").screenshot({ path: out, omitBackground: true });
    console.log(`wrote ${out}`);
  }
  await browser.close();
})();
