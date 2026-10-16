// Scott先生とのコラボ LIVE「ネイティブっぽく長い文章で話す方法」のスライド。
// 流れは Google ドキュメント「live scott」のとおり：
// テーマ → will → 1分間チャレンジ → LESSON 1 前置詞＋名詞 → チャレンジ（ネイティブ版）3ラウンド
// → クリスマスの雑談 → can → will と can の違い → 瞬間英作文 3ラウンド（can / will / まぜる）。
//
// 英文の書き方：[will] はオレンジ、{p:at the park} は場所（青）、{t:at 8pm} は時間（黄）、
// {w:with my friends} はだれと（ピンク）。1行に収まらないところは <br> で改行します。
const { esc, two, header, cover, ending, page, shapes, rays } = require("../parts.cjs");

// ---------- 中身 ----------

const TITLE = { title: "ネイティブっぽく<br>長い文章で話す方法", look: "simple" };

// Scott先生の紹介（本人のプロフィールから）。写真と国旗はこのフォルダの画像です。
const SCOTT = {
  photo: "scott.jpg",
  profile: [
    ["出身", "Born in Canada, grew up mostly in the US", "カナダ生まれ、ほぼアメリカ育ち"],
    ["来日", "Came to Japan to study martial arts and 整体", "武道と整体を学びに日本へ"],
    ["経歴", "Teaching for over 35 years", "35年以上、教えています"],
    ["在住", "Lives in Osaka", "大阪在住"],
    ["YouTube", "BananaeigoTV", ""],
  ],
};

const WILL_ANSWERS = [
  ["[I will] study English.", "英語を勉強する"],
  ["[I will] play tennis.", "テニスをする"],
  ["[I will] watch a movie.", "映画を見る"],
  ["[I will] meet my friend.", "友達に会う"],
  ["[I will] eat lunch.", "ランチを食べる"],
];

const PREPOSITIONS = [
  { cls: "p", tag: "どこで（場所）", key: "at ＋ 場所", items: [["at the park", "公園で"], ["at home", "家で"], ["at the station", "駅で"]] },
  { cls: "t", tag: "いつ（時間）", key: "at ＋ 時間", items: [["at 8pm", "夜8時に"], ["at noon", "お昼に"], ["at 7:30", "7時半に"]] },
  { cls: "w", tag: "だれと", key: "with ＋ 人", items: [["with my friends", "友達と"], ["with my family", "家族と"], ["with Scott", "スコット先生と"]] },
];

// I will eat. ＋ at the park ＋ at 8pm ＋ with my friends
const GROW = [
  [[], "食べる"],
  [[["p", "at the park"]], "公園で食べる"],
  [[["p", "at the park"], ["t", "at 8pm"]], "夜8時に、公園で食べる"],
  [[["p", "at the park"], ["t", "at 8pm"], ["w", "with my friends"]], "夜8時に、友達と公園で食べる"],
];

const CHALLENGE_ROUNDS = [
  ["tomorrow?", "明日なにするの？"],
  ["next weekend?", "来週末なにするの？"],
  ["for Christmas?", "クリスマスはなにするの？"],
];

const TALK = [
  ["アメリカ・カナダの<br>クリスマス", "Christmas in the U.S. & Canada"],
  ["日本の<br>お正月", "New Year's in Japan"],
  ["サンクスギビング<br>（感謝祭）", "Thanksgiving"],
];

