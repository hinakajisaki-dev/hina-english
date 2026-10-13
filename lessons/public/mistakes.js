// What went wrong in a typed English answer. The answer is compared word by
// word with the closest right answer, and each difference is named:
//   spelling  a misspelled word (eveyy → every, schoo → school)
//   grammar   the right word in the wrong form (is → are, like → likes, buy → bought)
//   word      a different word (in → at)
//   extra     a word that isn't needed
//   missing   a word that is left out
//   order     the right words in the wrong order
import { normalizeWords } from "./common.js";

// ---------- words ----------

// Each word of a text as { raw, norm }: raw as typed (with its punctuation),
// norm lowercased without punctuation. "I'm" becomes two words, I and am.
function words(text) {
  return String(text).trim().split(/\s+/).filter(Boolean).flatMap((piece) => {
    const norms = normalizeWords(piece);
    if (norms.length === 1) return [{ raw: piece, norm: norms[0] }];
    const capital = /^[A-Z]/.test(piece);
    return norms.map((norm, i) => ({ raw: i === 0 && capital ? norm[0].toUpperCase() + norm.slice(1) : norm, norm }));
  });
}

// Letters changed, added, removed or swapped to turn one word into the other.
function spellingDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

// A misspelling of `right`: a letter or two off, or the word cut short (schoo, morn).
function misspelled(given, right) {
  if (right.length < 3 || /^\d+$/.test(right)) return false;
  const allowed = right.length <= 5 ? 1 : right.length <= 8 ? 2 : 3;
  if (spellingDistance(given, right) <= allowed) return true;
  return given.length >= 3 && right.startsWith(given) && right.length - given.length <= 4;
}

// ---------- word forms ----------

const GROUPS = [
  { label: "be動詞", words: ["am", "is", "are", "was", "were", "be", "been", "being"] },
  { label: "do / does / did", words: ["do", "does", "did", "done"] },
  { label: "have / has / had", words: ["have", "has", "had"] },
  { label: "a / an / the", words: ["a", "an", "the"] },
  { label: "代名詞の形", words: ["i", "me", "my", "mine"] },
  { label: "代名詞の形", words: ["he", "him", "his"] },
  { label: "代名詞の形", words: ["she", "her", "hers"] },
  { label: "代名詞の形", words: ["we", "us", "our", "ours"] },
  { label: "代名詞の形", words: ["they", "them", "their", "theirs"] },
  { label: "代名詞の形", words: ["you", "your", "yours"] },
  { label: "this / these", words: ["this", "these"] },
  { label: "that / those", words: ["that", "those"] },
];

// Irregular verbs: base, past, past participle.
const IRREGULAR = [
  "go went gone", "come came come", "get got gotten", "eat ate eaten", "drink drank drunk", "see saw seen",
  "take took taken", "make made made", "buy bought bought", "bring brought brought", "think thought thought",
  "teach taught taught", "catch caught caught", "read read read", "write wrote written", "swim swam swum",
  "run ran run", "sit sat sat", "stand stood stood", "understand understood understood", "say said said",
  "tell told told", "sell sold sold", "give gave given", "find found found", "leave left left", "meet met met",
  "sleep slept slept", "feel felt felt", "keep kept kept", "spend spent spent", "send sent sent", "lose lost lost",
  "pay paid paid", "hear heard heard", "know knew known", "speak spoke spoken", "begin began begun",
  "wake woke woken", "ring rang rung", "sing sang sung", "win won won", "wear wore worn", "drive drove driven",
  "ride rode ridden", "fly flew flown", "grow grew grown", "forget forgot forgotten", "choose chose chosen",
  "become became become", "build built built", "hold held held", "put put put", "cut cut cut", "let let let",
].map((line) => line.split(" "));

const VOWELS = /[aeiou]/;

// The regular forms of a verb: likes, liked, liking, studies, studied, stopped …
function regularForms(base) {
  const forms = new Set([`${base}s`, `${base}es`, `${base}ed`, `${base}d`, `${base}ing`]);
  if (base.endsWith("e")) forms.add(`${base.slice(0, -1)}ing`);
  if (/[^aeiou]y$/.test(base)) {
    forms.add(`${base.slice(0, -1)}ies`);
    forms.add(`${base.slice(0, -1)}ied`);
  }
  const [third, second, last] = base.slice(-3);
  if (base.length >= 3 && !VOWELS.test(last) && VOWELS.test(second) && !VOWELS.test(third) && !"wxy".includes(last)) {
    forms.add(`${base}${last}ed`);
    forms.add(`${base}${last}ing`);
  }
  return forms;
}

const isPast = (word) => IRREGULAR.some(([base, past]) => past === word && base !== word) || /ed$/.test(word);
// Words that end in -ing without being a verb + ing.
const NOT_ING = new Set([
  "morning", "evening", "thing", "something", "nothing", "anything", "everything", "king", "ring", "spring",
  "string", "sing", "bring", "swing", "wing", "during", "ceiling", "sibling", "pudding", "wedding",
]);
const isIng = (word) => /ing$/.test(word) && !NOT_ING.has(word);
const isS = (word, base) => word === `${base}s` || word === `${base}es` || word === `${base.slice(0, -1)}ies`;
const ending = (word) => (isIng(word) ? "ing" : /ed$/.test(word) ? "ed" : /s$/.test(word) ? "s" : "");

