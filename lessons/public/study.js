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
export const shortDay = (day) => `${md(day)}（${weekday(day)}）`;
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

// A short one for a column or a calendar day: 45分, or 1時間 over 20分.
const stackedTime = (minutes) =>
  minutes < 60 ? `${minutes}分` : `${Math.floor(minutes / 60)}時間${minutes % 60 ? `<br>${minutes % 60}分` : ""}`;

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

const readout = (d) => `${dayLabel(d.day)}　合計 ${formatMinutes(d.app + d.other)}（アプリ ${formatMinutes(d.app)} ・ アプリ以外 ${formatMinutes(d.other)}）${d.note ? `　${d.note}` : ""}`;

// The two kinds of study, with their colors: the legend for the charts below it.
export function splitHtml(app, other) {
  return `<p class="split">
    <span><i class="swatch app" aria-hidden="true"></i>アプリで勉強 <b>${formatMinutes(app)}</b></span>
    <span><i class="swatch other" aria-hidden="true"></i>アプリ以外 <b>${formatMinutes(other)}</b></span>
  </p>`;
}

export const studySplit = (row) => `アプリ ${formatMinutes(appMinutes(row))} ・ アプリ以外 ${formatMinutes(row?.other_minutes || 0)}`;

// ---------- charts ----------

const COLUMN_MAX = 120; // px, the tallest column of the week

// One column per day, time in the app at the bottom and other study on top,
// each day's total written above it. The list under the chart has the same
// numbers, so the chart itself is hidden from screen readers.
function weekChartHtml(days) {
  const now = today();
  const max = Math.max(1, ...days.map((d) => d.app + d.other));
  return `<div class="week-chart" aria-hidden="true">
    ${days.map((d) => {
      const total = d.app + d.other;
      const cls = ["wcol", d.day === now && "today", d.day > now && "future"].filter(Boolean).join(" ");
      return `<div class="${cls}">
        <div class="wcol-plot">
          ${total ? `<span class="wcol-value">${stackedTime(total)}</span>
          <span class="stack-bar" style="height:${Math.max(4, Math.round((total / max) * COLUMN_MAX))}px">
            ${d.other ? `<i class="seg other" style="flex-grow:${d.other}"></i>` : ""}
            ${d.app ? `<i class="seg app" style="flex-grow:${d.app}"></i>` : ""}
          </span>` : ""}
        </div>
        <div class="wcol-day"><b>${d.day === now ? "今日" : weekday(d.day)}</b>${md(d.day)}</div>
      </div>`;
    }).join("")}
  </div>`;
}

// How much a day's color says: none, under 30 minutes, under 1 hour, under 2, 2 or more.
const LEVELS = [
  { from: 1, label: "30分未満" },
  { from: 30, label: "30分〜" },
  { from: 60, label: "1時間〜" },
  { from: 120, label: "2時間〜" },
];
const level = (minutes) => LEVELS.filter((l) => minutes >= l.from).length;

// A month as a calendar (Monday first): each day shows its total, darker for
// more. Tapping a day shows its numbers under it.
function calendarHtml(days) {
  const now = today();
  const lead = (new Date(dayMs(days[0].day)).getUTCDay() + 6) % 7;
  const past = days.filter((d) => d.day <= now).reverse();
  const shown = past.find((d) => d.app + d.other) || past[0];
  return `<figure class="calendar">
    <div class="cal-grid">
      ${["月", "火", "水", "木", "金", "土", "日"].map((w) => `<span class="cal-head" aria-hidden="true">${w}</span>`).join("")}
      ${"<span></span>".repeat(lead)}
      ${days.map((d) => {
        const total = d.app + d.other;
        const date = Number(d.day.slice(8));
        if (d.day > now) return `<span class="cal-day future"><span class="cal-date">${date}</span></span>`;
        return `<button type="button" class="cal-day lv${level(total)}${d.day === now ? " today" : ""}" data-readout="${esc(readout(d))}"
            aria-label="${esc(readout(d))}" aria-pressed="${d.day === shown?.day}">
          <span class="cal-date">${date}</span>
          <span class="cal-min">${total ? stackedTime(total) : ""}</span>
        </button>`;
      }).join("")}
    </div>
    <div class="cal-scale" aria-hidden="true">
      <span>色がこいほど、長く勉強した日</span>
      <span class="cal-keys">${LEVELS.map((l, i) => `<span><i class="cal-key lv${i + 1}"></i>${l.label}</span>`).join("")}</span>
    </div>
    <figcaption class="chart-readout" aria-live="polite">${shown ? esc(readout(shown)) : "まだこの月の記録はありません"}</figcaption>
  </figure>`;
}

// ---------- panels ----------
// Used by the student's 勉強時間 page and the teacher's 勉強時間 tab. With
// editable, each day of the week gets an 編集 link.

const longDay = (day) => `${day.slice(0, 4)}年${Number(day.slice(5, 7))}月${Number(day.slice(8, 10))}日`;
const monthName = (start) => (start.slice(0, 4) === today().slice(0, 4) ? `${Number(start.slice(5, 7))}月` : `${start.slice(0, 4)}年${Number(start.slice(5, 7))}月`);

