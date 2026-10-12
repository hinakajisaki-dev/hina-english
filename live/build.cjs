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

function cover(deck, total) {
  const ex = deck.rounds[0].phrases[0];
  return `
<section class="slide cover">${header()}
  <div class="cbody">
    <div class="eyebrow"><span class="lab">YOUTUBE LIVE</span><span class="chip">瞬間英作文</span></div>
    <p class="script">Ready, set, speak!</p>
    <h1>${latin(deck.title)}</h1>
    ${deck.subtitle ? `<p class="lead">${esc(deck.subtitle)}</p>` : ""}
    <dl class="stats">
      <div><dt>今日のフレーズ</dt><dd><span class="n">${total}</span>個</dd></div>
      <div class="sep"></div>
      <div><dt>瞬間英作文</dt><dd><span class="n">${total * 2}</span>問</dd></div>
      <div class="sep"></div>
      <div><dt>かんたん → 中級</dt><dd><span class="n">2</span>レベル</dd></div>
    </dl>
  </div>
  <div class="tile"></div>
  ${deco(LOGO, asterisk(1112, 198, 36, 12))}
  <div class="sample">
    <span class="chip">5秒で言える？</span>
    <p class="sj">${esc(ex.example[1])}</p>
    <div class="sline"></div>
    <p class="se">${hi(ex.example[0])}</p>
  </div>
</section>`;
}

function flow(deck) {
  let n = 0;
  return `
<section class="slide flow">${header()}
  <p class="lab">TODAY'S MENU</p>
  <h2 class="h">今日の流れ</h2>
  <div class="menu">
    ${deck.rounds
      .map((r, i) => {
        const from = n + 1;
        n += r.phrases.length;
        return `<div class="mcard r${i + 1}">
      <div class="mhead"><span class="dot"></span><span class="mr">ROUND ${i + 1}</span><span class="mt">${esc(r.title)}</span><span class="mn">No.${two(from)}–${two(n)}</span></div>
      <ul class="ml">${r.phrases.map((p) => `<li>${slot(p.pattern)}</li>`).join("")}</ul>
    </div>`;
      })
      .join("\n    ")}
  </div>
  ${deco(LOGO)}
</section>`;
}

function howto() {
  return `
<section class="slide howto">${header()}
  <p class="lab">HOW TO PLAY</p>
  <h2 class="h">瞬間英作文のやり方</h2>
  <ol class="steps">
    <li><span class="sn">1</span><p class="st">日本語を見る</p><p class="sd">「かんたん」→「中級」の<br>順番で出題します</p></li>
    <li><span class="sn">2</span><p class="st">5秒で英語にする</p><p class="sd">完璧じゃなくてOK！<br>すぐ声に出してみよう</p></li>
    <li><span class="sn">3</span><p class="st">こたえ合わせ</p><p class="sd">こたえを見たら、<br>一緒にリピートしよう</p></li>
  </ol>
  <p class="tip"><span class="chip">チャットで参加</span>思いついた英語を、チャットに書き込んでもOK！</p>
  ${deco(LOGO)}
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
    <div class="qhead"><span class="script">${answer ? "Answer" : "Let's try!"}</span><span class="qt">${answer ? "こたえ" : "英語で言ってみよう"}</span></div>
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
  const slides = [cover(deck, total), flow(deck), howto()];
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
