// Spelling fixes in a diary's correction. The student only sees the right
// spelling, in blue, in the corrected diary: a point in 直したところ that only
// fixes spelling isn't shown (the teacher asked for this). Shared by the
// student app, the teacher page and the server.
//
// A correction has `spelling`, [{ wrong, right }], from the AI. One made before
// that list existed has none, so its spelling points are found by what their
// explanation says (つづり, スペル) instead.

const core = (word) => String(word).toLowerCase().replace(/^[^\p{L}\p{N}']+|[^\p{L}\p{N}']+$/gu, "");
const words = (text) => String(text ?? "").split(/\s+/).map(core).filter(Boolean);
const SPELLING_WHY = /スペル|つづり|綴/;

// The words a point changes, as [wrong, right]; null when it adds or drops words.
function changedWords(fix) {
  const before = words(fix.before);
  const after = words(fix.after);
  if (before.length !== after.length) return null;
  const pairs = before.map((word, i) => [word, after[i]]).filter(([a, b]) => a !== b);
  return pairs.length ? pairs : null;
}

// wrong → right, in lowercase without punctuation.
export function spellingMap(correction) {
  const map = new Map();
  if (Array.isArray(correction?.spelling)) {
    for (const fix of correction.spelling) {
      const wrong = core(fix?.wrong ?? "");
      const right = core(fix?.right ?? "");
      if (wrong && right && wrong !== right) map.set(wrong, right);
    }
    return map;
  }
  for (const fix of correction?.corrections ?? []) {
    const pairs = SPELLING_WHY.test(fix.why ?? "") && changedWords(fix);
    if (pairs) for (const [wrong, right] of pairs) map.set(wrong, right);
  }
  return map;
}

// The same word, misspelled (both may have punctuation around them).
export const isSpelling = (map, wrong, right) => map.get(core(wrong)) === core(right);

// A point that changes nothing but spelling.
export function onlySpelling(fix, map) {
  const pairs = changedWords(fix);
  return !!pairs && pairs.every(([wrong, right]) => map.get(wrong) === right);
}

// The points to show in 直したところ.
export function shownPoints(correction) {
  const map = spellingMap(correction);
  return correction.corrections.filter((fix) => !onlySpelling(fix, map));
}
