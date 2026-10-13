// フレーズ, shared by the student app and the server. One book for every
// student (the スモールトーク course), in weeks of about 50 phrases. A week
// comes in days (Day 1 …) when its phrases say which day they belong to,
// otherwise in sets of ten; each day or set ends with a short test.
//
// A week file (week1.js …) exports { week, title, phrases }. Each phrase:
//   id      unique in the week; never change it (students' 復習 lists use it)
//   day     the day it is learnt on (optional)
//   scene   the bit of conversation it belongs to ("場面1：あいさつ（ホテルのプールで）", optional)
//   en      the phrase as shown and read aloud
//   say     what 🔊 reads instead, when en has a slot (optional; "~" is left out anyway)
//   ja      和訳
//   chunk   塊: the form to learn ("How is 名詞?", optional; \n starts a
//           new line, one form per line)
//   note    解説: how the chunk works (optional; \n starts a new line)
//   example 例文: one more sentence with the chunk, { en, ja } (optional)
//   drills  瞬間英作文 with the chunk, up to two (none is fine):
//           { ja, answers: ["How's work going?", …], hint }; the first answer
//           is the one shown and read aloud, the others are also right, and
//           the hint (optional) waits behind a ヒントを見る button.
//
// Every phrase gets a key ("p1/05") and every day or set one ("p1/s2"); the
// フレーズ復習 list and the test results are stored by these keys.
import { WEEK1 } from "./week1.js";
import { WEEK2 } from "./week2.js";

const BOOKS = { 1: WEEK1, 2: WEEK2 };
export const SET_SIZE = 10;
export const TEST_SIZE = 5;

// Weeks that have phrases, and a week's theme ("はじめて会った人と話す").
export const phraseWeeks = () => Object.keys(BOOKS).map(Number);
export const weekTitle = (week) => BOOKS[week]?.title || "";

// "be about to ~" is read as "be about to".
const speakable = (en) => en.replace(/[~〜]/g, " ").replace(/\s+/g, " ").trim();

export function weekPhrases(week) {
  const book = BOOKS[week];
  if (!book) return [];
  return book.phrases.map((p, i) => ({
    key: `p${week}/${p.id}`,
    week,
    number: i + 1,
    en: p.en,
    day: p.day || null,
    scene: p.scene || "",
    say: p.say || speakable(p.en),
    ja: p.ja,
    chunk: p.chunk || "",
    note: p.note || "",
    example: p.example || null,
    drills: (p.drills || []).map((drill, n) => ({ ja: drill.ja, answers: drill.answers, hint: drill.hint || "", n })),
  }));
}

// A week's phrases by day ("Day 3"), or else in sets of ten ("フレーズ 11〜20").
export function phraseSets(week) {
  const phrases = weekPhrases(week);
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

// The scenes a day covers, for its card: "あいさつ・名前・仕事".
export const setScenes = (set) =>
  [...new Set(set.phrases.map((p) => p.scene.replace(/^場面\d+：/, "").replace(/（.*?）/g, "")).filter(Boolean))].join("・");

export const phraseSetKey = (week, number) => `p${week}/s${number}`;

export function phraseByKey(key) {
  const week = Number(String(key).match(/^p(\d+)\//)?.[1]);
  return weekPhrases(week).find((p) => p.key === key) || null;
}

// A set's 瞬間英作文, each with its phrase. The test asks testSize() of them.
export const setDrills = (set) => set.phrases.flatMap((phrase) => phrase.drills.map((drill) => ({ phrase, drill })));
export const testSize = (set) => Math.min(TEST_SIZE, setDrills(set).length);

// Every text the app may voice: the phrases and each drill's first answer.
export function phraseSentences() {
  const texts = new Set();
  for (const week of phraseWeeks()) {
    for (const p of weekPhrases(week)) {
      texts.add(p.say);
      for (const drill of p.drills) texts.add(drill.answers[0]);
    }
  }
  return texts;
}
