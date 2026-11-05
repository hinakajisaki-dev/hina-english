// 単語帳 LinkUp 英単語 Week 3, from the teacher's PDF「LinkUp英単語」(pages 21–30,
// 100 words: 動詞 30・名詞 20・形容詞 20・副詞 10・イディオム 20), one example each.
// Only for the students the teacher gives it to (vocab_books, see words.js); it
// takes the place of the shared Week 3 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, form).

export const LINKUP3 = {
  id: "linkup3",
  week: 3,
  title: "LinkUp 英単語 Week 3",
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "earn", word: "earn", meaning: "稼ぐ", examples: [
          { en: "He earns a good salary at his job.", ja: "彼は良い給料を稼いでいます。", form: "earns" },
        ] },
        { id: "guess", word: "guess", meaning: "推測する", examples: [
          { en: "I guess we'll have to wait and see.", ja: "多分、様子を見るしかないね。", form: "guess" },
        ] },
        { id: "solve", word: "solve", meaning: "解決する", examples: [
          { en: "We need to solve this problem quickly.", ja: "この問題を早く解決しないといけません。", form: "solve" },
        ] },
        { id: "vote", word: "vote", meaning: "投票する", examples: [
          { en: "Did you vote in the last election?", ja: "前回の選挙で投票しましたか？", form: "vote" },
        ] },
        { id: "mean", word: "mean", meaning: "意味する", examples: [
          { en: "What does this word mean?", ja: "この言葉はどういう意味ですか？", form: "mean" },
        ] },
        { id: "waste", word: "waste", meaning: "無駄にする", examples: [
          { en: "Don't waste your time on things that don't matter.", ja: "重要じゃないことに時間を無駄にしないで。", form: "waste" },
        ] },
        { id: "organize", word: "organize", meaning: "整理する、組織する", examples: [
          { en: "I need to organize my desk.", ja: "机を整理しなきゃ。", form: "organize" },
        ] },
        { id: "recommend", word: "recommend", meaning: "おすすめする", examples: [
          { en: "I highly recommend this restaurant.", ja: "このレストランはとてもおすすめです。", form: "recommend" },
        ] },
        { id: "submit", word: "submit", meaning: "提出する", examples: [
          { en: "Please submit your report by the end of the week.", ja: "今週末までにレポートを提出してください。", form: "submit" },
        ] },
        { id: "issue", word: "issue", meaning: "発行する", examples: [
          { en: "The company will issue new guidelines next month.", ja: "会社は来月新しいガイドラインを発行します。", form: "issue" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "replace", word: "replace", meaning: "交換する、入れ替える", examples: [
          { en: "We need to replace the old batteries.", ja: "古い電池を交換しないといけません。", form: "replace" },
        ] },
        { id: "select", word: "select", meaning: "選択する", examples: [
          { en: "Please select your preferred language.", ja: "好きな言語を選択してください。", form: "select" },
        ] },
        { id: "reduce", word: "reduce", meaning: "減らす", examples: [
          { en: "We need to reduce our expenses.", ja: "私たちは経費を減らす必要があります。", form: "reduce" },
        ] },
        { id: "release", word: "release", meaning: "放す、リリースする", examples: [
          { en: "The company will release a new product next month.", ja: "会社は来月新しい製品をリリースする予定です。", form: "release" },
        ] },
        { id: "search", word: "search", meaning: "探す", examples: [
          { en: "I'm searching for a new job.", ja: "新しい仕事を探しています。", form: "searching" },
        ] },
        { id: "transfer", word: "transfer", meaning: "移動する、移す", examples: [
          { en: "I need to transfer money to my account.", ja: "自分の口座にお金を移さないと。", form: "transfer" },
        ] },
        { id: "fold", word: "fold", meaning: "たたむ", examples: [
          { en: "Please fold the laundry when it's done.", ja: "洗濯物が終わったら畳んでください。", form: "fold" },
        ] },
        { id: "achieve", word: "achieve", meaning: "達成する", examples: [
          { en: "He achieved his goal of running a marathon.", ja: "彼はマラソンを完走するという目標を達成しました。", form: "achieved" },
        ] },
        { id: "decline", word: "decline", meaning: "断る", examples: [
          { en: "I had to decline the invitation.", ja: "招待を断らなければなりませんでした。", form: "decline" },
        ] },
        { id: "decorate", word: "decorate", meaning: "飾る", examples: [
          { en: "Let's decorate the house for the party.", ja: "パーティーのために家を飾ろう。", form: "decorate" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "regret", word: "regret", meaning: "後悔する", examples: [
          { en: "I regret not studying harder for the test.", ja: "テストのためにもっと勉強しなかったことを後悔している。", form: "regret" },
        ] },
        { id: "treat", word: "treat", meaning: "扱う、治療する", examples: [
          { en: "They treated me like family.", ja: "彼らは私を家族のように扱ってくれました。", form: "treated" },
        ] },
        { id: "afford", word: "afford", meaning: "〜する余裕がある", examples: [
          { en: "I can't afford to buy a new car right now.", ja: "今は新しい車を買う余裕がないんだ。", form: "afford" },
        ] },
        { id: "calculate", word: "calculate", meaning: "計算する", examples: [
          { en: "Can you calculate the total cost?", ja: "合計金額を計算してくれる？", form: "calculate" },
        ] },
        { id: "register", word: "register", meaning: "登録する", examples: [
          { en: "Please register for the event online.", ja: "イベントにオンラインで登録してください。", form: "register" },
        ] },
        { id: "update", word: "update", meaning: "更新する", examples: [
          { en: "I need to update my computer software.", ja: "パソコンのソフトウェアを更新しないといけない。", form: "update" },
        ] },
        { id: "expire", word: "expire", meaning: "期限が切れる", examples: [
          { en: "My driver's license will expire next month.", ja: "私の運転免許は来月期限が切れます。", form: "expire" },
        ] },
        { id: "commute", word: "commute", meaning: "通勤する", examples: [
          { en: "I commute to work by train.", ja: "電車で通勤しています。", form: "commute" },
        ] },
        { id: "research", word: "research", meaning: "調査する、研究する", examples: [
          { en: "She's researching ways to improve customer satisfaction.", ja: "彼女は顧客満足度を向上させる方法を調べている。", form: "researching" },
        ] },
        { id: "copy", word: "copy", meaning: "コピーする", examples: [
          { en: "Can you copy these documents for the meeting?", ja: "会議用にこの書類をコピーしてくれる？", form: "copy" },
        ] },
      ],
    },
    {
      title: "名詞 ①",
      pos: "名詞",
      words: [
        { id: "saving", word: "saving", meaning: "節約、値引き、貯金（savings）", examples: [
          { en: "I found some great savings during the holiday sales.", ja: "ホリデーセールでお得な買い物をしました。", form: "savings" },
        ] },
        { id: "impact", word: "impact", meaning: "影響", examples: [
          { en: "The new law will have a big impact on small businesses.", ja: "新しい法律は小さなビジネスに大きな影響を与えるでしょう。", form: "impact" },
        ] },
        { id: "loss", word: "loss", meaning: "損失", examples: [
          { en: "The team's loss in the finals was disappointing.", ja: "チームが決勝戦で負けたのは残念でした。", form: "loss" },
        ] },
        { id: "airplane", word: "airplane", meaning: "航空機", examples: [
          { en: "The airplane took off an hour late.", ja: "飛行機は1時間遅れて離陸しました。", form: "airplane" },
        ] },
        { id: "household", word: "household", meaning: "家庭", examples: [
          { en: "This is a common household item.", ja: "これは一般的な家庭用品です。", form: "household" },
        ] },
        { id: "outline", word: "outline", meaning: "概要", examples: [
          { en: "Can you give me a brief outline of the plan?", ja: "計画の簡単な概要を教えてもらえる？", form: "outline" },
        ] },
        { id: "structure", word: "structure", meaning: "構造、建築物", examples: [
          { en: "The structure of the building is very modern.", ja: "その建物の構造はとてもモダンです。", form: "structure" },
        ] },
        { id: "income", word: "income", meaning: "収入", examples: [
          { en: "Her main source of income is her online business.", ja: "彼女の主な収入源はオンラインビジネスです。", form: "income" },
        ] },
        { id: "setting", word: "setting", meaning: "設定、環境", examples: [
          { en: "The movie's setting is a futuristic city.", ja: "その映画の舞台は未来の都市です。", form: "setting" },
        ] },
        { id: "labor", word: "labor", meaning: "労働", examples: [
          { en: "Manual labor is hard, but it's honest work.", ja: "肉体労働は大変だけど、誠実性がある仕事だよ。", form: "labor" },
        ] },
      ],
    },
    {
      title: "名詞 ②",
      pos: "名詞",
      words: [
        { id: "relationship", word: "relationship", meaning: "関係", examples: [
          { en: "We have a really good relationship with our neighbors.", ja: "私たちは隣人とすごく良い関係を築いています。", form: "relationship" },
        ] },
        { id: "measurement", word: "measurement", meaning: "測定、サイズ", examples: [
          { en: "I need to take the measurements of the room for the new furniture.", ja: "新しい家具のために部屋のサイズを測らなきゃ。", form: "measurements" },
        ] },
        { id: "population", word: "population", meaning: "人口", examples: [
          { en: "The population of the city has been growing steadily.", ja: "その都市の人口は着実に増加しています。", form: "population" },
        ] },
        { id: "recommendation", word: "recommendation", meaning: "勧告、おすすめ", examples: [
          { en: "Do you have any recommendations for a good restaurant nearby?", ja: "この近くでいいレストランのおすすめはありますか？", form: "recommendations" },
        ] },
        { id: "call", word: "call", meaning: "電話", examples: [
          { en: "I got a call from my mom this morning.", ja: "今朝、母から電話がありました。", form: "call" },
        ] },
        { id: "career", word: "career", meaning: "キャリア", examples: [
          { en: "She's had a long and successful career in teaching.", ja: "彼女は長くて成功した教職キャリアを持っています。", form: "career" },
        ] },
        { id: "training", word: "training", meaning: "トレーニング", examples: [
          { en: "The company offers on-the-job training for new employees.", ja: "会社は新入社員向けに実地トレーニングを提供しています。", form: "training" },
        ] },
        { id: "college", word: "college", meaning: "大学", examples: [
          { en: "He's planning to go to college next year.", ja: "彼は来年大学に進学する予定です。", form: "college" },
        ] },
        { id: "capacity", word: "capacity", meaning: "容量", examples: [
          { en: "The stadium has a seating capacity of 50,000 people.", ja: "スタジアムは5万人の収容力があります。", form: "capacity" },
        ] },
        { id: "product", word: "product", meaning: "製品", examples: [
          { en: "This is one of our best-selling products.", ja: "これはうちの一番売れている製品の一つです。", form: "products" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "enthusiastic", word: "enthusiastic", meaning: "熱心な", examples: [
          { en: "She's very enthusiastic about learning new languages.", ja: "彼女は新しい言語を学ぶことにとても熱心だ。", form: "enthusiastic" },
        ] },
        { id: "loyal", word: "loyal", meaning: "忠実な", examples: [
          { en: "He's a loyal customer who has been coming here for years.", ja: "彼は何年もこの店に通っている忠実な顧客だ。", form: "loyal" },
        ] },
        { id: "thorough", word: "thorough", meaning: "徹底的な", examples: [
          { en: "The police conducted a thorough investigation.", ja: "警察は徹底的な捜査を行った。", form: "thorough" },
        ] },
        { id: "domestic", word: "domestic", meaning: "国内の", examples: [
          { en: "Domestic flights are often cheaper than international ones.", ja: "国内便は国際便よりも安いことが多い。", form: "Domestic" },
        ] },
        { id: "typical", word: "typical", meaning: "典型的な", examples: [
          { en: "It's a typical rainy day in the city.", ja: "今日はいつも通り雨の日だね。", form: "typical" },
        ] },
        { id: "favorable", word: "favorable", meaning: "好意的な、有利な", examples: [
          { en: "The weather conditions are favorable for a picnic today.", ja: "今日の天気はピクニックに好都合だ。", form: "favorable" },
        ] },
        { id: "flexible", word: "flexible", meaning: "柔軟な", examples: [
          { en: "I have a flexible schedule, so I can meet you anytime.", ja: "私は柔軟なスケジュールがあるので、いつでも会えるよ。", form: "flexible" },
        ] },
        { id: "inflexible", word: "inflexible", meaning: "柔軟性がない", examples: [
          { en: "His inflexible attitude made negotiations difficult.", ja: "彼の柔軟性のない態度で交渉が難しくなった。", form: "inflexible" },
        ] },
        { id: "awkward", word: "awkward", meaning: "気まずい", examples: [
          { en: "There was an awkward silence after he made that joke.", ja: "彼がジョークを言った後、気まずい沈黙が続いた。", form: "awkward" },
        ] },
        { id: "distinct", word: "distinct", meaning: "明確な、異なる", examples: [
          { en: "The two brands have very distinct identities.", ja: "その二つのブランドは非常に異なるアイデンティティを持っている。", form: "distinct" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "substantial", word: "substantial", meaning: "かなりの", examples: [
          { en: "She received a substantial raise after her promotion.", ja: "昇進後、彼女はかなりの昇給を受けた。", form: "substantial" },
        ] },
        { id: "talented", word: "talented", meaning: "才能のある", examples: [
          { en: "He's a talented musician who can play multiple instruments.", ja: "彼は複数の楽器を演奏できる才能のあるミュージシャンだ。", form: "talented" },
        ] },
        { id: "competitive", word: "competitive", meaning: "競争の激しい", examples: [
          { en: "The job market is very competitive right now.", ja: "現在、就職市場は非常に競争が激しい。", form: "competitive" },
        ] },
        { id: "extensive", word: "extensive", meaning: "広範囲の", examples: [
          { en: "The library has an extensive collection of books.", ja: "図書館には広範な書籍コレクションがある。", form: "extensive" },
        ] },
        { id: "urban", word: "urban", meaning: "都会の", examples: [
          { en: "She prefers the urban lifestyle over living in the countryside.", ja: "彼女は田舎の生活よりも都会の生活を好む。", form: "urban" },
        ] },
        { id: "disappointing", word: "disappointing", meaning: "失望した", examples: [
          { en: "The movie was disappointing after all the hype.", ja: "その映画は期待に反してがっかりする内容だった。", form: "disappointing" },
        ] },
        { id: "protective", word: "protective", meaning: "保護的な", examples: [
          { en: "She's very protective of her younger brother.", ja: "彼女は弟をとても大事にしている。", form: "protective" },
        ] },
        { id: "calm", word: "calm", meaning: "穏やかな、平静な", examples: [
          { en: "He remained calm during the emergency situation.", ja: "彼は緊急事態の間も冷静さを保っていた。", form: "calm" },
        ] },
        { id: "friendly", word: "friendly", meaning: "友好的な、好意的な", examples: [
          { en: "The staff at the hotel were very friendly and helpful.", ja: "ホテルのスタッフはとても親切で助けてくれた。", form: "friendly" },
        ] },
        { id: "nervous", word: "nervous", meaning: "緊張している", examples: [
          { en: "I always get nervous before giving a big presentation.", ja: "大きなプレゼンの前はいつも緊張するんだ。", form: "nervous" },
        ] },
      ],
    },
    {
      title: "副詞",
      pos: "副詞",
      words: [
        { id: "apart", word: "apart", meaning: "離れて", examples: [
          { en: "We've been living apart for over a year now.", ja: "私たちはもう1年以上離れて暮らしている。", form: "apart" },
        ] },
        { id: "carelessly", word: "carelessly", meaning: "不注意に", examples: [
          { en: "He carelessly left his phone on the bus.", ja: "彼は不注意にバスに電話を置き忘れてしまった。", form: "carelessly" },
        ] },
        { id: "suddenly", word: "suddenly", meaning: "突然", examples: [
          { en: "The lights suddenly went out during the storm.", ja: "嵐の最中に突然電気が消えたんだ。", form: "suddenly" },
        ] },
        { id: "normally", word: "normally", meaning: "通常", examples: [
          { en: "I normally wake up at 7 AM.", ja: "普段は朝7時に起きるよ。", form: "normally" },
        ] },
        { id: "frequently", word: "frequently", meaning: "頻繁に", examples: [
          { en: "We frequently visit our grandparents on weekends.", ja: "週末には頻繁に祖父母を訪れるんだ。", form: "frequently" },
        ] },
        { id: "late", word: "late", meaning: "遅く", examples: [
          { en: "She stayed up late to finish her homework.", ja: "彼女は遅くまで起きて宿題を終わらせたんだ。", form: "late" },
        ] },
        { id: "inside", word: "inside", meaning: "内側", examples: [
          { en: "It's too cold outside, let's stay inside.", ja: "外は寒すぎるから、中にいようよ。", form: "inside" },
        ] },
        { id: "outside", word: "outside", meaning: "外側", examples: [
          { en: "It's too hot outside, let's go inside.", ja: "外は暑すぎるから、中に入ろうよ。", form: "outside" },
        ] },
        { id: "far", word: "far", meaning: "遠く", examples: [
          { en: "How far is it from here to the station?", ja: "ここから駅までどのくらい離れてるの？", form: "far" },
        ] },
        { id: "deeply", word: "deeply", meaning: "深く", examples: [
          { en: "He was deeply affected by the news.", ja: "彼はそのニュースに深く影響を受けたんだ。", form: "deeply" },
        ] },
      ],
    },
    {
      title: "イディオム ①",
      pos: "イディオム",
      words: [
        { id: "in-charge-of", word: "in charge of", meaning: "〜を担当して", examples: [
          { en: "He is in charge of the sales team at his company.", ja: "彼は会社で営業チームを担当しています。", form: "in charge of" },
        ] },
        { id: "go-around", word: "go around", meaning: "回る", examples: [
          { en: "There's a rumor going around the office.", ja: "オフィスで噂が広まっているよ。", form: "going around" },
        ] },
        { id: "as-well-as", word: "as well as", meaning: "〜だけでなく", examples: [
          { en: "She's studying French as well as Spanish.", ja: "彼女はスペイン語だけでなくフランス語も勉強している。", form: "as well as" },
        ] },
        { id: "take-a-break", word: "take a break", meaning: "休憩を取る", examples: [
          { en: "Let's take a break and grab some coffee.", ja: "ちょっと休憩してコーヒーでも飲もう。", form: "take a break" },
        ] },
        { id: "lets-say", word: "let's say", meaning: "〜と仮定しましょう", examples: [
          { en: "Let's say we finish this by tomorrow.", ja: "明日までにこれが終わると仮定しましょう。", form: "Let's say" },
        ] },
        { id: "in-advance", word: "in advance", meaning: "前もって", examples: [
          { en: "Please let me know in advance if you can't attend.", ja: "出席できない場合は前もって教えてください。", form: "in advance" },
        ] },
        { id: "behind-schedule", word: "behind schedule", meaning: "スケジュールより遅れて", examples: [
          { en: "We're behind schedule on the project.", ja: "プロジェクトのスケジュールが遅れています。", form: "behind schedule" },
        ] },
        { id: "at-any-time", word: "at any time", meaning: "いつでも", examples: [
          { en: "You can call me at any time if you need help.", ja: "いつでも助けが必要なら電話していいよ。", form: "at any time" },
        ] },
        { id: "it-looks-like", word: "It looks like", meaning: "〜のように見える", examples: [
          { en: "It looks like it's going to rain soon.", ja: "もうすぐ雨が降りそうだね。", form: "It looks like" },
        ] },
        { id: "as-soon-as-possible", word: "as soon as possible", meaning: "できるだけ早く", examples: [
          { en: "I'll get back to you as soon as possible.", ja: "できるだけ早く返事するよ。", form: "as soon as possible" },
        ] },
      ],
    },
    {
      title: "イディオム ②",
      pos: "イディオム",
      words: [
        { id: "for-a-while", word: "for a while", meaning: "しばらくの間", examples: [
          { en: "I haven't seen her for a while.", ja: "彼女とはしばらく会っていない。", form: "for a while" },
        ] },
        { id: "would-you-like", word: "Would you like", meaning: "〜したいですか、〜しましょうか", examples: [
          { en: "Would you like to join us for dinner?", ja: "夕食に参加しませんか？", form: "Would you like" },
        ] },
        { id: "why-dont-you", word: "Why don't you", meaning: "〜したらどうですか？", examples: [
          { en: "Why don't you come over this weekend?", ja: "今週末、うちに来たらどう？", form: "Why don't you" },
        ] },
        { id: "hows-it-going", word: "How's it going?", meaning: "調子はどう？", examples: [
          { en: "Hey, how's it going?", ja: "やあ、調子はどう？", form: "how's it going" },
        ] },
        { id: "make-sure", word: "make sure", meaning: "確認する", examples: [
          { en: "Make sure you lock the door when you leave.", ja: "出るときにドアをちゃんと鍵してね。", form: "Make sure" },
        ] },
        { id: "fill-out", word: "fill out", meaning: "記入する", examples: [
          { en: "Please fill out this form and return it to us.", ja: "この用紙に記入して、返送してください。", form: "fill out" },
        ] },
        { id: "just-in-case", word: "just in case", meaning: "念のため", examples: [
          { en: "I brought an umbrella just in case it rains.", ja: "雨が降るといけないから傘を持ってきたよ。", form: "just in case" },
        ] },
        { id: "put-on", word: "put on", meaning: "身に着ける", examples: [
          { en: "Don't forget to put on your seatbelt.", ja: "シートベルトを忘れずに着けてね。", form: "put on" },
        ] },
        { id: "try-on", word: "try on", meaning: "試着する", examples: [
          { en: "Can I try on this jacket?", ja: "このジャケット試着してもいいですか？", form: "try on" },
        ] },
        { id: "24-7", word: "24/7", meaning: "24時間年中無休で、いつでも", examples: [
          { en: "This store is open 24/7, so you can shop anytime.", ja: "このお店は24時間年中無休で営業しているから、いつでも買い物できるよ。", form: "24/7" },
        ] },
      ],
    },
  ],
};
