// Student app: sign in with a lesson code, then vocab cards, today's phrase,
// pronunciation, grammar and the journal with AI correction.
import {
  ApiError, api, canListen, compareSpeech, diffHtml, esc, formatDate, icons, japanDayNumber, listen,
  normalizeWords, SPEEDS, getSpeed, setSpeed, speak, startOfJapanDay, stopSpeaking, toast,
} from "./common.js";
import { UNITS, findLesson, plain, questionCount } from "./grammar/lessons.js";

const app = document.getElementById("app");
const state = { me: null, vocab: null, pron: { index: 0 }, grammar: null, lesson: null, aiError: {} };

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
  const screens = { vocab: renderVocab, phrases: renderPhrases, pron: renderPron, grammar: renderGrammar, journal: renderJournal };
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
  await speak(button.dataset.say, { device: "device" in button.dataset });
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

function sayButton(text, label = "聞く", { device = false } = {}) {
  return `<button type="button" class="speak" data-say="${esc(text)}"${device ? " data-device" : ""}>${icons.speaker}${esc(label)}</button>`;
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
  const vocab = items("vocab");
  const known = vocab.filter((v) => progress(v.id).known).length;
  const phrase = todaysPhrase();
  const pron = items("pron");
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
          <div><b>日記を書く</b><p class="muted">${done ? "今日の日記は書けました！" : state.me.ai ? "英語で日記を書いて、AI に添削してもらおう" : "英語で日記を書いて、先生に送ろう"}</p></div>
        </a>
        <a class="tile" href="#/vocab">
          <span class="emoji" aria-hidden="true">🃏</span><b>単語カード</b>
          <span class="muted">${vocab.length ? `覚えた ${known} / ${vocab.length}` : "まだありません"}</span>
          ${vocab.length ? `<div class="bar"><i style="width:${Math.round((known / vocab.length) * 100)}%"></i></div>` : ""}
        </a>
        <a class="tile" href="#/phrases">
          <span class="emoji" aria-hidden="true">💬</span><b>フレーズ</b>
          <span class="muted">${items("phrase").length ? `${items("phrase").length} こ` : "まだありません"}</span>
        </a>
        <a class="tile" href="#/pron">
          <span class="emoji" aria-hidden="true">🎤</span><b>発音</b>
          <span class="muted">${pron.length ? `${pron.length} 文` : "まだありません"}</span>
        </a>
        <a class="tile" href="#/grammar">
          <span class="emoji" aria-hidden="true">✏️</span><b>文法</b>
          <span class="muted">${UNITS.map((u) => u.title).join("・")}${grammar.length ? ` ＋ 先生からの問題 ${grammar.length} 問` : ""}</span>
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

const WEEKS = 24;
// Words added before weeks existed have no week; they show as そのほか.
const weekOf = (item) => item.data.week || "other";
const weekLabel = (week) => (week === "other" ? "そのほか" : `Week ${week}`);

function renderVocab(week) {
  if (week) return renderVocabCards(week === "other" ? "other" : Number(week));
  const vocab = items("vocab");
  const weeks = Array.from({ length: WEEKS }, (_, i) => i + 1);
  if (vocab.some((v) => !v.data.week)) weeks.push("other");

  const tiles = weeks.map((week) => {
    const words = vocab.filter((v) => weekOf(v) === week);
    if (!words.length) {
      return `<div class="week empty-week"><b>${weekLabel(week)}</b><span>まだありません</span></div>`;
    }
    const known = words.filter((v) => progress(v.id).known).length;
    return `<a class="week ${known === words.length ? "done" : ""}" href="#/vocab/${week}">
      <b>${weekLabel(week)}</b>
      <span>${known === words.length ? "✓ " : ""}${known} / ${words.length} 語</span>
      <div class="bar"><i style="width:${Math.round((known / words.length) * 100)}%"></i></div>
    </a>`;
  });

  app.innerHTML = `${topbar("単語カード")}
    <main class="wrap stack">
      ${vocab.length ? "" : emptyState("まだ単語がありません。<br>先生が追加すると、ここに出てきます。")}
      <div class="weeks">${tiles.join("")}</div>
    </main>`;
}

function startVocab(week, filter) {
  const words = items("vocab").filter((v) => weekOf(v) === week);
  const pool = filter === "todo" ? words.filter((v) => !progress(v.id).known) : words;
  state.vocab = { week, filter, queue: shuffle(pool.map((v) => v.id)), flipped: false, total: pool.length };
}

function renderVocabCards(week) {
  const words = items("vocab").filter((v) => weekOf(v) === week);
  if (state.vocab?.week !== week) startVocab(week, "todo");
  const { filter, queue, flipped, total } = state.vocab;
  const card = words.find((v) => v.id === queue[0]);
  const again = () => renderVocabCards(week);

  let body;
  if (!words.length) {
    body = emptyState("この週の単語は、まだありません。");
  } else if (!card) {
    const next = typeof week === "number" && items("vocab").some((v) => v.data.week === week + 1) ? week + 1 : null;
    body = `<div class="card empty stack">
      <p style="font-size:40px">🎉</p>
      <p><b>${filter === "todo" ? `${weekLabel(week)} の単語を全部覚えました！` : "全部見ました！"}</b></p>
      <button class="btn block" data-restart="all">${weekLabel(week)} をもう一度</button>
      ${next ? `<a class="btn secondary block" href="#/vocab/${next}">Week ${next} へ</a>` : ""}
      <a class="btn ghost block" href="#/vocab">Week 一覧にもどる</a>
    </div>`;
  } else {
    const d = card.data;
    body = `
      <p class="counter">のこり ${queue.length} / ${total}</p>
      <div class="flash ${flipped ? "back" : ""}" role="button" tabindex="0" id="flash" aria-label="カードをめくる">
        ${flipped
          ? `<p class="word" lang="en">${esc(d.word)}</p>
             <p class="meaning">${esc(d.meaning)}</p>
             ${d.example ? `<p class="example" lang="en">${esc(d.example)}</p>` : ""}`
          : `<p class="word" lang="en">${esc(d.word)}</p><p class="hint">タップして意味を見る</p>`}
      </div>
      <div class="speak-row">
        ${sayButton(d.word)}
        ${flipped && d.example ? sayButton(d.example, "例文を聞く") : ""}
      </div>
      <div class="speak-row">${speedControl()}</div>
      <div class="card-actions">
        <button class="btn secondary" data-answer="again">もう一回</button>
        <button class="btn" data-answer="known">覚えた！</button>
      </div>`;
  }

  app.innerHTML = `${topbar(`単語カード ・ ${weekLabel(week)}`, "#/vocab")}
    <main class="wrap stack">
      ${words.length ? `<div class="segment" role="group" aria-label="表示するカード">
        <button data-filter="todo" aria-pressed="${filter === "todo"}">まだのカード</button>
        <button data-filter="all" aria-pressed="${filter === "all"}">全部</button>
      </div>` : ""}
      ${body}
    </main>`;

  const flash = document.getElementById("flash");
  const flip = () => {
    state.vocab.flipped = !state.vocab.flipped;
    again();
    document.getElementById("flash")?.focus();
  };
  flash?.addEventListener("click", flip);
  flash?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flip();
    }
  });
  app.querySelectorAll("[data-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      startVocab(week, button.dataset.filter);
      again();
    }),
  );
  app.querySelector("[data-restart]")?.addEventListener("click", () => {
    startVocab(week, "all");
    again();
  });
  app.querySelectorAll("[data-answer]").forEach((button) =>
    button.addEventListener("click", () => {
      const id = state.vocab.queue.shift();
      if (button.dataset.answer === "again") state.vocab.queue.push(id);
      state.vocab.flipped = false;
      saveProgress(id, { result: button.dataset.answer });
      again();
    }),
  );
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

