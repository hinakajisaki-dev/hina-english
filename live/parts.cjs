// Pieces shared by every live deck: text helpers, the header, the Okinawa title slide,
// the ending slide and the page wrapper. Decks are built with live/build.cjs.
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;br&gt;/g, "<br>");
const slot = (s) => esc(s).replace(/〇〇(ing)?/g, '<span class="slot">$&</span>'); // the blank in a pattern
const hi = (s) => esc(s).replace(/\[([^\]]+)\]/g, '<span class="v">$1</span>'); // [the pattern part] of a sentence
const latin = (s) =>
  s.split("<br>").map((part) => esc(part).replace(/[A-Za-z0-9][A-Za-z0-9 ]*[A-Za-z0-9]|[A-Za-z0-9]/g, '<span class="en">$&</span>')).join("<br>");
const two = (n) => String(n).padStart(2, "0");

// The salon logo's asterisk, as four filled bars (the .pptx builder turns filled SVG paths
// in slide pixels into shapes; strokes would be lost).
function asterisk(cx, cy, r, t) {
  return [0, 45, 90, 135].map((deg) => {
    const a = (deg * Math.PI) / 180;
    const [dx, dy] = [Math.cos(a) * r, Math.sin(a) * r];
    const [nx, ny] = [(-Math.sin(a) * t) / 2, (Math.cos(a) * t) / 2];
    const pts = [[cx - dx + nx, cy - dy + ny], [cx + dx + nx, cy + dy + ny], [cx + dx - nx, cy + dy - ny], [cx - dx - nx, cy - dy - ny]];
    return `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")} Z`;
  });
}
const LOGO = asterisk(82, 58, 10.5, 3.6); // centre of .mark in the header
const deco = (...paths) => `<svg class="deco" viewBox="0 0 1280 720" aria-hidden="true">${paths.flat().map((d) => `<path d="${d}"/>`).join("")}</svg>`;

const header = (right = "") => `
  <header class="top">
    <div class="logo"><span class="mark"></span><b>Hina English</b></div>
    ${right}
  </header>`;

