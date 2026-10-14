// Builds a YouTube live deck: writes <dir>/slides.html, checks that no line of text wraps or
// spills out of its box, then renders <dir>/<dir name>.pdf and an editable <dir>/<dir name>.pptx
// (for Google Slides). The slides come from <dir>/deck.cjs if the folder has one (a lesson with
// its own slide types), otherwise from <dir>/phrases.md (a 瞬間英作文 phrase deck).
// Usage: npm run live -- live/daily-phrases-part2
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
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

const { esc, slot, hi, two, LOGO, deco, header, cover, ending, page } = require("./parts.cjs");

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
  return page({ title: `${deck.title.replace(/<br>/g, "")}｜瞬間英作文 LIVE`, slides, source: "phrases.md" });
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
  const html = join(folder, "slides.html");
  const deck = join(folder, "deck.cjs");
  writeFileSync(html, existsSync(deck) ? require(deck)() : render(parse(readFileSync(join(folder, "phrases.md"), "utf8"), `${dir}/phrases.md`)));
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
