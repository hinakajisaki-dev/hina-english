// 会話リスニング: the text the teacher's chat writes, and the API from adding a
// talk to the student hearing it (npm test). The database is SQLite standing in
// for D1, and R2 a Map.
import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import worker from "../src/worker.js";
import { parseTalk, talkFile, talkSeconds } from "../public/listening/format.js";

const TALK = `# 仕事の打ち合わせ
声: Sara=mia

## あいさつ
Sara: Hi Ken, thanks for coming. | ケン、来てくれてありがとう。
Ken: Sure. [Good to see you]. | うん。会えてうれしいよ。

## 予定を決める
Ken: When are you [free] next week?
Sara：How about Tuesday? ｜ 火曜日はどう？
`;

test("the text: a title, parts, and who says what in which voice", () => {
  const { talk, errors } = parseTalk(TALK);
  assert.deepEqual(errors, []);
  assert.equal(talk.title, "仕事の打ち合わせ");
  assert.deepEqual(talk.parts.map((p) => p.title), ["あいさつ", "予定を決める"]);
  assert.deepEqual(talk.parts[0].lines[0], { name: "Sara", who: "mia", en: "Hi Ken, thanks for coming.", ja: "ケン、来てくれてありがとう。" });
  assert.deepEqual(talk.parts[0].lines[1], { name: "Ken", who: "ken", en: "Sure. [Good to see you].", ja: "うん。会えてうれしいよ。" });
  assert.equal(talk.parts[1].lines[0].ja, "");
  assert.equal(talk.parts[1].lines[1].ja, "火曜日はどう？");
  // Written back, it reads the same.
  assert.deepEqual(parseTalk(talkFile(talk)).talk, talk);
  assert.ok(talkSeconds(talk) > 4);
});

test("the text: mistakes say which line", () => {
  const { errors } = parseTalk("# A\n## 1\nAnna: Hello.\nThis has no name\n声: Bob=bob");
  assert.match(errors[0], /^3行目：「Anna」の声がありません/);
  assert.match(errors[1], /^4行目：/);
  assert.match(errors[2], /^5行目：「Bob=bob」が読めません/);
  assert.match(parseTalk("Mia: Hi.").errors[0], /タイトル/);
});

// ---------- the API ----------

function d1() {
  const db = new DatabaseSync(":memory:");
  db.exec("PRAGMA foreign_keys = ON");
  const statement = (sql, params = []) => ({
    bind: (...values) => statement(sql, values.map((v) => (v === undefined ? null : v))),
    all: async () => ({ results: db.prepare(sql).all(...params) }),
    first: async () => db.prepare(sql).get(...params) ?? null,
    run: async () => {
      const result = db.prepare(sql).run(...params);
      return { meta: { last_row_id: Number(result.lastInsertRowid), changes: result.changes } };
    },
  });
  return { prepare: (sql) => statement(sql), batch: async (list) => Promise.all(list.map((s) => s.run())), raw: db };
}

function r2() {
  const files = new Map();
  return {
    files,
    async get(key) { return files.has(key) ? { body: files.get(key), size: files.get(key).length } : null; },
    async put(key, value) { files.set(key, new Uint8Array(value)); },
    async delete(keys) { for (const key of [].concat(keys)) files.delete(key); },
    async list({ prefix }) { return { objects: [...files.keys()].filter((k) => k.startsWith(prefix)).map((key) => ({ key })), truncated: false }; },
  };
}

// (Workers have this; Node doesn't.)
crypto.subtle.timingSafeEqual ??= (a, b) => Buffer.from(a).equals(Buffer.from(b));

const TOKEN = "t".repeat(40);
const env = { DB: d1(), FILES: r2(), TEACHER_API_TOKEN: TOKEN };
const now = new Date().toISOString();
env.DB.raw.exec(`CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, code TEXT NOT NULL UNIQUE, note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL)`);
env.DB.raw.prepare(`INSERT INTO students (name, code, created_at) VALUES ('なおみ', 'NAOMI234', ?), ('けいじ', 'KEIJI234', ?)`).run(now, now);

async function call(path, { method = "GET", body, as = "teacher", raw } = {}) {
  const headers = as === "teacher" ? { Authorization: `Bearer ${TOKEN}` } : { Cookie: `hl_student=${as}` };
  if (body) headers["Content-Type"] = "application/json";
  const response = await worker.fetch(new Request(`https://app.test${path}`, {
    method, headers, body: raw ?? (body ? JSON.stringify(body) : undefined),
  }), env, { waitUntil() {} });
  const type = response.headers.get("Content-Type") || "";
  return { status: response.status, data: type.includes("json") ? await response.json() : new Uint8Array(await response.arrayBuffer()) };
}

// An "MP3" of n bytes (it only has to start like one).
const mp3 = (n, fill = 1) => { const a = new Uint8Array(n).fill(fill); a.set([0x49, 0x44, 0x33]); return a; };

