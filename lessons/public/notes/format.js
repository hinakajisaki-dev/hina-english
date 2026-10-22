// 授業メモ, shared by the student app, the teacher page and the server. The
// teacher pastes a memo organized in the student's own chat (docs/lesson-notes.md)
// and it is shown as written in this small Markdown:
//   ## 見出し / ### 小見出し      headings
//   **太字**                       bold
//   - 箇条書き (two spaces deeper for each level), 1. numbered
//   | 表 | 表 | with | --- | --- | as its second row
//   ---                            a line
//   a blank line between paragraphs
// ✗ and ○ are coloured. The last section, "## 復習問題", holds a | 英語 | 意味 | 解説 |
// table; it is not shown as a table but becomes cards like 単語カード (the
// English, then a tap shows the meaning and the 解説), behind a button.

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
  const lines = split(body).memo;
  const out = [];
  let para = [];
  let list = [];
  let table = [];
  const flush = () => {
    if (para.length) out.push(`<p>${para.map(inline).join("<br>")}</p>`);
    if (list.length) out.push(listHtml(list));
    if (table.length) out.push(tableHtml(table));
    para = [];
    list = [];
    table = [];
  };
  for (const line of lines) {
    if (!line.trim()) {
      flush();
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
  return out.join("\n");
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
