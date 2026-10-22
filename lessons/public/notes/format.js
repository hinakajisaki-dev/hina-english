// 授業メモ, shared by the student app, the teacher page and the server. The
// teacher pastes a memo organized in the student's own chat (docs/lesson-notes.md)
// and it is shown as written in this small Markdown:
//   ## 見出し / ### 小見出し      headings
//   **太字**                       bold
//   - 箇条書き (two spaces deeper for each level), 1. numbered
//   | 表 | 表 | with | --- | --- | as its second row
//   ---                            a line
//   a blank line between paragraphs
// ✗ and ○ are coloured. The last section, "## 復習問題", holds tables of
// cards (noteProblems); it is not shown as a table but becomes cards like
// 単語カード, behind a button. The student reads the memo a "## " section a
// page (notePages), with each 英作文 (**問題**：… / **答え**：…) as a card
// that turns over.

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

const HEADING = /^(#{1,4})\s+(.*)$/;
const LIST = /^(\s*)([-*・•]|\d+[.)])\s+(.*)$/;
const RULE = /^\s*([-*_])(\s*\1){2,}\s*$/;
const TABLE = /^\s*\|/;
const TABLE_RULE = /^\s*\|?(\s*:?-{2,}:?\s*\|)+\s*(:?-{2,}:?\s*)?$/;
const FENCE = /^\s*```/;
const REVIEW = /^#{1,4}\s+(\d+[.)．]\s*)?復習問題/;

// The memo's lines, without code fences (the chat hands it over in one) and
// split into the memo itself and its 復習問題 section.
function split(body) {
  const lines = String(body || "").replace(/\r\n?/g, "\n").split("\n").filter((line) => !FENCE.test(line));
  const start = lines.findIndex((line) => REVIEW.test(line));
  if (start === -1) return { memo: lines, review: [] };
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => HEADING.test(line) && !/^#{3,}/.test(line));
  const review = end === -1 ? rest : rest.slice(0, end);
  const after = end === -1 ? [] : rest.slice(end);
  return { memo: [...lines.slice(0, start), ...after], review };
}

const cells = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
const unbold = (text) => text.replace(/\*\*(.+?)\*\*/g, "$1").trim();

const JAPANESE = /[\u3040-\u30ff\u3400-\u9fff]/;

// The 復習問題 as cards: [{ type, en, ja, note, pieces }]. Each table in the
// section is one kind of card, told by its headings, and one memo may have
// several:
//   | 英語 | 意味 | 解説 |           card: the English → tap for the meaning
//   | 日本語 | 答え | ポイント |      write (瞬間英作文): the Japanese → tap for the English
//   | 日本語 | ならべる単語 | 答え |   order (並び替え): the Japanese and the words
//                                      ("until / come / I", in the order shown) → tap for the sentence
// A table without headings is read as 日本語 | 英語, as memos were first
// written. Lines like "- English → 意味" work too.
export function noteProblems(body) {
  const { review } = split(body);
  const tables = [];
  let table = null;
  for (const line of review) {
    if (!TABLE.test(line)) table = null;
    else if (table) table.push(line);
    else tables.push((table = [line]));
  }
  if (tables.length) return tables.flatMap(tableProblems);
  const problems = [];
  for (const line of review) {
    const m = line.match(LIST);
    const text = m ? m[3] : line.trim();
    const arrow = text.lastIndexOf("→");
    const left = unbold(text.slice(0, arrow));
    const right = unbold(text.slice(arrow + 1));
    if (arrow > 0 && left && right) {
      problems.push(JAPANESE.test(left) ? card("card", right, left) : card("card", left, right));
    }
  }
  return problems;
}

const card = (type, en, ja, note = "", pieces = null) => ({ type, en, ja, note, ...(pieces ? { pieces } : {}) });

function tableProblems(rows) {
  let type = "card";
  let col = { ja: 0, en: 1, note: -1, pieces: -1 };
  let start = 0;
  if (rows[1] && TABLE_RULE.test(rows[1])) {
    const head = cells(rows[0]);
    const find = (...words) => head.findIndex((h) => words.some((w) => h.includes(w)));
    const english = find("英語", "English", "フレーズ");
    const answer = find("答え");
    col = { ja: find("意味", "日本語", "和訳"), note: find("解説", "ポイント"), pieces: find("ならべる", "並べる", "並び替え", "ならびかえ") };
    if (col.pieces !== -1) type = "order";
    else if (english === -1 && answer !== -1) type = "write";
    col.en = type === "card" ? english : answer;
    if (col.en === -1) col.en = col.ja === 0 ? 1 : 0;
    if (col.ja === -1) col.ja = col.en === 0 ? 1 : 0;
    start = 2;
  }
  const problems = [];
  for (const row of rows.slice(start)) {
    if (TABLE_RULE.test(row)) continue;
    const c = cells(row);
    const en = unbold(c[col.en] || "");
    const ja = unbold(c[col.ja] || "");
    const note = col.note === -1 ? "" : unbold(c[col.note] || "");
    if (!en || !ja) continue;
    if (type === "order") {
      const pieces = unbold(c[col.pieces] || "").split("/").map((w) => w.trim()).filter(Boolean);
      if (pieces.length >= 2) problems.push(card("order", en, ja, note, pieces));
    } else {
      problems.push(card(type, en, ja, note));
    }
  }
  return problems;
}

// ✗ and ○ are marks only when a space follows them ("✗ I have…"), so a
// placeholder like ○○ stays as it is.
function inline(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[\s→（(>])[✗×✕](?=\s)/g, '$1<span class="ng">✗</span>')
    .replace(/(^|[\s→（(>])[○〇](?=\s)/g, '$1<span class="ok">○</span>');
}

// Nested lists from [{ depth, ordered, html }], depth 0 being the outermost.
function listHtml(items) {
  let html = "";
  const open = [];
  for (const item of items) {
    const depth = Math.min(item.depth, open.length);
    while (open.length > depth + 1) html += `</li></${open.pop()}>`;
    if (open.length === depth + 1) {
      html += "</li>";
    } else {
      const tag = item.ordered ? "ol" : "ul";
      open.push(tag);
      html += `<${tag}>`;
    }
    html += `<li>${item.html}`;
  }
  while (open.length) html += `</li></${open.pop()}>`;
  return html;
}

function tableHtml(rows) {
  const hasHead = rows[1] && TABLE_RULE.test(rows[1]);
  const body = rows.filter((row, i) => !(hasHead && i <= 1) && !TABLE_RULE.test(row));
  const row = (line, tag) => `<tr>${cells(line).map((c) => `<${tag}>${inline(c)}</${tag}>`).join("")}</tr>`;
  return `<div class="note-table"><table>${hasHead ? `<thead>${row(rows[0], "th")}</thead>` : ""}<tbody>${body.map((l) => row(l, "td")).join("")}</tbody></table></div>`;
}

// The memo as HTML, without its 復習問題 section.
export function noteHtml(body) {
  return linesHtml(split(body).memo);
}

// The memo for the student, a page for each "## " section (with what comes
// before the first one on the first page): [{ title, html }]. In these pages an
// 英作文 (a "**問題**：…" line and its "**答え**：…") is a card: the Japanese,
// then a tap shows the answer, ほかの言い方 and the points. speak is the 🔊
// icon for the answers' buttons.
export function notePages(body, { speak = "" } = {}) {
  const pages = [];
  for (const line of split(body).memo) {
    const heading = line.match(HEADING);
    if (heading && heading[1].length <= 2) pages.push({ title: heading[2].trim(), lines: [] });
    else if (pages.length) pages.at(-1).lines.push(line);
    else if (line.trim()) pages.push({ title: "", lines: [line] });
  }
  return pages.map((page) => ({ title: inline(page.title), html: linesHtml(page.lines, { cards: true, speak }) }));
}

// An 英作文 starts with "**問題**：日本語" (a card that turns over) or
// "**例**：日本語" (shown with its answer, as a worked example); its lines
// "**答え**：…" and "**ほかの言い方**：…" are the English. "**ポイント**：…"
// is the page's 大事なポイント, in a box.
const START = /^\s*\*\*(問題|例)\*\*\s*[：:]\s*(.+)$/;
const FIELD = /^\s*\*\*(答え|ほかの言い方)\*\*\s*[：:]\s*(.+)$/;
const POINT = /^\s*\*\*(?:大事な)?ポイント\*\*\s*[：:]\s*(.*)$/;

// Every English sentence of a memo the app may voice: its 復習問題 and the
// answers of its 英作文.
export function noteSentences(body) {
  const texts = new Set(noteProblems(body).map((p) => p.en));
  for (const line of split(body).memo) {
    const field = line.match(FIELD);
    if (field) texts.add(unbold(field[2]));
  }
  return texts;
}

function linesHtml(lines, options = {}) {
  const out = [];
  let para = [];
  let list = [];
  let table = [];
  // Examples (**例**) one after another go together under one 例.
  let examples = [];
  const flush = () => {
    if (para.length) out.push(`<p>${para.map(inline).join("<br>")}</p>`);
    if (list.length) out.push(listHtml(list));
    if (table.length) out.push(tableHtml(table));
    para = [];
    list = [];
    table = [];
  };
  const flushExamples = () => {
    if (examples.length) out.push(`<div class="note-examples"><p class="note-examples-tag">例</p>${examples.join("")}</div>`);
    examples = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      flush();
      continue;
    }
    // An 英作文 or a 大事なポイント runs to the next blank line, heading or 英作文.
    // (A 問題 is a card only in the student's pages; the teacher sees it as written.)
    let end = i + 1;
    while (end < lines.length && lines[end].trim() && !HEADING.test(lines[end]) && !START.test(lines[end])) end++;
    const start = line.match(START);
    const block = lines.slice(i, end);
    if (start?.[1] === "例" && block.some((l) => FIELD.test(l))) {
      flush();
      examples.push(exampleHtml(block, options.speak));
      i = end - 1;
      continue;
    }
    flushExamples();
    if (start && options.cards && block.some((l) => FIELD.test(l))) {
      flush();
      out.push(problemCardHtml(block, options.speak));
      i = end - 1;
      continue;
    }
    const point = line.match(POINT);
    if (point) {
      flush();
      out.push(`<div class="note-point"><p class="note-point-tag">大事なポイント</p>${linesHtml([point[1], ...lines.slice(i + 1, end)])}</div>`);
      i = end - 1;
      continue;
    }
    if (TABLE.test(line)) {
      if (!table.length) flush();
      table.push(line);
      continue;
    }
    if (table.length) flush();
    const heading = line.match(HEADING);
    if (heading) {
      flush();
      const tag = heading[1].length <= 2 ? "h3" : "h4";
      out.push(`<${tag}>${inline(heading[2])}</${tag}>`);
      continue;
    }
    if (RULE.test(line)) {
      flush();
      out.push("<hr>");
      continue;
    }
    const item = line.match(LIST);
    if (item) {
      if (para.length) flush();
      const indent = item[1].replace(/\t/g, "  ").length;
      list.push({ depth: Math.floor(indent / 2), ordered: /\d/.test(item[2]), html: inline(item[3]) });
      continue;
    }
    // An indented line under a list item goes on with that item.
    if (list.length && /^\s/.test(line)) {
      list[list.length - 1].html += `<br>${inline(line.trim())}`;
      continue;
    }
    if (list.length) flush();
    para.push(line.trim());
  }
  flush();
  flushExamples();
  return out.join("\n");
}

// An 英作文's Japanese, its English ({ label, en }: 答え / ほかの言い方) and the rest (its points).
function problemParts(block) {
  const answers = [];
  const rest = [];
  for (const line of block.slice(1)) {
    const field = line.match(FIELD);
    if (field) answers.push({ label: field[1], en: unbold(field[2]) });
    else rest.push(line);
  }
  return { ja: block[0].match(START)[2], answers, rest };
}

const sayButton = (speak, en) =>
  speak ? `<button type="button" class="speak icon-only" data-say="${esc(en)}" aria-label="聞く">${speak}</button>` : "";

// An example (**例**), small and open: the English (🔊), the Japanese under
// it, then ほかの言い方 and the points.
function exampleHtml(block, speak) {
  const { ja, answers, rest } = problemParts(block);
  const [main, ...others] = answers;
  return `<div class="note-example">
    <div class="ex-en"><p lang="en">${esc(main.en)}</p>${sayButton(speak, main.en)}</div>
    <p class="ex-ja">${inline(ja)}</p>
    ${others.map((a) => `<p class="ex-alt"><span>${a.label}</span> <span lang="en">${esc(a.en)}</span></p>`).join("")}
    ${rest.length ? `<div class="ex-note">${linesHtml(rest)}</div>` : ""}
  </div>`;
}

// An 英作文 as a card that turns over: the Japanese and a hint, then the
// 答え and ほかの言い方 (with 🔊) and the points under them.
function problemCardHtml(block, speak) {
  const { ja, answers, rest } = problemParts(block);
  const back = `${answers.map((a) => `<div class="say-answer"><span class="say-tag">${a.label}</span><p lang="en">${esc(a.en)}</p>${sayButton(speak, a.en)}</div>`).join("")}
      ${linesHtml(rest)}`;
  return `<div class="say-card">
    <button type="button" class="say-front" data-flip aria-expanded="false">
      <span class="say-kind">英作文</span>
      <span class="say-ja">${inline(ja)}</span>
      <span class="say-hint">英語で言ってみてから、タップして答えを見る</span>
    </button>
    <div class="say-back" hidden>${back}</div>
  </div>`;
}

// Every lesson so far, oldest first and numbered from 1: the days the teacher
// put in (lesson_days) and the days of 授業メモ, together. A day with memos
// carries them: [{ number, day, notes }].
export function lessonList(days = [], notes = []) {
  const all = [...new Set([...days, ...notes.map((n) => n.day)])].sort();
  return all.map((day, i) => ({ number: i + 1, day, notes: notes.filter((n) => n.day === day) }));
}

// "8月3日（日）"
export function lessonDayLabel(day) {
  const [year, month, date] = String(day).split("-").map(Number);
  if (!year || !month || !date) return String(day);
  const weekday = "日月火水木金土"[new Date(Date.UTC(year, month - 1, date)).getUTCDay()];
  return `${month}月${date}日（${weekday}）`;
}

// "10月12日の授業"
export function noteDayLabel(day) {
  const [, month, date] = String(day).split("-").map(Number);
  return month && date ? `${month}月${date}日の授業` : "授業メモ";
}
