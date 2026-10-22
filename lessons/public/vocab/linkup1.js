// 単語帳 LinkUp 英単語 Week 1, from the teacher's PDF「LinkUp英単語」(the first 10 pages,
// 100 words: 動詞 30・名詞 20・形容詞 20・副詞 10・前置詞 20), one example each.
// Only for the students the teacher gives it to (vocab_books, see words.js); it
// takes the place of the shared Week 1 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, form).

export const LINKUP1 = {
  id: "linkup1",
  week: 1,
  title: "LinkUp 英単語 Week 1",
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "import", word: "import", meaning: "輸入する", examples: [
          { en: "This company imports goods from Japan.", ja: "この会社は日本から商品を輸入しています。", form: "imports" },
        ] },
        { id: "develop", word: "develop", meaning: "発展させる", examples: [
          { en: "We need to develop a new strategy.", ja: "新しい戦略を立てる必要があるね。", form: "develop" },
        ] },
        { id: "note", word: "note", meaning: "注意する、述べる", examples: [
          { en: "Please note the changes in the schedule.", ja: "スケジュールの変更に注意してね。", form: "note" },
        ] },
        { id: "discuss", word: "discuss", meaning: "議論する", examples: [
          { en: "We need to discuss the new proposal.", ja: "新しい提案について話し合わなきゃね。", form: "discuss" },
        ] },
        { id: "bite", word: "bite", meaning: "噛む", examples: [
          { en: "The dog bit my hand.", ja: "犬に手を噛まれた。", form: "bit" },
        ] },
        { id: "encounter", word: "encounter", meaning: "偶然出会う、遭遇する", examples: [
          { en: "I encountered an old friend at the store yesterday.", ja: "昨日、店で昔の友達にばったり会ったんだ。", form: "encountered" },
        ] },
        { id: "design", word: "design", meaning: "設計する", examples: [
          { en: "She designed the layout for the new website.", ja: "彼女が新しいウェブサイトのレイアウトを設計したんだ。", form: "designed" },
        ] },
        { id: "manage", word: "manage", meaning: "管理する", examples: [
          { en: "He manages a team of 20 people.", ja: "彼は20人のチームを管理しています。", form: "manages" },
        ] },
        { id: "provide", word: "provide", meaning: "提供する", examples: [
          { en: "We provide excellent customer service.", ja: "私たちは優れたカスタマーサービスを提供しています。", form: "provide" },
        ] },
        { id: "educate", word: "educate", meaning: "教育する", examples: [
          { en: "It's important to educate children about safety.", ja: "子供に安全について教えるのは大切だよね。", form: "educate" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "assist", word: "assist", meaning: "助ける、手伝う", examples: [
          { en: "Can you assist me with this task?", ja: "この仕事を手伝ってもらえる？", form: "assist" },
        ] },
        { id: "attend", word: "attend", meaning: "出席する", examples: [
          { en: "Are you going to attend the meeting?", ja: "会議に出席するの？", form: "attend" },
        ] },
        { id: "attract", word: "attract", meaning: "引き付ける、魅了する", examples: [
          { en: "The event attracted a large crowd.", ja: "イベントにはたくさんの人が集まったよ。", form: "attracted" },
        ] },
        { id: "charge", word: "charge", meaning: "請求する、充電する", examples: [
          { en: "I need to charge my phone.", ja: "携帯を充電しないと。", form: "charge" },
        ] },
        { id: "announce", word: "announce", meaning: "発表する、告知する", examples: [
          { en: "The company announced a new product today.", ja: "今日、会社が新しい製品を発表したよ。", form: "announced" },
        ] },
        { id: "return", word: "return", meaning: "戻す、戻る", examples: [
          { en: "I need to return this book to the library.", ja: "この本を図書館に返さなきゃ。", form: "return" },
        ] },
        { id: "celebrate", word: "celebrate", meaning: "祝う", examples: [
          { en: "We celebrated her birthday last night.", ja: "昨夜、彼女の誕生日を祝ったんだ。", form: "celebrated" },
        ] },
        { id: "encourage", word: "encourage", meaning: "励ます", examples: [
          { en: "We encourage everyone to participate.", ja: "みんなの参加を歓迎しています。", form: "encourage" },
        ] },
        { id: "evaluate", word: "evaluate", meaning: "評価する", examples: [
          { en: "We need to evaluate the results of the experiment.", ja: "実験の結果を評価する必要があるね。", form: "evaluate" },
        ] },
        { id: "confirm", word: "confirm", meaning: "確認する", examples: [
          { en: "Can you confirm our reservation?", ja: "予約を確認してくれる？", form: "confirm" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "include", word: "include", meaning: "含む", examples: [
          { en: "Does this price include tax?", ja: "この価格に税金は含まれていますか？", form: "include" },
        ] },
        { id: "purchase", word: "purchase", meaning: "購入する", examples: [
          { en: "I plan to purchase a new laptop soon.", ja: "近いうちに新しいノートパソコンを買う予定です。", form: "purchase" },
        ] },
        { id: "interact", word: "interact", meaning: "交流する", examples: [
          { en: "I like to interact with people from different cultures.", ja: "異なる文化の人々と交流するのが好きです。", form: "interact" },
        ] },
        { id: "enable", word: "enable", meaning: "可能にする", examples: [
          { en: "This app enables you to track your spending.", ja: "このアプリで支出を追跡できるよ。", form: "enables" },
        ] },
        { id: "concentrate", word: "concentrate", meaning: "集中する", examples: [
          { en: "I can't concentrate with all this noise.", ja: "こんなにうるさいと集中できないよ。", form: "concentrate" },
        ] },
        { id: "expect", word: "expect", meaning: "期待する", examples: [
          { en: "I expect him to arrive on time.", ja: "彼が時間通りに来ることを期待しています。", form: "expect" },
        ] },
        { id: "bring", word: "bring", meaning: "持ってくる、連れてくる", examples: [
          { en: "Can you bring your laptop to the meeting?", ja: "会議にパソコンを持ってきてくれる？", form: "bring" },
        ] },
        { id: "enter", word: "enter", meaning: "入る、入力する", examples: [
          { en: "Please enter your password.", ja: "パスワードを入力してください。", form: "enter" },
        ] },
        { id: "carry", word: "carry", meaning: "持ち運ぶ", examples: [
          { en: "Can you help me carry these boxes?", ja: "この箱を運ぶのを手伝ってくれる？", form: "carry" },
        ] },
        { id: "reach", word: "reach", meaning: "連絡を取る、達する", examples: [
          { en: "I'll reach out to you later.", ja: "後で連絡しますね。", form: "reach" },
        ] },
      ],
    },
    {
      title: "名詞 ①",
      pos: "名詞",
      words: [
        { id: "property", word: "property", meaning: "不動産、所有地", examples: [
          { en: "They're thinking about buying a property by the beach.", ja: "彼らはビーチ近くに不動産を買おうか検討しています。", form: "property" },
        ] },
        { id: "competition", word: "competition", meaning: "大会、競争", examples: [
          { en: "She's training hard for the upcoming competition.", ja: "彼女は次の大会に向けて一生懸命トレーニングしています。", form: "competition" },
        ] },
        { id: "employment", word: "employment", meaning: "雇用", examples: [
          { en: "He's looking for stable employment after graduation.", ja: "彼は卒業後、安定した仕事を探しています。", form: "employment" },
        ] },
        { id: "reference", word: "reference", meaning: "参照", examples: [
          { en: "Can you give me a reference for the job application?", ja: "仕事の応募のために推薦状を書いてもらえる？", form: "reference" },
        ] },
        { id: "resident", word: "resident", meaning: "住民", examples: [
          { en: "Most of the residents in this building are students.", ja: "この建物の住民のほとんどは学生です。", form: "residents" },
        ] },
        { id: "section", word: "section", meaning: "部分、コーナー", examples: [
          { en: "The magazine has a great travel section.", ja: "この雑誌には素晴らしい旅行コーナーがあります。", form: "section" },
        ] },
        { id: "expense", word: "expense", meaning: "費用", examples: [
          { en: "Traveling abroad can be a big expense.", ja: "海外旅行は大きな出費になることがあります。", form: "expense" },
        ] },
        { id: "exhibit", word: "exhibit", meaning: "展示会", examples: [
          { en: "We saw a really cool dinosaur exhibit at the museum.", ja: "博物館でとても素敵な恐竜の展示会を見ました。", form: "exhibit" },
        ] },
        { id: "receipt", word: "receipt", meaning: "領収書", examples: [
          { en: "I think I lost the receipt for the shoes I bought.", ja: "買った靴のレシートをなくしたみたい。", form: "receipt" },
        ] },
        { id: "stock", word: "stock", meaning: "在庫、株", examples: [
          { en: "That jacket is out of stock right now.", ja: "そのジャケットは今、在庫切れです。", form: "stock" },
        ] },
      ],
    },
    {
      title: "名詞 ②",
      pos: "名詞",
      words: [
        { id: "concern", word: "concern", meaning: "懸念、心配", examples: [
          { en: "My main concern is whether we'll have enough time.", ja: "一番心配なのは時間が足りるかどうかだね。", form: "concern" },
        ] },
        { id: "luggage", word: "luggage", meaning: "手荷物", examples: [
          { en: "How much luggage are you bringing on the trip?", ja: "旅行にどれくらい荷物を持っていくの？", form: "luggage" },
        ] },
        { id: "procedure", word: "procedure", meaning: "手続き", examples: [
          { en: "What's the procedure for getting a visa?", ja: "ビザを取る手続きってどうなってるの？", form: "procedure" },
        ] },
        { id: "description", word: "description", meaning: "説明、記述", examples: [
          { en: "The job description sounds interesting.", ja: "その仕事の説明が面白そうだね。", form: "description" },
        ] },
        { id: "variety", word: "variety", meaning: "種類", examples: [
          { en: "This store has a variety of snacks from around the world.", ja: "このお店には世界中のお菓子が揃っているね。", form: "variety" },
        ] },
        { id: "term", word: "term", meaning: "条件、期間", examples: [
          { en: "I agreed to the contract terms after reading them carefully.", ja: "条件をよく読んで契約に同意しました。", form: "terms" },
        ] },
        { id: "response", word: "response", meaning: "返答", examples: [
          { en: "Did you get a response to your email yet?", ja: "メールの返事はもう来た？", form: "response" },
        ] },
        { id: "solution", word: "solution", meaning: "解決策", examples: [
          { en: "We need to find a solution to this problem.", ja: "この問題の解決策を見つけないとね。", form: "solution" },
        ] },
        { id: "agreement", word: "agreement", meaning: "契約、合意", examples: [
          { en: "We finally reached an agreement after a long discussion.", ja: "長い話し合いの末、ようやく合意に達しました。", form: "agreement" },
        ] },
        { id: "government", word: "government", meaning: "政府", examples: [
          { en: "The government announced new guidelines today.", ja: "今日、政府が新しいガイドラインを発表しました。", form: "government" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "traditional", word: "traditional", meaning: "伝統的な", examples: [
          { en: "My grandmother makes the most delicious traditional food.", ja: "祖母は最高においしい伝統料理を作るんだ。", form: "traditional" },
        ] },
        { id: "entire", word: "entire", meaning: "全体の", examples: [
          { en: "The entire team worked hard to meet the deadline.", ja: "チーム全員が締め切りに間に合わせるために一生懸命働いた。", form: "entire" },
        ] },
        { id: "exact", word: "exact", meaning: "正確な", examples: [
          { en: "Do you know the exact time of the meeting?", ja: "会議の正確な時間を知ってる？", form: "exact" },
        ] },
        { id: "practical", word: "practical", meaning: "実用的な", examples: [
          { en: "This bag is not only stylish but also very practical.", ja: "このバッグはおしゃれだし、とても実用的だ。", form: "practical" },
        ] },
        { id: "available", word: "available", meaning: "利用可能な", examples: [
          { en: "The tickets are available online until tomorrow.", ja: "チケットは明日までオンラインで購入可能です。", form: "available" },
        ] },
        { id: "located", word: "located", meaning: "位置している", examples: [
          { en: "The restaurant is located near the train station.", ja: "そのレストランは駅の近くにあるよ。", form: "located" },
        ] },
        { id: "financial", word: "financial", meaning: "財務の", examples: [
          { en: "He is responsible for managing the company's financial affairs.", ja: "彼は会社の財務状況を管理する責任がある。", form: "financial" },
        ] },
        { id: "corporate", word: "corporate", meaning: "企業の", examples: [
          { en: "The corporate meeting will be held next week.", ja: "企業の会議は来週開催される予定だ。", form: "corporate" },
        ] },
        { id: "individual", word: "individual", meaning: "個人の", examples: [
          { en: "Every student has their own individual learning style.", ja: "生徒それぞれに個々の学習スタイルがあります。", form: "individual" },
        ] },
        { id: "additional", word: "additional", meaning: "追加の", examples: [
          { en: "We need additional information before making a decision.", ja: "決定を下す前に追加の情報が必要です。", form: "additional" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "annual", word: "annual", meaning: "年間の", examples: [
          { en: "The company holds an annual conference in December.", ja: "その会社は毎年12月に年次会議を開いている。", form: "annual" },
        ] },
        { id: "legal", word: "legal", meaning: "法律の", examples: [
          { en: "It is important to be aware of your legal rights.", ja: "自分の法的権利を知っておくことは重要だ。", form: "legal" },
        ] },
        { id: "electronic", word: "electronic", meaning: "電子的な", examples: [
          { en: "I prefer reading electronic books over paper ones.", ja: "紙の本よりも電子書籍を読む方が好きだ。", form: "electronic" },
        ] },
        { id: "industrial", word: "industrial", meaning: "産業の", examples: [
          { en: "This area is known for its industrial history.", ja: "この地域は産業の歴史で有名です。", form: "industrial" },
        ] },
        { id: "frequent", word: "frequent", meaning: "頻繁な", examples: [
          { en: "He is a frequent visitor to that café.", ja: "彼はあのカフェの常連客だよ。", form: "frequent" },
        ] },
        { id: "advanced", word: "advanced", meaning: "進んだ、高度な", examples: [
          { en: "She's taking an advanced course in mathematics.", ja: "彼女は数学の上級コースを受講している。", form: "advanced" },
        ] },
        { id: "complex", word: "complex", meaning: "複雑な", examples: [
          { en: "The instructions were too complex for me to understand.", ja: "指示が複雑すぎて理解できなかった。", form: "complex" },
        ] },
        { id: "initial", word: "initial", meaning: "初期の", examples: [
          { en: "His initial reaction was one of surprise.", ja: "彼の最初の反応は驚きだった。", form: "initial" },
        ] },
        { id: "alternative", word: "alternative", meaning: "代わりの", examples: [
          { en: "We need to find an alternative solution to this problem.", ja: "この問題に対する代替案を見つける必要がある。", form: "alternative" },
        ] },
        { id: "specific", word: "specific", meaning: "特定の", examples: [
          { en: "Can you give me a more specific example?", ja: "もう少し具体的な例を挙げてもらえますか？", form: "specific" },
        ] },
      ],
    },
    {
      title: "副詞",
      pos: "副詞",
      words: [
        { id: "accordingly", word: "accordingly", meaning: "それに応じて", examples: [
          { en: "Prices have risen, so we need to adjust our budget accordingly.", ja: "物価が上がったので、それに応じて予算を調整しないといけないね。", form: "accordingly" },
        ] },
        { id: "meanwhile", word: "meanwhile", meaning: "その間", examples: [
          { en: "I'll start cooking; meanwhile, you can set the table.", ja: "私が料理を始めるから、その間にテーブルをセットして。", form: "meanwhile" },
        ] },
        { id: "namely", word: "namely", meaning: "すなわち", examples: [
          { en: "Two people were involved, namely John and Sarah.", ja: "関わっていたのは2人で、すなわちジョンとサラだよ。", form: "namely" },
        ] },
        { id: "generally", word: "generally", meaning: "一般的に", examples: [
          { en: "Cats are generally more independent than dogs.", ja: "猫は一般的に犬よりも独立しているよね。", form: "generally" },
        ] },
        { id: "temporarily", word: "temporarily", meaning: "一時的に", examples: [
          { en: "The store is temporarily closed for renovations.", ja: "店は一時的に改装のため閉店しています。", form: "temporarily" },
        ] },
        { id: "virtually", word: "virtually", meaning: "事実上", examples: [
          { en: "The project is virtually complete, just a few details left.", ja: "プロジェクトは事実上完了していて、あとは細かい部分だけだよ。", form: "virtually" },
        ] },
        { id: "primarily", word: "primarily", meaning: "主として", examples: [
          { en: "The meeting will focus primarily on the budget.", ja: "会議は主に予算に焦点を当てる予定です。", form: "primarily" },
        ] },
        { id: "reluctantly", word: "reluctantly", meaning: "しぶしぶ", examples: [
          { en: "He reluctantly agreed to join the team.", ja: "彼はしぶしぶチームに参加することに同意した。", form: "reluctantly" },
        ] },
        { id: "similarly", word: "similarly", meaning: "同様に", examples: [
          { en: "Similarly, we need to adjust our plans based on the results.", ja: "同様に、結果に基づいて計画を調整する必要があるね。", form: "Similarly" },
        ] },
        { id: "typically", word: "typically", meaning: "典型的に", examples: [
          { en: "She typically starts her day with a cup of coffee.", ja: "彼女はよくコーヒーを飲んで1日を始めるんだ。", form: "typically" },
        ] },
      ],
    },
    {
      title: "前置詞 ①",
      pos: "前置詞",
      words: [
        { id: "for", word: "for", meaning: "のために、に対して", examples: [
          { en: "I bought a gift for my friend's birthday.", ja: "友達の誕生日のためにプレゼントを買ったよ。", form: "for" },
        ] },
        { id: "with", word: "with", meaning: "〜と一緒に、〜で", examples: [
          { en: "I went to the concert with my brother.", ja: "兄と一緒にコンサートに行ったんだ。", form: "with" },
        ] },
        { id: "in", word: "in", meaning: "〜の中に", examples: [
          { en: "There's a lot of water in the bottle.", ja: "ボトルの中にはたくさんの水が入っている。", form: "in" },
        ] },
        { id: "from", word: "from", meaning: "から", examples: [
          { en: "She received a letter from her grandmother.", ja: "彼女はおばあちゃんから手紙をもらったんだ。", form: "from" },
        ] },
        { id: "to", word: "to", meaning: "へ、に", examples: [
          { en: "I'm going to the store later today.", ja: "今日の後でお店に行く予定です。", form: "to" },
        ] },
        { id: "at", word: "at", meaning: "〜で、〜に、〜において", examples: [
          { en: "Let's meet at the park at 3 PM.", ja: "3時に公園で会おうよ。", form: "at" },
        ] },
        { id: "of", word: "of", meaning: "の、から", examples: [
          { en: "She's the manager of the sales department.", ja: "彼女は営業部のマネージャーです。", form: "of" },
        ] },
        { id: "off", word: "off", meaning: "離れて、休みで", examples: [
          { en: "I'm taking the day off tomorrow to relax.", ja: "明日は休みを取ってリラックスするつもりです。", form: "off" },
        ] },
        { id: "on", word: "on", meaning: "の上に", examples: [
          { en: "The book is on the table.", ja: "本はテーブルの上にあるよ。", form: "on" },
        ] },
        { id: "into", word: "into", meaning: "の中に、に", examples: [
          { en: "He put the keys into his pocket.", ja: "彼はポケットに鍵を入れたんだ。", form: "into" },
        ] },
      ],
    },
    {
      title: "前置詞 ②",
      pos: "前置詞",
      words: [
        { id: "by", word: "by", meaning: "〜のそばに、〜によって", examples: [
          { en: "I'll be waiting by the entrance.", ja: "入口のそばで待ってるよ。", form: "by" },
        ] },
        { id: "against", word: "against", meaning: "〜に対して、〜に反対して", examples: [
          { en: "The team is playing against their biggest rivals today.", ja: "チームは今日、最大のライバルと対戦している。", form: "against" },
        ] },
        { id: "until", word: "until", meaning: "〜まで", examples: [
          { en: "I'll be here until 6 PM.", ja: "6時までここにいるよ。", form: "until" },
        ] },
        { id: "about", word: "about", meaning: "約、〜について", examples: [
          { en: "We talked about the movie after we watched it.", ja: "映画を観た後、その映画について話したんだ。", form: "about" },
        ] },
        { id: "above", word: "above", meaning: "上に", examples: [
          { en: "The picture is hanging above the fireplace.", ja: "絵は暖炉の上に掛かっているよ。", form: "above" },
        ] },
        { id: "across", word: "across", meaning: "横切って", examples: [
          { en: "We walked across the bridge.", ja: "橋を渡って歩いたよ。", form: "across" },
        ] },
        { id: "after", word: "after", meaning: "後に", examples: [
          { en: "Let's grab dinner after the meeting.", ja: "会議の後、夕食を食べようよ。", form: "after" },
        ] },
        { id: "before", word: "before", meaning: "前に", examples: [
          { en: "I'll call you before I leave the house.", ja: "家を出る前に電話するね。", form: "before" },
        ] },
        { id: "behind", word: "behind", meaning: "〜の後ろに", examples: [
          { en: "The car is parked behind the building.", ja: "車はビルの裏に停めてあるよ。", form: "behind" },
        ] },
        { id: "below", word: "below", meaning: "〜の下に", examples: [
          { en: "The temperature dropped below freezing last night.", ja: "昨夜、気温が氷点下に下がったんだ。", form: "below" },
        ] },
      ],
    },
  ],
};
