// Vocabulary shared by the student app and the server.
//
// A week's words are that week's 単語帳 followed by any words the teacher
// added for this one student. A week's own 単語帳 ("w1") is the one students
// get, unless it is marked everyone: false (then only the students it is given
// to have it); the teacher can give a student another book for a week instead
// (vocab_books, like { "1": "ielts1" }), and that student sees only it. Every
// word gets a key: "w1/go" or "ielts1/increase" for a 単語帳 word (its book's id,
// then the word's), "item/12" for a teacher's word. The review list and test
// results are stored by these keys.
import { WEEK1 } from "./week1.js";
import { WEEK2 } from "./week2.js";
import { WEEK3 } from "./week3.js";
import { WEEK4 } from "./week4.js";
import { WEEK5 } from "./week5.js";
import { WEEK6 } from "./week6.js";
import { IELTS1 } from "./ielts1.js";
import { IELTS2 } from "./ielts2.js";
import { LINKUP1 } from "./linkup1.js";

const BOOKS = [WEEK1, WEEK2, WEEK3, WEEK4, WEEK5, WEEK6, IELTS1, IELTS2, LINKUP1];
export const SET_SIZE = 10;

const findBook = (id) => BOOKS.find((b) => b.id === id) || null;
const sharedBook = (week) => `w${week}`;
const isShared = (book) => book.id === sharedBook(book.week) && book.everyone !== false;

// Every 単語帳: { id, week, title, count, shared } (shared: the one everyone gets that week).
export const vocabBooks = () =>
  BOOKS.map((b) => ({ id: b.id, week: b.week, title: b.title, count: bookWords(b.id).length, shared: isShared(b) }));

// The 単語帳 a student has for a week: the one the teacher gave them (books is
// the vocab_books setting, or null), else the shared one; null when there is none.
export function weekBook(week, books) {
  const picked = books?.[week];
  if (picked && findBook(picked)) return picked;
  const shared = findBook(sharedBook(week));
  return shared && isShared(shared) ? shared.id : null;
}

// The words of one 単語帳, in its order.
export function bookWords(id) {
  const book = findBook(id);
  if (!book) return [];
  return book.groups.flatMap((group) =>
    group.words.map((w) => ({
      key: `${book.id}/${w.id}`,
      word: w.word,
      meaning: w.meaning,
      pos: w.pos || group.pos,
      group: group.title,
      examples: w.examples,
    })),
  );
}

// A 単語帳 word by its key ("ielts1/increase"), from any book.
export function bookWord(key) {
  const id = String(key).split("/")[0];
  return bookWords(id).find((w) => w.key === key) || null;
}

// A word the teacher added for one student (kind "vocab"): one example at most.
export function itemWord(item) {
  const { word, meaning, example } = item.data;
  const form = example ? findForm(example, word) : null;
  return {
    key: `item/${item.id}`,
    word,
    meaning,
    pos: "",
    group: "先生が追加した単語",
    examples: example ? [{ en: example, ja: "", note: "", form }] : [],
  };
}

// All words of a week for one student: their 単語帳 first, then the teacher's.
export function weekWords(week, items = [], books = null) {
  const own = items.filter((item) => item.kind === "vocab" && (item.data.week || "other") === week).map(itemWord);
  const book = week === "other" ? null : weekBook(week, books);
  return [...(book ? bookWords(book) : []), ...own];
}

// Weeks that have a 単語帳 for this student.
export const bookWeeks = (books = null) =>
  [...new Set(BOOKS.map((b) => b.week))].filter((week) => weekBook(week, books)).sort((a, b) => a - b);

// A week with a 単語帳 is split into 7 days (Day 1〜Day 7; 100 words are 15,
// 15 and then 14 a day). A student who already took a test of that 単語帳 in
// sets of ten (a saved "w1/s3": Week 1 was in sets of ten before) keeps it in
// sets of ten, so their scores stay; tests is the student's vocabTests. A week
// with only the teacher's words is in sets of ten.
const DAYS = 7;
const inSets = (book, tests) => Object.keys(tests || {}).some((key) => key.startsWith(`${book}/s`));
const byDays = (week, book, tests) => week !== "other" && !!book && !inSets(book, tests);

