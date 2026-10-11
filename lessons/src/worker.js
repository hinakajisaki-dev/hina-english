// API for the lesson app. Static pages in public/ are served by Cloudflare
// before this runs; everything under /api/ lands here.
//
// Students sign in with a personal code (kept in an HttpOnly cookie).
// The teacher signs in with TEACHER_PASSWORD; the cookie holds an HMAC of it.
import { AiError, correctJournal } from "./ai.js";
import {
  all, ensureSchema, first, itemRow, journalRow, now, run, startOfJapanDay, studentBundle,
} from "./db.js";

const STUDENT_COOKIE = "hl_student";
const TEACHER_COOKIE = "hl_teacher";
const YEAR = 365 * 24 * 3600;

// Fields each kind of item keeps; the first `required` of them must be filled.
const KINDS = {
  vocab: { fields: ["word", "meaning", "example"], required: 2 },
  phrase: { fields: ["phrase", "meaning", "note"], required: 2 },
  pron: { fields: ["text", "tip"], required: 1 },
  grammar: { fields: ["question", "answer", "choices", "explanation"], required: 2 },
  topic: { fields: ["prompt"], required: 1 },
};
const FIELD_NAMES = {
  word: "単語", meaning: "意味", phrase: "フレーズ", text: "文", question: "問題", answer: "答え", prompt: "テーマ",
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    try {
      await ensureSchema(env.DB);
      return await route(request, env, url);
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error(error);
      return json({ error: "サーバーでエラーが起きました。少し待ってから、もう一度ためしてください。" }, 500);
    }
  },
};

async function route(request, env, url) {
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
    if (path === "/api/me" && method === "GET") return studentHome(env, student);
    if (path === "/api/progress" && method === "POST") return saveProgress(request, env, student);
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
  if (parts[1] === "students" && parts.length === 3) {
    const student = await findStudent(db, id(2));
    if (method === "GET") return json({ student, ...(await studentBundle(db, student.id)) });
    if (method === "PATCH") return updateStudent(request, db, student);
    if (method === "DELETE") {
      await run(db, `DELETE FROM students WHERE id = ?`, student.id);
      return json({ ok: true });
    }
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
  if (parts[1] === "items" && parts.length === 3) {
    const row = await first(db, `SELECT * FROM items WHERE id = ?`, id(2));
    if (!row) throw new HttpError(404, "見つかりません。");
    if (method === "PUT") {
      const { data } = await readJson(request);
      const clean = cleanItem(row.kind, data);
      await run(db, `UPDATE items SET data = ? WHERE id = ?`, JSON.stringify(clean), row.id);
      return json({ item: itemRow({ ...row, data: JSON.stringify(clean) }) });
    }
    if (method === "DELETE") {
      await run(db, `DELETE FROM items WHERE id = ?`, row.id);
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
  const bundle = await studentBundle(env.DB, student.id);
  return json({
    student: { name: student.name },
    ...bundle,
    ai: await aiAllowance(env, student.id),
  });
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
  return correctAndRespond(env, student, meta.last_row_id);
}

async function retryCorrection(env, student, journalId) {
  const row = await first(env.DB, `SELECT * FROM journals WHERE id = ? AND student_id = ?`, journalId, student.id);
  if (!row) throw new HttpError(404, "見つかりません。");
  if (row.correction) return json({ journal: journalRow(row), ai: await aiAllowance(env, student.id) });
  return correctAndRespond(env, student, journalId);
}

// The entry is already saved; correction failures come back as ai_error so the
// student keeps their text and can try again.
async function correctAndRespond(env, student, journalId) {
  const allowance = await aiAllowance(env, student.id);
  let aiError = null;
  if (allowance.left <= 0) {
    aiError = `今日の添削は ${allowance.limit} 回までです。日記は保存したので、先生が読めます。`;
  } else {
    const row = await first(env.DB, `SELECT * FROM journals WHERE id = ?`, journalId);
    try {
      const correction = await correctJournal(env, { body: row.body, topic: row.topic, note: student.note });
      await run(
        env.DB,
        `UPDATE journals SET correction = ?, corrected_at = ? WHERE id = ?`,
        JSON.stringify(correction), now(), journalId,
      );
    } catch (error) {
      if (!(error instanceof AiError)) throw error;
      aiError = error.message;
    }
  }
  const row = await first(env.DB, `SELECT * FROM journals WHERE id = ?`, journalId);
  return json({ journal: journalRow(row), ai: await aiAllowance(env, student.id), ai_error: aiError });
}

async function aiAllowance(env, studentId) {
  const limit = Number(env.DAILY_AI_LIMIT) || 3;
  const row = await first(
    env.DB,
    `SELECT COUNT(*) AS n FROM journals WHERE student_id = ? AND corrected_at >= ?`,
    studentId, startOfJapanDay(),
  );
  return { limit, left: Math.max(0, limit - row.n) };
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

async function requireTeacher(request, env) {
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
