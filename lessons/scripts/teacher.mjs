#!/usr/bin/env node
// The teacher's per-student Claude chats use this to update one student's
// content in the live app (docs/student-chats.md). It calls the same API as
// the teacher page, with TEACHER_API_TOKEN as a Bearer token.
//
//   HINA_TEACHER_TOKEN  the same value as the Worker's TEACHER_API_TOKEN secret
//   HINA_APP_URL        the app (default https://hina-coaching.hinakajisaki.workers.dev)
//
// node scripts/teacher.mjs students
// node scripts/teacher.mjs show なおみ
// node scripts/teacher.mjs add なおみ vocab --week 2 words.txt     (単語 | 意味 | 例文)
// node scripts/teacher.mjs add なおみ pron lines.txt               (読む文 | コツ)
// node scripts/teacher.mjs add なおみ grammar lines.txt            (問題 | 答え | 選択肢 a / b | 解説)
// node scripts/teacher.mjs add なおみ topic lines.txt              (テーマ)
// node scripts/teacher.mjs edit-item なおみ 12 "borrow | 借りる | Can I borrow your pen?"
// node scripts/teacher.mjs delete-item なおみ 12
// node scripts/teacher.mjs note なおみ --day 2026-10-12 --title "When I 〜" memo.md [--publish]
// node scripts/teacher.mjs note-show なおみ 5
// node scripts/teacher.mjs note-update なおみ 5 [--day …] [--title …] [memo.md]
// node scripts/teacher.mjs publish なおみ 5 | unpublish なおみ 5 | delete-note なおみ 5
// node scripts/teacher.mjs plan なおみ [plan.md | --clear]      (今週の勉強範囲: see, set or clear)
//
// A file of "-" is read from stdin.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { noteDayLabel, noteProblems } from "../public/notes/format.js";

// Node's fetch only goes through the environment's proxy when asked to.
if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY) {
  const run = spawnSync(process.execPath, ["--disable-warning=UNDICI-EHPA", ...process.argv.slice(1)], {
    stdio: "inherit",
    env: { ...process.env, NODE_USE_ENV_PROXY: "1" },
  });
  process.exit(run.status ?? 1);
}

const BASE = (process.env.HINA_APP_URL || "https://hina-coaching.hinakajisaki.workers.dev").replace(/\/+$/, "");
const TOKEN = (process.env.HINA_TEACHER_TOKEN || "").trim();

// What each kind of line holds; the first `required` columns must be filled
// (the same as the teacher page).
const KINDS = {
  vocab: { name: "単語", columns: ["word", "meaning", "example"], required: 2 },
  pron: { name: "発音", columns: ["text", "tip"], required: 1 },
  grammar: { name: "文法", columns: ["question", "answer", "choices", "explanation"], required: 2 },
  topic: { name: "日記のテーマ", columns: ["prompt"], required: 1 },
};

class Stop extends Error {}
const stop = (message) => {
  throw new Stop(message);
};

