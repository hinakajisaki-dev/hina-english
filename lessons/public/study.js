// Study time, shared by the student app and the teacher page: the clock that
// counts time spent in the app, and the week / month bar charts.
//
// A day's row is { day: "2026-10-12" (Japan date), app_seconds, other_minutes, note }.
import { esc } from "./common.js";

// ---------- days ----------

// Today in Japan, "2026-10-12".
export const today = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);

const dayMs = (day) => Date.parse(`${day}T00:00:00Z`);
const toDay = (ms) => new Date(ms).toISOString().slice(0, 10);
export const addDays = (day, n) => toDay(dayMs(day) + n * 86400e3);

// The Monday of the week a day is in.
export function weekStart(day) {
  const weekday = (new Date(dayMs(day)).getUTCDay() + 6) % 7; // Monday 0 … Sunday 6
  return addDays(day, -weekday);
}

export const monthStart = (day) => `${day.slice(0, 7)}-01`;

export function addMonths(day, n) {
  const d = new Date(dayMs(monthStart(day)));
  d.setUTCMonth(d.getUTCMonth() + n);
  return toDay(d.getTime());
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const weekday = (day) => WEEKDAYS[new Date(dayMs(day)).getUTCDay()];
const md = (day) => `${Number(day.slice(5, 7))}/${Number(day.slice(8, 10))}`;
export const dayLabel = (day) => `${Number(day.slice(5, 7))}月${Number(day.slice(8, 10))}日（${weekday(day)}）`;
export const monthLabel = (day) => `${day.slice(0, 4)}年${Number(day.slice(5, 7))}月`;

// ---------- minutes ----------

export const appMinutes = (row) => Math.round((row?.app_seconds || 0) / 60);
export const totalMinutes = (row) => appMinutes(row) + (row?.other_minutes || 0);

export function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes}分`;
  const rest = minutes % 60;
  return `${Math.floor(minutes / 60)}時間${rest ? `${rest}分` : ""}`;
}

// A number of minutes for a big figure, its units smaller: 40時間19分.
export function timeHtml(minutes) {
  const part = (n, unit) => `${n}<small>${unit}</small>`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return part(rest, "分");
  return part(hours, "時間") + (rest ? part(rest, "分") : "");
}

// ---------- days and months ----------

// The days from `from` for `count` days, with their minutes.
function series(rows, from, count) {
  const byDay = new Map(rows.map((r) => [r.day, r]));
  return Array.from({ length: count }, (_, i) => {
    const day = addDays(from, i);
    const row = byDay.get(day);
    return { day, app: appMinutes(row), other: row?.other_minutes || 0, note: row?.note || "" };
  });
}

export function weekDays(rows, start) {
  return series(rows, start, 7);
}

export function monthDays(rows, start) {
  const next = addMonths(start, 1);
  return series(rows, start, Math.round((dayMs(next) - dayMs(start)) / 86400e3));
}

// Totals for a run of days.
export function summary(days) {
  const total = days.reduce((n, d) => n + d.app + d.other, 0);
  const studied = days.filter((d) => d.app + d.other > 0).length;
  return { total, studied, app: days.reduce((n, d) => n + d.app, 0), other: days.reduce((n, d) => n + d.other, 0) };
}

// Everything so far: the totals, the first day with study, and each month
// from that one to this one.
export function allTime(rows) {
  const days = rows
    .map((r) => ({ day: r.day, app: appMinutes(r), other: r.other_minutes || 0, note: r.note || "" }))
    .filter((d) => d.app + d.other > 0)
    .sort((a, b) => (a.day < b.day ? -1 : 1));
  const first = days[0]?.day || null;
  const months = [];
  if (first) {
    for (let m = monthStart(first); m <= monthStart(today()); m = addMonths(m, 1)) {
      months.push({ start: m, ...summary(days.filter((d) => d.day.startsWith(m.slice(0, 7)))) });
    }
  }
  return { ...summary(days), first, months };
}

export const studySplit = (row) => `アプリ ${formatMinutes(appMinutes(row))} ・ アプリ以外 ${formatMinutes(row?.other_minutes || 0)}`;
const splitOf = (sum) => `アプリ ${formatMinutes(sum.app)} ・ アプリ以外 ${formatMinutes(sum.other)}`;
// Only the kinds there were, for one day: "アプリ 18分 ・ アプリ以外 1時間".
const dayParts = (d) => [d.app && `アプリ ${formatMinutes(d.app)}`, d.other && `アプリ以外 ${formatMinutes(d.other)}`].filter(Boolean).join(" ・ ");

// ---------- bar lists ----------
// The week, the month and everything so far all look the same: a row each
// (a day, a week, a month) with its name, a bar and its total, lined up, so
// the eye goes down one column of names and one column of numbers. One soft
// color; the current day / week / month is the strong one.

// items: { name, sub, total, note, detail, current, future, href, data }; the
// note is always shown under the bar, the detail only when 詳細 is open. A bar is
// full at the longest one, or at `atLeast` minutes when all are shorter (so a
// week of a few minutes doesn't look full).
function barList(items, atLeast) {
  const max = Math.max(atLeast, ...items.map((it) => it.total));
  return `<ul class="bar-list">
    ${items.map((it) => {
      const cls = ["bar-row", it.current && "current", it.future && "future", it.total === 0 && !it.future && "zero"].filter(Boolean).join(" ");
      const inner = `
        <span class="bar-name">${it.name}${it.sub ? `<small>${it.sub}</small>` : ""}</span>
        <span class="bar-track">${it.total ? `<span class="bar-fill" style="width:${Math.max(3, (it.total / max) * 100)}%"></span>` : ""}</span>
        <span class="bar-value">${it.future ? "" : it.total ? formatMinutes(it.total) : "—"}</span>
        ${it.href || it.data ? `<span class="bar-go" aria-hidden="true">›</span>` : ""}
        ${it.note ? `<span class="bar-note">${it.note}</span>` : ""}
        ${it.detail ? `<span class="bar-detail">${it.detail}</span>` : ""}`;
      if (it.href && !it.future) return `<li><a class="${cls}" href="${it.href}">${inner}</a></li>`;
      if (it.data && !it.future) return `<li><button type="button" class="${cls}" ${it.data}>${inner}</button></li>`;
      return `<li><div class="${cls}">${inner}</div></li>`;
    }).join("")}
  </ul>`;
}

// ---------- panels ----------
// Used by the student's 勉強時間 page and the teacher's 勉強時間 tab: the week,
// the month, then everything so far. With editable, a day opens its 記入 page.

// The big total of a panel, and the numbers that go with it, as two tiles.
const headline = (label, total, side) => `<div class="headline">
    <div class="stat-tile main"><span>${label}</span><b class="big">${timeHtml(total)}</b></div>
    ${side ? `<div class="stat-tile side">${side}</div>` : ""}
  </div>`;

const navHtml = (key, title, atEnd) => `<div class="chart-nav">
    <button type="button" class="btn ghost small-btn" data-${key}="-1" aria-label="前">‹ 前</button>
    <h3><span class="period">${title}</span></h3>
    <button type="button" class="btn ghost small-btn" data-${key}="1" aria-label="次" ${atEnd ? "disabled" : ""}>次 ›</button>
  </div>`;

// 詳細をひらく / 閉じる: the split between app and other study, and each row's
// detail. Closed at first; bindPanels keeps it open or closed across redraws.
const detailsHtml = (key, sum) => `<div class="details-bar">
    <p class="split">${splitOf(sum)}</p>
    <button type="button" class="details-toggle" data-details="${key}" aria-expanded="false">詳細をひらく</button>
  </div>`;

export function weekPanel(rows, start, { editable = false } = {}) {
  const now = today();
  const days = weekDays(rows, start);
  const sum = summary(days);
  const items = days.map((d) => {
    const total = d.app + d.other;
    return {
      name: d.day === now ? "今日" : weekday(d.day),
      sub: md(d.day),
      total,
      current: d.day === now,
      future: d.day > now,
      detail: [dayParts(d), d.note && esc(d.note)].filter(Boolean).join(" ・ "),
      href: editable ? `#/study/edit/${d.day}` : "",
    };
  });
  return `<section class="card stack week-panel">
    ${navHtml("week", `${md(start)} 〜 ${md(addDays(start, 6))}`, start >= weekStart(now))}
    ${headline("この週の合計", sum.total, `<span>勉強した日</span><b>${sum.studied}<small> / 7日</small></b>`)}
    ${detailsHtml("week", sum)}
    ${barList(items, 60)}
    ${editable ? `<p class="muted small">日をタップすると、その日の時間を記入・編集できます。</p>` : ""}
  </section>`;
}