const SHUNKAN = [
  {
    key: "can",
    title: "can で言ってみよう",
    sub: "〜できる・〜行けるよ",
    qs: [
      ["明日ランチ行けるよ〜", "I [can] go for lunch tomorrow."],
      ["8時に駅で会えるよ", "I [can] meet you {p:at the station} {t:at 8}."],
      ["週末なら家族とキャンプに行けるよ", "I [can] go camping {w:with my family} this weekend."],
      ["英語、少し話せるよ", "I [can] speak a little English."],
      ["公園で一緒に走れるよ", "I [can] run {w:with you} {p:at the park}."],
    ],
  },
  {
    key: "will",
    title: "will で言ってみよう",
    sub: "〜するよ・〜します",
    qs: [
      ["明日は家で映画を見るよ", "I [will] watch a movie {p:at home} tomorrow."],
      ["7時に友達と夜ごはんを食べるよ", "I [will] eat dinner {w:with my friends} {t:at 7}."],
      ["週末は妹と海に行くよ", "I [will] go to the beach {w:with my sister}<br>this weekend."],
      ["今夜はカフェで英語を勉強するよ", "I [will] study English {p:at a cafe} tonight."],
      ["クリスマスは家族と過ごすよ", "I [will] spend Christmas {w:with my family}."],
    ],
  },
  {
    key: "MIX",
    title: "will と can をまぜる",
    sub: "どっちを使う？",
    qs: [
      ["3時なら駅に行けるよ", "I [can] go to the station {t:at 3}."],
      ["明日の朝、ジムに行くよ", "I [will] go to the gym tomorrow morning."],
      ["今夜なら電話できるよ", "I [can] call you tonight."],
      ["週末は友達とビーチでBBQするよ", "I [will] have a BBQ {p:at the beach}<br>{w:with my friends} this weekend."],
      ["お正月は実家でのんびりするよ", "I [will] relax {p:at my parents' house}<br>over New Year's."],
    ],
  },
];

// ---------- 部品 ----------

// [x] → orange, {p:x} {t:x} {w:x} → place / time / with colours
const mark = (s) =>
  esc(s)
    .replace(/\[([^\]]+)\]/g, '<span class="v">$1</span>')
    .replace(/\{([ptw]):([^}]+)\}/g, '<span class="k$1">$2</span>');
const tag = (rn, text) => `<div class="where"><span class="round-tag"><span class="dot"></span><span class="rn">${rn}</span><span>${esc(text)}</span></span></div>`;
// This deck leaves the Hina English logo out of the header.
const slide = (cls, right, body) => `
<section class="slide ${cls}">${header(right, { logo: false })}
${body}
</section>`;
const hints = () => `<div class="hints"><span class="c p">at ＋ 場所</span><span class="c t">at ＋ 時間</span><span class="c w">with ＋ 人</span></div>`;

function theme() {
  const steps = [
    ["主語 ＋ will ＋ 動詞", "未来のことを言う"],
    ["前置詞 ＋ 名詞", "文を長くする"],
    ["主語 ＋ can ＋ 動詞", "will との違い"],
    ["瞬間英作文", "will と can で練習"],
  ];
  return slide("theme r3", tag("TODAY'S THEME", "今日のテーマ"), `
  <p class="lab">TODAY'S THEME</p>
  <h2 class="theme-t">ネイティブっぽく<br><span class="v">長い文章</span>で話せるようになる方法</h2>
  <ol class="steps4">
    ${steps.map(([k, d], i) => `<li><span class="sn">${i + 1}</span><p class="sk">${esc(k)}</p><p class="sd">${esc(d)}</p></li>`).join("\n    ")}
  </ol>`);
}

function scottIntro() {
  return slide("intro r2", tag("SPECIAL GUEST", "Scott先生"), `
  <p class="lab">TODAY'S GUEST</p>
  <h2 class="h2">今日のゲスト</h2>
  <div class="in-body">
    <div class="photo-frame"><img src="${esc(SCOTT.photo)}" alt="Scott先生"></div>
    <div class="in-right">
      <div class="in-namerow">
        <h2 class="in-name"><span class="en">Scott</span>先生</h2>
        <div class="flags"><img src="flag-ca.png" alt="カナダの国旗"><span class="farrow">→</span><img src="flag-us.png" alt="アメリカの国旗"></div>
      </div>
      <dl class="prof">
        ${SCOTT.profile
          .map(([k, en, ja]) => `<div class="${k === "YouTube" ? "yt" : ""}"><dt>${esc(k)}</dt><dd><p class="pe2">${esc(en)}</p>${ja ? `<p class="pj2">${esc(ja)}</p>` : ""}</dd></div>`)
          .join("\n        ")}
      </dl>
    </div>
  </div>`);
}

