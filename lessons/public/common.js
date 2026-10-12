// Helpers shared by the student app and the teacher page.

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function api(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(path, {
      method,
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "same-origin",
    });
  } catch {
    throw new ApiError(0, "インターネットにつながっていないようです。");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(response.status, data.error || "エラーが起きました。");
  return data;
}

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

export const icons = {
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>`,
  speaker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M18.5 5.5a9 9 0 010 13"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v3"/></svg>`,
};

export function toast(message) {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("role", "status");
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 2600);
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" });
}

export function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// Days since 1970 in Japan time; picks "today's" phrase and journal topic.
export function japanDayNumber(date = new Date()) {
  return Math.floor((date.getTime() + 9 * 3600e3) / 86400e3);
}

export function startOfJapanDay(date = new Date()) {
  return new Date(japanDayNumber(date) * 86400e3 - 9 * 3600e3);
}

// ---------- speech ----------

let englishVoice;
function pickVoice() {
  if (englishVoice !== undefined || !("speechSynthesis" in window)) return englishVoice;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return undefined;
  const english = voices.filter((v) => /^en[-_]/i.test(v.lang));
  englishVoice =
    english.find((v) => /en[-_]US/i.test(v.lang) && /samantha|google us|aria|jenny/i.test(v.name)) ||
    english.find((v) => /en[-_]US/i.test(v.lang)) ||
    english[0] ||
    null;
  return englishVoice;
}
if ("speechSynthesis" in window) speechSynthesis.addEventListener?.("voiceschanged", () => (englishVoice = undefined));

// Natural audio made by the server for the student's own words and
// sentences; the phone's built-in voice is the fallback.
const player = typeof Audio === "function" ? new Audio() : null;

// Playback speed, chosen by the student and remembered on their phone.
export const SPEEDS = [0.5, 0.75, 1];
const SPEED_KEY = "hina-lessons-speed";

export function getSpeed() {
  try {
    const saved = Number(localStorage.getItem(SPEED_KEY));
    return SPEEDS.includes(saved) ? saved : 1;
  } catch {
    return 1;
  }
}

export function setSpeed(speed) {
  try { localStorage.setItem(SPEED_KEY, String(speed)); } catch { /* private mode */ }
  if (player && !player.paused) player.playbackRate = speed;
}

// Reads text aloud at the chosen speed. `device` skips the server audio (for
// text that has none, like a corrected journal). Resolves once playback has
// started, or the fallback has.
export function speak(text, { device = false } = {}) {
  stopSpeaking();
  const speed = getSpeed();
  if (device || !player) {
    speakWithDevice(text, speed);
    return Promise.resolve();
  }
  player.src = `/api/speech?text=${encodeURIComponent(text)}`;
  player.defaultPlaybackRate = player.playbackRate = speed;
  return player.play().catch((error) => {
    // AbortError means another button was tapped before this one started.
    if (error?.name !== "AbortError") speakWithDevice(text, speed);
  });
}

export function stopSpeaking() {
  player?.pause();
  window.speechSynthesis?.cancel();
}

