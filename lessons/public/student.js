// Student app: sign in with a lesson code, then vocab cards and their 復習,
// today's phrase, pronunciation, grammar and the journal with its correction.
import {
  ApiError, api, diffHtml, esc, formatDate, icons, japanDayNumber,
  SPEEDS, getSpeed, setSpeed, speak, startOfJapanDay, stopSpeaking, toast, watchErrors,
} from "./common.js";
import { UNITS, findLesson, plain, questionCount } from "./grammar/lessons.js";
import { bookWeeks, setKey, speakable, splitOnForm, weekWords, wordSets } from "./vocab/words.js";
import { MONTHS, currentMonth, monthLabel, monthPhrases, studentMonths } from "./pron/phrases.js";
import { CURRENT_WEEK, NOTES_FOR_STUDENTS } from "./course.js";
import { MENUS } from "./menus.js";
import { TOPICS } from "./journal/topics.js";
import { shownPoints, spellingMap } from "./journal/spelling.js";
import {
  TEST_SIZE, phraseByKey, phraseSetKey, phraseSets, phraseWeeks, setDrills, setNumbers, setScenes, testSize, weekPhrases,
  weekTitle,
} from "./phrases/book.js";
import { findMistakes, normalizeWords } from "./mistakes.js";
import { lessonDayLabel, lessonList, noteDayLabel, noteHtml as memoHtml, noteProblems } from "./notes/format.js";
import {
  allTime, appMinutes, bindPanels, formatMinutes, monthPanel, monthStart, startStudyClock, studySplit, summary, timeHtml,
  today, totalMinutes, totalPanel, weekDays, weekPanel, weekStart,
} from "./study.js";

watchErrors("/api/errors");

const app = document.getElementById("app");
const state = {
  me: null, vocab: null, vocabTest: null, review: null, pron: { which: null, index: 0 }, grammar: null, lesson: null, aiError: {},
  study: null, notes: {}, quiz: null,
};

const asterisk = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><g stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M12 3v18"/><path d="M4.2 7.5l15.6 9"/><path d="M4.2 16.5l15.6-9"/></g></svg>`;

// ---------- boot and routing ----------

async function load() {
  try {
    state.me = await api("/api/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      state.me = null;
    } else {
      app.innerHTML = `<main class="wrap"><div class="card empty" style="margin-top:40px">${esc(error.message)}<br><br><button class="btn" onclick="location.reload()">もう一度読みこむ</button></div></main>`;
      return false;
    }
  }
  return true;
}

function render() {
  if (!state.me) return renderLogin();
  let [, screen, ...rest] = location.hash.split("/");
  // A part the teacher hid from this student (menus.js) opens the home screen.
  if (MENUS.some((m) => m.key === screen) && !shows(screen)) [screen, rest] = ["", []];
  shownAnswer = null;
  closeQuiz();
  // Opening a pronunciation month goes to the first phrase that isn't 完了 yet.
  if (screen === "pron") state.pron = { which: null, index: 0 };
  const screens = {
    vocab: renderVocab, review: renderReview, phrases: renderPhrases, "phrase-review": renderPhraseReview, pron: renderPron,
    grammar: renderGrammar, journal: renderJournal, study: renderStudy, ...(NOTES_FOR_STUDENTS ? { notes: renderNotes } : {}),
  };
  (screens[screen] || renderHome)(...rest.map(decodeURIComponent));
}

window.addEventListener("hashchange", () => {
  render();
  window.scrollTo(0, 0);
});

// Any element with data-say reads its text aloud.
document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-say]");
  if (!button) return;
  button.classList.add("loading");
  await speak(button.dataset.say, { device: "device" in button.dataset, src: button.dataset.src });
  button.classList.remove("loading");
});

// Speed buttons change the speed for every 🔊 button, now and later.
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-speed]");
  if (!button) return;
  setSpeed(Number(button.dataset.speed));
  document.querySelectorAll("[data-speed]").forEach((b) => b.setAttribute("aria-pressed", b === button));
});

(async () => {
  if (await load()) render();
  if (state.me) startClock();
})();

// Time in the app counts as study time once signed in (see study.js).
let clockStarted = false;
function startClock() {
  if (clockStarted) return;
  clockStarted = true;
  startStudyClock(() => !!state.me, (seconds) => {
    if (!state.me) return;
    const day = today();
    let row = state.me.study.find((r) => r.day === day);
    if (!row) state.me.study.push((row = { day, app_seconds: 0, other_minutes: 0, note: "" }));
    row.app_seconds += seconds;
    const total = document.getElementById("today-total");
    if (total) {
      total.innerHTML = timeHtml(totalMinutes(row));
      document.getElementById("today-split").textContent = studySplit(row);
    }
  });
}

// ---------- shared bits ----------

// Whether this student sees a part of the home screen (menus.js).
const shows = (key) => !(state.me?.hidden || []).includes(key);

const items = (kind) => state.me.items.filter((item) => item.kind === kind);
const progress = (id) => state.me.progress[id] || {};

function topbar(title, back = "#/") {
  return `<header class="topbar"><div class="topbar-in">
    <a class="icon-btn" href="${back}" aria-label="もどる">${icons.back}</a>
    <h1>${esc(title)}</h1>
  </div></header>`;
}

// src: a recording to play instead of the made-up voice.
function sayButton(text, label = "聞く", { device = false, src = "" } = {}) {
  return `<button type="button" class="speak" data-say="${esc(text)}"${device ? " data-device" : ""}${src ? ` data-src="${esc(src)}"` : ""}>${icons.speaker}${esc(label)}</button>`;
}

function speedControl() {
  const current = getSpeed();
  return `<div class="speed" role="group" aria-label="音声の速さ">
    <span>速さ</span>
    ${SPEEDS.map((speed) => `<button type="button" data-speed="${speed}" aria-pressed="${speed === current}">${speed === 1 ? "ふつう" : speed}</button>`).join("")}
  </div>`;
}

function emptyState(message) {
  return `<div class="card empty">${message}</div>`;
}

async function saveProgress(itemId, body) {
  const current = { known: false, right: 0, wrong: 0, best: null, ...progress(itemId) };
  if (body.result === "known") current.known = true;
  if (body.result === "again") current.known = false;
  if (body.result === "right") current.right += 1;
  if (body.result === "wrong") current.wrong += 1;
  if (body.score !== undefined) current.best = Math.max(current.best ?? 0, body.score);
  state.me.progress[itemId] = current;
  try {
    await api("/api/progress", { method: "POST", body: { item_id: itemId, ...body } });
  } catch (error) {
    toast(error.message);
  }
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function wroteToday() {
  const start = startOfJapanDay();
  return state.me.journals.some((j) => new Date(j.created_at) >= start);
}

// ---------- login ----------

function renderLogin() {
  app.innerHTML = `<main class="login">
    <div class="card">
      <img src="character.png" alt="">
      <h1>Hina English レッスン</h1>
      <p class="muted">先生からもらったレッスンコードを入れてください。</p>
      <form id="login" class="stack">
        <label class="field"><span>レッスンコード</span>
          <input class="code-input" type="text" name="code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="XXXX-XXXX" required>
        </label>
        <p class="notice bad" id="login-error" role="alert" hidden></p>
        <button class="btn block" type="submit">はじめる</button>
      </form>
    </div>
  </main>`;
  const form = document.getElementById("login");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const error = document.getElementById("login-error");
    button.disabled = true;
    error.hidden = true;
    try {
      await api("/api/login", { method: "POST", body: { code: form.code.value } });
      await load();
      startClock();
      location.hash = "#/";
      render();
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      button.disabled = false;
    }
  });
}

// ---------- home screen app ----------
// Added to the home screen (manifest.webmanifest), the app opens on its own,
// without the browser bars. Until then, the home screen shows how to add it.

const INSTALL_KEY = "hina-lessons-install-hidden";
const isStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(navigator.userAgent);
const onHome = () => !location.hash.split("/")[1];
let installPrompt = null; // Android Chrome's own "install" dialog, when it offers one

addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  if (state.me && onHome()) render();
});

function installHidden() {
  try { return localStorage.getItem(INSTALL_KEY) === "1"; } catch { return false; }
}

function setInstallHidden(hidden) {
  try {
    if (hidden) localStorage.setItem(INSTALL_KEY, "1");
    else localStorage.removeItem(INSTALL_KEY);
  } catch { /* private mode */ }
}

const canInstall = () => !isStandalone() && (isIos || isAndroid);

function installCard() {
  if (!canInstall() || installHidden()) return "";
  const steps = isIos
    ? [
      "画面の下（または上）にある共有ボタン <b>（□に↑のマーク）</b> をタップ",
      "メニューを下にスクロールして <b>「ホーム画面に追加」</b> をタップ",
      "右上の <b>「追加」</b> をタップ",
    ]
    : [
      "Chrome の右上の <b>「︙」</b> をタップ",
      "<b>「ホーム画面に追加」</b>（または「アプリをインストール」）をタップ",
      "<b>「追加」</b>（または「インストール」）をタップ",
    ];
  return `<section class="card install stack" aria-label="ホーム画面に追加">
    <p class="label">📲 ホーム画面に追加しよう</p>
    <p>ホーム画面のアイコンから、アプリのように開けるようになります。</p>
    ${installPrompt
      ? `<button class="btn block" id="install">ホーム画面に追加する</button>`
      : `<ol>${steps.map((step) => `<li>${step}</li>`).join("")}</ol>`}
    ${isIos ? `<p class="muted small">ホーム画面のアイコンから初めて開いたときは、もう一度レッスンコードを入れてください。</p>` : ""}
    <button type="button" class="btn ghost small-btn" id="install-hide">閉じる</button>
  </section>`;
}

function bindInstall() {
  document.getElementById("install")?.addEventListener("click", async () => {
    installPrompt.prompt();
    await installPrompt.userChoice.catch(() => {});
    installPrompt = null;
    render();
  });
  document.getElementById("install-hide")?.addEventListener("click", () => {
    setInstallHidden(true);
    render();
  });
  document.getElementById("install-show")?.addEventListener("click", () => {
    setInstallHidden(false);
    render();
    window.scrollTo(0, 0);
  });
}

// ---------- home ----------

// The two things to do every day: write the journal and finish one pronunciation phrase.
function todaysTasks() {
  const journal = wroteToday();
  const next = nextPhrase();
  const pron = pronDoneToday() || !next;
  return [
    { key: "journal", done: journal, href: "#/journal", title: "日記を書く", sub: journal ? "今日の日記は書けました" : "今日のお題で、英語の日記を1つ" },
    {
      key: "pron",
      done: pron,
      href: next ? `#/pron/${next.month}` : "#/pron",
      title: "発音を1文 完了する",
      sub: pronDoneToday() ? "今日の発音はできました" : next ? `${monthLabel(myMonths(), next.month)} ・ ${next.index + 1}文目（${next.index + 1} / ${next.count}）` : "全部の Month が完了しています",
    },
  ].filter((task) => shows(task.key));
}

function renderHome() {
  // Progress counts this week's 単語 and フレーズ (course.js) and this month's 発音.
  const sets = wordSets(studentWeekWords(CURRENT_WEEK)).map((s) => studentSetKey(CURRENT_WEEK, s.number));
  const tested = sets.filter((key) => state.me.vocabTests[key]).length;
  const review = reviewWords().length;
  const phraseTests = phraseTestCount(phraseWeeks().includes(CURRENT_WEEK) ? [CURRENT_WEEK] : []);
  const phraseReviewCount = reviewPhrases().length;
  const pronMonth = currentMonth(pronDone, myMonths().map((m) => m.month));
  const shared = monthPhrases(pronMonth);
  const pronFinished = shared.filter((p) => pronDone(p.key)).length;
  const grammar = items("grammar");
  const done = wroteToday();
  const tasks = todaysTasks();
  const left = tasks.filter((t) => !t.done).length;
  const now = today();
  const week = summary(weekDays(state.me.study, weekStart(now)));
  const todayRow = state.me.study.find((r) => r.day === now);
  const latestNote = state.me.notes[0];
  const lessonCount = lessonList(state.me.lessonDays, state.me.notes).length;
  const plan = state.me.plan;

  app.innerHTML = `
    <header class="topbar"><div class="topbar-in">
      <div class="brand"><span class="brand-mark">${asterisk}</span>Hina English</div>
    </div></header>
    <main class="wrap stack">
      <div class="hello">
        <p class="muted">${esc(formatDate(new Date().toISOString()))}</p>
        <h2>こんにちは、${esc(state.me.student.name)}さん</h2>
      </div>
      ${installCard()}
      ${shows("plan") ? `<section class="card plan" aria-label="今週の勉強範囲">
        <p class="label">今週の勉強範囲</p>
        ${plan ? `<div class="note-body plan-body">${memoHtml(plan.body)}</div>` : `<p class="muted small">先生が、今週の勉強範囲をここに書きます。</p>`}
      </section>` : ""}
      ${tasks.length ? `<section class="card tasks ${left ? "" : "all-done"}" aria-label="今日のやること">
        <p class="label">${left ? `今日のやること（あと ${left} つ）` : "今日のやることは全部できました！🎉"}</p>
        ${tasks.map((t) => `<a class="task ${t.done ? "done" : ""}" href="${t.href}">
          <span class="check" aria-hidden="true">${t.done ? "✓" : ""}</span>
          <div><b>${esc(t.title)}</b><span class="muted small">${esc(t.sub)}</span></div>
          <span class="go" aria-hidden="true">›</span>
        </a>`).join("")}
      </section>` : ""}
      <nav class="tiles" aria-label="メニュー">
        ${homeTiles([
          { key: "journal", wide: true, cls: done ? "done" : "", html: `
            <span class="emoji" aria-hidden="true">${done ? "✅" : "✍️"}</span>
            <div><b>日記を書く</b><p class="muted">${done ? "今日の日記は書けました！" : "今日のお題で、英語の日記を書こう"}</p></div>` },
          { key: "vocab", html: `
            <span class="emoji" aria-hidden="true">🃏</span><b>単語カード</b>
            <span class="muted">${sets.length ? `Week ${CURRENT_WEEK} ・ テスト ${tested} / ${sets.length}` : "まだありません"}</span>
            ${sets.length ? `<div class="bar"><i style="width:${Math.round((tested / sets.length) * 100)}%"></i></div>` : ""}` },
          { key: "review", html: `
            <span class="emoji" aria-hidden="true">🔁</span><b>単語復習</b>
            <span class="muted">${review ? `復習カード ${review} 語` : "まだありません"}</span>` },
          { key: "phrases", html: `
            <span class="emoji" aria-hidden="true">💬</span><b>フレーズ</b>
            <span class="muted">${phraseTests.total ? `Week ${CURRENT_WEEK} ・ テスト ${phraseTests.done} / ${phraseTests.total}` : phraseWeeks().length ? "はじめよう" : "準備中"}</span>
            ${phraseTests.total ? `<div class="bar"><i style="width:${Math.round((phraseTests.done / phraseTests.total) * 100)}%"></i></div>` : ""}` },
          { key: "phrase-review", html: `
            <span class="emoji" aria-hidden="true">🔄</span><b>フレーズ復習</b>
            <span class="muted">${phraseReviewCount ? `${phraseReviewCount} フレーズ` : "まだありません"}</span>` },
          { key: "grammar", html: `
            <span class="emoji" aria-hidden="true">✏️</span><b>文法</b>
            <span class="muted">${UNITS.map((u) => esc(u.title)).join("・")}${grammar.length ? ` ＋ 先生からの問題` : ""}</span>` },
          { key: "pron", html: `
            <span class="emoji" aria-hidden="true">🎤</span><b>発音課題</b>
            <span class="muted">${shared.length ? `${esc(monthLabel(myMonths(), pronMonth))} ・ 完了 ${pronFinished} / ${shared.length}` : "まだありません"}</span>
            ${shared.length ? `<div class="bar"><i style="width:${Math.round((pronFinished / shared.length) * 100)}%"></i></div>` : ""}` },
          NOTES_FOR_STUDENTS && { key: "notes", wide: true, html: `
            <span class="emoji" aria-hidden="true">📝</span>
            <div><b>授業メモ</b><p class="muted">${[
              lessonCount ? `これまでの授業 ${lessonCount} 回` : "",
              latestNote ? `${esc(noteDayLabel(latestNote.day))}${latestNote.title ? ` ・ ${esc(latestNote.title)}` : ""}` : "",
            ].filter(Boolean).join(" ・ ") || "授業のあとに、先生のメモがとどきます"}</p></div>` },
          { key: "study", wide: true, html: `
            <span class="emoji" aria-hidden="true">⏱️</span>
            <div><b>勉強時間</b><p class="muted">今日 ${formatMinutes(totalMinutes(todayRow))} ・ 今週 ${formatMinutes(week.total)} ・ これまで ${formatMinutes(allTime(state.me.study).total)}</p></div>` },
        ])}
      </nav>
      <p class="footer-links">
        ${canInstall() && installHidden() ? `<button type="button" class="btn ghost small-btn" id="install-show">ホーム画面に追加する方法</button>` : ""}
        <button type="button" class="btn ghost small-btn" id="logout">ログアウト</button>
      </p>
    </main>`;

  bindInstall();
  document.getElementById("logout").addEventListener("click", async () => {
    if (!confirm("ログアウトしますか？ もう一度入るときは、レッスンコードが必要です。")) return;
    await api("/api/logout", { method: "POST" }).catch(() => {});
    state.me = null;
    location.hash = "";
    render();
  });
}