// The 1-minute chat challenges: an orange "stage" with a soft sunburst behind the timer, a big
// Japanese title in Dela Gothic One (with a dark copy behind it as a drop shadow), the question and
// the three steps along the bottom.
function stage({ rn, text, badge, title, question, ja, under, steps }) {
  return `
<section class="slide stage r4">
  ${shapes([[rays(1066, 415, 36), "#F25F2D"]])}${header(tag(rn, text), { logo: false })}
  <div class="st-head"><span class="st-badge">${esc(badge)}</span><div class="st-title"><p class="st-sh">${esc(title)}</p><p class="st-tx">${esc(title)}</p></div></div>
  <div class="st-body">
    <div class="st-q">
      <p class="lab">QUESTION</p>
      <p class="st-qen">What <span class="v">will</span> you do ${esc(question)}</p>
      <p class="st-qja">${esc(ja)}</p>
      ${under}
    </div>
    <div class="st-timer"><div class="st-ring"><p class="tm">1:00</p><p class="tl">1 MINUTE</p></div></div>
  </div>
  <ol class="st-steps">
    ${steps.map((t, i) => `<li><span class="st-n">${i + 1}</span><span>${esc(t)}</span></li>`).join("\n    ")}
  </ol>
</section>`;
}

function willGrammar() {
  return slide("grammar r3", tag("STEP 1", "will"), `
  <p class="lab">GRAMMAR</p>
  <h2 class="h2">未来のことは <span class="v en">will</span> ひとつでOK！</h2>
  <div class="formula">
    <div class="fbox"><p class="fb">主語</p><p class="fc">I / You / We など</p></div>
    <span class="plus">＋</span>
    <div class="fbox key"><p class="fb en">will</p><p class="fc">未来・意志</p></div>
    <span class="plus">＋</span>
    <div class="fbox"><p class="fb">動詞の原形</p><p class="fc">ing はつけない</p></div>
    <span class="plus">＋</span>
    <div class="fbox"><p class="fb">目的語</p><p class="fc">なにを</p></div>
  </div>
  <div class="mcards">
    <div class="mcard2"><p class="mt2"><span class="mn">1</span>未来（これからすること・予定）</p><p class="mdsc">明日も来週も来年も、will ひとつで言える</p><p class="me"><span class="v">I will</span> study English tomorrow.</p><p class="mj">明日、英語を勉強する</p></div>
    <div class="mcard2"><p class="mt2"><span class="mn">2</span>意志（「やります！」の気持ち）</p><p class="mdsc">その場で「やる！」と決めたときにも使う</p><p class="me"><span class="v">I will</span> do it!</p><p class="mj">やります！</p></div>
  </div>`);
}

function willAnswers() {
  return slide("qlist r3", tag("STEP 1", "will"), `
  <div class="qhead2"><p class="qen">What <span class="v">will</span> you do tomorrow?</p><p class="qja">明日なにするの？</p></div>
  <ol class="alist">
    ${WILL_ANSWERS.map(([en, ja], i) => `<li><span class="an">${i + 1}</span><p class="ae2">${mark(en)}</p><p class="aj2">${esc(ja)}</p></li>`).join("\n    ")}
  </ol>`);
}

function challengeStage() {
  return stage({
    rn: "CHALLENGE STAGE",
    text: "1分間チャレンジ",
    badge: "1分間で、いくつ書ける？",
    title: "チャレンジステージ",
    question: "tomorrow?",
    ja: "明日なにするの？",
    under: `<p class="st-blank">I will ＿＿＿＿＿.</p>`,
    steps: ["チャットを開く", "I will 〜 をどんどん書く", "1分で何個書けるかな？"],
  });
}

function lessonTalk() {
  return slide("lesson r2", tag("LESSON 1", "長く話すコツ"), `
  <p class="lab">LESSON 1</p>
  <h2 class="h2">ネイティブっぽく、長く話すには？</h2>
  <div class="talkrow">
    <div class="bubble hina"><p class="who en">Hina</p><p class="say">どうやったら長い文章で、<br>ネイティブっぽく話せるの？</p></div>
    <div class="bubble scott"><p class="who en">Scott</p><p class="say big">前置詞 ＋ 名詞！</p></div>
  </div>`);
}