// Everything so far, and the last 12 months as bars (tapping one opens it below).
export function totalPanel(rows) {
  const all = allTime(rows);
  if (!all.first) {
    return `<section class="card stack total-card">
      <p class="label">これまでの合計</p>
      <p class="hero">${timeHtml(0)}</p>
      <p class="muted">勉強すると、ここに合計がたまっていきます。</p>
    </section>`;
  }
  const months = all.months.slice(-12);
  const max = Math.max(1, ...months.map((m) => m.total));
  return `<section class="card stack total-card">
    <p class="label">これまでの合計</p>
    <p class="hero">${timeHtml(all.total)}</p>
    <p class="muted">${longDay(all.first)}から ・ 勉強した日 <b>${all.studied}日</b></p>
    ${splitHtml(all.app, all.other)}
    <h3 class="panel-sub">月ごとの合計</h3>
    <ul class="month-bars">
      ${months.map((m) => `<li><button type="button" class="mbar" data-goto-month="${m.start}" aria-label="${monthName(m.start)} ${formatMinutes(m.total)}">
        <span class="mbar-name">${monthName(m.start)}</span>
        <span class="mbar-track">${m.total ? `<span class="hbar" style="width:${Math.max(2, (m.total / max) * 100)}%">
          ${m.app ? `<i class="seg app" style="flex-grow:${m.app}"></i>` : ""}
          ${m.other ? `<i class="seg other" style="flex-grow:${m.other}"></i>` : ""}
        </span>` : ""}</span>
        <span class="mbar-value">${formatMinutes(m.total)}</span>
      </button></li>`).join("")}
    </ul>
  </section>`;
}

export function weekPanel(rows, start, { editable = false } = {}) {
  const now = today();
  const days = weekDays(rows, start);
  const sum = summary(days);
  return `<section class="card stack week-panel">
    <div class="chart-nav">
      <button type="button" class="btn ghost small-btn" data-week="-1" aria-label="前の週">‹ 前</button>
      <h3>${shortDay(start)} 〜 ${shortDay(addDays(start, 6))}</h3>
      <button type="button" class="btn ghost small-btn" data-week="1" aria-label="次の週" ${start >= weekStart(now) ? "disabled" : ""}>次 ›</button>
    </div>
    <div class="period-total">
      <span>この週の合計</span>
      <b class="big">${timeHtml(sum.total)}</b>
      <span>勉強した日 <b>${sum.studied} / 7日</b></span>
    </div>
    ${splitHtml(sum.app, sum.other)}
    ${weekChartHtml(days)}
    <ul class="rows study-days">
      ${days.filter((d) => d.day <= now).reverse().map((d) => {
        const total = d.app + d.other;
        return `<li${total ? "" : ' class="empty"'}>
          <div class="main">
            <div class="day-line"><span>${dayLabel(d.day)}</span><b>${total ? formatMinutes(total) : "記録なし"}</b></div>
            ${total ? `<div class="sub">${studySplit({ app_seconds: d.app * 60, other_minutes: d.other })}${d.note ? `　${esc(d.note)}` : ""}</div>` : ""}
          </div>
          ${editable ? `<div class="tools"><a class="btn ghost small-btn" href="#/study/edit/${d.day}">編集</a></div>` : ""}
        </li>`;
      }).join("")}
    </ul>
  </section>`;
}

export function monthPanel(rows, start) {
  const now = today();
  const days = monthDays(rows, start);
  const sum = summary(days);
  const elapsed = days.filter((d) => d.day <= now).length || 1;
  return `<section class="card stack month-panel">
    <div class="chart-nav">
      <button type="button" class="btn ghost small-btn" data-month="-1" aria-label="前の月">‹ 前</button>
      <h3>${monthLabel(start)}</h3>
      <button type="button" class="btn ghost small-btn" data-month="1" aria-label="次の月" ${start >= monthStart(now) ? "disabled" : ""}>次 ›</button>
    </div>
    <div class="period-total">
      <span>この月の合計</span>
      <b class="big">${timeHtml(sum.total)}</b>
      <span>勉強した日 <b>${sum.studied}日</b> ・ 1日平均 <b>${formatMinutes(Math.round(sum.total / elapsed))}</b></span>
    </div>
    ${splitHtml(sum.app, sum.other)}
    ${calendarHtml(days)}
  </section>`;
}

// Hooks up the ‹ › buttons, the calendar days and the month bars; view is
// { week, month } (start days), changed in place before redraw() runs.
export function bindPanels(root, view, redraw) {
  root.querySelectorAll(".calendar").forEach((cal) => {
    const out = cal.querySelector(".chart-readout");
    cal.querySelectorAll(".cal-day[data-readout]").forEach((day) => day.addEventListener("click", () => {
      cal.querySelectorAll(".cal-day[data-readout]").forEach((d) => d.setAttribute("aria-pressed", d === day));
      out.textContent = day.dataset.readout;
    }));
  });
  root.querySelectorAll("[data-week]").forEach((b) => b.addEventListener("click", () => {
    view.week = addDays(view.week, 7 * Number(b.dataset.week));
    redraw();
  }));
  root.querySelectorAll("[data-month]").forEach((b) => b.addEventListener("click", () => {
    view.month = addMonths(view.month, Number(b.dataset.month));
    redraw();
  }));
  root.querySelectorAll("[data-goto-month]").forEach((b) => b.addEventListener("click", () => {
    view.month = b.dataset.gotoMonth;
    redraw();
    root.querySelector(".month-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