// ---------- 授業メモ ----------
// Every lesson so far, numbered from the first (notes/format.js lessonList);
// a lesson with the teacher's memo opens it. A memo's 復習問題 are cards
// like 単語カード (the English; a tap shows the meaning and 解説), in a panel at
// the bottom of the screen so the memo can still be read above it. Each card
// can go into フレーズ復習 ("n12/3": memo 12's fourth card).

function renderNotes(id) {
  if (id) return renderNote(Number(id));
  const notes = state.me.notes;
  const lessons = lessonList(state.me.lessonDays, notes);
  app.innerHTML = `${topbar("授業メモ")}
    <main class="wrap stack">
      ${lessons.length ? `<p class="muted">これまでの授業：<b>${lessons.length} 回</b>${notes.length ? "<br>メモがある授業は、タップすると授業で習ったことのまとめが見られます。メモの内容で、いつでも復習できます。" : ""}</p>` : ""}
      ${lessons.length ? lessons.map((lesson) => {
        const name = `${lesson.number}. ${esc(lessonDayLabel(lesson.day))}`;
        if (!lesson.notes.length) return `<div class="lesson-card past-lesson"><div><b>${name}</b></div></div>`;
        return lesson.notes.map((note) => `<a class="lesson-card" href="#/notes/${note.id}">
          <div><b>${name}</b>${note.title ? `<span class="muted small">${esc(note.title)}</span>` : ""}</div>
          ${note.problems ? `<span class="badge">復習 ${note.problems}こ</span>` : `<span class="badge">メモ</span>`}
        </a>`).join("");
      }).join("") : emptyState("まだ授業メモはありません。<br>授業のあとに、先生のメモがここにとどきます。")}
    </main>`;
}

async function renderNote(id) {
  let note = state.notes[id];
  if (!note) {
    app.innerHTML = `${topbar("授業メモ", "#/notes")}<main class="wrap stack"><div class="card empty"><span class="spinner" aria-hidden="true"></span>読みこみ中…</div></main>`;
    try {
      note = state.notes[id] = (await api(`/api/notes/${id}`)).note;
    } catch (error) {
      if (location.hash !== `#/notes/${id}`) return;
      app.innerHTML = `${topbar("授業メモ", "#/notes")}<main class="wrap stack">${emptyState(esc(error.message))}</main>`;
      return;
    }
    if (location.hash !== `#/notes/${id}`) return;
  }
  const problems = noteProblems(note.body);
  const quizButton = problems.length
    ? `<button type="button" class="btn block quiz-start" data-quiz>内容を元に復習する（${problems.length}こ）</button>`
    : "";
  app.innerHTML = `${topbar(noteDayLabel(note.day), "#/notes")}
    <main class="wrap stack note-page">
      ${note.title ? `<h2 class="week-theme">${esc(note.title)}</h2>` : ""}
      ${quizButton}
      <article class="card note-body">${memoHtml(note.body)}</article>
      ${quizButton}
    </main>`;
  app.querySelectorAll("[data-quiz]").forEach((button) => button.addEventListener("click", () => openQuiz(note, problems)));
}

function openQuiz(note, problems) {
  state.quiz = { note, problems, index: 0, shown: false };
  let sheet = document.getElementById("note-quiz");
  if (!sheet) {
    sheet = document.createElement("section");
    sheet.id = "note-quiz";
    sheet.className = "note-quiz";
    sheet.setAttribute("aria-label", "復習問題");
    document.body.append(sheet);
  }
  document.body.classList.add("quiz-open");
  drawQuiz();
}

function closeQuiz() {
  state.quiz = null;
  document.getElementById("note-quiz")?.remove();
  document.body.classList.remove("quiz-open");
}

const noteCardKey = (note, index) => `n${note.id}/${index}`;

function drawQuiz() {
  const sheet = document.getElementById("note-quiz");
  const quiz = state.quiz;
  if (!sheet || !quiz) return;
  const { note, problems, index, shown } = quiz;
  const finished = index >= problems.length;
  const p = problems[index];
  const key = p && noteCardKey(note, index);
  const inReviewHere = problems.filter((_, i) => inPhraseReview(noteCardKey(note, i))).length;
  sheet.innerHTML = `<div class="quiz-in">
    <div class="quiz-head">
      <b>${finished ? "復習" : `復習 ${index + 1} / ${problems.length}`}</b>
      <button type="button" class="icon-btn" data-close aria-label="とじる">✕</button>
    </div>
    ${finished ? `
      <p class="quiz-done">おわり！おつかれさまでした 🎉</p>
      ${inReviewHere ? `<p class="muted small center">このメモから ${inReviewHere} こがフレーズ復習に入っています</p>` : ""}
      <div class="btn-row">
        <button type="button" class="btn secondary" data-again>もう一度</button>
        <button type="button" class="btn" data-close>とじる</button>
      </div>` : `
      <div class="quiz-card ${shown ? "" : "front"}" ${shown ? "" : 'role="button" tabindex="0" aria-label="意味と解説を見る" data-show'}>
        <div class="quiz-en-row">
          <p class="quiz-en" lang="en">${esc(p.en)}</p>
          <button type="button" class="speak icon-only" data-say="${esc(p.en)}" aria-label="聞く">${icons.speaker}</button>
        </div>
        ${shown
          ? `<p class="quiz-meaning">${esc(p.ja)}</p>${p.note ? `<p class="quiz-note">${noteHtml(p.note)}</p>` : ""}`
          : `<p class="hint">タップして意味を見る</p>`}
      </div>
      ${shown ? (inPhraseReview(key)
        ? `<button type="button" class="btn secondary block review-on" data-review aria-pressed="true">✓ 復習タブに入っています</button>`
        : `<button type="button" class="btn ghost block review-add" data-review aria-pressed="false">＋ 復習タブに入れる</button>`) : ""}
      <div class="btn-row">
        ${index ? `<button type="button" class="btn secondary" data-back>前へ</button>` : ""}
        ${shown
          ? `<button type="button" class="btn" data-next>${index + 1 < problems.length ? "次へ" : "おわる"}</button>`
          : `<button type="button" class="btn" data-show>意味を見る</button>`}
      </div>`}
  </div>`;
  const on = (selector, action) => sheet.querySelectorAll(selector).forEach((b) => b.addEventListener("click", (event) => {
    if (event.target.closest("[data-say]") && !b.matches("[data-say]")) return;
    action();
  }));
  on("[data-close]", closeQuiz);
  on("[data-again]", () => { Object.assign(quiz, { index: 0, shown: false }); drawQuiz(); });
  on("[data-show]", () => { quiz.shown = true; drawQuiz(); });
  on("[data-next]", () => { Object.assign(quiz, { index: index + 1, shown: false }); drawQuiz(); });
  on("[data-back]", () => { Object.assign(quiz, { index: index - 1, shown: false }); drawQuiz(); });
  on("[data-review]", () => {
    const add = !inPhraseReview(key);
    if (add) (state.me.noteCards ||= {})[key] = { ...p, day: note.day };
    setPhraseReview(key, add);
    toast(add ? "フレーズ復習に入れました" : "フレーズ復習から外しました");
    drawQuiz();
  });
  sheet.querySelector(".quiz-card.front")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    quiz.shown = true;
    drawQuiz();
  });
}

// The home tiles this student sees. Half-width tiles go two to a row; one left
// without a partner (when the one next to it is hidden) takes the whole row.
function homeTiles(tiles) {
  const seen = tiles.filter((tile) => tile && shows(tile.key));
  let run = 0;
  return seen.map((tile, i) => {
    run = tile.wide ? 0 : run + 1;
    const alone = !tile.wide && run % 2 === 1 && (!seen[i + 1] || seen[i + 1].wide);
    const cls = ["tile", tile.wide && "wide", alone && "solo", tile.cls].filter(Boolean).join(" ");
    return `<a class="${cls}" href="#/${tile.key}">${tile.html}</a>`;
  }).join("");
}

// ---------- study time ----------
// Time in the app is counted by itself (study.js); the student adds study done
// elsewhere and can fix either number. The page shows today, everything so
// far (by month), a week and a month.

// The page fetches fresh numbers (at most every 30 seconds), in case the app
// was also used on another phone or computer.
let studyFetched = 0;

function renderStudy(page, day) {
  if (page === "edit") return renderStudyEdit(day);
  if (Date.now() - studyFetched > 30e3) {
    studyFetched = Date.now();
    api("/api/me").then((fresh) => {
      state.me = fresh;
      if (location.hash === "#/study") renderStudy();
    }).catch(() => {});
  }
  const now = today();
  state.study ||= { week: weekStart(now), month: monthStart(now) };
  const rows = state.me.study;
  const todayRow = rows.find((r) => r.day === now);

  app.innerHTML = `${topbar("勉強時間")}
    <main class="wrap stack">
      <section class="card stack study-today">
        <p class="label">今日の勉強時間</p>
        <p class="today-big" id="today-total">${timeHtml(totalMinutes(todayRow))}</p>
        <p class="muted" id="today-split">${studySplit(todayRow)}</p>
        <a class="btn secondary" href="#/study/edit/${now}">記入・編集する</a>
        <p class="muted small">アプリで勉強している時間は、自動で記録されます。本・動画・オンライン英会話など、アプリの外で勉強した時間は、自分で記入しましょう。</p>
      </section>
      ${totalPanel(rows)}
      ${weekPanel(rows, state.study.week, { editable: true })}
      ${monthPanel(rows, state.study.month)}
    </main>`;
  bindPanels(app, state.study, () => renderStudy());
}

function renderStudyEdit(day) {
  const now = today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day || "") || day > now) day = now;
  const row = state.me.study.find((r) => r.day === day);
  app.innerHTML = `${topbar("勉強時間を記入", "#/study")}
    <main class="wrap stack">
      <form id="study-form" class="card stack">
        <label class="field"><span>日付</span><input type="date" name="day" value="${day}" max="${now}" required></label>
        <div class="stack">
          <label class="field"><span>アプリで勉強した時間</span>
            <span class="minutes-field"><input type="number" name="app" min="0" max="1440" step="1" inputmode="numeric" value="${appMinutes(row)}"> 分 <output></output></span>
          </label>
          <p class="muted small">アプリを開いている時間は、自動で記録されます。まちがっていたら直してください。</p>
        </div>
        <div class="stack">
          <label class="field"><span>アプリ以外で勉強した時間</span>
            <span class="minutes-field"><input type="number" name="other" min="0" max="1440" step="1" inputmode="numeric" value="${row?.other_minutes || 0}"> 分 <output></output></span>
          </label>
          <p class="muted small">本・動画・オンライン英会話など。60分 = 1時間です。</p>
        </div>
        <label class="field"><span>メモ（なくてもOK）</span>
          <input type="text" name="note" maxlength="300" value="${esc(row?.note || "")}" placeholder="例：英語の動画を見た">
        </label>
        <p class="notice bad" id="study-error" role="alert" hidden></p>
        <button class="btn block" type="submit">保存する</button>
      </form>
    </main>`;

  const form = document.getElementById("study-form");
  const showHours = () => form.querySelectorAll(".minutes-field").forEach((field) => {
    const minutes = Math.max(0, Math.round(Number(field.querySelector("input").value)) || 0);
    field.querySelector("output").textContent = minutes >= 60 ? `= ${formatMinutes(minutes)}` : "";
  });
  showHours();
  form.addEventListener("input", showHours);
  form.day.addEventListener("change", () => {
    if (form.day.value) location.hash = `#/study/edit/${form.day.value}`;
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type=submit]");
    const error = document.getElementById("study-error");
    button.disabled = true;
    error.hidden = true;
    try {
      const { day: saved } = await api(`/api/study/days/${form.day.value}`, {
        method: "PUT",
        body: {
          app_minutes: Number(form.app.value) || 0,
          app_minutes_shown: appMinutes(row),
          other_minutes: Number(form.other.value) || 0,
          note: form.note.value,
        },
      });
      const study = state.me.study.filter((r) => r.day !== saved.day);
      study.push(saved);
      state.me.study = study.sort((a, b) => (a.day < b.day ? -1 : 1));
      toast("保存しました");
      location.hash = "#/study";
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      button.disabled = false;
    }
  });
}

// ---------- つづきから ----------
// Where the student stopped in each 単語カード / フレーズ set, kept on this phone
// so the set opens there again, even after the app was closed:
// { "<name>|phrase:p1/s2": { week, number, index, of: "3 / 8", at } }.
// Finishing the set (on to its test) clears it.
const RESUME_KEY = "hina-resume";

function resumePlaces() {
  try { return JSON.parse(localStorage.getItem(RESUME_KEY)) || {}; } catch { return {}; }
}

const resumeId = (kind, setKey) => `${state.me.student.name}|${kind}:${setKey}`;
const resumeAt = (kind, setKey) => resumePlaces()[resumeId(kind, setKey)] || null;

// place is null to forget the set (back at its start, or finished).
function saveResume(kind, setKey, place) {
  const places = resumePlaces();
  const id = resumeId(kind, setKey);
  if (place) places[id] = { ...place, at: Date.now() };
  else if (id in places) delete places[id];
  else return;
  try { localStorage.setItem(RESUME_KEY, JSON.stringify(places)); } catch { /* private mode */ }
}

// The set of this kind the student stopped in last, or null.
function lastResume(kind) {
  const prefix = `${state.me.student.name}|${kind}:`;
  return Object.entries(resumePlaces())
    .filter(([id]) => id.startsWith(prefix))
    .map(([id, place]) => ({ key: id.slice(prefix.length), ...place }))
    .sort((a, b) => b.at - a.at)[0] || null;
}

// The つづきから button at the top of a list.
const resumeCard = (href, where, of) => `<a class="lesson-card resume-card" href="${href}">
    <div><b>▶ つづきから</b><span class="muted small">${where} ・ ${esc(of)}</span></div>
    <span class="badge start">再開する</span>
  </a>`;

// ---------- vocab cards ----------
// A week is the student's 単語帳 (the shared one, or another the teacher gave
// them: vocab/words.js) plus the teacher's words for this student, in sets of
// ten. Each set: one card per word (with a 復習 checkbox), then a test.
// Missed words and ticked words make the 復習 list.

const WEEKS = 24;
const weekLabel = (week) => (week === "other" ? "そのほか" : `Week ${week}`);
const studentWeekWords = (week) => weekWords(week, state.me.items, state.me.vocabBooks);
const studentSetKey = (week, number) => setKey(week, number, state.me.vocabBooks);
const inReview = (key) => state.me.review.some((r) => r.key === key);
const testResult = (week, number) => state.me.vocabTests[studentSetKey(week, number)];

// Every word this student has, by key, so the 復習 list can find its words.
function wordsByKey() {
  const weeks = new Set([...bookWeeks(state.me.vocabBooks), ...items("vocab").map((v) => v.data.week || "other")]);
  const map = new Map();
  for (const week of weeks) for (const w of studentWeekWords(week)) map.set(w.key, { ...w, week });
  return map;
}

async function setReview(key, on, source = "check") {
  if (on && !inReview(key)) state.me.review.push({ key, source, added_at: new Date().toISOString() });
  if (!on) state.me.review = state.me.review.filter((r) => r.key !== key);
  try {
    await api("/api/vocab/review", { method: "POST", body: { key, on, source } });
  } catch (error) {
    toast(error.message);
  }
}

