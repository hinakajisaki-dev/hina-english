// What the API does when the database fails (npm test).
// The database is a stand-in that fails every call with the given message.
import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";
import { recordError } from "../src/errors.js";
import { isDbBusy } from "../src/db.js";

const READ_LIMIT = "D1_ERROR: Your account has exceeded D1's free tier daily row read limit.";
const TOKEN = "t".repeat(40);

function failingDb(message) {
  const fail = async () => { throw new Error(message); };
  const statement = { bind: () => statement, first: fail, all: fail, run: fail };
  return { prepare: () => statement, batch: fail };
}

function call(path, { db, headers = {}, ctx } = {}) {
  const env = { DB: db, TEACHER_API_TOKEN: TOKEN, TEACHER_PASSWORD: "pw" };
  return worker.fetch(new Request(`https://app.test${path}`, { headers }), env, ctx);
}

// Each call logs the failure on purpose; the test output stays readable without it.
function quietly(fn) {
  return async () => {
    const original = console.error;
    const logged = [];
    console.error = (...args) => logged.push(args);
    try {
      await fn(logged);
    } finally {
      console.error = original;
    }
  };
}

test("a student's request answers 503 'busy', not 'sign in again'", quietly(async () => {
  const response = await call("/api/me", { db: failingDb(READ_LIMIT), headers: { Cookie: "hl_student=ABCD1234" } });
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("Set-Cookie"), null);
  const { error } = await response.json();
  assert.match(error, /混み合っています/);
  assert.doesNotMatch(error, /ログイン/);
}));

test("the teacher's requests answer 503 'busy' too", quietly(async () => {
  for (const path of ["/api/teacher/students", "/api/teacher/errors", "/api/teacher/students/3"]) {
    const response = await call(path, { db: failingDb(READ_LIMIT), headers: { Authorization: `Bearer ${TOKEN}` } });
    assert.equal(response.status, 503, path);
    assert.match((await response.json()).error, /混み合っています/);
  }
}));

test("signing in with a code answers 503 'busy', not 'code not found'", quietly(async () => {
  const env = { DB: failingDb(READ_LIMIT) };
  const request = new Request("https://app.test/api/login", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: "ABCD1234" }),
  });
  const response = await worker.fetch(request, env);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /混み合っています/);
}));

test("a mistake in a query is still a 500 server error", quietly(async () => {
  const db = failingDb("D1_ERROR: no such column: nope: SQLITE_ERROR");
  const response = await call("/api/me", { db, headers: { Cookie: "hl_student=ABCD1234" } });
  assert.equal(response.status, 500);
  assert.match((await response.json()).error, /サーバーでエラー/);
}));

test("no cookie (or an unknown one) is still 'sign in again' (401)", quietly(async () => {
  const none = async () => null;
  const statement = { bind: () => statement, first: none, all: async () => ({ results: [] }), run: none };
  const db = { prepare: () => statement, batch: async () => [] };
  assert.equal((await call("/api/me", { db })).status, 401);
  const response = await call("/api/me", { db, headers: { Cookie: "hl_student=ABCD1234" } });
  assert.equal(response.status, 401);
}));

test("the answer doesn't wait for the error to be kept", quietly(async (logged) => {
  const kept = [];
  const response = await call("/api/me", {
    db: failingDb(READ_LIMIT), headers: { Cookie: "hl_student=ABCD1234" }, ctx: { waitUntil: (p) => kept.push(p) },
  });
  assert.equal(response.status, 503);
  assert.equal(kept.length, 1);
  await kept[0];
  assert.ok(logged.some(([first]) => first === "could not record the error"));
}));

test("keeping an error never throws, and the log says what both problems were", quietly(async (logged) => {
  await recordError(failingDb(READ_LIMIT), { kind: "server", message: "first problem", detail: "" });
  const line = logged.find(([first]) => first === "could not record the error");
  assert.ok(line);
  assert.equal(line[1].message, "first problem");
  assert.equal(line[1].because, READ_LIMIT);
}));

test("which database messages count as 'busy'", () => {
  for (const message of [
    READ_LIMIT,
    "D1 DB is overloaded. Too many requests queued.",
    "Network connection lost.",
    "D1 DB storage operation exceeded timeout which caused object to be reset.",
    "Cannot resolve D1 DB due to transient issue on remote node.",
    "D1 DB reset because its code was updated.",
  ]) assert.ok(isDbBusy(new Error(message)), message);
  for (const message of ["D1_ERROR: no such table: x: SQLITE_ERROR", "UNIQUE constraint failed: students.code", "x is not a function"]) {
    assert.ok(!isDbBusy(new Error(message)), message);
  }
});
