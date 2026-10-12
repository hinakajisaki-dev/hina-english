// Teacher page: add students, give each one their own words, phrases,
// pronunciation sentences, grammar problems and journal topics, and read
// their journals with the AI corrections.
import { ApiError, api, diffHtml, esc, formatDateTime, icons, startOfJapanDay, toast } from "./common.js";
import { UNITS } from "./grammar/lessons.js";
import { bookWeeks, bookWords, setKey, weekWords, wordSets } from "./vocab/words.js";
import { monthPhrases, pronMonths } from "./pron/phrases.js";

document.body.classList.add("teacher");
const app = document.getElementById("app");
const state = { students: [], current: null, vocabWeek: null };
const WEEKS = 24;

const KINDS = {
  vocab: {
    tab: "単語",
    columns: ["word", "meaning", "example"],
    required: 2,
    format: "単語 | 意味 | 例文（なくてもOK）",
    example: "borrow | 借りる | Can I borrow your pen?\nslip one's mind | うっかり忘れる",
  },
  phrase: {
    tab: "フレーズ",
    columns: ["phrase", "meaning", "note"],
    required: 2,
    format: "フレーズ | 意味 | メモ（なくてもOK）",
    example: "It slipped my mind. | うっかり忘れてた | forgot よりやわらかい言い方",
  },
  pron: {
    tab: "発音",
    columns: ["text", "tip"],
    required: 1,
    format: "読む文 | コツ（なくてもOK）",
    example: "I'd like a cup of coffee, please. | I'd の d は軽く\nThree free throws.",
  },
  grammar: {
    tab: "文法",
    columns: ["question", "answer", "choices", "explanation"],
    required: 2,
    format: "問題（空欄は ___ ） | 答え | 選択肢を / で区切る（なくてもOK） | 解説（なくてもOK）",
    example: "I ___ to Osaka last week. | went | go / went / gone | 先週のことなので過去形\nShe has lived here ___ 2019. | since | | 「〜からずっと」は since",
  },
  topic: {
    tab: "日記のテーマ",
    columns: ["prompt"],
    required: 1,
    format: "テーマ（1行に1つ）",
    example: "週末にしたこと\n最近うれしかったこと",
  },
};
const COLUMN_NAMES = {
  word: "単語", meaning: "意味", phrase: "フレーズ", text: "文", question: "問題", answer: "答え", prompt: "テーマ",
};

// ---------- boot and routing ----------

async function loadStudents() {
  state.students = (await api("/api/teacher/students")).students;
}

async function render() {
  const [, page, id, tab] = location.hash.split("/");
  try {
    if (page === "s" && id) await renderStudent(Number(id), tab || "journals");
    else await renderList();
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return renderLogin();
    app.innerHTML = `<main class="wrap"><div class="card empty" style="margin-top:40px">${esc(error.message)}<br><br><a class="btn" href="#/">一覧にもどる</a></div></main>`;
  }
}

window.addEventListener("hashchange", () => {
  render();
  window.scrollTo(0, 0);
});
render();

// ---------- small helpers ----------

const formatCode = (code) => `${code.slice(0, 4)}-${code.slice(4)}`;

function inviteText(student) {
  return `${student.name}さん\nHina English のレッスンアプリはこちらです👇\n${location.origin}/\nレッスンコード：${formatCode(student.code)}`;
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  toast("コピーしました");
}

function busy(button, label) {
  button.disabled = true;
  button.dataset.label = button.textContent;
  button.innerHTML = `<span class="spinner" aria-hidden="true"></span>${esc(label)}`;
}

function done(button) {
  button.disabled = false;
  button.textContent = button.dataset.label;
}

// ---------- login ----------