// An example sentence with its word in red (or a blank in its place).
function exampleHtml(ex, { blank = false } = {}) {
  return splitOnForm(ex.en, ex.form)
    .map((part, i) => (i % 2 ? (blank ? '<span class="blank" aria-label="空欄"></span>' : `<span class="hl">${esc(part)}</span>`) : esc(part)))
    .join("");
}

const noteHtml = (note) => esc(note).replace(/\n/g, "<br>");
// 名詞 / 動詞 above an example, when a word's examples use it in different ways.
const exTag = (ex) => (ex.tag ? `<span class="ex-tag">${esc(ex.tag)}</span>` : "");

function renderVocab(week, setNumber, mode) {
  const w = week === "other" ? "other" : Number(week);
  if (week && setNumber && mode === "test") return renderVocabTest(w, Number(setNumber));
  if (week && setNumber) return renderVocabSet(w, Number(setNumber));
  if (week) return renderWeek(w);

  const weeks = Array.from({ length: WEEKS }, (_, i) => i + 1);
  if (items("vocab").some((v) => !v.data.week)) weeks.push("other");
  const tiles = weeks.map((week) => {
    const words = studentWeekWords(week);
    if (!words.length) return `<div class="week empty-week"><b>${weekLabel(week)}</b><span>まだありません</span></div>`;
    const sets = wordSets(words);
    const tested = sets.filter((s) => testResult(week, s.number)).length;
    return `<a class="week ${tested === sets.length ? "done" : ""}" href="#/vocab/${week}">
      <b>${weekLabel(week)}</b>
      <span>${words.length} 語 ・ テスト ${tested} / ${sets.length}</span>
      <div class="bar"><i style="width:${Math.round((tested / sets.length) * 100)}%"></i></div>
    </a>`;
  });

  const last = lastResume("vocab");
  // (Only while it is still this student's set: the teacher may have changed their 単語帳.)
  const lastSet = last && studentSetKey(last.week, last.number) === last.key && findSet(last.week, last.number);
  app.innerHTML = `${topbar("単語カード")}
    <main class="wrap stack">
      ${lastSet ? resumeCard(`#/vocab/${last.week}/${last.number}`, `${weekLabel(last.week)} ・ ${lastSet.number}. ${esc(lastSet.title)}`, last.of) : ""}
      <div class="weeks">${tiles.join("")}</div>
    </main>`;
}

function renderWeek(week) {
  state.vocabTest = null;
  const sets = wordSets(studentWeekWords(week));
  app.innerHTML = `${topbar(`単語カード ・ ${weekLabel(week)}`, "#/vocab")}
    <main class="wrap stack">
      <p class="muted">10語ずつ覚えて、最後にテストをします。まちがえた単語は「復習」に入ります。</p>
      ${sets.length ? "" : emptyState("この週の単語は、まだありません。")}
      ${sets.map((set) => {
        const result = testResult(week, set.number);
        const place = resumeAt("vocab", studentSetKey(week, set.number));
        return `<a class="lesson-card" href="#/vocab/${week}/${set.number}">
          <div><b>${set.number}. ${esc(set.title)}</b><span class="muted small" lang="en">${set.words.map((w) => esc(w.word)).join(" ・ ")}</span></div>
          ${place ? `<span class="badge start">つづきから ${esc(place.of)}</span>`
            : result ? `<span class="badge">✓ ${result.best} / ${result.total}</span>` : `<span class="badge start">はじめる</span>`}
        </a>`;
      }).join("")}
    </main>`;
}

function findSet(week, number) {
  return wordSets(studentWeekWords(week)).find((s) => s.number === number);
}

function renderVocabSet(week, number) {
  const set = findSet(week, number);
  if (!set) return renderWeek(week);
  const id = studentSetKey(week, number);
  if (state.vocab?.id !== id) {
    const saved = resumeAt("vocab", id);
    state.vocab = { id, index: saved && saved.index < set.words.length ? saved.index : 0 };
  }
  const V = state.vocab;
  saveResume("vocab", id, V.index ? { week, number, index: V.index, of: `${V.index + 1} / ${set.words.length}` } : null);
  const word = set.words[V.index];
  const last = V.index === set.words.length - 1;
  const rerender = () => {
    renderVocabSet(week, number);
    window.scrollTo(0, 0);
  };

  app.innerHTML = `${topbar(`${weekLabel(week)} ・ ${set.number}. ${set.title}`, `#/vocab/${week}`)}
    <main class="wrap stack">
      <div class="lesson-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${set.words.length}" aria-valuenow="${V.index + 1}">
        <div class="bar"><i style="width:${Math.round(((V.index + 1) / set.words.length) * 100)}%"></i></div>
        <span class="counter">${V.index + 1} / ${set.words.length}</span>
      </div>
      ${V.revealed ? `<section class="card stack word-card">
        ${word.pos ? `<p class="pos">${esc(word.pos)}</p>` : ""}
        <div class="word-row">
          <p class="word" lang="en">${esc(word.word)}</p>
          ${sayIcon(speakable(word.word))}
        </div>
        <p class="meaning">${noteHtml(word.meaning)}</p>
        ${word.examples.length ? `<ul class="word-examples">${word.examples.map((ex) => `<li>
          ${sayIcon(ex.en)}
          <div>
            ${exTag(ex)}<p class="en" lang="en">${exampleHtml(ex)}</p>
            ${ex.ja ? `<p class="ja">${esc(ex.ja)}</p>` : ""}
            ${ex.note ? `<p class="word-note">${noteHtml(ex.note)}</p>` : ""}
          </div>
        </li>`).join("")}</ul>` : ""}
        <div>${speedControl()}</div>
        <label class="review-check">
          <input type="checkbox" id="review-check" ${inReview(word.key) ? "checked" : ""}>
          <span>復習カードに入れる</span>
        </label>
      </section>`
      : `<section class="card word-card word-front" id="word-front" role="button" tabindex="0" aria-label="意味と例文を見る">
        ${word.pos ? `<p class="pos">${esc(word.pos)}</p>` : ""}
        <div class="word-row center-row">
          <p class="word" lang="en">${esc(word.word)}</p>
          ${sayIcon(speakable(word.word))}
        </div>
        <p class="hint">タップして、意味と例文を見る</p>
      </section>`}
      <div class="lesson-nav">
        ${V.index > 0 ? `<button type="button" class="btn ghost" id="prev">← もどる</button>` : "<span></span>"}
        <button type="button" class="btn" id="next">${last ? "テストへ" : "次へ"}</button>
      </div>
    </main>`;

  // The card shows the English first; a tap (not on 🔊) turns it over.
  const front = document.getElementById("word-front");
  const turn = () => {
    V.revealed = true;
    renderVocabSet(week, number);
  };
  front?.addEventListener("click", (event) => {
    if (!event.target.closest("[data-say]")) turn();
  });
  front?.addEventListener("keydown", (event) => {
    if (event.target === front && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      turn();
    }
  });
  document.getElementById("review-check")?.addEventListener("change", (event) => {
    setReview(word.key, event.target.checked);
    toast(event.target.checked ? "復習カードに入れました" : "復習カードから外しました");
  });
  document.getElementById("prev")?.addEventListener("click", () => {
    V.index -= 1;
    V.revealed = false;
    rerender();
  });
  document.getElementById("next").addEventListener("click", () => {
    if (last) {
      saveResume("vocab", id, null);
      state.vocab = null;
      state.vocabTest = null;
      location.hash = `#/vocab/${week}/${number}/test`;
      return;
    }
    V.index += 1;
    V.revealed = false;
    rerender();
  });
}

// ---------- ten-word test ----------
// Pick the meaning of each word from four. A miss goes into the 復習 list.

function meaningChoices(word, pool) {
  const others = shuffle(pool.filter((w) => w.word !== word.word && w.meaning !== word.meaning));
  const samePos = others.filter((w) => w.pos === word.pos);
  const picked = [];
  for (const w of [...samePos, ...others]) {
    if (picked.length === 3) break;
    if (!picked.includes(w.meaning)) picked.push(w.meaning);
  }
  return shuffle([word.meaning, ...picked]);
}

function renderVocabTest(week, number) {
  const set = findSet(week, number);
  if (!set) return renderWeek(week);
  const id = studentSetKey(week, number);
  if (state.vocabTest?.id !== id) {
    const pool = studentWeekWords(week);
    state.vocabTest = {
      id,
      questions: shuffle(set.words).map((word) => ({ word, choices: meaningChoices(word, pool) })),
      index: 0,
      answers: [],
      saved: false,
    };
  }
  const T = state.vocabTest;
  const rerender = () => {
    renderVocabTest(week, number);
    window.scrollTo(0, 0);
  };
  const back = `#/vocab/${week}`;

  if (T.index >= T.questions.length) return renderVocabTestResult(week, set, rerender);

  const { word, choices } = T.questions[T.index];
  const answer = T.answers[T.index];
  app.innerHTML = `${topbar(`テスト ・ ${set.number}. ${set.title}`, back)}
    <main class="wrap stack">
      <div class="lesson-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${T.questions.length}" aria-valuenow="${T.index + 1}">
        <div class="bar"><i style="width:${Math.round((T.index / T.questions.length) * 100)}%"></i></div>
        <span class="counter">${T.index + 1} / ${T.questions.length}</span>
      </div>
      <section class="card stack">
        <p class="muted">この単語の意味は？</p>
        <div class="word-row">
          <p class="word" lang="en">${esc(word.word)}</p>
          ${sayIcon(speakable(word.word))}
        </div>
        <div class="choices">${choices.map((c, i) => {
          let cls = "";
          if (answer && c === word.meaning) cls = "right";
          else if (answer && c === answer.given) cls = "wrong";
          return `<button type="button" class="choice ${cls}" data-choice="${i}" ${answer ? "disabled" : ""}>${esc(c)}</button>`;
        }).join("")}</div>
      </section>
      ${answer ? `<section class="card stack" id="verdict" aria-live="polite">
        <p class="verdict ${answer.right ? "right" : "wrong"}">${answer.right ? "⭕ 正解！" : "❌ ざんねん"}</p>
        ${answer.right ? "" : `<p><b lang="en">${esc(word.word)}</b> は「${esc(word.meaning)}」。復習カードに入れました。</p>`}
      </section>
      <div class="lesson-nav"><span></span><button type="button" class="btn" id="next">${T.index === T.questions.length - 1 ? "結果を見る" : "次へ"}</button></div>` : ""}
    </main>`;

  if (answer) {
    document.getElementById("next").addEventListener("click", () => {
      T.index += 1;
      rerender();
    });
    document.getElementById("next").focus();
    return;
  }
  app.querySelectorAll("[data-choice]").forEach((button) =>
    button.addEventListener("click", () => {
      const given = choices[Number(button.dataset.choice)];
      const right = given === word.meaning;
      T.answers[T.index] = { given, right };
      if (!right) setReview(word.key, true, "test");
      rerender();
    }),
  );
}

