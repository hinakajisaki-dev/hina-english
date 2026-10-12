// Grammar units and lessons, shared by every student. The browser shows
// them, and the server reads them to check lesson ids and which example
// sentences may be voiced.
//
// A lesson is a list of steps, one screen each:
//   explain: title, text (paragraphs; **bold** allowed), table, examples [{ en, ja }], point
//   choice:  q (a ___ marks the blank), ja, choices, answer, why
//   order:   ja, words (in the right order), end (final punctuation), why
//   write:   ja, answers (accepted English sentences), hint, why
//
// Content for 現在進行形 follows the 時制 chapter of the teacher's 中学文法 document.

export const UNITS = [
  {
    id: "tense",
    title: "時制",
    subtitle: "現在形・現在進行形・過去形・未来形",
    lessons: [
      { id: "present-simple", title: "現在形", subtitle: "いつもの習慣・変わらない事実" },
      {
        id: "present-progressive",
        title: "現在進行形",
        subtitle: "今まさに途中のこと",
        steps: [
          {
            type: "explain",
            title: "コア・イメージ：今まさに動いている「動画」",
            text: [
              "現在形が**毎日の予定表**なら、現在進行形は**今この瞬間を映しているライブカメラ**です。",
              "始まっていて、まだ終わっていない動作を表します。",
            ],
            examples: [
              { en: "I study English every day.", ja: "私は毎日英語を勉強します。（いつものこと）" },
              { en: "I am studying English now.", ja: "私は今、英語を勉強しています。（今まさに途中）" },
            ],
          },
          {
            type: "explain",
            title: "形：am / is / are + 動詞のing形",
            text: ["「今、〜しています」は、**be動詞 + ing** で表します。be動詞は主語で決まります。"],
            table: {
              head: ["主語", "形", "例文"],
              rows: [
                ["I", "am + ing", "I am studying now."],
                ["You / We / They", "are + ing", "They are playing outside."],
                ["He / She / It", "is + ing", "She is cooking dinner."],
              ],
            },
            examples: [
              { en: "I am studying now.", ja: "私は今、勉強しています。" },
              { en: "They are playing outside.", ja: "彼らは外で遊んでいます。" },
              { en: "She is cooking dinner.", ja: "彼女は夕食を作っています。" },
            ],
          },
          {
            type: "choice",
            q: "She ___ cooking dinner.",
            ja: "彼女は夕食を作っています。",
            choices: ["am", "is", "are"],
            answer: "is",
            why: "主語が She（He / She / It）のときは **is** です。",
          },
          {
            type: "choice",
            q: "They ___ playing outside.",
            ja: "彼らは外で遊んでいます。",
            choices: ["am", "is", "are"],
            answer: "are",
            why: "主語が They（You / We / They）のときは **are** です。",
          },
          {
            type: "choice",
            q: "I ___ studying now.",
            ja: "私は今、勉強しています。",
            choices: ["am", "is", "are"],
            answer: "am",
            why: "主語が I のときは **am** です。",
          },
          {
            type: "choice",
            q: "My brother ___ sleeping.",
            ja: "弟は寝ています。",
            choices: ["am", "is", "are"],
            answer: "is",
            why: "My brother は1人なので、He と同じく **is** です。",
          },
          {
            // Not in the document (its 3-2 is missing); added so the -ing questions make sense.
            type: "explain",
            title: "ing形のつくり方",
            text: ["ほとんどの動詞は、そのまま **ing** をつけます。形が変わるのは、次の2つだけです。"],
            table: {
              head: ["ルール", "原形", "ing形"],
              rows: [
                ["そのまま ing", "play / study / read", "playing / studying / reading"],
                ["e で終わる：e をとって ing", "make / write / come", "making / writing / coming"],
                ["短い母音 + 子音字：最後の文字を重ねる", "run / swim / sit", "running / swimming / sitting"],
              ],
            },
          },
          {
            type: "choice",
            q: "make → ___",
            ja: "make の ing形は？",
            choices: ["makeing", "making", "makking"],
            answer: "making",
            why: "e で終わる動詞は、**e をとって ing** です。",
          },
          {
            type: "choice",
            q: "run → ___",
            ja: "run の ing形は？",
            choices: ["runing", "running", "runeing"],
            answer: "running",
            why: "run は「短い母音 + 子音字」なので、**最後の n を重ねて** running です。",
          },
          {
            type: "explain",
            title: "否定文・疑問文",
            table: {
              head: ["種類", "形", "例文"],
              rows: [
                ["否定文", "主語 + be動詞 + not + ing", "I am not sleeping."],
                ["疑問文", "Be動詞 + 主語 + ing?", "Are you listening?"],
              ],
            },
            text: ["否定文は be動詞のうしろに **not**。疑問文は **be動詞を主語の前**に出します。"],
            examples: [
              { en: "I am not sleeping.", ja: "私は寝ていません。" },
              { en: "Are you listening?", ja: "聞いていますか？" },
            ],
          },
          {
            type: "order",
            ja: "彼女は今、テレビを見ていません。",
            words: ["She", "is", "not", "watching", "TV", "now"],
            end: ".",
            why: "否定文は **is のうしろに not** を置きます。",
          },
          {
            type: "order",
            ja: "あなたは何を読んでいるのですか？",
            words: ["What", "are", "you", "reading"],
            end: "?",
            why: "What のあとは疑問文の語順で **are you reading** です。",
          },
          {
            type: "explain",
            title: "現在進行形を使う場面",
            text: [
              "**今まさにしていること**のほかに、**今日・今週・今月など、一時的にしていること**にも使います。",
            ],
            examples: [
              { en: "I am doing my homework now.", ja: "私は今、宿題をしています。" },
              { en: "They are waiting for the bus.", ja: "彼らはバスを待っています。" },
              { en: "It is raining outside.", ja: "外では雨が降っています。" },
              { en: "We are studying for the test this week.", ja: "私たちは今週、テスト勉強をしています。" },
              { en: "My brother is staying with us this month.", ja: "弟は今月、私たちの家に滞在しています。" },
            ],
          },
          {
            type: "explain",
            title: "よく使う言葉",
            table: {
              head: ["言葉", "意味", "例文"],
              rows: [
                ["now", "今", "I am working now."],
                ["right now", "まさに今", "She is taking a shower right now."],
                ["at the moment", "現在・今のところ", "We are having lunch at the moment."],
                ["today", "今日は", "He is working from home today."],
                ["this week", "今週は", "I am reading a long book this week."],
                ["Look! / Listen!", "見て！／聞いて！", "Look! The dog is running."],
              ],
            },
            examples: [
              { en: "She is taking a shower right now.", ja: "彼女はまさに今、シャワーを浴びています。" },
              { en: "Look! The dog is running.", ja: "見て！犬が走っています。" },
            ],
          },
          {
            type: "explain",
            title: "現在形と現在進行形の違い",
            text: ["**現在形：いつものこと**　／　**現在進行形：今していること**"],
            examples: [
              { en: "I study English every day.", ja: "私は毎日英語を勉強します。" },
              { en: "I am studying English now.", ja: "私は今、英語を勉強しています。" },
              { en: "She works at a café.", ja: "彼女はカフェで働いています。（ふだんの仕事）" },
              { en: "She is working at the café today.", ja: "彼女は今日そのカフェで働いています。（今日だけ）" },
              { en: "He plays soccer on Sundays.", ja: "彼は日曜日にサッカーをします。" },
              { en: "He is playing soccer now.", ja: "彼は今サッカーをしています。" },
            ],
          },
          {
            type: "choice",
            q: "I ___ English every day.",
            ja: "私は毎日英語を勉強します。",
            choices: ["study", "am studying"],
            answer: "study",
            why: "every day（毎日）は**いつものこと**なので現在形です。",
          },
          {
            type: "choice",
            q: "Look! He ___ soccer.",
            ja: "見て！彼がサッカーをしています。",
            choices: ["plays", "is playing"],
            answer: "is playing",
            why: "Look! は**今まさに見えていること**なので現在進行形です。",
          },
          {
            type: "choice",
            q: "My father ___ at a bank.",
            ja: "父は銀行で働いています。（ふだんの仕事）",
            choices: ["works", "is working"],
            answer: "works",
            why: "ふだんの仕事は**いつものこと**なので現在形です。日本語が「〜しています」でも、現在進行形とは限りません。",
          },
          {
            type: "explain",
            title: "注意：進行形にしない動詞",
            text: [
              "**know、like、love、want、need** など、状態や気持ちを表す動詞は、ふつう現在進行形にせず**現在形**で表します。",
              "✕ I am knowing him.　→　〇 I know him.",
            ],
            examples: [
              { en: "I know him.", ja: "私は彼を知っています。" },
              { en: "I like music.", ja: "私は音楽が好きです。" },
            ],
          },
          {
            type: "choice",
            q: "I ___ him.",
            ja: "私は彼を知っています。",
            choices: ["am knowing", "know"],
            answer: "know",
            why: "know は状態を表す動詞なので、進行形にしません。",
          },
          {
            type: "choice",
            q: "She ___ a new phone.",
            ja: "彼女は新しい電話を欲しがっています。",
            choices: ["is wanting", "wants"],
            answer: "wants",
            why: "want も気持ちを表す動詞なので、現在形です。",
          },
          {
            type: "write",
            ja: "私は今、夕食を作っています。",
            answers: ["I am cooking dinner now.", "I am making dinner now.", "Now I am cooking dinner.", "Now I am making dinner."],
            hint: "cook（作る）",
            why: "I のときは **am + ing** です。",
          },
          {
            type: "write",
            ja: "彼らは公園で走っています。",
            answers: ["They are running in the park."],
            hint: "run（走る）、park（公園）",
            why: "run は n を重ねて **running** です。",
          },
          {
            type: "write",
            ja: "見て！あの赤ちゃんが笑っています。",
            answers: ["Look! That baby is smiling.", "Look! That baby is laughing."],
            hint: "smile（ほほえむ）、baby（赤ちゃん）",
            why: "Look! のあとは今起きていることなので**現在進行形**です。smile は e をとって smiling。",
          },
          {
            type: "explain",
            title: "まとめ",
            table: {
              head: ["", "ポイント"],
              rows: [
                ["意味", "今まさに途中のこと（今日・今週など一時的なことも）"],
                ["形", "am / is / are + ing"],
                ["否定文", "be動詞 + not + ing（I am not sleeping.）"],
                ["疑問文", "Be動詞 + 主語 + ing?（Are you listening?）"],
                ["注意", "know / like / love / want / need は現在形"],
              ],
            },
          },
        ],
      },
      { id: "past-simple", title: "過去形", subtitle: "過去に終わった出来事" },
      { id: "future", title: "未来形", subtitle: "will / be going to" },
    ],
  },
];

export function findLesson(lessonId) {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { unit, lesson };
  }
  return null;
}

// Number of questions in a lesson (explanations don't count).
export const questionCount = (lesson) => (lesson.steps || []).filter((s) => s.type !== "explain").length;

// Every English example sentence in the lessons; the server only voices these.
export function lessonExampleSentences() {
  const sentences = new Set();
  for (const unit of UNITS) {
    for (const lesson of unit.lessons) {
      for (const step of lesson.steps || []) {
        for (const example of step.examples || []) sentences.add(example.en);
      }
    }
  }
  return sentences;
}
