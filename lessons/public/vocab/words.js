// Vocabulary shared by the student app and the server.
//
// A week's words are the shared 単語帳 for that week (same for every student)
// followed by any words the teacher added for this one student. Every word
// gets a key: "w1/go" for a 単語帳 word, "item/12" for a teacher's word. The
// review list and test results are stored by these keys.
import { WEEK1 } from "./week1.js";

const BOOKS = { 1: WEEK1 };
export const SET_SIZE = 10;

// The 単語帳 words of one week, in slide order.
export function bookWords(week) {
  const book = BOOKS[week];
  if (!book) return [];
  return book.groups.flatMap((group) =>
    group.words.map((w) => ({
      key: `w${week}/${w.id}`,
      word: w.word,
      meaning: w.meaning,
      pos: group.pos,
      group: group.title,
      examples: w.examples,
    })),
  );
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

// All words of a week for one student: the 単語帳 first, then the teacher's.
export function weekWords(week, items = []) {
  const own = items.filter((item) => item.kind === "vocab" && (item.data.week || "other") === week).map(itemWord);
  return [...bookWords(week), ...own];
}

// Weeks that have a 単語帳.
export const bookWeeks = () => Object.keys(BOOKS).map(Number);

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

export const setKey = (week, number) => `w${week}/s${number}`;

// Every 単語帳 text the app may voice: the words and their example sentences.
export function bookSentences() {
  const texts = new Set();
  for (const week of bookWeeks()) {
    for (const w of bookWords(week)) {
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
