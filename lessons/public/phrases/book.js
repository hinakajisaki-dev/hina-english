// フレーズ, shared by the student app and the server. One book for every
// student, in weeks of about 50 phrases; each week comes in sets of ten, and
// each set ends with a short test.
//
// A week file (week1.js …) exports { week, phrases }. Each phrase:
//   id      unique in the week; never change it (students' 復習 lists use it)
//   en      the phrase or chunk as shown ("be about to ~")
//   say     what 🔊 reads, when en has a slot (optional; "~" is left out anyway)
//   ja      日本語訳
//   note    解説: how the chunk works (optional; \n starts a new line)
//   drills  瞬間英作文 with this chunk, up to two (none is fine):
//           { ja, answers: ["The train is about to leave.", …] }; the first
//           answer is the one shown and read aloud, the others are also right.
//
// Every phrase gets a key ("p1/05") and every set one ("p1/s2"); the
// フレーズ復習 list and the test results are stored by these keys.

const BOOKS = {};
export const SET_SIZE = 10;
export const TEST_SIZE = 5;

// Weeks that have phrases.
export const phraseWeeks = () => Object.keys(BOOKS).map(Number);

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
    say: p.say || speakable(p.en),
    ja: p.ja,
    note: p.note || "",
    drills: (p.drills || []).map((drill, n) => ({ ja: drill.ja, answers: drill.answers, n })),
  }));
}

// Phrases in sets of ten, titled by their numbers ("11〜20").
export function phraseSets(week) {
  const phrases = weekPhrases(week);
  const sets = [];
  for (let i = 0; i < phrases.length; i += SET_SIZE) {
    const chunk = phrases.slice(i, i + SET_SIZE);
    sets.push({ number: sets.length + 1, phrases: chunk, title: `${chunk[0].number}〜${chunk[chunk.length - 1].number}` });
  }
  return sets;
}

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
