// フレーズ, shared by the student app and the server. The スモールトーク course
// is for every student, in weeks of about 50 phrases; a student can have other
// books instead (student_settings phrase_books: a list of book ids, like
// ["talk1"], set by the teacher), each one week. A week comes in days (Day 1 …)
// when its phrases say which day they belong to, otherwise in sets of ten; each
// day or set ends with a short test.
//
// A week file (week1.js …) exports { week, title, phrases }, and a book for some
// students (talk1.js …) { id, week, title, phrases }. Each phrase:
//   id      unique in the week; never change it (students' 復習 lists use it)
//   day     the day it is learnt on (optional)
//   scene   the bit of conversation it belongs to ("場面1：あいさつ", optional)
//   replyTo the id of the phrase it answers, when it is an example answer (返答例)
//   en      the phrase as shown and read aloud
//   say     what 🔊 reads instead, when en has a slot (optional; "~" is left out anyway)
//   ja      和訳
//   chunk   塊: the form to learn ("How is 名詞?", optional; \n starts a
//           new line, one form per line)
//   chunkJa 塊の意味: what the chunk means, and other forms that mean the same
//           ("What about you? も同じ意味"), shown with the 塊 (optional; \n new line)
//   note    解説: how to use it (optional; \n starts a new line)
//   example 例文: one more sentence with the chunk, { en, ja }, shown under the
//           解説 with its own 🔊 (optional)
//   drills  瞬間英作文 with the chunk, up to two (none is fine):
//           { ja, answers: ["How's work going?", …], hint }; the first answer
//           is the one shown and read aloud, the others are also right, and
//           the hint (optional) waits behind a ヒントを見る button.
//
// Every phrase gets a key ("p1/05", or "talk1/05" in a student's own book) and
// every day or set one ("p1/s2", "talk1/s2"); the フレーズ復習 list and the test
// results are stored by these keys.
import { WEEK1 } from "./week1.js";
import { WEEK2 } from "./week2.js";
import { TALK1 } from "./talk1.js";

// The スモールトーク weeks (keys "p1/…") and the books for some students.
const SHARED = [WEEK1, WEEK2].map((book) => ({ ...book, prefix: `p${book.week}`, shared: true }));
const OWN = [TALK1].map((book) => ({ ...book, prefix: book.id, shared: false }));
const ALL = [...SHARED, ...OWN];
export const SET_SIZE = 10;
export const TEST_SIZE = 5;

// Every book: { id, week, title, count, shared } (id is "p1" for スモールトーク Week 1).
export const phraseBooks = () => ALL.map((b) => ({ id: b.prefix, week: b.week, title: b.title, count: b.phrases.length, shared: b.shared }));

// The books a student has (books is their phrase_books setting, or null): the
// ones the teacher gave them, or else スモールトーク.
const studentBooks = (books) => {
  const own = (books || []).map((id) => OWN.find((b) => b.id === id)).filter(Boolean);
  return own.length ? own : SHARED;
};
const bookAt = (week, books) => studentBooks(books).find((b) => b.week === Number(week)) || null;

// The weeks a student has phrases for, and a week's theme ("はじめて会った人と話す").
export const phraseWeeks = (books = null) => studentBooks(books).map((b) => b.week);
export const weekTitle = (week, books = null) => bookAt(week, books)?.title || "";

// "be about to ~" is read as "be about to".
const speakable = (en) => en.replace(/[~〜]/g, " ").replace(/\s+/g, " ").trim();

// A week's phrases. no is the course's running number (#50 …); replyTo, for
// a 返答例, is { no, en } of the phrase it answers.
export function weekPhrases(week, books = null) {
  return bookPhrases(bookAt(week, books));
}

function bookPhrases(book) {
  if (!book) return [];
  const week = book.week;
  const byId = new Map(book.phrases.map((p, i) => [p.id, { no: Number(p.id) || i + 1, en: p.en }]));
  return book.phrases.map((p, i) => ({
    key: `${book.prefix}/${p.id}`,
    week,
    number: i + 1,
    no: Number(p.id) || i + 1,
    replyTo: (p.replyTo && byId.get(p.replyTo)) || null,
    en: p.en,
    day: p.day || null,
    scene: p.scene || "",
    say: p.say || speakable(p.en),
    ja: p.ja,
    chunk: p.chunk || "",
    chunkJa: p.chunkJa || "",
    note: p.note || "",
    example: p.example || null,
    drills: (p.drills || []).map((drill, n) => ({ ja: drill.ja, answers: drill.answers, hint: drill.hint || "", n })),
  }));
}

// A week's phrases by day ("Day 3"), or else in sets of ten ("フレーズ 11〜20").
export function phraseSets(week, books = null) {
  const phrases = weekPhrases(week, books);
  if (phrases.length && phrases.every((p) => p.day)) {
    const days = [...new Set(phrases.map((p) => p.day))];
    return days.map((day) => ({ number: day, phrases: phrases.filter((p) => p.day === day), title: `Day ${day}` }));
  }
  const sets = [];
  for (let i = 0; i < phrases.length; i += SET_SIZE) {
    const chunk = phrases.slice(i, i + SET_SIZE);
    sets.push({ number: sets.length + 1, phrases: chunk, title: `フレーズ ${chunk[0].number}〜${chunk[chunk.length - 1].number}` });
  }
  return sets;
}

// The phrase numbers a day covers: "#1〜7".
export const setNumbers = (set) => `#${set.phrases[0].no}〜${set.phrases[set.phrases.length - 1].no}`;

// The scenes a day covers, for its card: "あいさつ・名前・仕事".
export const setScenes = (set) =>
  [...new Set(set.phrases.map((p) => p.scene.replace(/^場面\d+：/, "").replace(/（.*?）/g, "")).filter(Boolean))].join("・");

export const phraseSetKey = (week, number, books = null) => `${bookAt(week, books)?.prefix || `p${week}`}/s${number}`;

// A phrase by its key, from any book (a student keeps their 復習 list when their books change).
export function phraseByKey(key) {
  const book = ALL.find((b) => String(key).startsWith(`${b.prefix}/`));
  return bookPhrases(book).find((p) => p.key === key) || null;
}

// A set's 瞬間英作文, each with its phrase. The test asks testSize() of them.
export const setDrills = (set) => set.phrases.flatMap((phrase) => phrase.drills.map((drill) => ({ phrase, drill })));
export const testSize = (set) => Math.min(TEST_SIZE, setDrills(set).length);

// Every text the app may voice: the phrases and each drill's first answer.
export function phraseSentences() {
  const texts = new Set();
  for (const book of ALL) {
    for (const p of bookPhrases(book)) {
      texts.add(p.say);
      if (p.example) texts.add(p.example.en);
      for (const drill of p.drills) texts.add(drill.answers[0]);
    }
  }
  return texts;
}
