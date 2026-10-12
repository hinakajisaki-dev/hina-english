// Builds a YouTube live 瞬間英作文 deck from <dir>/phrases.md:
// writes <dir>/slides.html, checks that no line of text wraps or spills out of its box,
// then renders <dir>/<dir name>.pdf and an editable <dir>/<dir name>.pptx (for Google Slides).
// Usage: npm run live -- live/daily-phrases-part2
const { readFileSync, writeFileSync } = require("node:fs");
const { basename, join, resolve } = require("node:path");
const { execFileSync } = require("node:child_process");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node live/build.cjs <deck folder>");
  process.exit(1);
}

// ---------- phrases.md ----------

const FIELDS = {
  タイトル: { name: "title", top: true },
  サブタイトル: { name: "subtitle", top: true },
  後ろの形: { name: "form" },
  意味: { name: "meaning" },
  例文: { name: "example", split: "|" }, // English | 日本語
  ポイント: { name: "point" },
  かんたん: { name: "easy", split: "→" }, // 日本語 → English
  中級: { name: "hard", split: "→" },
};

function parse(md, file) {
  const deck = { rounds: [] };
  let round = null;
  let phrase = null;
  // Blank out comments but keep their line breaks, so error messages point at the right line.
  const lines = md.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, "")).split("\n");
  lines.forEach((raw, i) => {
    const line = raw.trim();
    const at = `${file}:${i + 1}`;
    if (!line) return;
    let m;
    if ((m = line.match(/^##\s+ROUND\s+\d+\s+(.+)$/))) {
      round = { title: m[1], phrases: [] };
      deck.rounds.push(round);
      phrase = null;
    } else if ((m = line.match(/^###\s+(.+)$/))) {
      if (!round) throw new Error(`${at}: フレーズの前に「## ROUND 1 タイトル」の行が必要です`);
      phrase = { pattern: m[1], at };
      round.phrases.push(phrase);
    } else if ((m = line.match(/^([^:：]+)[:：]\s*(.+)$/)) && FIELDS[m[1].trim()]) {
      const field = FIELDS[m[1].trim()];
      if (field.top) {
        deck[field.name] = m[2];
        return;
      }
      if (!phrase) throw new Error(`${at}: 「${m[1].trim()}」は「### フレーズ」の下に書いてください`);
      let value = m[2];
      if (field.split) {
        value = value.split(field.split).map((s) => s.trim());
        if (value.length !== 2 || !value[0] || !value[1]) throw new Error(`${at}: 「${field.split}」で2つに分けてください`);
      }
      phrase[field.name] = value;
    } else {
      throw new Error(`${at}: 読めない行です: ${line}`);
    }
  });
  if (!deck.title) throw new Error(`${file}: 「タイトル:」の行がありません`);
  for (const r of deck.rounds) {
    if (!r.phrases.length) throw new Error(`${file}: ROUND「${r.title}」にフレーズがありません`);
    for (const p of r.phrases) {
      const missing = Object.entries(FIELDS).filter(([, f]) => !f.top && !p[f.name]).map(([k]) => k);
      if (missing.length) throw new Error(`${p.at}: 「${p.pattern}」に ${missing.join("・")} がありません`);
    }
  }
  return deck;
}

// ---------- HTML ----------

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

// Decorations for the title slide, as filled SVG paths in slide pixels. Circles and rounded
// squares are drawn with Bézier curves because the .pptx builder only reads M/L/C/Z paths.
const f = (n) => +n.toFixed(1);
function circle(cx, cy, r) {
  const k = r * 0.5523;
  return `M ${f(cx + r)} ${cy} C ${f(cx + r)} ${f(cy + k)} ${f(cx + k)} ${f(cy + r)} ${cx} ${f(cy + r)} C ${f(cx - k)} ${f(cy + r)} ${f(cx - r)} ${f(cy + k)} ${f(cx - r)} ${cy} C ${f(cx - r)} ${f(cy - k)} ${f(cx - k)} ${f(cy - r)} ${cx} ${f(cy - r)} C ${f(cx + k)} ${f(cy - r)} ${f(cx + r)} ${f(cy - k)} ${f(cx + r)} ${cy} Z`;
}
function roundSquare(x, y, s, r) {
  const k = r * 0.5523;
  return `M ${x + r} ${y} L ${x + s - r} ${y} C ${f(x + s - r + k)} ${y} ${x + s} ${f(y + r - k)} ${x + s} ${y + r} L ${x + s} ${y + s - r} C ${x + s} ${f(y + s - r + k)} ${f(x + s - r + k)} ${y + s} ${x + s - r} ${y + s} L ${x + r} ${y + s} C ${f(x + r - k)} ${y + s} ${x} ${f(y + s - r + k)} ${x} ${y + s - r} L ${x} ${y + r} C ${x} ${f(y + r - k)} ${f(x + r - k)} ${y} ${x + r} ${y} Z`;
}
function sparkle(cx, cy, s) {
  const a = f(s * 0.14);
  return `M ${cx} ${cy - s} C ${cx + a} ${cy - a} ${cx + a} ${cy - a} ${cx + s} ${cy} C ${cx + a} ${cy + a} ${cx + a} ${cy + a} ${cx} ${cy + s} C ${cx - a} ${cy + a} ${cx - a} ${cy + a} ${cx - s} ${cy} C ${cx - a} ${cy - a} ${cx - a} ${cy - a} ${cx} ${cy - s} Z`;
}
const shapes = (list) => `<svg class="deco" viewBox="0 0 1280 720" aria-hidden="true">${list.map(([d, c]) => `<path d="${d}" style="fill: ${c}"/>`).join("")}</svg>`;

// The title in a white card, with salon-coloured shapes peeking out from behind it.
function cover(deck) {
  const behind = shapes([
    [circle(250, 190, 120), "#A9D3F3"],
    [roundSquare(960, 440, 190, 48), "#FFD3DD"],
    [circle(1110, 150, 56), "#FFD966"],
    [circle(175, 545, 44), "#FF9C6E"],
    [circle(95, 360, 14), "#FF9DB4"],
    [circle(1195, 380, 12), "#7DBDEB"],
    [circle(600, 95, 10), "#FFC94A"],
    [circle(1000, 90, 8), "#FF8A57"],
    [circle(760, 640, 12), "#FF9DB4"],
    [circle(420, 652, 9), "#7DBDEB"],
  ]);
  const front = shapes([
    [sparkle(1052, 176, 34), "#F0521E"],
    [sparkle(236, 560, 26), "#FFC94A"],
    [sparkle(1186, 566, 16), "#7DBDEB"],
    [sparkle(122, 236, 16), "#FF9DB4"],
  ]);
  return `
<section class="slide cover">
  ${behind}
  <div class="cover-card">
    <div class="ttl"><div class="mk"></div><h1>${latin(deck.title)}</h1></div>
    ${deck.subtitle ? `<p class="sub">${esc(deck.subtitle)}</p>` : ""}
  </div>
  ${front}
</section>`;
}

function roundCover(r, i, from) {
  const to = from + r.phrases.length - 1;
  return `
<section class="slide round r${i}">${header(`<span class="no">No.${two(from)}–${two(to)}</span>`)}
  <div class="rbody">
    <div class="rleft">
      <p class="lab">ROUND</p>
      <p class="big">${i}</p>
      <div class="rbar"></div>
      <h2 class="rt">${esc(r.title)}</h2>
    </div>
    <ol class="rlist">
      ${r.phrases.map((p, k) => `<li><span class="k">${two(from + k)}</span><div><p class="p">${slot(p.pattern)}</p><p class="m">${esc(p.meaning)}</p></div></li>`).join("\n      ")}
    </ol>
  </div>
  ${deco(LOGO)}
</section>`;
}

// One phrase = two slides: the questions, then the same slide with the answers.
function phrase(p, n, total, r, i, answer) {
  const rows = [["かんたん", "easy", p.easy], ["中級", "hard", p.hard]];
  const q = ([level, cls, [ja, en]], k) =>
    `<li class="q"><span class="lv ${cls}">${level}</span><span class="qn">${k + 1}</span>${
      answer ? `<div class="a"><p class="aj">${esc(ja)}</p><p class="ae">${hi(en)}</p></div>` : `<p class="qj">${esc(ja)}</p>`
    }</li>`;
  return `
<section class="slide phrase r${i}">${header(
    `<div class="where"><span class="round-tag"><span class="dot"></span><span class="rn">ROUND ${i}</span><span>${esc(r.title)}</span></span><span class="no"><b>${two(n)}</b> / ${total}</span></div>`,
  )}
  <h2 class="pattern">${slot(p.pattern)}</h2>
  <div class="meaning-row"><span class="form"><span class="fk">後ろの形</span><span>${esc(p.form)}</span></span><p class="meaning">${esc(p.meaning)}</p></div>
  <div class="info">
    <div class="row"><span class="lab">EXAMPLE</span><p class="ex"><span class="en">${hi(p.example[0])}</span><span class="ja">${esc(p.example[1])}</span></p></div>
    <div class="row"><span class="lab">POINT</span><p class="pt">${esc(p.point)}</p></div>
  </div>
  <div class="qcard${answer ? " answer" : ""}">
    <div class="qhead"><span class="script">${answer ? "Answer" : "Questions"}</span><span class="qt">${answer ? "こたえ" : "英語で言ってみよう"}</span></div>
    <ol class="qs">${rows.map(q).join("")}</ol>
  </div>
  ${deco(LOGO)}
</section>`;
}

function ending() {
  return `
<section class="slide ending">${header()}
  <div class="cbody">
    <p class="script">Thank you for joining!</p>
    <h1>おつかれさまでした！</h1>
    <p class="lead">今日のフレーズ、まずは1つ<br>実際の会話で使ってみてね。</p>
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

function render(deck) {
  const total = deck.rounds.reduce((n, r) => n + r.phrases.length, 0);
  const slides = [cover(deck)];
  let n = 0;
  deck.rounds.forEach((r, k) => {
    slides.push(roundCover(r, k + 1, n + 1));
    for (const p of r.phrases) {
      n++;
      slides.push(phrase(p, n, total, r, k + 1, false), phrase(p, n, total, r, k + 1, true));
    }
  });
  slides.push(ending());
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>${esc(deck.title.replace(/<br>/g, ""))}｜瞬間英作文 LIVE</title>
<link rel="stylesheet" href="../slides.css">
</head>
<body>
<!-- このファイルは phrases.md から作られます。直すときは phrases.md を編集して npm run live を実行してください。 -->
${slides.join("\n")}
</body>
</html>
`;
}

// ---------- layout check ----------

// Finds text that wraps onto an extra line (the .pptx builder needs every line break to be a
// <br>) and boxes that stick out of their parent or the slide.
function findProblems() {
  const problems = [];
  const inline = (el) => getComputedStyle(el).display === "inline";
  const label = (el) => (el.textContent.trim().replace(/\s+/g, " ").slice(0, 40) || `<${el.tagName.toLowerCase()} class="${el.className}">`);
  document.querySelectorAll(".slide").forEach((slide, i) => {
    const where = `slide ${i + 1}`;
    for (const el of slide.querySelectorAll("*")) {
      if (el.closest("svg") || inline(el)) continue;
      const r = el.getBoundingClientRect();
      const p = el.parentElement.getBoundingClientRect();
      if (r.left < p.left - 1 || r.right > p.right + 1 || r.top < p.top - 1 || r.bottom > p.bottom + 1) {
        problems.push(`${where}: "${label(el)}" sticks out of its box`);
      }
      // Lines of this element's own text (direct text and inline children).
      const rects = [];
      let breaks = 0;
      const walk = (node) => {
        for (const c of node.childNodes) {
          if (c.nodeType === Node.TEXT_NODE && c.textContent.trim()) {
            const range = document.createRange();
            range.selectNodeContents(c);
            rects.push(...[...range.getClientRects()].filter((q) => q.width > 0));
          } else if (c.nodeType === Node.ELEMENT_NODE) {
            if (c.tagName === "BR") breaks++;
            else if (inline(c)) walk(c);
          }
        }
      };
      walk(el);
      if (!rects.length) continue;
      // A rect whose middle falls inside the current line belongs to it (runs of different sizes
      // share a line but not a top edge).
      const lines = [];
      for (const q of rects.sort((a, b) => a.top - b.top)) {
        const last = lines[lines.length - 1];
        const mid = (q.top + q.bottom) / 2;
        if (last && mid >= last.top && mid <= last.bottom) last.bottom = Math.max(last.bottom, q.bottom);
        else lines.push({ top: q.top, bottom: q.bottom });
      }
      if (lines.length > breaks + 1) problems.push(`${where}: "${label(el)}" wraps onto ${lines.length} lines (shorten it or add <br>)`);
    }
  });
  return problems;
}

(async () => {
  const folder = resolve(dir);
  const name = basename(folder);
  const md = join(folder, "phrases.md");
  const html = join(folder, "slides.html");
  writeFileSync(html, render(parse(readFileSync(md, "utf8"), `${dir}/phrases.md`)));
  console.log(`wrote ${html}`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(pathToFileURL(html).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const problems = await page.evaluate(findProblems);
  await browser.close();
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }

  const matome = join(__dirname, "..", "matome");
  execFileSync(process.execPath, [join(matome, "build.cjs"), html, join(folder, `${name}.pdf`)], { stdio: "inherit" });
  execFileSync(process.execPath, [join(matome, "build-pptx.cjs"), html, join(folder, `${name}.pptx`)], { stdio: "inherit" });
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