function prepositions() {
  return slide("preps r2", tag("LESSON 1", "前置詞"), `
  <p class="lab">PREPOSITION</p>
  <h2 class="h2">前置詞とは？</h2>
  <p class="lead2">名詞の前において、「どこで・いつ・だれと」を足すことば</p>
  <div class="pcards">
    ${PREPOSITIONS.map(
      (p) => `<div class="pcard ${p.cls}"><span class="c ${p.cls}">${esc(p.tag)}</span><p class="pk">${esc(p.key)}</p>
      <ul>${p.items.map(([en, ja]) => `<li><span class="pe">${esc(en)}</span><span class="pj">${esc(ja)}</span></li>`).join("")}</ul></div>`,
    ).join("\n    ")}
  </div>`);
}

function grow() {
  return slide("build r2", tag("LESSON 1", "前置詞 ＋ 名詞"), `
  <p class="lab">EXAMPLE</p>
  <h2 class="h2">つなげると、どんどん長くなる！</h2>
  <ol class="grow">
    ${GROW.map(
      ([adds, ja], i) => `<li><span class="gn">${i + 1}</span><div class="gs"><div class="sent"><span class="base"><span class="v">I will</span> eat</span>${adds
        .map(([cls, en]) => `<span class="plus">＋</span><span class="c ${cls}">${esc(en)}</span>`)
        .join("")}</div><p class="gj">${esc(ja)}</p></div></li>`,
    ).join("\n    ")}
  </ol>`);
}

function challengeNative() {
  return slide("challenge2 r4", tag("CHALLENGE TIME", "ネイティブ版"), `
  <p class="lab">CHALLENGE TIME</p>
  <h2 class="h2">前置詞 ＋ 名詞をつけて、もう一回！</h2>
  <div class="recipe"><span class="base">主語 ＋ <span class="v">will</span> ＋ 動詞</span><span class="plus">＋</span><span class="c p">at ＋ 場所</span><span class="plus">＋</span><span class="c t">at ＋ 時間</span><span class="plus">＋</span><span class="c w">with ＋ 人</span></div>
  <div class="rounds3">
    ${CHALLENGE_ROUNDS.map(([q, ja], i) => `<div class="rcard"><p class="rl">ROUND ${i + 1}</p><p class="rq">What will you do<br>${esc(q)}</p><p class="rj">${esc(ja)}</p></div>`).join("\n    ")}
  </div>`);
}

function challengeRound([q, ja], i) {
  return stage({
    rn: "CHALLENGE TIME",
    text: `ROUND ${i + 1}`,
    badge: `ROUND ${i + 1}　前置詞＋名詞で長く！`,
    title: "チャレンジタイム",
    question: q,
    ja,
    under: hints(),
    steps: ["チャットを開く", "前置詞＋名詞で長く書く", "1分で何個書けるかな？"],
  });
}

function talkTime() {
  return slide("talk r1", tag("TALK TIME", "クリスマスの雑談"), `
  <p class="script">Let's talk!</p>
  <h2 class="h2">クリスマス、どう過ごす？</h2>
  <div class="tcards">
    ${TALK.map(([ja, en]) => `<div class="tcard"><div class="tbar"></div><p class="tk">${esc(ja)}</p><p class="te">${esc(en)}</p></div>`).join("\n    ")}
  </div>`);
}

function canGrammar() {
  return slide("grammar can r1", tag("STEP 3", "can"), `
  <p class="lab">GRAMMAR</p>
  <h2 class="h2"><span class="v en">can</span> ＝ 〜できる</h2>
  <div class="formula">
    <div class="fbox"><p class="fb">主語</p><p class="fc">I / You / We など</p></div>
    <span class="plus">＋</span>
    <div class="fbox key"><p class="fb en">can</p><p class="fc">可能・能力</p></div>
    <span class="plus">＋</span>
    <div class="fbox"><p class="fb">動詞の原形</p><p class="fc">will と同じ形</p></div>
  </div>
  <div class="mcards">
    <div class="mcard2"><p class="mt2"><span class="mn">1</span>可能（都合がつく・時間がある）</p><p class="me"><span class="v">I can</span> talk now.</p><p class="mj">今なら話せるよ</p></div>
    <div class="mcard2"><p class="mt2"><span class="mn">2</span>能力（自分ができること）</p><p class="me"><span class="v">I can</span> swim.</p><p class="mj">泳げるよ</p></div>
  </div>
  <p class="note"><span class="chip">REPEAT</span>Scott先生のあとについて、声に出してみよう！</p>`);
}

