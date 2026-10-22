// Helpers shared by the student app and the teacher page.
import { isSpelling } from "./journal/spelling.js";

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

// Sends this page's script errors to the error log (src/errors.js), for the
// teacher's error chat: each message once, at most 5 per page. A failed API
// call (ApiError) is not sent; the server keeps its own. Returns the sender,
// for an error the page catches itself.
export function watchErrors(endpoint) {
  const sent = new Set();
  const send = (error, where = {}) => {
    if (error instanceof ApiError) return;
    const message = String(where.message || error?.message || error || "").slice(0, 300);
    if (!message || sent.has(message) || sent.size >= 5) return;
    sent.add(message);
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      keepalive: true,
      body: JSON.stringify({
        message,
        stack: String(error?.stack || "").slice(0, 2000),
        source: where.source || "",
        line: where.line || 0,
        column: where.column || 0,
        page: location.pathname + location.hash,
      }),
    }).catch(() => {});
  };
  window.addEventListener("error", (event) => {
    // Other sites' scripts (extensions, translation) show up as "Script error." with no file.
    if (!event.filename?.startsWith(location.origin)) return;
    send(event.error, {
      message: event.message,
      source: event.filename.slice(location.origin.length),
      line: event.lineno,
      column: event.colno,
    });
  });
  window.addEventListener("unhandledrejection", (event) => send(event.reason));
  return send;
}

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

export const icons = {
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>`,
  speaker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M18.5 5.5a9 9 0 010 13"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v3"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 9.5V20h5v-6h4v6h5V9.5"/></svg>`,
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

// Reads text aloud at the chosen speed: the teacher's recording when there is
// one (src), otherwise audio made by the server; the phone's own voice is the
// fallback. `device` skips straight to it. Resolves once playback has started.
export function speak(text, { device = false, src = null } = {}) {
  stopSpeaking();
  const speed = getSpeed();
  if (device || !player) {
    speakWithDevice(text, speed);
    return Promise.resolve();
  }
  player.src = src || `/api/speech?text=${encodeURIComponent(text)}`;
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

// ---------- word comparison ----------
// For the journal diff.

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

// Word-level diff between the student's text and the corrected text, as HTML
// with <del> for removed words and <ins> for added ones. Line breaks are kept.
// Punctuation is left as the student wrote it and never marked as a change
// (the teacher doesn't correct commas, periods, hyphens and the like).
// A word in `spelling` (journal/spelling.js spellingMap) only had its spelling
// fixed: it shows as the right word alone, <ins class="spell">.
export function diffHtml(before, after, spelling = new Map()) {
  // "yesterday,so" is two words.
  const tokenize = (text) =>
    String(text).replace(/([,;:])(?=[A-Za-z])/g, "$1 ").split(/(\n)|[ \t]+/).filter((t) => t !== undefined && t !== "");
  const a = tokenize(before);
  const b = tokenize(after);
  const edge = /^([^\p{L}\p{N}']*)(.*?)([^\p{L}\p{N}']*)$/u;
  const parts = (w) => w.match(edge);
  const core = (w) => parts(w)[2].toLowerCase();
  const isPunct = (w) => w !== "\n" && core(w) === "";
  const pairs = lcsPairs(a, b, (x, y) => (x === "\n" || y === "\n" ? x === y : core(x) === core(y)));
  const out = [];
  let i = 0, j = 0;
  const word = (t) => (t === "\n" ? "<br>" : esc(t));
  const flush = (ai, bj) => {
    const removed = a.slice(i, ai).filter((t) => t !== "\n");
    const added = b.slice(j, bj).filter((t) => !isPunct(t));
    const words = removed.filter((t) => !isPunct(t));
    // Word for word, when one of them is a spelling fix.
    if (words.length && words.length === added.length && !added.includes("\n")
      && words.some((w, k) => isSpelling(spelling, w, added[k]))) {
      words.forEach((w, k) => {
        if (!isSpelling(spelling, w, added[k])) return out.push(`<del>${esc(w)}</del> <ins>${esc(added[k])}</ins>`);
        // The right word, with the student's own punctuation around it.
        const [, lead, , trail] = parts(w);
        out.push(`${esc(lead)}<ins class="spell">${esc(parts(added[k])[2])}</ins>${esc(trail)}`);
      });
      if (removed.length > words.length) out.push(removed.filter(isPunct).map(esc).join(" "));
      return;
    }
    if (words.length) out.push(`<del>${words.map(esc).join(" ")}</del>`);
    if (removed.length > words.length) out.push(removed.filter(isPunct).map(esc).join(" "));
    if (added.length) {
      const text = added.map(word).join(" ").replace(/ ?<br> ?/g, "<br>");
      out.push(added.every((t) => t === "\n") ? text : `<ins>${text}</ins>`);
    }
  };
  for (const [ai, bj] of pairs) {
    flush(ai, bj);
    // The corrected word with the student's own punctuation around it.
    const [, lead, , trail] = parts(a[ai]);
    out.push(b[bj] === "\n" ? "<br>" : esc(lead + parts(b[bj])[2] + trail));
    i = ai + 1;
    j = bj + 1;
  }
  flush(a.length, b.length);
  return out.join(" ").replace(/ ?<br> ?/g, "<br>");
}
