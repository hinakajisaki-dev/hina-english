// Turns a スモールトーク week (smalltalk/weekN.md, the course material) into
// public/phrases/weekN.js, checking that every phrase has its 和訳, 塊 and 解説.
//
//   node scripts/smalltalk-to-js.mjs path/to/week2.md 2 "smalltalk/week2.md" > public/phrases/week2.js
//
// then add the week to BOOKS in public/phrases/book.js. The teacher's changes on
// top of the md (scene names, 塊, which phrases are 返答例) are kept in
// smalltalk-overrides.json and applied here, so converting again keeps them.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const [file, weekArg, sourceNote] = process.argv.slice(2);
const week = Number(weekArg);
const lines = fs.readFileSync(file, "utf8").split("\n");
const title = lines[0].replace(/^#\s*/, "").replace(/（教材の中身）/, "").trim();
const theme = (lines.find((l) => l.includes("テーマは")) || "").match(/テーマは「(.+?)」/)?.[1] || "";
const phrases = [];
let day = null, scene = "", cur = null, drill = null;
for (const raw of lines) {
  const line = raw.replace(/\s+$/, "");
  let m;
  if ((m = line.match(/^## Day (\d+)/))) { day = Number(m[1]); continue; }
  if ((m = line.match(/^### (.+)$/))) { scene = m[1].replace(/（つづき）$/, "").trim(); continue; }
  if ((m = line.match(/^#### (\d+)\. (.+)$/))) {
    cur = { id: String(m[1]).padStart(2, "0"), n: Number(m[1]), day, scene, en: m[2].trim(), ja: "", chunk: "", note: "", drills: [] };
    phrases.push(cur); drill = null; continue;
  }
  if (!cur) continue;
  if ((m = line.match(/^- 和訳：(.+)$/))) cur.ja = m[1].trim();
  else if ((m = line.match(/^- 塊：(.+)$/))) cur.chunk = m[1].trim();
  else if ((m = line.match(/^- 解説：(.+)$/))) cur.note = m[1].trim();
  else if (/^- 瞬間英作文：なし/.test(line)) drill = null;
  else if ((m = line.match(/^- 瞬間英作文[①②③]：(.+?) → (.+)$/))) { drill = { ja: m[1].trim(), answers: [m[2].trim()] }; cur.drills.push(drill); }
  else if ((m = line.match(/^ {2}- ヒント：(.+)$/))) { if (!drill) throw new Error(`hint without drill at #${cur.n}`); drill.hint = m[1].trim(); }
  else if (line.startsWith("- ")) throw new Error(`unknown line at #${cur.n}: ${line}`);
}
// the teacher's changes
const overridesFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "smalltalk-overrides.json");
const overrides = JSON.parse(fs.readFileSync(overridesFile, "utf8"))[week] || {};
const byNumber = new Map(phrases.map((p) => [p.n, p]));
const need = (n, what) => byNumber.get(Number(n)) || (() => { throw new Error(`${what}: no phrase #${n} in week ${week}`); })();
for (const p of phrases) if (overrides.scenes?.[p.scene]) p.scene = overrides.scenes[p.scene];
for (const [n, chunk] of Object.entries(overrides.chunks || {})) need(n, "chunks").chunk = chunk;
for (const [n, to] of Object.entries(overrides.replies || {})) need(n, "replies").replyTo = need(to, "replies").id;

// checks
// Numbers run on from week to week (Week 2 starts at #50); they must not skip.
phrases.forEach((p, i) => {
  if (p.n !== phrases[0].n + i) throw new Error(`numbering at ${p.n}`);
  for (const k of ["day", "scene", "en", "ja", "chunk", "note"]) if (!p[k]) throw new Error(`#${p.n} has no ${k}`);
});
const q = (v) => JSON.stringify(v);
const out = [];
const dayCount = new Set(phrases.map((p) => p.day)).size;
out.push(`// ${title}: ${theme ? `「${theme}」` : ""}${phrases.length} フレーズ、${dayCount} 日分.`);
out.push(`// From ${sourceNote}. Every student gets the same phrases.`);
out.push(`// Fields as in public/phrases/book.js. Keep the ids: students' フレーズ復習 lists use them.`);
out.push(`// Made by scripts/smalltalk-to-js.mjs (with the teacher's changes in smalltalk-overrides.json): don't edit by hand.`);
out.push("");
out.push(`export const WEEK${week} = {`);
out.push(`  week: ${week},`);
out.push(`  title: ${q(theme)},`);
out.push(`  phrases: [`);
let lastDay = null;
for (const p of phrases) {
  if (p.day !== lastDay) { out.push(`    // ---------- Day ${p.day} ----------`); lastDay = p.day; }
  out.push(`    {`);
  out.push(`      id: ${q(p.id)}, day: ${p.day}, scene: ${q(p.scene)},${p.replyTo ? ` replyTo: ${q(p.replyTo)},` : ""}`);
  out.push(`      en: ${q(p.en)},`);
  out.push(`      ja: ${q(p.ja)},`);
  out.push(`      chunk: ${q(p.chunk)},`);
  out.push(`      note: ${q(p.note)},`);
  if (p.drills.length) {
    out.push(`      drills: [`);
    for (const d of p.drills) out.push(`        { ja: ${q(d.ja)}, answers: ${q(d.answers)}${d.hint ? `, hint: ${q(d.hint)}` : ""} },`);
    out.push(`      ],`);
  } else out.push(`      drills: [],`);
  out.push(`    },`);
}
out.push(`  ],`);
out.push(`};`);
process.stdout.write(out.join("\n") + "\n");
const byDay = {};
for (const p of phrases) byDay[p.day] = (byDay[p.day] || 0) + 1 + p.drills.length;
console.error(`phrases ${phrases.length}, drills ${phrases.reduce((n, p) => n + p.drills.length, 0)}, hints ${phrases.flatMap((p) => p.drills).filter((d) => d.hint).length}, per day (phrases+drills) ${JSON.stringify(byDay)}, no drills: ${phrases.filter((p) => !p.drills.length).map((p) => p.n)}`);
