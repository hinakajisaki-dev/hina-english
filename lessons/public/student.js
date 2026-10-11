// Student app: sign in with a lesson code, then vocab cards, today's phrase,
// pronunciation, grammar and the journal with AI correction.
import {
  ApiError, api, canListen, compareSpeech, diffHtml, esc, formatDate, icons, japanDayNumber, listen,
  normalizeWords, speak, startOfJapanDay, toast,
} from "./common.js";

const app = document.getElementById("app");
const state = { me: null, vocab: null, pron: { index: 0 }, grammar: null, aiError: {} };

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
  const [, screen, id] = location.hash.split("/");
  const screens = { vocab: renderVocab, phrases: renderPhrases, pron: renderPron, grammar: renderGrammar, journal: renderJournal };
  (screens[screen] || renderHome)(id);
}

window.addEventListener("hashchange", () => {
  render();
  window.scrollTo(0, 0);
});

// Any element with data-say reads its text aloud.
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-say]");
  if (button) speak(button.dataset.say, Number(button.dataset.rate) || 0.95);
});

(async () => {
  if (await load()) render();
})();

// ---------- shared bits ----------

const items = (kind) => state.me.items.filter((item) => item.kind === kind);
const progress = (id) => state.me.progress[id] || {};

function topbar(title) {
  return `<header class="topbar"><div class="topbar-in">
    <a class="icon-btn" href="#/" aria-label="ホームにもどる">${icons.back}</a>
    <h1>${esc(title)}</h1>
  </div></header>`;
}

function sayButton(text, label = "聞く", rate) {
  return `<button type="button" class="speak" data-say="${esc(text)}" ${rate ? `data-rate="${rate}"` : ""}>${icons.speaker}${esc(label)}</button>`;
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
          <div>${sayButton(phrase.data.phrase)}</div>
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
          <span class="muted">${grammar.length ? `${grammar.length} 問` : "まだありません"}</span>
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

function startVocab(filter) {
  const vocab = items("vocab");
  const pool = filter === "todo" ? vocab.filter((v) => !progress(v.id).known) : vocab;
  state.vocab = { filter, queue: shuffle(pool.map((v) => v.id)), flipped: false, total: pool.length };
}

function renderVocab() {
  const vocab = items("vocab");
  if (!state.vocab) startVocab("todo");
  const { filter, queue, flipped, total } = state.vocab;
  const card = vocab.find((v) => v.id === queue[0]);

  let body;
  if (!vocab.length) {
    body = emptyState("まだ単語がありません。<br>先生が追加すると、ここに出てきます。");
  } else if (!card) {
    body = `<div class="card empty stack">
      <p style="font-size:40px">🎉</p>
      <p><b>${filter === "todo" ? "全部覚えました！" : "全部見ました！"}</b></p>
      <button class="btn block" data-restart="all">全部の単語をもう一度</button>
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
      <div class="card-actions">
        <button class="btn secondary" data-answer="again">もう一回</button>
        <button class="btn" data-answer="known">覚えた！</button>
      </div>`;
  }

  app.innerHTML = `${topbar("単語カード")}
    <main class="wrap stack">
      ${vocab.length ? `<div class="segment" role="group" aria-label="表示するカード">
        <button data-filter="todo" aria-pressed="${filter === "todo"}">まだのカード</button>
        <button data-filter="all" aria-pressed="${filter === "all"}">全部</button>
      </div>` : ""}
      ${body}
    </main>`;

  const flash = document.getElementById("flash");
  const flip = () => {
    state.vocab.flipped = !state.vocab.flipped;
    renderVocab();
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
      startVocab(button.dataset.filter);
      renderVocab();
    }),
  );
  app.querySelector("[data-restart]")?.addEventListener("click", () => {
    startVocab("all");
    renderVocab();
  });
  app.querySelectorAll("[data-answer]").forEach((button) =>
    button.addEventListener("click", () => {
      const id = state.vocab.queue.shift();
      if (button.dataset.answer === "again") state.vocab.queue.push(id);
      state.vocab.flipped = false;
      saveProgress(id, { result: button.dataset.answer });
      renderVocab();
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
      <div class="btn-row" style="flex-wrap:nowrap">${sayButton(p.data.phrase)} ${sayButton(p.data.phrase, "ゆっくり", 0.65)}</div>
    </article>`;
  app.innerHTML = `${topbar("フレーズ")}
    <main class="wrap stack">
      ${today ? card(today, true) + others.map((p) => card(p, false)).join("") : emptyState("まだフレーズがありません。<br>先生が追加すると、ここに出てきます。")}
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
        <div class="btn-row" style="flex-wrap:nowrap">${sayButton(item.data.text, "お手本")} ${sayButton(item.data.text, "ゆっくり", 0.65)}</div>
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
    window.speechSynthesis?.cancel();
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

function renderGrammar() {
  const list = items("grammar");
  if (!list.length) {
    app.innerHTML = `${topbar("文法")}<main class="wrap stack">${emptyState("まだ文法の問題がありません。<br>先生が追加すると、ここに出てきます。")}</main>`;
    return;
  }
  if (!state.grammar) startGrammar(list.map((q) => q.id));
  const g = state.grammar;
  const item = list.find((q) => q.id === g.queue[0]);

  if (!item) {
    app.innerHTML = `${topbar("文法")}
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
      renderGrammar();
    });
    document.getElementById("retry-all").addEventListener("click", () => {
      startGrammar(list.map((q) => q.id));
      renderGrammar();
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

  app.innerHTML = `${topbar("文法")}
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
    renderGrammar();
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
    renderGrammar();
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
          <div>${sayButton(c.corrected, "読み上げる")}</div>
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