function renderLogin() {
  app.innerHTML = `<main class="login">
    <div class="card">
      <img src="character.png" alt="">
      <h1>先生ページ</h1>
      <p class="muted">Hina English レッスン</p>
      <form id="login" class="stack">
        <label class="field"><span>パスワード</span>
          <input type="password" name="password" autocomplete="current-password" required>
        </label>
        <p class="notice bad" id="login-error" role="alert" hidden></p>
        <button class="btn block" type="submit">ログイン</button>
      </form>
    </div>
  </main>`;
  const form = document.getElementById("login");
  form.password.focus();
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const error = document.getElementById("login-error");
    busy(button, "確認中…");
    error.hidden = true;
    try {
      await api("/api/teacher/login", { method: "POST", body: { password: form.password.value } });
      render();
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      done(button);
    }
  });
}

// ---------- student list ----------

async function renderList() {
  await loadStudents();
  app.innerHTML = `
    <header class="topbar"><div class="topbar-in">
      <h1>先生ページ</h1>
      <a class="btn secondary small-btn" href="/" target="_blank" rel="noopener">生徒の画面を開く</a>
    </div></header>
    <main class="wrap stack">
      <section class="card stack">
        <h3>生徒を追加</h3>
        <form id="add-student" class="inline-form">
          <input type="text" name="name" placeholder="生徒の名前（例：たなか）" required maxlength="60">
          <button class="btn" type="submit">追加</button>
        </form>
        <p class="muted small">追加すると、その生徒だけのレッスンコードができます。コードを生徒に送ると、アプリに入れます。</p>
      </section>
      ${state.students.length
        ? `<div class="student-list">${state.students.map((s) => `
            <a class="student-card" href="#/s/${s.id}">
              <div class="head-row"><b>${esc(s.name)}</b>${s.unread ? `<span class="unread">未読 ${s.unread}</span>` : ""}</div>
              <span><span class="code">${esc(formatCode(s.code))}</span></span>
              <span class="muted small">${s.last_journal ? `最後の日記：${esc(formatDateTime(s.last_journal))}` : "まだ日記はありません"}</span>
            </a>`).join("")}</div>`
        : `<div class="card empty">まだ生徒がいません。上のフォームから追加してください。</div>`}
      <p class="footer-links"><button type="button" class="btn ghost small-btn" id="logout">ログアウト</button></p>
    </main>`;

  document.getElementById("logout").addEventListener("click", async () => {
    await api("/api/teacher/logout", { method: "POST" }).catch(() => {});
    renderLogin();
  });

  const form = document.getElementById("add-student");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    busy(button, "追加中…");
    try {
      const { student } = await api("/api/teacher/students", { method: "POST", body: { name: form.name.value } });
      location.hash = `#/s/${student.id}/settings`;
      toast(`${student.name}さんを追加しました`);
    } catch (error) {
      toast(error.message);
      done(button);
    }
  });
}

// ---------- one student ----------

async function renderStudent(id, tab) {
  const data = await api(`/api/teacher/students/${id}`);
  state.current = data;
  const { student, items, progress, journals } = data;
  const byKind = (kind) => items.filter((item) => item.kind === kind);
  const vocabSets = vocabSetList(data);
  const vocabTested = vocabSets.filter((s) => data.vocabTests?.[s.key]).length;
  const grammarTries = byKind("grammar").reduce(
    (sum, q) => ({ right: sum.right + (progress[q.id]?.right || 0), wrong: sum.wrong + (progress[q.id]?.wrong || 0) }),
    { right: 0, wrong: 0 },
  );
  const tries = grammarTries.right + grammarTries.wrong;
  const unread = journals.filter((j) => !j.teacher_read).length;
  const weekAgo = new Date(startOfJapanDay().getTime() - 6 * 86400e3);
  const thisWeek = journals.filter((j) => new Date(j.created_at) >= weekAgo).length;

  const tabs = [
    ["journals", `日記${unread ? `（未読 ${unread}）` : ""}`],
    ...Object.entries(KINDS).map(([kind, spec]) => [kind, `${spec.tab} ${byKind(kind).length}`]),
    ["settings", "設定・コード"],
  ];

  app.innerHTML = `
    <header class="topbar"><div class="topbar-in">
      <a class="icon-btn" href="#/" aria-label="生徒の一覧にもどる">${icons.back}</a>
      <h1>${esc(student.name)}さん</h1>
      <button class="btn secondary small-btn" id="copy-invite">招待をコピー</button>
    </div></header>
    <main class="wrap stack">
      <div class="stats">
        <div class="stat"><b>${journals.length}</b><span>日記（この7日で ${thisWeek}）</span></div>
        <div class="stat"><b>${vocabTested} / ${vocabSets.length}</b><span>単語テスト（復習カード ${(data.review || []).length} 語）</span></div>
        <div class="stat"><b>${tries ? `${Math.round((grammarTries.right / tries) * 100)}%` : "—"}</b><span>文法の正解率</span></div>
      </div>
      <nav class="tabs" aria-label="内容">
        ${tabs.map(([key, label]) => `<a href="#/s/${student.id}/${key}" ${key === tab ? 'aria-current="page"' : ""}>${esc(label)}</a>`).join("")}
      </nav>
      <div id="tab"></div>
    </main>`;

  document.getElementById("copy-invite").addEventListener("click", () => copy(inviteText(student)));
  const panel = document.getElementById("tab");
  if (tab === "journals") renderJournals(panel);
  else if (tab === "settings") renderSettings(panel);
  else if (KINDS[tab]) renderItems(panel, tab);
  else renderJournals(panel);
}