// A week's words in sets (days, or sets of ten); each set ends with a test.
// Titles name the slide groups it covers (動詞 ①・②); label is what the
// screens call the set ("Day 1", or "1. 動詞 ①・②").
export function wordSets(words, week, tests = null) {
  const book = words.find((w) => !w.key.startsWith("item/"))?.key.split("/")[0];
  const days = byDays(week, book, tests);
  const chunks = [];
  if (days) {
    for (let day = 0, at = 0; day < DAYS && at < words.length; day++) {
      const size = Math.floor(words.length / DAYS) + (day < words.length % DAYS ? 1 : 0);
      chunks.push(words.slice(at, (at += size)));
    }
  } else {
    for (let i = 0; i < words.length; i += SET_SIZE) chunks.push(words.slice(i, i + SET_SIZE));
  }
  return chunks.filter((chunk) => chunk.length).map((chunk, i) => {
    const title = setTitle([...new Set(chunk.map((w) => w.group))]);
    return { number: i + 1, words: chunk, title, label: days ? `Day ${i + 1}` : `${i + 1}. ${title}`, day: days };
  });
}

function setTitle(groups) {
  // "動詞 ①", "動詞 ②", "形容詞 ①" → "動詞 ①・② / 形容詞 ①"
  const named = [];
  for (const group of groups) {
    const [, base, n] = group.match(/^(.*?)\s*([①-⑳])$/) || [null, group, ""];
    const last = named.at(-1);
    if (last && n && last.base === base) last.numbers.push(n);
    else named.push({ base, numbers: n ? [n] : [] });
  }
  return named.map((g) => (g.numbers.length ? `${g.base} ${g.numbers.join("・")}` : g.base)).join(" / ");
}

// A set's test results are kept under its book ("w2/d3" for a day, "w1/s3"
// for a set of ten); a week with only the teacher's words uses "w{week}".
export function setKey(week, number, books = null, tests = null) {
  const book = week !== "other" && weekBook(week, books);
  return `${book || `w${week}`}/${byDays(week, book, tests) ? "d" : "s"}${number}`;
}

// Every 単語帳 text the app may voice: the words and their example sentences.
export function bookSentences() {
  const texts = new Set();
  for (const book of BOOKS) {
    for (const w of bookWords(book.id)) {
      texts.add(speakable(w.word));
      for (const ex of w.examples) texts.add(ex.en);
    }
  }
  return texts;
}

// What the voice reads: "〜 off" is "off", "end up ~ing" is "end up", "How long ...?" is "How long?".
export const speakable = (word) => word
  .replace(/[〜~]\s*ing\b|\s-ing\b/g, "")
  .replace(/[〜~]|\.\.\.|…|〇〇/g, "")
  .replace(/\s+([?!.,])/g, "$1")
  .replace(/\s+/g, " ")
  .trim();

// The word as it appears in a sentence (made for make), or null when it can't be found.
export function findForm(sentence, word) {
  const base = speakable(word).toLowerCase();
  const tokens = sentence.match(/[A-Za-z'’-]+/g) || [];
  const exact = tokens.find((t) => t.toLowerCase() === base);
  if (exact) return exact;
  const stem = base.replace(/e$/, "");
  return tokens.find((t) => t.toLowerCase().startsWith(stem) && t.length <= base.length + 4) || null;
}

// Splits a sentence around every whole-word use of `form`, for highlighting or
// blanking: the odd entries are the form. (No lookbehind: older iPhones lack it.)
export function splitOnForm(sentence, form) {
  if (!form) return [sentence];
  const escaped = form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(^|[^A-Za-z])(${escaped})(?=[^A-Za-z]|$)`, "g");
  const parts = [];
  let last = 0;
  for (let m = re.exec(sentence); m; m = re.exec(sentence)) {
    const start = m.index + m[1].length;
    parts.push(sentence.slice(last, start), m[2]);
    last = start + m[2].length;
  }
  parts.push(sentence.slice(last));
  return parts;
}
