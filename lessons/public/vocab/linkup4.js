// 単語帳 英単語 Week 4 (LinkUp), from the teacher's PDF「中級まとめ」(pages 31–40,
// 100 words: 動詞 30・名詞 20・形容詞 20・副詞 10・イディオム 20), one example each.
// Only for the students the teacher gives it to (vocab_books, see words.js); it
// takes the place of the shared Week 4 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, form).

export const LINKUP4 = {
  id: "linkup4",
  week: 4,
  title: "英単語 Week 4",
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "host", word: "host", meaning: "主催する、司会をする", examples: [
          { en: "They're hosting a dinner party next weekend.", ja: "彼らは来週末ディナーパーティーを主催します。", form: "hosting" },
        ] },
        { id: "wish", word: "wish", meaning: "〜したいと思う", examples: [
          { en: "I wish I could take a long vacation.", ja: "長期休暇が取れたらいいのになあ。", form: "wish" },
        ] },
        { id: "cause", word: "cause", meaning: "引き起こす", examples: [
          { en: "The heavy rain caused flooding in the area.", ja: "大雨がこの地域に洪水を引き起こしました。", form: "caused" },
        ] },
        { id: "match", word: "match", meaning: "合う、合わせる", examples: [
          { en: "This color doesn't match the rest of the room.", ja: "この色、部屋の他の部分と合わないね。", form: "match" },
        ] },
        { id: "cross", word: "cross", meaning: "横断する", examples: [
          { en: "Be careful when you cross the street.", ja: "道を渡る時は気をつけてね。", form: "cross" },
        ] },
        { id: "benefit", word: "benefit", meaning: "〜のためになる", examples: [
          { en: "Regular exercise benefits both your body and mind.", ja: "定期的な運動は体にも心にも良いよ。", form: "benefits" },
        ] },
        { id: "date", word: "date", meaning: "デートする、日付をつける", examples: [
          { en: "Are you dating anyone right now?", ja: "今、誰かと付き合ってるの？", form: "dating" },
        ] },
        { id: "hide", word: "hide", meaning: "隠す、隠れる", examples: [
          { en: "He tried to hide the surprise from her.", ja: "彼は彼女にサプライズを隠そうとしたんだ。", form: "hide" },
        ] },
        { id: "state", word: "state", meaning: "述べる、明記する", examples: [
          { en: "He clearly stated his opinion during the meeting.", ja: "彼は会議で自分の意見をはっきり述べた。", form: "stated" },
        ] },
        { id: "result", word: "result", meaning: "生じる、終わる", examples: [
          { en: "His efforts resulted in a big success.", ja: "彼の努力が大きな成功をもたらしたんだ。", form: "resulted" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "lie", word: "lie", meaning: "横になる、嘘をつく", examples: [
          { en: "He likes to lie on the couch after work.", ja: "彼は仕事の後、ソファに横になるのが好きです。", form: "lie" },
        ] },
        { id: "ignore", word: "ignore", meaning: "無視する", examples: [
          { en: "I ignored a message from my ex-boyfriend.", ja: "元カレからのメッセージは無視した。", form: "ignored" },
        ] },
        { id: "prove", word: "prove", meaning: "証明する", examples: [
          { en: "Can you prove that you're right?", ja: "あなたが正しいことを証明できますか？", form: "prove" },
        ] },
        { id: "trust", word: "trust", meaning: "信頼する", examples: [
          { en: "I trust her with my secrets.", ja: "彼女には私の秘密を信頼して話している。", form: "trust" },
        ] },
        { id: "wonder", word: "wonder", meaning: "〜かどうか思う", examples: [
          { en: "I wonder if it will rain tomorrow.", ja: "明日雨が降るのかな？", form: "wonder" },
        ] },
        { id: "care", word: "care", meaning: "気にする、世話をする", examples: [
          { en: "Do you care about the environment?", ja: "環境について気にしてる？", form: "care" },
        ] },
        { id: "begin", word: "begin", meaning: "始まる", examples: [
          { en: "The concert will begin at 7 PM.", ja: "コンサートは午後7時に始まります。", form: "begin" },
        ] },
        { id: "inform", word: "inform", meaning: "知らせる", examples: [
          { en: "Please inform me of any changes.", ja: "何か変更があったら知らせてください。", form: "inform" },
        ] },
        { id: "complete", word: "complete", meaning: "完成させる", examples: [
          { en: "I finally completed the project.", ja: "ようやくプロジェクトを完成させました。", form: "completed" },
        ] },
        { id: "identify", word: "identify", meaning: "特定する", examples: [
          { en: "Can you identify the problem?", ja: "問題を特定できますか？", form: "identify" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "inspect", word: "inspect", meaning: "検査する", examples: [
          { en: "The engineer will inspect the building tomorrow.", ja: "エンジニアが明日ビルを検査します。", form: "inspect" },
        ] },
        { id: "instruct", word: "instruct", meaning: "指示する", examples: [
          { en: "She instructed us to wait here until further notice.", ja: "彼女は私たちに、次の指示があるまでここで待つように言いました。", form: "instructed" },
        ] },
        { id: "adjust", word: "adjust", meaning: "調整する", examples: [
          { en: "Can you adjust the volume, please?", ja: "音量を調整してくれる？", form: "adjust" },
        ] },
        { id: "negotiate", word: "negotiate", meaning: "交渉する", examples: [
          { en: "We need to negotiate the terms of the contract.", ja: "契約の条件を交渉する必要があります。", form: "negotiate" },
        ] },
        { id: "collaborate", word: "collaborate", meaning: "協力する", examples: [
          { en: "Let's collaborate on this project.", ja: "このプロジェクトで協力しよう。", form: "collaborate" },
        ] },
        { id: "expand", word: "expand", meaning: "拡大する", examples: [
          { en: "The company plans to expand its business overseas.", ja: "その会社は海外に事業を拡大する予定です。", form: "expand" },
        ] },
        { id: "utilize", word: "utilize", meaning: "利用する", examples: [
          { en: "We need to utilize all available resources.", ja: "使えるリソースはすべて利用しないといけません。", form: "utilize" },
        ] },
        { id: "contribute", word: "contribute", meaning: "貢献する", examples: [
          { en: "He contributed to the success of the project.", ja: "彼はプロジェクトの成功に貢献しました。", form: "contributed" },
        ] },
        { id: "brainstorm", word: "brainstorm", meaning: "アイデアを出す", examples: [
          { en: "Let's brainstorm some ideas for the new campaign.", ja: "新しいキャンペーンのアイデアを出し合おう。", form: "brainstorm" },
        ] },
        { id: "prioritize", word: "prioritize", meaning: "優先する", examples: [
          { en: "We need to prioritize these tasks based on urgency.", ja: "緊急性に基づいてこれらのタスクを優先する必要があります。", form: "prioritize" },
        ] },
      ],
    },
    {
      title: "名詞 ①",
      pos: "名詞",
      words: [
        { id: "street", word: "street", meaning: "道", examples: [
          { en: "Our house is on a quiet street near the park.", ja: "私たちの家は公園の近くの静かな通りにあります。", form: "street" },
        ] },
        { id: "room", word: "room", meaning: "部屋", examples: [
          { en: "I need to clean my room this weekend.", ja: "週末に部屋を掃除しないといけないな。", form: "room" },
        ] },
        { id: "cash", word: "cash", meaning: "現金", examples: [
          { en: "Do you have any cash on you for the taxi?", ja: "タクシーのために現金持ってる？", form: "cash" },
        ] },
        { id: "area", word: "area", meaning: "地域、場所", examples: [
          { en: "This area is known for its beautiful parks.", ja: "この地域は美しい公園で有名です。", form: "area" },
        ] },
        { id: "problem", word: "problem", meaning: "問題", examples: [
          { en: "There's a problem with the Wi-Fi connection.", ja: "Wi-Fiの接続に問題があります。", form: "problem" },
        ] },
        { id: "wife", word: "wife", meaning: "妻", examples: [
          { en: "His wife makes amazing homemade pasta.", ja: "彼の妻は素晴らしい手作りパスタを作ります。", form: "wife" },
        ] },
        { id: "key", word: "key", meaning: "鍵", examples: [
          { en: "I forgot my keys at home.", ja: "家に鍵を忘れました。", form: "keys" },
        ] },
        { id: "law", word: "law", meaning: "法律、法", examples: [
          { en: "He's studying law at university.", ja: "彼は大学で法律を勉強しています。", form: "law" },
        ] },
        { id: "increase", word: "increase", meaning: "増加", examples: [
          { en: "There's been a big increase in online shopping recently.", ja: "最近、オンラインショッピングが大幅に増えました。", form: "increase" },
        ] },
        { id: "difference", word: "difference", meaning: "違い", examples: [
          { en: "What's the difference between these two phones?", ja: "この2つの携帯の違いは何ですか？", form: "difference" },
        ] },
      ],
    },
    {
      title: "名詞 ②",
      pos: "名詞",
      words: [
        { id: "policy", word: "policy", meaning: "方針", examples: [
          { en: "The store has a strict return policy.", ja: "そのお店には厳しい返品ポリシーがあります。", form: "policy" },
        ] },
        { id: "flight", word: "flight", meaning: "フライト、航空便", examples: [
          { en: "My flight to New York was delayed by two hours.", ja: "ニューヨーク行きのフライトが2時間遅れました。", form: "flight" },
        ] },
        { id: "money", word: "money", meaning: "お金", examples: [
          { en: "How much money do you need for the trip?", ja: "旅行にいくら必要ですか？", form: "money" },
        ] },
        { id: "office", word: "office", meaning: "オフィス、事務所", examples: [
          { en: "I'll be at the office until 5 PM today.", ja: "今日は5時までオフィスにいます。", form: "office" },
        ] },
        { id: "way", word: "way", meaning: "道", examples: [
          { en: "What's the best way to get to the station from here?", ja: "ここから駅までの最適な行き方は何ですか？", form: "way" },
        ] },
        { id: "glasses", word: "glasses", meaning: "メガネ", examples: [
          { en: "I can't find my glasses anywhere.", ja: "メガネがどこにも見つからないんだ。", form: "glasses" },
        ] },
        { id: "plant", word: "plant", meaning: "植物、工場", examples: [
          { en: "She loves taking care of her indoor plants.", ja: "彼女は室内の植物の世話をするのが大好きです。", form: "plants" },
        ] },
        { id: "award", word: "award", meaning: "賞", examples: [
          { en: "He received an award for his outstanding service.", ja: "彼は優れたサービスに対して賞を受賞しました。", form: "award" },
        ] },
        { id: "supply", word: "supply", meaning: "必需品、供給", examples: [
          { en: "The store ran out of school supplies during the rush.", ja: "お店は混雑時に学用品を切らしてしまいました。", form: "supplies" },
        ] },
        { id: "proposal", word: "proposal", meaning: "提案", examples: [
          { en: "He made a proposal to improve the current system.", ja: "彼は現行システムを改善する提案をしました。", form: "proposal" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "crowded", word: "crowded", meaning: "混んでいる", examples: [
          { en: "The train was so crowded during rush hour.", ja: "ラッシュアワーの電車はすごく混んでいた。", form: "crowded" },
        ] },
        { id: "empty", word: "empty", meaning: "空いている", examples: [
          { en: "The restaurant was empty when we arrived.", ja: "私たちが着いた時、レストランは空いていた。", form: "empty" },
        ] },
        { id: "accurate", word: "accurate", meaning: "正確な", examples: [
          { en: "His answer was accurate, so he got full marks on the test.", ja: "彼の答えは正確で、テストで満点を取った。", form: "accurate" },
        ] },
        { id: "inaccurate", word: "inaccurate", meaning: "不正確な", examples: [
          { en: "The report was inaccurate and needed corrections.", ja: "そのレポートは不正確で、修正が必要だった。", form: "inaccurate" },
        ] },
        { id: "pleasant", word: "pleasant", meaning: "心地よい、楽しい", examples: [
          { en: "We had a pleasant evening watching movies together.", ja: "私たちは映画を一緒に見て、楽しい夜を過ごした。", form: "pleasant" },
        ] },
        { id: "unpleasant", word: "unpleasant", meaning: "不快な", examples: [
          { en: "The weather was unpleasant, so we stayed indoors.", ja: "天気が悪くて、不快だったので家の中にいた。", form: "unpleasant" },
        ] },
        { id: "generous", word: "generous", meaning: "寛大な", examples: [
          { en: "He was generous and lent me his car for the weekend.", ja: "彼は優しくて、週末に車を貸してくれたんだ。", form: "generous" },
        ] },
        { id: "stingy", word: "stingy", meaning: "けちな", examples: [
          { en: "He's so stingy that he never leaves a tip at restaurants.", ja: "彼はケチだから、レストランでチップを置かない。", form: "stingy" },
        ] },
        { id: "smart", word: "smart", meaning: "賢い", examples: [
          { en: "She's incredibly smart and graduated at the top of her class.", ja: "彼女は非常に賢く、クラスで首席で卒業した。", form: "smart" },
        ] },
        { id: "dumb", word: "dumb", meaning: "愚かな", examples: [
          { en: "I felt so dumb for forgetting my keys at home.", ja: "家に鍵を忘れてきて、自分がすごくバカだと感じた。", form: "dumb" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "convenient", word: "convenient", meaning: "便利な", examples: [
          { en: "This new app makes shopping more convenient.", ja: "この新しいアプリで買い物がもっと便利になった。", form: "convenient" },
        ] },
        { id: "inconvenient", word: "inconvenient", meaning: "不便な", examples: [
          { en: "The timing of the meeting was inconvenient for everyone.", ja: "会議の時間はみんなにとって不便だった。", form: "inconvenient" },
        ] },
        { id: "cool", word: "cool", meaning: "涼しい", examples: [
          { en: "The weather was cool and perfect for hiking.", ja: "天気は涼しくて、ハイキングにはちょうどよかった。", form: "cool" },
        ] },
        { id: "humid", word: "humid", meaning: "湿気のある", examples: [
          { en: "It's really humid today, I can't wait for fall.", ja: "今日は本当に湿気が多くて、秋が待ち遠しい。", form: "humid" },
        ] },
        { id: "shiny", word: "shiny", meaning: "光沢のある", examples: [
          { en: "Her new shoes were so shiny, they reflected the light.", ja: "彼女の新しい靴はとてもキラキラしてて、光を反射していた。", form: "shiny" },
        ] },
        { id: "dull", word: "dull", meaning: "くすんだ", examples: [
          { en: "The paint on the wall had become dull over the years.", ja: "壁の塗料は年々くすんでしまった。", form: "dull" },
        ] },
        { id: "straight", word: "straight", meaning: "まっすぐな、直線の", examples: [
          { en: "His hair is naturally straight and doesn't need styling.", ja: "彼の髪は元々まっすぐで、スタイリングの必要がない。", form: "straight" },
        ] },
        { id: "curved", word: "curved", meaning: "曲がった", examples: [
          { en: "The road was curved and difficult to drive on.", ja: "道は曲がりくねっていて運転しにくかった。", form: "curved" },
        ] },
        { id: "academic", word: "academic", meaning: "学術的な", examples: [
          { en: "She received an award for her academic achievements.", ja: "彼女は学術的な業績で表彰された。", form: "academic" },
        ] },
        { id: "artistic", word: "artistic", meaning: "芸術的な", examples: [
          { en: "He has a very artistic approach to his photography.", ja: "彼は写真撮影に非常に芸術的なアプローチをしている。", form: "artistic" },
        ] },
      ],
    },
    {
      title: "副詞",
      pos: "副詞",
      words: [
        { id: "mostly", word: "mostly", meaning: "大部分は", examples: [
          { en: "The movie was mostly enjoyable, but a bit too long.", ja: "映画はほとんど楽しめたけど、ちょっと長かったな。", form: "mostly" },
        ] },
        { id: "somewhat", word: "somewhat", meaning: "多少", examples: [
          { en: "I'm somewhat tired after the long day.", ja: "長い1日の後で多少疲れたな。", form: "somewhat" },
        ] },
        { id: "apparently", word: "apparently", meaning: "見たところ、〜みたいだ", examples: [
          { en: "Apparently, the meeting was rescheduled for tomorrow.", ja: "どうやら会議は明日に変更されたみたい。", form: "Apparently" },
        ] },
        { id: "swiftly", word: "swiftly", meaning: "迅速に", examples: [
          { en: "The problem was swiftly resolved by the technical team.", ja: "技術チームがその問題を迅速に解決した。", form: "swiftly" },
        ] },
        { id: "continuously", word: "continuously", meaning: "連続的に", examples: [
          { en: "The factory operates continuously, 24 hours a day.", ja: "工場は24時間、連続的に稼働しています。", form: "continuously" },
        ] },
        { id: "loud", word: "loud", meaning: "大声で", examples: [
          { en: "Please don't talk so loud in the library.", ja: "図書館ではそんなに大声で話さないでください。", form: "loud" },
        ] },
        { id: "happily", word: "happily", meaning: "幸せに", examples: [
          { en: "The children played happily in the park.", ja: "子供たちは公園で楽しそうに遊んでいた。", form: "happily" },
        ] },
        { id: "instantly", word: "instantly", meaning: "即座に", examples: [
          { en: "He responded to the email almost instantly.", ja: "彼はメールにほぼ即座に返答した。", form: "instantly" },
        ] },
        { id: "heavily", word: "heavily", meaning: "大量に、激しく", examples: [
          { en: "It's been raining heavily since this morning.", ja: "今朝からずっと大雨が降っている。", form: "heavily" },
        ] },
        { id: "daily", word: "daily", meaning: "毎日", examples: [
          { en: "I go for a walk daily to stay healthy.", ja: "健康のために毎日散歩に行っている。", form: "daily" },
        ] },
      ],
    },
    {
      title: "イディオム ①",
      pos: "イディオム",
      words: [
        { id: "what-are-you-up-to", word: "What are you up to?", meaning: "何してるの？", examples: [
          { en: "Hey, what are you up to this weekend?", ja: "やあ、今週末は何してるの？", form: "what are you up to" },
        ] },
        { id: "first-come-first-serve", word: "first come first serve", meaning: "先着順", examples: [
          { en: "The tickets are available on a first come first serve basis.", ja: "チケットは先着順です。", form: "first come first serve" },
        ] },
        { id: "every-so-often", word: "every so often", meaning: "時々", examples: [
          { en: "I go jogging every so often to stay in shape.", ja: "体を保つために時々ジョギングに行きます。", form: "every so often" },
        ] },
        { id: "im-down", word: "I'm down", meaning: "賛成、いいね、そうしよう", examples: [
          { en: "I'm down for a movie tonight.", ja: "今夜、映画に行くのはいいね。", form: "I'm down" },
        ] },
        { id: "i-have-no-idea", word: "I have no idea", meaning: "全然分からない", examples: [
          { en: "I have no idea what you're talking about.", ja: "君が何を言ってるのか全然わからないよ。", form: "I have no idea" },
        ] },
        { id: "keep-it-to-oneself", word: "keep it to oneself", meaning: "自分だけに留めておく、誰にも言わない", examples: [
          { en: "Keep it to yourself for now, don't tell anyone.", ja: "今はそれを自分だけに留めて、誰にも言わないでね。", form: "Keep it to yourself" },
        ] },
        { id: "work-from-home", word: "work from home", meaning: "在宅勤務する", examples: [
          { en: "I'm working from home today because of the weather.", ja: "今日は天気が悪いから在宅勤務してるんだ。", form: "working from home" },
        ] },
        { id: "break-up-with", word: "break up with", meaning: "〜と別れる", examples: [
          { en: "She broke up with her boyfriend last week.", ja: "彼女は先週、彼氏と別れたんだよ。", form: "broke up with" },
        ] },
        { id: "count-on", word: "count on", meaning: "〜を頼りにする", examples: [
          { en: "You can count on me to help you move this weekend.", ja: "今週末の引っ越し、私を頼っていいよ。", form: "count on" },
        ] },
        { id: "face-to-face", word: "face-to-face", meaning: "直接、顔を合わせて", examples: [
          { en: "We need to have a face-to-face meeting about this issue.", ja: "この件について直接会って話し合わなきゃね。", form: "face-to-face" },
        ] },
      ],
    },
    {
      title: "イディオム ②",
      pos: "イディオム",
      words: [
        { id: "from-scratch", word: "from scratch", meaning: "最初から", examples: [
          { en: "She made the cake from scratch.", ja: "彼女はケーキを最初から作ったんだよ。", form: "from scratch" },
        ] },
        { id: "hang-up", word: "hang up", meaning: "電話を切る", examples: [
          { en: "He hung up before I could say goodbye.", ja: "さよならを言う前に彼が電話を切っちゃったんだ。", form: "hung up" },
        ] },
        { id: "sounds-good", word: "Sounds good", meaning: "いいね", examples: [
          { en: "Let's meet at 7 PM? Sounds good!", ja: "7時に会おうか？ いいね！", form: "Sounds good" },
        ] },
        { id: "do-you-have-the-time", word: "Do you have the time?", meaning: "今何時ですか？", examples: [
          { en: "Excuse me, do you have the time?", ja: "すみません、今何時ですか？", form: "do you have the time" },
        ] },
        { id: "rule-of-thumb", word: "rule of thumb", meaning: "基本的な原則、大雑把なやり方", examples: [
          { en: "As a rule of thumb, I check my emails first thing in the morning.", ja: "基本的に朝一番にメールを確認するようにしているよ。", form: "rule of thumb" },
        ] },
        { id: "pull-oneself-together", word: "pull oneself together", meaning: "しっかりして、気を取り直して", examples: [
          { en: "After the bad news, she needed to pull herself together.", ja: "悪い知らせを聞いた後、彼女は気を取り直さなければならなかった。", form: "pull herself together" },
        ] },
        { id: "make-ends-meet", word: "make ends meet", meaning: "収支を合わせる", examples: [
          { en: "It's hard to make ends meet with the rising cost of living.", ja: "生活費が上がって、収支を合わせるのが難しいよ。", form: "make ends meet" },
        ] },
        { id: "go-the-extra-mile", word: "go the extra mile", meaning: "さらなる努力をする", examples: [
          { en: "He always goes the extra mile to help his team succeed.", ja: "彼はチームが成功するためにいつも一層の努力をする。", form: "goes the extra mile" },
        ] },
        { id: "be-concerned-about", word: "be concerned about", meaning: "気にかける、心配する", examples: [
          { en: "I'm concerned about the changes in the policy.", ja: "方針の変更が気になっているんだ。", form: "concerned about" },
        ] },
        { id: "far-from", word: "far from", meaning: "遠く離れて", examples: [
          { en: "The office is far from the station.", ja: "オフィスは駅から遠く離れているよ。", form: "far from" },
        ] },
      ],
    },
  ],
};