function renderPron() {
  const list = items("pron");
  if (!list.length) {
    app.innerHTML = `${topbar("発音")}<main class="wrap stack">${emptyState("まだ発音の練習文がありません。<br>先生が追加すると、ここに出てきます。")}</main>`;
    return;
  }
  const index = Math.min(state.pron.index, list.length - 1);
  const item = list[index];
  const best = progress(item.id).best;

  app.innerHTML = `${topbar("発音")}
    <main class="wrap stack">
      <div class="pager">
        <button class="btn secondary small-btn" data-step="-1" ${index === 0 ? "disabled" : ""}>← 前</button>
        <span class="counter">${index + 1} / ${list.length}</span>
        <button class="btn secondary small-btn" data-step="1" ${index === list.length - 1 ? "disabled" : ""}>次 →</button>
      </div>
      <section class="card stack">
        <p class="sentence" lang="en">${esc(item.data.text)}</p>
        ${item.data.tip ? `<p class="muted">💡 ${esc(item.data.tip)}</p>` : ""}
        <div class="speak-row start">${sayButton(item.data.text, "お手本")} ${speedControl()}</div>
      </section>
      ${canListen
        ? `<section class="stack" style="text-align:center">
            <button class="mic" id="mic" aria-label="読んでみる">${icons.mic}</button>
            <p class="mic-label" id="mic-label">タップして、声に出して読んでみよう</p>
          </section>`
        : `<p class="notice">このブラウザでは、声のチェックが使えません。iPhone は Safari、Android とパソコンは Chrome で開いてください。<br>お手本を聞いて、声に出して練習しましょう。</p>`}
      <section id="pron-result" class="card stack" hidden aria-live="polite"></section>
      ${best != null ? `<p class="muted" style="text-align:center">これまでのベスト：${best} 点</p>` : ""}
    </main>`;

  app.querySelectorAll("[data-step]").forEach((button) =>
    button.addEventListener("click", () => {
      state.pron.index = index + Number(button.dataset.step);
      renderPron();
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
        .map((text) => ({ text, ...compareSpeech(item.data.text, text) }))
        .sort((a, b) => b.score - a.score)[0];
      const message = best.score >= 90 ? "すばらしい！🎉" : best.score >= 70 ? "いい感じ！あと少し" : "赤い単語を、お手本を聞いてもう一度";
      result.innerHTML = `
        <p class="score">${best.score}<small> 点</small></p>
        <p><b>${message}</b></p>
        <p class="result-text" lang="en">${best.html}</p>
        <p class="muted">聞きとった文：<span lang="en">${esc(best.text)}</span></p>`;
      result.hidden = false;
      saveProgress(item.id, { score: best.score });
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

function explainHtml(step) {
  const hl = highlighter(step);
  const line = (text) => hl(fmt(text));
  return `<section class="card stack explain">
    <h2>${line(step.title)}</h2>
    ${(step.text || []).map((p) => `<p>${line(p)}</p>`).join("")}
    ${step.compare ? `<div class="compare">
      <div class="cmp-head"><span>${line(step.compare.labels[0])}</span><span></span><span>${line(step.compare.labels[1])}</span></div>
      ${step.compare.rows.map(([before, after]) => `<div class="cmp-row">
        <div class="cmp before">${sayIcon(before)}<p lang="en">${line(before)}</p></div>
        <span class="cmp-arrow" aria-hidden="true">→</span>
        <div class="cmp after">${sayIcon(after)}<p lang="en">${line(after)}</p></div>
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

function renderJournal(id) {
  if (id) return renderJournalEntry(Number(id));
  const topics = items("topic");
  const todayTopic = topics.length ? topics[japanDayNumber() % topics.length] : null;
  const draft = readDraft();
  const chosen = draft.topic ?? todayTopic?.data.prompt ?? "";

  app.innerHTML = `${topbar("日記")}
    <main class="wrap stack">
      <form id="journal" class="card stack">
        ${topics.length ? `
          <div class="topic-box">
            <label class="field"><span class="label">Topic ・ テーマ</span>
              <select name="topic">
                ${topics.map((t) => `<option value="${esc(t.data.prompt)}" ${t.data.prompt === chosen ? "selected" : ""}>${esc(t.data.prompt)}${t === todayTopic ? "（今日のテーマ）" : ""}</option>`).join("")}
                <option value="" ${chosen === "" ? "selected" : ""}>テーマなしで自由に書く</option>
              </select>
            </label>
          </div>` : ""}
        <label class="field"><span>英語で書いてみよう</span>
          <textarea name="body" lang="en" rows="9" spellcheck="false" placeholder="Today I ...">${esc(draft.body || "")}</textarea>
        </label>
        <p class="wordcount" id="wordcount" aria-live="polite">${countWords(draft.body || "")} words</p>
        <p class="muted small">${state.me.ai ? "送ると、AI が 1 回添削します。書き終わってから送ってね。" : "送ると、先生に届きます。"}</p>
        <p class="notice bad" id="journal-error" role="alert" hidden></p>
        <button class="btn block" type="submit">${submitLabel()}</button>
      </form>
      ${historyHtml()}
    </main>`;

  const form = document.getElementById("journal");
  const save = () => writeDraft({ topic: form.topic ? form.topic.value : "", body: form.body.value });
  form.body.addEventListener("input", () => {
    document.getElementById("wordcount").textContent = `${countWords(form.body.value)} words`;
    save();
  });
  form.topic?.addEventListener("change", save);
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
        body: { topic: form.topic ? form.topic.value : "", body },
      });
      clearDraft();
      state.me.journals.unshift(result.journal);
      if (result.ai_error) state.aiError[result.journal.id] = result.ai_error;
      location.hash = `#/journal/${result.journal.id}`;
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      button.disabled = false;
      button.textContent = submitLabel();
    }
  });
}

const submitLabel = () => (state.me.ai ? "送って添削してもらう" : "日記を送る");

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
          ${j.topic ? `<p class="muted small">テーマ：${esc(j.topic)}</p>` : ""}
          <h3>添削した日記</h3>
          <p class="journal-text diff" lang="en">${diffHtml(j.body, c.corrected)}</p>
          <div>${sayButton(c.corrected, "読み上げる", { device: true })}</div>
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
        ${state.me.ai ? `<p class="notice ${aiError ? "bad" : ""}">${esc(aiError || "この日記は、まだ AI の添削がありません。")}</p>` : ""}
        <section class="card stack">
          ${j.topic ? `<p class="muted small">テーマ：${esc(j.topic)}</p>` : ""}
          <p class="journal-text" lang="en">${esc(j.body)}</p>
        </section>
        ${state.me.ai
          ? `<button class="btn block" id="retry">${aiError ? "もう一度ためす" : "AI に添削してもらう"}</button>`
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
