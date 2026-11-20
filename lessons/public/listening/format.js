// 会話リスニング: a long conversation for one student (3〜10 minutes), cut into
// parts. The student hears it all the way through (全部きく), one part at a time
// or one line at a time, again and again (くり返し).
//
// The teacher's chat writes it as text (scripts/teacher.mjs listening):
//
//   # 仕事の打ち合わせ
//   声: Sara=mia, Mr. Lee=ken        (optional: who speaks in which voice)
//
//   ## あいさつ
//   Mia: Hi Ken, thanks for coming. | ケン、来てくれてありがとう。
//   Ken: Sure. [Good to see you]. | うん。会えてうれしいよ。
//
// "## " starts a part. A line is "Name: English | Japanese" (the Japanese may
// be left out). [ ] marks a phrase to notice (red on the student's screen).
// Mia, Ken and Tom need no 声: line. The text is kept in D1 (listen_talks)
// and the voices in R2 (listen/<student>/<talk>/…, made with ElevenLabs).

// The voices (scripts/teacher.mjs has their ElevenLabs ids), and the names
// that need no 声: line.
export const LISTEN_VOICES = { mia: "Mia", ken: "Ken", tom: "Tom" };

export const LIMITS = { title: 80, partTitle: 60, name: 30, en: 500, ja: 300, parts: 30, lines: 400 };

// What is said, without the [ ] marks; and the text split on them (odd parts marked).
export const lineText = (en) => String(en).replace(/\[([^\]]*)\]/g, "$1").replace(/\s+/g, " ").trim();
export const lineParts = (en) => String(en).split(/\[([^\]]*)\]/);

const VOICE_LINE = /^(?:声|voices?)\s*[:：]\s*(.*)$/i;
const SAY_LINE = /^([^:：|｜]{1,30}?)\s*[:：]\s*(.+)$/;

// The text → { talk: { title, parts: [{ title, lines: [{ name, who, en, ja }] }] }, errors: ["3行目：…"] }.
export function parseTalk(text) {
  const errors = [];
  const voices = Object.fromEntries(Object.entries(LISTEN_VOICES).map(([who, name]) => [name.toLowerCase(), who]));
  const talk = { title: "", parts: [] };
  const lines = String(text ?? "").replace(/\r\n?/g, "\n").split("\n");
  lines.forEach((raw, i) => {
    const line = raw.trim();
    const at = `${i + 1}行目`;
    if (!line || line.startsWith("<!--")) return;
    if (/^#\s/.test(line)) {
      if (talk.title) errors.push(`${at}：タイトル（# ）は1つだけにしてください。`);
      else talk.title = line.slice(2).trim();
      return;
    }
    if (/^##(\s|$)/.test(line)) {
      talk.parts.push({ title: line.slice(2).trim(), lines: [] });
      return;
    }
    const voice = line.match(VOICE_LINE);
    if (voice) {
      for (const pair of voice[1].split(/[,、，]/).map((p) => p.trim()).filter(Boolean)) {
        const [name, who] = pair.split(/\s*[=＝]\s*/);
        if (!name || !LISTEN_VOICES[who?.toLowerCase()]) {
          errors.push(`${at}：「${pair}」が読めません（名前=声。声は ${Object.keys(LISTEN_VOICES).join("・")}）。`);
        } else {
          voices[name.toLowerCase()] = who.toLowerCase();
        }
      }
      return;
    }
    const say = line.match(SAY_LINE);
    if (!say) {
      errors.push(`${at}：「名前: 英語 | 日本語」の形ではありません：${line.slice(0, 40)}`);
      return;
    }
    const name = say[1].trim();
    const who = voices[name.toLowerCase()];
    if (!who) {
      errors.push(`${at}：「${name}」の声がありません（「声: ${name}=mia」のように書いてください）。`);
      return;
    }
    const [en, ...ja] = say[2].split(/\s*[|｜]\s*/);
    if (!talk.parts.length) talk.parts.push({ title: "", lines: [] });
    talk.parts.at(-1).lines.push({ name, who, en: en.trim(), ja: ja.join(" ").trim() });
  });
  const problem = checkTalk(talk);
  if (problem) errors.push(problem);
  return { talk, errors };
}

// Back to the text (to see or change a talk).
export function talkFile(talk) {
  const names = new Map();
  for (const part of talk.parts) for (const line of part.lines) names.set(line.name, line.who);
  const extra = [...names].filter(([name, who]) => LISTEN_VOICES[who] !== name);
  return [
    `# ${talk.title}`,
    ...(extra.length ? [`声: ${extra.map(([name, who]) => `${name}=${who}`).join(", ")}`] : []),
    ...talk.parts.flatMap((part) => [
      "",
      ...(part.title || talk.parts.length > 1 ? [`## ${part.title}`] : []),
      ...part.lines.map((line) => `${line.name}: ${line.en}${line.ja ? ` | ${line.ja}` : ""}`),
    ]),
  ].join("\n") + "\n";
}

