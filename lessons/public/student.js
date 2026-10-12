// Student app: sign in with a lesson code, then vocab cards and their 復習,
// today's phrase, pronunciation, grammar and the journal with its correction.
import {
  ApiError, api, canListen, compareSpeech, diffHtml, esc, formatDate, icons, japanDayNumber, listen,
  normalizeWords, SPEEDS, getSpeed, setSpeed, speak, startOfJapanDay, stopSpeaking, toast,
} from "./common.js";
import { UNITS, findLesson, plain, questionCount } from "./grammar/lessons.js";
import { bookWeeks, setKey, speakable, splitOnForm, weekWords, wordSets } from "./vocab/words.js";
import { MONTHS, monthPhrases, pronMonths } from "./pron/phrases.js";
import { TOPICS } from "./journal/topics.js";

const app = document.getElementById("app");
const state = {
  me: null, vocab: null, vocabTest: null, review: null, pron: { which: null, index: 0 }, grammar: null, lesson: null, aiError: {},
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
  const [, screen, ...rest] = location.hash.split("/");
  const screens = {
    vocab: renderVocab, review: renderReview, phrases: renderPhrases, pron: renderPron, grammar: renderGrammar, journal: renderJournal,
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
})();

// ---------- shared bits ----------

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

function todaysPhrase() {
  const phrases = items("phrase");
  return phrases.length ? phrases[japanDayNumber() % phrases.length] : null;
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
      location.hash = "#/";
      render();
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      button.disabled = false;
    }
  });
}

// ---------- home ----------

function renderHome() {
  const weeks = [...new Set([...bookWeeks(), ...items("vocab").map((v) => v.data.week || "other")])];
  const sets = weeks.flatMap((week) => wordSets(studentWeekWords(week)).map((s) => setKey(week, s.number)));
  const tested = sets.filter((key) => state.me.vocabTests[key]).length;
  const review = reviewWords().length;
  const phrase = todaysPhrase();
  const shared = pronMonths().flatMap((m) => monthPhrases(m));
  const pronCount = shared.length + items("pron").length;
  const pronTried = shared.filter((p) => state.me.pronResults[p.key]).length
    + items("pron").filter((p) => progress(p.id).best != null).length;
  const grammar = items("grammar");
  const done = wroteToday();

  app.innerHTML = `
    <header class="topbar"><div class="topbar-in">
      <div class="brand"><span class="brand-mark">${asterisk}</span>Hina English</div>
    </div></header>
    <main class="wrap stack">
      <div class="hello">
        <p class="muted">${esc(formatDate(new Date().toISOString()))}</p>
        <h2>こんにちは、${esc(state.me.student.name)}さん</h2>
      </div>
      ${phrase ? `
        <section class="card today" aria-label="今日のフレーズ">
          <p class="label">Today's phrase</p>
          <p class="phrase" lang="en">${esc(phrase.data.phrase)}</p>
          <p class="meaning">${esc(phrase.data.meaning)}</p>
          <div class="speak-row start">${sayButton(phrase.data.phrase)} ${speedControl()}</div>
        </section>` : ""}
      <nav class="tiles" aria-label="メニュー">
        <a class="tile wide ${done ? "done" : ""}" href="#/journal">
          <span class="emoji" aria-hidden="true">${done ? "✅" : "✍️"}</span>
          <div><b>日記を書く</b><p class="muted">${done ? "今日の日記は書けました！" : "今日のお題で、英語の日記を書こう"}</p></div>
        </a>
        <a class="tile" href="#/vocab">
          <span class="emoji" aria-hidden="true">🃏</span><b>単語カード</b>
          <span class="muted">${sets.length ? `テスト ${tested} / ${sets.length}` : "まだありません"}</span>
          ${sets.length ? `<div class="bar"><i style="width:${Math.round((tested / sets.length) * 100)}%"></i></div>` : ""}
        </a>
        <a class="tile" href="#/review">
          <span class="emoji" aria-hidden="true">🔁</span><b>復習</b>
          <span class="muted">${review ? `復習カード ${review} 語` : "まだありません"}</span>
        </a>
        <a class="tile" href="#/phrases">
          <span class="emoji" aria-hidden="true">💬</span><b>フレーズ</b>
          <span class="muted">${items("phrase").length ? `${items("phrase").length} こ` : "まだありません"}</span>
        </a>
        <a class="tile" href="#/pron">
          <span class="emoji" aria-hidden="true">🎤</span><b>発音</b>
          <span class="muted">${pronCount ? `練習した文 ${pronTried} / ${pronCount}` : "まだありません"}</span>
        </a>
        <a class="tile wide" href="#/grammar">
          <span class="emoji" aria-hidden="true">✏️</span>
          <div><b>文法</b><p class="muted">${UNITS.map((u) => u.title).join("・")}${grammar.length ? ` ＋ 先生からの問題 ${grammar.length} 問` : ""}</p></div>
        </a>
      </nav>
      <p class="footer-links"><button type="button" class="btn ghost small-btn" id="logout">ログアウト</button></p>
    </main>`;

  document.getElementById("logout").addEventListener("click", async () => {
    if (!confirm("ログアウトしますか？ もう一度入るときは、レッスンコードが必要です。")) return;
    await api("/api/logout", { method: "POST" }).catch(() => {});
    state.me = null;
    location.hash = "";
    render();
  });
}

