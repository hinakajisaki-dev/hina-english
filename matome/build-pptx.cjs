// Converts a slides.html deck into an editable .pptx (for PowerPoint / Google Slides).
// Chromium lays the HTML out; every box and line of text is then re-created as a native
// shape or text box at the same position, so the result matches the PDF but stays editable.
// Usage: npm run matome:pptx -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pptx
const { chromium } = require("playwright");
const PptxGenJS = require("pptxgenjs");
const JSZip = require("jszip");
const { writeFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { pathToFileURL } = require("node:url");

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node build-pptx.cjs <slides.html> <out.pptx>");
  process.exit(1);
}

const PX = 1 / 96; // CSS px -> inches
const px = (v) => Math.round(v) * PX; // whole pixels keep the XML small and repetitive
const PT = 0.75; // CSS px -> points

// Runs in the page: returns one list of drawable items per .slide, in paint order.
function extract() {
  const hex = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    if (a === 0) return null;
    return { hex: [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase(), alpha: a };
  };
  const isInline = (el) => getComputedStyle(el).display === "inline";

  function textRuns(el, out, line) {
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.replace(/\s+/g, " ");
        if (!text) continue; // whitespace-only nodes are kept: they are the spaces between inline runs
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = [...range.getClientRects()].filter((r) => r.width > 0);
        const cs = getComputedStyle(node.parentElement);
        const mark = node.parentElement.closest("mark");
        out.push({
          line: line.n,
          text,
          rects: rects.map((r) => ({ l: r.left, t: r.top, r: r.right, b: r.bottom })),
          color: hex(cs.color).hex,
          size: parseFloat(cs.fontSize),
          bold: parseInt(cs.fontWeight, 10) >= 600,
          latinFont: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
          highlight: mark ? getComputedStyle(document.documentElement).getPropertyValue("--marker").trim().replace("#", "") : null,
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === "BR") line.n++;
        else if (isInline(node)) textRuns(node, out, line);
      }
    }
  }

  const slides = [];
  for (const slide of document.querySelectorAll(".slide")) {
    const origin = slide.getBoundingClientRect();
    const items = [];
    const box = (r) => ({ x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height });

    const visit = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none") return;
      const r = el.getBoundingClientRect();
      const b = box(r);

      if (el !== slide && el.tagName !== "MARK") {
        const fill = hex(cs.backgroundColor);
        const bw = ["Top", "Right", "Bottom", "Left"].map((s) => parseFloat(cs[`border${s}Width`]) || 0);
        const borderAll = bw.every((w) => w > 0);
        const border = borderAll ? { color: hex(cs.borderTopColor).hex, width: bw[0], dash: cs.borderTopStyle === "dashed" } : null;
        if (fill || border) {
          const rad = cs.borderTopLeftRadius;
          const min = Math.min(b.w, b.h);
          const radius = Math.min(rad.endsWith("%") ? (parseFloat(rad) / 100) * min : parseFloat(rad) || 0, min / 2);
          items.push({
            kind: "shape",
            ...b,
            fill,
            border,
            radius,
            oval: radius >= min / 2 - 0.5 && Math.abs(b.w - b.h) < 1,
            shadow: cs.boxShadow !== "none",
          });
        }
        if (!borderAll && bw[0] > 0) {
          items.push({ kind: "line", x: b.x, y: b.y + bw[0] / 2, w: b.w, color: hex(cs.borderTopColor).hex, width: bw[0], dash: cs.borderTopStyle === "dashed" });
        }
      }

      // Own text (text nodes + inline descendants), one item per visual line.
      if (!isInline(el)) {
        const runs = [];
        textRuns(el, runs, { n: 0 });
        const lines = new Map();
        for (const run of runs) {
          if (!lines.has(run.line)) lines.set(run.line, []);
          lines.get(run.line).push(run);
        }
        const content = {
          l: r.left + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth),
          r: r.right - parseFloat(cs.paddingRight) - parseFloat(cs.borderRightWidth),
        };
        for (let lineRuns of lines.values()) {
          // Drop the indentation whitespace around a line; keep spaces between words.
          while (lineRuns.length && !lineRuns[0].text.trim()) lineRuns.shift();
          while (lineRuns.length && !lineRuns[lineRuns.length - 1].text.trim()) lineRuns.pop();
          if (!lineRuns.length) continue;
          lineRuns[0].text = lineRuns[0].text.trimStart();
          lineRuns[lineRuns.length - 1].text = lineRuns[lineRuns.length - 1].text.trimEnd();
          const rects = lineRuns.flatMap((run) => run.rects);
          if (!rects.length) continue;
          const u = {
            l: Math.min(...rects.map((q) => q.l)),
            t: Math.min(...rects.map((q) => q.t)),
            r: Math.max(...rects.map((q) => q.r)),
            b: Math.max(...rects.map((q) => q.b)),
          };
          const gapL = u.l - content.l;
          const gapR = content.r - u.r;
          const centered = gapL > 3 && Math.abs(gapL - gapR) < 3;
          items.push({
            kind: "text",
            x: u.l - origin.left,
            y: u.t - origin.top,
            w: u.r - u.l,
            h: u.b - u.t,
            align: centered ? "center" : "left",
            runs: lineRuns.map(({ rects: _, line: __, ...run }) => run),
          });
        }

        // The divider drawn by .label::after
        if (el.classList.contains("label")) {
          const after = getComputedStyle(el, "::after");
          const textRight = Math.max(...runs.flatMap((run) => run.rects.map((q) => q.r)));
          const x = textRight + parseFloat(cs.columnGap || cs.gap || 0);
          items.push({ kind: "line", x: x - origin.left, y: r.top + r.height / 2 - origin.top, w: r.right - x, color: hex(after.backgroundColor).hex, width: parseFloat(after.height) });
        }
      }

      for (const child of el.children) if (!isInline(child) || child.tagName === "MARK") visit(child);
    };
    visit(slide);
    slides.push({ bg: hex(getComputedStyle(slide).backgroundColor) || hex(getComputedStyle(document.body).backgroundColor), items });
  }
  return { title: document.title, slides };
}