// ---------- journals ----------

function renderJournals(panel) {
  const { journals } = state.current;
  if (!journals.length) {
    panel.innerHTML = `<div class="card empty">まだ日記はありません。</div>`;
    return;
  }
  panel.innerHTML = `<div class="stack">${journals.map((j) => {
    const c = j.correction;
    return `<details class="card journal-entry" data-id="${j.id}">
      <summary>
        <div class="badges">
          <span class="muted small">${esc(formatDateTime(j.created_at))}</span>
          ${j.teacher_read ? "" : `<span class="unread">未読</span>`}
          ${c || !state.current.ai ? "" : `<span class="badge waiting">AI 添削なし</span>`}
          ${j.teacher_comment ? `<span class="badge teacher">コメントずみ</span>` : ""}
        </div>
        ${j.topic ? `<span class="muted small">テーマ：${esc(j.topic)}</span>` : ""}
        <span class="first-line" lang="en">${esc(j.body.split("\n")[0])}</span>
      </summary>
      <div class="journal-body stack">
        <div><h3>生徒が書いた文</h3><p class="journal-text" lang="en">${esc(j.body)}</p></div>
        ${c ? `
          <div><h3>AI の添削</h3><p class="journal-text diff" lang="en">${diffHtml(j.body, c.corrected)}</p></div>
          ${c.corrections.length ? `<div class="stack">${c.corrections.map((fix) => `
            <div class="fix">
              <p class="change" lang="en"><del>${esc(fix.before)}</del><span class="arrow">→</span><ins>${esc(fix.after)}</ins></p>
              <p>${esc(fix.why)}</p>
            </div>`).join("")}</div>` : ""}
        ` : ""}
        <form class="comment stack">
          <label class="field"><span>先生からのコメント（生徒に表示されます）</span>
            <textarea name="comment" rows="3" placeholder="例：Great job! 過去形がしっかり使えていますね。">${esc(j.teacher_comment)}</textarea>
          </label>
          <button class="btn" type="submit">コメントを保存</button>
        </form>
      </div>
    </details>`;
  }).join("")}</div>`;

  panel.querySelectorAll(".journal-entry").forEach((entry) => {
    const journal = state.current.journals.find((j) => j.id === Number(entry.dataset.id));
    entry.addEventListener("toggle", async () => {
      if (!entry.open || journal.teacher_read) return;
      journal.teacher_read = true;
      entry.querySelector("summary .unread")?.remove();
      await api(`/api/teacher/journals/${journal.id}`, { method: "PATCH", body: { teacher_read: true } }).catch(() => {});
    });
    const form = entry.querySelector("form.comment");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = form.querySelector("button");
      busy(button, "保存中…");
      try {
        const result = await api(`/api/teacher/journals/${journal.id}`, {
          method: "PATCH",
          body: { teacher_comment: form.comment.value, teacher_read: true },
        });
        Object.assign(journal, result.journal);
        toast("コメントを保存しました");
      } catch (error) {
        toast(error.message);
      }
      done(button);
    });
  });
}