function speakWithDevice(text, speed) {
  if (!("speechSynthesis" in window)) {
    toast("このブラウザでは音声が出せません。");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  // The built-in voices run a little fast at 1.0.
  utterance.rate = speed === 1 ? 0.95 : speed;
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
}

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = !!Recognition;

// Listens for one English utterance. Resolves with the candidate transcripts.
export function listen({ onStart } = {}) {
  return new Promise((resolve, reject) => {
    const rec = new Recognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    let heard = [];
    rec.onstart = () => onStart?.(rec);
    rec.onresult = (event) => {
      heard = [...event.results[0]].map((alt) => alt.transcript);
    };
    rec.onerror = (event) => {
      const messages = {
        "not-allowed": "マイクが使えません。ブラウザの設定で、マイクを「許可」にしてください。",
        "service-not-allowed": "マイクが使えません。ブラウザの設定で、マイクを「許可」にしてください。",
        "no-speech": "声が聞こえませんでした。もう一度ためしてください。",
        "audio-capture": "マイクが見つかりません。",
        network: "インターネットにつながっていないようです。",
      };
      if (event.error === "aborted") return;
      reject(new Error(messages[event.error] || "うまく聞き取れませんでした。もう一度ためしてください。"));
    };
    rec.onend = () => resolve(heard);
    rec.start();
  });
}

// ---------- word comparison ----------

const CONTRACTIONS = {
  "i'm": "i am", "you're": "you are", "we're": "we are", "they're": "they are", "he's": "he is",
  "she's": "she is", "it's": "it is", "that's": "that is", "there's": "there is", "what's": "what is",
  "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have",
  "i'll": "i will", "you'll": "you will", "we'll": "we will", "they'll": "they will",
  "i'd": "i would", "you'd": "you would", "don't": "do not", "doesn't": "does not", "didn't": "did not",
  "can't": "can not", "cannot": "can not", "won't": "will not", "isn't": "is not", "aren't": "are not",
  "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not",
  "couldn't": "could not", "shouldn't": "should not", "wouldn't": "would not", "let's": "let us",
};

// Lowercase words without punctuation; contractions expanded so "I'm" matches "I am".
export function normalizeWords(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // café → cafe
    .replace(/[’‘]/g, "'")
    .split(/\s+/)
    .map((w) => w.replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, ""))
    .filter(Boolean)
    .flatMap((w) => (CONTRACTIONS[w] || w).split(" "));
}

// Longest common subsequence of two token lists, as index pairs.
function lcsPairs(a, b, same = (x, y) => x === y) {
  const n = a.length, m = b.length;
  const table = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      table[i][j] = same(a[i], b[j]) ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const pairs = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (same(a[i], b[j])) { pairs.push([i, j]); i++; j++; }
    else if (table[i + 1][j] >= table[i][j + 1]) i++;
    else j++;
  }
  return pairs;
}

// Marks each word of the target sentence as heard or missed. Returns
// { html, score } where score is the percentage of words heard.
export function compareSpeech(target, heard) {
  const words = String(target).split(/\s+/).filter(Boolean);
  // Map each display word to its normalized pieces so contractions line up.
  const pieces = [];
  words.forEach((word, index) => normalizeWords(word).forEach((p) => pieces.push({ p, index })));
  const heardWords = normalizeWords(heard);
  const matched = new Set(lcsPairs(pieces.map((x) => x.p), heardWords).map(([i]) => i));
  const okByWord = words.map(() => true);
  pieces.forEach((piece, i) => { if (!matched.has(i)) okByWord[piece.index] = false; });
  const total = pieces.length || 1;
  const score = Math.round((matched.size / total) * 100);
  const html = words
    .map((word, i) => {
      const counts = pieces.some((x) => x.index === i);
      if (!counts) return esc(word);
      return `<span class="${okByWord[i] ? "w-ok" : "w-miss"}">${esc(word)}</span>`;
    })
    .join(" ");
  return { html, score };
}

// Word-level diff between the student's text and the corrected text, as HTML
// with <del> for removed words and <ins> for added ones. Line breaks are kept.
export function diffHtml(before, after) {
  const tokenize = (text) => String(text).split(/(\n)|[ \t]+/).filter((t) => t !== undefined && t !== "");
  const a = tokenize(before);
  const b = tokenize(after);
  const strip = (w) => w.toLowerCase();
  const pairs = lcsPairs(a, b, (x, y) => strip(x) === strip(y));
  const out = [];
  let i = 0, j = 0;
  const word = (t) => (t === "\n" ? "<br>" : esc(t));
  const flush = (ai, bj) => {
    const removed = a.slice(i, ai).filter((t) => t !== "\n");
    const added = b.slice(j, bj);
    if (removed.length) out.push(`<del>${removed.map(esc).join(" ")}</del>`);
    if (added.length) {
      const text = added.map(word).join(" ").replace(/ ?<br> ?/g, "<br>");
      out.push(added.every((t) => t === "\n") ? text : `<ins>${text}</ins>`);
    }
  };
  for (const [ai, bj] of pairs) {
    flush(ai, bj);
    out.push(word(b[bj]));
    i = ai + 1;
    j = bj + 1;
  }
  flush(a.length, b.length);
  return out.join(" ").replace(/ ?<br> ?/g, "<br>");
}