// The month by weeks (Monday to Sunday, only the days in this month); a week
// opens in the week panel above.
export function monthPanel(rows, start) {
  const now = today();
  const days = monthDays(rows, start);
  const sum = summary(days);
  const elapsed = days.filter((d) => d.day <= now).length || 1;
  const weeks = [];
  for (const d of days) {
    if (!weeks.length || weekStart(d.day) !== weekStart(weeks.at(-1)[0].day)) weeks.push([]);
    weeks.at(-1).push(d);
  }
  const items = weeks.map((week, i) => {
    const first = week[0].day;
    const last = week.at(-1).day;
    const s = summary(week);
    return {
      name: `第${i + 1}週`,
      total: s.total,
      current: first <= now && now <= last,
      future: first > now,
      note: first === last ? md(first) : `${md(first)}〜${md(last)}`,
      detail: s.total ? `勉強した日 ${s.studied}日 ・ ${splitOf(s)}` : "",
      data: `data-goto-week="${weekStart(first)}"`,
    };
  });
  return `<section class="card stack month-panel">
    ${navHtml("month", monthLabel(start), start >= monthStart(now))}
    ${headline("この月の合計", sum.total, `<span>勉強した日</span><b>${sum.studied}<small>日</small></b><span>1日平均 ${formatMinutes(Math.round(sum.total / elapsed))}</span>`)}
    ${detailsHtml("month", sum)}
    ${barList(items, 5 * 60)}
    <p class="muted small">週をタップすると、上でその週の日ごとの時間が見られます。</p>
  </section>`;
}

