// Renders the character SVG to two 1000x1000 PNGs with Chromium:
//   <name>.png         transparent background (for overlays on videos / slides)
//   <name>-icon.png    pink background with butterflies (for profile icons)
// Usage: npm run character -- character/hina-chibi.svg
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const [input] = process.argv.slice(2);
if (!input) {
  console.error("usage: node render.cjs <character.svg>");
  process.exit(1);
}
const svg = readFileSync(resolve(input), "utf8");
const base = input.replace(/\.svg$/, "");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
  for (const [output, css, omitBackground] of [
    [`${base}.png`, "#bg{display:none}", true],
    [`${base}-icon.png`, "", false],
  ]) {
    await page.setContent(`<style>html,body{margin:0;background:transparent}${css}</style>${svg}`);
    await page.screenshot({ path: output, clip: { x: 0, y: 0, width: 1000, height: 1000 }, omitBackground });
    console.log(`wrote ${output}`);
  }
  await browser.close();
})();