function willVsCan() {
  const card = (cls, key, kind, feel, en, ja) =>
    `<div class="vcard ${cls}"><p class="vk"><span class="en">${key}</span><span class="vn">${kind}</span></p><p class="vf">${feel}</p><div class="vline"></div><p class="ve">${mark(en)}</p><p class="vj">${ja}</p></div>`;
  return slide("vs r1", tag("STEP 3", "will と can"), `
  <p class="lab">WILL vs CAN</p>
  <h2 class="h2">will と can、なにが違う？</h2>
  <div class="vsrow">
    ${card("will", "will", "意志", "「やります！！」", "[I will] come tomorrow.", "明日行きます！")}
    <span class="vsmark">VS</span>
    ${card("can", "can", "可能", "「時間空いてるよ〜」", "[I can] come tomorrow.", "明日行けるよ〜")}
  </div>
  <p class="banner">意味はほぼ同じ！ ニュアンスが少し変わるだけ</p>`);
}

function shunkanIntro() {
  return slide("sintro r3", tag("瞬間英作文", "will ＆ can"), `
  <p class="lab">INSTANT ENGLISH</p>
  <h2 class="h2">will と can で、瞬間英作文！</h2>
  <p class="lead2">日本語を見たら、5秒で英語にしてみよう</p>
  <div class="rounds3">
    ${SHUNKAN.map((r, i) => `<div class="rcard"><p class="rl">ROUND ${i + 1}</p><p class="rk en">${esc(r.key)}</p><p class="rj">${esc(r.title)}</p></div>`).join("\n    ")}
  </div>`);
}

function shunkanCover(r, i) {
  return slide(`scover r3`, tag("瞬間英作文", `ROUND ${i + 1}`), `
  <div class="sc-body">
    <p class="lab">ROUND ${i + 1}</p>
    <p class="sk-big en">${esc(r.key)}</p>
    <h2 class="sc-t">${esc(r.title)}</h2>
    <p class="sc-sub">${esc(r.sub)}　全${r.qs.length}問</p>
  </div>`);
}

function shunkanQ(r, i, [ja, en], k, answer) {
  const right = `<div class="where"><span class="round-tag"><span class="dot"></span><span class="rn">ROUND ${i + 1}</span><span>${esc(r.key)}</span></span><span class="no"><b>${two(k + 1)}</b> / ${two(r.qs.length)}</span></div>`;
  return slide("sq r3", right, `
  <div class="scard${answer ? " answer" : ""}">
    <p class="script">${answer ? "Answer" : "Question"}</p>
    ${answer ? `<p class="sja-s">${esc(ja)}</p><p class="sen">${mark(en)}</p>` : `<p class="sja">${esc(ja)}</p>`}
  </div>`);
}

module.exports = () => {
  const slides = [
    cover(TITLE),
    scottIntro(),
    theme(),
    willGrammar(),
    willAnswers(),
    challengeStage(),
    lessonTalk(),
    prepositions(),
    grow(),
    challengeNative(),
    ...CHALLENGE_ROUNDS.map(challengeRound),
    talkTime(),
    canGrammar(),
    willVsCan(),
    shunkanIntro(),
  ];
  SHUNKAN.forEach((r, i) => {
    slides.push(shunkanCover(r, i));
    r.qs.forEach((q, k) => slides.push(shunkanQ(r, i, q, k, false), shunkanQ(r, i, q, k, true)));
  });
  slides.push(ending({ lead: "will と can、今日から<br>どんどん使ってみてね！", logo: false }));
  return page({ title: "ネイティブっぽく長い文章で話す方法｜Scott先生 × ひな コラボLIVE", slides, css: ["deck.css"], source: "deck.cjs" });
};
