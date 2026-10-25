// API for the lesson app. Static pages in public/ are served by Cloudflare
// before this runs; everything under /api/ lands here.
//
// Students sign in with a personal code (kept in an HttpOnly cookie).
// The teacher signs in with TEACHER_PASSWORD; the cookie holds an HMAC of it.
import { AiError, correctJournal, correctSentence, judgeAnswer, makeRephraseProblems } from "./ai.js";
import { SpeechError, speechFor } from "./speech.js";
import {
  closeErrors, journalErrorKey, listErrors, markErrorDone, markErrorsSeen, noteStuckJournals, recordError,
} from "./errors.js";
import { findLesson, lessonExampleSentences, plain, questionCount } from "../public/grammar/lessons.js";
import { findMistakes, normalizeWords } from "../public/mistakes.js";
import { bookSentences, bookWord, setKey, vocabBooks, weekWords, wordSets } from "../public/vocab/words.js";
import { findPhrase, pronMonths } from "../public/pron/phrases.js";
import { phraseByKey, phraseSentences, phraseSetKey, phraseSets, testSize } from "../public/phrases/book.js";
import { noteProblems, noteSentences } from "../public/notes/format.js";
import { NOTES_FOR_STUDENTS } from "../public/course.js";
import { MENUS } from "../public/menus.js";
import {
  all, ensureSchema, first, isDbBusy, itemRow, japanDay, journalRow, noteRow, now, rephraseRow, run, studentBundle,
} from "./db.js";

const STUDENT_COOKIE = "hl_student";
const TEACHER_COOKIE = "hl_teacher";
const YEAR = 365 * 24 * 3600;
const DB_BUSY_MESSAGE = "ただいまサーバーが混み合っています。少し待ってから、もう一度ためしてください。";

// Fields each kind of item keeps; the first `required` of them must be filled.
const KINDS = {
  vocab: { fields: ["word", "meaning", "example"], required: 2 },
  pron: { fields: ["text", "tip"], required: 1 },
  grammar: { fields: ["question", "answer", "choices", "explanation"], required: 2 },
  topic: { fields: ["prompt"], required: 1 },
  // 言い換え問題 (瞬間英作文): the grammar it practises, the Japanese, the English
  // (two or more right answers split by /) and a hint.
  rephrase: { fields: ["group", "ja", "en", "hint"], required: 3 },
};
const WEEKS = 24;
const FIELD_NAMES = {
  word: "単語", meaning: "意味", text: "文", question: "問題", answer: "答え", prompt: "テーマ",
  group: "文法", ja: "日本語", en: "英語",
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    const who = {}; // the student, once the request is known to be theirs
    try {
      await ensureSchema(env.DB);
      return await route(request, env, url, who);
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error(error);
      const where = `${request.method} ${url.pathname}`;
      // Kept after the answer is sent: a database that is failing can be slow
      // to fail again, and the person shouldn't wait for that.
      const record = recordError(env.DB, {
        kind: "server",
        message: `サーバーのエラー（${where}）：${error?.message ?? error}`,
        detail: String(error?.stack ?? error),
        studentId: who.studentId ?? null,
        ref: where,
        key: `server|${where.replace(/\d+/g, ":id")}|${error?.message ?? error}`,
      });
      if (ctx?.waitUntil) ctx.waitUntil(record);
      else await record;
      // Not a sign-in problem: the pages only send people back to sign in on a 401.
      if (isDbBusy(error)) return json({ error: DB_BUSY_MESSAGE }, 503, { "Retry-After": "60" });
      return json({ error: "サーバーでエラーが起きました。少し待ってから、もう一度ためしてください。" }, 500);
    }
  },
};