// ---------- content lists ----------

function parseLine(kind, line) {
  const spec = KINDS[kind];
  const fields = kind === "topic" ? [line.trim()] : line.split(/\t|\||｜/).map((f) => f.trim());
  const data = {};
  spec.columns.forEach((column, i) => {
    if (column === "choices") {
      data.choices = (fields[i] || "").split(/\/|／/).map((c) => c.trim()).filter(Boolean);
    } else {
      data[column] = fields[i] || "";
    }
  });
  const missing = spec.columns.slice(0, spec.required).find((column) => !data[column]);
  return { data, missing: missing && COLUMN_NAMES[missing] };
}

function toLine(kind, data) {
  return KINDS[kind].columns
    .map((column) => (column === "choices" ? (data.choices || []).join(" / ") : data[column] || ""))
    .join(" | ")
    .replace(/(\s\|\s*)+$/, "");
}

function rowHtml(kind, item, progress) {
  const d = item.data;
  const p = progress[item.id] || {};
  let main = "";
  let sub = "";
  let pill = "";
  if (kind === "vocab") {
    main = d.word; sub = [d.meaning, d.example].filter(Boolean).join(" ・ ");
    if ((state.current.review || []).some((r) => r.key === `item/${item.id}`)) pill = `<span class="pill">復習カード</span>`;
  } else if (kind === "phrase") {
    main = d.phrase; sub = [d.meaning, d.note].filter(Boolean).join(" ・ ");
  } else if (kind === "pron") {
    main = d.text; sub = d.tip;
    if (p.best != null) pill = `<span class="pill">ベスト ${p.best}点</span>`;
  } else if (kind === "grammar") {
    main = d.question;
    sub = [`答え：${d.answer}`, d.choices?.length ? `選択肢：${d.choices.join(" / ")}` : "", d.explanation].filter(Boolean).join(" ・ ");
    if (p.right || p.wrong) pill = `<span class="pill">⭕${p.right || 0} ❌${p.wrong || 0}</span>`;
  } else {
    sub = "";
    main = d.prompt;
  }
  const mainLang = kind === "topic" ? "" : 'lang="en"';
  return `<li data-id="${item.id}">
    <div class="main">
      <div class="${kind === "topic" ? "" : "en-main"}" ${mainLang}>${esc(main)} ${pill}</div>
      ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
    </div>
    <div class="tools">
      <button class="btn ghost small-btn" data-edit>編集</button>
      <button class="btn ghost small-btn" data-delete>削除</button>
    </div>
  </li>`;
}

