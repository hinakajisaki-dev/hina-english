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
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS journals_student ON journals(student_id, created_at)`,
];

let ready = false;

export async function ensureSchema(db) {
  if (ready) return;
  await db.batch(SCHEMA.map((sql) => db.prepare(sql)));
  ready = true;
}

export const now = () => new Date().toISOString();

// Start of today in Japan time, as a UTC ISO string, for "per day" limits.
export function startOfJapanDay(date = new Date()) {
  const jst = new Date(date.getTime() + 9 * 3600e3);
  const midnight = Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate());
  return new Date(midnight - 9 * 3600e3).toISOString();
}

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
    created_at: row.created_at,
  };
}

// Everything one student's screen needs: items, progress and recent journals.
export async function studentBundle(db, studentId) {
  const [items, progress, journals] = await Promise.all([
    all(db, `SELECT * FROM items WHERE student_id = ? ORDER BY id`, studentId),
    all(db, `SELECT * FROM progress WHERE student_id = ?`, studentId),
    all(db, `SELECT * FROM journals WHERE student_id = ? ORDER BY id DESC LIMIT 60`, studentId),
  ]);
  const progressById = {};
  for (const p of progress) {
    progressById[p.item_id] = {
      known: !!p.known,
      right: p.right_count,
      wrong: p.wrong_count,
      best: p.best_score,
    };
  }
  return { items: items.map(itemRow), progress: progressById, journals: journals.map(journalRow) };
}
