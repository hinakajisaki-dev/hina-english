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

const tickLabel = (minutes) => (minutes < 60 ? `${minutes}分` : `${+(minutes / 60).toFixed(1)}時間`);

// ---------- charts ----------

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

// A clean axis: 3–4 ticks of 10, 15, 30 minutes or whole hours.
function axis(max) {
  const step = [10, 15, 30, 60, 120, 180, 240].find((s) => max / s <= 4) || 300;
  const top = Math.max(step, Math.ceil(max / step) * step);
  const ticks = [];
  for (let m = step; m <= top; m += step) ticks.push(m);
  return { top, ticks };
}

const readout = (d) => `${dayLabel(d.day)}　合計 ${formatMinutes(d.app + d.other)}（アプリ ${formatMinutes(d.app)} ・ アプリ以外 ${formatMinutes(d.other)}）${d.note ? `　${d.note}` : ""}`;

// Stacked columns, one per day: time in the app at the bottom, other study on
// top. Tapping (or hovering) a column shows its numbers under the chart.
// `labelEvery` thins the day labels for a month.
export function chartHtml(days, { labelEvery = 1, wide = false } = {}) {
  const max = Math.max(0, ...days.map((d) => d.app + d.other));
  const { top, ticks } = axis(max);
  const now = today();
  // Shown first: the last day with study so far (findLast is too new for older iPhones).
  const past = days.filter((d) => d.day <= now).reverse();
  const shown = past.find((d) => d.app + d.other) || past[0] || days[0];
  const pct = (m) => `${(m / top) * 100}%`;
  return `<figure class="study-chart${wide ? " wide" : ""}">
    <div class="chart-legend" aria-hidden="true">
      <span><i class="key app"></i>アプリで勉強</span>
      <span><i class="key other"></i>アプリ以外の勉強</span>
    </div>
    <div class="chart-plot">
      <div class="chart-grid" aria-hidden="true">
        ${ticks.map((t) => `<div class="tick" style="bottom:${pct(t)}"><span>${tickLabel(t)}</span></div>`).join("")}
      </div>
      <div class="chart-cols">
        ${days.map((d, i) => {
          const future = d.day > now;
          const label = i % labelEvery === 0 ? (labelEvery === 1 ? `${weekday(d.day)}<br>${md(d.day)}` : Number(d.day.slice(8))) : "";
          return `<button type="button" class="col${d.day === now ? " today" : ""}" data-day="${d.day}" ${future ? "disabled" : ""}
              aria-pressed="${d.day === shown.day}" aria-label="${esc(readout(d))}" data-readout="${esc(readout(d))}">
            <span class="stack-bar" style="height:${pct(d.app + d.other)}">
              ${d.other ? `<i class="seg other" style="flex-grow:${d.other}"></i>` : ""}
              ${d.app ? `<i class="seg app" style="flex-grow:${d.app}"></i>` : ""}
            </span>
            <span class="col-label">${label}</span>
          </button>`;
        }).join("")}
      </div>
    </div>
    <figcaption class="chart-readout" aria-live="polite">${esc(readout(shown))}</figcaption>
  </figure>`;
}

// Makes the columns in `root` show their numbers when tapped or hovered.
export function bindCharts(root) {
  root.querySelectorAll(".study-chart").forEach((chart) => {
    const out = chart.querySelector(".chart-readout");
    const pick = (col) => {
      chart.querySelectorAll(".col").forEach((c) => c.setAttribute("aria-pressed", c === col));
      out.textContent = col.dataset.readout;
    };
    chart.querySelectorAll(".col:not([disabled])").forEach((col) => {
      col.addEventListener("click", () => pick(col));
      col.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && pick(col));
    });
  });
}

// Totals for a run of days.
export function summary(days) {
  const total = days.reduce((n, d) => n + d.app + d.other, 0);
  const studied = days.filter((d) => d.app + d.other > 0).length;
  return { total, studied, app: days.reduce((n, d) => n + d.app, 0), other: days.reduce((n, d) => n + d.other, 0) };
}

// ---------- week and month panels ----------
// Used by the student's 勉強時間 page and the teacher's 勉強時間 tab. With
// editable, each day of the week gets an 編集 link.

export const studySplit = (row) => `アプリ ${formatMinutes(appMinutes(row))} ・ アプリ以外 ${formatMinutes(row?.other_minutes || 0)}`;

export function weekPanel(rows, start, { editable = false } = {}) {
  const now = today();
  const days = weekDays(rows, start);
  const sum = summary(days);
  return `<section class="card stack">
    <div class="chart-nav">
      <button type="button" class="btn ghost small-btn" data-week="-1" aria-label="前の週">‹ 前</button>
      <h3>${shortDay(start)} 〜 ${shortDay(addDays(start, 6))}</h3>
      <button type="button" class="btn ghost small-btn" data-week="1" aria-label="次の週" ${start >= weekStart(now) ? "disabled" : ""}>次 ›</button>
    </div>
    <div class="chart-stats">
      <p><span>この週の合計</span><br><b class="big">${formatMinutes(sum.total)}</b></p>
      <p><span>勉強した日</span><br><b class="big">${sum.studied}<small> / 7日</small></b></p>
    </div>
    ${chartHtml(days)}
    <ul class="rows study-days">
      ${days.filter((d) => d.day <= now).reverse().map((d) => `<li>
        <div class="main"><b>${dayLabel(d.day)}　${formatMinutes(d.app + d.other)}</b>
          <div class="sub">${studySplit({ app_seconds: d.app * 60, other_minutes: d.other })}${d.note ? `　${esc(d.note)}` : ""}</div></div>
        ${editable ? `<div class="tools"><a class="btn ghost small-btn" href="#/study/edit/${d.day}">編集</a></div>` : ""}
      </li>`).join("")}
    </ul>
  </section>`;
}

export function monthPanel(rows, start) {
  const now = today();
  const days = monthDays(rows, start);
  const sum = summary(days);
  const elapsed = days.filter((d) => d.day <= now).length || 1;
  return `<section class="card stack">
    <div class="chart-nav">
      <button type="button" class="btn ghost small-btn" data-month="-1" aria-label="前の月">‹ 前</button>
      <h3>${monthLabel(start)}</h3>
      <button type="button" class="btn ghost small-btn" data-month="1" aria-label="次の月" ${start >= monthStart(now) ? "disabled" : ""}>次 ›</button>
    </div>
    <div class="chart-stats">
      <p><span>この月の合計</span><br><b class="big">${formatMinutes(sum.total)}</b></p>
      <p><span>勉強した日</span><br><b class="big">${sum.studied}<small> 日</small></b></p>
      <p><span>1日平均</span><br><b class="big">${formatMinutes(Math.round(sum.total / elapsed))}</b></p>
    </div>
    ${chartHtml(days, { labelEvery: 7 })}
  </section>`;
}

// Hooks up the charts and the ‹ › buttons; view is { week, month } (start days),
// changed in place before redraw() runs.
export function bindPanels(root, view, redraw) {
  bindCharts(root);
  root.querySelectorAll("[data-week]").forEach((b) => b.addEventListener("click", () => {
    view.week = addDays(view.week, 7 * Number(b.dataset.week));
    redraw();
  }));
  root.querySelectorAll("[data-month]").forEach((b) => b.addEventListener("click", () => {
    view.month = addMonths(view.month, Number(b.dataset.month));
    redraw();
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
