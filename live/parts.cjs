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

// The title in a white card over an Okinawa beach: sky, sun, sea, white sand, a palm tree
// and hibiscus, with a ミンサー織り band along the top.
function cover({ title, subtitle }) {
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
  return `
<section class="slide cover">
  ${behind}
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

module.exports = { esc, slot, hi, latin, two, asterisk, LOGO, deco, header, circle, rect, sparkle, leaf, hibiscus, minsa, shapes, cover, ending, page };
