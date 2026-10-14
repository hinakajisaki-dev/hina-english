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

// The months one student sees, in order: [{ month, label }]. setting is the
// teacher's list for this student ([{ month, label }], see the server's
// pron_months setting), or null for every month under its own name. month is
// whose phrases they are (their keys, 完了 and recordings stay "m1/05"); label
// is the name the student sees ("Month 2").
export function studentMonths(setting) {
  const months = pronMonths();
  if (!Array.isArray(setting) || !setting.length) return months.map((month) => ({ month, label: `Month ${month}` }));
  return setting
    .filter((s) => months.includes(s.month))
    .map((s) => ({ month: s.month, label: s.label || `Month ${s.month}` }));
}

export const monthLabel = (months, month) => months.find((m) => m.month === month)?.label || `Month ${month}`;

// The month a student is on: the first with a phrase not 完了 yet (the last
// month once every one is done). isDone(key) says whether a phrase is 完了;
// months are the months this student has. Progress is counted one month at a time.
export function currentMonth(isDone, months = pronMonths()) {
  return months.find((month) => monthPhrases(month).some((p) => !isDone(p.key))) ?? months[months.length - 1];
}