// Latin glyphs come from the element's first font; everything else (kana, kanji,
// full-width punctuation) falls back to the Japanese font, just like in the browser.
function splitByScript(run) {
  const JA = "Zen Maru Gothic";
  if (run.latinFont === JA) return [{ ...run, font: JA }];
  const parts = run.text.match(/[\u0000-῿]+|[^\u0000-῿]+/g) || [];
  return parts.map((text) => ({ ...run, text, font: /^[\u0000-῿]/.test(text) ? run.latinFont : JA }));
}

// pptxgenjs always writes an (empty) notes page per slide. They are dead weight here,
// so remove them with their references, then repack at maximum compression.
async function withoutNotes(buffer) {
  const zip = await JSZip.loadAsync(buffer);
  const edit = async (path, fn) => zip.file(path, fn(await zip.file(path).async("string")));
  zip.remove("ppt/notesSlides");
  zip.remove("ppt/notesMasters");
  await edit("ppt/presentation.xml", (x) => x.replace(/<p:notesMasterIdLst>.*?<\/p:notesMasterIdLst>/, ""));
  await edit("[Content_Types].xml", (x) => x.replace(/<Override PartName="\/ppt\/notes(Slides|Masters)\/[^>]*\/>/g, ""));
  for (const path of Object.keys(zip.files)) {
    if (/^ppt\/(slides\/)?_rels\/.*\.rels$/.test(path)) {
      await edit(path, (x) => x.replace(/<Relationship [^>]*relationships\/notes(Slide|Master)"[^>]*\/>/g, ""));
    }
  }
  // Drop attributes that only restate defaults, and leave the zip's folder entries behind.
  const out = new JSZip();
  for (const [path, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    let data = await entry.async("string");
    if (/^ppt\/slides\/slide\d+\.xml$/.test(path)) {
      data = data
        .replace(/ (dirty|rtlCol|indent|marL)="0"| lang="en-US"| pitchFamily="\d+" charset="-?\d+"/g, "")
        .replace(/<a:buNone\/>|<a:endParaRPr[^>]*\/>|<a:cs typeface="[^"]*"\/>/g, "");
    }
    out.file(path, data, { createFolders: false });
  }
  return out.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 9 } });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(pathToFileURL(resolve(input)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const deck = await page.evaluate(extract);
  await browser.close();

  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in == 1280 x 720 px
  pres.title = deck.title;

  for (const s of deck.slides) {
    const slide = pres.addSlide();
    slide.background = { color: s.bg.hex };
    for (const it of s.items) {
      if (it.kind === "shape") {
        const opts = { x: px(it.x), y: px(it.y), w: px(it.w), h: px(it.h) };
        opts.fill = it.fill ? { color: it.fill.hex, transparency: Math.round((1 - it.fill.alpha) * 100) } : { type: "none" };
        opts.line = it.border ? { color: it.border.color, width: it.border.width * PT, dashType: it.border.dash ? "dash" : "solid" } : { type: "none" };
        if (it.shadow) opts.shadow = { type: "outer", color: "22304A", opacity: 0.1, blur: 12, offset: 4, angle: 90 };
        let shape = pres.shapes.RECTANGLE;
        if (it.oval) shape = pres.shapes.OVAL;
        else if (it.radius > 0) {
          shape = pres.shapes.ROUNDED_RECTANGLE;
          opts.rectRadius = it.radius * PX;
        }
        slide.addShape(shape, opts);
      } else if (it.kind === "line") {
        slide.addShape(pres.shapes.LINE, {
          x: px(it.x), y: px(it.y), w: px(it.w), h: 0,
          line: { color: it.color, width: it.width * PT, dashType: it.dash ? "dash" : "solid" },
        });
      } else {
        // Leave slack so a slightly different text renderer never wraps a line.
        const slack = it.w * 0.15 + 12;
        const x = it.align === "center" ? it.x - slack / 2 : it.x;
        const runs = it.runs.flatMap(splitByScript).map((run) => ({
          text: run.text,
          options: {
            fontFace: run.font,
            fontSize: Math.round(run.size * PT * 2) / 2,
            color: run.color,
            bold: run.bold,
            ...(run.highlight ? { highlight: run.highlight } : {}),
          },
        }));
        slide.addText(runs, {
          x: px(x), y: px(it.y), w: px(it.w + slack), h: px(it.h),
          margin: 0, align: it.align, valign: "middle", isTextBox: true,
        });
      }
    }
  }

  writeFileSync(output, await withoutNotes(await pres.write({ outputType: "STREAM" })));
  console.log(`wrote ${output}`);
})();
