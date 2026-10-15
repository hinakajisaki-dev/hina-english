// 単語帳 Week 2, from the teacher's slides「単語帳 week 2」: 100 words, two examples each.
// For the students the teacher gives it to (vocab_books); not everyone's yet (everyone: false).
// Same shape as week1.js. form is null where the word can't be marked in the sentence.

export const WEEK2 = {
  id: "w2",
  week: 2,
  title: "単語帳 Week 2",
  everyone: false,
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "know", word: "know", meaning: "知っている", examples: [
          { en: "Do you know any good restaurants around here?", ja: "この辺でいいレストラン知ってる?", note: "around here = この辺で。", form: "know" },
          { en: "I don't know, but I can check.", ja: "わからないけど、調べられるよ。", note: "I don't know のあとに but 〜 を続けると印象がやわらぐ。", form: "know" },
        ] },
        { id: "feel", word: "feel", meaning: "感じる", examples: [
          { en: "Feel free to ask any questions", ja: "気楽になんでも聞いてください", note: "Feel free to ~ 気楽に〇〇してね。feel free to grab a drink (ご自由に飲み物をとってください）", form: "Feel" },
          { en: "I feel like eating something sweet.", ja: "甘いものが食べたい気分。", note: "feel like + 動詞ing で『〜したい気分』。", form: "feel" },
        ] },
        { id: "try", word: "try", meaning: "やってみる", examples: [
          { en: "You should try this cake.", ja: "このケーキ試してみて。", note: "You should try 〜 で『〜試してみて』とおすすめできる。", form: "try" },
          { en: "I'll try my best.", ja: "がんばってみるね。", note: "try my best で『全力を尽くす・がんばる』。", form: "try" },
        ] },
        { id: "meet", word: "meet", meaning: "会う", examples: [
          { en: "Let's meet in front of the station.", ja: "駅の前で会おう。", note: "in front of 〜 = 〜の前で。待ち合わせの定番。", form: "meet" },
          { en: "It was nice meeting you.", ja: "会えてよかったです。", note: "It was nice meeting you. は初対面の別れ際のあいさつ。", form: "meeting" },
        ] },
        { id: "want", word: "want", meaning: "ほしい\n〜したい", examples: [
          { en: "I want to visit London someday.", ja: "いつかロンドンに行きたい。", note: "want to + 動詞 で『〜したい』。someday = いつか。", form: "want" },
          { en: "Do you want some coffee?", ja: "コーヒーいる?", note: "Do you want 〜? で『〜いる？』と気軽にすすめられる。", form: "want" },
        ] },
        { id: "like", word: "like", meaning: "好き", examples: [
          { en: "I really like this song.", ja: "この曲すごく好き。", note: "", form: "like" },
          { en: "Would you like something to drink?", ja: "何かお飲み物はいかがですか?", note: "Would you like 〜? は Do you want 〜? のていねい版。", form: "like" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "love", word: "love", meaning: "大好き", examples: [
          { en: "I love traveling with my friends.", ja: "友だちと旅行するのが大好き。", note: "love + 動詞ing で『〜するのが大好き』。", form: "love" },
          { en: "You'll love this place.", ja: "ここ、絶対気に入るよ。", note: "You'll love 〜 で『きっと気に入るよ』とおすすめできる。", form: "love" },
        ] },
        { id: "bring", word: "bring", meaning: "持ってくる", examples: [
          { en: "Can I bring my friend to the party?", ja: "パーティーに友だちを連れて行ってもいい?", note: "", form: "bring" },
          { en: "Don't forget to bring your umbrella.", ja: "傘を持ってくるのを忘れないで。", note: "Don't forget to + 動詞 で『〜を忘れないでね』。", form: "bring" },
        ] },
        { id: "show", word: "show", meaning: "見せる", examples: [
          { en: "Can you show me the way?", ja: "道を教えてくれる?", note: "", form: "show" },
          { en: "Let me show you a picture.", ja: "写真を見せるね。", note: "Let me show you 〜 で『〜を見せてあげる』。", form: "show" },
        ] },
        { id: "learn", word: "learn", meaning: "学ぶ", examples: [
          { en: "I'm learning English for my trip.", ja: "旅行のために英語を勉強しています。", note: "I'm learning 〜 で『いま〜を勉強中』。", form: "learning" },
          { en: "You learn fast!", ja: "覚えるの早いね!", note: "You learn fast! で『覚えるの早いね！』とほめ言葉に。", form: "learn" },
        ] },
        { id: "speak", word: "speak", meaning: "話す", examples: [
          { en: "Do you speak English?", ja: "英語を話しますか?", note: "言語を話すには speak を使う。Do you speak 〜? で聞ける。", form: "speak" },
          { en: "Could you speak a little louder?", ja: "もう少し大きな声で話してもらえますか?", note: "Could you 〜? でていねいなお願い。louder = もっと大きな声で。", form: "speak" },
        ] },
        { id: "listen", word: "listen", meaning: "聞く", examples: [
          { en: "I listen to music on the train.", ja: "電車で音楽を聴きます。", note: "listen to 〜 で『〜を聞く』。to を忘れずに。", form: "listen" },
          { en: "Listen, I have good news!", ja: "ねえ聞いて、いい知らせがあるの!", note: "文頭の Listen, は『ねえ、聞いて』と注意を引く言い方。", form: "Listen" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "easy", word: "easy", meaning: "簡単な", examples: [
          { en: "Don't worry, it's easy.", ja: "心配しないで、簡単だよ。", note: "セットで覚えると便利。", form: "easy" },
          { en: "Is it easy to get there?", ja: "そこへは簡単に行けますか?", note: "Is it easy to + 動詞? で『〜するのは簡単？』。", form: "easy" },
        ] },
        { id: "hard", word: "hard", meaning: "難しい、大変な", examples: [
          { en: "English is hard, but fun.", ja: "英語は難しいけど楽しい。", note: "difficult より口語的。", form: "hard" },
          { en: "It's hard to say.", ja: "何とも言えないなあ。", note: "It's hard to say. で『何とも言えない』の定番。", form: "hard" },
        ] },
        { id: "busy", word: "busy", meaning: "忙しい", examples: [
          { en: "Are you busy this weekend?", ja: "今週末、忙しい?", note: "Are you busy 〜? で予定を聞ける。this weekend = 今週末。", form: "busy" },
          { en: "Sorry, I've been really busy lately.", ja: "ごめん、最近すごく忙しくて。", note: "I've been busy で『ずっと忙しい』。lately = 最近。", form: "busy" },
        ] },
        { id: "free", word: "free", meaning: "暇な、無料の", examples: [
          { en: "Are you free tomorrow night?", ja: "明日の夜、空いてる?", note: "free は『暇な』。Are you free? で誘いの第一声に。", form: "free" },
          { en: "The museum is free on Mondays.", ja: "その美術館は月曜は無料です。", note: "", form: "free" },
        ] },
        { id: "new", word: "new", meaning: "新しい", examples: [
          { en: "I'm new here.", ja: "ここに来たばかりなんです。", note: "", form: "new" },
          { en: "Have you seen the new cafe?", ja: "あの新しいカフェ、見た?", note: "Have you seen 〜? で『〜もう見た？』。", form: "new" },
        ] },
        { id: "old", word: "old", meaning: "古い、年上の", examples: [
          { en: "How old is this building?", ja: "この建物、築何年?", note: "How old 〜? は人だけでなく建物や物にも使える。", form: "old" },
          { en: "My older brother lives in Tokyo.", ja: "兄は東京に住んでいます。", note: "older brother = 兄。年上を表す old。", form: "older" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "young", word: "young", meaning: "若い", examples: [
          { en: "You look so young!", ja: "すごく若く見えるね!", note: "You look + 形容詞 で『〜に見えるね』。", form: "young" },
          { en: "When I was young, I played soccer.", ja: "若いころはサッカーをしていました。", note: "When I was young で『若い頃は』と思い出話に。", form: "young" },
        ] },
        { id: "long", word: "long", meaning: "長い", examples: [
          { en: "How long does it take?", ja: "どのくらい時間がかかりますか?", note: "", form: "long" },
          { en: "Sorry for the long wait.", ja: "長らくお待たせしてすみません。", note: "Sorry for the long wait. で『お待たせ』と謝れる。", form: "long" },
        ] },
        { id: "short", word: "short", meaning: "短い", examples: [
          { en: "It's just a short walk from here.", ja: "ここから歩いてすぐです。", note: "", form: "short" },
          { en: "Let's take a short break.", ja: "少し休憩しよう。", note: "take a break = 休憩する。short を足して『少し休もう』。", form: "short" },
        ] },
        { id: "late", word: "late", meaning: "遅い", examples: [
          { en: "Sorry I'm late!", ja: "遅れてごめん!", note: "Sorry I'm late! は遅刻したときの定番。", form: "late" },
          { en: "It's getting late. I should go.", ja: "遅くなってきたね。そろそろ行かなきゃ。", note: "It's getting late. で『もう遅くなってきた』。帰る合図に。", form: "late" },
        ] },
        { id: "tired", word: "tired", meaning: "疲れた", examples: [
          { en: "You look tired. Are you okay?", ja: "疲れてるみたいだけど、大丈夫?", note: "You look tired. で相手を気づかえる。", form: "tired" },
          { en: "I'm so tired after the flight.", ja: "フライトの後ですごく疲れた。", note: "so tired で『くたくた』。after the flight = フライトの後。", form: "tired" },
        ] },
        { id: "happy", word: "happy", meaning: "うれしい", examples: [
          { en: "I'm so happy to see you!", ja: "会えてすごくうれしい!", note: "happy to + 動詞 で『〜できてうれしい』。", form: "happy" },
          { en: "Are you happy with your new job?", ja: "新しい仕事には満足してる?", note: "happy with 〜 で『〜に満足している』。", form: "happy" },
        ] },
      ],
    },
    {
      title: "副詞 ①",
      pos: "副詞",
      words: [
        { id: "usually", word: "usually", meaning: "たいてい", examples: [
          { en: "I usually have coffee for breakfast.", ja: "朝食はたいていコーヒーです。", note: "頻度の副詞は動詞の前に置く。", form: "usually" },
          { en: "What do you usually do on weekends?", ja: "週末はたいてい何をしてるの?", note: "What do you usually do? で相手の習慣を聞ける。", form: "usually" },
        ] },
        { id: "sometimes", word: "sometimes", meaning: "ときどき", examples: [
          { en: "I sometimes cook at home.", ja: "ときどき家で料理します。", note: "半分くらいの頻度。", form: "sometimes" },
          { en: "Sometimes I just want to relax.", ja: "ときどき、ただのんびりしたくなる。", note: "文頭に Sometimes を置く言い方も自然。", form: "Sometimes" },
        ] },
        { id: "never", word: "never", meaning: "決して〜ない", examples: [
          { en: "I've never been to Paris.", ja: "パリには行ったことがないんです。", note: "I've never been to 〜 で『〜に行ったことがない』。", form: "never" },
          { en: "Never mind, it's okay.", ja: "気にしないで、大丈夫。", note: "", form: "Never" },
        ] },
        { id: "always", word: "always", meaning: "いつも", examples: [
          { en: "I always get up at six.", ja: "いつも6時に起きます。", note: "get up = 起きる。", form: "always" },
          { en: "You're always so kind.", ja: "あなたはいつも本当に優しいね。", note: "You're always 〜 でほめ言葉にも使える。", form: "always" },
        ] },
        { id: "often", word: "often", meaning: "よく", examples: [
          { en: "How often do you come here?", ja: "ここにはどのくらいの頻度で来るの?", note: "", form: "often" },
          { en: "I often eat out on Fridays.", ja: "金曜はよく外食します。", note: "eat out = 外食する。", form: "often" },
        ] },
        { id: "really", word: "really", meaning: "本当に", examples: [
          { en: "This is really delicious!", ja: "これ、本当においしい!", note: "really + 形容詞 で『本当に〜』と強調できる。", form: "really" },
          { en: "Really? I didn't know that.", ja: "ほんとに?知らなかった。", note: "Really? だけで『えっ、そうなの？』と相づちに。", form: "Really" },
        ] },
      ],
    },
    {
      title: "接続詞 ①",
      pos: "接続詞",
      words: [
        { id: "but", word: "but", meaning: "でも", examples: [
          { en: "I want to go, but I'm busy.", ja: "行きたいけど、忙しいんだ。", note: "文と文をつなぐ基本の接続詞。", form: "but" },
          { en: "Sorry, but I have to leave now.", ja: "ごめん、でももう行かなきゃ。", note: "Sorry, but 〜 で言いにくいことを切り出せる。", form: "but" },
        ] },
        { id: "because", word: "because", meaning: "なぜなら", examples: [
          { en: "I like this cafe because it's quiet.", ja: "静かだから、このカフェが好き。", note: "because 〜 で理由を続けられる。quiet = 静かな。", form: "because" },
          { en: "I was late because of the train.", ja: "電車のせいで遅れました。", note: "because of + 名詞 で『〜のせいで』。", form: "because" },
        ] },
        { id: "so", word: "so", meaning: "だから", examples: [
          { en: "It was raining, so I stayed home.", ja: "雨だったから家にいたよ。", note: "理由→結果の順。", form: "so" },
          { en: "I was tired, so I went to bed early.", ja: "疲れていたので早く寝ました。", note: "because と逆で、so の後ろには結果が来る。", form: "so" },
        ] },
        { id: "if", word: "if", meaning: "もし", examples: [
          { en: "If you have time, let's get coffee.", ja: "時間があったら、コーヒーでも行こう。", note: "", form: "If" },
          { en: "Let me know if you need anything.", ja: "何か必要なら教えてね。", note: "", form: "if" },
        ] },
        { id: "when", word: "when", meaning: "〜のとき", examples: [
          { en: "When I was a kid, I lived here.", ja: "子どものころ、ここに住んでいました。", note: "When I was a kid で『子どもの頃』。", form: "When" },
          { en: "Call me when you get there.", ja: "着いたら電話してね。", note: "", form: "when" },
        ] },
        { id: "or", word: "or", meaning: "または", examples: [
          { en: "Coffee or tea?", ja: "コーヒーと紅茶、どっちにする?", note: "A or B? で『AとB、どっち？』と聞ける。", form: "or" },
          { en: "We can walk or take a taxi.", ja: "歩いてもいいし、タクシーでもいいよ。", note: "or で選択肢を並べられる。take a taxi = タクシーに乗る。", form: "or" },
        ] },
      ],
    },
    {
      title: "前置詞 ①",
      pos: "前置詞",
      words: [
        { id: "during", word: "during", meaning: "〜の間", examples: [
          { en: "I fell asleep during the movie.", ja: "映画の間に寝ちゃった。", note: "during + 名詞 で『〜の間に』。fall asleep = 眠り込む。", form: "during" },
          { en: "What did you do during the holidays?", ja: "休みの間、何してた?", note: "during the holidays = 休みの間。", form: "during" },
        ] },
        { id: "near", word: "near", meaning: "近くに", examples: [
          { en: "Is there a station near here?", ja: "この近くに駅はありますか?", note: "Is there 〜? とセットで便利。", form: "near" },
          { en: "I live near the beach.", ja: "海の近くに住んでいます。", note: "", form: "near" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "agree", word: "agree", meaning: "賛成する", examples: [
          { en: "I totally agree with you.", ja: "完全に同感だよ。", note: "agree with + 人 で『人に賛成する』。totally = 完全に。", form: "agree" },
          { en: "Do you agree with this plan?", ja: "この計画に賛成?", note: "Do you agree? で相手の意見を確かめられる。", form: "agree" },
        ] },
        { id: "disagree", word: "disagree", meaning: "反対する", examples: [
          { en: "Sorry, but I disagree.", ja: "悪いけど、私は反対だな。", note: "Sorry, but 〜 を添えるとやわらかく反対できる。", form: "disagree" },
          { en: "We disagree about small things sometimes.", ja: "たまに小さなことで意見が合わないんだ。", note: "disagree about 〜 で『〜について意見が合わない』。", form: "disagree" },
        ] },
        { id: "explain", word: "explain", meaning: "説明する", examples: [
          { en: "Can you explain it one more time?", ja: "もう一度説明してくれる?", note: "one more time = もう一回。聞き返すときに便利。", form: "explain" },
          { en: "Let me explain how it works.", ja: "仕組みを説明するね。", note: "Let me explain 〜 で『説明させて』。how it works = 仕組み。", form: "explain" },
        ] },
        { id: "mention", word: "mention", meaning: "ちょっと言う、話に出す", examples: [
          { en: "Did I mention I'm moving next month?", ja: "来月引っ越すって言ったっけ?", note: "", form: "mention" },
          { en: "She mentioned a good cafe near here.", ja: "彼女がこの近くのいいカフェの話をしてたよ。", note: "say より軽い。", form: "mentioned" },
        ] },
        { id: "promise", word: "promise", meaning: "約束する", examples: [
          { en: "I promise I'll be there.", ja: "絶対行くって約束するよ。", note: "", form: "promise" },
          { en: "You promised, remember?", ja: "約束したよね、覚えてる?", note: "remember? = 覚えてる？", form: "promised" },
        ] },
        { id: "expect", word: "expect", meaning: "予想する、期待する", examples: [
          { en: "I didn't expect to see you here!", ja: "ここで会うとは思わなかった!", note: "didn't expect to 〜 で『〜するとは思わなかった』。", form: "expect" },
          { en: "The trip was better than I expected.", ja: "旅行は予想以上によかったよ。", note: "better than I expected = 思ったより良かった。", form: "expected" },
        ] },
      ],
    },
    {
      title: "動詞 ④",
      pos: "動詞",
      words: [
        { id: "offer", word: "offer", meaning: "申し出る、提供する", examples: [
          { en: "He offered to help me.", ja: "彼が手伝うと申し出てくれたんだ。", note: "offer to + 動詞 で『〜しようかと申し出る』。", form: "offered" },
          { en: "They offer free drinks here.", ja: "ここは無料ドリンクを提供してるよ。", note: "free drinks = 無料ドリンク。", form: "offer" },
        ] },
        { id: "notice", word: "notice", meaning: "気づく", examples: [
          { en: "I didn't notice you were there!", ja: "そこにいたなんて気づかなかった!", note: "", form: "notice" },
          { en: "Did you notice anything different?", ja: "何か違うところに気づいた?", note: "", form: "notice" },
        ] },
        { id: "realize", word: "realize", meaning: "はっと気づく", examples: [
          { en: "I just realized I forgot my phone.", ja: "スマホを忘れたことに今気づいた。", note: "just realized で『いま気づいた』。", form: "realized" },
          { en: "I didn't realize it was so late.", ja: "こんなに遅い時間だとは気づかなかった。", note: "notice より頭の中の気づき。", form: "realize" },
        ] },
        { id: "avoid", word: "avoid", meaning: "避ける", examples: [
          { en: "I avoid crowded places.", ja: "混んでいる場所は避けるようにしてるんだ。", note: "avoid + 名詞 で『〜を避ける』。crowded = 混んでいる。", form: "avoid" },
          { en: "Let's avoid the rush hour.", ja: "ラッシュアワーは避けよう。", note: "rush hour = 通勤ラッシュ。avoid とセットで便利。", form: "avoid" },
        ] },
        { id: "share", word: "share", meaning: "共有する\n分け合う", examples: [
          { en: "Let's share this pizza.", ja: "このピザ、シェアしよう。", note: "Let's share 〜 で『〜を分けよう』。食事でよく使う。", form: "share" },
          { en: "Thanks for sharing your story.", ja: "話を聞かせてくれてありがとう。", note: "Thanks for + 動詞ing で『〜してくれてありがとう』。", form: "sharing" },
        ] },
        { id: "join", word: "join", meaning: "参加する", examples: [
          { en: "Can I join you?", ja: "一緒にいい?", note: "", form: "join" },
          { en: "Why don't you join us for lunch?", ja: "一緒にランチどう?", note: "Why don't you 〜? で『〜しない？』と誘える。", form: "join" },
        ] },
      ],
    },
    {
      title: "動詞 ⑤",
      pos: "動詞",
      words: [
        { id: "hear", word: "hear", meaning: "聞こえる", examples: [
          { en: "I heard this place is really good.", ja: "ここ、すごくいいって聞いたよ。", note: "I heard 〜 で『〜らしいよ』とうわさ話に使える。", form: "heard" },
          { en: "Sorry, I can't hear you well.", ja: "ごめん、よく聞こえないんだ。", note: "電話で便利。", form: "hear" },
        ] },
        { id: "write", word: "write", meaning: "書く", examples: [
          { en: "Could you write it down for me?", ja: "書いてもらえますか?", note: "write 〜 down で『書き留める』。Could you 〜? でていねいに。", form: "write" },
          { en: "I'll write you a message later.", ja: "あとでメッセージ書くね。", note: "write you a message = メッセージを送る。", form: "write" },
        ] },
        { id: "walk", word: "walk", meaning: "歩く", examples: [
          { en: "Let's walk to the park.", ja: "公園まで歩こう。", note: "walk to 〜 で『〜まで歩いて行く』。", form: "walk" },
          { en: "Can I walk there from here?", ja: "ここから歩いて行けますか?", note: "Can I walk there from here? で『歩いて行ける？』と聞ける。", form: "walk" },
        ] },
        { id: "arrive", word: "arrive", meaning: "到着する", examples: [
          { en: "What time does the train arrive?", ja: "電車は何時に着きますか?", note: "What time does 〜 arrive? で到着時間を聞ける。", form: "arrive" },
          { en: "Text me when you arrive.", ja: "着いたらメッセージしてね。", note: "Text me = メッセージしてね。when you arrive とセットで。", form: "arrive" },
        ] },
        { id: "remember", word: "remember", meaning: "覚えている", examples: [
          { en: "Do you remember me?", ja: "私のこと覚えてる?", note: "", form: "remember" },
          { en: "I can't remember his name.", ja: "彼の名前が思い出せない。", note: "", form: "remember" },
        ] },
        { id: "forget", word: "forget", meaning: "忘れる", examples: [
          { en: "Don't forget your passport!", ja: "パスポートを忘れないでね!", note: "", form: "forget" },
          { en: "I totally forgot about the meeting.", ja: "会議のこと、完全に忘れてた。", note: "forget about 〜 の形。", form: "forgot" },
        ] },
      ],
    },
    {
      title: "動詞 ⑥",
      pos: "動詞",
      words: [
        { id: "understand", word: "understand", meaning: "理解する", examples: [
          { en: "Do you understand what I mean?", ja: "言いたいこと、わかる?", note: "what I mean = 私の言いたいこと。", form: "understand" },
          { en: "Sorry, I don't understand.", ja: "すみません、わかりません。", note: "Sorry, I don't understand. は聞き返しの定番。", form: "understand" },
        ] },
        { id: "choose", word: "choose", meaning: "選ぶ", examples: [
          { en: "It's so hard to choose!", ja: "選ぶのがすごく難しい!", note: "It's so hard to choose! で『選べない〜！』。", form: "choose" },
          { en: "You can choose any seat you like.", ja: "好きな席を選んでいいよ。", note: "any + 名詞 you like で『好きな〜をどれでも』。", form: "choose" },
        ] },
        { id: "decide", word: "decide", meaning: "決める", examples: [
          { en: "Have you decided what to order?", ja: "注文は決まった?", note: "Have you decided 〜? で『もう決めた？』。注文の場面で定番。", form: "decided" },
          { en: "I decided to study abroad.", ja: "留学することに決めました。", note: "decide to + 動詞 で『〜すると決める』。study abroad = 留学する。", form: "decided" },
        ] },
        { id: "live", word: "live", meaning: "住む", examples: [
          { en: "Where do you live?", ja: "どこに住んでるの?", note: "", form: "live" },
          { en: "I've lived here for five years.", ja: "ここに5年住んでいます。", note: "I've lived here for 〜 で『ここに住んで〜になる』。", form: "lived" },
        ] },
        { id: "wear", word: "wear", meaning: "着る", examples: [
          { en: "What should I wear tomorrow?", ja: "明日、何を着ようかな?", note: "What should I wear? で『何を着ていけばいい？』。", form: "wear" },
          { en: "You should wear a jacket. It's cold.", ja: "上着を着たほうがいいよ。寒いから。", note: "You should wear 〜 で服装のアドバイスができる。", form: "wear" },
        ] },
        { id: "send", word: "send", meaning: "送る", examples: [
          { en: "I'll send you the photos later.", ja: "あとで写真を送るね。", note: "later = あとで。", form: "send" },
          { en: "Can you send me the address?", ja: "住所を送ってくれる?", note: "", form: "send" },
        ] },
      ],
    },
    {
      title: "形容詞 ③",
      pos: "形容詞",
      words: [
        { id: "sad", word: "sad", meaning: "悲しい", examples: [
          { en: "I was so sad to hear that.", ja: "それを聞いてとても悲しかった。", note: "sad to hear 〜 で『〜を聞いて悲しい』。", form: "sad" },
          { en: "Don't be sad. It'll be okay.", ja: "悲しまないで。大丈夫だよ。", note: "Don't be sad. で『悲しまないで』となぐさめられる。", form: "sad" },
        ] },
        { id: "angry", word: "angry", meaning: "怒った", examples: [
          { en: "Are you angry with me?", ja: "私に怒ってるの?", note: "angry with + 人 で『人に怒っている』。", form: "angry" },
          { en: "He gets angry easily.", ja: "彼はすぐ怒るんだ。", note: "get angry で『怒る』。easily = すぐに。", form: "angry" },
        ] },
        { id: "hungry", word: "hungry", meaning: "お腹がすいた", examples: [
          { en: "I'm so hungry! Let's eat.", ja: "お腹ぺこぺこ!食べよう。", note: "", form: "hungry" },
          { en: "Are you hungry yet?", ja: "もうお腹すいた?", note: "yet を付けると『もうお腹すいた？』のニュアンス。", form: "hungry" },
        ] },
        { id: "thirsty", word: "thirsty", meaning: "のどが渇いた", examples: [
          { en: "I'm thirsty. Let's get something to drink.", ja: "のど渇いた。何か飲みに行こう。", note: "", form: "thirsty" },
          { en: "Walking all day makes you thirsty.", ja: "一日中歩くとのどが渇くね。", note: "make + 人 + 形容詞 で『人を〜にさせる』。", form: "thirsty" },
        ] },
        { id: "beautiful", word: "beautiful", meaning: "美しい", examples: [
          { en: "What a beautiful view!", ja: "なんてきれいな眺め!", note: "What a + 形容詞 + 名詞! で『なんて〜な…！』と感動を表せる。", form: "beautiful" },
          { en: "The cherry blossoms are beautiful in spring.", ja: "春の桜は美しいです。", note: "cherry blossoms = 桜。in spring = 春に。", form: "beautiful" },
        ] },
        { id: "delicious", word: "delicious", meaning: "おいしい", examples: [
          { en: "This is delicious! What is it?", ja: "これおいしい!何ていう料理?", note: "This is delicious! はほめ言葉の定番。", form: "delicious" },
          { en: "Everything here looks delicious.", ja: "ここのは全部おいしそう。", note: "look + 形容詞 で『〜そうに見える』。", form: "delicious" },
        ] },
      ],
    },
    {
      title: "形容詞 ④",
      pos: "形容詞",
      words: [
        { id: "interesting", word: "interesting", meaning: "面白い(興味深い)", examples: [
          { en: "That's really interesting!", ja: "それはすごく面白いね!", note: "That's interesting! は相づちにも使える。", form: "interesting" },
          { en: "I read an interesting article today.", ja: "今日、面白い記事を読んだよ。", note: "article = 記事。an interesting 〜 の語順に注意。", form: "interesting" },
        ] },
        { id: "important", word: "important", meaning: "重要な", examples: [
          { en: "Family is the most important thing to me.", ja: "私にとって家族が一番大事です。", note: "the most important thing = いちばん大事なもの。", form: "important" },
          { en: "This is an important question.", ja: "これは大事な質問です。", note: "important question = 大事な質問。", form: "important" },
        ] },
        { id: "famous", word: "famous", meaning: "有名な", examples: [
          { en: "This temple is famous for its garden.", ja: "この寺は庭で有名です。", note: "famous for 〜 で『〜で有名』。", form: "famous" },
          { en: "What is this town famous for?", ja: "この町は何で有名なの?", note: "What is 〜 famous for? で名物を聞ける。", form: "famous" },
        ] },
        { id: "favorite", word: "favorite", meaning: "お気に入りの", examples: [
          { en: "What's your favorite food?", ja: "一番好きな食べ物は?", note: "What's your favorite 〜? で好みを聞ける定番。", form: "favorite" },
          { en: "This is my favorite spot in the city.", ja: "ここが街で一番お気に入りの場所なんだ。", note: "favorite spot = お気に入りの場所。", form: "favorite" },
        ] },
        { id: "expensive", word: "expensive", meaning: "(値段が)高い", examples: [
          { en: "Wow, that's expensive!", ja: "わあ、高いね!", note: "Wow, that's expensive! で『高っ！』。", form: "expensive" },
          { en: "Is it expensive to live in Tokyo?", ja: "東京の生活はお金がかかりますか?", note: "Is it expensive to + 動詞? で『〜するのは高い？』。", form: "expensive" },
        ] },
        { id: "cheap", word: "cheap", meaning: "安い", examples: [
          { en: "This shop is cheap and good.", ja: "この店は安くておいしいよ。", note: "cheap and good で『安くて良い』。", form: "cheap" },
          { en: "I found a cheap flight to Korea.", ja: "韓国行きの安い便を見つけた。", note: "cheap flight = 格安航空券。found = 見つけた。", form: "cheap" },
        ] },
      ],
    },
    {
      title: "副詞 ②",
      pos: "副詞",
      words: [
        { id: "very", word: "very", meaning: "とても", examples: [
          { en: "Thank you very much!", ja: "本当にありがとう!", note: "Thank you very much! の very。", form: "very" },
          { en: "The test was very difficult.", ja: "テストはとても難しかった。", note: "very + 形容詞 で『とても〜』と強調できる。", form: "very" },
        ] },
        { id: "too", word: "too", meaning: "〜すぎる、〜も", examples: [
          { en: "This bag is too heavy.", ja: "このカバン、重すぎる。", note: "too + 形容詞 で『〜すぎる』。", form: "too" },
          { en: "Nice to meet you too.", ja: "こちらこそ、はじめまして。", note: "文末の too は『〜も』。Nice to meet you too. で返せる。", form: "too" },
        ] },
        { id: "together", word: "together", meaning: "一緒に", examples: [
          { en: "Let's go together!", ja: "一緒に行こう!", note: "Let's 〜 together! で『一緒に〜しよう！』。", form: "together" },
          { en: "We often cook together on weekends.", ja: "週末はよく一緒に料理します。", note: "cook together = 一緒に料理する。", form: "together" },
        ] },
        { id: "again", word: "again", meaning: "もう一度", examples: [
          { en: "Could you say that again, please?", ja: "もう一度言ってもらえますか?", note: "Could you say that again? は聞き返しの定番。", form: "again" },
          { en: "Let's come here again!", ja: "またここに来ようね!", note: "", form: "again" },
        ] },
        { id: "well", word: "well", meaning: "上手に", examples: [
          { en: "You speak English very well!", ja: "英語すごく上手だね!", note: "speak 〜 well で『〜が上手』。ほめ言葉に。", form: "well" },
          { en: "I didn't sleep well last night.", ja: "昨夜はよく眠れなかった。", note: "sleep well で『よく眠る』。didn't sleep well = よく眠れなかった。", form: "well" },
        ] },
        { id: "maybe", word: "maybe", meaning: "たぶん", examples: [
          { en: "Maybe we can meet tomorrow.", ja: "たぶん明日会えるよ。", note: "文頭の Maybe で『たぶん〜かも』とやわらかく言える。", form: "Maybe" },
          { en: "Maybe you're right.", ja: "たぶんあなたが正しいね。", note: "Maybe you're right. で『そうかもね』。", form: "Maybe" },
        ] },
      ],
    },
    {
      title: "前置詞 ②",
      pos: "前置詞",
      words: [
        { id: "next-to", word: "next to", meaning: "〜のとなり", examples: [
          { en: "The cafe is next to the bank.", ja: "カフェは銀行のとなりです。", note: "場所の説明に。", form: "next to" },
          { en: "Can I sit next to you?", ja: "となりに座ってもいい?", note: "", form: "next to" },
        ] },
        { id: "in-front-of", word: "in front of", meaning: "〜の前", examples: [
          { en: "I'll wait in front of the hotel.", ja: "ホテルの前で待ってるね。", note: "待ち合わせの定番。", form: "in front of" },
          { en: "There's a taxi in front of the building.", ja: "建物の前にタクシーがいるよ。", note: "There's 〜 in front of ... で『…の前に〜があるよ』。", form: "in front of" },
        ] },
        { id: "between", word: "between", meaning: "〜の間", examples: [
          { en: "The shop is between the bank and the cafe.", ja: "その店は銀行とカフェの間にあります。", note: "between A and B で『AとBの間』。", form: "between" },
          { en: "Just between us, I'm quitting my job.", ja: "ここだけの話、仕事辞めるんだ。", note: "quit = 辞める。", form: "between" },
        ] },
        { id: "around", word: "around", meaning: "〜のまわり", examples: [
          { en: "Is there an ATM around here?", ja: "この辺にATMはありますか?", note: "Is there 〜? とセットで。", form: "around" },
          { en: "Let's walk around the city.", ja: "街を歩き回ろう。", note: "walk around 〜 で『〜をぶらぶら歩く』。", form: "around" },
        ] },
        { id: "over", word: "over", meaning: "〜の上を越えて", examples: [
          { en: "The restaurant is over there.", ja: "レストランはあそこだよ。", note: "指さしながら使える。", form: "over" },
          { en: "Come over to my place sometime!", ja: "今度うちに遊びに来てよ!", note: "come over で『(家に)遊びに来る』。sometime = そのうち。", form: "over" },
        ] },
        { id: "under", word: "under", meaning: "〜の下", examples: [
          { en: "Your bag is under the table.", ja: "カバンはテーブルの下にあるよ。", note: "", form: "under" },
          { en: "Kids under six are free.", ja: "6歳未満の子どもは無料です。", note: "under six = 6歳未満。free = 無料。", form: "under" },
        ] },
      ],
    },
    {
      title: "前置詞 ③",
      pos: "前置詞",
      words: [
        { id: "inside", word: "inside", meaning: "中に", examples: [
          { en: "It's cold. Let's go inside.", ja: "寒いね。中に入ろう。", note: "go inside で『中に入る』。", form: "inside" },
          { en: "What's inside the box?", ja: "箱の中には何が入ってるの?", note: "What's inside 〜? で『〜の中身は何？』。", form: "inside" },
        ] },
        { id: "outside", word: "outside", meaning: "外に", examples: [
          { en: "Let's eat outside. The weather is nice.", ja: "外で食べよう。天気がいいから。", note: "eat outside で『外で食べる』。", form: "outside" },
          { en: "Someone is waiting outside.", ja: "外で誰かが待ってるよ。", note: "wait outside = 外で待つ。", form: "outside" },
        ] },
      ],
    },
    {
      title: "動詞 ⑦",
      pos: "動詞",
      words: [
        { id: "describe", word: "describe", meaning: "説明する\n描写する", examples: [
          { en: "Can you describe what it looks like?", ja: "どんな見た目か説明してくれる?", note: "describe what it looks like = 見た目を説明する。", form: "describe" },
          { en: "It's hard to describe the taste.", ja: "その味を説明するのは難しいなあ。", note: "hard to describe で『言葉にしにくい』。", form: "describe" },
        ] },
        { id: "apologize", word: "apologize", meaning: "謝る", examples: [
          { en: "I want to apologize for being late.", ja: "遅れたことを謝りたいんだ。", note: "apologize for 〜 で『〜のことを謝る』。", form: "apologize" },
          { en: "You don't need to apologize.", ja: "謝らなくていいよ。", note: "You don't need to + 動詞 で『〜しなくていいよ』。", form: "apologize" },
        ] },
        { id: "complain", word: "complain", meaning: "不満を言う", examples: [
          { en: "He's always complaining about work.", ja: "彼はいつも仕事の愚痴を言ってるね。", note: "complain about 〜 で『〜の不満を言う』。", form: "complaining" },
          { en: "I don't want to complain, but it's cold in here.", ja: "文句を言いたくないけど、ここ寒いね。", note: "I don't want to complain, but 〜 でやんわり切り出せる。", form: "complain" },
        ] },
        { id: "celebrate", word: "celebrate", meaning: "お祝いする", examples: [
          { en: "Let's celebrate your new job!", ja: "新しい仕事のお祝いをしよう!", note: "Let's celebrate 〜! で『〜をお祝いしよう！』。", form: "celebrate" },
          { en: "How do you celebrate New Year's?", ja: "お正月はどうやってお祝いするの?", note: "How do you celebrate 〜? で行事の過ごし方を聞ける。", form: "celebrate" },
        ] },
        { id: "happen", word: "happen", meaning: "起こる", examples: [
          { en: "What happened to your arm?", ja: "腕、どうしたの?", note: "", form: "happened" },
          { en: "These things happen. Don't worry.", ja: "こういうことはあるよ。気にしないで。", note: "These things happen. で『よくあることだよ』となぐさめられる。", form: "happen" },
        ] },
        { id: "continue", word: "continue", meaning: "続ける", examples: [
          { en: "Please continue. I'm listening.", ja: "続けて。聞いてるよ。", note: "Please continue. で『続けてどうぞ』。", form: "continue" },
          { en: "I want to continue studying English.", ja: "英語の勉強を続けたいんです。", note: "continue + 動詞ing で『〜し続ける』。", form: "continue" },
        ] },
      ],
    },
    {
      title: "動詞 ⑧",
      pos: "動詞",
      words: [
        { id: "finish", word: "finish", meaning: "終える", examples: [
          { en: "I just finished work.", ja: "ちょうど仕事が終わったところ。", note: "", form: "finished" },
          { en: "Let me finish this first.", ja: "先にこれを終わらせるね。", note: "", form: "finish" },
        ] },
        { id: "prepare", word: "prepare", meaning: "準備する", examples: [
          { en: "I need to prepare for tomorrow.", ja: "明日の準備をしなくちゃ。", note: "prepare for 〜 で『〜の準備をする』。", form: "prepare" },
          { en: "She prepared a great dinner for us.", ja: "彼女が素敵な夕食を用意してくれたんだ。", note: "prepare dinner = 夕食を用意する。", form: "prepared" },
        ] },
        { id: "practice", word: "practice", meaning: "練習する", examples: [
          { en: "I practice English every day.", ja: "毎日英語を練習しています。", note: "practice + 目的語 で『〜を練習する』。every day = 毎日。", form: "practice" },
          { en: "Practice makes perfect!", ja: "練習あるのみだよ!", note: "Practice makes perfect! = 継続は力なり。", form: "Practice" },
        ] },
        { id: "improve", word: "improve", meaning: "上達する\n改善する", examples: [
          { en: "Your English is improving!", ja: "英語、上達してるね!", note: "be improving で『上達してきている』。ほめ言葉に。", form: "improving" },
          { en: "I want to improve my listening.", ja: "リスニングを上達させたいんです。", note: "improve my listening = リスニングを鍛える。", form: "improve" },
        ] },
        { id: "return", word: "return", meaning: "戻る、返す", examples: [
          { en: "I'll return this book tomorrow.", ja: "この本、明日返すね。", note: "return + 物 で『〜を返す』。", form: "return" },
          { en: "When do you return to your country?", ja: "いつ帰国するの?", note: "return to 〜 で『〜に戻る・帰る』。", form: "return" },
        ] },
        { id: "receive", word: "receive", meaning: "受け取る", examples: [
          { en: "Did you receive my email?", ja: "メール届いた?", note: "", form: "receive" },
          { en: "I received a gift from my friend.", ja: "友だちから贈り物を受け取ったんだ。", note: "receive a gift = プレゼントを受け取る。", form: "received" },
        ] },
      ],
    },
  ],
};
