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
import { LINKUP2 } from "./linkup2.js";

const BOOKS = [WEEK1, WEEK2, WEEK3, WEEK4, WEEK5, WEEK6, IELTS1, IELTS2, LINKUP1, LINKUP2];
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

// Where a word added for one student (kind "vocab") is listed: its week (1–24),
// "mine" (自分の単語: the student added it themselves) or "other" (the teacher's,
// with no week: そのほか).
export const itemWeek = (item) => (item.data.mine ? "mine" : item.data.week || "other");

// A word added for one student, by the teacher or by the student (mine, with its
// id so the student can change it): one example at most.
export function itemWord(item) {
  const { word, meaning, example, mine } = item.data;
  const form = example ? findForm(example, word) : null;
  return {
    key: `item/${item.id}`,
    word,
    meaning,
    pos: "",
    group: mine ? "自分で追加した単語" : "先生が追加した単語",
    examples: example ? [{ en: example, ja: "", note: "", form }] : [],
    ...(mine ? { mine: true, id: item.id } : {}),
  };
}

// All words of a week for one student: their 単語帳 first, then the teacher's.
// "mine" is the words the student added, in the order they added them, and
// "p1", "p2" … a week of a student's own pace (paceWeeks below).
export function weekWords(week, items = [], books = null, pace = null) {
  if (isPaceWeek(week)) return paceWeeks(items, books, pace).find((p) => p.week === week)?.words || [];
  const own = items.filter((item) => item.kind === "vocab" && itemWeek(item) === week).map(itemWord);
  const book = week === "other" || week === "mine" ? null : weekBook(week, books);
  return [...(book ? bookWords(book) : []), ...own];
}

// Weeks that have a 単語帳 for this student.
export const bookWeeks = (books = null) =>
  [...new Set(BOOKS.map((b) => b.week))].filter((week) => weekBook(week, books)).sort((a, b) => a - b);

// From Week 2, a week with a 単語帳 is split into 7 days (Day 1〜Day 7; 100
// words are 15, 15 and then 14 a day) instead of sets of ten.
const DAYS_FROM_WEEK = 2;
const DAYS = 7;
const byDays = (week, hasBook) => week !== "other" && Number(week) >= DAYS_FROM_WEEK && hasBook;

// Words over 7 days, the bigger days first (100: 15, 15, 14 …; 40: 6 × 5, 5, 5).
function inDays(words) {
  const chunks = [];
  for (let day = 0, at = 0; day < DAYS && at < words.length; day++) {
    const size = Math.floor(words.length / DAYS) + (day < words.length % DAYS ? 1 : 0);
    chunks.push(words.slice(at, (at += size)));
  }
  return chunks;
}

// ---------- a student's own pace ----------
// A student can study fewer words a week (student_settings vocab_pace, set by
// the teacher): { week: 2, days: 4, size: 40 }. In Week 2 the first 4 days stay
// as they were (done already), and the rest of its words are spread over 7 more
// days (Day 5〜11). From the next week on, the words of all later 単語帳 run on in
// order, 40 a week across the books ("p1", "p2" …, each in 7 days): Week 3's
// 1〜40, 41〜80, then its 81〜100 with Week 4's 1〜20, and so on.

export const isPaceWeek = (week) => /^p\d+$/.test(String(week));

// Every pace week of a student: [{ week: "p1", words, label: "Week 3 ①", range: "1〜40語" }].
export function paceWeeks(items, books, pace) {
  if (!pace) return [];
  const later = [...new Set([
    ...bookWeeks(books),
    ...items.filter((item) => item.kind === "vocab").map(itemWeek).filter((w) => typeof w === "number"),
  ])].filter((w) => w > pace.week).sort((a, b) => a - b);
  const stream = later.flatMap((week) => weekWords(week, items, books).map((word, i) => ({ word, week, n: i + 1 })));
  const weeks = [];
  const started = {};
  for (let at = 0; at < stream.length; at += pace.size) {
    const part = stream.slice(at, at + pace.size);
    const first = part[0].week;
    started[first] = (started[first] || 0) + 1;
    // "1〜40語", or "81〜100語 ＋ Week 4 の 1〜20語" when it runs into the next book.
    const range = [...new Set(part.map((p) => p.week))].map((week, i) => {
      const ns = part.filter((p) => p.week === week).map((p) => p.n);
      return `${i ? `Week ${week} の ` : ""}${ns[0]}〜${ns.at(-1)}語`;
    }).join(" ＋ ");
    weeks.push({ week: `p${weeks.length + 1}`, words: part.map((p) => p.word), label: `Week ${first} ${"①②③④⑤⑥⑦⑧⑨⑩"[started[first] - 1] || started[first]}`, range });
  }
  return weeks;
}

// A week's words in sets (sets of ten, or days); each set ends with a test.
// Titles name the slide groups it covers (動詞 ①・②); label is what the
// screens call the set ("1. 動詞 ①・②", or "Day 1"). With a pace, its week
// keeps its first days and spreads the rest over 7 more, and a pace week is 7 days.
export function wordSets(words, week, pace = null) {
  const paced = isPaceWeek(week);
  const days = paced || byDays(week, words.some((w) => !w.key.startsWith("item/")));
  let chunks = [];
  if (paced) {
    chunks = inDays(words);
  } else if (days && pace && Number(week) === pace.week) {
    const kept = inDays(words).slice(0, pace.days);
    chunks = [...kept, ...inDays(words.slice(kept.flat().length))];
  } else if (days) {
    chunks = inDays(words);
  } else {
    for (let i = 0; i < words.length; i += SET_SIZE) chunks.push(words.slice(i, i + SET_SIZE));
  }
  const sets = chunks.filter((chunk) => chunk.length);
  // 自分の単語 are "My vocabs" ("My vocabs 1", "My vocabs 2" … once there are more than ten).
  const mine = (i) => (sets.length > 1 ? `My vocabs ${i + 1}` : "My vocabs");
  return sets.map((chunk, i) => {
    const title = setTitle([...new Set(chunk.map((w) => w.group))]);
    const label = days ? `Day ${i + 1}` : week === "mine" ? mine(i) : `${i + 1}. ${title}`;
    return { number: i + 1, words: chunk, title, label, day: days };
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

// A set's test results are kept under its book ("w1/s3", "ielts1/s3"; a day
// is "w2/d3"); a week with only the teacher's words uses "w{week}".
export function setKey(week, number, books = null, pace = null) {
  if (isPaceWeek(week)) return `pace/${week}/d${number}`;
  const book = week !== "other" && weekBook(week, books);
  // The days after the kept ones in a pace's week are new days ("w2/p5").
  if (pace && book && Number(week) === pace.week && number > pace.days) return `${book}/p${number}`;
  return `${book || `w${week}`}/${byDays(week, !!book) ? "d" : "s"}${number}`;
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