function renderVocabTestResult(week, set, rerender) {
  const T = state.vocabTest;
  const score = T.answers.filter((a) => a.right).length;
  const missed = T.questions.filter((_, i) => !T.answers[i].right).map((q) => q.word);
  if (!T.saved) {
    T.saved = true;
    const key = studentSetKey(week, set.number);
    const old = state.me.vocabTests[key];
    state.me.vocabTests[key] = {
      best: Math.max(old?.best ?? 0, score), last: score, total: T.questions.length, times: (old?.times ?? 0) + 1,
    };
    api(`/api/vocab/tests/${week}/${set.number}`, { method: "POST", body: { score } }).catch((error) => toast(error.message));
  }
  const next = findSet(week, set.number + 1);
  const perfect = score === T.questions.length;

  app.innerHTML = `${topbar(`テスト ・ ${set.number}. ${set.title}`, `#/vocab/${week}`)}
    <main class="wrap stack">
      <section class="card stack" style="text-align:center">
        <p style="font-size:40px">${perfect ? "🎉" : "👏"}</p>
        <p class="score">${score} / ${T.questions.length}<small> 問正解</small></p>
        <p>${perfect ? "全問正解！" : "まちがえた単語は、復習カードに入れました。"}</p>
      </section>
      ${missed.length ? `<section class="card stack">
        <h3>復習カードに入れた単語</h3>
        <ul class="plain-list">${missed.map((w) => `<li><b lang="en">${esc(w.word)}</b>　${esc(w.meaning)}</li>`).join("")}</ul>
      </section>` : ""}
      ${next ? `<a class="btn block" href="#/vocab/${week}/${next.number}">次の10語へ（${next.number}. ${esc(next.title)}）</a>` : ""}
      <button type="button" class="btn secondary block" id="again">もう一度テスト</button>
      <a class="btn ghost block" href="#/vocab/${week}">${weekLabel(week)} にもどる</a>
    </main>`;
  document.getElementById("again").addEventListener("click", () => {
    state.vocabTest = null;
    rerender();
  });
}

// ---------- review ----------
// The 復習 list: words ticked on their card or missed in a test.
// Level 1: see the word, think of the meaning, check yourself.
// Level 2: type the word into the gap in its example sentence.

const REVIEW_SESSION = 20;

function reviewWords() {
  const byKey = wordsByKey();
  return state.me.review.map((r) => byKey.get(r.key) && { ...byKey.get(r.key), source: r.source }).filter(Boolean);
}

// Level 2 needs an example sentence the word can be blanked out of.
const blankable = (word) => word.examples.filter((ex) => ex.form);

function renderReview(level) {
  if (level === "1" || level === "2") return renderReviewSession(Number(level));
  state.review = null;
  const words = reviewWords();
  const level2 = words.filter((w) => blankable(w).length).length;

  app.innerHTML = `${topbar("単語復習")}
    <main class="wrap stack">
      ${words.length ? `
        <p class="muted">復習する単語：<b>${words.length} 語</b>（1回 ${REVIEW_SESSION} 語まで、順番はばらばらに出ます）</p>
        <a class="unit-card" href="#/review/1">
          <span class="label">Level 1</span><b>単語の復習</b>
          <span class="muted small">単語を見て、日本語の意味が分かるか自分でチェック</span>
        </a>
        ${level2 ? `<a class="unit-card" href="#/review/2">
          <span class="label">Level 2</span><b>例文に単語を入れる</b>
          <span class="muted small">例文の空いているところに、合う単語を入れよう</span>
        </a>` : ""}
        <section class="card stack">
          <h3>復習カード</h3>
          <ul class="review-list">${words.map((w) => `<li>
            <div><b lang="en">${esc(w.word)}</b><span class="muted small">${esc(w.meaning)}</span></div>
            <span class="badge ${w.source === "test" ? "teacher" : ""}">${w.source === "test" ? "テスト" : "チェック"}</span>
            <button type="button" class="btn ghost small-btn" data-remove="${esc(w.key)}">外す</button>
          </li>`).join("")}</ul>
        </section>`
      : emptyState("まだ復習カードがありません。<br>単語カードで「復習カードに入れる」にチェックするか、<br>テストでまちがえた単語がここに入ります。")}
    </main>`;

  app.querySelectorAll("[data-remove]").forEach((button) =>
    button.addEventListener("click", async () => {
      await setReview(button.dataset.remove, false);
      renderReview();
    }),
  );
}

function startReview(level) {
  const pool = reviewWords().filter((w) => level === 1 || blankable(w).length);
  const words = shuffle(pool).slice(0, REVIEW_SESSION);
  state.review = {
    level,
    questions: words.map((word) => {
      const examples = level === 1 ? word.examples : blankable(word);
      return { word, example: examples[Math.floor(Math.random() * examples.length)] || null };
    }),
    index: 0,
    answers: [],
  };
}

function renderReviewSession(level) {
  if (state.review?.level !== level) startReview(level);
  const R = state.review;
  const rerender = () => {
    renderReviewSession(level);
    window.scrollTo(0, 0);
  };
  if (!R.questions.length) {
    state.review = null;
    location.hash = "#/review";
    return;
  }
  if (R.index >= R.questions.length) return renderReviewResult(level, rerender);

  const { word, example } = R.questions[R.index];
  const answer = R.answers[R.index];
  const body = level === 1 ? level1Html(word, example, answer, R) : level2Html(word, example, answer, R);
  app.innerHTML = `${topbar(level === 1 ? "Level 1 ・ 単語の復習" : "Level 2 ・ 例文に入れる", "#/review")}
    <main class="wrap stack">
      <div class="lesson-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${R.questions.length}" aria-valuenow="${R.index + 1}">
        <div class="bar"><i style="width:${Math.round((R.index / R.questions.length) * 100)}%"></i></div>
        <span class="counter">${R.index + 1} / ${R.questions.length}</span>
      </div>
      ${body}
    </main>`;

  const next = () => {
    R.index += 1;
    R.revealed = false;
    R.hint = false;
    rerender();
  };
  document.getElementById("next")?.addEventListener("click", next);
  if (answer) {
    document.getElementById("next")?.focus();
    return;
  }

  if (level === 1) {
    document.getElementById("reveal")?.addEventListener("click", () => {
      R.revealed = true;
      rerender();
    });
    app.querySelectorAll("[data-self]").forEach((button) =>
      button.addEventListener("click", () => {
        R.answers[R.index] = { right: button.dataset.self === "yes" };
        next();
      }),
    );
    return;
  }

  const form = document.getElementById("fill");
  form.answer.focus();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const given = form.answer.value.trim();
    if (!given) return;
    R.answers[R.index] = { given, right: sameWord(given, example.form) };
    rerender();
  });
  document.getElementById("hint")?.addEventListener("click", () => {
    R.hint = true;
    rerender();
  });
  document.getElementById("give-up").addEventListener("click", () => {
    R.answers[R.index] = { given: "", right: false };
    rerender();
  });
}

const sameWord = (a, b) => a.trim().toLowerCase().replace(/[’]/g, "'").replace(/[.,!?]+$/, "") === b.toLowerCase();

function level1Html(word, example, answer, R) {
  return `<section class="card stack word-card">
      <p class="muted">単語の意味と例文を頭の中で言えるか確かめてみましょう！</p>
      <div class="word-row">
        <p class="word" lang="en">${esc(word.word)}</p>
        ${sayIcon(speakable(word.word))}
      </div>
      ${example ? `<div class="word-examples one">${sayIcon(example.en)}<div>
        ${exTag(example)}<p class="en" lang="en">${exampleHtml(example)}</p>
        ${R.revealed && example.ja ? `<p class="ja">${esc(example.ja)}</p>` : ""}
      </div></div>` : ""}
      ${R.revealed ? `<p class="meaning reveal">${noteHtml(word.meaning)}</p>` : ""}
    </section>
    ${R.revealed
      ? `<p class="muted center">分かりましたか？</p>
        <div class="card-actions">
          <button type="button" class="btn secondary" data-self="no">わからなかった</button>
          <button type="button" class="btn" data-self="yes">わかった！</button>
        </div>`
      : `<button type="button" class="btn block" id="reveal">意味を見る</button>`}`;
}

function level2Html(word, example, answer, R) {
  const form = example.form;
  const letters = `${form[0]} ${"_ ".repeat(form.length - 1).trim()}`;
  let verdict = "";
  if (answer) {
    const close = !answer.right && sameWord(answer.given, speakable(word.word));
    verdict = `<section class="card stack" id="verdict" aria-live="polite">
      <p class="verdict ${answer.right ? "right" : "wrong"}">${answer.right ? "⭕ 正解！" : close ? "🔺 おしい！" : "❌ ざんねん"}</p>
      ${close ? `<p>この文では <b lang="en">${esc(form)}</b> になります（<span lang="en">${esc(speakable(word.word))}</span> の形が変わっています）。</p>` : ""}
      ${answer.right || close ? "" : `<p>正解は <b lang="en">${esc(form)}</b></p>`}
      <p><b lang="en">${esc(word.word)}</b>　${esc(word.meaning)}</p>
    </section>
    <div class="lesson-nav"><span></span><button type="button" class="btn" id="next">${R.index === R.questions.length - 1 ? "結果を見る" : "次へ"}</button></div>`;
  }
  return `<section class="card stack">
      <p class="muted">日本語に合うように、空いているところに入る単語を書こう</p>
      ${exTag(example)}${example.ja ? `<p class="question-ja">${esc(example.ja)}</p>` : ""}
      ${answer
        ? `<div class="word-examples one">${sayIcon(example.en)}<p class="question" lang="en">${exampleHtml(example)}</p></div>`
        : `<p class="question" lang="en">${exampleHtml(example, { blank: true })}</p>`}
      ${answer ? "" : `${R.hint ? `<p class="muted small" id="hint-line">ヒント：<span lang="en" class="letters">${esc(letters)}</span>（${form.length}文字）</p>` : ""}
        <form id="fill" class="stack">
          <input type="text" name="answer" lang="en" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="単語を入力">
          <button class="btn block" type="submit">答え合わせ</button>
          <div class="card-actions">
            ${R.hint ? "" : `<button type="button" class="btn ghost" id="hint">ヒントを見る</button>`}
            <button type="button" class="btn ghost" id="give-up">答えを見る</button>
          </div>
        </form>`}
      ${answer && !answer.right && answer.given ? `<p class="muted small">あなたの答え：<span lang="en">${esc(answer.given)}</span></p>` : ""}
    </section>${verdict}`;
}

function renderReviewResult(level, rerender) {
  const R = state.review;
  const known = R.questions.filter((_, i) => R.answers[i]?.right).map((q) => q.word);
  const missed = R.questions.filter((_, i) => !R.answers[i]?.right).map((q) => q.word);
  app.innerHTML = `${topbar(level === 1 ? "Level 1 ・ 単語の復習" : "Level 2 ・ 例文に入れる", "#/review")}
    <main class="wrap stack">
      <section class="card stack" style="text-align:center">
        <p style="font-size:40px">${missed.length ? "👏" : "🎉"}</p>
        <p class="score">${known.length} / ${R.questions.length}<small> ${level === 1 ? "語わかった" : "問正解"}</small></p>
      </section>
      ${missed.length ? `<section class="card stack">
        <h3>${level === 1 ? "わからなかった単語" : "まちがえた単語"}</h3>
        <ul class="plain-list">${missed.map((w) => `<li><b lang="en">${esc(w.word)}</b>　${esc(w.meaning)}</li>`).join("")}</ul>
      </section>` : ""}
      ${known.length ? `<section class="card stack" id="known-box">
        <h3>${level === 1 ? "わかった" : "正解した"}単語（${known.length} 語）</h3>
        <p class="muted small">復習カードから外す単語にチェックを入れてください。チェックを外した単語は、復習カードに残ります。</p>
        <ul class="pick-list">${known.map((w) => `<li><label>
          <input type="checkbox" data-key="${esc(w.key)}" checked>
          <span><b lang="en">${esc(w.word)}</b><span class="muted small">${esc(w.meaning)}</span></span>
        </label></li>`).join("")}</ul>
        <button type="button" class="btn secondary block" id="remove-known">チェックした単語を外す</button>
      </section>` : ""}
      <button type="button" class="btn block" id="again">もう一度</button>
      <a class="btn ghost block" href="#/review">復習にもどる</a>
    </main>`;

  document.getElementById("remove-known")?.addEventListener("click", async (event) => {
    event.target.disabled = true;
    const box = document.getElementById("known-box");
    const picked = [...box.querySelectorAll("input[data-key]:checked")].map((input) => input.dataset.key);
    for (const key of picked) await setReview(key, false);
    const kept = known.length - picked.length;
    box.innerHTML = `<p>${picked.length ? `${picked.length} 語を復習カードから外しました。` : "外した単語はありません。"}${kept ? `${kept} 語は復習カードに残しました。` : ""}</p>`;
  });
  document.getElementById("again").addEventListener("click", () => {
    state.review = null;
    if (!reviewWords().length) {
      location.hash = "#/review";
      return;
    }
    rerender();
  });
}

// ---------- phrases ----------
// The フレーズ book (public/phrases/book.js), in weeks. Each phrase is a card
// (the English first; a tap shows the 日本語訳 and 解説), then up to two
// 瞬間英作文 with its chunk, typed and checked like the grammar answers. Ten
// phrases make a set, and each set ends with a short test. Phrases put in
// from their card, or missed in a test, make the フレーズ復習 list.

const inPhraseReview = (key) => state.me.phraseReview.some((r) => r.key === key);
const phraseTestResult = (week, number) => state.me.phraseTests[phraseSetKey(week, number)];
const findPhraseSet = (week, number) => phraseSets(week).find((s) => s.number === number);

async function setPhraseReview(key, on, source = "check") {
  if (on && !inPhraseReview(key)) state.me.phraseReview.push({ key, source, added_at: new Date().toISOString() });
  if (!on) state.me.phraseReview = state.me.phraseReview.filter((r) => r.key !== key);
  try {
    await api("/api/phrases/review", { method: "POST", body: { key, on, source } });
  } catch (error) {
    toast(error.message);
  }
}

// Sets with a test, and how many of them are done (for the week tiles and home).
function phraseTestCount(weeks) {
  const sets = weeks.flatMap((week) => phraseSets(week).filter(testSize).map((s) => ({ week, number: s.number })));
  return { done: sets.filter((s) => phraseTestResult(s.week, s.number)).length, total: sets.length };
}

function renderPhrases(week, setNumber, mode) {
  if (week && setNumber && mode === "test") return renderPhraseTest(Number(week), Number(setNumber));
  if (week && setNumber) return renderPhraseSet(Number(week), Number(setNumber));
  if (week) return renderPhraseWeek(Number(week));

  const weeks = phraseWeeks().map((week) => {
    const tests = phraseTestCount([week]);
    return `<a class="lesson-card" href="#/phrases/${week}">
      <div><b>Week ${week}</b><span class="muted small">${esc(weekTitle(week))}${weekTitle(week) ? " ・ " : ""}${weekPhrases(week).length} フレーズ</span></div>
      ${tests.total ? `<span class="badge ${tests.done ? "" : "start"}">テスト ${tests.done} / ${tests.total}</span>` : ""}
    </a>`;
  });
  const last = lastResume("phrase");
  const lastSet = last && findPhraseSet(last.week, last.number);
  app.innerHTML = `${topbar("フレーズ")}
    <main class="wrap stack">
      ${lastSet ? resumeCard(`#/phrases/${last.week}/${last.number}`, `Week ${last.week} ・ ${esc(lastSet.title)}`, last.of) : ""}
      ${weeks.length ? weeks.join("") : emptyState("フレーズは準備中です。<br>用意ができたら、ここに出てきます。")}
    </main>`;
}

// "7" when every day has seven phrases, "7〜8" when some have more.
function dayRange(sets) {
  const sizes = sets.map((set) => set.phrases.length);
  const [low, high] = [Math.min(...sizes), Math.max(...sizes)];
  return low === high ? `${low}` : `${low}〜${high}`;
}

function renderPhraseWeek(week) {
  state.phraseTest = null;
  const sets = phraseSets(week);
  const byDay = sets.length && sets[0].phrases[0].day;
  app.innerHTML = `${topbar(`フレーズ ・ Week ${week}`, "#/phrases")}
    <main class="wrap stack">
      ${weekTitle(week) ? `<h2 class="week-theme">${esc(weekTitle(week))}</h2>` : ""}
      <p class="muted">${byDay ? `1日${dayRange(sets)}フレーズずつ` : "10フレーズずつ"}、意味と使い方を見て、瞬間英作文をします。最後にテスト（${TEST_SIZE}問）。まちがえたフレーズは「フレーズ復習」に入ります。</p>
      ${sets.length ? "" : emptyState("この週のフレーズは、まだありません。")}
      ${sets.map((set) => {
        const result = phraseTestResult(week, set.number);
        const sub = byDay ? `${setNumbers(set)} ・ ${esc(setScenes(set))}` : `<span lang="en">${set.phrases.map((p) => esc(p.en)).join(" ・ ")}</span>`;
        const place = resumeAt("phrase", phraseSetKey(week, set.number));
        return `<a class="lesson-card" href="#/phrases/${week}/${set.number}">
          <div><b>${esc(set.title)}</b><span class="muted small">${sub}</span></div>
          ${place ? `<span class="badge start">つづきから ${esc(place.of)}</span>`
            : result ? `<span class="badge">✓ ${result.best} / ${result.total}</span>` : `<span class="badge start">はじめる</span>`}
        </a>`;
      }).join("")}
    </main>`;
}

// A 瞬間英作文 as a grammar write step, so it is checked and explained the same
// way. Its hint, the 塊 and the drill's own hint, waits behind a ヒントを見る button.
// A 塊 of several lines (one form per line) keeps its lines, lined up under 塊：.
const chunkHint = (chunk) => `塊：${chunk.split("\n").join("\n　　")}`;
const drillStep = (phrase, drill, { label = "瞬間英作文" } = {}) => ({
  type: "write",
  label,
  ja: drill.ja,
  answers: drill.answers,
  hint: [phrase.chunk ? chunkHint(phrase.chunk) : `フレーズ：${phrase.en}`, drill.hint].filter(Boolean).join("\n"),
  hintLater: true,
  say: drill.answers[0],
});

function reviewButtonHtml(phrase) {
  return inPhraseReview(phrase.key)
    ? `<button type="button" class="btn secondary block review-on" id="phrase-review" aria-pressed="true" aria-describedby="review-off-note">✓ 復習タブに入っています</button>
      <p class="muted small center" id="review-off-note">もう一度押すと、復習タブから外せます</p>`
    : `<button type="button" class="btn ghost block review-add" id="phrase-review" aria-pressed="false">＋ 復習タブに入れる</button>`;
}

// The 和訳 always on one line: its size follows its length and the card's
// width (wide letters count 1, narrow ones about half).
function oneLine(text) {
  const width = [...text].reduce((n, ch) => n + (/[\x00-\x7f]/.test(ch) ? 0.55 : 1), 0);
  return `class="meaning one-line" style="--chars:${width.toFixed(1)}"`;
}

// A phrase card: its number (#12) and, for a 返答例, the line it answers, so
// it can't be taken for a question; the English first, and a tap (or 次へ)
// shows the 和訳, 塊, 解説 and 例文.
function phraseCardHtml(phrase, revealed) {
  const head = `<div class="phrase-head">
      ${phrase.no ? `<span class="phrase-no">#${phrase.no}</span>` : ""}
      ${phrase.replyTo ? `<span class="reply-tag">💬 返答例</span>` : ""}
      ${phrase.scene ? `<span class="scene">${esc(phrase.scene)}</span>` : ""}
    </div>
    ${phrase.replyTo ? `<p class="reply-to">「<span lang="en">${esc(phrase.replyTo.en)}</span>」（#${phrase.replyTo.no}）への返答例</p>` : ""}`;
  if (!revealed) {
    return `<section class="card stack word-card phrase-card word-front" id="phrase-front" role="button" tabindex="0" aria-label="日本語訳と解説を見る">
      ${head}
      <div class="word-row center-row">
        <p class="phrase-en" lang="en">${esc(phrase.en)}</p>
        ${sayIcon(phrase.say)}
      </div>
      <p class="hint">タップするか「次へ」で、日本語訳と解説を見る</p>
    </section>`;
  }
  return `<section class="card stack word-card phrase-card">
    ${head}
    <div class="word-row">
      <p class="phrase-en" lang="en">${esc(phrase.en)}</p>
      ${sayIcon(phrase.say)}
    </div>
    <p ${oneLine(phrase.ja)}>${esc(phrase.ja)}</p>
    ${phrase.chunk ? `<div class="chunk-box"><p class="label">塊</p><p class="chunk" lang="en">${noteHtml(phrase.chunk)}</p>
      ${phrase.chunkJa ? `<p class="chunk-ja">${noteHtml(phrase.chunkJa)}</p>` : ""}</div>` : ""}
    ${phrase.note ? `<div class="phrase-note"><p class="label">解説</p><p>${noteHtml(phrase.note)}</p></div>` : ""}
    ${phrase.example ? `<div class="phrase-example"><p class="label">例文</p>
      <div class="example-row">
        <div><p class="en" lang="en">${esc(phrase.example.en)}</p><p class="ja">${esc(phrase.example.ja)}</p></div>
        ${sayIcon(phrase.example.en)}
      </div>
    </div>` : ""}
    <div>${speedControl()}</div>
    ${reviewButtonHtml(phrase)}
  </section>`;
}

// Steps for a run of phrases: each card, then its 瞬間英作文.
const phraseSteps = (phrases) =>
  phrases.flatMap((phrase) => [
    { kind: "card", phrase },
    ...phrase.drills.map((drill) => ({ kind: "drill", phrase, drill, step: drillStep(phrase, drill, { label: "英語にしてみよう" }) })),
  ]);

// Plays a run of phrase steps (a set, or a フレーズ復習 round): P is
// { steps, index, revealed, answers }. finish() runs after the last step.
// drillName ("瞬間英作文", or "復習テスト" in the review) heads the drills: a
// banner says which part the student is in, and the button on a card says
// where it goes next, so the switch from a card to its drills is plain.
function renderPhraseSteps(P, { title, back, again, finishLabel, finish, drillName = "瞬間英作文" }) {
  const step = P.steps[P.index];
  const { phrase } = step;
  const phrases = [...new Set(P.steps.map((s) => s.phrase))];
  const answer = P.answers[P.index];
  const last = P.index === P.steps.length - 1;
  const following = P.steps[P.index + 1];
  if (step.kind === "card") shownAnswer = null;
  const banner = step.kind === "card"
    ? `<p class="mode-banner learn">📖 フレーズを覚えよう</p>`
    : `<div class="mode-banner drill"><b>✏️ ${esc(drillName)}${phrase.drills.length > 1 ? ` ${step.drill.n + 1} / ${phrase.drills.length}` : ""}</b>
        <span>いま見たフレーズの塊を使って、英語で書こう</span></div>`;
  const body = step.kind === "card" ? phraseCardHtml(phrase, P.revealed[P.index]) : questionStepHtml(step.step, answer);
  const showNext = step.kind === "card" || (answer && !answer.judging);
  const nextLabel = step.kind === "card" && !P.revealed[P.index] ? "次へ"
    : last ? finishLabel
    : following.kind === "drill" && step.kind === "card" ? `${drillName}へ →`
    : following.kind === "card" ? "次のフレーズへ"
    : "次へ";

  app.innerHTML = `${topbar(title, back)}
    <main class="wrap stack">
      <div class="lesson-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${P.steps.length}" aria-valuenow="${P.index + 1}">
        <div class="bar"><i style="width:${Math.round(((P.index + 1) / P.steps.length) * 100)}%"></i></div>
        <span class="counter">${phrases.indexOf(phrase) + 1} / ${phrases.length}</span>
      </div>
      ${banner}
      ${body}
      <div class="lesson-nav">
        ${P.index > 0 ? `<button type="button" class="btn ghost" id="prev">← もどる</button>` : "<span></span>"}
        ${showNext ? `<button type="button" class="btn" id="next">${nextLabel}</button>` : ""}
      </div>
    </main>`;

  const go = (index) => {
    P.index = index;
    again();
    window.scrollTo(0, 0);
  };
  document.getElementById("prev")?.addEventListener("click", () => go(P.index - 1));
  document.getElementById("next")?.addEventListener("click", () => {
    // On a card, 次へ first shows its 和訳 and 解説; the next 次へ moves on.
    if (step.kind === "card" && !P.revealed[P.index]) {
      P.revealed[P.index] = true;
      again();
      return;
    }
    if (last) finish();
    else go(P.index + 1);
  });

  if (step.kind === "card") {
    const front = document.getElementById("phrase-front");
    const turn = () => {
      P.revealed[P.index] = true;
      again();
    };
    front?.addEventListener("click", (event) => {
      if (!event.target.closest("[data-say]")) turn();
    });
    front?.addEventListener("keydown", (event) => {
      if (event.target === front && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        turn();
      }
    });
    bindPhraseReviewButton(phrase);
    return;
  }
  if (answer) {
    document.getElementById("next")?.focus();
    return;
  }
  bindWriteForm((given) => {
    const source = { phrase: phrase.key, drill: step.drill.n };
    P.answers[P.index] = given ? checkTyped(given, step.drill.answers, source, { redraw: again }) : { given, right: false };
    again();
    document.getElementById("verdict")?.scrollIntoView({ block: "nearest" });
  });
}

function bindPhraseReviewButton(phrase) {
  const button = document.getElementById("phrase-review");
  button?.addEventListener("click", () => {
    const on = !inPhraseReview(phrase.key);
    setPhraseReview(phrase.key, on);
    toast(on ? "フレーズ復習に入れました" : "フレーズ復習から外しました");
    document.getElementById("review-off-note")?.remove();
    button.outerHTML = reviewButtonHtml(phrase);
    bindPhraseReviewButton(phrase);
  });
}

// The typed-answer form of a write step: answered(given), with "" for 答えを見る.
function bindWriteForm(answered) {
  const form = document.getElementById("write");
  form.answer.focus();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const given = form.answer.value.trim();
    if (given) answered(given);
  });
  document.getElementById("give-up").addEventListener("click", () => answered(""));
}

function renderPhraseSet(week, number) {
  const set = findPhraseSet(week, number);
  if (!set) return renderPhraseWeek(week);
  const id = phraseSetKey(week, number);
  if (state.phraseSet?.id !== id) {
    const steps = phraseSteps(set.phrases);
    const saved = resumeAt("phrase", id);
    state.phraseSet = { id, steps, index: saved && saved.index < steps.length ? saved.index : 0, revealed: {}, answers: {} };
  }
  const P = state.phraseSet;
  const phrases = [...new Set(P.steps.map((s) => s.phrase))];
  saveResume("phrase", id, P.index
    ? { week, number, index: P.index, of: `${phrases.indexOf(P.steps[P.index].phrase) + 1} / ${phrases.length}` }
    : null);
  const hasTest = testSize(set) > 0;
  renderPhraseSteps(P, {
    title: `Week ${week} ・ ${set.title}`,
    back: `#/phrases/${week}`,
    again: () => renderPhraseSet(week, number),
    finishLabel: hasTest ? "テストへ" : "おわり",
    finish: () => {
      saveResume("phrase", id, null);
      state.phraseSet = null;
      state.phraseTest = null;
      location.hash = hasTest ? `#/phrases/${week}/${number}/test` : `#/phrases/${week}`;
    },
  });
}

