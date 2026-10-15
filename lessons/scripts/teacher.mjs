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
// node scripts/teacher.mjs menu なおみ [--only 日記,発音課題,勉強時間 | --all]   (what the home screen shows)
// node scripts/teacher.mjs journals なおみ diaries.md [--dry]   (past diaries, no AI correction)
// node scripts/teacher.mjs pron-months なおみ [--set "1=Month 2" | --default]   (発音 months and their names)
// node scripts/teacher.mjs pron-done なおみ (--month 1 | --keys m1/01,m1/02) [--day 2026-09-30] [--dry | --undo]
//                                                                 (発音 finished before the app, as 完了 with no recording)
//
// A file of "-" is read from stdin.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { noteDayLabel, noteProblems } from "../public/notes/format.js";
import { MENUS, menuKey } from "../public/menus.js";
import { monthPhrases, pronMonths, studentMonths } from "../public/pron/phrases.js";

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
    else if (arg === "--all") options.all = true;
    else if (arg === "--dry") options.dry = true;
    else if (arg === "--default") options.default = true;
    else if (arg === "--undo") options.undo = true;
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

// Past diaries, one after another:
//   ## 2026-08-03          (also 2026/8/3 or 2026年8月3日)
//   お題：週末にしたこと   (optional, right under the date)
//   I went to the beach…
function parseJournals(text) {
  const entries = [];
  let current = null;
  for (const line of text.replace(/\r\n?/g, "\n").split("\n")) {
    const head = line.match(/^#{1,3}\s*(\d{4})\s*[-/.年]\s*(\d{1,2})\s*[-/.月]\s*(\d{1,2})\s*日?\s*$/);
    if (head) {
      const [, y, m, d] = head;
      current = { day: `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`, topic: "", lines: [] };
      entries.push(current);
      continue;
    }
    if (!current) {
      if (line.trim()) stop(`最初に「## 2026-08-03」のような日付の見出しが必要です（「${line.trim().slice(0, 30)}」の前）。`);
      continue;
    }
    const topic = !current.topic && !current.lines.some((l) => l.trim()) && line.match(/^\s*(お題|テーマ)\s*[：:]\s*(.+)$/);
    if (topic) current.topic = topic[2].trim();
    else current.lines.push(line);
  }
  return entries.map((e) => ({ day: e.day, topic: e.topic, body: e.lines.join("\n").trim() }));
}

// "Month 2（もとの Month 1）" for each month the student sees, then the ones they don't.
function pronLine(setting) {
  const mine = studentMonths(setting);
  const shown = mine.map((m) => `○ ${m.label}${m.label === `Month ${m.month}` ? "" : `（もとの Month ${m.month}）`}`);
  const hidden = pronMonths().filter((m) => !mine.some((x) => x.month === m)).map((m) => `× もとの Month ${m}`);
  return [...shown, ...hidden].join("　");
}

// "もとの Month 1：完了 30 / 30（録音 0・アプリの前に提出 30）" for each month.
function pronProgress(done = {}) {
  return pronMonths().map((m) => {
    const phrases = monthPhrases(m);
    const finished = phrases.filter((p) => done[p.key]).length;
    const sent = phrases.filter((p) => done[p.key]?.sent_at).length;
    const before = phrases.filter((p) => done[p.key]?.before_app).length;
    return `もとの Month ${m}：完了 ${finished} / ${phrases.length}（録音 ${sent}${before ? `・アプリの前に提出 ${before}` : ""}）`;
  }).join("\n");
}

// Japan's date, offset by whole days ("2026-10-14").
const japanDay = (offset = 0) => new Date(Date.now() + 9 * 3600e3 + offset * 86400e3).toISOString().slice(0, 10);

const menuLine = (hidden = []) =>
  MENUS.map((m) => `${hidden.includes(m.key) ? "×" : "○"} ${m.name}`).join("　");

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
    console.log(`\n## 生徒の画面に出すもの\n${menuLine(data.hidden)}`);
    console.log(`\n## 発音課題の Month\n${pronLine(data.pronMonths)}`);
    console.log(`\n## 発音課題の完了\n${pronProgress(data.pronDone)}`);
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

  async menu([name], options) {
    const student = await findStudent(name);
    if (!options.only && !options.all) {
      const { hidden } = await studentData(student);
      console.log(`${student.name}さんの画面（○ 出す・× 出さない）：\n${menuLine(hidden)}`);
      return;
    }
    let hidden = [];
    if (options.only) {
      const words = String(options.only).split(/[,、，]/).map((w) => w.trim()).filter(Boolean);
      const unknown = words.filter((w) => !menuKey(w));
      if (unknown.length) stop(`知らない項目です：${unknown.join("、")}（使えるのは ${MENUS.map((m) => m.name).join("、")}）`);
      const keep = words.map(menuKey);
      hidden = MENUS.map((m) => m.key).filter((key) => !keep.includes(key));
    }
    const result = await api(`/api/teacher/students/${student.id}/menus`, { method: "PUT", body: { hidden } });
    console.log(`${student.name}さんの画面を変えました（○ 出す・× 出さない）：\n${menuLine(result.hidden)}`);
  },

  async journals([name, file], options) {
    if (!file) stop("過去の日記のファイルを指定してください（- で標準入力）。");
    const entries = parseJournals(readText(file));
    if (!entries.length) stop("日記がありません。「## 2026-08-03」のような日付の見出しのあとに本文を書いてください。");
    const empty = entries.filter((e) => !e.body);
    if (empty.length) stop(`本文がない日があります：${empty.map((e) => e.day).join("、")}`);
    const student = await findStudent(name);
    const list = entries.map((e) => `${e.day}${e.topic ? `（お題：${e.topic}）` : ""} ${e.body.split("\n")[0].slice(0, 50)}`).join("\n");
    if (options.dry) {
      console.log(`${student.name}さんに入れる過去の日記 ${entries.length} 日分（${entries[0].day} 〜 ${entries[entries.length - 1].day}）。まだ入れていません：\n${list}`);
      return;
    }
    const { added, skipped } = await api(`/api/teacher/students/${student.id}/journals`, { method: "POST", body: { entries } });
    console.log(`${student.name}さんに過去の日記を ${added} 日分入れました（添削なし）${skipped ? `。同じものがすでにあった ${skipped} 日分は、とばしました` : ""}。`);
  },

  async "pron-done"([name], options) {
    let keys;
    if (options.month) {
      keys = monthPhrases(Number(options.month)).map((p) => p.key);
      if (!keys.length) stop(`Month ${options.month} の発音課題はありません（あるのは Month ${pronMonths().join("・")}）。`);
    } else if (options.keys) {
      keys = String(options.keys).split(/[,、，\s]+/).filter(Boolean);
    } else {
      stop("--month 1（その Month の全部の文）か、--keys m1/01,m1/02（文ごと）で、完了にする文を書いてください。");
    }
    const student = await findStudent(name);
    const day = options.day || japanDay(-1);
    const label = options.month ? `もとの Month ${options.month} の ${keys.length} 文` : `${keys.length} 文（${keys.join("、")}）`;
    if (options.dry) {
      const { pronDone } = await studentData(student);
      const already = keys.filter((k) => pronDone[k]).length;
      console.log(`${student.name}さんの発音 ${label} を、${day} 付けで完了にします（録音なし。生徒の画面には「先生に提出ずみ（アプリを使う前）」と出ます）。そのうち ${already} 文は、もう完了しています。まだ変えていません。`);
      return;
    }
    if (options.undo) {
      const { removed, kept } = await api(`/api/teacher/students/${student.id}/pron-done`, { method: "POST", body: { keys, undo: true } });
      console.log(`${student.name}さんの発音 ${label} のうち、${removed} 文の完了をもどしました${kept ? `（アプリで完了したか、もともと完了していない ${kept} 文は、そのまま）` : ""}。`);
      return;
    }
    const { added, already } = await api(`/api/teacher/students/${student.id}/pron-done`, { method: "POST", body: { keys, day } });
    console.log(`${student.name}さんの発音 ${label} を完了にしました：新しく ${added} 文（${day} 付け、録音なし。生徒の画面には「先生に提出ずみ（アプリを使う前）」）${already ? `、もう完了していた ${already} 文はそのまま` : ""}。`);
  },

  async "pron-months"([name], options) {
    const student = await findStudent(name);
    if (!options.set && !options.default) {
      const { pronMonths: setting } = await studentData(student);
      const list = pronMonths().map((m) => `もとの Month ${m}（${monthPhrases(m).length} 文：${monthPhrases(m)[0]?.en || ""} …）`).join("\n");
      console.log(`${student.name}さんの発音課題（○ 出す・× 出さない）：\n${pronLine(setting)}\n\nアプリにある Month：\n${list}`);
      return;
    }
    let months = [];
    if (options.set) {
      months = String(options.set).split(/[,、，]/).map((part) => part.trim()).filter(Boolean).map((part) => {
        const m = part.match(/^(\d+)\s*[=＝:：]\s*(.+)$/);
        if (!m) stop(`「${part}」が読めません。「1=Month 2」のように、もとの Month の番号と名前を書いてください。`);
        return { month: Number(m[1]), label: m[2].trim() };
      });
    }
    const result = await api(`/api/teacher/students/${student.id}/pron-months`, { method: "PUT", body: { months } });
    console.log(`${student.name}さんの発音課題を変えました（○ 出す・× 出さない）：\n${pronLine(result.months)}`);
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
