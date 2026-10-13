// Pronunciation phrases shared by the student app and the server: one set
// of phrases per month, the same for every student. Each phrase gets a key
// ("m1/05") that its 完了 and the student's recording are stored under.
import { MONTH1 } from "./month1.js";
import { MONTH2 } from "./month2.js";

const BOOKS = { 1: MONTH1, 2: MONTH2 };
export const MONTHS = 6;

export const pronMonths = () => Object.keys(BOOKS).map(Number);

export function monthPhrases(month) {
  const book = BOOKS[month];
  if (!book) return [];
  return book.phrases.map((p) => ({ ...p, key: `m${month}/${p.id}` }));
}

export function findPhrase(key) {
  const month = Number(String(key).match(/^m(\d+)\//)?.[1]);
  return monthPhrases(month).find((p) => p.key === key) || null;
}

// The month a student is on: the first with a phrase not 完了 yet (the last
// month once every one is done). isDone(key) says whether a phrase is 完了.
// Progress is counted one month at a time.
export function currentMonth(isDone) {
  const months = pronMonths();
  return months.find((month) => monthPhrases(month).some((p) => !isDone(p.key))) ?? months[months.length - 1];
}
