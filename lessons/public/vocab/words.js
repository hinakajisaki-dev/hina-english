// Vocabulary shared by the student app and the server.
//
// A week's words are that week's 単語帳 followed by any words the teacher
// added for this one student. Every week has one shared 単語帳 ("w1") that
// students get; the teacher can give a student another book for a week instead
// (vocab_books, like { "1": "ielts1" }), and that student sees only it. Every
// word gets a key: "w1/go" or "ielts1/increase" for a 単語帳 word (its book's id,
// then the word's), "item/12" for a teacher's word. The review list and test
// results are stored by these keys.
import { WEEK1 } from "./week1.js";
import { IELTS1 } from "./ielts1.js";

const BOOKS = [WEEK1, IELTS1];
export const SET_SIZE = 10;

const findBook = (id) => BOOKS.find((b) => b.id === id) || null;
const sharedBook = (week) => `w${week}`;

// Every 単語帳: { id, week, title, count, shared } (shared: the one everyone gets that week).
export const vocabBooks = () =>
  BOOKS.map((b) => ({ id: b.id, week: b.week, title: b.title, count: bookWords(b.id).length, shared: b.id === sharedBook(b.week) }));

// The 単語帳 a student has for a week: the one the teacher gave them (books is
// the vocab_books setting, or null), else the shared one; null when there is none.
export function weekBook(week, books) {
  const picked = books?.[week];
  if (picked && findBook(picked)) return picked;
  return findBook(sharedBook(week)) ? sharedBook(week) : null;
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

// Words in sets of ten; each set ends with a test. Titles name the slide
// groups it covers (動詞 ①・②).
export function wordSets(words) {
  const sets = [];
  for (let i = 0; i < words.length; i += SET_SIZE) {
    const chunk = words.slice(i, i + SET_SIZE);
    const groups = [...new Set(chunk.map((w) => w.group))];
    sets.push({ number: sets.length + 1, words: chunk, title: setTitle(groups) });
  }
  return sets;
}

function setTitle(groups) {
  // "動詞 ①", "動詞 ②" → "動詞 ①・②"
  const parts = groups.map((g) => g.match(/^(.*?)\s*([①-⑳])$/));
  if (parts.every(Boolean) && parts.every((p) => p[1] === parts[0][1])) {
    return `${parts[0][1]} ${parts.map((p) => p[2]).join("・")}`;
  }
  return groups.join("・");
}

// A set's test results are kept under its book ("w1/s3", "ielts1/s3"); a week
// with only the teacher's words uses "w{week}".
export const setKey = (week, number, books = null) =>
  `${(week !== "other" && weekBook(week, books)) || `w${week}`}/s${number}`;

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

// "〜 off" is read as "off".
export const speakable = (word) => word.replace(/^[〜~]\s*/, "");

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
