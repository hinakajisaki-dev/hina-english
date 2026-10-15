// 単語帳 Week 3, from the teacher's slides「単語帳 week 3」: 100 words, two examples each.
// For the students the teacher gives it to (vocab_books); not everyone's yet (everyone: false).
// Same shape as week1.js. form is null where the word can't be marked in the sentence.

export const WEEK3 = {
  id: "w3",
  week: 3,
  title: "単語帳 Week 3",
  everyone: false,
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "enjoy", word: "enjoy", meaning: "楽しむ", examples: [
          { en: "Enjoy your meal!", ja: "お食事を楽しんでね!", note: "食事や休みに使える定番。", form: "Enjoy" },
          { en: "I really enjoyed talking with you.", ja: "あなたと話せて本当に楽しかった。", note: "enjoy + 動詞ing で『〜するのを楽しむ』。", form: "enjoyed" },
        ] },
        { id: "hope", word: "hope", meaning: "望む", examples: [
          { en: "I hope you have a great trip!", ja: "いい旅になりますように!", note: "I hope (that) 〜 で『〜だといいな』と願う。", form: "hope" },
          { en: "I hope to see you again.", ja: "また会えるといいな。", note: "hope to + 動詞 で『〜できたらいいな』。", form: "hope" },
        ] },
        { id: "plan", word: "plan", meaning: "計画する", examples: [
          { en: "What are you planning to do tomorrow?", ja: "明日は何をする予定?", note: "plan to + 動詞 で『〜する予定』。What are you planning? で予定を聞ける。", form: "planning" },
          { en: "We're planning a trip to Okinawa.", ja: "沖縄旅行を計画しています。", note: "", form: "planning" },
        ] },
        { id: "miss", word: "miss", meaning: "恋しく思う、逃す", examples: [
          { en: "I miss my family back home.", ja: "故郷の家族が恋しいです。", note: "miss + 人/物 で『〜が恋しい』。back home = 故郷で。", form: "miss" },
          { en: "Hurry up, or we'll miss the train!", ja: "急いで、電車に乗り遅れちゃう!", note: "miss the train で『電車に乗り遅れる』。同じ miss でも意味が違う。", form: "miss" },
        ] },
        { id: "cook", word: "cook", meaning: "料理する", examples: [
          { en: "Do you like to cook?", ja: "料理は好き?", note: "Do you like to cook? で『料理は好き？』。", form: "cook" },
          { en: "My husband cooks better than me.", ja: "夫のほうが私より料理が上手なの。", note: "比較の than を使って『〜より上手』と言える。", form: "cooks" },
        ] },
        { id: "clean", word: "clean", meaning: "掃除する", examples: [
          { en: "I clean my room every Sunday.", ja: "毎週日曜に部屋を掃除します。", note: "clean + 場所 で『〜を掃除する』。", form: "clean" },
          { en: "Could you clean the table, please?", ja: "テーブルを片付けてもらえますか?", note: "Could you 〜, please? でていねいなお願い。", form: "clean" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "check", word: "check", meaning: "確認する", examples: [
          { en: "Let me check my schedule.", ja: "予定を確認させて。", note: "", form: "check" },
          { en: "Can you check the map?", ja: "地図を確認してくれる?", note: "", form: "check" },
        ] },
        { id: "change", word: "change", meaning: "変える", examples: [
          { en: "I need to change my reservation.", ja: "予約を変更したいのですが。", note: "change + 名詞 で『〜を変える』。予約や予定によく使う。", form: "change" },
          { en: "You haven't changed at all!", ja: "全然変わってないね!", note: "久しぶりの再会で。", form: "changed" },
        ] },
        { id: "spend", word: "spend", meaning: "(時間/お金を)使う", examples: [
          { en: "How do you spend your weekends?", ja: "週末はどう過ごしてるの?", note: "spend + 時間 で『(時間を)過ごす』。How do you spend 〜? で聞ける。", form: "spend" },
          { en: "I spent too much money shopping.", ja: "買い物でお金を使いすぎた。", note: "spend + お金 (+ on 〜) で『お金を使う』。", form: "spent" },
        ] },
        { id: "borrow", word: "borrow", meaning: "借りる", examples: [
          { en: "Can I borrow your pen?", ja: "ペンを借りてもいい?", note: "", form: "borrow" },
          { en: "I borrowed this book from the library.", ja: "この本は図書館で借りました。", note: "borrow A from B で『BからAを借りる』。", form: "borrowed" },
        ] },
        { id: "lend", word: "lend", meaning: "貸す", examples: [
          { en: "Could you lend me some money?", ja: "お金を少し貸してくれる?", note: "borrow(借りる)とセットで覚える。", form: "lend" },
          { en: "I'll lend you my umbrella.", ja: "傘を貸してあげるよ。", note: "lend + 人 + 物 で『人に物を貸す』。", form: "lend" },
        ] },
        { id: "hate", word: "hate", meaning: "大嫌い", examples: [
          { en: "I hate waiting in line.", ja: "並んで待つのが大嫌い。", note: "hate + 動詞ing で『〜するのが大嫌い』。", form: "hate" },
          { en: "I hate to say this, but we should go.", ja: "言いにくいんだけど、もう行かなきゃ。", note: "I hate to say this, but 〜 で言いにくいことを切り出せる。", form: "hate" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "warm", word: "warm", meaning: "暖かい", examples: [
          { en: "It's getting warm these days.", ja: "最近暖かくなってきたね。", note: "get warm で『暖かくなる』。these days = 最近。", form: "warm" },
          { en: "This coat is really warm.", ja: "このコート、すごく暖かいよ。", note: "warm は服や飲み物の『暖かさ』にも使える。", form: "warm" },
        ] },
        { id: "cool", word: "cool", meaning: "涼しい、かっこいい", examples: [
          { en: "That's so cool!", ja: "それ、めっちゃかっこいい!", note: "ほめ言葉の定番。", form: "cool" },
          { en: "It's nice and cool in the morning.", ja: "朝は気持ちよく涼しいね。", note: "", form: "cool" },
        ] },
        { id: "right", word: "right", meaning: "正しい、右", examples: [
          { en: "You're right. Let's do that.", ja: "あなたの言う通りだね。そうしよう。", note: "You're right. で『その通り』と相手に同意できる。", form: "right" },
          { en: "Turn right at the corner.", ja: "角を右に曲がってください。", note: "turn right で『右に曲がる』。道案内で使う right。", form: "right" },
        ] },
        { id: "wrong", word: "wrong", meaning: "間違った", examples: [
          { en: "Sorry, I got the wrong train.", ja: "ごめん、電車を間違えた。", note: "got the wrong train = 電車を間違えた。", form: "wrong" },
          { en: "Is something wrong?", ja: "何かあった?", note: "Is something wrong? で『どうかした？』と気づかえる。", form: "wrong" },
        ] },
        { id: "kind", word: "kind", meaning: "親切な", examples: [
          { en: "Everyone here is so kind.", ja: "ここの人はみんなとても親切だね。", note: "人柄をほめるときに。", form: "kind" },
          { en: "That's very kind of you.", ja: "ご親切にありがとう。", note: "That's very kind of you. で『ご親切にどうも』。", form: "kind" },
        ] },
        { id: "friendly", word: "friendly", meaning: "気さくな", examples: [
          { en: "People in this town are really friendly.", ja: "この町の人は本当に気さくだね。", note: "friendly は『気さくな・親しみやすい』。", form: "friendly" },
          { en: "She's friendly to everyone.", ja: "彼女は誰にでも気さくなんだ。", note: "friendly to 〜 で『〜に親切』。", form: "friendly" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "quiet", word: "quiet", meaning: "静かな", examples: [
          { en: "Let's find a quiet cafe.", ja: "静かなカフェを探そう。", note: "場所の雰囲気を表す。", form: "quiet" },
          { en: "It's so quiet at night here.", ja: "ここは夜、すごく静かだね。", note: "", form: "quiet" },
        ] },
        { id: "noisy", word: "noisy", meaning: "うるさい", examples: [
          { en: "This street is a bit noisy.", ja: "この通りはちょっとうるさいね。", note: "quiet の反対。", form: "noisy" },
          { en: "Sorry, it's noisy here. Can you hear me?", ja: "ごめん、ここうるさくて。聞こえる?", note: "電話などで It's noisy here. と状況を伝えられる。", form: "noisy" },
        ] },
        { id: "clean-adj", word: "clean", meaning: "きれいな", examples: [
          { en: "The streets here are so clean!", ja: "ここの通りはすごくきれいだね!", note: "", form: "clean" },
          { en: "I like this hotel. It's clean and quiet.", ja: "このホテル好き。きれいで静かだし。", note: "clean and quiet のように形容詞を並べて言える。", form: "clean" },
        ] },
        { id: "dirty", word: "dirty", meaning: "汚い", examples: [
          { en: "My shoes got dirty in the rain.", ja: "雨で靴が汚れちゃった。", note: "get dirty で『汚れる』。", form: "dirty" },
          { en: "The table is a little dirty.", ja: "テーブルが少し汚れています。", note: "a little dirty で『少し汚れている』とやわらかく言える。", form: "dirty" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "accept", word: "accept", meaning: "受け入れる", examples: [
          { en: "I accepted the job offer!", ja: "その仕事のオファーを受けたよ!", note: "accept + 名詞 で『〜を受け入れる』。job offer = 仕事のオファー。", form: "accepted" },
          { en: "It's hard to accept, but it's true.", ja: "受け入れがたいけど、本当なんだ。", note: "hard to accept で『受け入れがたい』。", form: "accept" },
        ] },
        { id: "refuse", word: "refuse", meaning: "断る", examples: [
          { en: "She refused my help.", ja: "彼女は私の助けを断ったんだ。", note: "refuse + 名詞 で『〜を断る』。", form: "refused" },
          { en: "I can't refuse free food!", ja: "タダの食べ物は断れないよ!", note: "", form: "refuse" },
        ] },
        { id: "allow", word: "allow", meaning: "許可する", examples: [
          { en: "They don't allow photos here.", ja: "ここは写真撮影が許可されていません。", note: "allow + 名詞 で『〜を許可する』。don't allow = 禁止。", form: "allow" },
          { en: "My parents allowed me to travel alone.", ja: "両親が一人旅を許してくれたんだ。", note: "allow + 人 + to + 動詞 で『人に〜を許す』。", form: "allowed" },
        ] },
        { id: "let", word: "let", meaning: "〜させてあげる", examples: [
          { en: "Let me help you with that.", ja: "それ、手伝わせて。", note: "Let me + 動詞 で『〜させて』。申し出の定番。", form: "Let" },
          { en: "My boss let me leave early.", ja: "上司が早退させてくれたんだ。", note: "let + 人 + 動詞 で『人に〜させてあげる』。", form: "let" },
        ] },
        { id: "keep", word: "keep", meaning: "〜し続ける、保つ", examples: [
          { en: "Keep going! You're almost there.", ja: "その調子!もうすぐだよ。", note: "Keep going! で『その調子！』と励ませる。", form: "Keep" },
          { en: "I keep forgetting his name.", ja: "彼の名前を何度も忘れちゃうんだ。", note: "keep + 動詞ing で『〜し続ける』。keep forgetting = 何度も忘れる。", form: "keep" },
        ] },
        { id: "save", word: "save", meaning: "節約する、とっておく", examples: [
          { en: "I'm saving for a new car.", ja: "新しい車のために貯金してるんだ。", note: "save (money) for 〜 で『〜のために貯金する』。", form: "saving" },
          { en: "Save some cake for me!", ja: "ケーキ、私の分もとっておいてね!", note: "Save some for me! = 残しておいてね。", form: "Save" },
        ] },
      ],
    },
    {
      title: "動詞 ④",
      pos: "動詞",
      words: [
        { id: "waste", word: "waste", meaning: "無駄にする", examples: [
          { en: "Don't waste your time on that.", ja: "そんなことに時間を無駄にしないで。", note: "waste time on 〜 で『〜に時間を無駄にする』。", form: "waste" },
          { en: "I wasted money on things I don't use.", ja: "使わないものにお金を無駄遣いしちゃった。", note: "waste money on 〜 で『〜にお金を無駄遣いする』。", form: "wasted" },
        ] },
        { id: "hurry", word: "hurry", meaning: "急ぐ", examples: [
          { en: "Hurry up! We're late!", ja: "急いで!遅れちゃう!", note: "Hurry up! で『急いで！』。", form: "Hurry" },
          { en: "No need to hurry. We have time.", ja: "急がなくていいよ。時間はあるから。", note: "No need to hurry. で『急がなくていいよ』。", form: "hurry" },
        ] },
        { id: "relax", word: "relax", meaning: "くつろぐ", examples: [
          { en: "Just relax and enjoy the trip.", ja: "リラックスして旅を楽しんで。", note: "relax で『くつろぐ・落ち着く』。", form: "relax" },
          { en: "I relax by taking a long bath.", ja: "長風呂でリラックスするんだ。", note: "relax by + 動詞ing で『〜してリラックスする』。", form: "relax" },
        ] },
        { id: "worry", word: "worry", meaning: "心配する", examples: [
          { en: "Don't worry about me.", ja: "私のことは心配しないで。", note: "Don't worry about 〜 で『〜を心配しないで』。", form: "worry" },
          { en: "I worry too much sometimes.", ja: "私、ときどき心配しすぎちゃうんだよね。", note: "", form: "worry" },
        ] },
        { id: "treat", word: "treat", meaning: "おごる、扱う", examples: [
          { en: "I'll treat you to dinner tonight.", ja: "今夜は夕食をおごるよ。", note: "treat + 人 (to 〜) で『人に(〜を)おごる』。", form: "treat" },
          { en: "He treats everyone kindly.", ja: "彼は誰にでも優しく接するね。", note: "treat も『扱う』。treats everyone kindly = みんなに優しく接する。", form: "treats" },
        ] },
        { id: "mind", word: "mind", meaning: "気にする", examples: [
          { en: "Do you mind if I sit here?", ja: "ここに座ってもいいですか?", note: "Do you mind if I 〜? で『〜してもいい？』とていねいに聞ける。", form: "mind" },
          { en: "I don't mind at all.", ja: "全然気にしないよ。", note: "I don't mind. で『気にしないよ』と快諾できる。", form: "mind" },
        ] },
      ],
    },
    {
      title: "形容詞 ③",
      pos: "形容詞",
      words: [
        { id: "common", word: "common", meaning: "よくある、共通の", examples: [
          { en: "That's a common mistake.", ja: "それはよくある間違いだよ。", note: "", form: "common" },
          { en: "It's common to tip in the U.S.", ja: "アメリカではチップが一般的です。", note: "It's common to + 動詞 で『〜するのは一般的』。", form: "common" },
        ] },
        { id: "rare", word: "rare", meaning: "珍しい", examples: [
          { en: "Snow is rare in this city.", ja: "この街で雪は珍しいんです。", note: "common の反対。", form: "rare" },
          { en: "That's a rare chance. Take it!", ja: "めったにないチャンスだよ。つかんで!", note: "", form: "rare" },
        ] },
        { id: "normal", word: "normal", meaning: "普通の", examples: [
          { en: "Is this normal here?", ja: "これってここでは普通なの?", note: "Is this normal? で『これって普通？』。", form: "normal" },
          { en: "It's normal to feel nervous.", ja: "緊張するのは普通のことだよ。", note: "It's normal to + 動詞 で『〜するのは普通』と安心させられる。", form: "normal" },
        ] },
        { id: "serious", word: "serious", meaning: "深刻な、真剣な", examples: [
          { en: "Is it serious?", ja: "それって深刻なの?", note: "Is it serious? = 大丈夫？", form: "serious" },
          { en: "I'm serious about learning English.", ja: "英語学習には真剣なんです。", note: "serious about 〜 で『〜に本気』。", form: "serious" },
        ] },
        { id: "strict", word: "strict", meaning: "厳しい", examples: [
          { en: "My parents were strict about time.", ja: "両親は時間に厳しかったんです。", note: "strict about 〜 で『〜に厳しい』。", form: "strict" },
          { en: "The rules here are quite strict.", ja: "ここのルールはけっこう厳しいね。", note: "", form: "strict" },
        ] },
        { id: "honest", word: "honest", meaning: "正直な", examples: [
          { en: "To be honest, I didn't like it.", ja: "正直に言うと、好きじゃなかった。", note: "To be honest, 〜 で『正直に言うと』。本音を切り出せる。", form: "honest" },
          { en: "He's honest about his feelings.", ja: "彼は自分の気持ちに正直だね。", note: "honest about 〜 で『〜に正直』。", form: "honest" },
        ] },
      ],
    },
    {
      title: "形容詞 ④",
      pos: "形容詞",
      words: [
        { id: "shy", word: "shy", meaning: "内気な", examples: [
          { en: "I was really shy as a kid.", ja: "子どものころは本当に内気だったんです。", note: "shy は『内気な・恥ずかしがりの』。", form: "shy" },
          { en: "Don't be shy! Say hello.", ja: "恥ずかしがらないで!あいさつしてみて。", note: "", form: "shy" },
        ] },
        { id: "talkative", word: "talkative", meaning: "おしゃべりな", examples: [
          { en: "My sister is really talkative.", ja: "姉はすごくおしゃべりなんです。", note: "人柄を表す。", form: "talkative" },
          { en: "He gets talkative after a drink.", ja: "彼はお酒が入るとおしゃべりになるね。", note: "", form: "talkative" },
        ] },
        { id: "lazy", word: "lazy", meaning: "怠け者の", examples: [
          { en: "I feel lazy on rainy days.", ja: "雨の日はだらだらしちゃう。", note: "feel lazy で『だらだらしたい気分』。", form: "lazy" },
          { en: "My cat is so lazy!", ja: "うちの猫、超怠け者なの!", note: "ペットにも使える。", form: "lazy" },
        ] },
        { id: "patient", word: "patient", meaning: "気長な\n忍耐強い", examples: [
          { en: "Thank you for being so patient.", ja: "気長に待ってくれてありがとう。", note: "Thank you for being patient. で感謝。", form: "patient" },
          { en: "Be patient. It takes time.", ja: "焦らないで。時間がかかるものだから。", note: "Be patient. で『焦らないで』と落ち着かせられる。", form: "patient" },
        ] },
      ],
    },
    {
      title: "副詞 ①",
      pos: "副詞",
      words: [
        { id: "recently", word: "recently", meaning: "最近", examples: [
          { en: "I moved here recently.", ja: "最近ここに引っ越してきたんです。", note: "過去や現在完了と使う。", form: "recently" },
          { en: "Have you seen him recently?", ja: "最近、彼に会った?", note: "Have you 〜 recently? で『最近〜した？』。", form: "recently" },
        ] },
        { id: "lately", word: "lately", meaning: "ここのところ", examples: [
          { en: "I've been busy lately.", ja: "ここのところ忙しくて。", note: "現在完了とよく使う。", form: "lately" },
          { en: "What have you been up to lately?", ja: "最近どうしてた?", note: "What have you been up to lately? で『最近どう？』の定番。", form: "lately" },
        ] },
        { id: "suddenly", word: "suddenly", meaning: "突然", examples: [
          { en: "It suddenly started raining.", ja: "突然雨が降り出したんだ。", note: "動詞の前や文頭に置く。", form: "suddenly" },
          { en: "He suddenly changed his mind.", ja: "彼が突然気を変えたの。", note: "suddenly changed his mind = 急に気を変えた。", form: "suddenly" },
        ] },
        { id: "immediately", word: "immediately", meaning: "すぐに", examples: [
          { en: "I'll call you back immediately.", ja: "すぐに折り返し電話するね。", note: "at once と同じ。", form: "immediately" },
          { en: "She replied immediately.", ja: "彼女はすぐに返信をくれたよ。", note: "replied immediately で『すぐ返信した』。", form: "immediately" },
        ] },
        { id: "probably", word: "probably", meaning: "たぶん、おそらく", examples: [
          { en: "It'll probably rain tomorrow.", ja: "明日はたぶん雨だね。", note: "maybe より高い確率。", form: "probably" },
          { en: "He's probably still at work.", ja: "彼はおそらくまだ仕事中だよ。", note: "He's probably 〜 で『たぶん〜だろう』と推測できる。", form: "probably" },
        ] },
        { id: "especially", word: "especially", meaning: "特に", examples: [
          { en: "I love Japanese food, especially sushi.", ja: "日本食が大好き、特に寿司がね。", note: "例を強調するときに。", form: "especially" },
          { en: "It's cold here, especially at night.", ja: "ここは寒いよ、特に夜はね。", note: "文末に especially at night のように付けられる。", form: "especially" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ①",
      words: [
        { id: "hometown", word: "hometown", meaning: "地元、故郷", examples: [
          { en: "My hometown is near Osaka.", ja: "地元は大阪の近くです。", note: "", form: "hometown" },
          { en: "What's your hometown like?", ja: "地元はどんなところ?", note: "", form: "hometown" },
        ] },
        { id: "be-from", word: "be from", meaning: "〜出身である", examples: [
          { en: "I'm from Japan. How about you?", ja: "日本出身です。あなたは?", note: "自己紹介の定番。", form: "from" },
          { en: "Where are you from originally?", ja: "もともとはどこの出身?", note: "Where are you from? で出身を聞ける。originally = もともと。", form: "from" },
        ] },
        { id: "be-born", word: "be born", meaning: "生まれる", examples: [
          { en: "I was born in Tokyo.", ja: "東京で生まれました。", note: "受け身の形。", form: "born" },
          { en: "Where were you born?", ja: "どこで生まれたの?", note: "", form: "born" },
        ] },
        { id: "grow-up", word: "grow up", meaning: "育つ", examples: [
          { en: "I grew up in a small town.", ja: "小さな町で育ちました。", note: "過去形は grew up。", form: "grew up" },
          { en: "Did you grow up around here?", ja: "この辺で育ったの?", note: "", form: "grow up" },
        ] },
        { id: "move-to", word: "move to", meaning: "〜に引っ越す", examples: [
          { en: "I moved to Tokyo three years ago.", ja: "3年前に東京に引っ越しました。", note: "move to + 場所 で『〜に引っ越す』。", form: "moved to" },
          { en: "We're moving to a bigger place.", ja: "もっと広いところに引っ越すんだ。", note: "〜 ago で『〜前に』。three years ago = 3年前。", form: "moving to" },
        ] },
        { id: "abroad", word: "abroad", meaning: "海外に", examples: [
          { en: "Have you ever lived abroad?", ja: "海外に住んだことある?", note: "live/work/go とセットで。to は不要。", form: "abroad" },
          { en: "I want to work abroad someday.", ja: "いつか海外で働きたい。", note: "work abroad で『海外で働く』。", form: "abroad" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ②",
      words: [
        { id: "overseas", word: "overseas", meaning: "海外の", examples: [
          { en: "I have some overseas friends.", ja: "海外の友だちがいます。", note: "overseas friends = 海外の友だち。", form: "overseas" },
          { en: "She's on an overseas trip now.", ja: "彼女は今、海外旅行中です。", note: "副詞でも使い、on an overseas trip = 海外旅行中。", form: "overseas" },
        ] },
        { id: "local", word: "local", meaning: "地元の", examples: [
          { en: "I want to try some local food.", ja: "地元の食べ物を試してみたい。", note: "local food = 地元の料理。", form: "local" },
          { en: "The locals are very friendly here.", ja: "ここの地元の人はとても親切だね。", note: "the locals で『地元の人たち』。", form: "locals" },
        ] },
        { id: "foreigner", word: "foreigner", meaning: "外国人", examples: [
          { en: "There are many foreigners in this area.", ja: "このエリアには外国人が多いです。", note: "", form: "foreigners" },
          { en: "As a foreigner, I love this city.", ja: "外国人として、この街が大好きです。", note: "As a foreigner, 〜 で『外国人として〜』。", form: "foreigner" },
        ] },
        { id: "for-the-first-time", word: "for the first time", meaning: "初めて", examples: [
          { en: "I tried sushi for the first time.", ja: "初めて寿司を食べました。", note: "文末に置く。", form: "for the first time" },
          { en: "I'm visiting Europe for the first time.", ja: "初めてヨーロッパに来ています。", note: "現在進行形と合わせて『初めて〜している』も言える。", form: "for the first time" },
        ] },
        { id: "introduce", word: "introduce", meaning: "紹介する", examples: [
          { en: "Let me introduce myself.", ja: "自己紹介させてください。", note: "", form: "introduce" },
          { en: "I'll introduce you to my friend.", ja: "友だちを紹介するね。", note: "introduce A to B で『AをBに紹介する』。", form: "introduce" },
        ] },
        { id: "nice-to-meet-you", word: "Nice to meet you.", meaning: "はじめまして", examples: [
          { en: "Nice to meet you. I'm Ken.", ja: "はじめまして、ケンです。", note: "初対面のあいさつ。I'm 〜 と名前を続ける。", form: "Nice to meet you" },
          { en: "It was nice meeting you!", ja: "お会いできてよかったです!", note: "別れ際は It was nice meeting you! と過去形で。", form: "nice meeting you" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ③",
      words: [
        { id: "coworker", word: "coworker", meaning: "同僚", examples: [
          { en: "I'm here with my coworkers.", ja: "同僚と来ています。", note: "colleague とほぼ同じ。", form: "coworkers" },
          { en: "My coworkers are really nice.", ja: "同僚たちは本当にいい人たちです。", note: "with my coworkers で『同僚と』。", form: "coworkers" },
        ] },
        { id: "customer", word: "customer", meaning: "客", examples: [
          { en: "We have many customers from overseas.", ja: "海外からのお客様が多いです。", note: "customer は『客・顧客』。", form: "customers" },
          { en: "The customer always comes first.", ja: "お客様第一です。", note: "", form: "customer" },
        ] },
        { id: "part-time", word: "part-time", meaning: "パート\nアルバイトの", examples: [
          { en: "I have a part-time job at a cafe.", ja: "カフェでアルバイトをしています。", note: "", form: "part-time" },
          { en: "She works part-time on weekends.", ja: "彼女は週末にパートで働いています。", note: "work part-time で『パートで働く』。", form: "part-time" },
        ] },
        { id: "full-time", word: "full-time", meaning: "フルタイムの", examples: [
          { en: "I work full-time now.", ja: "今はフルタイムで働いています。", note: "part-time の反対。", form: "full-time" },
          { en: "Is it a full-time position?", ja: "それはフルタイムの仕事ですか?", note: "a full-time position で『正社員の仕事』。", form: "full-time" },
        ] },
        { id: "freelance", word: "freelance", meaning: "フリーランスの", examples: [
          { en: "I'm a freelance English coach.", ja: "フリーランスの英語コーチです。", note: "", form: "freelance" },
          { en: "Freelance work gives me freedom.", ja: "フリーランスの仕事は自由があります。", note: "", form: "Freelance" },
        ] },
        { id: "business-trip", word: "business trip", meaning: "出張", examples: [
          { en: "I'm here on a business trip.", ja: "出張で来ています。", note: "on a business trip で『出張で』。", form: "business trip" },
          { en: "How often do you go on business trips?", ja: "出張はどのくらいの頻度で行くの?", note: "go on a business trip で『出張に行く』。", form: "business trips" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ④",
      words: [
        { id: "day-off", word: "day off", meaning: "休みの日", examples: [
          { en: "Tomorrow is my day off.", ja: "明日は休みなんです。", note: "", form: "day off" },
          { en: "What do you do on your days off?", ja: "休みの日は何してるの?", note: "on your days off で『休みの日に』。", form: "days off" },
        ] },
        { id: "take-a-break", word: "take a break", meaning: "休憩する", examples: [
          { en: "Let's take a break.", ja: "休憩しよう。", note: "", form: "take a break" },
          { en: "You should take a break sometimes.", ja: "たまには休んだほうがいいよ。", note: "", form: "take a break" },
        ] },
        { id: "retire", word: "retire", meaning: "退職する", examples: [
          { en: "My father retired last year.", ja: "父は去年退職しました。", note: "retire は『退職する・引退する』。", form: "retired" },
          { en: "I want to travel after I retire.", ja: "退職したら旅行したいな。", note: "after I retire で『退職したら』。", form: "retire" },
        ] },
        { id: "quit", word: "quit", meaning: "辞める", examples: [
          { en: "I quit my job last month.", ja: "先月仕事を辞めました。", note: "quit + 名詞 で『〜を辞める』。過去形も quit。", form: "quit" },
          { en: "Don't quit! You can do it.", ja: "諦めないで!できるよ。", note: "", form: "quit" },
        ] },
        { id: "get-a-job", word: "get a job", meaning: "就職する", examples: [
          { en: "I got a job at a hotel.", ja: "ホテルに就職しました。", note: "get a job at 〜 = 〜に就職。", form: "got a job" },
          { en: "It's hard to get a job these days.", ja: "最近は就職が難しいね。", note: "It's hard to get a job. で『就職が難しい』。", form: "get a job" },
        ] },
        { id: "look-for", word: "look for", meaning: "探す", examples: [
          { en: "I'm looking for a new job.", ja: "新しい仕事を探しています。", note: "", form: "looking for" },
          { en: "What are you looking for?", ja: "何を探してるの?", note: "", form: "looking for" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ⑤",
      words: [
        { id: "work-from-home", word: "work from home", meaning: "在宅勤務する", examples: [
          { en: "I work from home twice a week.", ja: "週2回、在宅勤務しています。", note: "", form: "work from home" },
          { en: "Do you like working from home?", ja: "在宅勤務は好き?", note: "twice a week = 週2回。頻度を添えられる。", form: "working from home" },
        ] },
        { id: "commute", word: "commute", meaning: "通勤する", examples: [
          { en: "I commute by train.", ja: "電車で通勤しています。", note: "commute by 〜 = 〜で通勤。", form: "commute" },
          { en: "How long is your commute?", ja: "通勤時間はどのくらい?", note: "", form: "commute" },
        ] },
        { id: "major", word: "major", meaning: "専攻", examples: [
          { en: "What was your major?", ja: "専攻は何だったの?", note: "What was your major? で聞ける。", form: "major" },
          { en: "My major was economics.", ja: "専攻は経済学でした。", note: "", form: "major" },
        ] },
        { id: "graduate", word: "graduate", meaning: "卒業する", examples: [
          { en: "I graduated five years ago.", ja: "5年前に卒業しました。", note: "", form: "graduated" },
          { en: "She just graduated from college.", ja: "彼女は大学を卒業したばかりです。", note: "graduate from 〜 で『〜を卒業する』。", form: "graduated" },
        ] },
        { id: "study-abroad", word: "study abroad", meaning: "留学する", examples: [
          { en: "I studied abroad in Canada.", ja: "カナダに留学していました。", note: "", form: "studied abroad" },
          { en: "I want my kids to study abroad.", ja: "子どもたちには留学してほしいな。", note: "want 人 to study abroad で『人に留学してほしい』。", form: "study abroad" },
        ] },
        { id: "workplace", word: "workplace", meaning: "職場", examples: [
          { en: "My workplace is near the station.", ja: "職場は駅の近くです。", note: "", form: "workplace" },
          { en: "How's your new workplace?", ja: "新しい職場はどう?", note: "", form: "workplace" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ⑥",
      words: [
        { id: "experience", word: "experience", meaning: "経験", examples: [
          { en: "It was a great experience.", ja: "すばらしい経験でした。", note: "a great experience = いい経験。", form: "experience" },
          { en: "Do you have any teaching experience?", ja: "教えた経験はありますか?", note: "", form: "experience" },
        ] },
        { id: "used-to", word: "used to", meaning: "以前は〜していた", examples: [
          { en: "I used to live in Nagoya.", ja: "以前は名古屋に住んでいました。", note: "used to + 動詞 で『以前は〜していた』(今は違う)。", form: "used to" },
          { en: "I used to play tennis in school.", ja: "学生時代はテニスをしていました。", note: "過去の習慣を表す。used to live = 昔住んでいた。", form: "used to" },
        ] },
        { id: "i-work-as", word: "I work as ...", meaning: "〜として働いています", examples: [
          { en: "I work as an English coach.", ja: "英語コーチとして働いています。", note: "work as + 職業 で『〜として働く』。", form: "I work as" },
          { en: "She works as a nurse.", ja: "彼女は看護師として働いています。", note: "She works as a nurse. のように主語を変えて使える。", form: "works as" },
        ] },
        { id: "apply-for", word: "apply for", meaning: "応募する、申し込む", examples: [
          { en: "I applied for a new job.", ja: "新しい仕事に応募したんだ。", note: "apply for 〜 で『〜に応募する』。", form: "applied for" },
          { en: "You should apply for that position!", ja: "そのポジションに応募してみなよ!", note: "", form: "apply for" },
        ] },
        { id: "earn", word: "earn", meaning: "稼ぐ", examples: [
          { en: "She earns more than me.", ja: "彼女は私より稼いでるんだ。", note: "earn は『(お金を)稼ぐ』。", form: "earns" },
          { en: "I want to earn enough to travel.", ja: "旅行できるくらい稼ぎたいな。", note: "earn enough to + 動詞 で『〜できるだけ稼ぐ』。", form: "earn" },
        ] },
        { id: "hire", word: "hire", meaning: "雇う", examples: [
          { en: "They're hiring new staff now.", ja: "今、新しいスタッフを募集してるよ。", note: "be hiring = 求人中。", form: "hiring" },
          { en: "We hired two people last month.", ja: "先月2人採用したんです。", note: "hire + 人数 で『〜人を採用する』。", form: "hired" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ⑦",
      words: [
        { id: "manage", word: "manage", meaning: "管理する、なんとかする", examples: [
          { en: "She manages a small team.", ja: "彼女は小さなチームを管理しています。", note: "manage a team = チームをまとめる。", form: "manages" },
          { en: "Don't worry, I can manage.", ja: "心配しないで、なんとかできるから。", note: "I can manage. で『なんとかなる』。", form: "manage" },
        ] },
        { id: "own", word: "own", meaning: "所有する", examples: [
          { en: "Do you own or rent your place?", ja: "家は持ち家?賃貸?", note: "own or rent = 持ち家か賃貸か。", form: "own" },
          { en: "She owns a small cafe.", ja: "彼女は小さなカフェを持っているんです。", note: "", form: "owns" },
        ] },
        { id: "run-a-business", word: "run a business", meaning: "会社を経営する", examples: [
          { en: "My friend runs a business in Tokyo.", ja: "友だちが東京で会社を経営しているんです。", note: "", form: "runs a business" },
          { en: "Running a business is not easy.", ja: "会社を経営するのは簡単じゃないね。", note: "Running a business is 〜 と動名詞で主語にできる。", form: "Running a business" },
        ] },
        { id: "be-in-charge-of", word: "be in charge of", meaning: "〜の担当である", examples: [
          { en: "I'm in charge of marketing.", ja: "マーケティングを担当しています。", note: "be in charge of 〜 で『〜の担当だ』。", form: "in charge of" },
          { en: "Who's in charge of this project?", ja: "このプロジェクトの担当は誰?", note: "", form: "in charge of" },
        ] },
        { id: "be-responsible-for", word: "be responsible for", meaning: "〜に責任がある", examples: [
          { en: "I'm responsible for training new staff.", ja: "新人の教育を担当しています。", note: "", form: "responsible for" },
          { en: "He's responsible for the whole event.", ja: "彼がイベント全体の責任者です。", note: "responsible for the whole 〜 = 〜全体の責任者。", form: "responsible for" },
        ] },
        { id: "focus-on", word: "focus on", meaning: "〜に集中する", examples: [
          { en: "I want to focus on my English this year.", ja: "今年は英語に集中したいんです。", note: "", form: "focus on" },
          { en: "Let's focus on one thing at a time.", ja: "一度に一つのことに集中しよう。", note: "one thing at a time で『一度に一つずつ』。", form: "focus on" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ⑧",
      words: [
        { id: "be-used-to", word: "be used to", meaning: "〜に慣れている", examples: [
          { en: "I'm used to waking up early.", ja: "早起きには慣れています。", note: "be used to + 名詞/動詞ing で『〜に慣れている』。used to(以前は)と混同注意。", form: "used to" },
          { en: "I'm not used to spicy food.", ja: "辛い食べ物には慣れていないんです。", note: "", form: "used to" },
        ] },
        { id: "get-promoted", word: "get promoted", meaning: "昇進する", examples: [
          { en: "I got promoted last month!", ja: "先月昇進したんだ!", note: "", form: "got promoted" },
          { en: "She got promoted to manager.", ja: "彼女はマネージャーに昇進しました。", note: "get promoted to 〜 で『〜に昇進する』。", form: "got promoted" },
        ] },
        { id: "work-overtime", word: "work overtime", meaning: "残業する", examples: [
          { en: "I worked overtime all week.", ja: "今週はずっと残業だったよ。", note: "", form: "worked overtime" },
          { en: "We barely work overtime.", ja: "残業はめったにしません。", note: "barely = めったに〜ない", form: "work overtime" },
        ] },
        { id: "make-a-living", word: "make a living", meaning: "生計を立てる", examples: [
          { en: "He makes a living as a writer.", ja: "彼はライターとして生計を立てています。", note: "", form: "makes a living" },
          { en: "It's hard to make a living doing that.", ja: "それで食べていくのは大変だね。", note: "make a living (by) doing 〜 で『〜で食べていく』。", form: "make a living" },
        ] },
        { id: "challenging", word: "challenging", meaning: "やりがいのある、大変な", examples: [
          { en: "My job is challenging but fun.", ja: "私の仕事は大変だけど楽しいんです。", note: "challenging は『やりがいがある・骨が折れる』。前向きな『大変』。", form: "challenging" },
          { en: "That sounds like a challenging project.", ja: "それはやりがいのあるプロジェクトみたいだね。", note: "sounds challenging で『やりがいありそう』。", form: "challenging" },
        ] },
        { id: "stressful", word: "stressful", meaning: "ストレスの多い", examples: [
          { en: "Moving is so stressful.", ja: "引っ越しって本当にストレスだよね。", note: "", form: "stressful" },
          { en: "I had a stressful week.", ja: "ストレスの多い一週間だったよ。", note: "", form: "stressful" },
        ] },
      ],
    },
    {
      title: "自己紹介・出身・仕事 ⑨",
      words: [
        { id: "flexible", word: "flexible", meaning: "柔軟な、融通がきく", examples: [
          { en: "My schedule is pretty flexible.", ja: "私のスケジュールはわりと融通がききます。", note: "flexible は『融通がきく・柔軟な』。schedule によく使う。", form: "flexible" },
          { en: "We need a flexible plan.", ja: "柔軟な計画が必要だね。", note: "", form: "flexible" },
        ] },
        { id: "stable", word: "stable", meaning: "安定した", examples: [
          { en: "I want a stable income.", ja: "安定した収入がほしいな。", note: "stable income = 安定した収入。", form: "stable" },
          { en: "His job is very stable.", ja: "彼の仕事はとても安定しています。", note: "", form: "stable" },
        ] },
      ],
    },
  ],
};