// Decorations for the title slide, as filled SVG paths in slide pixels. Curved shapes are
// drawn with Bézier curves because the .pptx builder only reads M/L/C/Z paths.
const f = (n) => +n.toFixed(1);
const pt = ([x, y]) => `${f(x)} ${f(y)}`;
function circle(cx, cy, r) {
  const k = r * 0.5523;
  return `M ${pt([cx + r, cy])} C ${pt([cx + r, cy + k])} ${pt([cx + k, cy + r])} ${pt([cx, cy + r])} C ${pt([cx - k, cy + r])} ${pt([cx - r, cy + k])} ${pt([cx - r, cy])} C ${pt([cx - r, cy - k])} ${pt([cx - k, cy - r])} ${pt([cx, cy - r])} C ${pt([cx + k, cy - r])} ${pt([cx + r, cy - k])} ${pt([cx + r, cy])} Z`;
}
const rect = (x, y, w, h) => `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
function sparkle(cx, cy, s) {
  const a = f(s * 0.14);
  return `M ${cx} ${cy - s} C ${cx + a} ${cy - a} ${cx + a} ${cy - a} ${cx + s} ${cy} C ${cx + a} ${cy + a} ${cx + a} ${cy + a} ${cx} ${cy + s} C ${cx - a} ${cy + a} ${cx - a} ${cy + a} ${cx - s} ${cy} C ${cx - a} ${cy - a} ${cx - a} ${cy - a} ${cx} ${cy - s} Z`;
}
// A pointed leaf (or a rounded petal, with round = true) from a base point towards an angle (degrees, 0 = right, 90 = down).
function leaf(x, y, len, w, deg, round = false) {
  const a = (deg * Math.PI) / 180;
  const d = [Math.cos(a), Math.sin(a)];
  const n = [-d[1], d[0]];
  const at = (along, side) => [x + d[0] * len * along + n[0] * w * side, y + d[1] * len * along + n[1] * w * side];
  const [near, far] = round ? [0.15, 1.1] : [0.3, 0.75];
  return `M ${pt([x, y])} C ${pt(at(near, 1))} ${pt(at(far, round ? 0.9 : 1))} ${pt(at(1, 0))} C ${pt(at(far, round ? -0.9 : -1))} ${pt(at(near, -1))} ${pt([x, y])} Z`;
}
// Hibiscus: five round petals, a dark centre and a stamen with a yellow tip.
function hibiscus(cx, cy, size, petal, centre, turn = 0) {
  const petals = [0, 1, 2, 3, 4].map((k) => [leaf(cx, cy, size, size * 0.62, turn - 90 + k * 72, true), petal]);
  const a = ((turn - 54) * Math.PI) / 180;
  const tip = [cx + Math.cos(a) * size * 0.8, cy + Math.sin(a) * size * 0.8];
  return [...petals, [circle(cx, cy, size * 0.2), centre], [leaf(cx, cy, size * 0.8, size * 0.05, turn - 54), centre], [circle(...tip, size * 0.09), "#FFD24A"]];
}
// ミンサー織り: groups of five and four squares (いつ（五つ）の世（四つ）までも).
function minsa(y, size, gap) {
  const squares = [];
  let x = 18;
  while (x < 1280) {
    for (const count of [5, 4]) {
      for (let k = 0; k < count && x + size <= 1280; k++, x += size + gap) squares.push(rect(x, y, size, size));
      x += gap * 5;
    }
  }
  return squares.join(" ");
}
const shapes = (list) => `<svg class="deco" viewBox="0 0 1280 720" aria-hidden="true">${list.map(([d, c]) => `<path d="${d}" style="fill: ${c}"/>`).join("")}</svg>`;

function roundRect(x, y, w, h, r) {
  const k = r * 0.5523;
  return `M ${x + r} ${y} L ${x + w - r} ${y} C ${f(x + w - r + k)} ${y} ${x + w} ${f(y + r - k)} ${x + w} ${y + r} L ${x + w} ${y + h - r} C ${x + w} ${f(y + h - r + k)} ${f(x + w - r + k)} ${y + h} ${x + w - r} ${y + h} L ${x + r} ${y + h} C ${f(x + r - k)} ${y + h} ${x} ${f(y + h - r + k)} ${x} ${y + h - r} L ${x} ${y + r} C ${x} ${f(y + r - k)} ${f(x + r - k)} ${y} ${x + r} ${y} Z`;
}
// A five-pointed star centred on (cx, cy).
function star(cx, cy, r) {
  const pts = Array.from({ length: 10 }, (_, k) => {
    const a = ((-90 + k * 36) * Math.PI) / 180;
    const rr = k % 2 ? r * 0.45 : r;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  return `M ${pts.map(pt).join(" L ")} Z`;
}
// A heart centred on (cx, cy), s wide.
function heart(cx, cy, s) {
  const at = (x, y) => pt([cx + x * s, cy + (y - 0.45) * s]);
  return `M ${at(0, 0.3)} C ${at(0, 0)} ${at(-0.5, 0)} ${at(-0.5, 0.3)} C ${at(-0.5, 0.55)} ${at(-0.15, 0.7)} ${at(0, 0.9)} C ${at(0.15, 0.7)} ${at(0.5, 0.55)} ${at(0.5, 0.3)} C ${at(0.5, 0)} ${at(0, 0)} ${at(0, 0.3)} Z`;
}
// Polka dots over the whole slide, as one path.
function polka(step, r) {
  const dots = [];
  for (let y = step / 2, row = 0; y < 720; y += step, row++) {
    for (let x = row % 2 ? step : step / 2; x < 1280; x += step) dots.push(circle(x, y, r));
  }
  return dots.join(" ");
}
// Clips a polygon to the slide (Sutherland–Hodgman), so shapes never hang off the edge in the .pptx.
function clipToSlide(points) {
  const edges = [
    [(p) => p[0] >= 0, (a, b) => [0, a[1] + ((b[1] - a[1]) * (0 - a[0])) / (b[0] - a[0])]],
    [(p) => p[0] <= 1280, (a, b) => [1280, a[1] + ((b[1] - a[1]) * (1280 - a[0])) / (b[0] - a[0])]],
    [(p) => p[1] >= 0, (a, b) => [a[0] + ((b[0] - a[0]) * (0 - a[1])) / (b[1] - a[1]), 0]],
    [(p) => p[1] <= 720, (a, b) => [a[0] + ((b[0] - a[0]) * (720 - a[1])) / (b[1] - a[1]), 720]],
  ];
  let out = points;
  for (const [inside, cross] of edges) {
    const input = out;
    out = [];
    input.forEach((cur, i) => {
      const prev = input[(i + input.length - 1) % input.length];
      if (inside(cur)) {
        if (!inside(prev)) out.push(cross(prev, cur));
        out.push(cur);
      } else if (inside(prev)) out.push(cross(prev, cur));
    });
  }
  return out;
}
// Sunburst rays from (cx, cy): every other wedge of `count`, clipped to the slide.
function rays(cx, cy, count) {
  const wedges = [];
  for (let k = 0; k < count; k += 2) {
    const a1 = (k * 2 * Math.PI) / count;
    const a2 = ((k + 1) * 2 * Math.PI) / count;
    const poly = clipToSlide([[cx, cy], [cx + Math.cos(a1) * 2000, cy + Math.sin(a1) * 2000], [cx + Math.cos(a2) * 2000, cy + Math.sin(a2) * 2000]]);
    if (poly.length > 2) wedges.push(`M ${poly.map(pt).join(" L ")} Z`);
  }
  return wedges.join(" ");
}

// Title slide decorations. "okinawa": sky, sun, sea, white sand, a palm tree and hibiscus,
// with a ミンサー織り band along the top. "pop": polka dots, bright shapes, stars, hearts and
// two speech bubbles.
function okinawaScene() {
  const wave = (y, amp) =>
    `M 0 ${y} C 160 ${y - amp} 320 ${y + amp} 480 ${y} C 640 ${y - amp} 800 ${y + amp} 960 ${y} C 1120 ${y - amp} 1200 ${y + amp} 1280 ${y} L 1280 720 L 0 720 Z`;
  const fronds = [200, 225, 255, 290, 320, 350, 20].map((deg, k) => [leaf(1176, 424, 106, 21, deg), k % 2 ? "#23824F" : "#2E9E64"]);
  const behind = shapes([
    [rect(0, 0, 1280, 30), "#24488A"],
    [minsa(9, 12, 4), "#FFFFFF"],
    [circle(1172, 112, 76), "#FFF0B8"],
    [circle(1172, 112, 52), "#FFD24A"],
    [[circle(118, 128, 26), circle(152, 112, 34), circle(190, 130, 24)].join(" "), "#FFFFFF"],
    [[circle(930, 92, 18), circle(956, 82, 24), circle(984, 94, 16)].join(" "), "#FFFFFF"],
    [wave(500, 14), "#86D9E6"],
    [wave(566, 12), "#2AB3CB"],
    [wave(640, 8), "#FFFFFF"],
    [wave(648, 8), "#FBE8C4"],
    ["M 1206 720 C 1196 610 1186 500 1168 424 L 1184 426 C 1202 500 1222 610 1232 720 Z", "#A8743F"],
    ...fronds,
    [sparkle(470, 600, 13), "#FFFFFF"],
    [sparkle(690, 622, 9), "#FFFFFF"],
    [sparkle(860, 596, 11), "#FFFFFF"],
  ]);
  const front = shapes([
    [leaf(236, 530, 96, 26, 160), "#2E9E64"],
    [leaf(236, 530, 86, 24, 215), "#23824F"],
    ...hibiscus(236, 530, 62, "#E8364E", "#B5173A", 10),
    [leaf(1052, 170, 64, 18, 200), "#2E9E64"],
    ...hibiscus(1052, 170, 40, "#FF6F91", "#D63A6A", -14),
  ]);
  return { behind, front, extra: "" };
}

function popScene() {
  const behind = shapes([
    [polka(48, 4), "#FFFFFF"],
    [circle(214, 176, 112), "#A9D3F3"],
    [circle(1112, 128, 66), "#FFD966"],
    [roundRect(972, 446, 184, 184, 46), "#FFB8C9"],
    [circle(168, 566, 50), "#FF9C6E"],
    [circle(640, 84, 9), "#FF9DB4"],
    [circle(470, 640, 11), "#7DBDEB"],
    [circle(860, 652, 9), "#FFC94A"],
    [circle(1220, 330, 10), "#FF8A57"],
    // speech bubbles (their words are in the HTML)
    [roundRect(58, 300, 160, 72, 36), "#FFFFFF"],
    ["M 176 366 L 214 394 L 196 362 Z", "#FFFFFF"],
    [roundRect(1076, 258, 136, 72, 36), "#FFFFFF"],
    ["M 1098 324 L 1074 352 L 1124 326 Z", "#FFFFFF"],
  ]);
  const front = shapes([
    [star(1050, 176, 34), "#FFC94A"],
    [star(262, 552, 22), "#F0521E"],
    [heart(1190, 540, 46), "#FF6F91"],
    [heart(118, 232, 28), "#FF9DB4"],
    [sparkle(900, 620, 16), "#7DBDEB"],
    [sparkle(380, 96, 14), "#FFC94A"],
    [sparkle(1236, 430, 12), "#FF9DB4"],
  ]);
  const extra = `<p class="bub" style="left: 58px; top: 300px; width: 160px;">Hello!</p>
  <p class="bub" style="left: 1076px; top: 258px; width: 136px;">Hi!</p>`;
  return { behind, front, extra };
}

function cover({ title, subtitle, look = "okinawa" }) {
  const { behind, front, extra } = look === "pop" ? popScene() : okinawaScene();
  return `
