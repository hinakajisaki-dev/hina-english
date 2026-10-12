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
