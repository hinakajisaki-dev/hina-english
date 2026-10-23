// 授業メモ: a sentence to read (**英語**：… / **意味**：…) is a card in the
// student's pages, as written for the teacher, and its English may be voiced (npm test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { noteHtml, notePages, noteSentences } from "../public/notes/format.js";

const BODY = `## 1. 受け身
**英語**：This bridge was {青:built in} 1990.
**意味**：この橋は1990年に建てられました。
**ほかの言い方**：They built this bridge in 1990.
- was built ＝ 建てられた
**英語**：This song is loved by **everyone**.
**意味**：この歌はみんなに愛されています。

**英語**：No meaning here.`;

test("a sentence to read is a card: the English and 🔊 in front, the rest behind", () => {
  const [page] = notePages(BODY, { speak: "🔊" });
  const cards = page.html.split('<div class="say-card read-card">').slice(1);
  assert.equal(cards.length, 2);
  const [front, back] = cards[0].split('<div class="say-back" hidden>');
  assert.match(front, /<span lang="en">This bridge was <span class="note-blue">built in<\/span> 1990\.<\/span>/);
  assert.match(front, /data-say="This bridge was built in 1990\."/);
  assert.doesNotMatch(front, /橋/);
  assert.match(back, /<span class="say-tag">意味<\/span><p>この橋は1990年に建てられました。<\/p>/);
  assert.match(back, /<span class="say-tag">ほかの言い方<\/span><p lang="en">They built this bridge in 1990\.<\/p>/);
  assert.match(back, /<li>was built ＝ 建てられた<\/li>/);
  // A second one written right under the first is a card of its own.
  assert.match(cards[1], /This song is loved by everyone\./);
  // Without its **意味** it stays as written.
  assert.match(page.html, /<b>英語<\/b>：No meaning here\./);
});

test("the teacher sees it as written", () => {
  const html = noteHtml(BODY);
  assert.doesNotMatch(html, /read-card/);
  assert.match(html, /<b>意味<\/b>：この橋は1990年に建てられました。/);
});

test("its English and ほかの言い方 may be voiced", () => {
  const texts = noteSentences(BODY);
  for (const en of ["This bridge was built in 1990.", "They built this bridge in 1990.", "This song is loved by everyone.", "No meaning here."]) {
    assert.ok(texts.has(en), en);
  }
});