async function route(request, env, url, who) {
  const method = request.method;
  const path = url.pathname.replace(/\/+$/, "");
  const parts = path.split("/").slice(2); // ["teacher", "students", "3"]
  const id = (i) => Number(parts[i]);

  // ---------- student ----------
  if (path === "/api/login" && method === "POST") return studentLogin(request, env, url);
  if (path === "/api/logout" && method === "POST") {
    return json({ ok: true }, 200, { "Set-Cookie": cookie(STUDENT_COOKIE, "", 0, url) });
  }
  if (parts[0] !== "teacher") {
    const student = await requireStudent(request, env);
    who.studentId = student.id;
    if (path === "/api/me" && method === "GET") return studentHome(env, student);
    if (path === "/api/errors" && method === "POST") return saveBrowserError(request, env, student.id);
    if (path === "/api/progress" && method === "POST") return saveProgress(request, env, student);
    if (path === "/api/speech" && method === "GET") return speech(env, student, url.searchParams.get("text"));
    if (parts[0] === "lessons" && parts.length === 2 && method === "POST") {
      return saveLessonResult(request, env, student, parts[1]);
    }
    if (path === "/api/vocab/review" && method === "POST") return saveReview(request, env, student);
    if (path === "/api/pron/done" && method === "POST") {
      return finishPhrase(request, env, student, url.searchParams.get("key"), url.searchParams.get("seconds"));
    }
    if (path === "/api/study/ping" && method === "POST") return addStudyTime(request, env, student);
    if (parts[0] === "study" && parts[1] === "days" && parts.length === 3 && method === "PUT") {
      return saveStudyDay(request, env, student, parts[2]);
    }
    if (parts[0] === "vocab" && parts[1] === "tests" && parts.length === 4 && method === "POST") {
      return saveVocabTest(request, env, student, parts[2], Number(parts[3]));
    }
    if (path === "/api/phrases/review" && method === "POST") return savePhraseReview(request, env, student);
    if (parts[0] === "phrases" && parts[1] === "tests" && parts.length === 4 && method === "POST") {
      return savePhraseTest(request, env, student, Number(parts[2]), Number(parts[3]));
    }
    if (path === "/api/explain" && method === "POST") return judgeTyped(request, env, student);
    if (NOTES_FOR_STUDENTS && parts[0] === "notes" && parts.length === 2 && method === "GET") {
      return studentNote(env, student, id(1));
    }
    if (path === "/api/rephrase" && method === "POST") return answerRephrase(request, env, student);
    if (parts[0] === "rephrase" && parts[2] === "correct" && parts.length === 3 && method === "POST") {
      return retryRephrase(env, student, id(1));
    }
    if (path === "/api/journals" && method === "POST") return newJournal(request, env, student);
    if (parts[0] === "journals" && parts[2] === "correct" && parts.length === 3 && method === "POST") {
      return retryCorrection(env, student, id(1));
    }
    throw new HttpError(404, "見つかりません。");
  }

  // ---------- teacher ----------
  if (path === "/api/teacher/login" && method === "POST") return teacherLogin(request, env, url);
  if (path === "/api/teacher/logout" && method === "POST") {
    return json({ ok: true }, 200, { "Set-Cookie": cookie(TEACHER_COOKIE, "", 0, url) });
  }
  await requireTeacher(request, env);
  const db = env.DB;

  if (path === "/api/teacher/students") {
    if (method === "GET") return listStudents(db);
    if (method === "POST") return addStudent(request, db);
  }
  // The error log, for the error chat (docs/error-chat.md, scripts/teacher.mjs errors).
  if (path === "/api/teacher/errors") {
    if (method === "GET") {
      const at = now();
      if (aiEnabled(env)) await noteStuckJournals(db);
      return json({ errors: await listErrors(db, { everything: url.searchParams.get("all") === "1" }), now: at });
    }
    if (method === "POST") return saveBrowserError(request, env, null);
  }
  if (path === "/api/teacher/errors/seen" && method === "POST") {
    const { until } = await readJson(request);
    if (Number.isNaN(Date.parse(until))) throw new HttpError(400, "内容が正しくありません。");
    await markErrorsSeen(db, new Date(until).toISOString());
    return json({ ok: true });
  }
  if (parts[1] === "errors" && parts[3] === "done" && parts.length === 4 && method === "POST") {
    const { note } = await readJson(request);
    const row = await markErrorDone(db, id(2), String(note || "").trim().slice(0, 500));
    if (!row) throw new HttpError(404, "そのエラーは見つかりません。");
    return json({ ok: true, already: !!row.done_at });
  }
  if (parts[1] === "journals" && parts[3] === "correct" && parts.length === 4 && method === "POST") {
    const row = await first(db, `SELECT student_id FROM journals WHERE id = ?`, id(2));
    if (!row) throw new HttpError(404, "その日記は見つかりません。");
    if (!aiEnabled(env)) throw new HttpError(400, "ANTHROPIC_API_KEY がないので、添削できません。");
    return retryCorrection(env, await findStudent(db, row.student_id), id(2));
  }
  if (parts[1] === "students" && parts.length === 3) {
    const student = await findStudent(db, id(2));
    if (method === "GET") {
      const notes = (await all(db, `SELECT * FROM lesson_notes WHERE student_id = ? ORDER BY day DESC, id DESC`, student.id))
        .map((row) => noteRow(row));
      // The latest 言い換え問題 answers with their sentences and corrections.
      const rephrased = (await all(db, `SELECT * FROM rephrase_answers WHERE student_id = ? ORDER BY id DESC LIMIT 60`, student.id))
        .map((row) => rephraseRow(row));
      return json({ student, ...(await studentBundle(db, student.id)), notes, rephraseAnswers: rephrased, ai: aiEnabled(env) });
    }
    if (method === "PATCH") return updateStudent(request, db, student);
    if (method === "DELETE") {
      await run(db, `DELETE FROM students WHERE id = ?`, student.id);
      await deleteRecordings(env, `rec/${student.id}/`);
      return json({ ok: true });
    }
  }
  if (parts[1] === "students" && parts[3] === "recording" && parts.length === 4 && method === "GET") {
    const student = await findStudent(db, id(2));
    return recordingAudio(request, env, student, String(url.searchParams.get("key") || ""));
  }
  if (parts[1] === "students" && parts[3] === "code" && parts.length === 4 && method === "POST") {
    const student = await findStudent(db, id(2));
    const code = await uniqueCode(db);
    await run(db, `UPDATE students SET code = ? WHERE id = ?`, code, student.id);
    return json({ student: { ...student, code } });
  }
  if (parts[1] === "students" && parts[3] === "items" && parts.length === 4 && method === "POST") {
    return addItems(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "notes" && parts.length === 4 && method === "POST") {
    return saveNote(request, db, await findStudent(db, id(2)), null);
  }
  if (parts[1] === "students" && parts[3] === "plan" && parts.length === 4 && method === "PUT") {
    return savePlan(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "menus" && parts.length === 4 && method === "PUT") {
    return saveMenus(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "pron-done" && parts.length === 4 && method === "POST") {
    return markPronDone(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "pron-months" && parts.length === 4 && method === "PUT") {
    return savePronMonths(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "vocab-books" && parts.length === 4 && method === "PUT") {
    return saveVocabBooks(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "lesson-days" && parts.length === 4 && method === "POST") {
    return saveLessonDays(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "rephrase-draft" && parts.length === 4 && method === "POST") {
    if (!aiEnabled(env)) throw new HttpError(400, "ANTHROPIC_API_KEY がないので、AI で作れません。");
    return draftRephrase(request, env, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "journals" && parts.length === 4 && method === "POST") {
    return importJournals(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "students" && parts[3] === "study-days" && parts.length === 4 && method === "POST") {
    return importStudyDays(request, db, await findStudent(db, id(2)));
  }
  if (parts[1] === "notes" && parts.length === 3) {
    const row = await first(db, `SELECT * FROM lesson_notes WHERE id = ?`, id(2));
    if (!row) throw new HttpError(404, "見つかりません。");
    if (method === "PUT") return saveNote(request, db, { id: row.student_id }, row);
    if (method === "DELETE") {
      await run(db, `DELETE FROM lesson_notes WHERE id = ?`, row.id);
      return json({ ok: true });
    }
  }
  if (parts[1] === "items" && parts.length === 3) {
    const row = await first(db, `SELECT * FROM items WHERE id = ?`, id(2));
    if (!row) throw new HttpError(404, "見つかりません。");
    if (method === "PUT") {
      const { data } = await readJson(request);
      // Fields the edit doesn't send (like a word's week) keep their old value.
      const clean = cleanItem(row.kind, { ...JSON.parse(row.data), ...data });
      await run(db, `UPDATE items SET data = ? WHERE id = ?`, JSON.stringify(clean), row.id);
      return json({ item: itemRow({ ...row, data: JSON.stringify(clean) }) });
    }
    if (method === "DELETE") {
      const key = `item/${row.id}`;
      await db.batch([
        db.prepare(`DELETE FROM items WHERE id = ?`).bind(row.id),
        db.prepare(`DELETE FROM vocab_review WHERE student_id = ? AND word_key = ?`).bind(row.student_id, key),
        db.prepare(`DELETE FROM pron_progress WHERE student_id = ? AND phrase_key = ?`).bind(row.student_id, key),
      ]);
      if (row.kind === "pron") await env.AUDIO.delete(recordingKey(row.student_id, key));
      return json({ ok: true });
    }
  }
  if (parts[1] === "journals" && parts.length === 3 && method === "PATCH") {
    return updateJournal(request, db, id(2));
  }
  throw new HttpError(404, "見つかりません。");
}

// ---------- student handlers ----------

async function studentLogin(request, env, url) {
  const { code } = await readJson(request);
  const normalized = normalizeCode(code);
  const student = normalized && (await first(env.DB, `SELECT id FROM students WHERE code = ?`, normalized));
  if (!student) {
    await sleep(400);
    throw new HttpError(401, "コードが見つかりません。先生からもらったコードを確認してください。");
  }
  return json({ ok: true }, 200, { "Set-Cookie": cookie(STUDENT_COOKIE, normalized, YEAR, url) });
}

async function requireStudent(request, env) {
  const code = readCookie(request, STUDENT_COOKIE);
  const student = code && (await first(env.DB, `SELECT * FROM students WHERE code = ?`, code));
  if (!student) throw new HttpError(401, "もう一度ログインしてください。");
  return student;
}

async function studentHome(env, student) {
  const [bundle, notes] = await Promise.all([
    studentBundle(env.DB, student.id),
    NOTES_FOR_STUDENTS
      ? all(env.DB, `SELECT * FROM lesson_notes WHERE student_id = ? AND published_at IS NOT NULL ORDER BY day DESC, id DESC`, student.id)
      : [],
  ]);
  // The list leaves the memos out; one is fetched when it is opened.
  const list = notes.map((row) => {
    const { body, ...note } = noteRow(row);
    return { ...note, problems: noteProblems(body).length };
  });
  // Memo cards in the フレーズ復習 list ("n12/3"), so it can show them.
  const noteCards = {};
  for (const { key } of bundle.phraseReview) {
    const card = noteCardIn(notes, key);
    if (card) noteCards[key] = card;
  }
  return json({ student: { name: student.name }, ...bundle, notes: list, noteCards, ai: aiEnabled(env) });
}

// A card of a 授業メモ's 復習問題 by its key: "n12/3" is the fourth card of memo
// 12. rows are the student's published memos. The card is { en, ja, note, day }.
const NOTE_CARD_KEY = /^n(\d+)\/(\d+)$/;

function noteCardIn(rows, key) {
  const m = String(key).match(NOTE_CARD_KEY);
  const row = m && rows.find((r) => r.id === Number(m[1]));
  const card = row && noteProblems(row.body)[Number(m[2])];
  return card ? { ...card, day: row.day } : null;
}

async function findNoteCard(db, student, key) {
  const m = NOTES_FOR_STUDENTS && String(key).match(NOTE_CARD_KEY);
  if (!m) return null;
  const rows = await all(
    db, `SELECT * FROM lesson_notes WHERE id = ? AND student_id = ? AND published_at IS NOT NULL`, Number(m[1]), student.id,
  );
  return noteCardIn(rows, key);
}

// One published 授業メモ.
async function studentNote(env, student, noteId) {
  const row = await first(
    env.DB, `SELECT * FROM lesson_notes WHERE id = ? AND student_id = ? AND published_at IS NOT NULL`, noteId, student.id,
  );
  if (!row) throw new HttpError(404, "見つかりません。");
  return json({ note: noteRow(row) });
}

async function saveProgress(request, env, student) {
  const { item_id, result, score } = await readJson(request);
  const item = await first(env.DB, `SELECT id FROM items WHERE id = ? AND student_id = ?`, Number(item_id), student.id);
  if (!item) throw new HttpError(404, "見つかりません。");

  const known = result === "known" ? 1 : result === "again" ? 0 : null;
  const right = result === "right" ? 1 : 0;
  const wrong = result === "wrong" ? 1 : 0;
  const best = Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : null;

  await run(
    env.DB,
    `INSERT INTO progress (student_id, item_id, known, right_count, wrong_count, best_score, updated_at)
     VALUES (?1, ?2, COALESCE(?3, 0), ?4, ?5, ?6, ?7)
     ON CONFLICT (student_id, item_id) DO UPDATE SET
       known = COALESCE(?3, known),
       right_count = right_count + ?4,
       wrong_count = wrong_count + ?5,
       best_score = CASE WHEN ?6 IS NULL THEN best_score ELSE MAX(COALESCE(best_score, 0), ?6) END,
       updated_at = ?7`,
    student.id, item.id, known, right, wrong, best, now(),
  );
  return json({ ok: true });
}

async function newJournal(request, env, student) {
  const input = await readJson(request);
  const body = String(input.body || "").trim();
  const topic = String(input.topic || "").trim().slice(0, 300);
  if (!body) throw new HttpError(400, "日記を書いてから送ってください。");
  if (body.length > 5000) throw new HttpError(400, "長すぎます。5,000文字以内にしてください。");

  const { meta } = await run(
    env.DB,
    `INSERT INTO journals (student_id, topic, body, created_at) VALUES (?, ?, ?, ?)`,
    student.id, topic, body, now(),
  );
  // Without an API key the journal simply goes to the teacher.
  if (!aiEnabled(env)) {
    return json({ journal: journalRow(await first(env.DB, `SELECT * FROM journals WHERE id = ?`, meta.last_row_id)) });
  }
  return correctOnce(env, student, meta.last_row_id);
}

// Audio is only made for text in the student's own content (their words,
// sentences and 授業メモ), the 単語帳, the フレーズ or the grammar lessons'
// examples, so the endpoint can't be used to voice anything else.
// (The pronunciation months play the teacher's own recordings instead.)
const SPOKEN_FIELDS = { vocab: ["word", "example"], pron: ["text"], rephrase: ["en"] };
const LESSON_SENTENCES = lessonExampleSentences();
const BOOK_SENTENCES = bookSentences();
const PHRASE_SENTENCES = phraseSentences();

async function speech(env, student, text) {
  let allowed = LESSON_SENTENCES.has(text) || BOOK_SENTENCES.has(text) || PHRASE_SENTENCES.has(text);
  if (!allowed) {
    const rows = await all(
      env.DB,
      `SELECT kind, data FROM items WHERE student_id = ? AND kind IN ('vocab', 'pron', 'rephrase')`,
      student.id,
    );
    allowed = rows.some((row) => {
      const data = JSON.parse(row.data);
      if (row.kind === "rephrase") return rephraseAnswers(data.en).includes(text);
      return SPOKEN_FIELDS[row.kind].some((field) => data[field] === text);
    });
  }
  // The English of the student's published 授業メモ: its 復習問題, the answers of its 英作文
  // and its sentences to read (**英語**).
  // (Every memo is read: with colour marks, {赤:I graduated}, an answer isn't in the body as voiced.)
  if (!allowed && text && NOTES_FOR_STUDENTS) {
    const notes = await all(
      env.DB,
      `SELECT body FROM lesson_notes WHERE student_id = ? AND published_at IS NOT NULL`,
      student.id,
    );
    allowed = notes.some((row) => noteSentences(row.body).has(text));
  }
  if (!text || !allowed) throw new HttpError(404, "見つかりません。");
  try {
    const audio = await speechFor(env, text);
    return new Response(audio, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=86400" },
    });
  } catch (error) {
    if (!(error instanceof SpeechError)) throw error;
    await recordError(env.DB, {
      kind: "speech",
      message: "音声を作れなかった（生徒の画面では、スマホの声で読んだ）",
      detail: error.detail,
      studentId: student.id,
      ref: text.slice(0, 100),
    });
    // The page falls back to the phone's own voice.
    throw new HttpError(503, "音声を作れませんでした。");
  }
}

async function saveLessonResult(request, env, student, lessonId) {
  const found = findLesson(lessonId);
  if (!found?.lesson.steps) throw new HttpError(404, "見つかりません。");
  const total = questionCount(found.lesson);
  const { score } = await readJson(request);
  const clean = Math.max(0, Math.min(total, Math.round(Number(score)) || 0));
  await run(
    env.DB,
    `INSERT INTO lesson_results (student_id, lesson_id, best_score, last_score, total, times, updated_at)
     VALUES (?1, ?2, ?3, ?3, ?4, 1, ?5)
     ON CONFLICT (student_id, lesson_id) DO UPDATE SET
       best_score = MAX(best_score, ?3), last_score = ?3, total = ?4, times = times + 1, updated_at = ?5`,
    student.id, lessonId, clean, total, now(),
  );
  return json({ ok: true });
}

// The 復習 list: on adds a word (source "check" when ticked on its card, "test"
// when missed in a set test), off takes it out. A word already in the list keeps
// its first source.
async function saveReview(request, env, student) {
  const { key, on, source } = await readJson(request);
  await requireWordKey(env.DB, student, String(key || ""));
  if (on) {
    await run(
      env.DB,
      `INSERT OR IGNORE INTO vocab_review (student_id, word_key, source, added_at) VALUES (?, ?, ?, ?)`,
      student.id, key, source === "test" ? "test" : "check", now(),
    );
  } else {
    await run(env.DB, `DELETE FROM vocab_review WHERE student_id = ? AND word_key = ?`, student.id, key);
  }
  return json({ ok: true });
}

// 完了 of one pronunciation phrase. The body is the student's recording (audio/*),
// which goes to the teacher, or {} when the browser can't record. Sending again
// replaces the recording; the first 完了 time is kept, since it counts toward
// that day's task.
const MAX_RECORDING = 1024 * 1024;
const RECORDING_TYPES = ["audio/webm", "audio/mp4", "audio/ogg", "audio/mpeg", "audio/aac", "audio/x-m4a", "audio/wav"];
const recordingKey = (studentId, key) => `rec/${studentId}/${key}`;

async function finishPhrase(request, env, student, key, secondsParam) {
  key = String(key || "");
  await requirePhraseKey(env.DB, student, key);
  const type = (request.headers.get("Content-Type") || "").split(";")[0].trim().toLowerCase();
  let recording = null;
  if (type.startsWith("audio/")) {
    if (!RECORDING_TYPES.includes(type)) throw new HttpError(415, "この録音の形式は送れません。");
    const tooLong = "録音が長すぎます。もう少し短く録音しなおしてください。";
    if (Number(request.headers.get("Content-Length")) > MAX_RECORDING) throw new HttpError(413, tooLong);
    const audio = await request.arrayBuffer();
    if (audio.byteLength > MAX_RECORDING) throw new HttpError(413, tooLong);
    if (!audio.byteLength) throw new HttpError(400, "録音が空でした。もう一度録音してください。");
    await env.AUDIO.put(recordingKey(student.id, key), audio, { metadata: { type } });
    const seconds = Math.round(Math.max(0, Math.min(600, Number(secondsParam) || 0)) * 10) / 10;
    recording = { type, bytes: audio.byteLength, seconds: seconds || null };
  } else {
    await readJson(request);
  }
  await run(
    env.DB,
    `INSERT INTO pron_progress (student_id, phrase_key, done_at, rec_type, rec_bytes, rec_seconds, sent_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, CASE WHEN ?4 IS NULL THEN NULL ELSE ?3 END)
     ON CONFLICT (student_id, phrase_key) DO UPDATE SET
       rec_type = COALESCE(?4, rec_type),
       rec_bytes = COALESCE(?5, rec_bytes),
       rec_seconds = CASE WHEN ?4 IS NULL THEN rec_seconds ELSE ?6 END,
       sent_at = CASE WHEN ?4 IS NULL THEN sent_at ELSE ?3 END,
       before_app = CASE WHEN ?4 IS NULL THEN before_app ELSE 0 END`,
    student.id, key, now(), recording?.type ?? null, recording?.bytes ?? null, recording?.seconds ?? null,
  );
  const row = await first(env.DB, `SELECT * FROM pron_progress WHERE student_id = ? AND phrase_key = ?`, student.id, key);
  return json({ done: { done_at: row.done_at, sent_at: row.sent_at, seconds: row.rec_seconds } });
}

// A phrase key must be a shared month phrase ("m1/05") or one of this student's own sentences ("item/12").
async function requirePhraseKey(db, student, key) {
  if (findPhrase(key)) return;
  const item = key.match(/^item\/(\d+)$/);
  if (item && (await first(db, `SELECT id FROM items WHERE id = ? AND student_id = ? AND kind = 'pron'`, Number(item[1]), student.id))) {
    return;
  }
  throw new HttpError(404, "見つかりません。");
}

// Time spent in the app: the page sends the seconds it was open and in use, about
// once a minute. At most two minutes are added at a time.
async function addStudyTime(request, env, student) {
  const { seconds } = await readJson(request);
  const add = Math.max(0, Math.min(120, Math.round(Number(seconds)) || 0));
  if (add) {
    await run(
      env.DB,
      `INSERT INTO study_days (student_id, day, app_seconds, updated_at) VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT (student_id, day) DO UPDATE SET app_seconds = MIN(86400, app_seconds + ?3), updated_at = ?4`,
      student.id, japanDay(), add, now(),
    );
  }
  return json({ ok: true, day: japanDay(), added: add });
}

// The student's own numbers for one day: minutes in the app, other study, and a note.
// App minutes the student didn't change (app_minutes_shown is what the form showed)
// keep the seconds counted so far, which may have grown since the page loaded.
async function saveStudyDay(request, env, student, day) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(Date.parse(day)) || day > japanDay()) {
    throw new HttpError(400, "日付が正しくありません。");
  }
  const input = await readJson(request);
  const minutes = (value) => Math.max(0, Math.min(1440, Math.round(Number(value)) || 0));
  const old = await first(env.DB, `SELECT * FROM study_days WHERE student_id = ? AND day = ?`, student.id, day);
  const appMinutes = minutes(input.app_minutes);
  const unchanged = input.app_minutes_shown !== undefined && minutes(input.app_minutes_shown) === appMinutes;
  const appSeconds = old && (unchanged || Math.round(old.app_seconds / 60) === appMinutes) ? old.app_seconds : appMinutes * 60;
  const other = minutes(input.other_minutes);
  const note = String(input.note ?? "").trim().slice(0, 300);
  await run(
    env.DB,
    `INSERT INTO study_days (student_id, day, app_seconds, other_minutes, note, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)
     ON CONFLICT (student_id, day) DO UPDATE SET app_seconds = ?3, other_minutes = ?4, note = ?5, updated_at = ?6`,
    student.id, day, appSeconds, other, note, now(),
  );
  return json({ day: { day, app_seconds: appSeconds, other_minutes: other, note } });
}

// A word key must be a 単語帳 word ("w1/go", "ielts1/increase") or one of this student's own words ("item/12").
async function requireWordKey(db, student, key) {
  if (!key.startsWith("item/") && bookWord(key)) return;
  const item = key.match(/^item\/(\d+)$/);
  if (item && (await first(db, `SELECT id FROM items WHERE id = ? AND student_id = ? AND kind = 'vocab'`, Number(item[1]), student.id))) {
    return;
  }
  throw new HttpError(404, "見つかりません。");
}

// The score of a set's test (ten words, or a day's). The total is the set's size, worked out here.
async function saveVocabTest(request, env, student, weekParam, number) {
  const week = weekParam === "other" ? "other" : Number(weekParam);
  const items = (await all(env.DB, `SELECT * FROM items WHERE student_id = ? AND kind = 'vocab'`, student.id)).map(itemRow);
  const books = await studentSetting(env.DB, student, "vocab_books");
  const set = wordSets(weekWords(week, items, books), week).find((s) => s.number === number);
  if (!set) throw new HttpError(404, "見つかりません。");
  const total = set.words.length;
  const { score } = await readJson(request);
  const clean = Math.max(0, Math.min(total, Math.round(Number(score)) || 0));
  await run(
    env.DB,
    `INSERT INTO vocab_tests (student_id, set_key, best_score, last_score, total, times, updated_at)
     VALUES (?1, ?2, ?3, ?3, ?4, 1, ?5)
     ON CONFLICT (student_id, set_key) DO UPDATE SET
       best_score = MAX(best_score, ?3), last_score = ?3, total = ?4, times = times + 1, updated_at = ?5`,
    student.id, setKey(week, number, books), clean, total, now(),
  );
  return json({ ok: true });
}

// The フレーズ復習 list, like the words' 復習 list: on adds a phrase (source
// "check" from its card, "test" when missed in a set test), off takes it out.
// Cards of the student's 授業メモ ("n12/3") go in the same list; one whose memo
// has changed or gone can still be taken out.
async function savePhraseReview(request, env, student) {
  const { key, on, source } = await readJson(request);
  const known = phraseByKey(key) || (on ? await findNoteCard(env.DB, student, key) : NOTE_CARD_KEY.test(String(key)));
  if (!known) throw new HttpError(404, "見つかりません。");
  if (on) {
    await run(
      env.DB,
      `INSERT OR IGNORE INTO phrase_review (student_id, phrase_key, source, added_at) VALUES (?, ?, ?, ?)`,
      student.id, key, source === "test" ? "test" : "check", now(),
    );
  } else {
    await run(env.DB, `DELETE FROM phrase_review WHERE student_id = ? AND phrase_key = ?`, student.id, key);
  }
  return json({ ok: true });
}

// The score of a phrase set's test. The number of questions is worked out here.
async function savePhraseTest(request, env, student, week, number) {
  const set = phraseSets(week).find((s) => s.number === number);
  if (!set || !testSize(set)) throw new HttpError(404, "見つかりません。");
  const total = testSize(set);
  const { score } = await readJson(request);
  const clean = Math.max(0, Math.min(total, Math.round(Number(score)) || 0));
  await run(
    env.DB,
    `INSERT INTO phrase_tests (student_id, set_key, best_score, last_score, total, times, updated_at)
     VALUES (?1, ?2, ?3, ?3, ?4, 1, ?5)
     ON CONFLICT (student_id, set_key) DO UPDATE SET
       best_score = MAX(best_score, ?3), last_score = ?3, total = ?4, times = times + 1, updated_at = ?5`,
    student.id, phraseSetKey(week, number), clean, total, now(),
  );
  return json({ ok: true });
}

// Only an entry with no correction yet (its first try failed) can be sent again
// (by the student, or by the teacher's error chat).
async function retryCorrection(env, student, journalId) {
  const row = await first(env.DB, `SELECT * FROM journals WHERE id = ? AND student_id = ?`, journalId, student.id);
  if (!row) throw new HttpError(404, "見つかりません。");
  if (row.correction || row.imported) return json({ journal: journalRow(row) });
  return correctOnce(env, student, journalId);
}

// Each entry is corrected once. It is saved before the AI runs, so if the AI
// fails the student keeps their text and the message comes back as ai_error.
// A failure goes in the error log, and is closed there when a later try works.
async function correctOnce(env, student, journalId) {
  const entry = await first(env.DB, `SELECT * FROM journals WHERE id = ?`, journalId);
  let aiError = null;
  try {
    const correction = await correctJournal(env, { body: entry.body, topic: entry.topic, note: student.note });
    await run(
      env.DB,
      `UPDATE journals SET correction = ?, corrected_at = ? WHERE id = ? AND correction IS NULL`,
      JSON.stringify(correction), now(), journalId,
    );
    await closeErrors(env.DB, journalErrorKey(journalId), "もう一度ためして、添削できた");
  } catch (error) {
    if (!(error instanceof AiError)) throw error;
    aiError = error.message;
    await recordError(env.DB, {
      kind: "journal",
      message: `日記 ${journalId} の添削ができなかった（生徒の画面：${error.message}）`,
      detail: error.detail,
      studentId: student.id,
      ref: String(journalId),
      key: journalErrorKey(journalId),
    });
  }
  const row = await first(env.DB, `SELECT * FROM journals WHERE id = ?`, journalId);
  return json({ journal: journalRow(row), ai_error: aiError });
}

// ---------- 言い換え問題 ----------
// The student writes the English of one of their problems (items of kind
// rephrase). The sentence is kept, then corrected by the AI like a journal. A
// sentence that is one of the right answers needs no AI, and the same sentence
// for the same problem gets the correction it had before. skip (答えを見る) only
// keeps that the problem was done.

const REPHRASE_CORRECTED_PER_DAY = 100;
const rephraseAnswers = (en) => String(en).split(/\/|／/).map((a) => a.trim()).filter(Boolean);
const rephraseErrorKey = (answerId) => `rephrase|${answerId}`;
const sameWords = (a, b) => normalizeWords(a).join(" ") === normalizeWords(b).join(" ");

async function answerRephrase(request, env, student) {
  const input = await readJson(request);
  const item = await first(
    env.DB, `SELECT * FROM items WHERE id = ? AND student_id = ? AND kind = 'rephrase'`, Number(input.item), student.id,
  );
  if (!item) throw new HttpError(404, "その問題は見つかりません。");
  const data = JSON.parse(item.data);
  const skip = input.skip === true;
  const given = skip ? "" : String(input.given || "").trim().replace(/\s+/g, " ");
  if (!skip && !given) throw new HttpError(400, "英語の文を書いてから送ってください。");
  if (given.length > 300) throw new HttpError(400, "長すぎます。300文字以内にしてください。");

  const empty = { corrected: given, corrections: [], spelling: [], comment: "" };
  let correction = null;
  if (skip) correction = { ...empty, skipped: true, ok: false };
  else if (rephraseAnswers(data.en).some((a) => sameWords(a, given))) correction = { ...empty, exact: true, ok: true };
  else {
    const before = await first(
      env.DB,
      `SELECT correction FROM rephrase_answers WHERE student_id = ? AND prompt = ? AND model = ? AND given = ? AND ok IS NOT NULL
       AND json_extract(correction, '$.skipped') IS NULL ORDER BY id DESC LIMIT 1`,
      student.id, data.ja, data.en, given,
    );
    if (before) {
      // Without the AI's name, so it doesn't count toward the day's AI corrections.
      const { model, ...kept } = JSON.parse(before.correction);
      correction = kept;
    }
  }
  const { meta } = await run(
    env.DB,
    `INSERT INTO rephrase_answers (student_id, item_id, grammar, prompt, model, given, correction, ok, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    student.id, item.id, data.group, data.ja, data.en, given,
    correction && JSON.stringify(correction), correction ? (correction.ok ? 1 : 0) : null, now(),
  );
  if (correction || !aiEnabled(env)) {
    return json({ answer: rephraseRow(await first(env.DB, `SELECT * FROM rephrase_answers WHERE id = ?`, meta.last_row_id)) });
  }
  return correctRephrase(env, student, meta.last_row_id, data.hint);
}

// Only an answer with no correction yet (the AI failed) can be sent again.
async function retryRephrase(env, student, answerId) {
  const row = await first(env.DB, `SELECT * FROM rephrase_answers WHERE id = ? AND student_id = ?`, answerId, student.id);
  if (!row) throw new HttpError(404, "見つかりません。");
  if (row.correction || !aiEnabled(env)) return json({ answer: rephraseRow(row) });
  const item = row.item_id && (await first(env.DB, `SELECT data FROM items WHERE id = ?`, row.item_id));
  return correctRephrase(env, student, answerId, item ? JSON.parse(item.data).hint : "");
}

// Like a journal: the answer is saved before the AI runs, so when the AI fails
// the student keeps their sentence and the message comes back as ai_error.
async function correctRephrase(env, student, answerId, hint) {
  const row = await first(env.DB, `SELECT * FROM rephrase_answers WHERE id = ?`, answerId);
  const since = new Date(Date.parse(`${japanDay()}T00:00:00+09:00`)).toISOString();
  const today = await first(
    env.DB,
    `SELECT COUNT(*) AS n FROM rephrase_answers WHERE student_id = ? AND created_at >= ? AND json_extract(correction, '$.model') IS NOT NULL`,
    student.id, since,
  );
  if (today.n >= REPHRASE_CORRECTED_PER_DAY) {
    return json({ answer: rephraseRow(row), ai_error: "今日の添削は、ここまでです。お手本とくらべてみてください。" });
  }
  let aiError = null;
  try {
    const correction = await correctSentence(env, {
      question: { ja: row.prompt, answers: rephraseAnswers(row.model), grammar: row.grammar, hint },
      given: row.given,
      note: student.note,
    });
    await run(
      env.DB,
      `UPDATE rephrase_answers SET correction = ?, ok = ? WHERE id = ? AND correction IS NULL`,
      JSON.stringify(correction), correction.ok ? 1 : 0, answerId,
    );
    await closeErrors(env.DB, rephraseErrorKey(answerId), "もう一度ためして、添削できた");
  } catch (error) {
    if (!(error instanceof AiError)) throw error;
    aiError = error.message;
    await recordError(env.DB, {
      kind: "rephrase",
      message: `言い換え問題の答え ${answerId} の添削ができなかった（生徒の画面：${error.message}）`,
      detail: error.detail,
      studentId: student.id,
      ref: String(answerId),
      key: rephraseErrorKey(answerId),
    });
  }
  return json({ answer: rephraseRow(await first(env.DB, `SELECT * FROM rephrase_answers WHERE id = ?`, answerId)), ai_error: aiError });
}

// The teacher types the grammar to practise, and the AI drafts problems from the
// student's latest diaries. Nothing is saved: the drafts go in the teacher's
// box to read and fix, then are added like any other line.
async function draftRephrase(request, env, student) {
  const input = await readJson(request);
  const grammar = String(input.grammar || "").trim().slice(0, 60);
  if (!grammar) throw new HttpError(400, "練習したい文法を入れてください。");
  const count = Math.min(20, Math.max(5, Number(input.count) || 10));
  const [journals, items] = await Promise.all([
    all(env.DB, `SELECT body FROM journals WHERE student_id = ? ORDER BY created_at DESC, id DESC LIMIT 5`, student.id),
    all(env.DB, `SELECT data FROM items WHERE student_id = ? AND kind = 'rephrase'`, student.id),
  ]);
  try {
    const problems = await makeRephraseProblems(env, {
      grammar,
      count,
      note: student.note,
      diaries: journals.map((j) => j.body.slice(0, 1500)),
      existing: items.map((row) => JSON.parse(row.data).ja),
    });
    return json({ grammar, problems });
  } catch (error) {
    if (!(error instanceof AiError)) throw error;
    await recordError(env.DB, {
      kind: "rephrase",
      message: `言い換え問題を AI で作れなかった（先生ページ：${error.message}）`,
      detail: error.detail,
      studentId: student.id,
      ref: grammar,
    });
    throw new HttpError(503, error.message);
  }
}

// AI correction is optional: it switches on once ANTHROPIC_API_KEY is set.
const aiEnabled = (env) => !!env.ANTHROPIC_API_KEY;

// The AI's verdict on a typed answer that matches none of the right answers:
// { acceptable (another good way to say it), comment, points } with one point
// per mistake that mistakes.js finds ({ n, kind, topic, why }). The question is
// looked up here (a lesson step, a フレーズ's 瞬間英作文, or one of the student's
// own teacher problems), never taken from the request, so this can't be used to
// ask the AI anything else. Verdicts are kept, so the same answer to the same
// question goes to the AI only once.
const JUDGED_PER_DAY = 100;

async function judgeTyped(request, env, student) {
  if (!aiEnabled(env)) throw new HttpError(404, "見つかりません。");
  const input = await readJson(request);
  const given = String(input.given || "").trim();
  if (!given || given.length > 300) throw new HttpError(400, "答えが読めませんでした。");
  const question = await explainedQuestion(env, student, input);
  const found = findMistakes(given, question.answers);
  if (!found.mistakes.length) return json({ acceptable: true, comment: "", points: [] });

  // The tag keeps these apart from verdicts kept under earlier rules (explanations
  // only, then stricter judging); change it whenever the judging rules change.
  const key = await sha256(JSON.stringify(["judge-2", question.source, question.answers, given.replace(/\s+/g, " ")]));
  const kept = await first(env.DB, `SELECT points FROM explanations WHERE key = ?`, key);
  if (kept) return json(JSON.parse(kept.points));

  const since = new Date(Date.parse(`${japanDay()}T00:00:00+09:00`)).toISOString();
  const today = await first(
    env.DB, `SELECT COUNT(*) AS n FROM explanations WHERE student_id = ? AND created_at >= ?`, student.id, since,
  );
  if (today.n >= JUDGED_PER_DAY) throw new HttpError(429, "今日の AI の判定は、ここまでです。教材の答えで判定しました。");

  let verdict;
  try {
    verdict = await judgeAnswer(env, { question, given, found });
  } catch (error) {
    if (!(error instanceof AiError)) throw error;
    await recordError(env.DB, {
      kind: "judge",
      message: "打った答えの AI 判定ができなかった（生徒の画面では、教材の答えで判定した）",
      detail: error.detail,
      studentId: student.id,
      ref: question.source,
    });
    throw new HttpError(503, error.message);
  }
  await run(
    env.DB,
    `INSERT INTO explanations (key, student_id, points, created_at) VALUES (?, ?, ?, ?) ON CONFLICT (key) DO NOTHING`,
    key, student.id, JSON.stringify(verdict), now(),
  );
  return json(verdict);
}

// The question a typed answer was for: { lesson, step }, { phrase, drill } or { item }.
async function explainedQuestion(env, student, input) {
  if (input.phrase) {
    const phrase = phraseByKey(input.phrase);
    const drill = phrase?.drills[Number(input.drill)];
    if (!drill) throw new HttpError(404, "見つかりません。");
    return {
      source: `phrase/${phrase.key}/${drill.n}`,
      japanese: drill.ja,
      chunk: phrase.chunk || phrase.en,
      hint: drill.hint || "",
      note: phrase.note,
      answers: drill.answers,
    };
  }
  if (input.lesson) {
    const index = Number(input.step);
    const step = findLesson(String(input.lesson))?.lesson.steps?.[index];
    if (step?.type !== "write") throw new HttpError(404, "見つかりません。");
    const text = (s) => plain(s).replace(/\*\*/g, "");
    return {
      source: `lesson/${input.lesson}/${index}`,
      japanese: step.ja,
      hint: step.hint || "",
      note: text(step.why),
      answers: step.answers,
    };
  }
  const item = await first(
    env.DB, `SELECT * FROM items WHERE id = ? AND student_id = ? AND kind = 'grammar'`, Number(input.item), student.id,
  );
  const data = item && JSON.parse(item.data);
  if (!data || data.choices?.length) throw new HttpError(404, "見つかりません。");
  return { source: `item/${item.id}`, question: data.question, note: data.explanation, answers: data.answer.split("/") };
}

// A script error in a student's browser, or the teacher's (public/common.js watchErrors).
async function saveBrowserError(request, env, studentId) {
  const input = await readJson(request);
  const text = (value, n) => String(value ?? "").slice(0, n).trim();
  const message = text(input.message, 300);
  if (!message) throw new HttpError(400, "内容が読めませんでした。");
  const where = text(input.source, 200) + (input.line ? `:${Number(input.line) || 0}:${Number(input.column) || 0}` : "");
  await recordError(env.DB, {
    kind: "browser",
    message: `${studentId ? "生徒の画面" : "先生ページ"}のエラー：${message}`,
    detail: [
      `page: ${text(input.page, 200)}`,
      `at: ${where}`,
      text(input.stack, 2000),
      `browser: ${text(request.headers.get("User-Agent"), 300)}`,
    ].join("\n"),
    studentId,
    ref: text(input.page, 200),
    key: `browser|${studentId ?? "teacher"}|${message}|${where}`,
  });
  return json({ ok: true });
}

// ---------- teacher handlers ----------

async function teacherLogin(request, env, url) {
  if (!env.TEACHER_PASSWORD) {
    throw new HttpError(500, "TEACHER_PASSWORD がまだ設定されていません。README の手順で設定してください。");
  }
  const { password } = await readJson(request);
  const given = await teacherToken(String(password || ""));
  const expected = await teacherToken(env.TEACHER_PASSWORD);
  if (!sameBytes(given, expected)) {
    await sleep(600);
    throw new HttpError(401, "パスワードがちがいます。");
  }
  return json({ ok: true }, 200, { "Set-Cookie": cookie(TEACHER_COOKIE, expected, YEAR, url) });
}

// The teacher's per-student Claude chats (scripts/teacher.mjs) send
// TEACHER_API_TOKEN as "Authorization: Bearer …" instead of signing in.
const MIN_API_TOKEN = 32;

async function requireTeacher(request, env) {
  const bearer = (request.headers.get("Authorization") || "").match(/^Bearer\s+(\S+)$/);
  if (bearer) {
    // Spaces or a line break pasted around the secret are not part of it.
    const expected = (env.TEACHER_API_TOKEN || "").trim();
    let problem = null;
    if (!expected) problem = "アプリ側に TEACHER_API_TOKEN がありません（Worker の Variables and Secrets に入れて、Deploy してください）。";
    else if (expected.length < MIN_API_TOKEN) problem = `アプリ側の TEACHER_API_TOKEN が短すぎます（${MIN_API_TOKEN}文字以上にしてください）。`;
    else if (!sameBytes(await sha256(bearer[1]), await sha256(expected))) problem = "トークンがちがいます。";
    if (problem) {
      await sleep(600);
      throw new HttpError(401, problem);
    }
    return;
  }
  const token = readCookie(request, TEACHER_COOKIE);
  if (!env.TEACHER_PASSWORD || !token || !sameBytes(token, await teacherToken(env.TEACHER_PASSWORD))) {
    throw new HttpError(401, "ログインしてください。");
  }
}

async function listStudents(db) {
  const students = await all(
    db,
    `SELECT s.*,
       (SELECT COUNT(*) FROM items i WHERE i.student_id = s.id) AS item_count,
       (SELECT COUNT(*) FROM journals j WHERE j.student_id = s.id AND j.teacher_read = 0) AS unread,
       (SELECT MAX(created_at) FROM journals j WHERE j.student_id = s.id) AS last_journal
     FROM students s ORDER BY s.id`,
  );
  return json({ students });
}

async function addStudent(request, db) {
  const { name } = await readJson(request);
  const clean = String(name || "").trim().slice(0, 60);
  if (!clean) throw new HttpError(400, "名前を入れてください。");
  const code = await uniqueCode(db);
  const { meta } = await run(db, `INSERT INTO students (name, code, created_at) VALUES (?, ?, ?)`, clean, code, now());
  return json({ student: await findStudent(db, meta.last_row_id) });
}

async function updateStudent(request, db, student) {
  const input = await readJson(request);
  const name = input.name === undefined ? student.name : String(input.name).trim().slice(0, 60);
  const note = input.note === undefined ? student.note : String(input.note).trim().slice(0, 1000);
  if (!name) throw new HttpError(400, "名前を入れてください。");
  await run(db, `UPDATE students SET name = ?, note = ? WHERE id = ?`, name, note, student.id);
  return json({ student: { ...student, name, note } });
}

async function findStudent(db, id) {
  const student = await first(db, `SELECT * FROM students WHERE id = ?`, id);
  if (!student) throw new HttpError(404, "生徒が見つかりません。");
  return student;
}

async function addItems(request, db, student) {
  const { kind, items } = await readJson(request);
  if (!KINDS[kind]) throw new HttpError(400, "種類がわかりません。");
  if (!Array.isArray(items) || items.length === 0) throw new HttpError(400, "追加するものがありません。");
  if (items.length > 300) throw new HttpError(400, "一度に追加できるのは 300 個までです。");
  const clean = items.map((data) => cleanItem(kind, data));
  const created = now();
  await db.batch(
    clean.map((data) =>
      db.prepare(`INSERT INTO items (student_id, kind, data, created_at) VALUES (?, ?, ?, ?)`)
        .bind(student.id, kind, JSON.stringify(data), created),
    ),
  );
  return json({ ok: true, added: clean.length });
}

function cleanItem(kind, data) {
  const spec = KINDS[kind];
  if (!data || typeof data !== "object") throw new HttpError(400, "内容が正しくありません。");
  const clean = {};
  for (const field of spec.fields) {
    if (field === "choices") {
      const choices = Array.isArray(data.choices) ? data.choices : [];
      clean.choices = choices.map((c) => String(c).trim().slice(0, 200)).filter(Boolean).slice(0, 6);
    } else {
      clean[field] = String(data[field] ?? "").trim().slice(0, 1000);
    }
  }
  for (const field of spec.fields.slice(0, spec.required)) {
    if (!clean[field]) throw new HttpError(400, `「${FIELD_NAMES[field]}」が空の行があります。`);
  }
  if (kind === "grammar" && clean.choices.length && !clean.choices.includes(clean.answer)) {
    clean.choices.push(clean.answer);
  }
  // Words are grouped into Week 1–24; words without a week show as そのほか.
  if (kind === "vocab") {
    const week = Number(data.week);
    clean.week = Number.isInteger(week) && week >= 1 && week <= WEEKS ? week : null;
  }
  return clean;
}

async function updateJournal(request, db, journalId) {
  const row = await first(db, `SELECT * FROM journals WHERE id = ?`, journalId);
  if (!row) throw new HttpError(404, "見つかりません。");
  const input = await readJson(request);
  const comment = input.teacher_comment === undefined
    ? row.teacher_comment
    : String(input.teacher_comment).trim().slice(0, 3000);
  const read = input.teacher_read === undefined ? row.teacher_read : input.teacher_read ? 1 : 0;
  await run(db, `UPDATE journals SET teacher_comment = ?, teacher_read = ? WHERE id = ?`, comment, read, journalId);
  return json({ journal: journalRow({ ...row, teacher_comment: comment, teacher_read: read }) });
}

// A new 授業メモ (row null) or an edit of one. publish true shows it to the
// student (an already published memo keeps its first date), false hides it
// again, and leaving it out keeps it as it is.
async function saveNote(request, db, student, row) {
  const input = await readJson(request);
  const day = String(input.day ?? row?.day ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(Date.parse(day))) throw new HttpError(400, "授業の日を入れてください。");
  const title = String(input.title ?? row?.title ?? "").trim().slice(0, 100);
  const body = String(input.body ?? row?.body ?? "").replace(/\r\n?/g, "\n").trim();
  if (!body) throw new HttpError(400, "メモの本文を入れてください。");
  if (body.length > 30000) throw new HttpError(400, "長すぎます。30,000文字以内にしてください。");
  const stamp = now();
  const published = input.publish === undefined ? row?.published_at ?? null : input.publish ? row?.published_at || stamp : null;
  if (row) {
    await run(
      db, `UPDATE lesson_notes SET day = ?, title = ?, body = ?, published_at = ?, updated_at = ? WHERE id = ?`,
      day, title, body, published, stamp, row.id,
    );
    return json({ note: noteRow({ ...row, day, title, body, published_at: published, updated_at: stamp }) });
  }
  const { meta } = await run(
    db,
    `INSERT INTO lesson_notes (student_id, day, title, body, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    student.id, day, title, body, published, stamp, stamp,
  );
  return json({ note: noteRow(await first(db, `SELECT * FROM lesson_notes WHERE id = ?`, meta.last_row_id)) });
}

// 発音 phrases the student finished and handed in before the app, put in as
// 完了 without a recording (before_app; the student sees 先生に提出ずみ):
// { keys: ["m1/01", …], day: "2026-09-30" }. The day must be before today, so
// they don't count as today's 発音. A phrase already 完了 keeps its own record.
// { keys, undo: true } takes such marks back (only these, so a phrase the
// student did in the app stays).
async function markPronDone(request, db, student) {
  const { keys, day, undo } = await readJson(request);
  if (!Array.isArray(keys) || !keys.length) throw new HttpError(400, "完了にする文がありません。");
  if (keys.length > 200) throw new HttpError(400, "一度にできるのは 200 文までです。");
  const unknown = keys.filter((key) => !findPhrase(String(key)));
  if (unknown.length) throw new HttpError(400, `発音課題にない文です：${unknown.join("、")}`);
  const done = new Map(
    (await all(db, `SELECT phrase_key, before_app FROM pron_progress WHERE student_id = ?`, student.id))
      .map((row) => [row.phrase_key, row]),
  );
  if (undo) {
    const remove = keys.filter((key) => done.get(key)?.before_app);
    if (remove.length) {
      await db.batch(remove.map((key) =>
        db.prepare(`DELETE FROM pron_progress WHERE student_id = ? AND phrase_key = ? AND before_app = 1`).bind(student.id, key)));
    }
    return json({ removed: remove.length, kept: keys.length - remove.length });
  }
  const when = String(day || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(when) || Number.isNaN(Date.parse(when)) || when >= japanDay()) {
    throw new HttpError(400, "日付は、きのうまでの日にしてください（今日の発音に数えないため）。");
  }
  const doneAt = new Date(`${when}T12:00:00+09:00`).toISOString();
  const add = keys.filter((key) => !done.has(key));
  if (add.length) {
    await db.batch(add.map((key) =>
      db.prepare(`INSERT OR IGNORE INTO pron_progress (student_id, phrase_key, done_at, before_app) VALUES (?, ?, ?, 1)`)
        .bind(student.id, key, doneAt)));
  }
  return json({ added: add.length, already: keys.length - add.length });
}

// The 発音 months this student sees, in order, and their names:
// { months: [{ month: 1, label: "Month 2" }] }. An empty list is the usual
// (phrases.js USUAL_MONTHS under their own names).
async function savePronMonths(request, db, student) {
  const { months } = await readJson(request);
  if (!Array.isArray(months)) throw new HttpError(400, "内容が正しくありません。");
  const have = pronMonths();
  const clean = months.map((m) => ({ month: Number(m?.month), label: String(m?.label ?? "").trim().slice(0, 30) }));
  const bad = clean.find((m) => !have.includes(m.month));
  if (bad) throw new HttpError(400, `Month ${Number.isFinite(bad.month) ? bad.month : "?"} の発音課題はありません（あるのは Month ${have.join("・")}）。`);
  if (new Set(clean.map((m) => m.month)).size !== clean.length) throw new HttpError(400, "同じ Month が2回あります。");
  for (const m of clean) if (!m.label) m.label = `Month ${m.month}`;
  if (!clean.length) {
    await run(db, `DELETE FROM student_settings WHERE student_id = ? AND name = 'pron_months'`, student.id);
    return json({ months: null });
  }
  await run(
    db,
    `INSERT INTO student_settings (student_id, name, value, updated_at) VALUES (?1, 'pron_months', ?2, ?3)
     ON CONFLICT (student_id, name) DO UPDATE SET value = ?2, updated_at = ?3`,
    student.id, JSON.stringify(clean), now(),
  );
  return json({ months: clean });
}

// The 単語帳 this student has instead of the shared one, by week:
// { books: { "1": "ielts1" } }. An empty object is the usual (every week's
// shared book). Words, 復習 and test results of the other book stay, unseen.
async function saveVocabBooks(request, db, student) {
  const { books } = await readJson(request);
  if (!books || typeof books !== "object" || Array.isArray(books)) throw new HttpError(400, "内容が正しくありません。");
  const have = vocabBooks();
  const clean = {};
  for (const [week, id] of Object.entries(books)) {
    if (!id) continue;
    const book = have.find((b) => b.id === id);
    if (!book) throw new HttpError(400, `「${id}」という単語帳はありません（あるのは ${have.map((b) => b.id).join("・")}）。`);
    if (String(book.week) !== String(week)) throw new HttpError(400, `${book.title} は Week ${book.week} の単語帳です。`);
    if (!book.shared) clean[book.week] = book.id;
  }
  if (!Object.keys(clean).length) {
    await run(db, `DELETE FROM student_settings WHERE student_id = ? AND name = 'vocab_books'`, student.id);
    return json({ books: null });
  }
  await run(
    db,
    `INSERT INTO student_settings (student_id, name, value, updated_at) VALUES (?1, 'vocab_books', ?2, ?3)
     ON CONFLICT (student_id, name) DO UPDATE SET value = ?2, updated_at = ?3`,
    student.id, JSON.stringify(clean), now(),
  );
  return json({ books: clean });
}

// Days the student had a lesson: { add: ["2026-08-03", …], remove: [...] }.
// A day can't be after today. A day with a 授業メモ is a lesson anyway, so
// taking it out here leaves it in the list. Returns every day put in.
async function saveLessonDays(request, db, student) {
  const { add = [], remove = [] } = await readJson(request);
  if (!Array.isArray(add) || !Array.isArray(remove)) throw new HttpError(400, "内容が正しくありません。");
  if (add.length + remove.length > 200) throw new HttpError(400, "一度にできるのは 200 日までです。");
  const today = japanDay();
  const bad = [...add, ...remove].map(String).find((day) => !/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(Date.parse(day)));
  if (bad !== undefined) throw new HttpError(400, `日付が読めません：${bad}（2026-08-03 のように書いてください）`);
  const future = add.map(String).find((day) => day > today);
  if (future) throw new HttpError(400, `まだ来ていない日です：${future}`);
  const statements = [
    ...add.map((day) => db.prepare(`INSERT OR IGNORE INTO lesson_days (student_id, day, created_at) VALUES (?, ?, ?)`).bind(student.id, String(day), now())),
    ...remove.map((day) => db.prepare(`DELETE FROM lesson_days WHERE student_id = ? AND day = ?`).bind(student.id, String(day))),
  ];
  if (statements.length) await db.batch(statements);
  const days = (await all(db, `SELECT day FROM lesson_days WHERE student_id = ? ORDER BY day`, student.id)).map((r) => r.day);
  return json({ days });
}

async function studentSetting(db, student, name) {
  const row = await first(db, `SELECT value FROM student_settings WHERE student_id = ? AND name = ?`, student.id, name);
  return row ? JSON.parse(row.value) : null;
}

// Past diaries from before the app: { entries: [{ day: "2026-08-03", body, topic }] }.
// Each keeps its own date (noon in Japan), has no AI correction and never gets
// one, and counts as read. An entry already there (same day and text) is skipped,
// so sending the same file twice adds nothing.
const MAX_IMPORT = 200;

async function importJournals(request, db, student) {
  const { entries } = await readJson(request);
  if (!Array.isArray(entries) || !entries.length) throw new HttpError(400, "入れる日記がありません。");
  if (entries.length > MAX_IMPORT) throw new HttpError(400, `一度に入れられるのは ${MAX_IMPORT} 日分までです。`);
  const clean = entries.map((entry, i) => {
    const day = String(entry?.day || "");
    const body = String(entry?.body || "").replace(/\r\n?/g, "\n").trim();
    const topic = String(entry?.topic || "").trim().slice(0, 300);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(Date.parse(day)) || day > japanDay()) {
      throw new HttpError(400, `${i + 1}つめの日付が正しくありません（${day || "なし"}）。`);
    }
    if (!body) throw new HttpError(400, `${i + 1}つめ（${day}）の本文がありません。`);
    if (body.length > 5000) throw new HttpError(400, `${i + 1}つめ（${day}）が長すぎます。5,000文字以内にしてください。`);
    return { day, body, topic, created_at: new Date(`${day}T12:00:00+09:00`).toISOString() };
  });
  const existing = await all(db, `SELECT created_at, body FROM journals WHERE student_id = ?`, student.id);
  const seen = new Set(existing.map((row) => `${row.created_at.slice(0, 10)}|${row.body.trim()}`));
  const fresh = clean.filter((entry) => {
    const key = `${entry.created_at.slice(0, 10)}|${entry.body}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (fresh.length) {
    await db.batch(fresh.map((entry) =>
      db.prepare(
        `INSERT INTO journals (student_id, topic, body, teacher_read, imported, created_at) VALUES (?, ?, ?, 1, 1, ?)`,
      ).bind(student.id, entry.topic, entry.body, entry.created_at)));
  }
  return json({ added: fresh.length, skipped: clean.length - fresh.length });
}

// Study time from before the app, one total per day, put in as study outside
// the app (other_minutes; the app time stays as counted): { days: [{ day:
// "2026-09-02", minutes: 55 }] }. A day that already has a record is skipped
// (so sending the same file twice adds nothing) unless replace is set: then its
// other study becomes the file's minutes, and its app time and note stay.
// { days, undo: true } takes the minutes back off the days that still have them.
async function importStudyDays(request, db, student) {
  const { days, replace, undo } = await readJson(request);
  if (!Array.isArray(days) || !days.length) throw new HttpError(400, "入れる勉強時間がありません。");
  if (days.length > 400) throw new HttpError(400, "一度に入れられるのは 400 日分までです。");
  const today = japanDay();
  const clean = days.map((entry, i) => {
    const day = String(entry?.day || "");
    const minutes = Number(entry?.minutes);
    // (Date.parse takes 2026-02-30 as March 2.)
    const date = new Date(`${day}T00:00:00Z`);
    const real = /^\d{4}-\d{2}-\d{2}$/.test(day) && !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === day;
    if (!real || day >= today) {
      throw new HttpError(400, `${i + 1}つめの日付が正しくありません（${day || "なし"}. きのうまでの日にしてください）。`);
    }
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) {
      throw new HttpError(400, `${i + 1}つめ（${day}）の分が正しくありません（1〜1440）。`);
    }
    return { day, minutes };
  });
  if (new Set(clean.map((d) => d.day)).size < clean.length) throw new HttpError(400, "同じ日付が2回あります。");
  const old = new Map(
    (await all(db, `SELECT * FROM study_days WHERE student_id = ?`, student.id)).map((row) => [row.day, row]),
  );

  if (undo) {
    const remove = clean.filter((d) => old.get(d.day)?.other_minutes === d.minutes);
    if (remove.length) {
      await db.batch(remove.flatMap((d) => [
        db.prepare(`UPDATE study_days SET other_minutes = 0, updated_at = ? WHERE student_id = ? AND day = ?`).bind(now(), student.id, d.day),
        db.prepare(`DELETE FROM study_days WHERE student_id = ? AND day = ? AND app_seconds = 0 AND other_minutes = 0 AND note = ''`)
          .bind(student.id, d.day),
      ]));
    }
    return json({ removed: remove.length, kept: clean.length - remove.length });
  }

  const put = clean.filter((d) => replace || !old.has(d.day));
  if (put.length) {
    await db.batch(put.map((d) =>
      db.prepare(
        `INSERT INTO study_days (student_id, day, other_minutes, updated_at) VALUES (?1, ?2, ?3, ?4)
         ON CONFLICT (student_id, day) DO UPDATE SET other_minutes = ?3, updated_at = ?4`,
      ).bind(student.id, d.day, d.minutes, now())));
  }
  return json({
    added: put.filter((d) => !old.has(d.day)).length,
    replaced: put.filter((d) => old.has(d.day)).length,
    skipped: clean.filter((d) => !put.includes(d)).map((d) => d.day),
  });
}

// The parts of the home screen hidden from this student: { hidden: ["vocab", …] }.
// An empty list shows everything again.
async function saveMenus(request, db, student) {
  const { hidden } = await readJson(request);
  if (!Array.isArray(hidden)) throw new HttpError(400, "内容が正しくありません。");
  const unknown = hidden.filter((key) => !MENUS.some((m) => m.key === key));
  if (unknown.length) throw new HttpError(400, `知らない項目です：${unknown.join("、")}`);
  const clean = MENUS.map((m) => m.key).filter((key) => hidden.includes(key));
  if (!clean.length) {
    await run(db, `DELETE FROM student_menus WHERE student_id = ?`, student.id);
  } else {
    await run(
      db,
      `INSERT INTO student_menus (student_id, hidden, updated_at) VALUES (?1, ?2, ?3)
       ON CONFLICT (student_id) DO UPDATE SET hidden = ?2, updated_at = ?3`,
      student.id, JSON.stringify(clean), now(),
    );
  }
  return json({ hidden: clean });
}

// 今週の勉強範囲. An empty body takes it away.
async function savePlan(request, db, student) {
  const input = await readJson(request);
  const body = String(input.body ?? "").replace(/\r\n?/g, "\n").trim();
  if (body.length > 5000) throw new HttpError(400, "長すぎます。5,000文字以内にしてください。");
  if (!body) {
    await run(db, `DELETE FROM study_plans WHERE student_id = ?`, student.id);
    return json({ plan: null });
  }
  const stamp = now();
  await run(
    db,
    `INSERT INTO study_plans (student_id, body, updated_at) VALUES (?1, ?2, ?3)
     ON CONFLICT (student_id) DO UPDATE SET body = ?2, updated_at = ?3`,
    student.id, body, stamp,
  );
  return json({ plan: { body, updated_at: stamp } });
}

// One recording, for the teacher's <audio> player. Safari asks for byte ranges.
async function recordingAudio(request, env, student, key) {
  const { value, metadata } = await env.AUDIO.getWithMetadata(recordingKey(student.id, key), "arrayBuffer");
  if (!value) throw new HttpError(404, "録音が見つかりません。");
  const headers = {
    "Content-Type": metadata?.type || "audio/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, max-age=86400",
    "X-Content-Type-Options": "nosniff",
  };
  const size = value.byteLength;
  const range = (request.headers.get("Range") || "").match(/^bytes=(\d*)-(\d*)$/);
  if (range && (range[1] || range[2])) {
    const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start >= size || start > end) {
      return new Response(null, { status: 416, headers: { ...headers, "Content-Range": `bytes */${size}` } });
    }
    return new Response(value.slice(start, end + 1), {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}` },
    });
  }
  return new Response(value, { headers });
}

async function deleteRecordings(env, prefix) {
  let cursor;
  do {
    const page = await env.AUDIO.list({ prefix, cursor });
    await Promise.all(page.keys.map((k) => env.AUDIO.delete(k.name)));
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
}

// ---------- helpers ----------

// Codes avoid look-alike characters (0/O, 1/I/L) so they are easy to type.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

async function uniqueCode(db) {
  for (;;) {
    const bytes = crypto.getRandomValues(new Uint8Array(8));
    const code = [...bytes].map((b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
    if (!(await first(db, `SELECT id FROM students WHERE code = ?`, code))) return code;
  }
}

function normalizeCode(code) {
  return String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

async function teacherToken(password) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("hina-lessons-teacher"));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(text) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function sameBytes(a, b) {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  return x.length === y.length && crypto.subtle.timingSafeEqual(x, y);
}

async function readJson(request) {
  if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
    throw new HttpError(415, "JSON で送ってください。");
  }
  try {
    return (await request.json()) || {};
  } catch {
    throw new HttpError(400, "内容が読めませんでした。");
  }
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  });
}

function cookie(name, value, maxAge, url) {
  const secure = url.protocol === "https:" ? "; Secure" : "";
  return `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