// ---------- phrase test ----------
// TEST_SIZE 瞬間英作文 from the set, with the chunk as a hint behind a button.
// A miss puts its phrase in フレーズ復習.

function renderPhraseTest(week, number) {
  const set = findPhraseSet(week, number);
  if (!set || !testSize(set)) return renderPhraseWeek(week);
  const id = phraseSetKey(week, number);
  if (state.phraseTest?.id !== id) {
    const questions = shuffle(setDrills(set)).slice(0, TEST_SIZE)
      .map(({ phrase, drill }) => ({ phrase, drill, step: drillStep(phrase, drill, { label: "テスト" }) }));
    state.phraseTest = { id, questions, index: 0, answers: [], saved: false };
  }
  const T = state.phraseTest;
  const again = () => {
    renderPhraseTest(week, number);
    window.scrollTo(0, 0);
  };
  const title = `テスト ・ Week ${week} ${set.title}`;
  if (T.index >= T.questions.length) return renderPhraseTestResult(week, set, title, again);

  const { phrase, drill, step } = T.questions[T.index];
  const answer = T.answers[T.index];
  const settled = answer && !answer.judging;
  app.innerHTML = `${topbar(title, `#/phrases/${week}`)}
    <main class="wrap stack">
      <div class="lesson-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${T.questions.length}" aria-valuenow="${T.index + 1}">
        <div class="bar"><i style="width:${Math.round((T.index / T.questions.length) * 100)}%"></i></div>
        <span class="counter">${T.index + 1} / ${T.questions.length}</span>
      </div>
      ${questionStepHtml(step, answer)}
      ${settled && !answer.right ? `<p class="muted small">「<span lang="en">${esc(phrase.en)}</span>」をフレーズ復習に入れました。</p>` : ""}
      ${settled ? `<div class="lesson-nav"><span></span><button type="button" class="btn" id="next">${T.index === T.questions.length - 1 ? "結果を見る" : "次へ"}</button></div>` : ""}
    </main>`;

  if (answer) {
    document.getElementById("next")?.addEventListener("click", () => {
      T.index += 1;
      again();
    });
    document.getElementById("next")?.focus();
    return;
  }
  // A miss (once the answer is final) puts the phrase in フレーズ復習.
  const settle = (a) => !a.right && setPhraseReview(phrase.key, true, "test");
  bindWriteForm((given) => {
    const source = { phrase: phrase.key, drill: drill.n };
    const redraw = () => renderPhraseTest(week, number);
    T.answers[T.index] = given ? checkTyped(given, drill.answers, source, { settled: settle, redraw }) : { given, right: false };
    if (!given) settle(T.answers[T.index]);
    redraw();
    document.getElementById("verdict")?.scrollIntoView({ block: "nearest" });
  });
}

function renderPhraseTestResult(week, set, title, again) {
  const T = state.phraseTest;
  const score = T.answers.filter((a) => a.right).length;
  const missed = [...new Set(T.questions.filter((_, i) => !T.answers[i].right).map((q) => q.phrase))];
  if (!T.saved) {
    T.saved = true;
    const key = phraseSetKey(week, set.number);
    const old = state.me.phraseTests[key];
    state.me.phraseTests[key] = {
      best: Math.max(old?.best ?? 0, score), last: score, total: T.questions.length, times: (old?.times ?? 0) + 1,
    };
    api(`/api/phrases/tests/${week}/${set.number}`, { method: "POST", body: { score } }).catch((error) => toast(error.message));
  }
  const next = findPhraseSet(week, set.number + 1);
  const perfect = score === T.questions.length;
  app.innerHTML = `${topbar(title, `#/phrases/${week}`)}
    <main class="wrap stack">
      <section class="card stack" style="text-align:center">
        <p style="font-size:40px">${perfect ? "🎉" : "👏"}</p>
        <p class="score">${score} / ${T.questions.length}<small> 問正解</small></p>
        <p>${perfect ? "全問正解！" : "まちがえたフレーズは、フレーズ復習に入れました。"}</p>
      </section>
      ${missed.length ? `<section class="card stack">
        <h3>フレーズ復習に入れたフレーズ</h3>
        <ul class="plain-list">${missed.map((p) => `<li><b lang="en">${esc(p.en)}</b>　${esc(p.ja)}</li>`).join("")}</ul>
      </section>` : ""}
      ${next ? `<a class="btn block" href="#/phrases/${week}/${next.number}">次へ（${esc(next.title)}）</a>` : ""}
      <button type="button" class="btn secondary block" id="again">もう一度テスト</button>
      <a class="btn ghost block" href="#/phrases/${week}">Week ${week} にもどる</a>
    </main>`;
  document.getElementById("again").addEventListener("click", () => {
    state.phraseTest = null;
    again();
  });
}

// ---------- phrase review ----------
// The フレーズ復習 list. A round takes up to PHRASE_REVIEW_SESSION of its
// phrases at random: each card, then right away its 瞬間英作文 as a test.

const PHRASE_REVIEW_SESSION = 10;

// A 授業メモ card in the フレーズ復習 list, shaped like a phrase with no 瞬間英作文.
function memoPhrase(key) {
  const card = state.me.noteCards?.[key];
  return card && {
    key, no: null, scene: `📝 ${noteDayLabel(card.day)}`, replyTo: null, en: card.en, say: card.en, ja: card.ja,
    chunk: "", chunkJa: "", note: card.note || "", example: null, drills: [],
  };
}

function reviewPhrases() {
  return state.me.phraseReview.map((r) => {
    const phrase = phraseByKey(r.key) || memoPhrase(r.key);
    return phrase && { ...phrase, source: r.source };
  }).filter(Boolean);
}

function renderPhraseReview(mode) {
  if (mode === "go") return renderPhraseReviewRound();
  state.phraseReviewRound = null;
  const phrases = reviewPhrases();
  app.innerHTML = `${topbar("フレーズ復習")}
    <main class="wrap stack">
      ${phrases.length ? `
        <p class="muted">復習するフレーズ：<b>${phrases.length} こ</b>（1回 ${PHRASE_REVIEW_SESSION} こまで、順番はばらばらに出ます）</p>
        <a class="unit-card" href="#/phrase-review/go">
          <b>復習をはじめる</b>
          <span class="muted small">フレーズを見て意味を確かめたら、その場で同じ塊の復習テスト（英語で書く）</span>
        </a>
        <section class="card stack">
          <h3>フレーズ復習に入っているフレーズ</h3>
          <ul class="review-list">${phrases.map((p) => `<li>
            <div><b lang="en">${esc(p.en)}</b><span class="muted small">${esc(p.ja)}</span></div>
            <span class="badge ${p.source === "test" ? "teacher" : ""}">${p.source === "test" ? "テスト" : "自分で"}</span>
            <button type="button" class="btn ghost small-btn" data-remove="${esc(p.key)}">外す</button>
          </li>`).join("")}</ul>
        </section>`
      : emptyState("まだフレーズ復習がありません。<br>フレーズカードの「復習タブに入れる」を押すか、<br>テストでまちがえたフレーズがここに入ります。")}
    </main>`;
  app.querySelectorAll("[data-remove]").forEach((button) =>
    button.addEventListener("click", async () => {
      await setPhraseReview(button.dataset.remove, false);
      renderPhraseReview();
    }),
  );
}

function renderPhraseReviewRound() {
  if (!state.phraseReviewRound) {
    const phrases = shuffle(reviewPhrases()).slice(0, PHRASE_REVIEW_SESSION);
    if (!phrases.length) {
      location.hash = "#/phrase-review";
      return;
    }
    state.phraseReviewRound = { phrases, steps: phraseSteps(phrases), index: 0, revealed: {}, answers: {}, done: false };
  }
  const P = state.phraseReviewRound;
  if (P.done) return renderPhraseReviewResult(P);
  renderPhraseSteps(P, {
    title: "フレーズ復習",
    back: "#/phrase-review",
    again: renderPhraseReviewRound,
    drillName: "復習テスト",
    finishLabel: "結果を見る",
    finish: () => {
      P.done = true;
      renderPhraseReviewRound();
      window.scrollTo(0, 0);
    },
  });
}

// How the round went, and which phrases to take out of the list: those whose
// 瞬間英作文 were all right are ticked to begin with.
function renderPhraseReviewResult(P) {
  const drills = P.steps.map((s, i) => ({ s, answer: P.answers[i] })).filter(({ s }) => s.kind === "drill");
  const right = drills.filter(({ answer }) => answer?.right).length;
  const allRight = (phrase) => {
    const own = drills.filter(({ s }) => s.phrase === phrase);
    return own.length > 0 && own.every(({ answer }) => answer?.right);
  };
  app.innerHTML = `${topbar("フレーズ復習", "#/phrase-review")}
    <main class="wrap stack">
      <section class="card stack" style="text-align:center">
        <p style="font-size:40px">${right === drills.length ? "🎉" : "👏"}</p>
        ${drills.length ? `<p class="score">${right} / ${drills.length}<small> 問正解</small></p>` : ""}
        <p>${P.phrases.length} フレーズを復習しました。</p>
      </section>
      <section class="card stack" id="known-box">
        <h3>フレーズ復習から外す</h3>
        <p class="muted small">もう大丈夫なフレーズにチェックを入れてください（瞬間英作文が全部正解だったものには、はじめからチェックが入っています）。チェックしないフレーズは、フレーズ復習に残ります。</p>
        <ul class="pick-list">${P.phrases.map((p) => `<li><label>
          <input type="checkbox" data-key="${esc(p.key)}" ${allRight(p) ? "checked" : ""}>
          <span><b lang="en">${esc(p.en)}</b><span class="muted small">${esc(p.ja)}</span></span>
        </label></li>`).join("")}</ul>
        <button type="button" class="btn secondary block" id="remove-known">チェックしたフレーズを外す</button>
      </section>
      <button type="button" class="btn block" id="again">もう一度</button>
      <a class="btn ghost block" href="#/phrase-review">フレーズ復習にもどる</a>
    </main>`;

  document.getElementById("remove-known").addEventListener("click", async (event) => {
    event.target.disabled = true;
    const box = document.getElementById("known-box");
    const picked = [...box.querySelectorAll("input[data-key]:checked")].map((input) => input.dataset.key);
    for (const key of picked) await setPhraseReview(key, false);
    const kept = P.phrases.length - picked.length;
    box.innerHTML = `<p>${picked.length ? `${picked.length} こをフレーズ復習から外しました。` : "外したフレーズはありません。"}${kept ? `${kept} こはフレーズ復習に残しました。` : ""}</p>`;
  });
  document.getElementById("again").addEventListener("click", () => {
    state.phraseReviewRound = null;
    renderPhraseReviewRound();
    window.scrollTo(0, 0);
  });
}

// ---------- pronunciation ----------
// Each Month is a set of phrases for every student, one a day: listen to the
// teacher's お手本, record yourself, then 完了 sends the recording to the
// teacher (to go over in class). Opening a month goes to the first phrase that
// isn't 完了 yet. The teacher's own sentences for this student are a group of their own.

const pronDone = (key) => state.me.pronDone[key];

// The months this student sees and their names (the teacher can give a
// student other ones: phrases.js studentMonths), and whether that was changed.
const myMonths = () => studentMonths(state.me.pronMonths);
const ownMonths = () => !!state.me.pronMonths?.length;

// The phrase to do next: the first one not 完了 in the student's first month, then the next …
function nextPhrase() {
  for (const { month } of myMonths()) {
    const phrases = monthPhrases(month);
    const index = phrases.findIndex((p) => !pronDone(p.key));
    if (index >= 0) return { month, index, count: phrases.length, phrase: phrases[index] };
  }
  return null;
}

const pronDoneToday = () => {
  const start = startOfJapanDay();
  return Object.values(state.me.pronDone).some((d) => new Date(d.done_at) >= start);
};

function renderPron(month) {
  if (month === "own") return renderPronPractice("own");
  // A month this student doesn't have opens the list instead.
  if (month && myMonths().some((m) => m.month === Number(month))) return renderPronPractice(Number(month));

  const own = items("pron");
  const ownDone = own.filter((item) => pronDone(`item/${item.id}`)).length;
  // Month 1〜6, those still to come greyed out; a student given months of their
  // own sees just those.
  const months = ownMonths() ? myMonths().map((m) => m.month) : Array.from({ length: MONTHS }, (_, i) => i + 1);
  const next = nextPhrase();
  app.innerHTML = `${topbar("発音")}
    <main class="wrap stack">
      <p class="muted">お手本を聞いて、自分の声を録音してください。<br>「完了」を押すと録音が先生に届きます。</p>
      ${months.map((m) => {
        // A month this student doesn't have shows as still to come.
        const phrases = myMonths().some((x) => x.month === m) ? monthPhrases(m) : [];
        const label = esc(monthLabel(myMonths(), m));
        if (!phrases.length) return `<div class="lesson-card soon"><div><b>${label}</b><span class="muted small">まだありません</span></div></div>`;
        const done = phrases.filter((p) => pronDone(p.key)).length;
        const badge = done === phrases.length ? `<span class="badge done">✅ 完了</span>`
          : next?.month === m ? `<span class="badge start">${done ? "つづきから" : "はじめる"}</span>`
          : `<span class="badge">${done} / ${phrases.length}</span>`;
        return `<a class="lesson-card" href="#/pron/${m}">
          <div><b>${label}</b><span class="muted small">${phrases.length} 文 ・ 完了 ${done} / ${phrases.length}</span></div>
          ${badge}
        </a>`;
      }).join("")}
      ${own.length ? `<a class="lesson-card" href="#/pron/own">
        <div><b>先生が追加した文</b><span class="muted small">${own.length} 文 ・ 完了 ${ownDone} / ${own.length}</span></div>
        <span class="badge teacher">${own.length} 文</span>
      </a>` : ""}
    </main>`;
}

// The sentences of one month, or the teacher's own ones, as { key, en, ja, usage, tip, audio }.
function pronList(which) {
  if (which === "own") {
    return items("pron").map((item) => ({ key: `item/${item.id}`, en: item.data.text, ja: "", usage: "", tip: item.data.tip }));
  }
  return monthPhrases(which);
}

// ---------- recording ----------

const canRecord = !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
const RECORD_LIMIT = 20; // seconds

function recordingType() {
  for (const type of ["audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg;codecs=opus"]) {
    if (MediaRecorder.isTypeSupported?.(type)) return type;
  }
  return "";
}

// Starts recording; onStop(blob, seconds) runs when it stops.
async function startRecording(onStop) {
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  } catch (error) {
    throw new Error(error?.name === "NotFoundError"
      ? "マイクが見つかりませんでした。"
      : "マイクが使えません。ブラウザの設定で、このページのマイクを「許可」にしてください。");
  }
  const type = recordingType();
  const recorder = new MediaRecorder(stream, { ...(type ? { mimeType: type } : {}), audioBitsPerSecond: 64000 });
  const chunks = [];
  const started = Date.now();
  recorder.addEventListener("dataavailable", (event) => event.data.size && chunks.push(event.data));
  recorder.addEventListener("stop", () => {
    stream.getTracks().forEach((track) => track.stop());
    const mime = (recorder.mimeType || type || "audio/webm").split(";")[0].replace(/^video\//, "audio/");
    onStop(new Blob(chunks, { type: mime }), (Date.now() - started) / 1000);
  });
  recorder.start();
  return recorder;
}

// 完了: sends the recording (or nothing, when this browser can't record).
async function finishPhrase(key, recording) {
  const query = `key=${encodeURIComponent(key)}${recording ? `&seconds=${recording.seconds.toFixed(1)}` : ""}`;
  let response;
  try {
    response = await fetch(`/api/pron/done?${query}`, {
      method: "POST",
      headers: { "Content-Type": recording ? recording.blob.type : "application/json" },
      body: recording ? recording.blob : "{}",
      credentials: "same-origin",
    });
  } catch {
    throw new Error("インターネットにつながっていないようです。");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "送れませんでした。もう一度ためしてください。");
  state.me.pronDone[key] = data.done;
}

const shortDate = (iso) => new Date(iso).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });

function renderPronPractice(which) {
  const list = pronList(which);
  const title = which === "own" ? "発音 ・ 先生が追加した文" : `発音 ・ ${monthLabel(myMonths(), which)}`;
  if (!list.length) {
    app.innerHTML = `${topbar(title, "#/pron")}<main class="wrap stack">${emptyState("まだ練習する文がありません。")}</main>`;
    return;
  }
  // Opening a month starts at the first phrase that isn't 完了 yet.
  if (state.pron.which !== which) {
    const first = list.findIndex((p) => !pronDone(p.key));
    state.pron = { which, index: Math.max(0, first) };
  }
  const index = Math.min(state.pron.index, list.length - 1);
  const item = list[index];
  const note = (text) => esc(text).replace(/\n/g, "<br>");
  const go = (step) => {
    stopAll();
    state.pron.index = index + step;
    renderPronPractice(which);
    window.scrollTo(0, 0);
  };

  app.innerHTML = `${topbar(title, "#/pron")}
    <main class="wrap stack">
      <div class="pager">
        <button class="btn secondary small-btn" data-step="-1" ${index === 0 ? "disabled" : ""}>← 前</button>
        <span class="counter">${index + 1} / ${list.length}</span>
        <button class="btn secondary small-btn" data-step="1" ${index === list.length - 1 ? "disabled" : ""}>次 →</button>
      </div>
      <section class="card stack">
        <p class="sentence" lang="en">${esc(item.en)}</p>
        ${item.ja ? `<p class="pron-ja">${esc(item.ja)}</p>` : ""}
        <div class="speak-row start">${sayButton(item.en, "お手本", { src: item.audio })} ${speedControl()}</div>
        ${item.tip ? `<div class="pron-note tip"><p class="label">発音のコツ ・ つなげて読むところ</p><p>${note(item.tip)}</p></div>` : ""}
        ${item.usage ? `<div class="pron-note"><p class="label">使う場面・解説</p><p>${note(item.usage)}</p></div>` : ""}
      </section>
      <section class="card stack record" id="record" aria-live="polite"></section>
    </main>`;

  app.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => go(Number(button.dataset.step))));

  const box = document.getElementById("record");
  let recording = null; // { blob, seconds, url }
  let recorder = null;
  let timer = null;
  let justFinished = false;
  const player = new Audio();

  const doneLine = () => {
    const done = pronDone(item.key);
    if (!done) return "";
    // Handed in before the app: no date or recording here.
    if (done.before_app) return `<p class="done-line">✅ 完了 ・ 先生に提出ずみ（アプリを使う前）</p>`;
    return `<p class="done-line">✅ 完了（${shortDate(done.done_at)}）${done.sent_at ? ` ・ 録音は先生に届いています（${shortDate(done.sent_at)}）` : ""}</p>`;
  };

  const draw = (error = "") => {
    const done = pronDone(item.key);
    const last = index === list.length - 1;
    if (justFinished) {
      box.innerHTML = `
        <p class="finished">✅ 完了しました！${done?.sent_at ? "録音が先生に届きました。" : ""}</p>
        ${last
          ? `<p>${which === "own" ? "先生が追加した文は、全部見ました。" : `${esc(monthLabel(myMonths(), which))} の最後の文です。`}</p><a class="btn block" href="#/">ホームへ</a>`
          : `<button class="btn block" id="next">次の文へ →</button>`}
        <p class="muted small" style="text-align:center">今日の発音はこれでOK。もっとやりたいときは、次の文へ進めます。</p>`;
      document.getElementById("next")?.addEventListener("click", () => go(1));
      return;
    }
    if (!canRecord) {
      box.innerHTML = `
        ${doneLine()}
        <p class="notice">このブラウザでは録音ができません。iPhone は Safari、Android とパソコンは Chrome で開いてください。<br>お手本を聞いて声に出して練習したら、「完了」を押してください。</p>
        ${done ? "" : `<button class="btn block" id="finish">完了</button>`}
        ${error ? `<p class="notice bad" role="alert">${esc(error)}</p>` : ""}`;
    } else if (recorder) {
      box.innerHTML = `
        <p class="label">録音中</p>
        <div style="text-align:center" class="stack">
          <button class="mic listening" id="mic" aria-label="録音を止める">${icons.mic}</button>
          <p class="mic-label" id="rec-time">● 0秒 ・ 読み終わったら、もう一度タップ</p>
        </div>`;
    } else if (recording) {
      box.innerHTML = `
        ${doneLine()}
        <p class="label">録音できました</p>
        <div class="rec-actions">
          <button class="btn secondary" id="play">${icons.speaker}自分の声を聞く</button>
          <button class="btn ghost" id="again">${icons.mic}録音しなおす</button>
        </div>
        <p class="muted small">お手本と聞きくらべてみよう。これでよければ、先生に送ります。</p>
        <button class="btn block" id="finish">${done ? "先生に送りなおす" : "完了して先生に送る"}</button>
        ${error ? `<p class="notice bad" role="alert">${esc(error)}</p>` : ""}`;
    } else {
      box.innerHTML = `
        ${doneLine()}
        <p class="label">${done ? "もう一度録音することもできます" : "自分の声で読んでみよう"}</p>
        <div style="text-align:center" class="stack">
          <button class="mic" id="mic" aria-label="録音する">${icons.mic}</button>
          <p class="mic-label">タップして録音。読み終わったら、もう一度タップ（${RECORD_LIMIT}秒まで）</p>
        </div>
        ${error ? `<p class="notice bad" role="alert">${esc(error)}</p>` : ""}`;
    }
    box.querySelector("#mic")?.addEventListener("click", toggle);
    box.querySelector("#again")?.addEventListener("click", toggle);
    box.querySelector("#play")?.addEventListener("click", () => {
      stopSpeaking();
      player.src = recording.url;
      player.play().catch(() => {});
    });
    box.querySelector("#finish")?.addEventListener("click", async (event) => {
      const button = event.currentTarget;
      button.disabled = true;
      button.textContent = "送っています…";
      try {
        await finishPhrase(item.key, recording);
        justFinished = true;
        draw();
      } catch (err) {
        draw(err.message);
      }
    });
  };

  async function toggle() {
    if (recorder) {
      recorder.stop();
      return;
    }
    stopSpeaking();
    player.pause();
    try {
      recorder = await startRecording((blob, seconds) => {
        clearInterval(timer);
        recorder = null;
        if (recording) URL.revokeObjectURL(recording.url);
        recording = blob.size ? { blob, seconds, url: URL.createObjectURL(blob) } : null;
        draw(blob.size ? "" : "うまく録音できませんでした。もう一度ためしてください。");
      });
    } catch (error) {
      recorder = null;
      draw(error.message);
      return;
    }
    draw();
    const started = Date.now();
    timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - started) / 1000);
      const label = document.getElementById("rec-time");
      if (label) label.textContent = `● ${seconds}秒 ・ 読み終わったら、もう一度タップ`;
      if (seconds >= RECORD_LIMIT && recorder?.state === "recording") recorder.stop();
    }, 250);
  }

  // Leaving the phrase (another phrase or another page) turns the microphone off.
  function stopAll() {
    clearInterval(timer);
    if (recorder?.state === "recording") recorder.stop();
    player.pause();
  }
  window.addEventListener("hashchange", stopAll, { once: true });

  draw();
}

// ---------- grammar ----------

function startGrammar(ids) {
  state.grammar = { queue: shuffle(ids), total: ids.length, right: 0, wrongIds: [], answer: null };
}

function questionHtml(text) {
  return esc(text).replace(/_{2,}/g, '<span class="blank" aria-label="空欄"></span>');
}

function normalizeAnswer(text) {
  return normalizeWords(text).join(" ");
}

// Bold text in lesson explanations is written **like this**.
// [[red]] and {{blue}} color what a beginner should look at.
const paint = (html) =>
  html.replace(/\[\[(.+?)\]\]/g, '<span class="hl">$1</span>').replace(/\{\{(.+?)\}\}/g, '<span class="hl2">$1</span>');
const fmt = (text) => paint(esc(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"));

function renderGrammar(unitId, lessonId) {
  if (unitId === "teacher") return renderTeacherProblems();
  const unit = UNITS.find((u) => u.id === unitId);
  if (unit && lessonId) return renderLesson(unit, lessonId);
  if (unit) return renderUnit(unit);

  const own = items("grammar").length;
  app.innerHTML = `${topbar("文法")}
    <main class="wrap stack">
      ${UNITS.map((u, i) => {
        const ready = u.lessons.filter((l) => l.steps);
        const done = ready.filter((l) => state.me.lessons?.[l.id]).length;
        return `<a class="unit-card" href="#/grammar/${u.id}">
          <span class="label">Unit ${i + 1}</span>
          <b>${esc(u.title)}</b>
          <span class="muted">${esc(u.subtitle)}</span>
          <span class="muted small">${done} / ${u.lessons.length} レッスン完了</span>
        </a>`;
      }).join("")}
      ${own ? `<a class="unit-card teacher-unit" href="#/grammar/teacher">
          <span class="label">From your teacher</span>
          <b>先生からの問題</b>
          <span class="muted">${own} 問</span>
        </a>` : ""}
    </main>`;
}

function renderUnit(unit) {
  app.innerHTML = `${topbar(unit.title, "#/grammar")}
    <main class="wrap stack">
      <p class="muted">${esc(unit.subtitle)}</p>
      ${unit.lessons.map((lesson) => {
        if (!lesson.steps) {
          return `<div class="lesson-card soon"><div><b>${esc(lesson.title)}</b><span class="muted small">${esc(lesson.subtitle)}</span></div><span class="badge waiting">準備中</span></div>`;
        }
        const result = state.me.lessons?.[lesson.id];
        return `<a class="lesson-card" href="#/grammar/${unit.id}/${lesson.id}">
          <div><b>${esc(lesson.title)}</b><span class="muted small">${esc(lesson.subtitle)}</span></div>
          ${result ? `<span class="badge">✓ ${result.best} / ${result.total}</span>` : `<span class="badge start">はじめる</span>`}
        </a>`;
      }).join("")}
    </main>`;
}

// ---------- grammar lesson player ----------
// One step per screen: read an explanation, then answer questions right away.

function startLesson(lessonId) {
  state.lesson = { id: lessonId, index: 0, answers: {}, saved: false };
}

function renderLesson(unit, lessonId) {
  const found = findLesson(lessonId);
  if (!found?.lesson.steps) return renderUnit(unit);
  const { lesson } = found;
  if (state.lesson?.id !== lessonId) startLesson(lessonId);
  const L = state.lesson;
  const steps = lesson.steps;
  const total = questionCount(lesson);
  const back = `#/grammar/${unit.id}`;
  const rerender = () => {
    renderLesson(unit, lessonId);
    window.scrollTo(0, 0);
  };

  if (L.index >= steps.length) return renderLessonResult(unit, lesson, total, rerender);

  const step = steps[L.index];
  const answer = L.answers[L.index];
  const percent = Math.round((L.index / steps.length) * 100);
  let body;
  if (step.type === "explain") body = explainHtml(step);
  else body = questionStepHtml(step, answer);

  app.innerHTML = `${topbar(lesson.title, back)}
    <main class="wrap stack">
      <div class="lesson-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${steps.length}" aria-valuenow="${L.index + 1}">
        <div class="bar"><i style="width:${percent}%"></i></div>
        <span class="counter">${L.index + 1} / ${steps.length}</span>
      </div>
      ${body}
      <div class="lesson-nav">
        ${L.index > 0 ? `<button type="button" class="btn ghost" id="prev">← もどる</button>` : "<span></span>"}
        ${step.type === "explain" || (answer && !answer.judging) ? `<button type="button" class="btn" id="next">${L.index === steps.length - 1 ? "おわり" : "次へ"}</button>` : ""}
      </div>
    </main>`;

  document.getElementById("prev")?.addEventListener("click", () => {
    L.index -= 1;
    rerender();
  });
  document.getElementById("next")?.addEventListener("click", () => {
    L.index += 1;
    rerender();
  });
  if (answer) {
    document.getElementById("next")?.focus();
    return;
  }

  const record = (given, right) => {
    L.answers[L.index] = { given, right };
    renderLesson(unit, lessonId);
    document.getElementById("verdict")?.scrollIntoView({ block: "nearest" });
  };

  if (step.type === "choice") {
    app.querySelectorAll("[data-choice]").forEach((button) =>
      button.addEventListener("click", () => record(button.dataset.choice, button.dataset.choice === step.answer)),
    );
  }

  if (step.type === "order") {
    if (L.order?.index !== L.index) L.order = { index: L.index, pool: shuffleUnlike(step.words), picked: [] };
    const O = L.order;
    const draw = () => {
      app.querySelector("#line").innerHTML = O.picked.length
        ? O.picked.map((i) => `<button type="button" class="chip" data-unpick="${i}" lang="en">${esc(O.pool[i])}</button>`).join("")
        : `<span class="muted small">下の単語をタップして、文を作ろう</span>`;
      app.querySelector("#pool").innerHTML = O.pool
        .map((word, i) => `<button type="button" class="chip" data-pick="${i}" lang="en" ${O.picked.includes(i) ? "disabled" : ""}>${esc(word)}</button>`)
        .join("");
      app.querySelector("#check").disabled = O.picked.length !== O.pool.length;
    };
    app.querySelector(".order").addEventListener("click", (event) => {
      const pick = event.target.closest("[data-pick]");
      const unpick = event.target.closest("[data-unpick]");
      if (pick) O.picked.push(Number(pick.dataset.pick));
      if (unpick) O.picked = O.picked.filter((i) => i !== Number(unpick.dataset.unpick));
      if (pick || unpick) draw();
    });
    app.querySelector("#check").addEventListener("click", () => {
      const given = O.picked.map((i) => O.pool[i]).join(" ");
      record(given, given === step.words.join(" "));
    });
    draw();
  }

  if (step.type === "write") {
    bindWriteForm((given) => {
      const source = { lesson: lessonId, step: L.index };
      const redraw = () => renderLesson(unit, lessonId);
      if (!given) return record("", false);
      L.answers[L.index] = checkTyped(given, step.answers, source, { redraw });
      redraw();
      document.getElementById("verdict")?.scrollIntoView({ block: "nearest" });
    });
  }
}

