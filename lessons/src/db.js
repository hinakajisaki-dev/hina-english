// D1 schema and small query helpers. Tables are created on first use, so a
// fresh database needs no migration step.

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    note TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL
  )`,
  // kind: vocab | phrase | pron | grammar | topic; data is JSON shaped per kind.
  `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    kind TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS items_student ON items(student_id, kind)`,
  // One row per student and item: vocab "known", grammar right/wrong counts, best pronunciation score.
  `CREATE TABLE IF NOT EXISTS progress (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    known INTEGER NOT NULL DEFAULT 0,
    right_count INTEGER NOT NULL DEFAULT 0,
    wrong_count INTEGER NOT NULL DEFAULT 0,
    best_score INTEGER,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (student_id, item_id)
  )`,
  `CREATE TABLE IF NOT EXISTS journals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    topic TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL,
    correction TEXT,
    corrected_at TEXT,
    teacher_comment TEXT NOT NULL DEFAULT '',
    teacher_read INTEGER NOT NULL DEFAULT 0,
    imported INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS journals_student ON journals(student_id, created_at)`,
  // Best and latest score for each grammar lesson (lessons live in public/grammar/lessons.js).
  `CREATE TABLE IF NOT EXISTS lesson_results (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    best_score INTEGER NOT NULL,
    last_score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    times INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (student_id, lesson_id)
  )`,
  // Words in the student's 復習 list. word_key is "w1/go" (単語帳) or "item/12" (teacher's word);
  // source is "check" (the student ticked it) or "test" (missed in a set test).
  `CREATE TABLE IF NOT EXISTS vocab_review (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    word_key TEXT NOT NULL,
    source TEXT NOT NULL,
    added_at TEXT NOT NULL,
    PRIMARY KEY (student_id, word_key)
  )`,
  // Best and latest score of each ten-word set test; set_key is "w1/s3".
  `CREATE TABLE IF NOT EXISTS vocab_tests (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    set_key TEXT NOT NULL,
    best_score INTEGER NOT NULL,
    last_score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    times INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (student_id, set_key)
  )`,
  // Pronunciation phrases the student has finished (完了), and the latest recording
  // they sent to the teacher. phrase_key is "m1/05" (public/pron/phrases.js) or
  // "item/12" (the teacher's own sentence). The audio itself is in KV (AUDIO)
  // under "rec/{student_id}/{phrase_key}"; rec_type is null until one is sent.
  `CREATE TABLE IF NOT EXISTS pron_progress (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    phrase_key TEXT NOT NULL,
    done_at TEXT NOT NULL,
    rec_type TEXT,
    rec_bytes INTEGER,
    rec_seconds REAL,
    sent_at TEXT,
    PRIMARY KEY (student_id, phrase_key)
  )`,
  // Study time for each day (Japan date, "2026-10-12"): app_seconds is counted while
  // the app is open and being used, other_minutes is study the student writes in.
  // The student can edit both.
  `CREATE TABLE IF NOT EXISTS study_days (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    day TEXT NOT NULL,
    app_seconds INTEGER NOT NULL DEFAULT 0,
    other_minutes INTEGER NOT NULL DEFAULT 0,
    note TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL,
    PRIMARY KEY (student_id, day)
  )`,
  // Phrases in the student's フレーズ復習 list. phrase_key is "p1/05" (public/phrases/book.js);
  // source is "check" (the student put it in) or "test" (missed in a set test).
  `CREATE TABLE IF NOT EXISTS phrase_review (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    phrase_key TEXT NOT NULL,
    source TEXT NOT NULL,
    added_at TEXT NOT NULL,
    PRIMARY KEY (student_id, phrase_key)
  )`,
  // Best and latest score of each phrase set's test; set_key is "p1/s2".
  `CREATE TABLE IF NOT EXISTS phrase_tests (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    set_key TEXT NOT NULL,
    best_score INTEGER NOT NULL,
    last_score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    times INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (student_id, set_key)
  )`,
  // The AI's verdicts on typed answers that match none of the right answers, kept
  // so the same answer to the same question is only sent to the AI once. key is a
  // hash of the question and the answer; points is the verdict as JSON
  // ({ acceptable, comment, points: [{ n, kind, topic, why }] }).
  // student_id is who asked first (for the daily limit).
  `CREATE TABLE IF NOT EXISTS explanations (
    key TEXT PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    points TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS explanations_student ON explanations(student_id, created_at)`,
  // 授業メモ: the teacher's organized memo of one lesson (public/notes/format.js).
  // day is the lesson's date ("2026-10-12"); the student sees it once published_at is set.
  `CREATE TABLE IF NOT EXISTS lesson_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    day TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL,
    published_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS lesson_notes_student ON lesson_notes(student_id, day)`,
  // Days the student had a lesson, put in by the teacher (lessons from before the
  // app, or with no 授業メモ). The numbered list of lessons is these days and the
  // days of 授業メモ together (public/notes/format.js lessonList).
  `CREATE TABLE IF NOT EXISTS lesson_days (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    day TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (student_id, day)
  )`,
  // 今週の勉強範囲: what the teacher wants the student to study this week, shown at
  // the top of the student's home (the same small Markdown as 授業メモ).
  `CREATE TABLE IF NOT EXISTS study_plans (
    student_id INTEGER PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  // The parts of the home screen this student doesn't see (public/menus.js),
  // as a JSON list of keys. No row: the student sees everything.
  `CREATE TABLE IF NOT EXISTS student_menus (
    student_id INTEGER PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
    hidden TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  // Other settings for one student, as JSON by name. pron_months: the 発音
  // months this student sees and their names, [{ month: 1, label: "Month 2" }]
  // (public/pron/phrases.js studentMonths). vocab_books: the 単語帳 this student
  // has instead of the shared one, by week, { "1": "ielts1" } (public/vocab/words.js).
  // No row: the usual.
  `CREATE TABLE IF NOT EXISTS student_settings (
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (student_id, name)
  )`,
];

// Columns added to a table after it was first made. On a database that has
// them already, SQLite says "duplicate column name", which is fine.
// journals.imported: an entry the teacher put in from before the app (past
// diaries, written elsewhere); it is never sent to the AI.
// pron_progress.before_app: a phrase the student finished and handed in before
// the app, put in as 完了 by the teacher (no recording here).
const ADDED_COLUMNS = [
  `ALTER TABLE journals ADD COLUMN imported INTEGER NOT NULL DEFAULT 0`,
  `ALTER TABLE pron_progress ADD COLUMN before_app INTEGER NOT NULL DEFAULT 0`,
];

let ready = false;

export async function ensureSchema(db) {
  if (ready) return;
  await db.batch(SCHEMA.map((sql) => db.prepare(sql)));
  for (const sql of ADDED_COLUMNS) {
    try {
      await db.prepare(sql).run();
    } catch (error) {
      if (!/duplicate column/i.test(String(error?.message))) throw error;
    }
  }
  ready = true;
}

export const now = () => new Date().toISOString();

// Today's date in Japan, "2026-10-12"; offset moves it by whole days.
export const japanDay = (offset = 0) => new Date(Date.now() + 9 * 3600e3 + offset * 86400e3).toISOString().slice(0, 10);

export async function all(db, sql, ...params) {
  const { results } = await db.prepare(sql).bind(...params).all();
  return results;
}

export function first(db, sql, ...params) {
  return db.prepare(sql).bind(...params).first();
}

export function run(db, sql, ...params) {
  return db.prepare(sql).bind(...params).run();
}

export function itemRow(row) {
  return { id: row.id, kind: row.kind, data: JSON.parse(row.data), created_at: row.created_at };
}

export function journalRow(row) {
  return {
    id: row.id,
    topic: row.topic,
    body: row.body,
    correction: row.correction ? JSON.parse(row.correction) : null,
    corrected_at: row.corrected_at,
    teacher_comment: row.teacher_comment,
    teacher_read: !!row.teacher_read,
    imported: !!row.imported,
    created_at: row.created_at,
  };
}

export function noteRow(row) {
  return {
    id: row.id,
    day: row.day,
    title: row.title,
    body: row.body,
    published_at: row.published_at,
    updated_at: row.updated_at,
  };
}

// Everything one student's screen needs: items, progress, lesson results, the 復習 list,
// set test results, finished pronunciation phrases, study time, recent journals,
// this week's 勉強範囲 and the parts of the home screen hidden from them.
export async function studentBundle(db, studentId) {
  const [
    items, progress, lessonRows, reviewRows, testRows, phraseReviewRows, phraseTestRows, pronRows, studyRows, journals, plan,
    menus, settings, lessonDays,
  ] = await Promise.all([
    all(db, `SELECT * FROM items WHERE student_id = ? ORDER BY id`, studentId),
    all(db, `SELECT * FROM progress WHERE student_id = ?`, studentId),
    all(db, `SELECT * FROM lesson_results WHERE student_id = ?`, studentId),
    all(db, `SELECT * FROM vocab_review WHERE student_id = ? ORDER BY added_at`, studentId),
    all(db, `SELECT * FROM vocab_tests WHERE student_id = ?`, studentId),
    all(db, `SELECT * FROM phrase_review WHERE student_id = ? ORDER BY added_at`, studentId),
    all(db, `SELECT * FROM phrase_tests WHERE student_id = ?`, studentId),
    all(db, `SELECT * FROM pron_progress WHERE student_id = ?`, studentId),
    all(db, `SELECT * FROM study_days WHERE student_id = ? AND day >= ? ORDER BY day`, studentId, japanDay(-400)),
    all(db, `SELECT * FROM journals WHERE student_id = ? ORDER BY created_at DESC, id DESC LIMIT 60`, studentId),
    first(db, `SELECT body, updated_at FROM study_plans WHERE student_id = ?`, studentId),
    first(db, `SELECT hidden FROM student_menus WHERE student_id = ?`, studentId),
    all(db, `SELECT name, value FROM student_settings WHERE student_id = ?`, studentId),
    // Every day with a lesson: the days put in, and the days of every 授業メモ up
    // to today (drafts too, so the student's numbering doesn't change when one is published).
    all(
      db,
      `SELECT day FROM lesson_days WHERE student_id = ?1 UNION SELECT day FROM lesson_notes WHERE student_id = ?1 AND day <= ?2 ORDER BY day`,
      studentId, japanDay(),
    ),
  ]);
  const setting = (name) => {
    const row = settings.find((r) => r.name === name);
    return row ? JSON.parse(row.value) : null;
  };
  const progressById = {};
  for (const p of progress) {
    progressById[p.item_id] = {
      known: !!p.known,
      right: p.right_count,
      wrong: p.wrong_count,
      best: p.best_score,
    };
  }
  const lessons = {};
  for (const r of lessonRows) {
    lessons[r.lesson_id] = { best: r.best_score, last: r.last_score, total: r.total, times: r.times, updated_at: r.updated_at };
  }
  const review = reviewRows.map((r) => ({ key: r.word_key, source: r.source, added_at: r.added_at }));
  const phraseReview = phraseReviewRows.map((r) => ({ key: r.phrase_key, source: r.source, added_at: r.added_at }));
  const scores = (rows) => {
    const bySet = {};
    for (const r of rows) {
      bySet[r.set_key] = { best: r.best_score, last: r.last_score, total: r.total, times: r.times, updated_at: r.updated_at };
    }
    return bySet;
  };
  const pronDone = {};
  for (const r of pronRows) {
    pronDone[r.phrase_key] = {
      done_at: r.done_at, sent_at: r.sent_at, seconds: r.rec_seconds, ...(r.before_app ? { before_app: true } : {}),
    };
  }
  const study = studyRows.map((r) => ({
    day: r.day, app_seconds: r.app_seconds, other_minutes: r.other_minutes, note: r.note,
  }));
  return {
    items: items.map(itemRow), progress: progressById, lessons, review, vocabTests: scores(testRows),
    phraseReview, phraseTests: scores(phraseTestRows), pronDone, study,
    journals: journals.map(journalRow),
    plan: plan ? { body: plan.body, updated_at: plan.updated_at } : null,
    hidden: menus ? JSON.parse(menus.hidden) : [],
    pronMonths: setting("pron_months"),
    vocabBooks: setting("vocab_books"),
    lessonDays: lessonDays.map((r) => r.day),
  };
}