// ---------- vocab cards ----------
// A week is the shared 単語帳 plus the teacher's words for this student, in
// sets of ten. Each set: one card per word (with a 復習 checkbox), then a test.
// Missed words and ticked words make the 復習 list.

const WEEKS = 24;
const weekLabel = (week) => (week === "other" ? "そのほか" : `Week ${week}`);
const studentWeekWords = (week) => weekWords(week, state.me.items);
const inReview = (key) => state.me.review.some((r) => r.key === key);
const testResult = (week, number) => state.me.vocabTests[setKey(week, number)];

// Every word this student has, by key, so the 復習 list can find its words.
function wordsByKey() {
  const weeks = new Set([...bookWeeks(), ...items("vocab").map((v) => v.data.week || "other")]);
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

  app.innerHTML = `${topbar("単語カード")}
    <main class="wrap stack">
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
        return `<a class="lesson-card" href="#/vocab/${week}/${set.number}">
          <div><b>${set.number}. ${esc(set.title)}</b><span class="muted small" lang="en">${set.words.map((w) => esc(w.word)).join(" ・ ")}</span></div>
          ${result ? `<span class="badge">✓ ${result.best} / ${result.total}</span>` : `<span class="badge start">はじめる</span>`}
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
  const id = setKey(week, number);
  if (state.vocab?.id !== id) state.vocab = { id, index: 0 };
  const V = state.vocab;
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
  const id = setKey(week, number);
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
    const key = setKey(week, set.number);
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

  app.innerHTML = `${topbar("復習")}
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
      <p class="muted">この単語の意味は？　思いうかべてから「意味を見る」を押そう</p>
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
      ${answer ? "" : `<p class="muted small">ヒント：<span lang="en" class="letters">${esc(letters)}</span>（${form.length}文字）</p>
        ${R.hint ? `<p class="hint-box">元の単語は <b lang="en">${esc(speakable(word.word))}</b>（${esc(word.meaning)}）。形が変わることもあります。</p>` : ""}
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
      ${known.length ? `<section class="card stack">
        <p>${level === 1 ? "わかった" : "正解した"}単語（${known.length} 語）を、復習カードから外しますか？</p>
        <button type="button" class="btn secondary block" id="remove-known">外す</button>
      </section>` : ""}
      <button type="button" class="btn block" id="again">もう一度</button>
      <a class="btn ghost block" href="#/review">復習にもどる</a>
    </main>`;

  document.getElementById("remove-known")?.addEventListener("click", async (event) => {
    event.target.disabled = true;
    for (const w of known) await setReview(w.key, false);
    toast(`${known.length} 語を復習カードから外しました`);
    event.target.closest("section").remove();
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

function renderPhrases() {
  const today = todaysPhrase();
  const others = items("phrase").filter((p) => p !== today).reverse();
  const card = (p, isToday) => `
    <article class="card phrase-card stack ${isToday ? "is-today" : ""}">
      ${isToday ? `<p class="label">Today's phrase</p>` : ""}
      <div class="phrase-head">
        <p class="phrase" lang="en">${esc(p.data.phrase)}</p>
      </div>
      <p><b>${esc(p.data.meaning)}</b></p>
      ${p.data.note ? `<p class="note">${esc(p.data.note)}</p>` : ""}
      <div>${sayButton(p.data.phrase)}</div>
    </article>`;
  app.innerHTML = `${topbar("フレーズ")}
    <main class="wrap stack">
      ${today ? speedControl() + card(today, true) + others.map((p) => card(p, false)).join("") : emptyState("まだフレーズがありません。<br>先生が追加すると、ここに出てきます。")}
    </main>`;
}

// ---------- pronunciation ----------

// Month 1, 2 … are shared phrases (public/pron/); the teacher's own sentences
// for this student are a group of their own.
function renderPron(month) {
  if (month === "own") return renderPronPractice("own");
  if (month) return renderPronPractice(Number(month));

  const own = items("pron");
  const months = Array.from({ length: MONTHS }, (_, i) => i + 1);
  app.innerHTML = `${topbar("発音")}
    <main class="wrap stack">
      <p class="muted">お手本を聞いて、マイクに向かって読んでみよう。聞き取れなかった単語が赤くなります。</p>
      ${months.map((m) => {
        const phrases = monthPhrases(m);
        if (!phrases.length) return `<div class="lesson-card soon"><div><b>Month ${m}</b><span class="muted small">まだありません</span></div></div>`;
        const tried = phrases.filter((p) => state.me.pronResults[p.key]).length;
        return `<a class="lesson-card" href="#/pron/${m}">
          <div><b>Month ${m}</b><span class="muted small">${phrases.length} 文 ・ 練習した文 ${tried} / ${phrases.length}</span></div>
          ${tried ? `<span class="badge">${tried} / ${phrases.length}</span>` : `<span class="badge start">はじめる</span>`}
        </a>`;
      }).join("")}
      ${own.length ? `<a class="lesson-card" href="#/pron/own">
        <div><b>先生が追加した文</b><span class="muted small">${own.length} 文</span></div>
        <span class="badge teacher">${own.length} 文</span>
      </a>` : ""}
    </main>`;
}

// The sentences of one month, or the teacher's own ones, as { key, en, ja, usage, tip, best, save }.
function pronList(which) {
  if (which === "own") {
    return items("pron").map((item) => ({
      key: `item/${item.id}`, en: item.data.text, ja: "", usage: "", tip: item.data.tip,
      best: progress(item.id).best, save: (score) => saveProgress(item.id, { score }),
    }));
  }
  return monthPhrases(which).map((p) => ({
    ...p,
    best: state.me.pronResults[p.key]?.best,
    save: (score) => {
      const old = state.me.pronResults[p.key];
      state.me.pronResults[p.key] = { best: Math.max(old?.best ?? 0, score), last: score, times: (old?.times ?? 0) + 1 };
      api("/api/pron", { method: "POST", body: { key: p.key, score } }).catch((error) => toast(error.message));
    },
  }));
}

function renderPronPractice(which) {
  const list = pronList(which);
  const title = which === "own" ? "発音 ・ 先生が追加した文" : `発音 ・ Month ${which}`;
  if (!list.length) {
    app.innerHTML = `${topbar(title, "#/pron")}<main class="wrap stack">${emptyState("まだ練習する文がありません。")}</main>`;
    return;
  }
  if (state.pron.which !== which) state.pron = { which, index: 0 };
  const index = Math.min(state.pron.index, list.length - 1);
  const item = list[index];
  const note = (text) => esc(text).replace(/\n/g, "<br>");

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
        ${item.tip ? `<div class="pron-note tip"><p class="label">発音のコツ</p><p>${note(item.tip)}</p></div>` : ""}
        ${item.usage ? `<div class="pron-note"><p class="label">使う場面・解説</p><p>${note(item.usage)}</p></div>` : ""}
      </section>
      ${canListen
        ? `<section class="stack" style="text-align:center">
            <button class="mic" id="mic" aria-label="読んでみる">${icons.mic}</button>
            <p class="mic-label" id="mic-label">タップして、声に出して読んでみよう</p>
          </section>`
        : `<p class="notice">このブラウザでは、声のチェックが使えません。iPhone は Safari、Android とパソコンは Chrome で開いてください。<br>お手本を聞いて、声に出して練習しましょう。</p>`}
      <section id="pron-result" class="card stack" hidden aria-live="polite"></section>
      ${item.best != null ? `<p class="muted" style="text-align:center">これまでのベスト：${item.best} 点</p>` : ""}
    </main>`;

  app.querySelectorAll("[data-step]").forEach((button) =>
    button.addEventListener("click", () => {
      state.pron.index = index + Number(button.dataset.step);
      renderPronPractice(which);
      window.scrollTo(0, 0);
    }),
  );

  const mic = document.getElementById("mic");
  mic?.addEventListener("click", async () => {
    if (mic.classList.contains("listening")) return;
    const label = document.getElementById("mic-label");
    const result = document.getElementById("pron-result");
    stopSpeaking();
    mic.classList.add("listening");
    label.textContent = "聞いています… 読み終わったら少し待ってね";
    try {
      const heard = await listen();
      if (!heard.length) throw new Error("声が聞こえませんでした。もう一度ためしてください。");
      const best = heard
        .map((text) => ({ text, ...compareSpeech(item.en, text) }))
        .sort((a, b) => b.score - a.score)[0];
      const message = best.score >= 90 ? "すばらしい！🎉" : best.score >= 70 ? "いい感じ！あと少し" : "赤い単語を、お手本を聞いてもう一度";
      result.innerHTML = `
        <p class="score">${best.score}<small> 点</small></p>
        <p><b>${message}</b></p>
        <p class="result-text" lang="en">${best.html}</p>
        <p class="muted">聞きとった文：<span lang="en">${esc(best.text)}</span></p>`;
      result.hidden = false;
      item.save(best.score);
    } catch (error) {
      result.innerHTML = `<p class="notice bad">${esc(error.message)}</p>`;
      result.hidden = false;
    } finally {
      mic.classList.remove("listening");
      label.textContent = "もう一度読むときは、タップ";
    }
  });
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
        ${step.type === "explain" || answer ? `<button type="button" class="btn" id="next">${L.index === steps.length - 1 ? "おわり" : "次へ"}</button>` : ""}
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
    const form = document.getElementById("write");
    form.answer.focus();
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const given = form.answer.value.trim();
      if (!given) return;
      record(given, step.answers.some((a) => normalizeAnswer(a) === normalizeAnswer(given)));
    });
    document.getElementById("give-up").addEventListener("click", () => record("", false));
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

