// Problems the app runs into (a diary the AI couldn't correct, audio that
// couldn't be made, a bug on the server or in a student's browser), kept so the
// teacher's error chat can see and fix them (docs/error-chat.md).
//
// kind: journal | judge | speech | server | browser. The same problem again,
// while it is still open, adds to its count instead of making a new row.
// A row is open until it is marked done (by the error chat, or by the app
// itself when a diary's correction works on a later try).
import { all, first, now, run } from "./db.js";

const KEEP_DONE_DAYS = 90;
const MAX_OPEN_BROWSER = 200;

// Never throws: a problem keeping the record must not hide the first problem.
export async function recordError(db, { kind, message, detail = "", studentId = null, ref = "", key }) {
  try {
    const short = (text, n) => String(text ?? "").slice(0, n);
    // Request ids differ every time; without them the same problem matches.
    const clean = short(detail, 4000).replace(/req_[A-Za-z0-9]+/g, "req_…");
    const dedupe = short(key ?? `${kind}|${studentId ?? ""}|${message}|${clean.slice(0, 300)}`, 600);
    const at = now();
    const open = await first(db, `SELECT id FROM app_errors WHERE dedupe = ? AND done_at IS NULL`, dedupe);
    if (open) {
      await run(
        db,
        `UPDATE app_errors SET count = count + 1, last_at = ?, message = ?, detail = ?, ref = ? WHERE id = ?`,
        at, short(message, 500), clean, short(ref, 300), open.id,
      );
      return;
    }
    if (kind === "browser") {
      const { n } = await first(db, `SELECT COUNT(*) AS n FROM app_errors WHERE kind = 'browser' AND done_at IS NULL`);
      if (n >= MAX_OPEN_BROWSER) return;
    }
    await run(
      db,
      `INSERT INTO app_errors (kind, message, detail, student_id, ref, dedupe, count, first_at, last_at)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)`,
      kind, short(message, 500), clean, studentId, short(ref, 300), dedupe, at, at,
    );
    const old = new Date(Date.now() - KEEP_DONE_DAYS * 86400e3).toISOString();
    await run(db, `DELETE FROM app_errors WHERE done_at IS NOT NULL AND done_at < ?`, old);
  } catch (error) {
    // The log keeps both: what went wrong first, and why it couldn't be kept.
    console.error("could not record the error", { kind, message: String(message ?? "").slice(0, 500), because: error?.message ?? String(error) });
  }
}

// Closes the open rows with this key (a diary that got its correction after all).
export async function closeErrors(db, key, note) {
  try {
    await run(db, `UPDATE app_errors SET done_at = ?, done_note = ? WHERE dedupe = ? AND done_at IS NULL`, now(), note, key);
  } catch (error) {
    console.error("could not close the error", error?.message);
  }
}

export const journalErrorKey = (journalId) => `journal|${journalId}`;

// A diary with no correction and no failure kept for it: its request stopped
// part way, so nothing was recorded. Each one becomes an open journal error
// (only once: a row that was marked done is not made again).
export async function noteStuckJournals(db) {
  const since = new Date(Date.now() - 14 * 86400e3).toISOString();
  const before = new Date(Date.now() - 10 * 60e3).toISOString();
  const rows = await all(
    db,
    `SELECT j.id, j.student_id, j.created_at FROM journals j
     WHERE j.correction IS NULL AND j.imported = 0 AND j.created_at >= ? AND j.created_at <= ?
     AND NOT EXISTS (SELECT 1 FROM app_errors e WHERE e.dedupe = 'journal|' || j.id)`,
    since, before,
  );
  for (const row of rows) {
    await recordError(db, {
      kind: "journal",
      message: `日記 ${row.id} に添削がない（失敗の記録もない：送ったあと、途中で止まったのかもしれない）`,
      detail: `日記を送った時間 ${row.created_at}`,
      studentId: row.student_id,
      ref: String(row.id),
      key: journalErrorKey(row.id),
    });
  }
}

// Open rows (or, with everything, the latest 100 of all), newest first. A row
// is new when it happened (again) after the error chat last looked.
export async function listErrors(db, { everything = false } = {}) {
  const rows = await all(
    db,
    `SELECT e.*, s.name AS student_name FROM app_errors e LEFT JOIN students s ON s.id = e.student_id
     ${everything ? "" : "WHERE e.done_at IS NULL"} ORDER BY e.last_at DESC LIMIT 100`,
  );
  return rows.map((row) => ({
    id: row.id,
    kind: row.kind,
    message: row.message,
    detail: row.detail,
    student: row.student_id ? { id: row.student_id, name: row.student_name } : null,
    ref: row.ref,
    count: row.count,
    first_at: row.first_at,
    last_at: row.last_at,
    new: !row.done_at && (!row.seen_at || row.last_at > row.seen_at),
    done_at: row.done_at,
    done_note: row.done_note,
  }));
}

// Everything open that happened up to `until` (when the chat read the list) has been seen.
export async function markErrorsSeen(db, until) {
  await run(db, `UPDATE app_errors SET seen_at = ?1 WHERE done_at IS NULL AND last_at <= ?1`, until);
}

export async function markErrorDone(db, id, note) {
  const row = await first(db, `SELECT id, done_at FROM app_errors WHERE id = ?`, id);
  if (!row) return null;
  if (!row.done_at) await run(db, `UPDATE app_errors SET done_at = ?, done_note = ? WHERE id = ?`, now(), note, id);
  return row;
}
