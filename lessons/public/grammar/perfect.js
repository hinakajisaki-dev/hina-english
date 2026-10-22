// Unit: 現在完了形. Follows the 現在完了形 chapter of the teacher's 中学文法 document.
// Step format is described in lessons.js. Red marks have / has and the 過去分詞;
// blue marks the words that go with each use (ever, never, just, for …).

export const PERFECT = {
  id: "perfect",
  title: "現在完了形",
  subtitle: "経験・完了・継続・結果",
  lessons: [
    {
      id: "perfect-experience",
      title: "形と「経験」",
      subtitle: "〜したことがある",
      steps: [
        {
          type: "explain",
          title: "現在完了形とは？",
          text: ["過去のことが、**今**につながっているときに使います。"],
          key: "[[have]] / [[has]] + [[過去分詞]]",
          examples: [
            { en: "I [[have visited]] Kyoto.", ja: "私は京都を訪れたことがあります。" },
            { en: "She [[has finished]] her homework.", ja: "彼女は宿題を終えました。\n（今は終わっている）" },
          ],
        },
        {
          type: "explain",
          title: "[[have]] と [[has]] の選び方",
          table: {
            head: ["主語", "形"],
            rows: [
              ["I / You / We / They", "[[have]] + 過去分詞"],
              ["He / She / It / Tom", "[[has]] + 過去分詞"],
            ],
          },
          note: ["※三単現（He / She / It）のときは [[has]]。現在形の s と同じルールです。"],
        },
        {
          type: "choice",
          q: "I ___ visited Kyoto.",
          ja: "私は京都を訪れたことがあります。",
          choices: ["have", "has"],
          answer: "have",
          why: "I なので、[[have]] です。",
        },
        {
          type: "choice",
          q: "She ___ visited Kyoto.",
          ja: "彼女は京都を訪れたことがあります。",
          choices: ["have", "has"],
          answer: "has",
          why: "[[She]] は三単現なので、[[has]] です。",
        },
        {
          type: "explain",
          title: "過去分詞とは？",
          text: ["動詞の形の1つです。**-ed の動詞は、過去形と同じ形**です。"],
          table: {
            head: ["動詞", "過去形", "過去分詞"],
            rows: [
              ["visit", "visited", "[[visited]]"],
              ["play", "played", "[[played]]"],
              ["eat", "ate", "[[eaten]]"],
              ["see", "saw", "[[seen]]"],
              ["go", "went", "[[gone]] / [[been]]"],
            ],
          },
          note: ["※全部を暗記しなくて大丈夫。出てきたときに1つずつ覚えていきます。"],
        },
        {
          type: "choice",
          q: "I have ___ sushi.",
          ja: "私はお寿司を食べたことがあります。",
          choices: ["eat", "ate", "eaten"],
          answer: "eaten",
          why: "have のあとは**過去分詞**。eat の過去分詞は [[eaten]] です。",
        },
        {
          type: "explain",
          title: "経験：「〜したことがある」",
          text: ["**今までにしたこと**を伝えるときに使います。"],
          table: {
            head: ["よく使うことば", "意味"],
            rows: [
              ["{{ever}}", "今までに"],
              ["{{never}}", "一度も〜ない"],
              ["{{before}}", "以前に"],
              ["{{once}} / {{twice}}", "1回 / 2回"],
              ["{{three times}}", "3回"],
            ],
          },
          examples: [
            { en: "I [[have]] {{never}} [[eaten]] sushi.", ja: "私は一度もお寿司を食べたことがありません。" },
            { en: "I [[have been]] to Hokkaido {{once}}.", ja: "私は北海道に1回行ったことがあります。" },
          ],
          key: ["「〜に行ったことがある」は", "[[have been]] to 〜"],
        },
        {
          type: "order",
          ja: "私は一度もお寿司を食べたことがありません。",
          words: ["I", "have", "never", "eaten", "sushi"],
          end: ".",
          why: "{{never}} は [[have]] と [[過去分詞]] のあいだに入ります。",
        },
        {
          type: "order",
          ja: "私は以前、京都を訪れたことがあります。",
          words: ["I", "have", "visited", "Kyoto", "before"],
          end: ".",
          why: "{{before}}（以前に）は文の最後です。",
        },
        {
          type: "explain",
          title: "否定文：[[haven't]] / [[hasn't]]",
          compare: {
            labels: ["ふつうの文", "否定文"],
            rows: [
              [
                { en: "She [[has]] visited Kyoto.", ja: "彼女は京都に行ったことがあります。" },
                { en: "She [[hasn't]] visited Kyoto.", ja: "彼女は京都に行ったことがありません。" },
              ],
            ],
          },
          key: ["have not → [[haven't]]", "has not → [[hasn't]]"],
        },
        {
          type: "choice",
          q: "I ___ seen this movie.",
          ja: "私はこの映画を見たことがありません。",
          choices: ["haven't", "hasn't", "didn't"],
          answer: "haven't",
          why: "I なので、[[haven't]] です。",
        },
        {
          type: "explain",
          title: "疑問文：[[Have]] / [[Has]] を前に",
          compare: {
            labels: ["ふつうの文", "疑問文"],
            rows: [
              [
                { en: "You [[have]] been to Hawaii.", ja: "あなたはハワイに行ったことがあります。" },
                { en: "[[Have]] you {{ever}} been to Hawaii?", ja: "今までにハワイに行ったことはありますか？" },
              ],
            ],
          },
          note: ["答え方：Yes, I [[have]]. / No, I [[haven't]]."],
        },
        {
          type: "choice",
          q: "___ you ever climbed Mt. Fuji?",
          ja: "今までに富士山に登ったことはありますか？",
          choices: ["Do", "Did", "Have"],
          answer: "Have",
          why: "現在完了形の疑問文は [[Have]] を前に出します。",
        },
        {
          type: "explain",
          title: "「いつ」を言うときは過去形",
          text: ["経験の文には、**yesterday / last year** などはつけません。"],
          compare: {
            labels: ["いつかを言う（過去形）", "経験を言う（現在完了形）"],
            rows: [
              [
                { en: "I [[went]] to Hawaii last year.", ja: "去年ハワイに行きました。" },
                { en: "I [[have been]] to Hawaii {{before}}.", ja: "以前ハワイに行ったことがあります。" },
              ],
            ],
          },
        },
        {
          type: "choice",
          q: "I ___ to Hawaii last year.",
          ja: "私は去年ハワイに行きました。",
          choices: ["went", "have been"],
          answer: "went",
          why: "**last year**（去年）といつかを言っているので、過去形の [[went]] です。",
        },
        {
          type: "write",
          ja: "あなたは今までに、富士山に登ったことはありますか？",
          answers: ["Have you ever climbed Mt. Fuji?", "Have you ever climbed Mt Fuji?", "Have you ever climbed Mount Fuji?"],
          hint: "climb（登る）\nMt. Fuji（富士山）",
          why: "疑問文なので、[[Have]] を前に。「今までに」は {{ever}} です。",
        },
        {
          type: "write",
          ja: "私は一度もこの映画を見たことがありません。",
          answers: ["I have never seen this movie.", "I've never seen this movie."],
          hint: "see（見る）→ 過去分詞は seen\nmovie（映画）",
          why: "[[have]] + {{never}} + [[seen]] の順です。",
        },
        {
          type: "write",
          ja: "彼女はそのレストランに3回行ったことがあります。",
          answers: [
            "She has been to the restaurant three times.",
            "She has been to that restaurant three times.",
            "She has been to the restaurant 3 times.",
            "She has been to that restaurant 3 times.",
          ],
          hint: "行ったことがある → have been to\n3回 → three times",
          why: "[[She]] なので、[[has been]] to。{{three times}} は文の最後です。",
        },
      ],
    },
    {
      id: "perfect-done",
      title: "「完了」",
      subtitle: "ちょうど〜した・もう〜した",
      steps: [
        {
          type: "explain",
          title: "完了：「ちょうど〜した」「もう〜した」",
          text: ["**たった今**終わったこと、**もう**終わったことを伝えるときに使います。"],
          examples: [
            { en: "I [[have]] {{just}} [[finished]] lunch.", ja: "ちょうど昼食を食べ終えました。" },
            { en: "She [[has]] {{already}} [[bought]] the cake.", ja: "彼女はもうケーキを買いました。" },
          ],
        },
        {
          type: "explain",
          title: "よく使うことば",
          table: {
            head: ["ことば", "意味"],
            rows: [
              ["{{just}}", "ちょうど"],
              ["{{already}}", "もう・すでに"],
              ["{{yet}}", "もう（疑問文）\nまだ（否定文）"],
            ],
          },
          key: ["{{just}} / {{already}} → [[have]] のすぐあと", "{{yet}} → 文の最後"],
        },
        {
          type: "order",
          ja: "私はちょうど昼食を食べ終えました。",
          words: ["I", "have", "just", "finished", "lunch"],
          end: ".",
          why: "{{just}} は [[have]] と [[過去分詞]] のあいだです。",
        },
        {
          type: "choice",
          q: "She has ___ bought the cake.",
          ja: "彼女はもうケーキを買いました。",
          choices: ["already", "yet"],
          answer: "already",
          why: "ふつうの文の「もう」は {{already}}。{{yet}} は疑問文と否定文で使います。",
        },
        {
          type: "explain",
          title: "{{yet}}：疑問文は「もう」、否定文は「まだ」",
          examples: [
            { en: "[[Have]] you finished your homework {{yet}}?", ja: "もう宿題は終わりましたか？" },
            { en: "We [[haven't]] celebrated his birthday {{yet}}.", ja: "私たちはまだ彼の誕生日を祝っていません。" },
          ],
          key: ["疑問文の {{yet}} → もう", "否定文の {{yet}} → まだ"],
          note: ["{{yet}} は文の最後に置きます。"],
        },
        {
          type: "choice",
          q: "Have you eaten lunch ___?",
          ja: "もう昼食を食べましたか？",
          choices: ["just", "already", "yet"],
          answer: "yet",
          why: "疑問文の「もう」は {{yet}}。文の最後に置きます。",
        },
        {
          type: "choice",
          q: "I haven't finished my homework ___.",
          ja: "私はまだ宿題を終えていません。",
          choices: ["already", "yet"],
          answer: "yet",
          why: "否定文の「まだ」は {{yet}} です。",
        },
        {
          type: "order",
          ja: "彼らはまだ宿題を終えていません。",
          words: ["They", "haven't", "finished", "their", "homework", "yet"],
          end: ".",
          why: "They なので、[[haven't]]。{{yet}} は文の最後です。",
        },
        {
          type: "write",
          ja: "私はちょうど宿題を終えたところです。",
          answers: ["I have just finished my homework.", "I've just finished my homework."],
          hint: "just（ちょうど）\nfinish（終える）→ finished",
          why: "[[have]] + {{just}} + [[finished]] の順です。",
        },
        {
          type: "write",
          ja: "彼女はすでにその映画を見ました。",
          answers: [
            "She has already watched the movie.",
            "She has already seen the movie.",
            "She has already watched that movie.",
            "She has already seen that movie.",
          ],
          hint: "already（すでに）\nwatch（見る）→ watched",
          why: "[[She]] なので、[[has]]。{{already}} は [[has]] と [[watched]] のあいだです。",
        },
        {
          type: "write",
          ja: "あなたはもう昼食を食べましたか？",
          answers: ["Have you eaten lunch yet?", "Have you had lunch yet?"],
          hint: "eat（食べる）→ 過去分詞は eaten\nlunch（昼食）",
          why: "疑問文なので、[[Have]] を前に。「もう」は文の最後の {{yet}} です。",
        },
        {
          type: "write",
          ja: "私たちはちょうどケーキを買ったところです。",
          answers: ["We have just bought a cake.", "We've just bought a cake.", "We have just bought the cake.", "We've just bought the cake."],
          hint: "buy（買う）→ 過去分詞は bought",
          why: "[[have]] + {{just}} + [[bought]] の順です。",
        },
      ],
    },
  ],
};