// Words listed in a step's `highlight` (like am / is / are) are shown in red.
function highlighter(step) {
  if (!step.highlight?.length) return (html) => html;
  const words = new RegExp(`\\b(${step.highlight.join("|")})\\b`, "gi");
  return (html) => html.replace(words, '<span class="hl">$1</span>');
}

function sayIcon(text) {
  const words = plain(text);
  return `<button type="button" class="speak icon-only" data-say="${esc(words)}" aria-label="${esc(words)} を聞く">${icons.speaker}</button>`;
}

// One side of a compare row: an English sentence, its Japanese and its audio.
// Only the first row carries the labels (ふつうの文 / 否定文 …).
function cmpCard(cell, side, label, line) {
  const { en, ja } = typeof cell === "string" ? { en: cell } : cell;
  return `<div class="cmp ${side}"><div>
    ${label ? `<p class="cmp-label">${line(label)}</p>` : ""}
    <p class="en" lang="en">${line(en)}</p>${ja ? `<p class="ja">${line(ja)}</p>` : ""}
  </div>${sayIcon(en)}</div>`;
}

function explainHtml(step) {
  const hl = highlighter(step);
  const line = (text) => hl(fmt(text));
  return `<section class="card stack explain">
    <h2>${line(step.title)}</h2>
    ${(step.text || []).map((p) => `<p>${line(p)}</p>`).join("")}
    ${step.compare ? `<div class="compare">
      ${step.compare.rows.map(([before, after], i) => `<div class="cmp-row">
        ${cmpCard(before, "before", i ? "" : step.compare.labels[0], line)}
        <span class="cmp-arrow" aria-hidden="true">↓</span>
        ${cmpCard(after, "after", i ? "" : step.compare.labels[1], line)}
      </div>`).join("")}
    </div>` : ""}
    ${(step.chips || []).map((group) => `<div class="chip-group ${group.tone || "plain"}">
      ${group.label ? `<p class="chip-label">${line(group.label)}</p>` : ""}
      <ul>${group.items.map((item) => `<li lang="en">${line(item)}</li>`).join("")}</ul>
    </div>`).join("")}
    ${step.table ? `<div class="table-wrap"><table>
      <thead><tr>${step.table.head.map((h) => `<th>${line(h)}</th>`).join("")}</tr></thead>
      <tbody>${step.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${line(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>` : ""}
    ${step.key ? `<p class="key">${[].concat(step.key).map(line).join("<br>")}</p>` : ""}
    ${(step.note || []).map((p) => `<p class="note">${line(p)}</p>`).join("")}
    ${step.examples?.length ? `<ul class="examples">${step.examples.map((ex) => `
      <li>
        ${sayIcon(ex.en)}
        <div><p class="en" lang="en">${line(ex.en)}</p><p class="ja">${line(ex.ja)}</p></div>
      </li>`).join("")}</ul>` : ""}
    ${step.examples?.length || step.compare ? `<div>${speedControl()}</div>` : ""}
  </section>`;
}

// A wrong typed answer, explained: the student's words with the mistakes marked,
// one line per mistake (スペルミス, 文法 …), and the right answer with what
// changed in green. `ai` is the AI's verdict when there is one ({ comment,
// points } or { error }): its points can name a mistake better (childs →
// children is 文法) and say why. Returns null when there is nothing to explain.
const MISTAKE_TAGS = {
  spelling: "スペルミス", grammar: "文法", word: "ちがう単語", extra: "いらない単語", missing: "たりない単語", order: "語順",
  ok: "OK",
};

function mistakesHtml(given, answers, ai) {
  if (!given?.trim()) return null;
  const found = findMistakes(given, answers);
  if (!found.mistakes.length) return null;
  const points = ai?.points || [];
  const mistakes = found.mistakes.map((m, i) => {
    const point = points.find((p) => p.n === i + 1);
    return { ...m, kind: point?.kind || m.type, topic: point?.kind === "grammar" ? point.topic : "", why: point?.why || "" };
  });
  const kinds = mistakes.map((m) => m.kind);
  const head = kinds.every((k) => k === "ok") ? "🔺 おしい！"
    : kinds.every((k) => k === "spelling" || k === "ok") ? "🔺 おしい！スペルミスがあります"
    : kinds.some((k) => k === "grammar" || k === "order") ? "❌ 文法のまちがいがあります"
    : "❌ ざんねん";
  // The words as typed: "I'm" was compared as I + am, but shows as I'm again,
  // marked when either half was wrong.
  const joined = (parts) => parts.reduce((list, p) => {
    const last = list[list.length - 1];
    if (p.word && last?.word && last.word.tok === p.word.tok) last.mark = last.mark || p.mark;
    else list.push({ ...p });
    return list;
  }, []);
  const marked = (p) => (p.caret ? `<span class="m-missing" aria-label="たりない単語">‸</span>`
    : p.mark ? `<span class="${p.mark}">${esc(p.word.src)}</span>` : esc(p.word.src));
  let k = 0;
  const mine = found.order
    ? esc(given)
    : joined(found.steps.map((s) => {
      if (s.type === "same") return { word: s.given, mark: "" };
      const kind = mistakes[k++].kind;
      if (s.type === "missing") return kind === "ok" ? null : { caret: true };
      if (kind === "ok") return { word: s.given, mark: "" };
      return { word: s.given, mark: s.type === "extra" ? "m-extra" : kind === "spelling" ? "m-spell" : "m-wrong" };
    }).filter(Boolean)).map(marked).join(" ");
  const right = found.order
    ? esc(found.answer)
    : joined(found.steps.filter((s) => s.right).map((s) => ({ word: s.right, mark: s.type === "same" ? "" : "m-fix" }))).map(marked).join(" ");
  const items = mistakes.map((m) => {
    let what;
    const note = m.note && m.note !== m.topic ? `<span class="where">（${esc(m.note)}）</span>` : "";
    if (m.type === "order") what = "単語の順番がちがいます";
    else if (m.kind === "ok") {
      what = m.type === "extra" ? `<span lang="en">${esc(m.given)}</span> があっても OK`
        : m.type === "missing" ? `<span lang="en">${esc(m.right)}</span> がなくても OK`
        : `<span lang="en">${esc(m.given)}</span> でも <span lang="en">${esc(m.right)}</span> でも OK`;
    } else if (m.type === "extra") what = `<span lang="en"><s>${esc(m.given)}</s></span> はいりません`;
    else if (m.type === "missing") what = `<span lang="en"><b>${esc(m.right)}</b></span> が入ります<span class="where">${m.after ? `（<span lang="en">${esc(m.after)}</span> のあと）` : "（文のはじめ）"}</span>`;
    else what = `<span lang="en"><s>${esc(m.given)}</s> → <b>${esc(m.right)}</b></span>${note}`;
    const tag = `${MISTAKE_TAGS[m.kind]}${m.topic ? `・${esc(m.topic)}` : ""}`;
    return `<li><span class="mtag ${m.kind}">${tag}</span><span>${what}${m.why ? `<span class="why">${esc(m.why)}</span>` : ""}</span></li>`;
  });
  const comment = ai?.comment ? `<p class="ai-comment">💡 ${esc(ai.comment)}</p>` : "";
  const aiNote = ai?.error ? `<p class="ai-note">${esc(ai.error)}</p>`
    : ai?.comment || points.some((p) => p.why) ? `<p class="ai-note">判定と説明は AI がしています</p>`
    : "";
  return {
    head,
    mine: `<p class="muted small">あなたの答え</p><p class="your-answer" lang="en">${mine}</p>`,
    list: `${comment}<ul class="mistakes">${items.join("")}</ul>${aiNote}`,
    right: `<p>正解は <b lang="en">${right}</b></p>`,
  };
}

// Checks a typed answer. It is right when it matches one of the answers.
// Otherwise, with AI on, the AI decides: another good way to say it (the same
// meaning, correct English, using the chunk or grammar being practised) is
// right too, and for a wrong one it explains the mistakes. While the AI
// thinks, the answer is { judging: true } and the screen says so; settled()
// runs once the answer is final (at once, or when the AI answers), then
// redraw() shows it if it is still on screen. source is { lesson, step },
// { phrase, drill } or { item }.
let shownAnswer = null;

function checkTyped(given, answers, source, { settled = () => {}, redraw }) {
  const answer = { given, right: answers.some((a) => normalizeAnswer(a) === normalizeAnswer(given)) };
  if (answer.right || !state.me?.ai) {
    settled(answer);
    return answer;
  }
  answer.judging = true;
  api("/api/explain", { method: "POST", body: { ...source, given } })
    .then((r) => {
      answer.ai = r;
      answer.right = !!r.acceptable;
    })
    .catch((error) => {
      answer.ai = { error: error.status === 429 ? error.message : "AI に確認できなかったので、教材の答えで判定しました。" };
    })
    .finally(() => {
      answer.judging = false;
      settled(answer);
      if (shownAnswer !== answer) return;
      redraw();
      document.getElementById("verdict")?.scrollIntoView({ block: "nearest" });
    });
  return answer;
}

// The verdict of a typed answer: { tone, head, body, mine }. mine, when set,
// is the student's answer with its mistakes marked.
function typedVerdict(answer, answers) {
  if (answer.judging) {
    return { tone: "judging", head: `<span class="spinner" aria-hidden="true"></span>答えを判定中…`, body: "", mine: null };
  }
  if (answer.right) {
    if (!answer.ai?.acceptable) return { tone: "right", head: "⭕ 正解！", body: "", mine: null };
    return {
      tone: "right",
      head: "⭕ これもOK！",
      body: `<p class="ai-comment">💡 ${esc(answer.ai.comment || "この言い方も正解です。")}</p>
        <p>教材の答え：<b lang="en">${esc(findMistakes(answer.given, answers).answer)}</b></p>
        <p class="ai-note">判定は AI がしています</p>`,
      mine: null,
    };
  }
  const explained = mistakesHtml(answer.given, answers, answer.ai);
  if (!explained) return { tone: "wrong", head: "❌ ざんねん", body: `<p>正解は <b lang="en">${esc(answers[0])}</b></p>`, mine: null };
  return {
    tone: "wrong",
    head: explained.head,
    body: `<div id="mistakes" class="stack">${explained.list}</div>${explained.right}`,
    mine: `<div id="mine">${explained.mine}</div>`,
  };
}

function questionStepHtml(step, answer) {
  const typed = answer && step.type === "write" ? typedVerdict(answer, step.answers) : null;
  shownAnswer = typed ? answer : null;
  const verdict = !answer ? "" : typed ? `
    <section class="card stack" id="verdict" aria-live="polite">
      <p class="verdict ${typed.tone}" id="verdict-head">${typed.head}</p>
      ${typed.body}
      ${answer.judging ? "" : `${step.say ? `<div>${sayButton(step.say, "正解を聞く")}</div>` : ""}
        ${step.why ? `<p class="muted">${fmt(step.why)}</p>` : ""}`}
    </section>` : `
    <section class="card stack" id="verdict" aria-live="polite">
      <p class="verdict ${answer.right ? "right" : "wrong"}">${answer.right ? "⭕ 正解！" : "❌ ざんねん"}</p>
      ${answer.right ? "" : `<p>正解は <b lang="en">${esc(correctAnswer(step))}</b></p>`}
      ${step.why ? `<p class="muted">${fmt(step.why)}</p>` : ""}
    </section>`;

  if (step.type === "choice") {
    return `<section class="card stack">
      ${step.ja ? `<p class="muted">${esc(step.ja)}</p>` : ""}
      <p class="question" lang="en">${questionHtml(step.q)}</p>
      <div class="choices">${step.choices.map((c) => {
        let cls = "";
        if (answer && c === step.answer) cls = "right";
        else if (answer && c === answer.given) cls = "wrong";
        return `<button class="choice ${cls}" data-choice="${esc(c)}" lang="en" ${answer ? "disabled" : ""}>${esc(c)}</button>`;
      }).join("")}</div>
    </section>${verdict}`;
  }

  if (step.type === "order") {
    return `<section class="card stack">
      <p class="label">並べかえ</p>
      <p class="question-ja">${esc(step.ja)}</p>
      ${answer
        ? `<p class="question" lang="en">${esc(answer.given)}${esc(step.end || "")}</p>`
        : `<div class="order stack">
            <div class="answer-line" id="line"></div>
            <div class="chips" id="pool"></div>
            <button type="button" class="btn block" id="check" disabled>答え合わせ</button>
          </div>`}
    </section>${verdict}`;
  }

  // write: label, hint and say (the answer read aloud) can be set by the step;
  // with hintLater the hint waits behind a ヒントを見る button (tests).
  const hint = step.hint && !answer && step.hintLater
    ? `<details class="hint-box"><summary>ヒントを見る</summary><p>${noteHtml(step.hint)}</p></details>`
    : step.hint ? `<p class="muted small">ヒント：${noteHtml(step.hint)}</p>` : "";
  return `<section class="card stack">
    <p class="label">${esc(step.label || "英語にしてみよう")}</p>
    <p class="question-ja">${esc(step.ja)}</p>
    ${hint}
    ${answer
      ? typed.mine || `<p class="question" lang="en">${esc(answer.given || "（答えを見た）")}</p>`
      : `<form id="write" class="stack">
          <input type="text" name="answer" lang="en" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="英語で入力">
          <button class="btn block" type="submit">答え合わせ</button>
          <button class="btn ghost block" type="button" id="give-up">答えを見る</button>
        </form>`}
  </section>${verdict}`;
}

function correctAnswer(step) {
  if (step.type === "choice") return step.answer;
  if (step.type === "order") return step.words.join(" ") + (step.end || "");
  return step.answers[0];
}

// Shuffles words for a 並べかえ question, never into the right order.
function shuffleUnlike(words) {
  for (let tries = 0; tries < 10; tries++) {
    const pool = shuffle(words);
    if (pool.join(" ") !== words.join(" ")) return pool;
  }
  return [...words].reverse();
}

function renderLessonResult(unit, lesson, total, rerender) {
  const L = state.lesson;
  const right = Object.values(L.answers).filter((a) => a.right).length;
  if (!L.saved) {
    L.saved = true;
    const before = state.me.lessons?.[lesson.id];
    state.me.lessons = {
      ...state.me.lessons,
      [lesson.id]: { best: Math.max(before?.best ?? 0, right), last: right, total, times: (before?.times ?? 0) + 1 },
    };
    api(`/api/lessons/${lesson.id}`, { method: "POST", body: { score: right } }).catch((error) => toast(error.message));
  }
  const wrongSteps = lesson.steps.map((s, i) => [s, L.answers[i]]).filter(([s, a]) => s.type !== "explain" && !a?.right);

  app.innerHTML = `${topbar(lesson.title, `#/grammar/${unit.id}`)}
    <main class="wrap stack">
      <div class="card empty stack">
        <p style="font-size:40px">${right === total ? "🎉" : "👏"}</p>
        <p><b>${esc(lesson.title)} のレッスン、おつかれさま！</b></p>
        <p class="score">${right} / ${total}<small> 問正解</small></p>
      </div>
      ${wrongSteps.length ? `<section class="card stack">
        <h3>まちがえた問題</h3>
        ${wrongSteps.map(([s]) => `<div class="fix"><p class="muted small">${esc(s.ja || "")}</p><p lang="en"><b>${esc(correctAnswer(s))}</b></p>${s.why ? `<p class="muted small">${fmt(s.why)}</p>` : ""}</div>`).join("")}
      </section>` : ""}
      <button type="button" class="btn block" id="restart">もう一度やる</button>
      <a class="btn secondary block" href="#/grammar/${unit.id}">${esc(unit.title)} にもどる</a>
    </main>`;
  document.getElementById("restart").addEventListener("click", () => {
    startLesson(lesson.id);
    rerender();
  });
}

function renderTeacherProblems() {
  const list = items("grammar");
  if (!list.length) {
    app.innerHTML = `${topbar("先生からの問題", "#/grammar")}<main class="wrap stack">${emptyState("まだ文法の問題がありません。<br>先生が追加すると、ここに出てきます。")}</main>`;
    return;
  }
  if (!state.grammar) startGrammar(list.map((q) => q.id));
  const g = state.grammar;
  const item = list.find((q) => q.id === g.queue[0]);

  if (!item) {
    app.innerHTML = `${topbar("先生からの問題", "#/grammar")}
      <main class="wrap stack">
        <div class="card empty stack">
          <p style="font-size:40px">${g.right === g.total ? "🎉" : "👏"}</p>
          <p class="score">${g.right} / ${g.total}<small> 問正解</small></p>
          ${g.wrongIds.length ? `<button class="btn block" id="retry-wrong">まちがえた ${g.wrongIds.length} 問をもう一度</button>` : ""}
          <button class="btn secondary block" id="retry-all">最初から</button>
        </div>
      </main>`;
    document.getElementById("retry-wrong")?.addEventListener("click", () => {
      startGrammar(g.wrongIds);
      renderTeacherProblems();
    });
    document.getElementById("retry-all").addEventListener("click", () => {
      startGrammar(list.map((q) => q.id));
      renderTeacherProblems();
    });
    return;
  }

  const d = item.data;
  const answered = g.answer;
  const isRight = answered?.right;
  if (!g.choiceOrder || g.choiceOrder.id !== item.id) {
    g.choiceOrder = { id: item.id, choices: shuffle(d.choices || []) };
  }
  const choices = g.choiceOrder.choices;
  // Typed answers are judged and explained like the lessons' (the AI may find
  // another right way to say it); picked ones just show the right choice.
  const accepted = d.answer.split("/");
  const verdict = answered && !choices.length ? typedVerdict(answered, accepted) : null;
  shownAnswer = verdict ? answered : null;
  const done = g.total - g.queue.length;

  app.innerHTML = `${topbar("先生からの問題", "#/grammar")}
    <main class="wrap stack">
      <p class="counter">${done + 1} / ${g.total}</p>
      <section class="card stack">
        <p class="question" lang="en">${questionHtml(d.question)}</p>
        ${choices.length
          ? `<div class="choices">${choices.map((c) => {
              let cls = "";
              if (answered) {
                if (c === d.answer) cls = "right";
                else if (c === answered.given) cls = "wrong";
              }
              return `<button class="choice ${cls}" data-choice="${esc(c)}" lang="en" ${answered ? "disabled" : ""}>${esc(c)}</button>`;
            }).join("")}</div>`
          : `<form id="typed" class="stack">
              <input type="text" name="answer" lang="en" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="答えを入力" ${answered ? `value="${esc(answered.given)}" disabled` : ""}>
              ${answered ? "" : `<button class="btn block" type="submit">答え合わせ</button>`}
            </form>`}
      </section>
      ${verdict ? `
        <section class="card stack" id="verdict" aria-live="polite">
          <p class="verdict ${verdict.tone}" id="verdict-head">${verdict.head}</p>
          ${verdict.mine || ""}
          ${verdict.body}
          ${answered.judging ? "" : `${d.explanation ? `<p class="muted">${esc(d.explanation)}</p>` : ""}
            <button class="btn block" id="next">次へ</button>`}
        </section>` : answered ? `
        <section class="card stack" id="verdict" aria-live="polite">
          <p class="verdict ${isRight ? "right" : "wrong"}">${isRight ? "⭕ 正解！" : "❌ ざんねん"}</p>
          ${isRight ? "" : `<p>正解は <b lang="en">${esc(d.answer)}</b></p>`}
          ${d.explanation ? `<p class="muted">${esc(d.explanation)}</p>` : ""}
          <button class="btn block" id="next">次へ</button>
        </section>` : ""}
    </main>`;

  // The score and progress count once the answer is final.
  const settle = (answer) => {
    if (answer.right) g.right += 1;
    else g.wrongIds.push(item.id);
    saveProgress(item.id, { result: answer.right ? "right" : "wrong" });
  };
  const check = (given) => {
    if (choices.length) {
      g.answer = { given, right: given === d.answer };
      settle(g.answer);
    } else {
      g.answer = checkTyped(given.trim(), accepted, { item: item.id }, { settled: settle, redraw: renderTeacherProblems });
    }
    renderTeacherProblems();
    document.getElementById("next")?.focus();
  };
  app.querySelectorAll("[data-choice]").forEach((button) =>
    button.addEventListener("click", () => check(button.dataset.choice)),
  );
  const typed = document.getElementById("typed");
  typed?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (typed.answer.value.trim()) check(typed.answer.value);
  });
  if (!answered) typed?.answer.focus();
  document.getElementById("next")?.addEventListener("click", () => {
    g.queue.shift();
    g.answer = null;
    renderTeacherProblems();
  });
}

// ---------- journal ----------

const DRAFT_KEY = "hina-lessons-draft";
const readDraft = () => {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; } catch { return {}; }
};
const writeDraft = (draft) => {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* private mode */ }
};
const clearDraft = () => {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* private mode */ }
};

const countWords = (text) => (text.match(/[A-Za-z0-9'’-]+/g) || []).length;

// Today's お題: from the teacher's topics for this student, or from the beginner
// list when there are none. Each day has its own shuffled order of every topic;
// 前 and 次 step through it and wrap around at either end, so a skipped topic
// can always be found again. Where the student is in it is remembered on their
// phone for the day.
const TOPIC_KEY = "hina-lessons-topic";

function topicPool() {
  const own = items("topic");
  return own.length ? own.map((t) => ({ ja: t.data.prompt, start: "" })) : TOPICS;
}

// The day's order of the topics: a shuffle that is the same all day.
function topicOrder(day, count) {
  let seed = day | 0; // mulberry32
  const random = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function todaysTopic() {
  const day = japanDayNumber();
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(TOPIC_KEY)); } catch { /* private mode */ }
  if (saved?.day !== day || !Number.isInteger(saved.step)) saved = { day, step: 0, free: false };
  return saved;
}

function saveTopic(topic) {
  try { localStorage.setItem(TOPIC_KEY, JSON.stringify(topic)); } catch { /* private mode */ }
}

function renderJournal(id) {
  if (id) return renderJournalEntry(Number(id));
  const pool = topicPool();
  const topic = todaysTopic();
  const order = topicOrder(topic.day, pool.length);
  const step = ((topic.step % pool.length) + pool.length) % pool.length;
  const current = pool[order[step]];
  const draft = readDraft();

  app.innerHTML = `${topbar("日記")}
    <main class="wrap stack">
      <p class="notice">📝 ここに書いた日記がたまっていくと、それをもとに苦手なところを分析していきます。<b>辞書や翻訳で調べずに</b>、できるだけ長く、がんばって書いてみてください。</p>
      <form id="journal" class="card stack">
        ${topic.free
          ? `<div class="topic-box">
              <p class="label">お題</p>
              <p>お題なしで、自由に書きます。</p>
              <button type="button" class="btn ghost small-btn" id="topic-back">お題にもどる</button>
            </div>`
          : `<div class="topic-box">
              <p class="label">今日のお題</p>
              <p class="topic-ja">${esc(current.ja)}</p>
              ${current.start ? `<p class="muted small">書き出しの例：<span lang="en">${esc(current.start)}</span></p>` : ""}
              <div class="topic-actions">
                ${pool.length > 1 ? `
                  <button type="button" class="btn secondary small-btn" id="topic-prev">← 前のお題</button>
                  <button type="button" class="btn secondary small-btn" id="topic-next">次のお題 →</button>` : ""}
                <button type="button" class="btn ghost small-btn" id="topic-free">お題なしで書く</button>
              </div>
            </div>`}
        <label class="field"><span>英語で書いてみよう</span>
          <textarea name="body" lang="en" rows="9" spellcheck="false" placeholder="${esc(!topic.free && current.start ? current.start : "Today I ...")}">${esc(draft.body || "")}</textarea>
        </label>
        <p class="wordcount" id="wordcount" aria-live="polite">${countWords(draft.body || "")} words</p>
        <p class="notice bad" id="journal-error" role="alert" hidden></p>
        <button class="btn block" type="submit">日記を送る</button>
      </form>
      ${historyHtml()}
    </main>`;

  const form = document.getElementById("journal");
  const save = () => writeDraft({ body: form.body.value });
  form.body.addEventListener("input", () => {
    document.getElementById("wordcount").textContent = `${countWords(form.body.value)} words`;
    save();
  });
  for (const [id, move] of [["topic-prev", -1], ["topic-next", 1]]) {
    document.getElementById(id)?.addEventListener("click", () => {
      saveTopic({ ...topic, step: (step + move + pool.length) % pool.length });
      renderJournal();
    });
  }
  document.getElementById("topic-free")?.addEventListener("click", () => {
    saveTopic({ ...topic, free: true });
    renderJournal();
  });
  document.getElementById("topic-back")?.addEventListener("click", () => {
    saveTopic({ ...topic, free: false });
    renderJournal();
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const body = form.body.value.trim();
    const error = document.getElementById("journal-error");
    if (!body) {
      error.textContent = "日記を書いてから送ってください。";
      error.hidden = false;
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = `<span class="spinner" aria-hidden="true"></span>${state.me.ai ? "添削中…（30秒〜1分ほど）" : "送信中…"}`;
    error.hidden = true;
    try {
      const result = await api("/api/journals", {
        method: "POST",
        body: { topic: topic.free ? "" : current.ja, body },
      });
      clearDraft();
      state.me.journals.unshift(result.journal);
      if (result.ai_error) state.aiError[result.journal.id] = result.ai_error;
      location.hash = `#/journal/${result.journal.id}`;
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      button.disabled = false;
      button.textContent = "日記を送る";
    }
  });
}

