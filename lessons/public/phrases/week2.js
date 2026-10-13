// スモールトーク Week 2: 「話題を広げて、気持ちよく会話を終える」51 フレーズ、7 日分.
// From smalltalk/week2.md (branch claude/fervent-clarke-wg3uno). Every student gets the same phrases.
// Fields as in public/phrases/book.js. Keep the ids: students' フレーズ復習 lists use them.

export const WEEK2 = {
  week: 2,
  title: "話題を広げて、気持ちよく会話を終える",
  phrases: [
    // ---------- Day 1 ----------
    {
      id: "50", day: 1, scene: "場面15：先週末",
      en: "What did you do last weekend?",
      ja: "先週末は何をしたの？",
      chunk: "What did you ＋ 動詞?",
      note: "『何を〜したの？』と過去のことを聞く形. did のあとの動詞は原形. 週明けの会話の定番.",
      drills: [
        { ja: "昨日は何したの？", answers: ["What did you do yesterday?"] },
        { ja: "お昼は何を食べたの？", answers: ["What did you have for lunch?"], hint: "食べる ＝ have" },
      ],
    },
    {
      id: "51", day: 1, scene: "場面15：先週末",
      en: "Not much. I just relaxed at home.",
      ja: "特に何も. 家でのんびりしてたよ",
      chunk: "I just ＋ 動詞（過去形）",
      note: "just は『ただ〜しただけ』特別なことをしなかったときに使う. Not much. は『特に何も』",
      drills: [
        { ja: "家にいただけ", answers: ["I just stayed home."], hint: "家にいる ＝ stay home" },
        { ja: "テレビを見てただけ", answers: ["I just watched TV."] },
      ],
    },
    {
      id: "52", day: 1, scene: "場面15：先週末",
      en: "That sounds nice.",
      ja: "いいね",
      chunk: "That sounds ＋ 形容詞",
      note: "『（聞いた感じ）〜そうだね』相手の話に感想を返すあいづち.",
      drills: [
        { ja: "楽しそう！", answers: ["That sounds fun!"] },
        { ja: "大変そう", answers: ["That sounds hard."], hint: "大変 ＝ hard" },
      ],
    },
    {
      id: "53", day: 1, scene: "場面16：週末の予定",
      en: "What are you up to this weekend?",
      ja: "今週末は何するの？",
      chunk: "What are you up to ＋ 時?",
      note: "『何してるの？何する予定？』のカジュアルな言い方. うしろに時を表す言葉をつけて、予定を聞く.",
      drills: [
        { ja: "今夜は何するの？", answers: ["What are you up to tonight?"] },
        { ja: "このあと何するの？", answers: ["What are you up to after this?"], hint: "このあと ＝ after this" },
      ],
    },
    {
      id: "54", day: 1, scene: "場面16：週末の予定",
      en: "I'm going to go snorkeling.",
      ja: "シュノーケリングに行くつもり",
      chunk: "I'm going to ＋ 動詞 / go ＋ 動詞ing",
      note: "be going to は『〜するつもり』と決まっている予定を言う形. go snorkeling のように、遊びやアクティビティに「行く」は go ＋ 動詞ing で、to はつけない.",
      drills: [
        { ja: "明日買い物に行くつもり", answers: ["I'm going to go shopping tomorrow."], hint: "買い物に行く ＝ go shopping" },
        { ja: "日曜日にハイキングに行く予定", answers: ["I'm going to go hiking on Sunday."], hint: "日曜日に ＝ on Sunday" },
      ],
    },
    {
      id: "55", day: 1, scene: "場面16：週末の予定",
      en: "It's my first time, so I'm a little nervous.",
      ja: "初めてだから、ちょっと緊張してる",
      chunk: "理由 ＋ , so ＋ 結果",
      note: "『〜だから〜』so の前が理由、うしろが結果.",
      drills: [
        { ja: "疲れていたので早く寝た", answers: ["I was tired, so I went to bed early."], hint: "寝る ＝ go to bed → went to bed" },
        { ja: "雨だったので家にいた", answers: ["It was raining, so I stayed home."], hint: "雨が降っていた ＝ It was raining" },
      ],
    },
    {
      id: "56", day: 1, scene: "場面17：食べ物",
      en: "Have you tried any local food yet?",
      ja: "ご当地グルメはもう食べてみた？",
      chunk: "Have you ＋ 過去分詞 ＋ yet?",
      note: "『もう〜した？』yet は質問の最後に置く. try は食べ物だと『（初めて）食べてみる』",
      drills: [
        { ja: "もうお昼食べた？", answers: ["Have you had lunch yet?"], hint: "have の過去分詞は had" },
        { ja: "もうビーチには行った？", answers: ["Have you been to the beach yet?"], hint: "行った ＝ been to" },
      ],
    },
    // ---------- Day 2 ----------
    {
      id: "57", day: 2, scene: "場面17：食べ物",
      en: "Yes! I had poke yesterday.",
      ja: "うん！昨日ポケを食べたよ",
      chunk: "have / had ＋ 食べ物・飲み物",
      note: "have は「持つ」だけでなく『食べる・飲む』の意味でよく使う. 会話では eat より自然に聞こえることが多い. had は過去形.",
      drills: [
        { ja: "朝ごはんにパンケーキを食べた", answers: ["I had pancakes for breakfast."], hint: "朝ごはんに ＝ for breakfast" },
        { ja: "今朝コーヒーを飲んだ", answers: ["I had coffee this morning."] },
      ],
    },
    {
      id: "58", day: 2, scene: "場面17：食べ物",
      en: "Was it good?",
      ja: "おいしかった？",
      chunk: "Was it ＋ 形容詞?",
      note: "『〜だった？』と過去の感想を聞く形.",
      drills: [
        { ja: "高かった？", answers: ["Was it expensive?"] },
        { ja: "混んでた？", answers: ["Was it crowded?"], hint: "混んでいる ＝ crowded" },
      ],
    },
    {
      id: "59", day: 2, scene: "場面17：食べ物",
      en: "It was so good! I want to go back.",
      ja: "すごくおいしかった！また行きたい",
      chunk: "go back (to ＋ 場所)",
      note: "『（〜に）また行く、戻る』気に入った場所やお店について言うときに使う.",
      drills: [
        { ja: "来年またハワイに行きたい", answers: ["I want to go back to Hawaii next year."], hint: "I want to go back to 〜" },
        { ja: "いつ日本に帰るの？", answers: ["When are you going back to Japan?"], hint: "When are you going back to 〜?" },
      ],
    },
    {
      id: "60", day: 2, scene: "場面18：おすすめを聞く",
      en: "Do you know any good restaurants around here?",
      ja: "この辺でいいレストラン知ってる？",
      chunk: "Do you know any good ＋ 名詞（複数）?",
      note: "『何かいい〜知ってる？』と情報を聞く形. 地元の人におすすめを聞くときにぴったり.",
      drills: [
        { ja: "いいカフェ知ってる？", answers: ["Do you know any good cafés?"] },
        { ja: "買い物にいい場所知ってる？", answers: ["Do you know any good places for shopping?"], hint: "買い物に ＝ for shopping" },
      ],
    },
    {
      id: "61", day: 2, scene: "場面18：おすすめを聞く",
      en: "You should try the Thai place down the street.",
      ja: "この先のタイ料理のお店、行ってみて",
      chunk: "You should ＋ 動詞",
      note: "『〜したほうがいいよ、ぜひ〜してみて』とおすすめする形. 命令ではなく、親切な提案. down the street は『この通りの先』",
      drills: [
        { ja: "ノースショアに行くといいよ", answers: ["You should go to the North Shore."] },
        { ja: "シェイブアイスはぜひ食べてみて！", answers: ["You should try shave ice!"], hint: "食べてみる ＝ try" },
      ],
    },
    {
      id: "62", day: 2, scene: "場面18：おすすめを聞く",
      en: "Thanks for the tip!",
      ja: "教えてくれてありがとう！",
      chunk: "Thanks for ＋ 名詞",
      note: "『〜をありがとう』for のうしろに、何に感謝しているかを入れる. tip は『ちょっとしたアドバイス、情報』",
      drills: [
        { ja: "手伝ってくれてありがとう！", answers: ["Thanks for your help!"], hint: "手伝い ＝ help" },
        { ja: "おすすめしてくれてありがとう！", answers: ["Thanks for the recommendation!"], hint: "おすすめ ＝ recommendation" },
      ],
    },
    {
      id: "63", day: 2, scene: "場面19：運動",
      en: "How often do you work out?",
      ja: "どれくらい運動してる？",
      chunk: "work out",
      note: "『運動する、トレーニングする』ジムでの運動によく使う. How often と組み合わせて習慣を聞ける.",
      drills: [
        { ja: "週に3回運動しています", answers: ["I work out three times a week."] },
        { ja: "仕事のあとジムで運動しています", answers: ["I work out at the gym after work."], hint: "仕事のあと ＝ after work" },
      ],
    },
    // ---------- Day 3 ----------
    {
      id: "64", day: 3, scene: "場面19：運動",
      en: "I try to walk every morning.",
      ja: "毎朝歩くようにしています",
      chunk: "I try to ＋ 動詞",
      note: "『〜するようにしている、〜しようと努力している』健康や習慣の話でよく使う.",
      drills: [
        { ja: "体にいいものを食べるようにしている", answers: ["I try to eat healthy."], hint: "体にいいものを食べる ＝ eat healthy" },
        { ja: "早く寝るようにしている", answers: ["I try to go to bed early."] },
      ],
    },
    {
      id: "65", day: 3, scene: "場面19：運動",
      en: "Good for you! I hardly ever exercise.",
      ja: "えらいね！私はほとんど運動しないよ",
      chunk: "I hardly ever ＋ 動詞",
      note: "『ほとんど〜しない』never（一度もない）の一歩手前. 動詞の前に置く. 最初の Good for you! は『えらいね、よかったね』",
      drills: [
        { ja: "テレビはほとんど見ない", answers: ["I hardly ever watch TV."] },
        { ja: "朝ごはんはほとんど食べない", answers: ["I hardly ever eat breakfast."] },
      ],
    },
    {
      id: "66", day: 3, scene: "場面20：毎日の生活",
      en: "What time do you usually get up?",
      ja: "ふだん何時に起きる？",
      chunk: "What time do you usually ＋ 動詞?",
      note: "『ふだん何時に〜する？』と生活のリズムを聞く形. usually（ふだん、たいてい）は動詞の前に置く.",
      drills: [
        { ja: "ふだん何時に寝る？", answers: ["What time do you usually go to bed?"], hint: "寝る ＝ go to bed" },
        { ja: "ふだん何時に夕食を食べる？", answers: ["What time do you usually eat dinner?"] },
      ],
    },
    {
      id: "67", day: 3, scene: "場面20：毎日の生活",
      en: "Around six. I'm a morning person.",
      ja: "6時ごろ. 朝型なんです",
      chunk: "I'm a morning person / a night owl",
      note: "a morning person は『朝型の人』、a night owl（夜のフクロウ）は『夜型の人』Around six の around は『〜ごろ』",
      drills: [
        { ja: "朝はまったく苦手です", answers: ["I'm not a morning person at all."], hint: "まったく〜ない ＝ not 〜 at all" },
        { ja: "兄は夜型です", answers: ["My brother is a night owl."] },
      ],
    },
    {
      id: "68", day: 3, scene: "場面20：毎日の生活",
      en: "I could never get up that early!",
      ja: "私はそんなに早く起きられない！",
      chunk: "I could never ＋ 動詞",
      note: "『私には絶対〜できない』相手のすごさに驚きながら、自分のことを言う形.",
      drills: [
        { ja: "私には大都会に住むのは無理", answers: ["I could never live in a big city."] },
        { ja: "そんなにたくさん食べられない！", answers: ["I could never eat that much!"], hint: "そんなにたくさん ＝ that much" },
      ],
    },
    {
      id: "69", day: 3, scene: "場面21：天気",
      en: "It's so hot today!",
      ja: "今日はすごく暑いね！",
      chunk: "so ＋ 形容詞",
      note: "『すごく〜』very より気持ちがこもった言い方で、会話でよく使う.",
      drills: [
        { ja: "今日はすごく寒い！", answers: ["It's so cold today!"] },
        { ja: "これすごくおいしい！", answers: ["This is so good!"], hint: "おいしい ＝ good" },
      ],
    },
    {
      id: "70", day: 3, scene: "場面21：天気",
      en: "I know! Is it this hot in Japan?",
      ja: "だよね！日本もこんなに暑いの？",
      chunk: "this ＋ 形容詞",
      note: "『こんなに〜』目の前の状態とくらべて言う形. 最初の I know! は『だよね！』という同意.",
      drills: [
        { ja: "いつもこんなに混んでるの？", answers: ["Is it always this crowded?"], hint: "Is it always 〜?" },
        { ja: "こんなに大きいなんて知らなかった！", answers: ["I didn't know it was this big!"], hint: "I didn't know it was 〜" },
      ],
    },
    // ---------- Day 4 ----------
    {
      id: "71", day: 4, scene: "場面21：天気",
      en: "In summer, yes. But it's more humid.",
      ja: "夏はね. でももっと蒸し暑いよ",
      chunk: "形容詞er / more ＋ 形容詞 ＋ than ＋ 名詞",
      note: "『もっと〜』短い形容詞は -er（hotter）、長い形容詞は more（more humid）をつける. くらべる相手は than のうしろに置く.",
      drills: [
        { ja: "東京は大阪より大きい", answers: ["Tokyo is bigger than Osaka."], hint: "big → bigger（g を重ねる）" },
        { ja: "ハワイは東京よりのんびりできる", answers: ["Hawaii is more relaxing than Tokyo."], hint: "のんびりできる ＝ relaxing" },
      ],
    },
    {
      id: "72", day: 4, scene: "場面22：映画・ドラマ",
      en: "Have you seen any good movies lately?",
      ja: "最近何かいい映画見た？",
      chunk: "文 ＋ lately",
      note: "『最近』I've ＋ 過去分詞 や Have you ＋ 過去分詞? の文と一緒によく使う.",
      drills: [
        { ja: "最近忙しい", answers: ["I've been busy lately."], hint: "I've been 〜" },
        { ja: "最近何かいい本読んだ？", answers: ["Have you read any good books lately?"], hint: "read の過去分詞は read（発音は「レッド」）" },
      ],
    },
    {
      id: "73", day: 4, scene: "場面22：映画・ドラマ",
      en: "I watched a really good one on Netflix.",
      ja: "Netflix ですごくいいのを見たよ",
      chunk: "a ＋ 形容詞 ＋ one",
      note: "one は、前に出た名詞（ここでは movie）のくり返しを避けるために使う. a good one ＝ a good movie.",
      drills: [
        { ja: "かばんが古いから、新しいのが必要", answers: ["My bag is old. I need a new one."] },
        { ja: "どれがいい？", answers: ["Which one do you want?"], hint: "どれ ＝ which one" },
      ],
    },
    {
      id: "74", day: 4, scene: "場面22：映画・ドラマ",
      en: "What's it about?",
      ja: "どんな話？",
      chunk: "What's ＋ 名詞 ＋ about?",
      note: "『〜は何についての話？』と、映画、本、ドラマのあらすじを聞く形.",
      drills: [
        { ja: "その本はどんな話？", answers: ["What's the book about?"] },
        { ja: "そのドラマはどんな話？", answers: ["What's the show about?"], hint: "ドラマ ＝ show" },
      ],
    },
    {
      id: "75", day: 4, scene: "場面23：音楽",
      en: "What kind of music are you into?",
      ja: "どんな音楽が好き？",
      chunk: "be into ＋ 名詞",
      note: "『〜にハマっている、〜が大好き』のカジュアルな言い方. 今夢中になっているものを言うときにぴったり.",
      drills: [
        { ja: "最近ヨガにハマってる", answers: ["I'm into yoga these days."], hint: "最近 ＝ these days" },
        { ja: "スポーツは好き？", answers: ["Are you into sports?"] },
      ],
    },
    {
      id: "76", day: 4, scene: "場面23：音楽",
      en: "I'm really into K-pop right now.",
      ja: "今 K-POP にすごくハマってる",
      chunk: "文 ＋ right now",
      note: "『今』この瞬間だけでなく、「ここ最近」の意味でも使う.",
      drills: [
        { ja: "今すごく忙しい", answers: ["I'm really busy right now."] },
        { ja: "今、料理を習っているところ", answers: ["I'm learning to cook right now."], hint: "料理を習う ＝ learn to cook" },
      ],
    },
    {
      id: "77", day: 4, scene: "場面23：音楽",
      en: "Me too! Who's your favorite group?",
      ja: "私も！好きなグループは？",
      chunk: "Me too / Me neither",
      note: "『私も』相手が「〜だ・〜する」と言ったら Me too、「〜じゃない・〜しない」と言ったら Me neither（私も〜ない）を使う.",
      drills: [],
    },
    // ---------- Day 5 ----------
    {
      id: "78", day: 5, scene: "場面24：英語の話",
      en: "Your English is really good!",
      ja: "英語すごく上手だね！",
      chunk: "Your ＋ 名詞 ＋ is really ＋ 形容詞!",
      note: "『あなたの〜、すごく〜だね！』と気軽にほめる形. ネイティブとの会話でよく言われるので、聞き取れるようにしておく.",
      drills: [
        { ja: "日本語すごく上手だね！", answers: ["Your Japanese is really good!"] },
        { ja: "そのかばん、すごくかわいい！", answers: ["Your bag is really cute!"] },
      ],
    },
    {
      id: "79", day: 5, scene: "場面24：英語の話",
      en: "Thank you! I'm still learning.",
      ja: "ありがとう！まだ勉強中です",
      chunk: "I'm still ＋ 動詞ing",
      note: "『まだ〜しているところ』ほめられたら No, no と否定せず、まず Thank you! と受け取るのが英語の自然な返し方.",
      drills: [
        { ja: "まだ考え中", answers: ["I'm still thinking about it."], hint: "考える ＝ think about" },
        { ja: "まだやっているところ", answers: ["I'm still working on it."], hint: "（何かを）やっている ＝ work on" },
      ],
    },
    {
      id: "80", day: 5, scene: "場面24：英語の話",
      en: "When did you start learning?",
      ja: "いつ勉強を始めたの？",
      chunk: "start ＋ 動詞ing",
      note: "『〜し始める』start to ＋ 動詞 でも同じ意味. 過去のことなので When did you …? で聞く.",
      drills: [
        { ja: "そこではいつ働き始めたの？", answers: ["When did you start working there?"], hint: "When did you start 〜ing?" },
        { ja: "去年テニスを始めました", answers: ["I started playing tennis last year."], hint: "テニスをする ＝ play tennis" },
      ],
    },
    {
      id: "81", day: 5, scene: "場面24：英語の話",
      en: "About three months ago.",
      ja: "3か月くらい前です",
      chunk: "期間 ＋ ago",
      note: "『〜前に』過去形の文で使う. About は『だいたい』",
      drills: [
        { ja: "2年前にここに引っ越しました", answers: ["I moved here two years ago."], hint: "引っ越す ＝ move" },
        { ja: "ずっと前に出会いました", answers: ["We met a long time ago."], hint: "ずっと前 ＝ a long time ago" },
      ],
    },
    {
      id: "82", day: 5, scene: "場面25：言語",
      en: "Do you speak any other languages?",
      ja: "ほかに話せる言語はある？",
      chunk: "any other ＋ 名詞（複数）",
      note: "『ほかに何か〜』質問で使う. うしろの名詞は複数形.",
      drills: [
        { ja: "ほかに質問はある？", answers: ["Do you have any other questions?"] },
        { ja: "ほかにいいビーチある？", answers: ["Are there any other good beaches?"], hint: "Are there any 〜?" },
      ],
    },
    {
      id: "83", day: 5, scene: "場面25：言語",
      en: "I speak a little Spanish.",
      ja: "スペイン語を少し話せるよ",
      chunk: "a little ＋ 名詞",
      note: "『少し〜』言語なら I speak a little ＋ 言語 で「少し話せる」と控えめに言える.",
      drills: [
        { ja: "英語を少し話せます", answers: ["I speak a little English."] },
        { ja: "ワインについて少し知っています", answers: ["I know a little about wine."], hint: "〜について ＝ about" },
      ],
    },
    {
      id: "84", day: 5, scene: "場面25：言語",
      en: "How do you say \"thank you\" in Spanish?",
      ja: "スペイン語で「ありがとう」は何て言うの？",
      chunk: "How do you say ＋ 言葉 ＋ in ＋ 言語?",
      note: "『〜は〜語で何て言うの？』相手の言語に興味を示すと会話が盛り上がる. 英語での言い方がわからないときにも使える.",
      drills: [
        { ja: "ハワイ語で「こんにちは」は何て言うの？", answers: ["How do you say \"hello\" in Hawaiian?"], hint: "ハワイ語 ＝ Hawaiian" },
        { ja: "この言葉は英語で何て言うの？", answers: ["How do you say this word in English?"] },
      ],
    },
    // ---------- Day 6 ----------
    {
      id: "85", day: 6, scene: "場面26：通勤",
      en: "How do you get to work?",
      ja: "仕事にはどうやって行ってるの？",
      chunk: "How do you get to ＋ 場所?",
      note: "『〜にはどうやって行くの？』と、行き方や交通手段を聞く形. get to は『〜に着く、行く』work の前に the はつけない.",
      drills: [
        { ja: "空港へはどうやって行くの？", answers: ["How do you get to the airport?"] },
        { ja: "ビーチへはどう行けばいい？", answers: ["How do I get to the beach?"], hint: "自分が行くときは How do I 〜?" },
      ],
    },
    {
      id: "86", day: 6, scene: "場面26：通勤",
      en: "I take the train.",
      ja: "電車で行きます",
      chunk: "take ＋ 乗り物",
      note: "『〜に乗って行く』by train（電車で）という言い方もある.",
      drills: [
        { ja: "バスで通勤しています", answers: ["I take the bus to work."], hint: "〜で通勤する ＝ take 〜 to work" },
        { ja: "タクシーに乗ろう", answers: ["Let's take a taxi."] },
      ],
    },
    {
      id: "87", day: 6, scene: "場面26：通勤",
      en: "How long does it take?",
      ja: "どれくらいかかるの？",
      chunk: "How long does it take to ＋ 動詞?",
      note: "『（〜するのに）どれくらい時間がかかる？』答えは It takes ＋ 時間. How often（頻度）とのちがいに注意.",
      drills: [
        { ja: "そこに行くのにどれくらいかかる？", answers: ["How long does it take to get there?"], hint: "そこに行く ＝ get there" },
        { ja: "30分くらいかかります", answers: ["It takes about 30 minutes."], hint: "It takes 〜" },
      ],
    },
    {
      id: "88", day: 6, scene: "場面27：ほめる",
      en: "I love your bag!",
      ja: "そのかばん、すてき！",
      chunk: "I love your ＋ 名詞!",
      note: "『その〜、すてき！』知らない人にも気軽に言えるほめ言葉で、そこから会話が始まることも多い.",
      drills: [
        { ja: "そのシャツすてき！", answers: ["I love your shirt!"] },
        { ja: "その髪型いいね！", answers: ["I love your hair!"], hint: "髪型 ＝ hair" },
      ],
    },
    {
      id: "89", day: 6, scene: "場面27：ほめる",
      en: "Thanks! I got it in Japan.",
      ja: "ありがとう！日本で買ったの",
      chunk: "get / got ＋ 物",
      note: "get は『買う』『もらう』の意味でよく使い、buy より会話的. got は過去形.",
      drills: [
        { ja: "それどこで買ったの？", answers: ["Where did you get that?"], hint: "Where did you 〜?" },
        { ja: "これはマーケットで買いました", answers: ["I got this at a market."] },
      ],
    },
    {
      id: "90", day: 6, scene: "場面27：ほめる",
      en: "No way! That's where I'm from!",
      ja: "うそ！私の出身地だよ！",
      chunk: "That's where ＋ 主語 ＋ 動詞",
      note: "『そこが〜するところ』No way! は「いやだ」ではなく『うそでしょ！』という驚き.",
      drills: [
        { ja: "そこ、私の職場だよ！", answers: ["That's where I work!"], hint: "職場 → 私が働いているところ" },
        { ja: "そこで私たち出会ったんだよ！", answers: ["That's where we met!"], hint: "出会う ＝ meet → met" },
      ],
    },
    {
      id: "91", day: 6, scene: "場面28：聞き取れないとき",
      en: "Sorry, I didn't catch that.",
      ja: "ごめんなさい、聞き取れませんでした",
      chunk: "I didn't catch ＋ 名詞",
      note: "catch には「つかまえる」のほかに『（言葉を）聞き取る』という意味がある. 聞き返すときの自然な言い方.",
      drills: [
        { ja: "お名前が聞き取れませんでした", answers: ["I didn't catch your name."] },
        { ja: "今の聞き取れた？", answers: ["Did you catch that?"], hint: "Did you 〜?" },
      ],
    },
    {
      id: "92", day: 6, scene: "場面28：聞き取れないとき",
      en: "Could you speak a little more slowly?",
      ja: "もう少しゆっくり話してもらえますか？",
      chunk: "Could you ＋ 動詞?",
      note: "『〜してもらえますか？』とていねいにお願いする形. Can you ＋ 動詞? よりやわらかい.",
      drills: [
        { ja: "私たちの写真を撮ってもらえますか？", answers: ["Could you take a picture of us?"], hint: "〜の写真を撮る ＝ take a picture of 〜" },
        { ja: "もう一度言ってもらえますか？", answers: ["Could you say that again?"] },
      ],
    },
    // ---------- Day 7 ----------
    {
      id: "93", day: 7, scene: "場面28：聞き取れないとき",
      en: "What does \"pau hana\" mean?",
      ja: "「パウハナ」ってどういう意味？",
      chunk: "What does ＋ 言葉 ＋ mean?",
      note: "『〜ってどういう意味？』知らない言葉が出たら、そのまま聞けば会話が止まらない. 答えは It means ＋ 意味. pau hana はハワイ語で『仕事終わり』",
      drills: [
        { ja: "「マハロ」ってどういう意味？", answers: ["What does \"mahalo\" mean?"] },
        { ja: "この言葉はどういう意味？", answers: ["What does this word mean?"] },
      ],
    },
    {
      id: "94", day: 7, scene: "場面29：話を終える",
      en: "Well, I should get going.",
      ja: "じゃあ、そろそろ行かなきゃ",
      chunk: "I should ＋ 動詞",
      note: "『そろそろ〜しないと』会話を自然に終えるときの定番. 最初の Well, は「さて、じゃあ」と話を区切る合図. get going は『出発する』",
      drills: [
        { ja: "そろそろホテルに戻らないと", answers: ["I should get back to my hotel."], hint: "戻る ＝ get back" },
        { ja: "今夜は早く寝ないと", answers: ["I should go to bed early tonight."] },
      ],
    },
    {
      id: "95", day: 7, scene: "場面29：話を終える",
      en: "It was really nice talking to you.",
      ja: "話せて本当に楽しかったです",
      chunk: "It was nice ＋ 動詞ing",
      note: "『〜できてよかった』と別れぎわに言う形.",
      drills: [
        { ja: "（初対面の人と別れるときに）お会いできてよかったです", answers: ["It was nice meeting you."] },
        { ja: "また会えてよかった", answers: ["It was nice seeing you again."], hint: "2回目以降の「会う」は see" },
      ],
    },
    {
      id: "96", day: 7, scene: "場面29：話を終える",
      en: "You too! Can I get your Instagram?",
      ja: "こちらこそ！インスタ教えてもらえる？",
      chunk: "Can I get ＋ 名詞?",
      note: "『〜をもらえる？』連絡先を聞くときにも、お店で注文するときにも使える.",
      drills: [
        { ja: "電話番号教えてもらえる？", answers: ["Can I get your number?"], hint: "電話番号 ＝ number" },
        { ja: "（お店で）コーヒーをください", answers: ["Can I get a coffee, please?"] },
      ],
    },
    {
      id: "97", day: 7, scene: "場面30：さようなら",
      en: "Sure! Let's keep in touch.",
      ja: "もちろん！連絡取り合おうね",
      chunk: "Let's ＋ 動詞",
      note: "『〜しよう』と誘う形. keep in touch は『連絡を取り合う』",
      drills: [
        { ja: "今度コーヒーでも行こう！", answers: ["Let's get coffee sometime!"], hint: "コーヒーに行く ＝ get coffee ／ 今度 ＝ sometime" },
        { ja: "写真撮ろう！", answers: ["Let's take a picture!"] },
      ],
    },
    {
      id: "98", day: 7, scene: "場面30：さようなら",
      en: "Enjoy the rest of your trip!",
      ja: "残りの旅行も楽しんでね！",
      chunk: "Enjoy ＋ 名詞!",
      note: "『〜を楽しんで！』と、別れぎわに相手を送り出す言葉. the rest of ＋ 名詞 は『残りの〜』",
      drills: [
        { ja: "滞在を楽しんで！", answers: ["Enjoy your stay!"], hint: "滞在 ＝ stay" },
        { ja: "このあとも楽しい一日を！", answers: ["Enjoy the rest of your day!"], hint: "the rest of 〜" },
      ],
    },
    {
      id: "99", day: 7, scene: "場面30：さようなら",
      en: "Thanks! Have a great day!",
      ja: "ありがとう！よい一日を！",
      chunk: "Have a great ＋ 名詞!",
      note: "『よい〜を！』という別れのあいさつ. 言われたら You too! と返す.",
      drills: [],
    },
    {
      id: "100", day: 7, scene: "場面30：さようなら",
      en: "Take care!",
      ja: "元気でね！",
      chunk: "Take care!（決まり文句）",
      note: "『元気でね、気をつけてね』しばらく会わない相手への温かい別れのあいさつ. このまま覚える.",
      drills: [],
    },
  ],
};