<section class="slide cover ${look}">
  ${behind}
  ${extra}
  <div class="cover-card">
    <div class="ttl${title.includes("<br>") ? " two" : ""}"><div class="mk"></div><h1>${latin(title)}</h1></div>
    ${subtitle ? `<p class="sub">${esc(subtitle)}</p>` : ""}
  </div>
  ${front}
</section>`;
}

function ending({ lead = "今日のフレーズ、まずは1つ<br>実際の会話で使ってみてね。" } = {}) {
  return `
<section class="slide ending">${header()}
  <div class="cbody">
    <p class="script">Thank you for joining!</p>
    <h1>おつかれさまでした！</h1>
    <p class="lead">${lead}</p>
    <div class="chips"><span class="chip w">チャンネル登録</span><span class="chip w">高評価</span><span class="chip w">感想をコメントしてね</span></div>
  </div>
  <div class="tile"></div>
  ${deco(LOGO, asterisk(1112, 198, 36, 12))}
  <div class="sample">
    <p class="lab">NEXT LIVE</p>
    <p class="sj">次回のライブも<br>お楽しみに！</p>
    <div class="sline"></div>
    <p class="script">See you next time!</p>
  </div>
</section>`;
}

function page({ title, slides, css = [], source }) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<link rel="stylesheet" href="../slides.css">${css.map((href) => `\n<link rel="stylesheet" href="${href}">`).join("")}
</head>
<body>
<!-- このファイルは ${source} から作られます。直すときは ${source} を編集して npm run live を実行してください。 -->
${slides.join("\n")}
</body>
</html>
`;
}

module.exports = { esc, slot, hi, latin, two, asterisk, LOGO, deco, header, circle, rect, roundRect, sparkle, star, heart, leaf, hibiscus, minsa, polka, rays, shapes, cover, ending, page };