function questionStepHtml(step, answer) {
  const verdict = answer ? `
    <section class="card stack" id="verdict" aria-live="polite">
      <p class="verdict ${answer.right ? "right" : "wrong"}">${answer.right ? "⭕ 正解！" : "❌ ざんねん"}</p>
      ${answer.right ? "" : `<p>正解は <b lang="en">${esc(correctAnswer(step))}</b></p>`}
      ${step.why ? `<p class="muted">${fmt(step.why)}</p>` : ""}
    </section>` : "";

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

  // write
  return `<section class="card stack">
    <p class="label">英語にしてみよう</p>
    <p class="question-ja">${esc(step.ja)}</p>
    ${step.hint ? `<p class="muted small">ヒント：<span lang="en">${esc(step.hint)}</span></p>` : ""}
    ${answer
      ? `<p class="question" lang="en">${esc(answer.given || "（答えを見た）")}</p>`
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
      ${answered ? `
        <section class="card stack" aria-live="polite">
          <p class="verdict ${isRight ? "right" : "wrong"}">${isRight ? "⭕ 正解！" : "❌ ざんねん"}</p>
          ${isRight ? "" : `<p>正解は <b lang="en">${esc(d.answer)}</b></p>`}
          ${d.explanation ? `<p class="muted">${esc(d.explanation)}</p>` : ""}
          <button class="btn block" id="next">次へ</button>
        </section>` : ""}
    </main>`;

  const check = (given) => {
    const accepted = choices.length ? [d.answer] : d.answer.split("/");
    const right = accepted.some((a) => normalizeAnswer(a) === normalizeAnswer(given));
    g.answer = { given, right };
    if (right) g.right += 1;
    else g.wrongIds.push(item.id);
    saveProgress(item.id, { result: right ? "right" : "wrong" });
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

// Today's お題: picked from the teacher's topics for this student, or from the
// beginner list when there are none. The student may swap it three times a day;
// the choice is remembered on their phone for the day.
const TOPIC_KEY = "hina-lessons-topic";
const TOPIC_SWAPS = 3;

function topicPool() {
  const own = items("topic");
  return own.length ? own.map((t) => ({ ja: t.data.prompt, start: "" })) : TOPICS;
}

function todaysTopic() {
  const day = japanDayNumber();
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(TOPIC_KEY)); } catch { /* private mode */ }
  if (saved?.day !== day) saved = { day, index: day, swaps: 0, free: false };
  return saved;
}