// Everything so far, and the last 12 months (a month opens in the month panel above).
export function totalPanel(rows) {
  const all = allTime(rows);
  if (!all.first) {
    return `<section class="card stack total-card">
      ${headline("これまでの合計", 0, "")}
      <p class="muted">勉強すると、ここに合計がたまっていきます。</p>
    </section>`;
  }
  const items = all.months.slice(-12).map((m) => ({
    name: `${Number(m.start.slice(5, 7))}月`,
    sub: m.start.slice(0, 4) === today().slice(0, 4) ? "" : `${m.start.slice(0, 4)}年`,
    total: m.total,
    current: m.start === monthStart(today()),
    detail: m.total ? `勉強した日 ${m.studied}日 ・ ${splitOf(m)}` : "",
    data: `data-goto-month="${m.start}"`,
  }));
  return `<section class="card stack total-card">
    ${headline("これまでの合計", all.total, `<span>勉強した日</span><b>${all.studied}<small>日</small></b><span>${all.first.slice(0, 4)}/${md(all.first)}から</span>`)}
    ${detailsHtml("total", all)}
    <h3 class="panel-sub">月ごとの合計</h3>
    ${barList(items, 20 * 60)}
  </section>`;
}

// Hooks up the ‹ › buttons, the 詳細 buttons and the weeks and months that open
// another panel; view is { week, month, open } (start days, and which panels
// have 詳細 open), changed in place before redraw() runs.
export function bindPanels(root, view, redraw) {
  const go = (selector) => root.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
  view.open ||= {};
  root.querySelectorAll("[data-details]").forEach((button) => {
    const key = button.dataset.details;
    const show = () => {
      button.closest("section").classList.toggle("open", !!view.open[key]);
      button.setAttribute("aria-expanded", !!view.open[key]);
      button.textContent = view.open[key] ? "詳細を閉じる" : "詳細をひらく";
    };
    show();
    button.addEventListener("click", () => {
      view.open[key] = !view.open[key];
      show();
    });
  });
  root.querySelectorAll("[data-week]").forEach((b) => b.addEventListener("click", () => {
    view.week = addDays(view.week, 7 * Number(b.dataset.week));
    redraw();
  }));
  root.querySelectorAll("[data-month]").forEach((b) => b.addEventListener("click", () => {
    view.month = addMonths(view.month, Number(b.dataset.month));
    redraw();
  }));
  root.querySelectorAll("[data-goto-week]").forEach((b) => b.addEventListener("click", () => {
    view.week = b.dataset.gotoWeek;
    redraw();
    go(".week-panel");
  }));
  root.querySelectorAll("[data-goto-month]").forEach((b) => b.addEventListener("click", () => {
    view.month = b.dataset.gotoMonth;
    redraw();
    go(".month-panel");
  }));
}

// ---------- the clock ----------

// Counts the time the app is on screen and in use (a tap, key or scroll in the
// last three minutes), and sends it about once a minute, while enabled() is
// true (signed in). onSent(seconds) lets the page add it to today's row.
const IDLE = 3 * 60e3;

export function startStudyClock(enabled, onSent) {
  let lastActive = Date.now();
  let lastTick = Date.now();
  let pending = 0;
  const active = () => (lastActive = Date.now());
  for (const type of ["pointerdown", "keydown", "scroll", "touchstart", "input"]) {
    addEventListener(type, active, { passive: true, capture: true });
  }

  const tick = () => {
    const t = Date.now();
    const gap = t - lastTick;
    lastTick = t;
    // A long gap means the phone slept; don't count it.
    if (enabled() && document.visibilityState === "visible" && t - lastActive < IDLE && gap < 15e3) pending += gap;
  };
  const flush = () => {
    const seconds = Math.floor(pending / 1000);
    if (seconds < 1) return;
    pending -= seconds * 1000;
    fetch("/api/study/ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seconds }),
      credentials: "same-origin",
      keepalive: true,
    }).then((r) => r.ok && onSent?.(seconds)).catch(() => {});
  };

  setInterval(() => {
    tick();
    if (pending >= 60e3) flush();
  }, 5000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      tick();
      flush();
    } else {
      lastTick = Date.now();
      active();
    }
  });
  addEventListener("pagehide", () => {
    tick();
    flush();
  });
}
