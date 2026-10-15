// 単語帳 Week 5, from the teacher's slides「単語帳 week 5」: 100 words, two examples each.
// For the students the teacher gives it to (vocab_books); not everyone's yet (everyone: false).
// Same shape as week1.js. form is null where the word can't be marked in the sentence.

export const WEEK5 = {
  id: "w5",
  week: 5,
  title: "単語帳 Week 5",
  everyone: false,
  groups: [
    {
      title: "日常生活 ①",
      words: [
        { id: "taste", word: "taste", meaning: "味、味がする", examples: [
          { en: "How does it taste?", ja: "味はどう?", note: "", form: "taste" },
          { en: "This tastes amazing!", ja: "これ、すごくおいしい!", note: "This tastes good. = おいしい。", form: "tastes" },
        ] },
        { id: "sweet", word: "sweet", meaning: "甘い", examples: [
          { en: "I love sweet things.", ja: "甘いものが大好きです。", note: "sweet things = 甘いもの。", form: "sweet" },
          { en: "This is too sweet for me.", ja: "これは私には甘すぎるな。", note: "too + 形容詞 = 〜すぎる。", form: "sweet" },
        ] },
        { id: "spicy", word: "spicy", meaning: "辛い", examples: [
          { en: "Do you like spicy food?", ja: "辛い食べ物は好き?", note: "spicy food = 辛い料理。", form: "spicy" },
          { en: "This curry is really spicy!", ja: "このカレー、すごく辛い!", note: "", form: "spicy" },
        ] },
        { id: "salty", word: "salty", meaning: "しょっぱい", examples: [
          { en: "The soup is a bit salty.", ja: "このスープ、ちょっとしょっぱいね。", note: "a bit salty = 少ししょっぱい。", form: "salty" },
          { en: "I prefer salty snacks to sweet ones.", ja: "甘いものよりしょっぱいお菓子のほうが好き。", note: "prefer A to B で『BよりAが好き』。", form: "salty" },
        ] },
        { id: "sour", word: "sour", meaning: "すっぱい", examples: [
          { en: "This lemon is so sour!", ja: "このレモン、すごくすっぱい!", note: "", form: "sour" },
          { en: "I like sour candies.", ja: "すっぱいキャンディーが好きです。", note: "sour candies = すっぱいキャンディー。", form: "sour" },
        ] },
        { id: "bitter", word: "bitter", meaning: "苦い", examples: [
          { en: "Black coffee is too bitter for me.", ja: "ブラックコーヒーは私には苦すぎる。", note: "too bitter = 苦すぎる。", form: "bitter" },
          { en: "This chocolate is a little bitter.", ja: "このチョコは少しビターだね。", note: "a little bitter で『少し苦い・ビター』。", form: "bitter" },
        ] },
      ],
    },
    {
      title: "日常生活 ②",
      words: [
        { id: "fresh", word: "fresh", meaning: "新鮮な", examples: [
          { en: "The fish here is really fresh.", ja: "ここの魚は本当に新鮮です。", note: "", form: "fresh" },
          { en: "I bought fresh vegetables at the market.", ja: "市場で新鮮な野菜を買いました。", note: "fresh vegetables = 新鮮な野菜。", form: "fresh" },
        ] },
        { id: "homemade", word: "homemade", meaning: "手作りの", examples: [
          { en: "This is homemade bread.", ja: "これは手作りのパンです。", note: "homemade bread = 手作りパン。", form: "homemade" },
          { en: "I love homemade cooking.", ja: "手料理が大好きです。", note: "homemade cooking = 手料理。", form: "homemade" },
        ] },
        { id: "grab", word: "grab", meaning: "さっと食べる、つかむ", examples: [
          { en: "Let's grab a coffee.", ja: "コーヒーでもさっと飲もう。", note: "カジュアル。", form: "grab" },
          { en: "I'll grab something on the way.", ja: "途中で何か買って食べるよ。", note: "grab something = 何かさっと食べる/買う。", form: "grab" },
        ] },
        { id: "eat-out", word: "eat out", meaning: "外食する", examples: [
          { en: "We eat out every Friday.", ja: "毎週金曜は外食します。", note: "", form: "eat out" },
          { en: "Do you often eat out?", ja: "よく外食するの?", note: "Do you often eat out? で頻度を聞ける。", form: "eat out" },
        ] },
        { id: "cook-at-home", word: "cook at home", meaning: "自炊する", examples: [
          { en: "I usually cook at home.", ja: "たいてい自炊しています。", note: "eat out の反対。", form: "cook at home" },
          { en: "Cooking at home saves money.", ja: "自炊するとお金の節約になるね。", note: "動名詞 Cooking at home で主語にできる。", form: "Cooking at home" },
        ] },
        { id: "ingredient", word: "ingredient", meaning: "材料", examples: [
          { en: "What ingredients do we need?", ja: "どんな材料が必要?", note: "What ingredients 〜? で聞ける。", form: "ingredients" },
          { en: "This dish uses simple ingredients.", ja: "この料理はシンプルな材料で作れます。", note: "simple ingredients = シンプルな材料。", form: "ingredients" },
        ] },
      ],
    },
    {
      title: "日常生活 ③",
      words: [
        { id: "dish", word: "dish", meaning: "料理、皿", examples: [
          { en: "What's your favorite dish?", ja: "一番好きな料理は何?", note: "dish は『料理・一品』。favorite dish = 一番好きな料理。", form: "dish" },
          { en: "This is a popular local dish.", ja: "これは人気のご当地料理です。", note: "local dish = ご当地料理。", form: "dish" },
        ] },
        { id: "wake-up", word: "wake up", meaning: "目が覚める\n起きる", examples: [
          { en: "What time do you wake up?", ja: "何時に起きるの?", note: "", form: "wake up" },
          { en: "I woke up late this morning.", ja: "今朝は寝坊しちゃった。", note: "woke up late = 寝坊した。過去形 woke。", form: "woke up" },
        ] },
        { id: "go-to-bed", word: "go to bed", meaning: "寝る", examples: [
          { en: "I usually go to bed around midnight.", ja: "たいてい夜中の12時ごろ寝ます。", note: "go to bed で『寝る(布団に入る)』。", form: "go to bed" },
          { en: "You should go to bed early tonight.", ja: "今夜は早く寝たほうがいいよ。", note: "go to bed early = 早く寝る。", form: "go to bed" },
        ] },
        { id: "sleep", word: "sleep", meaning: "眠る", examples: [
          { en: "Did you sleep well?", ja: "よく眠れた?", note: "Did you sleep well? = よく眠れた？", form: "sleep" },
          { en: "I only slept four hours last night.", ja: "昨夜は4時間しか寝てないんだ。", note: "slept は過去形。only slept 〜 = 〜しか寝てない。", form: "slept" },
        ] },
        { id: "take-a-shower", word: "take a shower", meaning: "シャワーを浴びる", examples: [
          { en: "I take a shower every morning.", ja: "毎朝シャワーを浴びます。", note: "", form: "take a shower" },
          { en: "Can I take a shower first?", ja: "先にシャワーを浴びてもいい?", note: "Can I take a shower first? = 先に浴びていい？", form: "take a shower" },
        ] },
        { id: "brush-my-teeth", word: "brush my teeth", meaning: "歯を磨く", examples: [
          { en: "I brush my teeth after every meal.", ja: "毎食後に歯を磨きます。", note: "", form: "brush my teeth" },
          { en: "Don't forget to brush your teeth!", ja: "歯磨きを忘れないでね!", note: "Don't forget to 〜 = 〜を忘れないで。", form: "brush your teeth" },
        ] },
      ],
    },
    {
      title: "日常生活 ④",
      words: [
        { id: "get-dressed", word: "get dressed", meaning: "着替える", examples: [
          { en: "Give me ten minutes to get dressed.", ja: "着替えるから10分ちょうだい。", note: "get dressed で『着替える・服を着る』。", form: "get dressed" },
          { en: "I got dressed quickly and left.", ja: "急いで着替えて出かけました。", note: "got dressed quickly = 急いで着替えた。", form: "got dressed" },
        ] },
        { id: "on-weekdays", word: "on weekdays", meaning: "平日は", examples: [
          { en: "I'm busy on weekdays.", ja: "平日は忙しいんです。", note: "", form: "on weekdays" },
          { en: "On weekdays, I get up at six.", ja: "平日は6時に起きます。", note: "on weekends の反対。", form: "On weekdays" },
        ] },
        { id: "on-weekends", word: "on weekends", meaning: "週末は", examples: [
          { en: "What do you do on weekends?", ja: "週末は何してるの?", note: "", form: "on weekends" },
          { en: "On weekends, I like to relax at home.", ja: "週末は家でのんびりするのが好きです。", note: "What do you do on weekends? = 週末は何してる？", form: "On weekends" },
        ] },
        { id: "full", word: "full", meaning: "お腹いっぱいの", examples: [
          { en: "I'm so full! That was delicious.", ja: "お腹いっぱい!おいしかった。", note: "", form: "full" },
          { en: "Are you full already?", ja: "もうお腹いっぱいなの?", note: "Are you full already? = もう満腹？", form: "full" },
        ] },
        { id: "try-new-things", word: "try new things", meaning: "新しいことに挑戦する", examples: [
          { en: "I love trying new things.", ja: "新しいことに挑戦するのが大好きです。", note: "", form: "trying new things" },
          { en: "Traveling is a chance to try new things.", ja: "旅行は新しいことに挑戦するチャンスだね。", note: "a chance to try new things = 挑戦するチャンス。", form: "try new things" },
        ] },
        { id: "smell", word: "smell", meaning: "においがする", examples: [
          { en: "Something smells good!", ja: "何かいいにおいがする!", note: "smells good = いいにおい。", form: "smells" },
          { en: "This flower smells sweet.", ja: "この花は甘い香りがするね。", note: "smell sweet = 甘い香りがする。", form: "smells" },
        ] },
      ],
    },
    {
      title: "日常生活 ⑤",
      words: [
        { id: "bite", word: "bite", meaning: "かじる、一口", examples: [
          { en: "Can I have a bite?", ja: "一口もらっていい?", note: "Can I have a bite? で『一口ちょうだい』。", form: "bite" },
          { en: "I bit my tongue!", ja: "舌を噛んじゃった!", note: "bit は過去形。bit my tongue = 舌を噛んだ。", form: "bit" },
        ] },
        { id: "fry", word: "fry", meaning: "炒める、揚げる", examples: [
          { en: "Fry the vegetables first.", ja: "まず野菜を炒めてね。", note: "", form: "Fry" },
          { en: "I fried some chicken for dinner.", ja: "夕食にチキンを揚げたよ。", note: "fried は過去形。fried chicken = 揚げたチキン。", form: "fried" },
        ] },
        { id: "boil", word: "boil", meaning: "ゆでる、沸かす", examples: [
          { en: "Boil the water first.", ja: "まずお湯を沸かしてね。", note: "boil water = お湯を沸かす。", form: "Boil" },
          { en: "I boiled some eggs this morning.", ja: "今朝、卵をゆでました。", note: "boiled eggs = ゆで卵。", form: "boiled" },
        ] },
        { id: "grill", word: "grill", meaning: "(網)焼きにする", examples: [
          { en: "Let's grill some fish tonight.", ja: "今夜は魚を焼こう。", note: "", form: "grill" },
          { en: "Grilled vegetables taste amazing.", ja: "焼き野菜って最高においしいよね。", note: "grilled vegetables = 焼き野菜。", form: "Grilled" },
        ] },
        { id: "chop", word: "chop", meaning: "刻む", examples: [
          { en: "Chop the onions, please.", ja: "玉ねぎを刻んでくれる?", note: "chop は『(包丁で)刻む』。chop onions = 玉ねぎを刻む。", form: "Chop" },
          { en: "I chopped everything before cooking.", ja: "料理の前に全部刻んでおいたよ。", note: "chopped は過去形。", form: "chopped" },
        ] },
        { id: "add", word: "add", meaning: "加える", examples: [
          { en: "Add a little salt.", ja: "塩を少し加えてね。", note: "add salt = 塩を加える。", form: "Add" },
          { en: "Don't add too much sugar.", ja: "砂糖を入れすぎないでね。", note: "Don't add too much 〜 = 〜を入れすぎないで。", form: "add" },
        ] },
      ],
    },
    {
      title: "日常生活 ⑥",
      words: [
        { id: "heat", word: "heat", meaning: "温める", examples: [
          { en: "Can you heat this up for me?", ja: "これを温めてもらえますか?", note: "heat は『温める・熱する』。heat up = 温める。", form: "heat" },
          { en: "Heat the pan first.", ja: "まずフライパンを熱してね。", note: "Heat the pan. = フライパンを熱して。", form: "Heat" },
        ] },
        { id: "serve", word: "serve", meaning: "出す、提供する", examples: [
          { en: "They serve breakfast until ten.", ja: "ここは10時まで朝食を提供しています。", note: "", form: "serve" },
          { en: "This dish is served cold.", ja: "この料理は冷たいまま出されるんです。", note: "be served cold = 冷たいまま出される。", form: "served" },
        ] },
        { id: "skip-breakfast", word: "skip breakfast", meaning: "朝食を抜く", examples: [
          { en: "I skipped breakfast this morning.", ja: "今朝は朝食を抜いちゃった。", note: "", form: "skipped breakfast" },
          { en: "You shouldn't skip breakfast.", ja: "朝食を抜かないほうがいいよ。", note: "You shouldn't skip 〜 = 〜を抜かないほうがいい。", form: "skip breakfast" },
        ] },
        { id: "stay-up-late", word: "stay up late", meaning: "夜更かしする", examples: [
          { en: "I stayed up late watching videos.", ja: "動画を見て夜更かししちゃった。", note: "", form: "stayed up late" },
          { en: "Don't stay up too late tonight.", ja: "今夜はあまり夜更かししないでね。", note: "Don't stay up too late. = あまり夜更かししないで。", form: "stay up too late" },
        ] },
        { id: "sleep-in", word: "sleep in", meaning: "朝ゆっくり寝る", examples: [
          { en: "I sleep in on Sundays.", ja: "日曜は朝ゆっくり寝るんです。", note: "", form: "sleep in" },
          { en: "Let's sleep in tomorrow!", ja: "明日は朝ゆっくりしようよ!", note: "oversleep(寝坊)と違い意図的にゆっくり寝る。", form: "sleep in" },
        ] },
        { id: "oversleep", word: "oversleep", meaning: "寝坊する", examples: [
          { en: "I overslept and missed the bus!", ja: "寝坊してバスを逃しちゃった!", note: "oversleep で『寝坊する』(うっかり)。", form: "overslept" },
          { en: "I never oversleep on weekdays.", ja: "平日は絶対に寝坊しません。", note: "overslept は過去形。sleep in との違いに注意。", form: "oversleep" },
        ] },
      ],
    },
    {
      title: "日常生活 ⑦",
      words: [
        { id: "take-a-nap", word: "take a nap", meaning: "昼寝する", examples: [
          { en: "I took a nap after lunch.", ja: "昼食後に昼寝したよ。", note: "", form: "took a nap" },
          { en: "A short nap helps a lot.", ja: "短い昼寝ってすごく効くよね。", note: "a short nap = 短い昼寝。", form: "nap" },
        ] },
        { id: "get-ready", word: "get ready", meaning: "準備する", examples: [
          { en: "Give me ten minutes to get ready.", ja: "準備するから10分ちょうだい。", note: "get ready で『準備する・支度する』。", form: "get ready" },
          { en: "I get ready quickly in the morning.", ja: "朝の準備は早いんです。", note: "get ready for 〜 = 〜の準備をする。", form: "get ready" },
        ] },
        { id: "go-grocery-shopping", word: "go grocery shopping", meaning: "食料品の買い出しに行く", examples: [
          { en: "I go grocery shopping on Saturdays.", ja: "土曜に食料品の買い出しに行きます。", note: "", form: "go grocery shopping" },
          { en: "We need to go grocery shopping today.", ja: "今日、買い出しに行かなきゃ。", note: "grocery = 食料品。", form: "go grocery shopping" },
        ] },
        { id: "do-the-dishes", word: "do the dishes", meaning: "皿洗いをする", examples: [
          { en: "I'll do the dishes tonight.", ja: "今夜は私が皿洗いするね。", note: "", form: "do the dishes" },
          { en: "He always does the dishes after dinner.", ja: "彼は夕食後いつも皿洗いをしてくれるんだ。", note: "after dinner = 夕食後。", form: "does the dishes" },
        ] },
        { id: "do-the-laundry", word: "do the laundry", meaning: "洗濯する", examples: [
          { en: "I do the laundry twice a week.", ja: "週2回洗濯します。", note: "", form: "do the laundry" },
          { en: "It's a nice day to do the laundry.", ja: "洗濯日和だね。", note: "twice a week = 週2回。", form: "do the laundry" },
        ] },
        { id: "put-away", word: "put away", meaning: "しまう、片付ける", examples: [
          { en: "Put away your clothes, please.", ja: "服を片付けてね。", note: "", form: "Put away" },
          { en: "I put away the winter clothes.", ja: "冬服をしまったよ。", note: "put away 〜 の形で使う。", form: "put away" },
        ] },
      ],
    },
    {
      title: "日常生活 ⑧",
      words: [
        { id: "take-out-the-trash", word: "take out the trash", meaning: "ゴミを出す", examples: [
          { en: "Don't forget to take out the trash!", ja: "ゴミ出しを忘れないでね!", note: "", form: "take out the trash" },
          { en: "I take out the trash every morning.", ja: "毎朝ゴミを出しています。", note: "Don't forget to take out the trash! = ゴミ出し忘れずに！", form: "take out the trash" },
        ] },
        { id: "tasty", word: "tasty", meaning: "おいしい", examples: [
          { en: "This soup is really tasty!", ja: "このスープ、本当においしい!", note: "delicious よりカジュアル。", form: "tasty" },
          { en: "Everything looks so tasty here.", ja: "ここのは全部おいしそうだね。", note: "looks tasty = おいしそう。", form: "tasty" },
        ] },
        { id: "healthy", word: "healthy", meaning: "健康的な", examples: [
          { en: "I try to eat healthy.", ja: "健康的な食事を心がけています。", note: "healthy food = 健康的な食事。", form: "healthy" },
          { en: "Walking every day is healthy.", ja: "毎日歩くのは健康にいいね。", note: "〜 is healthy = 〜は健康にいい。", form: "healthy" },
        ] },
        { id: "unhealthy", word: "unhealthy", meaning: "不健康な", examples: [
          { en: "I know it's unhealthy, but I love it.", ja: "体に悪いのはわかってるけど、大好きなんだ。", note: "healthy の反対。", form: "unhealthy" },
          { en: "Skipping meals is unhealthy.", ja: "食事を抜くのは不健康だよ。", note: "Skipping meals is unhealthy. = 食事を抜くのは体に悪い。", form: "unhealthy" },
        ] },
        { id: "light", word: "light", meaning: "軽い(食事)", examples: [
          { en: "I'll have something light for lunch.", ja: "昼は軽いものにするよ。", note: "light は『(食事が)軽い・あっさりした』。", form: "light" },
          { en: "Let's have a light dinner tonight.", ja: "今夜は軽めの夕食にしよう。", note: "something light = 軽いもの。", form: "light" },
        ] },
        { id: "heavy", word: "heavy", meaning: "重い(食事)、ボリュームのある", examples: [
          { en: "That meal was too heavy for me.", ja: "あの食事は私には重すぎたな。", note: "heavy は『(食事が)重い・こってりした』。light の反対。", form: "heavy" },
          { en: "I avoid heavy food at night.", ja: "夜はこってりしたものは避けています。", note: "heavy food = こってりした料理。", form: "heavy" },
        ] },
      ],
    },
    {
      title: "日常生活 ⑨",
      words: [
        { id: "raw", word: "raw", meaning: "生の", examples: [
          { en: "Have you ever eaten raw fish?", ja: "生魚を食べたことある?", note: "raw fish = 生魚。", form: "raw" },
          { en: "This can be eaten raw.", ja: "これは生で食べられますよ。", note: "eaten raw = 生で食べられる。", form: "raw" },
        ] },
        { id: "daily", word: "daily", meaning: "毎日の", examples: [
          { en: "Walking is part of my daily life.", ja: "散歩は毎日の生活の一部です。", note: "daily life = 日常生活。", form: "daily" },
          { en: "What's your daily schedule like?", ja: "毎日のスケジュールはどんな感じ?", note: "daily schedule = 毎日の予定。", form: "daily" },
        ] },
      ],
    },
    {
      title: "再会のあいさつ ①",
      words: [
        { id: "how-have-you-been", word: "How have you been?", meaning: "最近どうしてた", examples: [
          { en: "Hi! How have you been?", ja: "やあ！最近どうしてた？", note: "How have you been? で久しぶりの相手に『元気にしてた？』。", form: "How have you been" },
          { en: "How have you been these days?", ja: "このごろどう過ごしてた？", note: "現在完了で『ずっとどうしてた』のニュアンス。", form: "How have you been" },
        ] },
        { id: "what-have-you-been-up-to", word: "What have you been up to?", meaning: "最近何してたの", examples: [
          { en: "What have you been up to lately?", ja: "最近何してたの？", note: "be up to 〜 で『〜をして過ごす』。近況を尋ねる定番。", form: "What have you been up to" },
          { en: "Long time no see! What have you been up to?", ja: "久しぶり！何してたの？", note: "友だち同士のカジュアルな再会に。", form: "What have you been up to" },
        ] },
        { id: "catch-up", word: "catch up", meaning: "近況を話す", examples: [
          { en: "Let's catch up over coffee sometime.", ja: "そのうちお茶でもしながら話そう。", note: "catch up (with 〜) で『(〜と)近況を話す』。", form: "catch up" },
          { en: "It was great catching up with you!", ja: "久しぶりに話せてよかった！", note: "catch up on 〜 なら『〜の遅れを取り戻す』。", form: "catching up" },
        ] },
        { id: "long-time-no-see", word: "Long time no see.", meaning: "久しぶり", examples: [
          { en: "Long time no see! You look great.", ja: "久しぶり！元気そうだね。", note: "決まり文句。", form: "Long time no see" },
          { en: "Wow, long time no see!", ja: "わあ、久しぶり！", note: "ややカジュアル。目上には It's been a while. が無難。", form: "long time no see" },
        ] },
        { id: "its-been-a-while", word: "It's been a while.", meaning: "しばらくぶりだね", examples: [
          { en: "It's been a while. How are things?", ja: "しばらくぶりだね。調子はどう？", note: "ていねいめ。", form: "It's been a while" },
          { en: "It's been a while since we last met.", ja: "最後に会ってからずいぶん経つね。", note: "since 〜 を続けて期間を言える。", form: "It's been a while" },
        ] },
        { id: "its-good-to-see-you", word: "It's good to see you.", meaning: "会えてうれしい", examples: [
          { en: "It's so good to see you again!", ja: "また会えて本当にうれしい！", note: "It's good to see you. で再会の喜びを伝える。", form: "It's so good to see you" },
          { en: "Good to see you! It's been too long.", ja: "会えてうれしいよ！ほんと久しぶり。", note: "初対面は nice to meet you、再会は good to see you。", form: "Good to see you" },
        ] },
      ],
    },
    {
      title: "一日のこと ①",
      words: [
        { id: "running-late", word: "running late", meaning: "遅れそう、遅刻している", examples: [
          { en: "Sorry, I'm running late.", ja: "ごめん、遅れそう。", note: "", form: "running late" },
          { en: "She is running 10 minutes late.", ja: "彼女は10分ほど遅れている", note: "", form: "running 10 minutes late" },
        ] },
        { id: "get-off-work", word: "get off work", meaning: "仕事が終わる、退社する", examples: [
          { en: "What time do you get off work?", ja: "何時に仕事終わる？", note: "", form: "get off work" },
          { en: "I got off work early today.", ja: "今日は早く仕事が終わったよ。", note: "finish work とほぼ同じで、より口語的。", form: "got off work" },
        ] },
        { id: "run-errands", word: "run errands", meaning: "用事、買い物を済ませる", examples: [
          { en: "I ran a few errands after work.", ja: "仕事の後、用事を済ませたよ。", note: "", form: "ran a few errands" },
          { en: "I need to run some errands today.", ja: "今日は用事を済ませないと。", note: "run some / a few errands の形でよく使う。", form: "run some errands" },
        ] },
        { id: "get-things-done", word: "get things done", meaning: "用事を片付ける、はかどる", examples: [
          { en: "I got a lot done today.", ja: "今日はいろいろ片付いたよ。", note: "get things done で『やるべきことを片付ける』。", form: "got a lot done" },
          { en: "I get more done in the morning.", ja: "朝のほうがはかどるんだ。", note: "get a lot done = たくさんはかどる。", form: "get more done" },
        ] },
        { id: "end-up-ing", word: "end up ~ing", meaning: "結局〜することになる", examples: [
          { en: "I ended up staying home all day.", ja: "結局一日中家にいた。", note: "end up + 動詞ing で『結局〜することになる』。", form: "ended up" },
          { en: "We ended up talking for hours.", ja: "結局何時間も話し込んじゃった。", note: "予定と違う結果を語るときに便利。", form: "ended up" },
        ] },
        { id: "take-it-easy", word: "take it easy", meaning: "のんびりする、無理しない", examples: [
          { en: "I just took it easy at home today.", ja: "今日は家でのんびりしてた。", note: "", form: "took it easy" },
          { en: "Take it easy this weekend!", ja: "今週末はゆっくりしてね！", note: "別れ際の『じゃあね』にも使う。", form: "Take it easy" },
        ] },
      ],
    },
    {
      title: "一日のこと ②",
      words: [
        { id: "typical", word: "typical", meaning: "典型的な\nよくある、いつもの", examples: [
          { en: "It was a pretty typical day.", ja: "わりといつも通りの一日だったよ。", note: "a typical day = いつも通りの一日。", form: "typical" },
          { en: "That's so typical of him.", ja: "いかにも彼らしいなあ。", note: "That's typical of 〜. で『〜らしい・いかにも〜だ』。", form: "typical" },
        ] },
        { id: "a-long-day", word: "a long day", meaning: "大変な一日", examples: [
          { en: "It's been a long day.", ja: "今日は長い一日だったよ。", note: "a long day で『(疲れる)長い一日』。", form: "a long day" },
          { en: "You look tired. Long day?", ja: "疲れてるね、大変な一日だった？", note: "It's been a long day. で疲れを伝えられる。", form: "Long day" },
        ] },
        { id: "stay-in", word: "stay in", meaning: "家で過ごす\n出かけない", examples: [
          { en: "Let's just stay in tonight.", ja: "今夜は家でゆっくりしようよ。", note: "stay in で『家にいる・出かけない』。go out の反対。", form: "stay in" },
          { en: "I stayed in and watched movies.", ja: "家で映画を観て過ごした。", note: "stay home とほぼ同じで、より口語的。", form: "stayed in" },
        ] },
        { id: "wind-down", word: "wind down", meaning: "くつろぐ、リラックスする", examples: [
          { en: "I read a bit to wind down before bed.", ja: "寝る前に本を読んでリラックスするんだ。", note: "wind down で『(緊張を解いて)くつろぐ』。", form: "wind down" },
          { en: "How do you wind down after work?", ja: "仕事の後どうやってくつろぐ？", note: "一日の終わりのリラックスに使う。", form: "wind down" },
        ] },
        { id: "on-my-way-home", word: "on my way home", meaning: "帰り道に", examples: [
          { en: "I'll grab something on my way home.", ja: "帰りに何か買っていくよ。", note: "on my way home で『家に帰る途中で』。", form: "on my way home" },
          { en: "I called her on my way home.", ja: "帰り道に彼女に電話した。", note: "on my way to 〜 なら『〜へ向かう途中』。", form: "on my way home" },
        ] },
        { id: "get-some-rest", word: "get some rest", meaning: "休む、体を休める", examples: [
          { en: "You should get some rest.", ja: "少し休んだほうがいいよ。", note: "", form: "get some rest" },
          { en: "I just want to get some rest this weekend.", ja: "今週末はただ休みたいな。", note: "疲れた相手への Get some rest. は思いやりの一言。", form: "get some rest" },
        ] },
      ],
    },
    {
      title: "自分のこと ①",
      words: [
        { id: "im-a-morning-person", word: "I'm a morning person", meaning: "朝型の人間だ", examples: [
          { en: "I'm a morning person, so I get up early.", ja: "朝型だから早起きなんだ。", note: "", form: "I'm a morning person" },
          { en: "Are you a morning person?", ja: "朝型？", note: "反対は a night owl(夜型)。", form: "a morning person" },
        ] },
        { id: "a-night-owl", word: "a night owl", meaning: "夜型の人", examples: [
          { en: "I'm a night owl. I work best at night.", ja: "夜型で、夜のほうがはかどるんだ。", note: "owl = フクロウ。", form: "a night owl" },
          { en: "My sister is a total night owl.", ja: "姉は完全に夜型なんだ。", note: "a morning person とセットで覚えると便利。", form: "night owl" },
        ] },
        { id: "tend-to", word: "tend to ~", meaning: "〜しがちだ", examples: [
          { en: "I tend to overthink things.", ja: "私は考えすぎる傾向があるんだ。", note: "tend to + 動詞 で『〜しがち・〜する傾向』。", form: "tend to" },
          { en: "I tend to stay up late on weekends.", ja: "週末はつい夜更かししがち。", note: "自分の性格・習慣の説明に便利。", form: "tend to" },
        ] },
        { id: "be-up-for", word: "be up for ~", meaning: "〜する気分だ、乗り気だ", examples: [
          { en: "Are you up for dinner tonight?", ja: "今夜ごはんどう？", note: "be up for 〜 で『〜する気がある・乗り気』。", form: "up for" },
          { en: "I'm not really up for going out today.", ja: "今日はあまり出かける気分じゃないな。", note: "誘いにも、断り(not up for)にも使える。", form: "up for" },
        ] },
        { id: "on-my-days-off", word: "on my days off", meaning: "休みの日には", examples: [
          { en: "On my days off, I like to sleep in.", ja: "休みの日は朝ゆっくり寝るのが好き。", note: "", form: "On my days off" },
          { en: "What do you do on your days off?", ja: "休みの日は何してるの？", note: "day off = 休みの日。複数形に注意。", form: "on your days off" },
        ] },
        { id: "most-days", word: "most days", meaning: "たいていの日は", examples: [
          { en: "I cook at home most days.", ja: "たいていの日は自炊してるよ。", note: "most days で『ほとんどの日・たいてい』。", form: "most days" },
          { en: "Most days, I'm home by seven.", ja: "たいてい7時には家にいるよ。", note: "習慣を語るとき usually の代わりにも。", form: "Most days" },
        ] },
      ],
    },
    {
      title: "自分のこと ②",
      words: [
        { id: "not-really-into", word: "not really into ~", meaning: "〜はあまり好きじゃない", examples: [
          { en: "I'm not really into sports.", ja: "スポーツはあまり得意じゃないんだ。", note: "not really into 〜 で『そこまで好きじゃない』とやんわり。", form: "not really into" },
          { en: "I'm not really into horror movies.", ja: "ホラー映画はあまり好きじゃなくて。", note: "be into 〜(ハマっている)の否定形。", form: "not really into" },
        ] },
        { id: "im-the-type-who", word: "I'm the type who ~", meaning: "〜するタイプだ", examples: [
          { en: "I'm the type who plans everything.", ja: "私は何でも計画するタイプなんだ。", note: "", form: "I'm the type who" },
          { en: "I'm the type who needs coffee first.", ja: "まずコーヒーがないとダメなタイプで。", note: "自分の性格を紹介するのに便利。", form: "I'm the type who" },
        ] },
      ],
    },
    {
      title: "家族・身近な人 ①",
      words: [
        { id: "run-in-the-family", word: "run in the family", meaning: "〜は家系だ\n遺伝する", examples: [
          { en: "Being tall runs in the family.", ja: "背が高いのは家系なんだ。", note: "", form: "runs in the family" },
          { en: "Does it run in the family?", ja: "それって遺伝なの？", note: "性格・体質・才能などに使う。", form: "run in the family" },
        ] },
        { id: "be-close-to", word: "be close to ~", meaning: "〜と仲がいい、親しい", examples: [
          { en: "I'm really close to my sister.", ja: "姉とはすごく仲がいいんだ。", note: "be close to + 人 で『〜と親しい・仲がいい』。", form: "close to" },
          { en: "Are you close to your parents?", ja: "ご両親とは仲がいい？", note: "get along より心の距離の近さを表す。", form: "close to" },
        ] },
        { id: "get-together", word: "get together", meaning: "集まる", examples: [
          { en: "My family gets together every New Year.", ja: "うちは毎年お正月に集まるんだ。", note: "", form: "gets together" },
          { en: "Let's get together soon!", ja: "近いうちに集まろうよ！", note: "a get-together なら名詞で『集まり』。", form: "get together" },
        ] },
        { id: "the-eldest", word: "the eldest", meaning: "一番上の(子)", examples: [
          { en: "I'm the eldest of three.", ja: "3人きょうだいの一番上なんだ。", note: "", form: "the eldest" },
          { en: "My eldest brother lives abroad.", ja: "一番上の兄は海外に住んでるよ。", note: "the youngest(末っ子)とセットで。", form: "eldest" },
        ] },
        { id: "the-youngest", word: "the youngest", meaning: "末っ子、一番下", examples: [
          { en: "She's the youngest in the family.", ja: "彼女は家族で一番下なんだ。", note: "the youngest で『一番年下・末っ子』。", form: "the youngest" },
          { en: "As the youngest, I was a bit spoiled.", ja: "末っ子だから少し甘やかされたな。", note: "Spoiled 甘やかされた", form: "the youngest" },
        ] },
        { id: "the-middle-child", word: "the middle child", meaning: "真ん中の子、中間子", examples: [
          { en: "I'm the middle child.", ja: "私は真ん中の子なんだ。", note: "", form: "the middle child" },
          { en: "Being a middle child can be tough sometimes.", ja: "真ん中の子は、ときどき大変なことがあります。", note: "Tough - 大変、しんどい sometimes - 時々", form: "middle child" },
        ] },
      ],
    },
    {
      title: "家族・身近な人 ②",
      words: [
        { id: "were-a-family-of", word: "We're a family of ~", meaning: "〜人家族です", examples: [
          { en: "We're a family of five.", ja: "うちは5人家族です。", note: "We're a family of + 数 で『〜人家族』。", form: "We're a family of" },
          { en: "We're a family of four, plus a dog.", ja: "4人家族と、あと犬が1匹。", note: "人数を紹介する定番表現。", form: "We're a family of" },
        ] },
        { id: "spend-time-with", word: "spend time with ~", meaning: "〜と過ごす", examples: [
          { en: "I love spending time with my family.", ja: "家族と過ごす時間が大好きなんだ。", note: "", form: "spending time with" },
          { en: "I want to spend more time with my kids.", ja: "子どもともっと一緒に過ごしたいな。", note: "spend time + 動詞ing なら『〜して過ごす』。", form: "spend more time with" },
        ] },
      ],
    },
    {
      title: "天気の雑談 ①",
      words: [
        { id: "weather", word: "weather", meaning: "天気", examples: [
          { en: "The weather is perfect today!", ja: "今日の天気は最高だね！", note: "The weather is 〜。", form: "weather" },
          { en: "How's the weather over there?", ja: "そっちの天気はどう？", note: "How's the weather? = 天気はどう？", form: "weather" },
        ] },
        { id: "sunny", word: "sunny", meaning: "晴れの", examples: [
          { en: "It's sunny today!", ja: "今日は晴れだね！", note: "It's sunny. = 晴れてる。", form: "sunny" },
          { en: "Let's go out while it's sunny.", ja: "晴れてるうちに出かけよう。", note: "天気は It's + 形容詞 で表す。", form: "sunny" },
        ] },
        { id: "rainy", word: "rainy", meaning: "雨の", examples: [
          { en: "It's been rainy all week.", ja: "今週はずっと雨だね。", note: "rainy days = 雨の日。", form: "rainy" },
          { en: "I don't like rainy days.", ja: "雨の日は好きじゃないな。", note: "It's been rainy = ずっと雨が続いている。", form: "rainy" },
        ] },
        { id: "humid", word: "humid", meaning: "蒸し暑い", examples: [
          { en: "It's so humid today.", ja: "今日は本当に蒸し暑いね。", note: "humid は『湿気が多い・蒸し暑い』。", form: "humid" },
          { en: "Japanese summers are really humid.", ja: "日本の夏は蒸し暑いんだ。", note: "hot and humid = 蒸し暑い。", form: "humid" },
        ] },
        { id: "forecast", word: "forecast", meaning: "天気予報", examples: [
          { en: "The forecast says it'll rain tomorrow.", ja: "予報だと明日は雨だって。", note: "The forecast says 〜。", form: "forecast" },
          { en: "Did you check the forecast?", ja: "予報チェックした？", note: "weather forecast とも言う。", form: "forecast" },
        ] },
        { id: "freezing", word: "freezing", meaning: "凍えるほど寒い", examples: [
          { en: "It's freezing outside!", ja: "外めちゃくちゃ寒い！", note: "cold の強調。", form: "freezing" },
          { en: "I'm freezing, Let's go inside.", ja: "凍えそう、中に入ろう。", note: "I'm freezing. = 凍えそう。", form: "freezing" },
        ] },
      ],
    },
    {
      title: "天気の雑談 ②",
      words: [
        { id: "chilly", word: "chilly", meaning: "肌寒い", examples: [
          { en: "It's a little chilly this morning.", ja: "今朝はちょっと肌寒いね。", note: "cold ほどではない寒さ。", form: "chilly" },
          { en: "Take a jacket, it's chilly out.", ja: "上着を持って、外は肌寒いよ。", note: "freezing > cold > chilly の順にやわらぐ。", form: "chilly" },
        ] },
        { id: "beautiful-day", word: "beautiful day", meaning: "いい天気の日", examples: [
          { en: "What a beautiful day!", ja: "なんていい天気！", note: "", form: "beautiful day" },
          { en: "It's a beautiful day for a walk.", ja: "散歩にぴったりのいい天気だね。", note: "What a 〜! で『なんて〜！』と感嘆。", form: "beautiful day" },
        ] },
        { id: "warm-up", word: "warm up", meaning: "暖かくなる", examples: [
          { en: "It's warming up these days.", ja: "最近暖かくなってきたね。", note: "", form: "warming up" },
          { en: "It should warm up by the weekend.", ja: "週末までには暖かくなるはず。", note: "It's warming up. = 暖かくなってきた。", form: "warm up" },
        ] },
        { id: "cool-down", word: "cool down", meaning: "涼しくなる", examples: [
          { en: "It cools down at night here.", ja: "ここは夜になると涼しくなる。", note: "warm up の反対。", form: "cools down" },
          { en: "I hope it cools down soon.", ja: "早く涼しくなってほしいな。", note: "It cools down at night. = 夜は涼しくなる。", form: "cools down" },
        ] },
      ],
    },
    {
      title: "ひとこと・社交 ①",
      words: [
        { id: "do-you-have-a-minute", word: "Do you have a minute?", meaning: "ちょっと時間ある？", examples: [
          { en: "Do you have a minute? I want to ask you something.", ja: "ちょっといい？聞きたいことがあって。", note: "Do you have a minute? で『少し時間ある？』。", form: "Do you have a minute" },
          { en: "Sure, I have a minute. What's up?", ja: "うん、大丈夫。どうしたの？", note: "Excuse me より用件がある感じ。", form: "have a minute" },
        ] },
        { id: "reach-out", word: "reach out", meaning: "連絡する、声をかける", examples: [
          { en: "Feel free to reach out anytime.", ja: "いつでも気軽に連絡してね。", note: "reach out (to 〜) で『(〜に)連絡する』。", form: "reach out" },
          { en: "I'll reach out when I'm in town.", ja: "こっちに来たら連絡するね。", note: "contact よりやわらかい言い方。", form: "reach out" },
        ] },
        { id: "make-plans", word: "make plans", meaning: "予定を立てる、約束する", examples: [
          { en: "Let's make plans to meet up soon.", ja: "近いうちに会う約束をしようよ。", note: "make plans (with 〜) で『(〜と)予定・約束を立てる』。", form: "make plans" },
          { en: "We made plans to have dinner together.", ja: "一緒に夕食に行く約束をしたんだ。", note: "make plans to + 動詞 で『〜する約束をする』。", form: "made plans" },
        ] },
        { id: "take-care", word: "Take care!", meaning: "じゃあね\n元気でね\n（別れる時の挨拶）", examples: [
          { en: "See you next week. Take care!", ja: "また来週。元気でね！", note: "", form: "Take care" },
          { en: "Take care, and text me when you get home.", ja: "気をつけてね、着いたら連絡して。", note: "Take care of yourself. の短縮。体調を気づかう場面にも。", form: "Take care" },
        ] },
        { id: "how-about-you", word: "How about you?", meaning: "あなたは？", examples: [
          { en: "I'm doing great. How about you?", ja: "元気だよ。あなたは？", note: "", form: "How about you" },
          { en: "I'm from Japan! How about you?", ja: "日本から来ました！あなたは？", note: "", form: "How about you" },
        ] },
        { id: "what-do-you-do", word: "What do you do?", meaning: "お仕事は何を？", examples: [
          { en: "So, what do you do?", ja: "ところで、お仕事は何を？", note: "What do you do? で職業を尋ねる。", form: "what do you do" },
          { en: "What do you do for a living?", ja: "お仕事は何をされているんですか？", note: "", form: "What do you do" },
        ] },
      ],
    },
  ],
};