// Two forms of the same word, and a short note on what to change; null when
// they aren't two forms of one word.
function formChange(given, right) {
  // buy → bought, and the made-up buyed → bought
  const irregular = IRREGULAR.find((forms) => forms.includes(right) && (forms.includes(given) || forms[0] === stem(given)));
  if (irregular && given !== right) {
    const [base, past, participle] = irregular;
    if (!irregular.includes(given)) {
      if (right === past) return `${base} の過去形は ${past}`;
      if (right === participle) return `${base} の過去分詞は ${participle}`;
      return "元の形にする";
    }
    if (right === base && right !== past) return "元の形にする";
    return right === past ? "過去の形にする" : right === participle ? "過去分詞の形にする" : "動詞の形";
  }
  // writeing → writing, swiming → swimming: the right ending, misspelled
  if (ending(given) && ending(given) === ending(right)) return null;
  let base = null;
  if (NOT_ING.has(right) || NOT_ING.has(given)) return null;
  if (regularForms(given).has(right)) base = given;
  else if (regularForms(right).has(given)) base = right;
  else if (regularForms(stem(given)).has(right)) base = stem(given);
  if (!base) return null;
  if (isS(right, base) && given === base) return "s をつける";
  if (isS(given, base) && right === base) return "s はいらない";
  if (isIng(right)) return "ing の形にする";
  if (right === base) return "元の形にする";
  if (isPast(right)) return "過去の形にする";
  return "形がちがう";
}

// A rough base for a regular form (likes → like, played → play), to match likes with liked.
function stem(word) {
  return word.replace(/(ies|ied)$/, "y").replace(/(ing|ed|es|s)$/, "");
}

// What kind of grammar slip turns `given` into `right`, or null if they aren't related.
function grammarNote(given, right) {
  const group = GROUPS.find((g) => g.words.includes(given) && g.words.includes(right));
  if (group) return group.label;
  return formChange(given, right);
}

// ---------- comparing ----------

// Word-by-word alignment with the fewest changes. A misspelling or another
// form of the word is a small change; any other word in its place is a
// larger one; a word added or left out is in between.
function align(given, right) {
  const relation = (a, b) => {
    if (a.norm === b.norm) return { cost: 0 };
    const note = grammarNote(a.norm, b.norm);
    if (note) return { cost: 0.4, type: "grammar", note };
    if (misspelled(a.norm, b.norm)) return { cost: 0.4, type: "spelling" };
    return { cost: 1.6, type: "word" };
  };
  const n = given.length, m = right.length;
  const cost = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) cost[i][0] = i;
  for (let j = 0; j <= m; j++) cost[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      cost[i][j] = Math.min(cost[i - 1][j] + 1, cost[i][j - 1] + 1, cost[i - 1][j - 1] + relation(given[i - 1], right[j - 1]).cost);
    }
  }
  const steps = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    const pair = i > 0 && j > 0 ? relation(given[i - 1], right[j - 1]) : null;
    if (pair && cost[i][j] === cost[i - 1][j - 1] + pair.cost) {
      steps.unshift({ given: given[i - 1], right: right[j - 1], ...pair, type: pair.type || "same" });
      i--; j--;
    } else if (i > 0 && cost[i][j] === cost[i - 1][j] + 1) {
      steps.unshift({ given: given[i - 1], type: "extra" });
      i--;
    } else {
      steps.unshift({ right: right[j - 1], type: "missing" });
      j--;
    }
  }
  return { cost: cost[n][m], steps };
}

const sameWords = (a, b) => a.map((w) => w.norm).sort().join(" ") === b.map((w) => w.norm).sort().join(" ");
const clean = (word) => word.raw.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9'!?.]+$/g, "").replace(/[.!?]+$/, "");

// The mistakes in `given` against the closest of `answers`:
// { answer, steps, mistakes: [{ type, given, right, note }], onlySpelling, grammar }.
export function findMistakes(given, answers) {
  const mine = words(given);
  const plain = (list) => list.map((w) => w.norm).join(" ");
  // The same words in the same order (only capitals or punctuation differ): nothing to point out.
  const same = answers.find((answer) => plain(words(answer)) === plain(mine));
  if (same) return { answer: same, steps: words(same).map((w) => ({ right: w, given: w, type: "same" })), mistakes: [], onlySpelling: false, grammar: false };
  let best = null;
  for (const answer of answers) {
    const theirs = words(answer);
    const result = sameWords(mine, theirs)
      ? { cost: 0.5, order: true, steps: theirs.map((w) => ({ right: w, type: "same" })), mine }
      : align(mine, theirs);
    if (!best || result.cost < best.cost) best = { ...result, answer };
  }
  if (best.order) {
    return { answer: best.answer, order: true, mine, mistakes: [{ type: "order" }], onlySpelling: false, grammar: true };
  }
  const mistakes = [];
  best.steps.forEach((s, k) => {
    if (s.type === "same") return;
    const before = best.steps.slice(0, k).reverse().find((x) => x.right);
    mistakes.push({
      type: s.type,
      given: s.given && clean(s.given),
      right: s.right && clean(s.right),
      note: s.note,
      after: s.type === "missing" && before ? clean(before.right) : null,
    });
  });
  return {
    answer: best.answer,
    steps: best.steps,
    mistakes,
    onlySpelling: mistakes.length > 0 && mistakes.every((m) => m.type === "spelling"),
    grammar: mistakes.some((m) => m.type === "grammar"),
  };
}