async function api(path, { method = "GET", body } = {}) {
  if (!TOKEN) stop("HINA_TEACHER_TOKEN がありません。環境の設定に、TEACHER_API_TOKEN と同じ値で入れてください。");
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      headers: { Authorization: `Bearer ${TOKEN}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    stop(`アプリにつながりません（${BASE}）。環境の設定で、このドメインへのネットワークが許可されているか確認してください。\n${error.cause?.message || error.message}`);
  }
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    const mismatch = !data.error || data.error === "トークンがちがいます。";
    stop(`アプリに入れません：${data.error || ""}${mismatch ? ` HINA_TEACHER_TOKEN（${TOKEN.length}文字）が Worker の TEACHER_API_TOKEN と同じか確認してください。` : ""}`);
  }
  if (!response.ok) stop(data.error || `エラー ${response.status}`);
  return data;
}

// Options (--week 2, --publish) and the rest, in order.
function parseArgs(args) {
  const options = {};
  const rest = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--publish") options.publish = true;
    else if (arg === "--clear") options.clear = true;
    else if (arg.startsWith("--")) options[arg.slice(2)] = args[++i];
    else rest.push(arg);
  }
  return { options, rest };
}

const readText = (file) => (file === "-" ? readFileSync(0, "utf8") : readFileSync(file, "utf8"));

function parseLine(kind, line) {
  const spec = KINDS[kind];
  const fields = kind === "topic" ? [line.trim()] : line.split(/\t|\||｜/).map((f) => f.trim());
  const data = {};
  spec.columns.forEach((column, i) => {
    if (column === "choices") data.choices = (fields[i] || "").split(/\/|／/).map((c) => c.trim()).filter(Boolean);
    else data[column] = fields[i] || "";
  });
  const missing = spec.columns.slice(0, spec.required).find((column) => !data[column]);
  return { data, missing };
}

const itemLine = (kind, data) =>
  KINDS[kind].columns
    .map((column) => (column === "choices" ? (data.choices || []).join(" / ") : data[column] || ""))
    .join(" | ")
    .replace(/(\s\|\s*)+$/, "");

async function findStudent(name) {
  if (!name) stop("生徒の名前を入れてください。");
  const { students } = await api("/api/teacher/students");
  const exact = students.filter((s) => s.name === name);
  const found = exact.length ? exact : students.filter((s) => s.name.includes(name) || name.includes(s.name));
  if (found.length === 1) return found[0];
  const names = students.map((s) => s.name).join("、") || "（まだいません）";
  stop(found.length ? `「${name}」に合う生徒が ${found.length} 人います：${found.map((s) => s.name).join("、")}` : `「${name}」という生徒はいません。いる生徒：${names}`);
}

const studentData = (student) => api(`/api/teacher/students/${student.id}`);

function noteOf(data, id) {
  const note = data.notes.find((n) => n.id === Number(id));
  if (!note) stop(`${data.student.name}さんに、番号 ${id} の授業メモはありません。`);
  return note;
}

function noteSummary(note) {
  const status = note.published_at ? "公開中" : "下書き";
  return `[メモ ${note.id}] ${noteDayLabel(note.day)}（${note.day}）${note.title ? ` ${note.title}` : ""} ・ ${status} ・ 復習カード ${noteProblems(note.body).length}こ`;
}

const commands = {
  async students() {
    const { students } = await api("/api/teacher/students");
    if (!students.length) return console.log("まだ生徒がいません。");
    for (const s of students) console.log(`${s.name}（教材 ${s.item_count}）`);
  },

  async show([name]) {
    const data = await studentData(await findStudent(name));
    console.log(`# ${data.student.name}さん`);
    console.log(`\n## 今週の勉強範囲\n${data.plan ? data.plan.body : "（まだありません）"}`);
    for (const [kind, spec] of Object.entries(KINDS)) {
      const items = data.items.filter((i) => i.kind === kind);
      console.log(`\n## ${spec.name}（${items.length}）`);
      if (kind === "vocab") {
        const weeks = [...new Set(items.map((i) => i.data.week || "そのほか"))];
        for (const week of weeks) {
          console.log(week === "そのほか" ? "### そのほか（Week なし）" : `### Week ${week}`);
          for (const i of items.filter((i) => (i.data.week || "そのほか") === week)) console.log(`[${i.id}] ${itemLine(kind, i.data)}`);
        }
      } else {
        for (const i of items) console.log(`[${i.id}] ${itemLine(kind, i.data)}`);
      }
    }
    console.log(`\n## 授業メモ（${data.notes.length}）`);
    for (const note of data.notes) console.log(noteSummary(note));
  },

  async add([name, kind, file], options) {
    if (!KINDS[kind]) stop(`種類は ${Object.keys(KINDS).join(" / ")} のどれかです。`);
    if (!file) stop("1行に1つ書いたファイルを指定してください（- で標準入力）。");
    const student = await findStudent(name);
    const lines = readText(file).split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) stop("追加するものがありません。");
    const parsed = lines.map((line) => parseLine(kind, line));
    const bad = parsed.map((p, i) => (p.missing ? `${i + 1}行目：${lines[i]}` : null)).filter(Boolean);
    if (bad.length) stop(`足りない列がある行があります（${KINDS[kind].columns.slice(0, KINDS[kind].required).join("・")} は必須）\n${bad.join("\n")}`);
    let week = null;
    if (kind === "vocab") {
      week = Number(options.week);
      if (!Number.isInteger(week) || week < 1 || week > 24) stop("単語は --week 1〜24 で週を指定してください。");
    }
    const items = parsed.map((p) => (week ? { ...p.data, week } : p.data));
    const { added } = await api(`/api/teacher/students/${student.id}/items`, { method: "POST", body: { kind, items } });
    console.log(`${student.name}さんに${KINDS[kind].name}を ${added} こ追加しました${week ? `（Week ${week}）` : ""}。`);
  },

  async "edit-item"([name, id, line]) {
    const data = await studentData(await findStudent(name));
    const item = data.items.find((i) => i.id === Number(id));
    if (!item) stop(`${data.student.name}さんに、番号 ${id} の教材はありません。`);
    if (!line) stop(`新しい1行を入れてください。いまの行：${itemLine(item.kind, item.data)}`);
    const { data: next, missing } = parseLine(item.kind, line);
    if (missing) stop("足りない列があります。");
    const result = await api(`/api/teacher/items/${item.id}`, { method: "PUT", body: { data: next } });
    console.log(`直しました：[${item.id}] ${itemLine(item.kind, result.item.data)}`);
  },

  async "delete-item"([name, id]) {
    const data = await studentData(await findStudent(name));
    const item = data.items.find((i) => i.id === Number(id));
    if (!item) stop(`${data.student.name}さんに、番号 ${id} の教材はありません。`);
    await api(`/api/teacher/items/${item.id}`, { method: "DELETE" });
    console.log(`削除しました：[${item.id}] ${itemLine(item.kind, item.data)}`);
  },

  async note([name, file], options) {
    if (!options.day) stop("--day 2026-10-12 のように授業の日を入れてください。");
    if (!file) stop("メモの本文のファイルを指定してください（- で標準入力）。");
    const student = await findStudent(name);
    const body = { day: options.day, title: options.title || "", body: readText(file), publish: !!options.publish };
    const { note } = await api(`/api/teacher/students/${student.id}/notes`, { method: "POST", body });
    console.log(`${student.name}さんの授業メモを${note.published_at ? "公開" : "下書き保存"}しました：${noteSummary(note)}`);
  },

  async "note-show"([name, id]) {
    const note = noteOf(await studentData(await findStudent(name)), id);
    console.log(noteSummary(note));
    console.log(note.body);
  },

  async "note-update"([name, id, file], options) {
    const student = await findStudent(name);
    noteOf(await studentData(student), id);
    const body = {};
    if (options.day) body.day = options.day;
    if (options.title !== undefined) body.title = options.title;
    if (file) body.body = readText(file);
    if (!Object.keys(body).length) stop("直すもの（--day、--title、本文のファイル）を入れてください。");
    const { note } = await api(`/api/teacher/notes/${Number(id)}`, { method: "PUT", body });
    console.log(`直しました：${noteSummary(note)}`);
  },

  async publish([name, id]) {
    noteOf(await studentData(await findStudent(name)), id);
    const { note } = await api(`/api/teacher/notes/${Number(id)}`, { method: "PUT", body: { publish: true } });
    console.log(`公開しました：${noteSummary(note)}`);
  },

  async unpublish([name, id]) {
    noteOf(await studentData(await findStudent(name)), id);
    const { note } = await api(`/api/teacher/notes/${Number(id)}`, { method: "PUT", body: { publish: false } });
    console.log(`公開をやめました：${noteSummary(note)}`);
  },

  async plan([name, file], options) {
    const student = await findStudent(name);
    if (!file && !options.clear) {
      const { plan } = await studentData(student);
      console.log(plan ? `${student.name}さんの今週の勉強範囲：\n${plan.body}` : `${student.name}さんの今週の勉強範囲は、まだありません。`);
      return;
    }
    const body = options.clear ? "" : readText(file);
    const { plan } = await api(`/api/teacher/students/${student.id}/plan`, { method: "PUT", body: { body } });
    console.log(plan ? `${student.name}さんの今週の勉強範囲を更新しました：\n${plan.body}` : `${student.name}さんの今週の勉強範囲を消しました。`);
  },

  async "delete-note"([name, id]) {
    const note = noteOf(await studentData(await findStudent(name)), id);
    await api(`/api/teacher/notes/${note.id}`, { method: "DELETE" });
    console.log(`削除しました：${noteSummary(note)}`);
  },
};

const [command, ...args] = process.argv.slice(2);
if (!commands[command]) {
  console.log(`使い方（くわしくは docs/student-chats.md）：\n  ${Object.keys(commands).join("\n  ")}`);
  process.exit(command ? 1 : 0);
}
const { options, rest } = parseArgs(args);
try {
  await commands[command](rest, options);
} catch (error) {
  if (!(error instanceof Stop)) throw error;
  console.error(error.message);
  process.exit(1);
}
