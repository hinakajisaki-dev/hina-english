// スモールトーク Week 1: 「はじめて会った人と話す」49 フレーズ、7 日分.
// From smalltalk/week1.md (branch claude/fervent-clarke-wg3uno). Every student gets the same phrases.
// Fields as in public/phrases/book.js. Keep the ids: students' フレーズ復習 lists use them.
// Changed by the teacher after converting: #3's 塊 is "isn't it?".

export const WEEK1 = {
  week: 1,
  title: "はじめて会った人と話す",
  phrases: [
    // ---------- Day 1 ----------
    {
      id: "01", day: 1, scene: "場面1：あいさつ（ホテルのプールで）",
      en: "Hi! How's it going?",
      ja: "やあ！調子どう？",
      chunk: "How's ＋ 名詞 ＋ going?",
      note: "『〜はどう？うまくいってる？』と様子を聞く形. How's it going? は How are you? のカジュアル版で、あいさつとして使う.",
      drills: [
        { ja: "仕事はどう？", answers: ["How's work going?"], hint: "仕事 ＝ work（a や the はつけない）" },
        { ja: "旅行はどう？", answers: ["How's your trip going?"], hint: "旅行 ＝ trip" },
      ],
    },
    {
      id: "02", day: 1, scene: "場面1：あいさつ（ホテルのプールで）",
      en: "Pretty good, thanks. How about you?",
      ja: "けっこういいよ、ありがとう. あなたは？",
      chunk: "自分の答え ＋ How about you?",
      note: "自分が答えたあとに『あなたは？』と同じ質問を相手に返す形. これを言うと会話が一方通行にならず、キャッチボールが続く. What about you? も同じ意味.",
      drills: [],
    },
    {
      id: "03", day: 1, scene: "場面1：あいさつ（ホテルのプールで）",
      en: "Not bad! Beautiful day, isn't it?",
      ja: "悪くないよ！いい天気だね",
      chunk: "isn't it?",
      note: "文の最後につけて『〜ですよね？』と相手に同意を求める形. 相手は Yes, it is! と答えやすいので、知らない人に話しかけるきっかけにぴったり.",
      drills: [
        { ja: "今日は暑いですよね", answers: ["It's hot today, isn't it?"] },
        { ja: "ここ、いいですよね", answers: ["This place is nice, isn't it?"], hint: "ここ ＝ this place" },
      ],
    },
    {
      id: "04", day: 1, scene: "場面2：名前",
      en: "I'm Yuki, by the way.",
      ja: "ちなみに、私はユキです",
      chunk: "By the way, ＋ 文",
      note: "『ところで、ちなみに』話題を変えたり、言い忘れたことを足したりするときの言葉. 会話の途中で名前を言うときにも自然に使える. 文の最初にも最後にも置ける.",
      drills: [
        { ja: "ところで、どこ出身？", answers: ["By the way, where are you from?"] },
        { ja: "ちなみに、その帽子すてきですね", answers: ["By the way, I love your hat."], hint: "「その〜すてき」は I love your 〜" },
      ],
    },
    {
      id: "05", day: 1, scene: "場面2：名前",
      en: "Nice to meet you, Yuki. I'm Michael.",
      ja: "よろしく、ユキ. マイケルです",
      chunk: "Nice to ＋ meet / see ＋ you",
      note: "meet は「初めて会う」なので、Nice to meet you は初対面のときだけ. 2回目からは see を使う.",
      drills: [],
    },
    {
      id: "06", day: 1, scene: "場面2：名前",
      en: "Do people call you Mike?",
      ja: "みんなからマイクって呼ばれてるの？",
      chunk: "call ＋ 人 ＋ 呼び名",
      note: "『（人）を〜と呼ぶ』英語では Michael → Mike のような短い呼び名（ニックネーム）がよくある. 自分の呼ばれ方を伝えるときにも使える.",
      drills: [
        { ja: "みんなユウって呼びます", answers: ["Everyone calls me Yu."], hint: "Everyone のあとの call には s がつく" },
        { ja: "なんて呼べばいい？", answers: ["What should I call you?"], hint: "What should I 〜?" },
      ],
    },
    {
      id: "07", day: 1, scene: "場面3：仕事",
      en: "So, what do you do?",
      ja: "で、お仕事は何をしてるの？",
      chunk: "What do/does ＋ 人 ＋ do?",
      note: "『（人）の仕事は何？』と聞く定番の形. What's your job? より自然. What are you doing?（今何してる？）とはちがうので注意. 最初の So, は新しい話題に入る合図.",
      drills: [
        { ja: "お兄さんは何の仕事をしてるの？", answers: ["What does your brother do?"], hint: "1人のときは does" },
        { ja: "ご両親は何の仕事をしてるの？", answers: ["What do your parents do?"], hint: "両親 ＝ parents" },
      ],
    },
    // ---------- Day 2 ----------
    {
      id: "08", day: 2, scene: "場面3：仕事",
      en: "I'm a nurse. What about you?",
      ja: "看護師です. あなたは？",
      chunk: "I'm ＋ a/an ＋ 職業",
      note: "職業を言うときは a をつける. engineer のように母音（ア・イ・ウ・エ・オの音）で始まる職業は an. What about you? は How about you? と同じ.",
      drills: [
        { ja: "教師です", answers: ["I'm a teacher."] },
        { ja: "会社員です", answers: ["I'm an office worker."], hint: "会社員 ＝ office worker" },
      ],
    },
    {
      id: "09", day: 2, scene: "場面3：仕事",
      en: "I work for a travel company.",
      ja: "旅行会社で働いています",
      chunk: "work for ＋ 会社 / work at ＋ 場所 / work in ＋ 分野",
      note: "どこで働いているかは前置詞で使い分ける. for のうしろは会社、at のうしろは場所、in のうしろは業界や分野.",
      drills: [
        { ja: "病院で働いています", answers: ["I work at a hospital."] },
        { ja: "営業の仕事をしています", answers: ["I work in sales."], hint: "営業 ＝ sales" },
      ],
    },
    {
      id: "10", day: 2, scene: "場面3：仕事",
      en: "How long have you been doing that?",
      ja: "その仕事はどれくらい続けているの？",
      chunk: "How long have you been ＋ 動詞ing?",
      note: "『（過去から今まで）どれくらい〜しているの？』と期間を聞く形. 答えは For five years.（5年です）や Since 2020.（2020年からです）のように言う.",
      drills: [
        { ja: "英語はどれくらい勉強してるの？", answers: ["How long have you been studying English?"], hint: "How long have you been 〜ing?" },
        { ja: "ここにはどれくらい住んでるの？", answers: ["How long have you been living here?"] },
      ],
    },
    {
      id: "11", day: 2, scene: "場面4：仕事についてもっと聞く",
      en: "Do you enjoy it?",
      ja: "仕事は楽しい？",
      chunk: "enjoy ＋ 名詞 / 動詞ing",
      note: "『〜を楽しむ』うしろには名詞か 〜ing が来る. enjoy to ＋ 動詞 とは言わないので注意.",
      drills: [
        { ja: "料理するのが楽しい", answers: ["I enjoy cooking."] },
        { ja: "映画は楽しかった？", answers: ["Did you enjoy the movie?"], hint: "過去の質問は Did you 〜?" },
      ],
    },
    {
      id: "12", day: 2, scene: "場面4：仕事についてもっと聞く",
      en: "Yeah. It's busy, but it's fun.",
      ja: "うん. 忙しいけど、楽しいよ",
      chunk: "文 ＋ , but ＋ 文",
      note: "『〜だけど〜』と、マイナスとプラスの両方を言う形. but のうしろに本当に言いたいことが来ることが多い.",
      drills: [
        { ja: "狭いけど、居心地がいい", answers: ["It's small, but it's cozy."], hint: "居心地がいい ＝ cozy" },
        { ja: "高いけど、その価値はある", answers: ["It's expensive, but it's worth it."], hint: "その価値がある ＝ it's worth it" },
      ],
    },
    {
      id: "13", day: 2, scene: "場面4：仕事についてもっと聞く",
      en: "The best part is meeting new people.",
      ja: "いちばんいいところは、新しい人に会えることです",
      chunk: "The best part (of ＋ 名詞) is ＋ 名詞 / 動詞ing",
      note: "『（〜の）いちばんいいところは〜』相手の仕事や住んでいる場所について、もう一歩深く話せる.",
      drills: [
        { ja: "ここに住んでいていちばんいいところは？", answers: ["What's the best part of living here?"], hint: "What's the best part of 〜ing?" },
        { ja: "仕事でいちばんいいのは、一緒に働く人たちです", answers: ["The best part of my job is the people."], hint: "一緒に働く人たち ＝ the people" },
      ],
    },
    {
      id: "14", day: 2, scene: "場面5：出身",
      en: "Where are you from?",
      ja: "どこの出身？",
      chunk: "Where is/are ＋ 人・物 ＋ from?",
      note: "『〜はどこから来たの？どこ出身？』人にも物にも使える. 1人・1つなら is、複数なら are.",
      drills: [
        { ja: "ご家族はどこの出身？", answers: ["Where is your family from?"], hint: "family は is" },
        { ja: "このコーヒーはどこ産？", answers: ["Where is this coffee from?"], hint: "「どこ産」も Where 〜 from? で聞ける" },
      ],
    },
    // ---------- Day 3 ----------
    {
      id: "15", day: 3, scene: "場面5：出身",
      en: "I'm from Japan. Osaka, actually.",
      ja: "日本から来ました. 大阪です",
      chunk: "文 ＋ , actually",
      note: "actually は『実は』ざっくり答えたあとに「くわしく言うと〜」と情報を足したり、相手の思いちがいをやんわり直したりするときに使う.",
      drills: [
        { ja: "東京に住んでいます. 実は渋谷の近くなんです", answers: ["I live in Tokyo. Near Shibuya, actually."], hint: "近く ＝ near" },
        { ja: "実は教師じゃなくて、看護師なんです", answers: ["I'm not a teacher, actually. I'm a nurse."] },
      ],
    },
    {
      id: "16", day: 3, scene: "場面5：出身",
      en: "Oh, cool! I've always wanted to go to Japan.",
      ja: "へえ、いいね！ずっと日本に行ってみたかったんだ",
      chunk: "I've always wanted to ＋ 動詞",
      note: "『ずっと〜したいと思っていた』昔から今まで続いている願いを言う形. 相手の出身地や趣味に興味を示すときによく使う.",
      drills: [
        { ja: "ずっとサーフィンをやってみたかった", answers: ["I've always wanted to try surfing."], hint: "やってみる ＝ try" },
        { ja: "ずっとニューヨークに行きたかった", answers: ["I've always wanted to go to New York."] },
      ],
    },
    {
      id: "17", day: 3, scene: "場面5：出身",
      en: "Have you ever been?",
      ja: "行ったことはある？",
      chunk: "Have you ever ＋ 過去分詞?",
      note: "『今までに〜したことある？』と経験を聞く形. 「〜に行ったことある？」は Have you ever been to ＋ 場所? 答えは Yes, once.（1回ある）か No, never.（一度もない）で返せる.",
      drills: [
        { ja: "沖縄に行ったことある？", answers: ["Have you ever been to Okinawa?"], hint: "行ったことがある ＝ have been to" },
        { ja: "納豆を食べたことある？", answers: ["Have you ever tried natto?"], hint: "食べてみる ＝ try → tried" },
      ],
    },
    {
      id: "18", day: 3, scene: "場面6：地元",
      en: "What's Osaka like?",
      ja: "大阪ってどんなところ？",
      chunk: "What's ＋ 名詞 ＋ like?",
      note: "『〜ってどんな感じ？』と説明してもらう質問. この like は「好き」ではなく「〜のような」という意味. 場所、人、食べ物などに使える.",
      drills: [
        { ja: "地元はどんなところ？", answers: ["What's your hometown like?"], hint: "地元 ＝ hometown" },
        { ja: "日本の天気はどんな感じ？", answers: ["What's the weather like in Japan?"], hint: "in Japan は最後" },
      ],
    },
    {
      id: "19", day: 3, scene: "場面6：地元",
      en: "There's a lot to do there.",
      ja: "そこはやることがたくさんあるよ",
      chunk: "There's a lot to ＋ 動詞",
      note: "『〜するもの（こと）がたくさんある』街や観光地を紹介するときによく使う. There's は There is の短い形. a lot は『たくさん』",
      drills: [
        { ja: "東京には見るものがたくさんある", answers: ["There's a lot to see in Tokyo."], hint: "in Tokyo は最後" },
        { ja: "ここには食べるものがたくさんある", answers: ["There's a lot to eat here."] },
      ],
    },
    {
      id: "20", day: 3, scene: "場面6：地元",
      en: "It's famous for its food.",
      ja: "食べ物で有名です",
      chunk: "名詞 ＋ is famous for ＋ 名詞",
      note: "『〜で有名』地元の自慢を言うときに便利. its は「その（街の）」",
      drills: [
        { ja: "京都はお寺で有名です", answers: ["Kyoto is famous for its temples."], hint: "お寺 ＝ temple" },
        { ja: "ハワイはビーチで有名です", answers: ["Hawaii is famous for its beaches."] },
      ],
    },
    {
      id: "21", day: 3, scene: "場面7：住んでいるところ",
      en: "Do you live around here?",
      ja: "この辺りに住んでるの？",
      chunk: "文 ＋ around here",
      note: "『この辺り、この近く』お店や場所を聞くときにもよく使う.",
      drills: [
        { ja: "この辺にいいカフェある？", answers: ["Is there a good café around here?"], hint: "〜ある？ ＝ Is there 〜?" },
        { ja: "この辺で働いてるの？", answers: ["Do you work around here?"] },
      ],
    },
    // ---------- Day 4 ----------
    {
      id: "22", day: 4, scene: "場面7：住んでいるところ",
      en: "Yeah, I've lived here since I was a kid.",
      ja: "うん、子どものころからここに住んでるよ",
      chunk: "since ＋ 始まった時 / for ＋ 期間",
      note: "『〜から（ずっと）』は since ＋ 始まった時. 『〜の間』は for ＋ 期間. どちらも I've ＋ 過去分詞 の文でよく使う.",
      drills: [
        { ja: "東京に10年住んでいます", answers: ["I've lived in Tokyo for ten years."], hint: "I've lived 〜" },
        { ja: "2020年からそこで働いています", answers: ["I've worked there since 2020."], hint: "I've worked 〜" },
      ],
    },
    {
      id: "23", day: 4, scene: "場面7：住んでいるところ",
      en: "Lucky you!",
      ja: "いいなあ！",
      chunk: "Lucky you!（決まり文句）",
      note: "『いいなあ！うらやましい！』と、相手のいいことを明るくうらやむ言葉. 嫌味はなく、ほめ言葉に近い. このまま覚える.",
      drills: [],
    },
    {
      id: "24", day: 4, scene: "場面8：きょうだい",
      en: "Do you have any brothers or sisters?",
      ja: "きょうだいはいる？",
      chunk: "Do you have any ＋ 名詞（複数）?",
      note: "『〜はある？いる？』質問では some ではなく any を使う. うしろの名詞は複数形.",
      drills: [
        { ja: "ペットは飼ってる？", answers: ["Do you have any pets?"] },
        { ja: "今週末、何か予定ある？", answers: ["Do you have any plans this weekend?"], hint: "予定 ＝ plans" },
      ],
    },
    {
      id: "25", day: 4, scene: "場面8：きょうだい",
      en: "Yes, I have an older brother and a younger sister.",
      ja: "うん、兄と妹がいます",
      chunk: "older / younger ＋ brother / sister",
      note: "英語には「兄」「弟」のような別々の言葉がないので、older（年上の）／ younger（年下の）をつけて言う. ふだんは brother, sister だけで言うことも多い.",
      drills: [
        { ja: "弟がいます", answers: ["I have a younger brother."] },
        { ja: "姉は大阪に住んでいます", answers: ["My older sister lives in Osaka."], hint: "sister のあとの live には s がつく" },
      ],
    },
    {
      id: "26", day: 4, scene: "場面8：きょうだい",
      en: "Are you close?",
      ja: "仲はいいの？",
      chunk: "be close (with ＋ 人)",
      note: "close は「近い」だけでなく『仲がいい』という意味もある. この意味では「クロース」と発音する. close the door（ドアを閉める）の「クローズ」とはちがう.",
      drills: [
        { ja: "ご両親とは仲がいい？", answers: ["Are you close with your parents?"], hint: "Are you close with 〜?" },
        { ja: "私たち、すごく仲がいいです", answers: ["We're very close."] },
      ],
    },
    {
      id: "27", day: 4, scene: "場面8：きょうだい",
      en: "Yeah, we get along really well.",
      ja: "うん、すごく仲がいいよ",
      chunk: "get along (with ＋ 人)",
      note: "『（〜と）うまくやっている、仲よくしている』家族、同僚、友だちなど、人との関係を言うときに使う.",
      drills: [
        { ja: "同僚とうまくやっています", answers: ["I get along well with my coworkers."], hint: "同僚 ＝ coworkers" },
        { ja: "お兄さんとはうまくやってる？", answers: ["Do you get along with your brother?"], hint: "Do you get along with 〜?" },
      ],
    },
    {
      id: "28", day: 4, scene: "場面9：子ども",
      en: "Do you have kids?",
      ja: "お子さんはいる？",
      chunk: "kid / kids",
      note: "kids は children（子どもたち）のカジュアルな言い方で、会話ではこちらが自然. 1人なら kid.",
      drills: [
        { ja: "うちの子たちはビーチが大好き", answers: ["My kids love the beach."] },
        { ja: "お子さんは学校に通ってる？", answers: ["Are your kids in school?"], hint: "学校に通っている ＝ in school" },
      ],
    },
    // ---------- Day 5 ----------
    {
      id: "29", day: 5, scene: "場面9：子ども",
      en: "Yes, I have two. How many do you have?",
      ja: "うん、2人. あなたは何人？",
      chunk: "How many ＋ 名詞（複数）＋ do you have?",
      note: "『〜は何人（いくつ）いる？』と数を聞く形. How many のうしろは複数形の名詞. 話の流れでわかるときは、I have two. / How many do you have? のように名詞を省ける.",
      drills: [
        { ja: "きょうだいは何人？", answers: ["How many brothers and sisters do you have?"], hint: "きょうだい ＝ brothers and sisters" },
        { ja: "ペットは何匹飼ってる？", answers: ["How many pets do you have?"] },
      ],
    },
    {
      id: "30", day: 5, scene: "場面9：子ども",
      en: "Three! How old are yours?",
      ja: "3人！お子さんはいくつ？",
      chunk: "How old is ＋ 人? / How old are ＋ 人（複数）?",
      note: "『〜は何歳？』1人なら is、複数なら are. yours は「あなたの（子どもたち）」で、同じ言葉のくり返しを避けている.",
      drills: [
        { ja: "息子さんは何歳？", answers: ["How old is your son?"] },
        { ja: "ご両親はおいくつ？", answers: ["How old are your parents?"], hint: "2人なので are" },
      ],
    },
    {
      id: "31", day: 5, scene: "場面9：子ども",
      en: "My son is eight, and my daughter is five.",
      ja: "息子は8歳で、娘は5歳です",
      chunk: "人 ＋ is ＋ 年齢",
      note: "年齢は「人 is 数字」だけで言える. years old はつけてもつけなくても OK. son は息子、daughter は娘.",
      drills: [
        { ja: "兄は30歳です", answers: ["My brother is thirty."] },
        { ja: "うちの犬は3歳です", answers: ["My dog is three."] },
      ],
    },
    {
      id: "32", day: 5, scene: "場面10：ペット",
      en: "Is that your dog? He's so cute!",
      ja: "あれはあなたの犬？かわいい！",
      chunk: "Is that your ＋ 名詞?",
      note: "『あれ（それ）はあなたの〜？』話しかけるきっかけに便利. 名前や性別がわかっているペットは it ではなく he / she で呼ぶのがふつう.",
      drills: [
        { ja: "（メスの猫を見て）あれはあなたの猫？きれい！", answers: ["Is that your cat? She's beautiful!"], hint: "メスなので she" },
        { ja: "あれはあなたの車？かっこいい！", answers: ["Is that your car? It's so cool!"] },
      ],
    },
    {
      id: "33", day: 5, scene: "場面10：ペット",
      en: "Thanks! His name is Kaia.",
      ja: "ありがとう！カイアっていうの",
      chunk: "His / Her name is ＋ 名前",
      note: "『彼（彼女）の名前は〜』ペットや家族を紹介するときに使う.",
      drills: [
        { ja: "（メスの犬を紹介して）モモっていいます", answers: ["Her name is Momo."] },
        { ja: "（オスの犬を見て）名前は何ていうの？", answers: ["What's his name?"] },
      ],
    },
    {
      id: "34", day: 5, scene: "場面10：ペット",
      en: "What kind of dog is he?",
      ja: "何の犬種？",
      chunk: "What kind of ＋ 名詞 ＋ do you ＋ 動詞?",
      note: "『どんな種類の〜？』名詞を入れかえるだけで、いろいろなことが聞ける. be動詞なら What kind of dog is he? の形.",
      drills: [
        { ja: "どんな食べ物が好き？", answers: ["What kind of food do you like?"] },
        { ja: "どんなお仕事をしているの？", answers: ["What kind of work do you do?"], hint: "What kind of work 〜?" },
      ],
    },
    {
      id: "35", day: 5, scene: "場面11：どれくらいの頻度？",
      en: "How often do you come to Hawaii?",
      ja: "ハワイにはどれくらい来るの？",
      chunk: "How often do you ＋ 動詞?",
      note: "『どれくらいの頻度で〜？』と回数を聞く質問. be動詞なら How often are you in ＋ 場所? 答えは once a year（年1回）、from time to time（ときどき）など. How long（期間）、How many（数）と区別する.",
      drills: [
        { ja: "どれくらい外食する？", answers: ["How often do you eat out?"], hint: "外食する ＝ eat out" },
        { ja: "家族とはどれくらい会う？", answers: ["How often do you see your family?"], hint: "会う ＝ see" },
      ],
    },
    // ---------- Day 6 ----------
    {
      id: "36", day: 6, scene: "場面11：どれくらいの頻度？",
      en: "I'm here from time to time.",
      ja: "ときどき来ています",
      chunk: "文 ＋ from time to time",
      note: "『ときどき』sometimes とほぼ同じ意味. 文の最後に置くことが多い.",
      drills: [
        { ja: "ときどきお寿司を食べます", answers: ["I eat sushi from time to time."], hint: "from time to time は最後" },
        { ja: "彼女とはときどき会います", answers: ["I see her from time to time."] },
      ],
    },
    {
      id: "37", day: 6, scene: "場面11：どれくらいの頻度？",
      en: "Maybe once or twice a year.",
      ja: "年に1、2回かな",
      chunk: "回数 ＋ a ＋ week / month / year",
      note: "「週・月・年に何回」の言い方. 1回は once、2回は twice、3回からは 数字 ＋ times. 最初の Maybe は「〜かな」と数字をぼかす言い方.",
      drills: [
        { ja: "ジムに週3回行きます", answers: ["I go to the gym three times a week."], hint: "3回 ＝ three times" },
        { ja: "母には週1回電話します", answers: ["I call my mom once a week."], hint: "電話する ＝ call" },
      ],
    },
    {
      id: "38", day: 6, scene: "場面11：どれくらいの頻度？",
      en: "Wow, you must really love it here!",
      ja: "へえ、ここが本当に好きなんだね！",
      chunk: "主語 ＋ must ＋ 動詞",
      note: "ここの must は「〜しなければならない」ではなく『きっと〜にちがいない』という推測. 相手の話を聞いて、気持ちを想像して返すときに便利.",
      drills: [
        { ja: "（相手に）疲れてるでしょう！", answers: ["You must be tired!"], hint: "must のあとは be" },
        { ja: "それは楽しいだろうね！", answers: ["That must be fun!"], hint: "That must be 〜" },
      ],
    },
    {
      id: "39", day: 6, scene: "場面12：旅行中",
      en: "Are you here on vacation?",
      ja: "休暇で来てるの？",
      chunk: "on vacation / on business",
      note: "『休暇で（旅行中で）』は on vacation、『仕事で』は on business. 旅行先での定番の質問.",
      drills: [
        { ja: "お仕事で来ているんですか？", answers: ["Are you here on business?"] },
        { ja: "来週は休暇です", answers: ["I'm on vacation next week."] },
      ],
    },
    {
      id: "40", day: 6, scene: "場面12：旅行中",
      en: "Yes, I'm here with my family for a week.",
      ja: "うん、家族と1週間来ています",
      chunk: "with ＋ 人 / for ＋ 期間",
      note: "with は『〜と一緒に』、for は『〜の間』という意味. この2つで「誰と、どれくらい」を一度に言える.",
      drills: [
        { ja: "友だちと3日間来ています", answers: ["I'm here with my friends for three days."], hint: "I'm here with 〜 for 〜" },
        { ja: "姉と1週間来ました", answers: ["I came with my sister for a week."], hint: "来た ＝ came" },
      ],
    },
    {
      id: "41", day: 6, scene: "場面12：旅行中",
      en: "How do you like it so far?",
      ja: "ここまでどう？",
      chunk: "How do you like ＋ 名詞?",
      note: "『〜はどう？気に入った？』と感想を聞く形. so far は『今のところ』",
      drills: [
        { ja: "新しい仕事はどう？", answers: ["How do you like your new job?"] },
        { ja: "ここの食べ物はどう？", answers: ["How do you like the food here?"], hint: "here は最後" },
      ],
    },
    {
      id: "42", day: 6, scene: "場面12：旅行中",
      en: "I love it! Everyone is so friendly.",
      ja: "大好き！みんなすごくフレンドリー",
      chunk: "Everyone is ＋ 形容詞",
      note: "everyone は『みんな』だけど、文法上は1人あつかいなので are ではなく is.",
      drills: [
        { ja: "ここはみんなすごく優しい", answers: ["Everyone is so nice here."], hint: "here は最後" },
        { ja: "みんな準備できた？", answers: ["Is everyone ready?"], hint: "Is everyone 〜?" },
      ],
    },
    // ---------- Day 7 ----------
    {
      id: "43", day: 7, scene: "場面13：旅行の話",
      en: "Have you been anywhere else?",
      ja: "ほかにどこか行った？",
      chunk: "動詞 ＋ anywhere else?",
      note: "『ほかのどこか』質問の文で使う. else は『ほかの』",
      drills: [
        { ja: "ほかにどこか行きたい？", answers: ["Do you want to go anywhere else?"], hint: "Do you want to go 〜?" },
        { ja: "ほかにおすすめの場所はある？", answers: ["Is there anywhere else you recommend?"], hint: "Is there anywhere else you 〜? ／ おすすめする ＝ recommend" },
      ],
    },
    {
      id: "44", day: 7, scene: "場面13：旅行の話",
      en: "I went to Bali last year.",
      ja: "去年バリに行きました",
      chunk: "動詞（過去形）＋ last ＋ 時",
      note: "last をつけると『この前の〜』という意味になる. 去年は last year、先週は last week. 一緒に使う動詞は過去形. go の過去形は went.",
      drills: [
        { ja: "去年の夏、沖縄に行きました", answers: ["I went to Okinawa last summer."] },
        { ja: "先月ヨガを始めました", answers: ["I started yoga last month."], hint: "始める ＝ start → started" },
      ],
    },
    {
      id: "45", day: 7, scene: "場面13：旅行の話",
      en: "I've heard it's beautiful there.",
      ja: "そこはきれいだって聞いたことがある",
      chunk: "I've heard (that) ＋ 文",
      note: "『〜って聞いたことがある』自分は行ったことがなくても、話を広げられる.",
      drills: [
        { ja: "そこは食べ物が最高だって聞いた", answers: ["I've heard the food is amazing there."], hint: "最高 ＝ amazing" },
        { ja: "すごく物価が高いって聞いた", answers: ["I've heard it's really expensive."], hint: "物価が高い ＝ expensive" },
      ],
    },
    {
      id: "46", day: 7, scene: "場面14：趣味",
      en: "What do you do for fun?",
      ja: "ひまなときは何してるの？",
      chunk: "動詞 ＋ for fun",
      note: "『楽しみで、趣味で』趣味を聞くときは What's your hobby? より What do you do for fun? のほうが自然.",
      drills: [
        { ja: "趣味でテニスをしています", answers: ["I play tennis for fun."] },
        { ja: "お子さんたちは何をして遊ぶの？", answers: ["What do your kids do for fun?"], hint: "What do 〜 do for fun?" },
      ],
    },
    {
      id: "47", day: 7, scene: "場面14：趣味",
      en: "I like cooking and going to cafés.",
      ja: "料理とカフェめぐりが好き",
      chunk: "I like ＋ 動詞ing",
      note: "『〜するのが好き』動詞に ing をつけると「〜すること」になる. and で2つ以上つなげられる.",
      drills: [
        { ja: "読書が好き", answers: ["I like reading."] },
        { ja: "ビーチに行くのが好き", answers: ["I like going to the beach."] },
      ],
    },
    {
      id: "48", day: 7, scene: "場面14：趣味",
      en: "Oh, nice! What do you like to cook?",
      ja: "いいね！何を作るのが好き？",
      chunk: "What do you like to ＋ 動詞?",
      note: "『何を〜するのが好き？』like to ＋ 動詞 も like ＋ 動詞ing と同じ意味. 相手の答えからもう一歩深く聞く質問.",
      drills: [
        { ja: "週末は何をするのが好き？", answers: ["What do you like to do on weekends?"], hint: "週末に ＝ on weekends" },
        { ja: "何を食べるのが好き？", answers: ["What do you like to eat?"] },
      ],
    },
    {
      id: "49", day: 7, scene: "場面14：趣味",
      en: "Mostly Japanese food.",
      ja: "たいてい和食かな",
      chunk: "I mostly ＋ 動詞",
      note: "『ほとんど、主に』全部ではないけれど大部分、という感じ.",
      drills: [
        { ja: "たいてい家で料理します", answers: ["I mostly cook at home."] },
        { ja: "友だちはほとんど職場の人です", answers: ["My friends are mostly from work."], hint: "My friends are mostly from 〜" },
      ],
    },
  ],
};
