// 単語帳 LinkUp 英単語 Week 2, from the teacher's PDF「LinkUp英単語」(pages 11–20,
// 100 words: 動詞 30・名詞 20・形容詞 20・副詞 10・前置詞 20), one example each.
// Only for the students the teacher gives it to (vocab_books, see words.js); it
// takes the place of the shared Week 2 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, form).

export const LINKUP2 = {
  id: "linkup2",
  week: 2,
  title: "LinkUp 英単語 Week 2",
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "remember", word: "remember", meaning: "覚えている、思い出す", examples: [
          { en: "Do you remember where you put your keys?", ja: "鍵をどこに置いたか覚えてる？", form: "remember" },
        ] },
        { id: "seem", word: "seem", meaning: "〜のように思える", examples: [
          { en: "He seems to be in a good mood today.", ja: "彼は今日は機嫌が良さそうだね。", form: "seems" },
        ] },
        { id: "build", word: "build", meaning: "建てる", examples: [
          { en: "They're going to build a new house next year.", ja: "彼らは来年新しい家を建てる予定です。", form: "build" },
        ] },
        { id: "miss", word: "miss", meaning: "〜のことを寂しく思う、逃す", examples: [
          { en: "I miss my family when I'm away.", ja: "家族と離れていると寂しくなる。", form: "miss" },
        ] },
        { id: "spend", word: "spend", meaning: "費やす", examples: [
          { en: "I spent the whole day working on this project.", ja: "このプロジェクトに一日中費やしました。", form: "spent" },
        ] },
        { id: "invite", word: "invite", meaning: "招待する", examples: [
          { en: "I invited some friends over for dinner.", ja: "夕食に友達を何人か招待しました。", form: "invited" },
        ] },
        { id: "mention", word: "mention", meaning: "述べる", examples: [
          { en: "Did you mention this to your boss?", ja: "これを上司に伝えた？", form: "mention" },
        ] },
        { id: "hire", word: "hire", meaning: "雇う", examples: [
          { en: "The company is looking to hire new employees.", ja: "会社は新しい従業員を雇おうとしています。", form: "hire" },
        ] },
        { id: "prepare", word: "prepare", meaning: "用意する", examples: [
          { en: "I'm preparing dinner for the guests.", ja: "来客のために夕食を準備しています。", form: "preparing" },
        ] },
        { id: "introduce", word: "introduce", meaning: "紹介する", examples: [
          { en: "Let me introduce you to my colleague.", ja: "同僚を紹介しますね。", form: "introduce" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "allow", word: "allow", meaning: "許す、可能にする", examples: [
          { en: "My parents don't allow me to stay out late.", ja: "親が夜遅くまで外出するのを許してくれません。", form: "allow" },
        ] },
        { id: "press", word: "press", meaning: "押す", examples: [
          { en: "Press the button to start the machine.", ja: "機械を作動させるにはボタンを押してください。", form: "Press" },
        ] },
        { id: "pull", word: "pull", meaning: "引く", examples: [
          { en: "You have to pull the door to open it.", ja: "ドアを開けるには引かないといけません。", form: "pull" },
        ] },
        { id: "add", word: "add", meaning: "加える", examples: [
          { en: "Please add some sugar to the coffee.", ja: "コーヒーに砂糖を入れてください。", form: "add" },
        ] },
        { id: "produce", word: "produce", meaning: "生産する", examples: [
          { en: "This factory produces cars.", ja: "この工場では車を生産しています。", form: "produces" },
        ] },
        { id: "follow", word: "follow", meaning: "従う", examples: [
          { en: "Please follow the instructions carefully.", ja: "指示に従って慎重に進めてください。", form: "follow" },
        ] },
        { id: "prefer", word: "prefer", meaning: "〜の方が好き", examples: [
          { en: "I prefer tea over coffee.", ja: "コーヒーより紅茶の方が好きです。", form: "prefer" },
        ] },
        { id: "continue", word: "continue", meaning: "続ける", examples: [
          { en: "Let's continue this conversation later.", ja: "この会話は後で続けましょう。", form: "continue" },
        ] },
        { id: "share", word: "share", meaning: "共有する", examples: [
          { en: "Can you share the document with me?", ja: "その書類を共有してくれる？", form: "share" },
        ] },
        { id: "remove", word: "remove", meaning: "取り除く", examples: [
          { en: "Please remove your shoes before entering.", ja: "入る前に靴を脱いでください。", form: "remove" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "suggest", word: "suggest", meaning: "提案する", examples: [
          { en: "I suggest we take a break.", ja: "一旦休憩を取ることを提案します。", form: "suggest" },
        ] },
        { id: "respond", word: "respond", meaning: "返答する", examples: [
          { en: "He hasn't responded to my message yet.", ja: "彼はまだ私のメッセージに返事していません。", form: "responded" },
        ] },
        { id: "fix", word: "fix", meaning: "直す、固定する", examples: [
          { en: "I need to fix my computer.", ja: "パソコンを修理しないといけないんだ。", form: "fix" },
        ] },
        { id: "collect", word: "collect", meaning: "集める", examples: [
          { en: "She collects stamps as a hobby.", ja: "彼女は趣味で切手を集めています。", form: "collects" },
        ] },
        { id: "remain", word: "remain", meaning: "〜のままでいる", examples: [
          { en: "Please remain seated until the plane has come to a stop.", ja: "飛行機が止まるまで座ったままでいてください。", form: "remain" },
        ] },
        { id: "handle", word: "handle", meaning: "扱う", examples: [
          { en: "I can handle this situation.", ja: "この状況は私が対応できます。", form: "handle" },
        ] },
        { id: "realize", word: "realize", meaning: "悟る", examples: [
          { en: "I just realized I left my keys at home.", ja: "鍵を家に忘れたことに今気づきました。", form: "realized" },
        ] },
        { id: "reply", word: "reply", meaning: "返事する", examples: [
          { en: "Please reply to my email when you get a chance.", ja: "時間があるときにメールの返事をお願いします。", form: "reply" },
        ] },
        { id: "borrow", word: "borrow", meaning: "借りる", examples: [
          { en: "Can I borrow a pen?", ja: "ペンを借りてもいいですか？", form: "borrow" },
        ] },
        { id: "lend", word: "lend", meaning: "貸す", examples: [
          { en: "I'll lend you my book if you promise to return it.", ja: "ちゃんと返してくれるなら本を貸しますよ。", form: "lend" },
        ] },
      ],
    },
    {
      title: "名詞 ①",
      pos: "名詞",
      words: [
        { id: "potential", word: "potential", meaning: "見込み、可能性", examples: [
          { en: "She has a lot of potential to become a great artist.", ja: "彼女には素晴らしいアーティストになる素質があるよ。", form: "potential" },
        ] },
        { id: "responsibility", word: "responsibility", meaning: "職責、責任", examples: [
          { en: "Taking care of the project is my responsibility.", ja: "プロジェクトを管理するのは私の責任です。", form: "responsibility" },
        ] },
        { id: "admission", word: "admission", meaning: "入場料、入場許可", examples: [
          { en: "Admission to the zoo is free for children under 5.", ja: "5歳未満の子供は動物園の入場が無料です。", form: "Admission" },
        ] },
        { id: "attachment", word: "attachment", meaning: "添付物", examples: [
          { en: "Did you see the attachment in the email I sent?", ja: "送ったメールの添付ファイル見た？", form: "attachment" },
        ] },
        { id: "search", word: "search", meaning: "探すこと", examples: [
          { en: "The search for the missing keys took forever.", ja: "鍵を探すのにすごく時間がかかったよ。", form: "search" },
        ] },
        { id: "investment", word: "investment", meaning: "投資", examples: [
          { en: "Buying a house is a huge investment.", ja: "家を買うのは大きな投資だよね。", form: "investment" },
        ] },
        { id: "destination", word: "destination", meaning: "目的地", examples: [
          { en: "Our destination is only two hours away by car.", ja: "車で2時間のところに目的地があります。", form: "destination" },
        ] },
        { id: "statement", word: "statement", meaning: "明細書、発言", examples: [
          { en: "I just got my bank statement in the mail today.", ja: "今日、郵便で銀行の取引明細書が届いたよ。", form: "statement" },
        ] },
        { id: "insurance", word: "insurance", meaning: "保険", examples: [
          { en: "You should get travel insurance before going abroad.", ja: "海外に行く前に旅行保険に入ったほうがいいよ。", form: "insurance" },
        ] },
        { id: "signature", word: "signature", meaning: "署名", examples: [
          { en: "We need your signature on this form.", ja: "この用紙にサインをお願いします。", form: "signature" },
        ] },
      ],
    },
    {
      title: "名詞 ②",
      pos: "名詞",
      words: [
        { id: "inn", word: "inn", meaning: "宿、ホテル", examples: [
          { en: "We stayed at a cozy inn during our trip to the mountains.", ja: "山の旅行で居心地の良い宿に泊まりました。", form: "inn" },
        ] },
        { id: "loan", word: "loan", meaning: "融資、ローン", examples: [
          { en: "He just paid off his student loan.", ja: "彼は学生ローンをやっと返済しました。", form: "loan" },
        ] },
        { id: "guarantee", word: "guarantee", meaning: "保証", examples: [
          { en: "This phone comes with a one-year guarantee.", ja: "このスマホには1年間の保証がついています。", form: "guarantee" },
        ] },
        { id: "device", word: "device", meaning: "装置", examples: [
          { en: "This new device tracks your sleep patterns.", ja: "この新しいデバイスは睡眠パターンを記録します。", form: "device" },
        ] },
        { id: "scale", word: "scale", meaning: "規模、尺度", examples: [
          { en: "The project grew on a much larger scale than we expected.", ja: "プロジェクトは予想以上に大規模になりました。", form: "scale" },
        ] },
        { id: "entry", word: "entry", meaning: "入場、入力", examples: [
          { en: "The entry fee for the contest is $10.", ja: "そのコンテストのエントリー料は10ドルです。", form: "entry" },
        ] },
        { id: "forecast", word: "forecast", meaning: "予想、予測", examples: [
          { en: "The weather forecast says it'll rain tomorrow.", ja: "天気予報では明日は雨が降るそうです。", form: "forecast" },
        ] },
        { id: "novel", word: "novel", meaning: "小説", examples: [
          { en: "I'm reading a really interesting novel right now.", ja: "今、すごく面白い小説を読んでるんだ。", form: "novel" },
        ] },
        { id: "institution", word: "institution", meaning: "機関、団体", examples: [
          { en: "She works for a well-known financial institution.", ja: "彼女は有名な金融機関で働いています。", form: "institution" },
        ] },
        { id: "neighborhood", word: "neighborhood", meaning: "地域", examples: [
          { en: "This is a quiet neighborhood with lots of parks.", ja: "この地域は静かで公園がたくさんあります。", form: "neighborhood" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "athletic", word: "athletic", meaning: "運動の", examples: [
          { en: "He's very athletic and plays several sports.", ja: "彼はとても運動神経が良く、いくつかのスポーツをしている。", form: "athletic" },
        ] },
        { id: "suitable", word: "suitable", meaning: "適した", examples: [
          { en: "This outfit is suitable for the office party.", ja: "この服装はオフィスパーティーに適しているよ。", form: "suitable" },
        ] },
        { id: "outstanding", word: "outstanding", meaning: "優れた", examples: [
          { en: "She did an outstanding job on the presentation.", ja: "彼女はプレゼンで素晴らしい仕事をした。", form: "outstanding" },
        ] },
        { id: "temporary", word: "temporary", meaning: "一時的な", examples: [
          { en: "The shop is offering temporary discounts for the weekend.", ja: "店は週末限定で一時的な割引を提供している。", form: "temporary" },
        ] },
        { id: "confident", word: "confident", meaning: "自信がある", examples: [
          { en: "He's confident that he can pass the exam.", ja: "彼は試験に合格できると自信を持っている。", form: "confident" },
        ] },
        { id: "satisfied", word: "satisfied", meaning: "満足した", examples: [
          { en: "I'm very satisfied with the service at this restaurant.", ja: "このレストランのサービスにとても満足しています。", form: "satisfied" },
        ] },
        { id: "delighted", word: "delighted", meaning: "喜んでいる", examples: [
          { en: "I'm delighted to hear about your promotion!", ja: "君の昇進の話を聞いてとても嬉しいよ！", form: "delighted" },
        ] },
        { id: "efficient", word: "efficient", meaning: "効率的な", examples: [
          { en: "The new system is much more efficient than the old one.", ja: "新しいシステムは古いものよりもずっと効率的だ。", form: "efficient" },
        ] },
        { id: "effective", word: "effective", meaning: "効果的な", examples: [
          { en: "This method is very effective for improving language skills.", ja: "この方法は言語スキルを向上させるのにとても効果的だ。", form: "effective" },
        ] },
        { id: "overall", word: "overall", meaning: "全体の", examples: [
          { en: "The overall performance of the team was excellent.", ja: "チームの全体的なパフォーマンスは素晴らしかった。", form: "overall" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "involved", word: "involved", meaning: "関わった", examples: [
          { en: "She was heavily involved in the project from start to finish.", ja: "彼女はプロジェクトの最初から最後まで深く関わっていた。", form: "involved" },
        ] },
        { id: "secure", word: "secure", meaning: "安全な", examples: [
          { en: "Make sure your passwords are secure.", ja: "パスワードが安全であることを確認してね。", form: "secure" },
        ] },
        { id: "amazing", word: "amazing", meaning: "驚くべき、素晴らしい", examples: [
          { en: "The view from the top of the mountain was absolutely amazing.", ja: "山の頂上からの眺めは本当に素晴らしかった。", form: "amazing" },
        ] },
        { id: "permanent", word: "permanent", meaning: "永久的な、常設の", examples: [
          { en: "She got a permanent job after completing her internship.", ja: "彼女はインターンを終えて、正社員として雇われた。", form: "permanent" },
        ] },
        { id: "ancient", word: "ancient", meaning: "古代の", examples: [
          { en: "We visited some ancient ruins during our trip to Greece.", ja: "ギリシャ旅行中に古代の遺跡を訪れたよ。", form: "ancient" },
        ] },
        { id: "mechanical", word: "mechanical", meaning: "機械の", examples: [
          { en: "He's studying mechanical engineering at university.", ja: "彼は大学で機械工学を学んでいる。", form: "mechanical" },
        ] },
        { id: "sufficient", word: "sufficient", meaning: "十分な", examples: [
          { en: "We have sufficient time to finish the project.", ja: "プロジェクトを終わらせるのに十分な時間がある。", form: "sufficient" },
        ] },
        { id: "committed", word: "committed", meaning: "献身的な", examples: [
          { en: "She's committed to improving her skills every day.", ja: "彼女は毎日スキルの向上に献身的に取り組んでいる。", form: "committed" },
        ] },
        { id: "enjoyable", word: "enjoyable", meaning: "楽しい", examples: [
          { en: "The concert was really enjoyable; I had a great time.", ja: "コンサートは本当に楽しかったよ。", form: "enjoyable" },
        ] },
        { id: "steady", word: "steady", meaning: "着実な、安定した", examples: [
          { en: "He has a steady job and a stable income.", ja: "彼は安定した仕事と収入がある。", form: "steady" },
        ] },
      ],
    },
    {
      title: "副詞",
      pos: "副詞",
      words: [
        { id: "altogether", word: "altogether", meaning: "完全に", examples: [
          { en: "The experience was altogether unforgettable.", ja: "その経験は完全に忘れられないものだったよ。", form: "altogether" },
        ] },
        { id: "lately", word: "lately", meaning: "最近", examples: [
          { en: "Lately, I've been really busy with work.", ja: "最近、仕事でとても忙しいんだ。", form: "Lately" },
        ] },
        { id: "recently", word: "recently", meaning: "最近", examples: [
          { en: "I recently visited my parents in the countryside.", ja: "最近、田舎にいる両親を訪ねたよ。", form: "recently" },
        ] },
        { id: "barely", word: "barely", meaning: "ほとんど〜ない、かろうじて", examples: [
          { en: "I barely had time to finish the report before the deadline.", ja: "締め切り前にかろうじてレポートを終えたよ。", form: "barely" },
        ] },
        { id: "softly", word: "softly", meaning: "柔らかく、優しく", examples: [
          { en: "She spoke softly so she wouldn't wake the baby.", ja: "彼女は赤ちゃんを起こさないように優しく話した。", form: "softly" },
        ] },
        { id: "smoothly", word: "smoothly", meaning: "スムーズに、滑らかに", examples: [
          { en: "The meeting went smoothly without any issues.", ja: "会議は問題なくスムーズに進んだよ。", form: "smoothly" },
        ] },
        { id: "roughly", word: "roughly", meaning: "粗く、だいたい", examples: [
          { en: "The journey takes roughly three hours by car.", ja: "車での旅はだいたい3時間かかるよ。", form: "roughly" },
        ] },
        { id: "completely", word: "completely", meaning: "完全に", examples: [
          { en: "The project was completely finished by the deadline.", ja: "プロジェクトは締め切りまでに完全に終わったよ。", form: "completely" },
        ] },
        { id: "forward", word: "forward", meaning: "前方に", examples: [
          { en: "Please step forward and introduce yourself.", ja: "前に進んで自己紹介してください。", form: "forward" },
        ] },
        { id: "backward", word: "backward", meaning: "後方に", examples: [
          { en: "He took a step backward to avoid the puddle.", ja: "彼は水たまりを避けるために一歩後ろに下がった。", form: "backward" },
        ] },
      ],
    },
    {
      title: "前置詞 ①",
      pos: "前置詞",
      words: [
        { id: "during", word: "during", meaning: "〜の間中", examples: [
          { en: "She fell asleep during the movie.", ja: "映画の間に彼女は寝ちゃった。", form: "during" },
        ] },
        { id: "except", word: "except", meaning: "を除いて", examples: [
          { en: "Everyone went to the party except for me.", ja: "私以外みんなパーティーに行ったんだ。", form: "except" },
        ] },
        { id: "around", word: "around", meaning: "約、〜のまわりに", examples: [
          { en: "We walked around the park for an hour.", ja: "1時間ほど公園の周りを散歩したよ。", form: "around" },
        ] },
        { id: "under", word: "under", meaning: "〜の下に", examples: [
          { en: "The cat is hiding under the bed.", ja: "猫はベッドの下に隠れているよ。", form: "under" },
        ] },
        { id: "towards", word: "towards", meaning: "〜の方へ", examples: [
          { en: "He's walking towards the station.", ja: "彼は駅の方に向かって歩いている。", form: "towards" },
        ] },
        { id: "like", word: "like", meaning: "のように", examples: [
          { en: "She sings like a professional.", ja: "彼女はプロみたいに歌うよ。", form: "like" },
        ] },
        { id: "unlike", word: "unlike", meaning: "〜とは違って", examples: [
          { en: "Unlike her brother, she's really quiet.", ja: "彼女の兄とは違って、彼女はすごく静かだよ。", form: "Unlike" },
        ] },
        { id: "along", word: "along", meaning: "共に、沿って", examples: [
          { en: "We walked along the river.", ja: "川に沿って歩いたんだ。", form: "along" },
        ] },
        { id: "as", word: "as", meaning: "〜として", examples: [
          { en: "She works as a teacher.", ja: "彼女は教師として働いている。", form: "as" },
        ] },
        { id: "beside", word: "beside", meaning: "〜のそばに、〜の横に", examples: [
          { en: "He sat beside me during the meeting.", ja: "彼は会議中、私の隣に座ったんだ。", form: "beside" },
        ] },
      ],
    },
    {
      title: "前置詞 ②",
      pos: "前置詞",
      words: [
        { id: "beyond", word: "beyond", meaning: "〜の向こうに", examples: [
          { en: "The house is just beyond the hill.", ja: "その家は丘の向こうにあります。", form: "beyond" },
        ] },
        { id: "per", word: "per", meaning: "〜のあたり、〜毎に", examples: [
          { en: "The rent is $500 per month.", ja: "家賃は月500ドルです。", form: "per" },
        ] },
        { id: "via", word: "via", meaning: "〜経由で、（〜という手段）によって", examples: [
          { en: "We're going to Paris via London.", ja: "ロンドン経由でパリに行く予定です。", form: "via" },
        ] },
        { id: "within", word: "within", meaning: "以内に", examples: [
          { en: "Please submit your report within a week.", ja: "1週間以内にレポートを提出してください。", form: "within" },
        ] },
        { id: "over", word: "over", meaning: "の上を、を超えて", examples: [
          { en: "The plane flew over the mountains.", ja: "飛行機は山を越えて飛んだよ。", form: "over" },
        ] },
        { id: "without", word: "without", meaning: "〜なしで、〜を持たずに", examples: [
          { en: "He left without saying goodbye.", ja: "彼はさよならも言わずに行っちゃった。", form: "without" },
        ] },
        { id: "among", word: "among", meaning: "〜の中に", examples: [
          { en: "She was sitting among her friends at the cafe.", ja: "カフェで彼女は友達の中に座っていたよ。", form: "among" },
        ] },
        { id: "between", word: "between", meaning: "〜の間に", examples: [
          { en: "I sat between John and Sarah during the lecture.", ja: "講義中、ジョンとサラの間に座っていたんだ。", form: "between" },
        ] },
        { id: "despite", word: "despite", meaning: "〜にもかかわらず", examples: [
          { en: "Despite the rain, we went for a walk.", ja: "雨にもかかわらず、散歩に行ったよ。", form: "Despite" },
        ] },
        { id: "through", word: "through", meaning: "を通って、を通過して、〜まで", examples: [
          { en: "The train went through the tunnel.", ja: "電車はトンネルを通って行った。", form: "through" },
        ] },
      ],
    },
  ],
};
