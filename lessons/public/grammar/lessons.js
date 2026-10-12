// Grammar units and lessons, shared by every student. The browser shows
// them, and the server reads them to check lesson ids and which example
// sentences may be voiced.
//
// A lesson is a list of steps, one screen each:
//   explain: title, text (paragraphs; **bold** allowed), table { head, rows }, examples [{ en, ja }]
//   choice:  q (a ___ marks the blank), ja, choices, answer, why
//   order:   ja, words (in the right order), end (final punctuation), why
//   write:   ja, answers (accepted English sentences), hint, why
//
// Each unit lives in its own file and follows a chapter of the teacher's
// 中学文法 document. The order here is the order students see.
import { BE } from "./be.js";
import { TENSE } from "./tense.js";
import { ARTICLES } from "./articles.js";

export const UNITS = [BE, TENSE, ARTICLES];

export function findLesson(lessonId) {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { unit, lesson };
  }
  return null;
}

// Number of questions in a lesson (explanations don't count).
export const questionCount = (lesson) => (lesson.steps || []).filter((s) => s.type !== "explain").length;

// Every English example sentence in the lessons; the server only voices these.
export function lessonExampleSentences() {
  const sentences = new Set();
  for (const unit of UNITS) {
    for (const lesson of unit.lessons) {
      for (const step of lesson.steps || []) {
        for (const example of step.examples || []) sentences.add(example.en);
      }
    }
  }
  return sentences;
}