// What is wrong with a talk, or null. (The server checks what the teacher sends.)
export function checkTalk(talk) {
  if (!talk || typeof talk !== "object") return "会話が読めませんでした。";
  if (!String(talk.title || "").trim()) return "タイトル（# 〜）を入れてください。";
  if (String(talk.title).length > LIMITS.title) return `タイトルが長すぎます（${LIMITS.title} 文字まで）。`;
  const parts = Array.isArray(talk.parts) ? talk.parts.filter((p) => p?.lines?.length) : [];
  if (!parts.length) return "会話の文がありません。";
  if (parts.length > LIMITS.parts) return `パートが多すぎます（${LIMITS.parts} こまで）。`;
  const count = parts.reduce((n, p) => n + p.lines.length, 0);
  if (count > LIMITS.lines) return `文が多すぎます（${LIMITS.lines} 文まで）。`;
  for (const [p, part] of parts.entries()) {
    if (String(part.title || "").length > LIMITS.partTitle) return `Part ${p + 1} の名前が長すぎます（${LIMITS.partTitle} 文字まで）。`;
    for (const line of part.lines) {
      if (!LISTEN_VOICES[line?.who]) return `Part ${p + 1}：声「${line?.who}」はありません。`;
      if (!String(line.name || "").trim() || String(line.name).length > LIMITS.name) return `Part ${p + 1}：名前がないか、長すぎます。`;
      if (!lineText(line.en || "")) return `Part ${p + 1}：${line.name} の英語がありません。`;
      if (String(line.en).length > LIMITS.en) return `Part ${p + 1}：英語が長すぎます（1文 ${LIMITS.en} 文字まで）：${String(line.en).slice(0, 30)}…`;
      if (String(line.ja || "").length > LIMITS.ja) return `Part ${p + 1}：日本語が長すぎます（${LIMITS.ja} 文字まで）。`;
    }
  }
  return null;
}

// Only the fields a talk keeps (after checkTalk). A line keeps its audio
// (the R2 key and its seconds) when the old talk has the same line in the same voice.
export function cleanTalk(talk, old = null) {
  const audio = new Map();
  for (const part of old?.parts || []) {
    for (const line of part.lines) if (line.audio) audio.set(`${line.who}|${lineText(line.en)}`, { audio: line.audio, sec: line.sec });
  }
  return {
    title: String(talk.title).trim(),
    parts: talk.parts.filter((p) => p.lines?.length).map((part) => ({
      title: String(part.title || "").trim(),
      lines: part.lines.map((line) => ({
        name: String(line.name).trim(),
        who: line.who,
        en: String(line.en).trim(),
        ja: String(line.ja || "").trim(),
        ...(audio.get(`${line.who}|${lineText(line.en)}`) || {}),
      })),
    })),
  };
}

// Every line in order, with where it is: [{ ...line, part, line, index }] (index: in the whole talk).
export const talkLines = (talk) =>
  talk.parts.flatMap((part, p) => part.lines.map((line, l) => ({ ...line, part: p, line: l }))).map((line, index) => ({ ...line, index }));

// About how long a line takes: its audio's length, or ~2.6 words a second.
export const lineSeconds = (line) => line.sec || Math.max(1, lineText(line.en).split(" ").length / 2.6);
// The whole talk, with the pause between lines (common.js speakLines).
export const talkSeconds = (talk) => talkLines(talk).reduce((s, line) => s + lineSeconds(line) + 0.45, 0);

// "約4分" (at least 1).
export const minutesLabel = (seconds) => `約${Math.max(1, Math.round(seconds / 60))}分`;
// "1:24"
export const clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

// The R2 key of a line's voice: listen/<student>/<talk>/<who>-<hash of the text>.mp3.
export async function lineAudioKey(studentId, talkId, who, en) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${who}|${lineText(en)}`));
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `listen/${studentId}/${talkId}/${who}-${hex.slice(0, 32)}.mp3`;
}

// The student's list: { id, title, parts, lines, seconds, plays, played_at }.
export const talkSummary = (row, talk) => ({
  id: row.id,
  title: talk.title,
  parts: talk.parts.length,
  lines: talkLines(talk).length,
  seconds: Math.round(talkSeconds(talk)),
  voiced: talkLines(talk).filter((l) => l.audio).length,
  plays: row.plays,
  played_at: row.played_at,
  created_at: row.created_at,
});