function historyHtml() {
  const journals = state.me.journals;
  if (!journals.length) return "";
  return `<section class="card">
    <h3>これまでの日記</h3>
    <ul class="history">
      ${journals.map((j) => `<li><a href="#/journal/${j.id}">
        <div class="badges">
          <span class="muted small">${esc(formatDate(j.created_at))}</span>
          ${j.correction ? `<span class="badge">添削ずみ</span>` : state.me.ai && !j.imported ? `<span class="badge waiting">添削なし</span>` : ""}
          ${j.teacher_comment ? `<span class="badge teacher">先生のコメント</span>` : ""}
        </div>
        <p class="first-line" lang="en">${esc(j.body.split("\n")[0])}</p>
      </a></li>`).join("")}
    </ul>
  </section>`;
}

function renderJournalEntry(id) {
  const j = state.me.journals.find((entry) => entry.id === id);
  if (!j) {
    app.innerHTML = `${topbar("日記")}<main class="wrap stack">${emptyState("日記が見つかりません。")}</main>`;
    return;
  }
  const c = j.correction;
  const aiError = state.aiError[j.id];
  // Spelling fixes only show as the right word in the diary, in blue.
  const spelling = c && spellingMap(c);
  const points = c ? shownPoints(c) : [];

  app.innerHTML = `${topbar(formatDate(j.created_at))}
    <main class="wrap stack">
      ${j.teacher_comment ? `<section class="feedback teacher"><h3>先生からのコメント</h3><p style="white-space:pre-wrap">${esc(j.teacher_comment)}</p></section>` : ""}
      ${c ? `
        <section class="card stack">
          ${j.topic ? `<p class="muted small">お題：${esc(j.topic)}</p>` : ""}
          <h3>添削した日記</h3>
          <p class="journal-text diff" lang="en">${diffHtml(j.body, c.corrected, spelling)}</p>
          ${spelling.size ? `<p class="muted small"><ins class="spell">青い字</ins>は、つづりを直したところです。</p>` : ""}
        </section>
        ${points.length ? `
          <section class="card stack">
            <h3>直したところ</h3>
            ${points.map((fix) => `
              <div class="fix">
                <p class="change" lang="en"><del>${esc(fix.before)}</del><span class="arrow" aria-label="を">→</span><ins>${esc(fix.after)}</ins></p>
                <p>${esc(fix.why)}</p>
              </div>`).join("")}
          </section>` : spelling.size ? "" : `<p class="notice good">まちがいはありませんでした！すばらしい！</p>`}
        <details class="card"><summary>はじめに書いた文を見る</summary><p class="journal-text" lang="en" style="margin-top:10px">${esc(j.body)}</p></details>
      ` : `
        ${state.me.ai && !j.imported ? `<p class="notice ${aiError ? "bad" : ""}">${esc(aiError || "この日記は、まだ添削がありません。")}</p>` : ""}
        <section class="card stack">
          ${j.topic ? `<p class="muted small">お題：${esc(j.topic)}</p>` : ""}
          <p class="journal-text" lang="en">${esc(j.body)}</p>
        </section>
        ${j.imported ? "" : state.me.ai
          ? `<button class="btn block" id="retry">${aiError ? "もう一度ためす" : "添削してもらう"}</button>`
          : j.teacher_comment ? "" : `<p class="muted" style="text-align:center">先生が読んで、コメントをくれます。</p>`}
      `}
      <a class="btn secondary block" href="#/journal">日記のページにもどる</a>
    </main>`;

  const retry = document.getElementById("retry");
  retry?.addEventListener("click", async () => {
    retry.disabled = true;
    retry.innerHTML = `<span class="spinner" aria-hidden="true"></span>添削中…（30秒〜1分ほど）`;
    try {
      const result = await api(`/api/journals/${j.id}/correct`, { method: "POST", body: {} });
      Object.assign(j, result.journal);
      state.aiError[j.id] = result.ai_error;
    } catch (error) {
      state.aiError[j.id] = error.message;
    }
    renderJournalEntry(id);
  });
}
