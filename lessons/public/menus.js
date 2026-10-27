// The parts of the student's home screen. The teacher can hide some of them
// for one student (先生ページの「設定・コード」, or the student's chat with
// scripts/teacher.mjs menu); a hidden part leaves the home screen and its
// screen sends the student back home. A student's list stores what is hidden,
// so a part added later shows for everyone until it is hidden.
// key is the screen's address (#/vocab …), except plan (今週の勉強範囲).
export const MENUS = [
  { key: "plan", name: "今週の勉強範囲" },
  { key: "journal", name: "日記" },
  { key: "vocab", name: "単語カード" },
  { key: "review", name: "単語復習" },
  { key: "phrases", name: "フレーズ" },
  { key: "phrase-review", name: "フレーズ復習" },
  { key: "grammar", name: "文法" },
  { key: "rephrase", name: "言い換え問題" },
  { key: "pron", name: "発音課題" },
  { key: "notes", name: "授業メモ" },
  { key: "study", name: "勉強時間" },
];

// "日記" or "journal" → "journal"; unknown names give null.
export function menuKey(word) {
  const w = String(word).trim();
  return MENUS.find((m) => m.key === w || m.name === w)?.key || null;
}
