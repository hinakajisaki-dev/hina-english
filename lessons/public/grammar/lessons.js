// Grammar units and lessons, shared by every student. The browser shows
// them, and the server reads them to check lesson ids and which example
// sentences may be voiced.
//
// A lesson is a list of steps, one screen each:
//   explain: title, text (paragraphs), compare { labels, rows: [[before, after]] } where each side
//            is { en, ja }, chips
//            [{ label (optional), items, tone: "red" | "plain" }], table { head, rows } (a \n in a
//            cell starts a new line), note (paragraphs
//            under the key), key (what to remember, shown big; a list shows one per line), examples
//            [{ en, ja }], highlight (whole words shown in red)
//
// Inside any text: **bold**, [[red]] and {{blue}}. Red marks what changes (a 三単現
// subject and its s); blue marks words whose position matters (always, often…).
//   choice:  q (a ___ marks the blank), ja, choices, answer, why
//   order:   ja, words (in the right order), end (final punctuation), why
//   write:   ja, answers (accepted English sentences), hint, why
//
// Each unit lives in its own file and follows a chapter of the teacher's
// 中学文法 document. The order here is the order students see.
import { BE } from "./be.js";
import { TENSE } from "./tense.js";
import { PERFECT } from "./perfect.js";
import { ARTICLES } from "./articles.js";

export const UNITS = [BE, TENSE, PERFECT, ARTICLES];

export function findLesson(lessonId) {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { unit, lesson };
  }
  return null;
}

// Number of questions in a lesson (explanations don't count).
export const questionCount = (lesson) => (lesson.steps || []).filter((s) => s.type !== "explain").length;

// Text without the [[red]] / {{blue}} marks, for audio.
export const plain = (text) => String(text ?? "").replace(/\[\[|\]\]|\{\{|\}\}/g, "");

// Every English sentence the lessons can play; the server only voices these.
export function lessonExampleSentences() {
  const sentences = new Set();
  for (const unit of UNITS) {
    for (const lesson of unit.lessons) {
      for (const step of lesson.steps || []) {
        for (const example of step.examples || []) sentences.add(plain(example.en));
        for (const row of step.compare?.rows || []) row.forEach((side) => sentences.add(plain(side.en ?? side)));
      }
    }
  }
  return sentences;
}
