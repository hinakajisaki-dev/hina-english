// Draws the fruit icons used in slides.html and saves them as PNGs, so the PDF and the
// .pptx show the same pictures. The apple and the orange come from the Noto Color Emoji
// font (SIL OFL); needs it installed (e.g. `apt install fonts-noto-color-emoji`).
// The emoji banana is peeled and there is no green one, so both bananas are drawn here
// from one shape: yellow for 助動詞, green for 動詞.
// Usage: node matome/sentence-structure/make-fruits.cjs
const { chromium } = require("playwright");
const { writeFileSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const SIZE = 160; // px, square
const banana = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <path fill="${c.stem}" d="M 118 42 L 138 42 L 142 18 C 140 13, 130 11, 126 16 Z"/>
  <path fill="${c.body}" d="M 16 104 C 44 146, 114 144, 136 98 C 146 76, 146 58, 138 40 L 116 40 C 116 62, 106 80, 88 92 C 66 106, 40 108, 16 104 Z"/>
  <path fill="${c.shade}" d="M 16 104 C 44 146, 114 144, 136 98 C 146 76, 146 58, 138 40 C 140 68, 130 98, 106 114 C 80 130, 46 128, 16 104 Z"/>
  <path fill="${c.light}" d="M 40 110 C 72 116, 100 100, 112 74 C 112 96, 88 118, 40 110 Z"/>
  <circle fill="${c.tip}" cx="17" cy="104" r="7"/>
</svg>`;

const FRUITS = [
  { file: "apple.png", emoji: "🍎" },
  { file: "banana.png", svg: banana({ body: "#FFD43B", shade: "#F2B200", light: "#FFEC94", stem: "#9C7A2E", tip: "#5A3D1E" }) },
  { file: "banana-green.png", svg: banana({ body: "#8CC63F", shade: "#6EA62C", light: "#BFE38A", stem: "#5E7D2A", tip: "#4A3A1E" }) },
  { file: "orange.png", emoji: "🍊" },
];

async function draw({ emoji, svg, size }) {
  const big = document.createElement("canvas");
  big.width = big.height = size * 2;
  const ctx = big.getContext("2d");
  if (svg) {
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await img.decode();
    ctx.drawImage(img, 0, 0, big.width, big.height);
  } else {
    ctx.font = `${size * 1.2}px "Noto Color Emoji"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, size, size);
  }
  const px = ctx.getImageData(0, 0, big.width, big.height).data;

  // Crop to the drawn pixels and center them in a square.
  let [l, t, r, btm] = [big.width, big.height, 0, 0];
  for (let y = 0; y < big.height; y++)
    for (let x = 0; x < big.width; x++)
      if (px[(y * big.width + x) * 4 + 3] > 8) { l = Math.min(l, x); t = Math.min(t, y); r = Math.max(r, x); btm = Math.max(btm, y); }
  const w = r - l + 1, h = btm - t + 1, side = Math.max(w, h);
  const out = document.createElement("canvas");
  out.width = out.height = size;
  const k = size / side;
  out.getContext("2d").drawImage(big, l, t, w, h, (size - w * k) / 2, (size - h * k) / 2, w * k, h * k);
  return out.toDataURL("image/png").split(",")[1];
}

(async () => {
  const dir = join(__dirname, "fruits");
  mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`<p style="font-family:'Noto Color Emoji'">${FRUITS.map((f) => f.emoji || "").join("")}</p>`);
  await page.evaluate(() => document.fonts.ready);
  for (const fruit of FRUITS) {
    const png = await page.evaluate(draw, { ...fruit, size: SIZE }).then((b64) => Buffer.from(b64, "base64"));
    writeFileSync(join(dir, fruit.file), png);
    console.log(`wrote ${join(dir, fruit.file)}`);
  }
  await browser.close();
})();