function saveTopic(topic) {
  try { localStorage.setItem(TOPIC_KEY, JSON.stringify(topic)); } catch { /* private mode */ }
}

function renderJournal(id) {
  if (id) return renderJournalEntry(Number(id));
  const pool = topicPool();
  const topic = todaysTopic();
  const current = pool[topic.index % pool.length];
  const left = TOPIC_SWAPS - topic.swaps;
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
                <button type="button" class="btn secondary small-btn" id="topic-swap" ${left > 0 && pool.length > 1 ? "" : "disabled"}>別のお題にする（あと ${left} 回）</button>
                <button type="button" class="btn ghost small-btn" id="topic-free">お題なしで書く</button>
              </div>
            </div>`}
        <label class="field"><span>英語で書いてみよう</span>
          <textarea name="body" lang="en" rows="9" spellcheck="false" placeholder="${esc(!topic.free && current.start ? current.start : "Today I ...")}">${esc(draft.body || "")}</textarea>
        </label>
        <p class="wordcount" id="wordcount" aria-live="polite">${countWords(draft.body || "")} words</p>
        <p class="muted small">${state.me.ai ? "送ると、添削が届きます。書き終わってから送ってね。" : "送ると、先生に届きます。"}</p>
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
  document.getElementById("topic-swap")?.addEventListener("click", () => {
    // Any other topic, at random.
    const others = pool.map((_, i) => i).filter((i) => i !== topic.index % pool.length);
    saveTopic({ ...topic, index: others[Math.floor(Math.random() * others.length)], swaps: topic.swaps + 1 });
    renderJournal();
  });
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
          ${j.correction ? `<span class="badge">添削ずみ</span>` : state.me.ai ? `<span class="badge waiting">添削なし</span>` : ""}
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

  app.innerHTML = `${topbar(formatDate(j.created_at))}
    <main class="wrap stack">
      ${j.teacher_comment ? `<section class="feedback teacher"><h3>先生からのコメント</h3><p style="white-space:pre-wrap">${esc(j.teacher_comment)}</p></section>` : ""}
      ${c ? `
        <section class="card stack">
          ${j.topic ? `<p class="muted small">お題：${esc(j.topic)}</p>` : ""}
          <h3>添削した日記</h3>
          <p class="journal-text diff" lang="en">${diffHtml(j.body, c.corrected)}</p>
        </section>
        ${c.corrections.length ? `
          <section class="card stack">
            <h3>直したところ</h3>
            ${c.corrections.map((fix) => `
              <div class="fix">
                <p class="change" lang="en"><del>${esc(fix.before)}</del><span class="arrow" aria-label="を">→</span><ins>${esc(fix.after)}</ins></p>
                <p>${esc(fix.why)}</p>
              </div>`).join("")}
          </section>` : `<p class="notice good">まちがいはありませんでした！すばらしい！</p>`}
        <details class="card"><summary>はじめに書いた文を見る</summary><p class="journal-text" lang="en" style="margin-top:10px">${esc(j.body)}</p></details>
      ` : `
        ${state.me.ai ? `<p class="notice ${aiError ? "bad" : ""}">${esc(aiError || "この日記は、まだ添削がありません。")}</p>` : ""}
        <section class="card stack">
          ${j.topic ? `<p class="muted small">お題：${esc(j.topic)}</p>` : ""}
          <p class="journal-text" lang="en">${esc(j.body)}</p>
        </section>
        ${state.me.ai
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