test("from the teacher's talk to the student hearing it", async () => {
  const { talk } = parseTalk(TALK);
  const added = await call("/api/teacher/students/1/listening", { method: "POST", body: { talk } });
  assert.equal(added.status, 200, JSON.stringify(added.data));
  const id = added.data.talk.id;
  assert.equal(added.data.talk.voiced, 0);

  // A voice for the first line: in R2 under the student and the talk; D1 keeps its key and length.
  const voiced = await call(`/api/teacher/listening/${id}/audio?part=0&line=0`, { method: "PUT", raw: mp3(32000) });
  assert.equal(voiced.status, 200, JSON.stringify(voiced.data));
  assert.match(voiced.data.key, new RegExp(`^listen/1/${id}/mia-[0-9a-f]{32}\\.mp3$`));
  assert.equal(voiced.data.sec, 2);
  assert.ok(env.FILES.files.has(voiced.data.key));
  const row = env.DB.raw.prepare(`SELECT body FROM listen_talks WHERE id = ?`).get(id);
  assert.equal(JSON.parse(row.body).parts[0].lines[0].audio, voiced.data.key);
  assert.doesNotMatch(row.body, /ID3/);
  assert.equal((await call(`/api/teacher/listening/${id}/audio?part=0&line=0`, { method: "PUT", raw: new Uint8Array(10) })).status, 400);

  // The student: the list on /api/me, then the talk (without R2 keys) and the line's voice.
  const me = await call("/api/me", { as: "NAOMI234" });
  assert.deepEqual(me.data.listening.map((t) => [t.id, t.title, t.parts, t.lines, t.voiced, t.plays]), [[id, "仕事の打ち合わせ", 2, 4, 1, 0]]);
  const opened = await call(`/api/listening/${id}`, { as: "NAOMI234" });
  assert.equal(opened.data.talk.parts[0].lines[0].sec, 2);
  assert.doesNotMatch(JSON.stringify(opened.data), /listen\//);
  const audio = await call(`/api/listening/${id}/audio/0/0`, { as: "NAOMI234" });
  assert.equal(audio.data.length, 32000);
  assert.equal((await call(`/api/listening/${id}/audio/0/9`, { as: "NAOMI234" })).status, 404);

  // Another student can't open it.
  assert.equal((await call(`/api/listening/${id}`, { as: "KEIJI234" })).status, 404);
  assert.equal((await call(`/api/listening/${id}/audio/0/0`, { as: "KEIJI234" })).status, 404);
  assert.deepEqual((await call("/api/me", { as: "KEIJI234" })).data.listening, []);

  // Heard all the way through, twice.
  await call(`/api/listening/${id}/played`, { method: "POST", as: "NAOMI234" });
  assert.equal((await call(`/api/listening/${id}/played`, { method: "POST", as: "NAOMI234" })).data.plays, 2);

  // A part heard (each line to the end) gets its ✓, once.
  assert.deepEqual((await call(`/api/listening/${id}/heard`, { method: "POST", body: { part: 1 }, as: "NAOMI234" })).data.done, [1]);
  assert.deepEqual((await call(`/api/listening/${id}/heard`, { method: "POST", body: { part: 1 }, as: "NAOMI234" })).data.done, [1]);
  assert.equal((await call(`/api/listening/${id}/heard`, { method: "POST", body: { part: 5 }, as: "NAOMI234" })).status, 400);
  assert.equal((await call(`/api/listening/${id}/heard`, { method: "POST", body: { part: 0 }, as: "KEIJI234" })).status, 404);
  const listed = (await call("/api/me", { as: "NAOMI234" })).data.listening[0];
  assert.deepEqual([listed.done, listed.part_titles], [[1], ["あいさつ", "予定を決める"]]);

  // Changed: a line still the same keeps its voice; the voice of a changed line is deleted.
  await call(`/api/teacher/listening/${id}/audio?part=0&line=1`, { method: "PUT", raw: mp3(16000, 2) });
  const keyOf = async (p, l) => (await call(`/api/teacher/listening/${id}`)).data.talk.parts[p].lines[l].audio;
  const [kept, changed] = [await keyOf(0, 0), await keyOf(0, 1)];
  const edited = parseTalk(TALK.replace("[Good to see you]", "[Nice to see you]")).talk;
  const updated = await call(`/api/teacher/listening/${id}`, { method: "PUT", body: { talk: edited } });
  assert.equal(updated.data.talk.voiced, 1);
  assert.equal(updated.data.talk.plays, 2);
  assert.deepEqual(updated.data.talk.done, [1]);
  // With fewer parts, a ✓ of a part that is gone isn't counted.
  const shorter = await call(`/api/teacher/listening/${id}`, { method: "PUT", body: { talk: { ...edited, parts: edited.parts.slice(0, 1) } } });
  assert.deepEqual([shorter.data.talk.parts.length, shorter.data.talk.done], [1, []]);
  await call(`/api/teacher/listening/${id}`, { method: "PUT", body: { talk: edited } });
  assert.equal(await keyOf(0, 0), kept);
  assert.equal(await keyOf(0, 1), undefined);
  assert.ok(env.FILES.files.has(kept));
  assert.ok(!env.FILES.files.has(changed));

  // A talk that doesn't make sense is refused.
  assert.equal((await call("/api/teacher/students/1/listening", { method: "POST", body: { talk: { title: "x", parts: [] } } })).status, 400);
  assert.equal((await call("/api/teacher/students/1/listening", { method: "POST", body: { talk: { title: "x", parts: [{ lines: [{ name: "A", who: "bob", en: "Hi" }] }] } } })).status, 400);

  // Deleted, with its voices.
  assert.equal((await call(`/api/teacher/listening/${id}`, { method: "DELETE" })).status, 200);
  assert.equal([...env.FILES.files.keys()].filter((k) => k.startsWith(`listen/1/${id}/`)).length, 0);
  assert.deepEqual((await call("/api/me", { as: "NAOMI234" })).data.listening, []);
});