function renderItems(panel, kind) {
  const spec = KINDS[kind];
  const { student, items, progress } = state.current;
  let list = items.filter((item) => item.kind === kind).reverse();

  // Words are added and listed one week at a time.
  let week = null;
  let weekPicker = "";
  if (kind === "vocab") {
    const weekOf = (item) => item.data.week || "other";
    const count = (w) => list.filter((item) => weekOf(item) === w).length;
    if (state.vocabWeek?.student !== student.id) {
      const used = list.map((item) => item.data.week).filter(Boolean);
      state.vocabWeek = { student: student.id, week: used.length ? Math.max(...used) : 1 };
    }
    week = state.vocabWeek.week;
    const options = Array.from({ length: WEEKS }, (_, i) => i + 1);
    if (count("other")) options.push("other");
    weekPicker = `<label class="field"><span>Week をえらぶ</span>
      <select id="week">${options.map((w) => `<option value="${w}" ${w === week ? "selected" : ""}>${w === "other" ? "そのほか（Week なし）" : `Week ${w}`}（${count(w)} 語）</option>`).join("")}</select>
    </label>`;
    list = list.filter((item) => weekOf(item) === week);
  }
  const weekName = week === "other" ? "そのほか" : `Week ${week}`;

  const book = kind === "vocab" && week !== "other" ? bookWords(week).length : 0;
  panel.innerHTML = `<div class="stack">
    ${kind === "grammar" ? lessonResultsHtml() : ""}
    ${kind === "vocab" ? vocabResultsHtml() : ""}
    ${kind === "pron" ? pronResultsHtml() : ""}
    <section class="card stack">
      ${weekPicker}
      ${book ? `<p class="notice">${weekName} には、全員共通の単語帳（${book} 語）が入っています。ここで足した単語は、この生徒の ${weekName} の最後に加わります。</p>` : ""}
      <h3>${week ? `${weekName} に` : ""}${kind === "grammar" ? "先生からの問題（この生徒だけ）" : esc(spec.tab)}を追加</h3>
      <p class="format">1行に1つ。区切りは <code>|</code>（またはスプレッドシートからそのまま貼りつけ）<br>${esc(spec.format)}</p>
      <form id="bulk" class="stack">
        <textarea class="bulk" name="lines" lang="en" placeholder="${esc(spec.example)}"></textarea>
        <p class="notice bad" id="bulk-error" role="alert" hidden></p>
        <button class="btn" type="submit">追加</button>
      </form>
      ${kind === "grammar" ? `<p class="muted small">選択肢がない問題は、生徒が答えを入力します。正解が2つ以上あるときは、答えを <code>I'm / I am</code> のように / で区切ってください。</p>` : ""}
      ${kind === "phrase" ? `<p class="muted small">「今日のフレーズ」は、毎日この中から順番に1つ表示されます。</p>` : ""}
      ${kind === "topic" ? `<p class="muted small">日記のページで、毎日この中から順番に1つが「今日のテーマ」になります。生徒は別のテーマや、テーマなしも選べます。</p>` : ""}
    </section>
    <section class="card">
      ${list.length ? `<ul class="rows" id="item-rows">${list.map((item) => rowHtml(kind, item, progress)).join("")}</ul>` : `<p class="empty">まだありません。</p>`}
    </section>
  </div>`;

  const form = document.getElementById("bulk");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const error = document.getElementById("bulk-error");
    const lines = form.lines.value.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) return;
    const parsed = lines.map((line) => parseLine(kind, line));
    const bad = parsed.map((p, i) => (p.missing ? `${i + 1}行目：「${p.missing}」がありません` : null)).filter(Boolean);
    if (bad.length) {
      error.innerHTML = bad.map(esc).join("<br>");
      error.hidden = false;
      return;
    }
    const button = form.querySelector("button");
    busy(button, "追加中…");
    try {
      const data = parsed.map((p) => (week && week !== "other" ? { ...p.data, week } : p.data));
      await api(`/api/teacher/students/${student.id}/items`, {
        method: "POST",
        body: { kind, items: data },
      });
      toast(`${lines.length} こ追加しました`);
      await renderStudent(student.id, kind);
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      done(button);
    }
  });

  document.getElementById("week")?.addEventListener("change", (event) => {
    const value = event.target.value;
    state.vocabWeek.week = value === "other" ? "other" : Number(value);
    renderItems(panel, kind);
  });

  panel.querySelectorAll("#item-rows > li").forEach((row) => {
    const item = items.find((i) => i.id === Number(row.dataset.id));
    row.querySelector("[data-delete]").addEventListener("click", async () => {
      if (!confirm("削除しますか？")) return;
      try {
        await api(`/api/teacher/items/${item.id}`, { method: "DELETE" });
        await renderStudent(student.id, kind);
      } catch (error) {
        toast(error.message);
      }
    });
    row.querySelector("[data-edit]").addEventListener("click", () => {
      row.innerHTML = `<form class="main stack edit">
        <input class="edit-line" type="text" name="line" lang="en" value="${esc(toLine(kind, item.data))}">
        <p class="muted small">${esc(spec.format)}</p>
        <div class="btn-row" style="justify-content:flex-start">
          <button class="btn small-btn" type="submit" style="flex:none">保存</button>
          <button class="btn secondary small-btn" type="button" data-cancel style="flex:none">やめる</button>
        </div>
      </form>`;
      const edit = row.querySelector("form");
      edit.line.focus();
      edit.querySelector("[data-cancel]").addEventListener("click", () => renderItems(panel, kind));
      edit.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { data, missing } = parseLine(kind, edit.line.value);
        if (missing) return toast(`「${missing}」がありません`);
        try {
          const result = await api(`/api/teacher/items/${item.id}`, { method: "PUT", body: { data } });
          Object.assign(item, result.item);
          renderItems(panel, kind);
        } catch (error) {
          toast(error.message);
        }
      });
    });
  });
}

// How the student did in each grammar lesson (shown on the 文法 tab).
function lessonResultsHtml() {
  const results = state.current.lessons || {};
  const lessons = UNITS.flatMap((unit) => unit.lessons.filter((l) => l.steps).map((l) => ({ unit, lesson: l })));
  return `<section class="card stack">
    <h3>文法レッスンの結果</h3>
    <ul class="rows">${lessons.map(({ unit, lesson }) => {
      const r = results[lesson.id];
      return `<li><div class="main">
        <div><b>${esc(unit.title)} ・ ${esc(lesson.title)}</b></div>
        <div class="sub">${r
          ? `ベスト ${r.best} / ${r.total}　前回 ${r.last} / ${r.total}　${r.times} 回　（${esc(formatDateTime(r.updated_at))}）`
          : "まだやっていません"}</div>
      </div></li>`;
    }).join("")}</ul>
    <p class="muted small">レッスンの中身は全員共通です。新しい単元やレッスンを足したいときは、Claude に頼んでください。下の「先生からの問題」は、この生徒だけの問題です。</p>
  </section>`;
}

// Every ten-word set this student has (単語帳 and their own words), with its key.
function vocabSetList(data) {
  const weeks = [...new Set([...bookWeeks(), ...data.items.filter((i) => i.kind === "vocab").map((i) => i.data.week || "other")])];
  return weeks.flatMap((week) =>
    wordSets(weekWords(week, data.items)).map((set) => ({ week, ...set, key: setKey(week, set.number) })),
  );
}

function vocabResultsHtml() {
  const results = state.current.vocabTests || {};
  const review = state.current.review || [];
  const fromTests = review.filter((r) => r.source === "test").length;
  return `<section class="card stack">
    <h3>単語テストの結果</h3>
    <p class="muted small">復習カード：${review.length} 語（テストでまちがえた ${fromTests} 語、自分でチェックした ${review.length - fromTests} 語）</p>
    <ul class="rows">${vocabSetList(state.current).map((set) => {
      const r = results[set.key];
      return `<li><div class="main">
        <div><b>${set.week === "other" ? "そのほか" : `Week ${set.week}`} ・ ${set.number}. ${esc(set.title)}</b></div>
        <div class="sub">${r
          ? `ベスト ${r.best} / ${r.total}　前回 ${r.last} / ${r.total}　${r.times} 回　（${esc(formatDateTime(r.updated_at))}）`
          : "まだやっていません"}</div>
      </div></li>`;
    }).join("")}</ul>
  </section>`;
}

// The shared pronunciation months: best score per phrase.
function pronResultsHtml() {
  const results = state.current.pronResults || {};
  return pronMonths().map((month) => {
    const phrases = monthPhrases(month);
    const tried = phrases.filter((p) => results[p.key]);
    const average = tried.length ? Math.round(tried.reduce((n, p) => n + results[p.key].best, 0) / tried.length) : null;
    return `<section class="card stack">
      <h3>発音 Month ${month}（全員共通 ${phrases.length} 文）</h3>
      <p class="muted small">練習した文 ${tried.length} / ${phrases.length}${average != null ? `　ベストの平均 ${average} 点` : ""}。ここで足した文は、生徒の画面では「先生が追加した文」に出ます。</p>
      <details><summary>文ごとのベスト</summary>
        <ul class="rows">${phrases.map((p) => {
          const r = results[p.key];
          return `<li><div class="main"><div><b lang="en">${esc(p.en)}</b></div>
            <div class="sub">${r ? `ベスト ${r.best} 点　前回 ${r.last} 点　${r.times} 回` : "まだ練習していません"}</div></div></li>`;
        }).join("")}</ul>
      </details>
    </section>`;
  }).join("");
}

// ---------- settings ----------

function renderSettings(panel) {
  const { student } = state.current;
  panel.innerHTML = `<div class="stack">
    <section class="card stack">
      <h3>レッスンコード</h3>
      <p><span class="code" style="font-size:22px">${esc(formatCode(student.code))}</span></p>
      <p class="muted small">生徒は <b>${esc(location.origin)}/</b> を開いて、このコードを入れるとアプリに入れます。下のボタンで、URL とコードをまとめてコピーできます（LINE などで送ってください）。</p>
      <div class="btn-row" style="justify-content:flex-start">
        <button class="btn" id="copy" style="flex:none">招待メッセージをコピー</button>
        <button class="btn secondary" id="new-code" style="flex:none">新しいコードにする</button>
      </div>
    </section>
    <form class="card stack" id="profile">
      <h3>生徒の情報</h3>
      <label class="field"><span>名前（アプリで「〇〇さん」と表示）</span>
        <input type="text" name="name" value="${esc(student.name)}" maxlength="60" required>
      </label>
      ${state.current.ai ? "" : `<p class="notice small">いまは AI 添削をオフにしています。日記は先生にだけ届きます。使うときは README の「AI 添削を使う」の手順で、API キーを入れてください。下のメモは、オンにしたときに使われます。</p>`}
      <label class="field"><span>AI へのメモ（日記の添削に使われます。生徒には見えません）</span>
        <textarea name="note" rows="3" maxlength="1000" placeholder="例：英検3級くらい。いまは過去形と現在完了を練習中。説明はやさしい言葉で。">${esc(student.note)}</textarea>
      </label>
      <button class="btn" type="submit" style="align-self:flex-start">保存</button>
    </form>
    <section class="card stack danger">
      <h3>生徒を削除</h3>
      <p class="muted small">この生徒の単語・フレーズ・問題・日記が、すべて消えます。元にもどせません。</p>
      <button class="btn bad" id="delete" style="align-self:flex-start">${esc(student.name)}さんを削除</button>
    </section>
  </div>`;

  document.getElementById("copy").addEventListener("click", () => copy(inviteText(student)));
  document.getElementById("new-code").addEventListener("click", async () => {
    if (!confirm("新しいコードにすると、いまのコードは使えなくなります。生徒はアプリからログアウトされるので、新しいコードを送ってください。よろしいですか？")) return;
    try {
      await api(`/api/teacher/students/${student.id}/code`, { method: "POST", body: {} });
      await renderStudent(student.id, "settings");
      toast("新しいコードにしました");
    } catch (error) {
      toast(error.message);
    }
  });
  const profile = document.getElementById("profile");
  profile.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = profile.querySelector("button");
    busy(button, "保存中…");
    try {
      await api(`/api/teacher/students/${student.id}`, {
        method: "PATCH",
        body: { name: profile.name.value, note: profile.note.value },
      });
      await renderStudent(student.id, "settings");
      toast("保存しました");
    } catch (error) {
      toast(error.message);
      done(button);
    }
  });
  document.getElementById("delete").addEventListener("click", async () => {
    const typed = prompt(`本当に削除しますか？ 削除するには「${student.name}」と入力してください。`);
    if (typed === null) return;
    if (typed.trim() !== student.name) return toast("名前がちがうので、削除しませんでした");
    try {
      await api(`/api/teacher/students/${student.id}`, { method: "DELETE" });
      location.hash = "#/";
      toast("削除しました");
    } catch (error) {
      toast(error.message);
    }
  });
}
