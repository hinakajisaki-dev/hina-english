// 単語帳 英単語 Week 5 (LinkUp), from the teacher's PDF「中級まとめ」(pages 41–50,
// 100 words: 動詞 30・名詞 20・形容詞 20・副詞 10・イディオム 20), one example each.
// Only for the students the teacher gives it to (vocab_books, see words.js); it
// takes the place of the shared Week 5 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, form).

export const LINKUP5 = {
  id: "linkup5",
  week: 5,
  title: "英単語 Week 5",
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "clarify", word: "clarify", meaning: "明確にする", examples: [
          { en: "Could you clarify what you mean by that?", ja: "それがどういう意味か明確にしてもらえますか？", form: "clarify" },
        ] },
        { id: "finalize", word: "finalize", meaning: "最終決定する", examples: [
          { en: "We need to finalize the details of the agreement.", ja: "契約の詳細を最終決定する必要があります。", form: "finalize" },
        ] },
        { id: "target", word: "target", meaning: "目標を定める", examples: [
          { en: "The company is targeting young consumers.", ja: "会社は若い消費者をターゲットにしています。", form: "targeting" },
        ] },
        { id: "aid", word: "aid", meaning: "援助する", examples: [
          { en: "The government will aid the victims of the disaster.", ja: "政府が災害の被害者を援助します。", form: "aid" },
        ] },
        { id: "imply", word: "imply", meaning: "ほのめかす", examples: [
          { en: "Are you implying that I made a mistake?", ja: "私がミスをしたと言っているの？", form: "implying" },
        ] },
        { id: "arrange", word: "arrange", meaning: "手配する、準備する", examples: [
          { en: "I'll arrange the meeting for next week.", ja: "来週の会議を手配しますね。", form: "arrange" },
        ] },
        { id: "operate", word: "operate", meaning: "運営する", examples: [
          { en: "He operates his own business.", ja: "彼は自分のビジネスを運営しています。", form: "operates" },
        ] },
        { id: "ensure", word: "ensure", meaning: "確保する", examples: [
          { en: "Please ensure that the doors are locked.", ja: "ドアがちゃんと閉まっているか確認してください。", form: "ensure" },
        ] },
        { id: "establish", word: "establish", meaning: "確立する、設立する", examples: [
          { en: "They established the company in 2005.", ja: "彼らは2005年に会社を設立しました。", form: "established" },
        ] },
        { id: "construct", word: "construct", meaning: "建設する、構築する", examples: [
          { en: "The workers are constructing a new bridge.", ja: "作業員たちは新しい橋を建設しています。", form: "constructing" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "demonstrate", word: "demonstrate", meaning: "示す", examples: [
          { en: "He demonstrated how to use the software.", ja: "彼はそのソフトの使い方を示しました。", form: "demonstrated" },
        ] },
        { id: "recruit", word: "recruit", meaning: "募集する", examples: [
          { en: "The company is recruiting new staff.", ja: "会社は新しいスタッフを募集しています。", form: "recruiting" },
        ] },
        { id: "examine", word: "examine", meaning: "検査する", examples: [
          { en: "The doctor will examine the patient.", ja: "医者が患者を検査します。", form: "examine" },
        ] },
        { id: "accompany", word: "accompany", meaning: "同行する", examples: [
          { en: "I'll accompany you to the airport.", ja: "空港まで一緒に行きますね。", form: "accompany" },
        ] },
        { id: "refer", word: "refer", meaning: "参照する", examples: [
          { en: "Please refer to the manual for instructions.", ja: "操作についてはマニュアルを参照してください。", form: "refer" },
        ] },
        { id: "investigate", word: "investigate", meaning: "調査する", examples: [
          { en: "The police are investigating the crime.", ja: "警察がその犯罪を調査しています。", form: "investigating" },
        ] },
        { id: "ease", word: "ease", meaning: "簡単にする", examples: [
          { en: "This tool will ease the process of editing.", ja: "このツールで編集が簡単になります。", form: "ease" },
        ] },
        { id: "visualize", word: "visualize", meaning: "視覚化する", examples: [
          { en: "I like to visualize my goals before I start working on them.", ja: "目標に取り掛かる前に視覚化するのが好きです。", form: "visualize" },
        ] },
        { id: "retain", word: "retain", meaning: "保持する、維持する、保管する", examples: [
          { en: "You should retain a copy of the document for your records.", ja: "記録のためにその書類のコピーを保持しておいてください。", form: "retain" },
        ] },
        { id: "exclude", word: "exclude", meaning: "除外する", examples: [
          { en: "We need to exclude some items from the budget.", ja: "予算からいくつかの項目を除外しないといけません。", form: "exclude" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "rise", word: "rise", meaning: "上がる", examples: [
          { en: "The sun rises at 6 AM.", ja: "太陽は午前6時に昇ります。", form: "rises" },
        ] },
        { id: "raise", word: "raise", meaning: "上げる", examples: [
          { en: "Please raise your hand if you have a question.", ja: "質問がある人は手を挙げてください。", form: "raise" },
        ] },
        { id: "forbid", word: "forbid", meaning: "禁止する", examples: [
          { en: "The school forbids smoking on campus.", ja: "学校ではキャンパス内での喫煙を禁止しています。", form: "forbids" },
        ] },
        { id: "overlook", word: "overlook", meaning: "見落とす", examples: [
          { en: "I think we overlooked a small detail.", ja: "小さな細部を見落としてしまったかもしれません。", form: "overlooked" },
        ] },
        { id: "assess", word: "assess", meaning: "評価する", examples: [
          { en: "We need to assess the risks before making a decision.", ja: "決定する前にリスクを評価する必要があります。", form: "assess" },
        ] },
        { id: "comply", word: "comply", meaning: "従う", examples: [
          { en: "All employees must comply with the company's policies.", ja: "全ての従業員は会社の規定に従わなければなりません。", form: "comply" },
        ] },
        { id: "arise", word: "arise", meaning: "生じる", examples: [
          { en: "Problems may arise during the project.", ja: "プロジェクト中に問題が発生することがあります。", form: "arise" },
        ] },
        { id: "dedicate", word: "dedicate", meaning: "捧げる", examples: [
          { en: "She dedicated her life to helping others.", ja: "彼女は他人を助けることに人生を捧げました。", form: "dedicated" },
        ] },
        { id: "empathize", word: "empathize", meaning: "共感する", examples: [
          { en: "I can empathize with your situation.", ja: "あなたの状況に共感します。", form: "empathize" },
        ] },
        { id: "absorb", word: "absorb", meaning: "吸収する", examples: [
          { en: "Plants absorb water through their roots.", ja: "植物は根から水を吸収します。", form: "absorb" },
        ] },
      ],
    },
    {
      title: "名詞 ①",
      pos: "名詞",
      words: [
        { id: "campaign", word: "campaign", meaning: "キャンペーン、運動", examples: [
          { en: "The company is launching a new ad campaign next month.", ja: "会社は来月、新しい広告キャンペーンを開始します。", form: "campaign" },
        ] },
        { id: "replacement", word: "replacement", meaning: "交換、交代", examples: [
          { en: "My phone broke, so I need a replacement.", ja: "携帯が壊れたから、交換が必要です。", form: "replacement" },
        ] },
        { id: "advance", word: "advance", meaning: "進歩、前進", examples: [
          { en: "The advance in technology over the past decade is incredible.", ja: "過去10年間の技術の進歩は驚異的です。", form: "advance" },
        ] },
        { id: "estimate", word: "estimate", meaning: "見積もり", examples: [
          { en: "Can you give me an estimate for the repair costs?", ja: "修理費の見積もりを教えてもらえますか？", form: "estimate" },
        ] },
        { id: "publication", word: "publication", meaning: "出版物", examples: [
          { en: "The latest issue of the magazine is a special publication.", ja: "最新号の雑誌は特別出版です。", form: "publication" },
        ] },
        { id: "operation", word: "operation", meaning: "業務、運営", examples: [
          { en: "The operation of the business has improved recently.", ja: "最近、ビジネスの運営が改善されました。", form: "operation" },
        ] },
        { id: "division", word: "division", meaning: "部門", examples: [
          { en: "He works in the marketing division.", ja: "彼はマーケティング部門で働いています。", form: "division" },
        ] },
        { id: "association", word: "association", meaning: "協会", examples: [
          { en: "She's part of a local business association.", ja: "彼女は地元のビジネス協会の一員です。", form: "association" },
        ] },
        { id: "launch", word: "launch", meaning: "開始、発売", examples: [
          { en: "The launch of the new product was a huge success.", ja: "新商品の発売は大成功でした。", form: "launch" },
        ] },
        { id: "crew", word: "crew", meaning: "班、乗員", examples: [
          { en: "The flight crew made sure everyone was comfortable.", ja: "フライトの乗務員は全員が快適に過ごせるように気を配っていました。", form: "crew" },
        ] },
      ],
    },
    {
      title: "名詞 ②",
      pos: "名詞",
      words: [
        { id: "finding", word: "finding", meaning: "結果", examples: [
          { en: "The findings of the study were surprising.", ja: "その研究の結果は驚くべきものでした。", form: "findings" },
        ] },
        { id: "surface", word: "surface", meaning: "表面", examples: [
          { en: "The surface of the table is really smooth.", ja: "テーブルの表面はとても滑らかです。", form: "surface" },
        ] },
        { id: "cooperation", word: "cooperation", meaning: "協力", examples: [
          { en: "Thanks for your cooperation on this project.", ja: "このプロジェクトでのご協力、ありがとうございます。", form: "cooperation" },
        ] },
        { id: "factor", word: "factor", meaning: "要因", examples: [
          { en: "Cost was a major factor in our decision.", ja: "コストが私たちの決断の主な要因でした。", form: "factor" },
        ] },
        { id: "priority", word: "priority", meaning: "優先事項", examples: [
          { en: "My top priority right now is finishing this project.", ja: "今の最優先事項はこのプロジェクトを終わらせることです。", form: "priority" },
        ] },
        { id: "recall", word: "recall", meaning: "回収", examples: [
          { en: "There was a recall on the car due to a safety issue.", ja: "安全問題のため、その車のリコールがありました。", form: "recall" },
        ] },
        { id: "remark", word: "remark", meaning: "コメント、意見", examples: [
          { en: "He made an interesting remark during dinner.", ja: "彼は夕食中に面白いコメントをしました。", form: "remark" },
        ] },
        { id: "commission", word: "commission", meaning: "委員会、手数料", examples: [
          { en: "She earned a commission on every house she sold.", ja: "彼女は売った家ごとに手数料を稼いでいました。", form: "commission" },
        ] },
        { id: "resource", word: "resource", meaning: "資源", examples: [
          { en: "Water is one of our most precious resources.", ja: "水は私たちの最も貴重な資源の一つです。", form: "resources" },
        ] },
        { id: "atmosphere", word: "atmosphere", meaning: "雰囲気", examples: [
          { en: "The atmosphere in the cafe is so relaxing.", ja: "そのカフェの雰囲気はとてもリラックスできます。", form: "atmosphere" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "economic", word: "economic", meaning: "経済的な", examples: [
          { en: "The country is facing an economic crisis.", ja: "その国は経済危機に直面している。", form: "economic" },
        ] },
        { id: "environmental", word: "environmental", meaning: "環境の", examples: [
          { en: "The company is taking steps to reduce its environmental impact.", ja: "その会社は環境への影響を減らすための対策を講じている。", form: "environmental" },
        ] },
        { id: "negligible", word: "negligible", meaning: "取るに足らない、無視できるほどの", examples: [
          { en: "The difference in price was negligible, so I bought the more expensive one.", ja: "価格の差はほとんどなかったので、高い方を買った。", form: "negligible" },
        ] },
        { id: "reliable", word: "reliable", meaning: "信頼できる", examples: [
          { en: "He is known as a reliable employee who always meets deadlines.", ja: "彼は締め切りを守る信頼できる社員として知られている。", form: "reliable" },
        ] },
        { id: "unreliable", word: "unreliable", meaning: "信頼できない", examples: [
          { en: "The internet connection here is very unreliable.", ja: "ここのインターネット接続はとても不安定だ。", form: "unreliable" },
        ] },
        { id: "dirty", word: "dirty", meaning: "汚れた", examples: [
          { en: "The kids came home with dirty clothes after playing outside.", ja: "子供たちは外で遊んだ後、汚れた服で帰ってきた。", form: "dirty" },
        ] },
        { id: "social", word: "social", meaning: "社会的な", examples: [
          { en: "Social media has become an essential part of daily life.", ja: "ソーシャルメディアは日常生活の重要な一部になった。", form: "Social" },
        ] },
        { id: "technical", word: "technical", meaning: "技術的な、専門的な", examples: [
          { en: "He provided technical support to help fix the software issue.", ja: "彼はソフトウェアの問題を解決するために技術サポートを提供した。", form: "technical" },
        ] },
        { id: "basic", word: "basic", meaning: "基本的な", examples: [
          { en: "She's taking a basic cooking class to improve her skills.", ja: "彼女は料理の基本を学ぶために料理教室に通っている。", form: "basic" },
        ] },
        { id: "optional", word: "optional", meaning: "任意の", examples: [
          { en: "The course offers optional workshops for those who want extra help.", ja: "コースでは、追加の助けを求める人のために任意のワークショップを提供している。", form: "optional" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "significant", word: "significant", meaning: "重要な", examples: [
          { en: "The discovery was a significant breakthrough in medical research.", ja: "その発見は医学研究における重要な進展だった。", form: "significant" },
        ] },
        { id: "insignificant", word: "insignificant", meaning: "取るに足らない", examples: [
          { en: "The error was insignificant and didn't affect the outcome.", ja: "そのミスは取るに足らず、結果に影響を与えなかった。", form: "insignificant" },
        ] },
        { id: "relevant", word: "relevant", meaning: "関連のある", examples: [
          { en: "The information is highly relevant to the project we're working on.", ja: "その情報は、私たちが取り組んでいるプロジェクトに非常に関連がある。", form: "relevant" },
        ] },
        { id: "irrelevant", word: "irrelevant", meaning: "関係のない", examples: [
          { en: "His comments were irrelevant to the topic of the meeting.", ja: "彼のコメントは会議の議題に関係がなかった。", form: "irrelevant" },
        ] },
        { id: "capable", word: "capable", meaning: "能力がある", examples: [
          { en: "She's capable of handling multiple tasks at once.", ja: "彼女は複数のタスクを同時に処理する能力がある。", form: "capable" },
        ] },
        { id: "incapable", word: "incapable", meaning: "能力がない", examples: [
          { en: "He felt incapable of completing the project on his own.", ja: "彼はプロジェクトを一人で完了することができないと感じた。", form: "incapable" },
        ] },
        { id: "mean", word: "mean", meaning: "意地悪な", examples: [
          { en: "The kids at school can be really mean sometimes.", ja: "学校の子供たちは時々本当に意地悪になる。", form: "mean" },
        ] },
        { id: "tasteless", word: "tasteless", meaning: "まずい、味がない", examples: [
          { en: "The soup was bland and tasteless, so I added some spices.", ja: "スープは味が薄く、まずかったので、スパイスを加えた。", form: "tasteless" },
        ] },
        { id: "bland", word: "bland", meaning: "味がない、味が薄い", examples: [
          { en: "The food was bland and didn't have much flavor.", ja: "料理は味が薄くてあまり風味がなかった。", form: "bland" },
        ] },
        { id: "healthy", word: "healthy", meaning: "健康的な", examples: [
          { en: "She follows a healthy diet and exercises regularly.", ja: "彼女は健康的な食事をして、定期的に運動している。", form: "healthy" },
        ] },
      ],
    },
    {
      title: "副詞",
      pos: "副詞",
      words: [
        { id: "weekly", word: "weekly", meaning: "毎週", examples: [
          { en: "I go to the gym weekly to stay in shape.", ja: "体型を維持するために毎週ジムに通っています。", form: "weekly" },
        ] },
        { id: "monthly", word: "monthly", meaning: "毎月", examples: [
          { en: "Rent is paid monthly.", ja: "家賃は毎月支払われる。", form: "monthly" },
        ] },
        { id: "yearly", word: "yearly", meaning: "毎年", examples: [
          { en: "We go on a family vacation yearly.", ja: "毎年家族旅行に出かけるんだ。", form: "yearly" },
        ] },
        { id: "hard", word: "hard", meaning: "固く、一生懸命に", examples: [
          { en: "She worked hard to finish the project on time.", ja: "彼女はプロジェクトを期限内に終わらせるために一生懸命働いた。", form: "hard" },
        ] },
        { id: "angrily", word: "angrily", meaning: "怒って", examples: [
          { en: "He angrily slammed the door and walked out.", ja: "彼は怒ってドアをバタンと閉めて出て行った。", form: "angrily" },
        ] },
        { id: "easily", word: "easily", meaning: "簡単に", examples: [
          { en: "This task can be completed easily with the right tools.", ja: "この作業は適切な道具を使えば簡単に終わるよ。", form: "easily" },
        ] },
        { id: "either", word: "either", meaning: "（肯定文）どちらか一方、（否定文）〜もない", examples: [
          { en: "I don't like that movie, and I don't think he does either.", ja: "私はその映画が好きじゃないし、彼も好きじゃないと思う。", form: "either" },
        ] },
        { id: "neither", word: "neither", meaning: "〜もまた〜ない、どちらも〜ない", examples: [
          { en: "She doesn't like coffee, and neither do I.", ja: "彼女はコーヒーが好きじゃないし、私も好きじゃない。", form: "neither" },
        ] },
        { id: "halfway", word: "halfway", meaning: "途中で", examples: [
          { en: "We're halfway through the book.", ja: "その本の途中まで読み進めています。", form: "halfway" },
        ] },
        { id: "moreover", word: "moreover", meaning: "さらに、その上", examples: [
          { en: "The price is reasonable, and moreover, the quality is excellent.", ja: "値段が手ごろで、その上、品質も素晴らしいんだ。", form: "moreover" },
        ] },
      ],
    },
    {
      title: "イディオム ①",
      pos: "イディオム",
      words: [
        { id: "hand-over", word: "hand over", meaning: "手渡す", examples: [
          { en: "Please hand over the documents by 5 PM.", ja: "書類を午後5時までに渡してください。", form: "hand over" },
        ] },
        { id: "be-covered-with", word: "be covered with", meaning: "〜で覆われている", examples: [
          { en: "The car was covered with snow this morning.", ja: "今朝、車が雪で覆われていたよ。", form: "was covered with" },
        ] },
        { id: "take-place", word: "take place", meaning: "行われる", examples: [
          { en: "The meeting will take place at 2 PM tomorrow.", ja: "会議は明日午後2時に行われます。", form: "take place" },
        ] },
        { id: "theres-no-charge", word: "There's no charge", meaning: "料金はかかりません", examples: [
          { en: "Don't worry, there's no charge for the service.", ja: "心配しないで、サービスは無料だよ。", form: "there's no charge" },
        ] },
        { id: "stare-at", word: "stare at", meaning: "じっと見る", examples: [
          { en: "She stared at the painting for a long time.", ja: "彼女は長い間その絵をじっと見ていた。", form: "stared at" },
        ] },
        { id: "make-an-appointment", word: "make an appointment", meaning: "予約をする", examples: [
          { en: "I need to make an appointment with the dentist.", ja: "歯医者の予約をしないといけないな。", form: "make an appointment" },
        ] },
        { id: "conduct-a-survey", word: "conduct a survey", meaning: "調査を行う", examples: [
          { en: "The company conducted a survey to gather customer feedback.", ja: "会社は顧客の意見を集めるために調査を行った。", form: "conducted a survey" },
        ] },
        { id: "compensate-for", word: "compensate for", meaning: "埋め合わせをする", examples: [
          { en: "The company will compensate for the delay in delivery.", ja: "会社は配達の遅れに対して補償してくれるよ。", form: "compensate for" },
        ] },
        { id: "approve-of", word: "approve of", meaning: "賛成する", examples: [
          { en: "His parents didn't approve of his decision to quit school.", ja: "彼の両親は彼の学校を辞める決断に賛成しなかった。", form: "approve of" },
        ] },
        { id: "as-per", word: "as per", meaning: "〜に従って", examples: [
          { en: "We did everything as per your instructions.", ja: "指示通りに全てやりました。", form: "as per" },
        ] },
      ],
    },
    {
      title: "イディオム ②",
      pos: "イディオム",
      words: [
        { id: "play-a-role", word: "play a role", meaning: "役割を果たす", examples: [
          { en: "She played a major role in organizing the event.", ja: "彼女はイベントの企画に大きな役割を果たしたんだ。", form: "played a major role" },
        ] },
        { id: "run-out-of", word: "run out of", meaning: "使い果たす、足りなくなる", examples: [
          { en: "We've run out of coffee, I'll go buy some more.", ja: "コーヒーが切れちゃったから、買ってくるよ。", form: "run out of" },
        ] },
        { id: "work-on", word: "work on", meaning: "取り組む", examples: [
          { en: "I'm working on a new project at the moment.", ja: "今、新しいプロジェクトに取り組んでるんだ。", form: "working on" },
        ] },
        { id: "in-person", word: "in person", meaning: "直接", examples: [
          { en: "You should submit the application in person.", ja: "申請書は直接提出したほうがいいよ。", form: "in person" },
        ] },
        { id: "make-up-for", word: "make up for", meaning: "埋め合わせをする", examples: [
          { en: "She bought him a gift to make up for forgetting his birthday.", ja: "彼女は誕生日を忘れたお詫びに彼にプレゼントを買ったんだ。", form: "make up for" },
        ] },
        { id: "out-of-stock", word: "out of stock", meaning: "在庫切れで", examples: [
          { en: "That jacket is out of stock in all sizes.", ja: "そのジャケット、全サイズ在庫切れです。", form: "out of stock" },
        ] },
        { id: "to-some-extent", word: "to some extent", meaning: "ある程度", examples: [
          { en: "I agree with you to some extent, but not completely.", ja: "ある程度は君に賛成だけど、完全には賛成できないな。", form: "to some extent" },
        ] },
        { id: "in-the-long-run", word: "in the long run", meaning: "長い目で見ると", examples: [
          { en: "In the long run, this decision will benefit the company.", ja: "長い目で見ると、この決断は会社にとって有益だよ。", form: "In the long run" },
        ] },
        { id: "ask-a-favor", word: "ask a favor", meaning: "頼み事をする", examples: [
          { en: "Can I ask you a favor?", ja: "頼み事してもいい？", form: "ask you a favor" },
        ] },
        { id: "be-supposed-to", word: "be supposed to", meaning: "するべきである、することになっている", examples: [
          { en: "You're supposed to submit the report by Friday.", ja: "金曜日までにレポートを提出することになってるよ。", form: "supposed to" },
        ] },
      ],
    },
  ],
};
