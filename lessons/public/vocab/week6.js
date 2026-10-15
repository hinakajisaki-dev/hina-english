// 単語帳 Week 6, from the teacher's slides「単語帳 week 6」: 100 words, two examples each.
// For the students the teacher gives it to (vocab_books); not everyone's yet (everyone: false).
// Same shape as week1.js. form is null where the word can't be marked in the sentence.

export const WEEK6 = {
  id: "w6",
  week: 6,
  title: "単語帳 Week 6",
  everyone: false,
  groups: [
    {
      title: "感情・リアクション ①",
      words: [
        { id: "excited", word: "excited", meaning: "ワクワクした", pos: "形容詞", examples: [
          { en: "I'm so excited about the trip!", ja: "旅行がすごく楽しみ!", note: "be excited about / for 〜。", form: "excited" },
          { en: "Are you excited for the concert?", ja: "コンサート、楽しみ?", note: "exciting(物がワクワクさせる)と区別。", form: "excited" },
        ] },
        { id: "surprised", word: "surprised", meaning: "驚いた", pos: "形容詞", examples: [
          { en: "I was surprised to see you here!", ja: "ここで会えるなんてびっくり!", note: "be surprised to 〜 で『〜して驚く』。", form: "surprised" },
          { en: "Don't be surprised, but I got the job!", ja: "驚かないでね、あの仕事に受かったの!", note: "Don't be surprised, but 〜 で驚く話を切り出せる。", form: "surprised" },
        ] },
        { id: "nervous", word: "nervous", meaning: "緊張した", pos: "形容詞", examples: [
          { en: "I was so nervous before the interview.", ja: "面接の前、すごく緊張した。", note: "nervous は『緊張した』。before the interview = 面接前。", form: "nervous" },
          { en: "Don't be nervous. You'll do great.", ja: "緊張しないで。きっとうまくいくよ。", note: "Don't be nervous. で『緊張しないで』と励ませる。", form: "nervous" },
        ] },
        { id: "worried", word: "worried", meaning: "心配した", pos: "形容詞", examples: [
          { en: "I was worried about you!", ja: "心配してたんだよ!", note: "be worried about 〜 で『〜を心配する』。", form: "worried" },
          { en: "Don't worry, everything's fine.", ja: "心配しないで、全部大丈夫だから。", note: "Don't worry. とセットで覚えると便利。", form: "worry" },
        ] },
        { id: "scared", word: "scared", meaning: "怖い", pos: "形容詞", examples: [
          { en: "I'm scared of heights.", ja: "高いところが怖いんです。", note: "be scared of 〜 で『〜が怖い』。", form: "scared" },
          { en: "The movie was so scary!", ja: "映画が怖すぎてビビった!", note: "scary(物が怖い)と scared(人が怖がる)を区別。", form: "scary" },
        ] },
        { id: "glad", word: "glad", meaning: "うれしい", pos: "形容詞", examples: [
          { en: "I'm so glad you came!", ja: "来てくれて本当にうれしい!", note: "I'm glad (that) 〜 で『〜でうれしい』。", form: "glad" },
          { en: "I'm glad it worked out.", ja: "うまくいってよかったね。", note: "work out = うまくいく。", form: "glad" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ②",
      words: [
        { id: "proud", word: "proud", meaning: "誇りに思う", pos: "形容詞", examples: [
          { en: "I'm proud of you!", ja: "あなたを誇りに思うよ!", note: "be proud of 〜 で『〜を誇りに思う』。", form: "proud" },
          { en: "She's proud of her hometown.", ja: "彼女は地元を誇りに思っています。", note: "Hometown = 地元", form: "proud" },
        ] },
        { id: "grateful", word: "grateful", meaning: "感謝している", pos: "形容詞", examples: [
          { en: "I'm so grateful for your help.", ja: "助けてくれて本当に感謝してるよ。", note: "be grateful for 〜 で『〜に感謝する』。", form: "grateful" },
          { en: "I'm grateful to have friends like you.", ja: "あなたみたいな友だちがいてありがたい。", note: "grateful to have 〜 で『〜がいて感謝』。", form: "grateful" },
        ] },
        { id: "relaxed", word: "relaxed", meaning: "リラックスした", pos: "形容詞", examples: [
          { en: "I feel so relaxed here.", ja: "ここにいるとすごくリラックスできる。", note: "relaxed は『(人が)リラックスした』。", form: "relaxed" },
          { en: "He always looks relaxed.", ja: "彼はいつもリラックスして見えるね。", note: "relaxing(物が癒す)と区別。", form: "relaxed" },
        ] },
        { id: "comfortable", word: "comfortable", meaning: "心地よい", pos: "形容詞", examples: [
          { en: "This sofa is so comfortable.", ja: "このソファ、すごく心地いい。", note: "comfortable は『心地よい・快適な』。", form: "comfortable" },
          { en: "Make yourself comfortable.", ja: "楽にしてね。", note: "Make yourself at home. = （誰かを家に招いた時）楽にしてくつろいでねという意味", form: "comfortable" },
        ] },
        { id: "embarrassed", word: "embarrassed", meaning: "恥ずかしい", pos: "形容詞", examples: [
          { en: "I was so embarrassed!", ja: "めちゃくちゃ恥ずかしかった!", note: "embarrassed は『恥ずかしい・きまりが悪い』。", form: "embarrassed" },
          { en: "Don't be embarrassed. It happens.", ja: "恥ずかしがらないで。よくあることだよ。", note: "It happens = よくあることだよ、そういうことあるよね", form: "embarrassed" },
        ] },
        { id: "disappointed", word: "disappointed", meaning: "がっかりした", pos: "形容詞", examples: [
          { en: "I was disappointed with the movie.", ja: "その映画にはがっかりした。", note: "be disappointed with/in 〜 で『〜にがっかり』。", form: "disappointed" },
          { en: "Don't be disappointed. There's next time.", ja: "がっかりしないで。次があるよ。", note: "", form: "disappointed" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ③",
      words: [
        { id: "upset", word: "upset", meaning: "動揺した", pos: "形容詞", examples: [
          { en: "Why are you so upset?", ja: "なんでそんなに怒ってるの?", note: "", form: "upset" },
          { en: "She was upset about the news.", ja: "彼女はその知らせに動揺していました。", note: "be upset about 〜 で『〜に腹を立てる/動揺する』。", form: "upset" },
        ] },
        { id: "annoyed", word: "annoyed", meaning: "イライラした", pos: "形容詞", examples: [
          { en: "I get annoyed by loud noises.", ja: "大きな音にイライラするんだよね。", note: "be annoyed by 〜 で『〜にイライラする』。", form: "annoyed" },
          { en: "He looked a little annoyed.", ja: "彼は少しイライラしてるみたいだった。", note: "a little annoyed = ちょっとイラッと。", form: "annoyed" },
        ] },
        { id: "confused", word: "confused", meaning: "混乱した", pos: "形容詞", examples: [
          { en: "I'm confused. Can you explain again?", ja: "混乱しちゃった。もう一度説明してくれる?", note: "I'm confused. で『よくわからない』と伝えられる。", form: "confused" },
          { en: "The map made me more confused.", ja: "地図を見たら余計わからなくなった。", note: "", form: "confused" },
        ] },
        { id: "curious", word: "curious", meaning: "興味津々の", pos: "形容詞", examples: [
          { en: "I'm curious about your country.", ja: "あなたの国に興味があるんです。", note: "be curious about 〜 で『〜に興味津々』。", form: "curious" },
          { en: "Kids are curious about everything.", ja: "子どもは何にでも興味津々だね。", note: "知的好奇心を表す。", form: "curious" },
        ] },
        { id: "jealous", word: "jealous", meaning: "うらやましい", pos: "形容詞", examples: [
          { en: "You went to Hawaii? I'm so jealous!", ja: "ハワイに行ったの?うらやましい!", note: "I'm jealous! で『いいなあ・うらやましい』。", form: "jealous" },
          { en: "I'm jealous of your English skills.", ja: "あなたの英語力がうらやましいよ。", note: "be jealous of 〜 で『〜がうらやましい』。", form: "jealous" },
        ] },
        { id: "lucky", word: "lucky", meaning: "運がいい", pos: "形容詞", examples: [
          { en: "You're so lucky!", ja: "ほんと運がいいね!", note: "You're so lucky! で『いいなあ・運がいいね』。", form: "lucky" },
          { en: "We were lucky with the weather.", ja: "天気に恵まれてラッキーだったね。", note: "lucky with 〜 で『〜に恵まれる』。", form: "lucky" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ④",
      words: [
        { id: "impressed", word: "impressed", meaning: "感心した", pos: "形容詞", examples: [
          { en: "I'm impressed! Great job!", ja: "感心したよ!よくやった!", note: "be impressed (by 〜) で『(〜に)感心する』。", form: "impressed" },
          { en: "I was impressed by the service.", ja: "そのサービスには感心しました。", note: "impressive(印象的な)→形容詞", form: "impressed" },
        ] },
        { id: "shocked", word: "shocked", meaning: "ショックを受けた、驚いた", pos: "形容詞", examples: [
          { en: "I was shocked to hear the news.", ja: "その知らせを聞いてショックだった。", note: "be shocked to 〜 で『〜してショックを受ける』。", form: "shocked" },
          { en: "She looked shocked.", ja: "彼女はショックを受けた様子だった。", note: "surprised より衝撃が強い。", form: "shocked" },
        ] },
        { id: "awesome", word: "awesome", meaning: "最高の", pos: "形容詞", examples: [
          { en: "That's awesome!", ja: "それ最高じゃん!", note: "That's awesome! はリアクションの定番。", form: "awesome" },
          { en: "We had an awesome time!", ja: "最高に楽しい時間だった!", note: "", form: "awesome" },
        ] },
        { id: "wonderful", word: "wonderful", meaning: "すばらしい", pos: "形容詞", examples: [
          { en: "What a wonderful surprise!", ja: "なんてすてきなサプライズ!", note: "What a wonderful 〜! で感嘆できる。", form: "wonderful" },
          { en: "We had a wonderful dinner.", ja: "すばらしい夕食でした。", note: "", form: "wonderful" },
        ] },
        { id: "incredible", word: "incredible", meaning: "信じられない", pos: "形容詞", examples: [
          { en: "The fireworks were incredible!", ja: "花火は信じられないほどすごかった!", note: "", form: "incredible" },
          { en: "That's an incredible story.", ja: "それは信じられないような話だね。", note: "良いことにも驚きにも使える。", form: "incredible" },
        ] },
        { id: "terrible", word: "terrible", meaning: "ひどい", pos: "形容詞", examples: [
          { en: "The traffic was terrible today.", ja: "今日の渋滞はひどかった。", note: "", form: "terrible" },
          { en: "I feel terrible about that.", ja: "それについては本当に申し訳なく思ってる。", note: "feel terrible で『申し訳なく思う/気分が悪い』。", form: "terrible" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ⑤",
      words: [
        { id: "crazy", word: "crazy", meaning: "おかしい", pos: "形容詞", examples: [
          { en: "That's crazy!", ja: "それはすごいね(信じられない)!", note: "That's crazy! で『やばい・信じられない』。", form: "crazy" },
          { en: "Things have been crazy at work.", ja: "仕事がやばいくらい忙しくて。", note: "crazy busy = めちゃくちゃ忙しい。", form: "crazy" },
        ] },
        { id: "weird", word: "weird", meaning: "変な", pos: "形容詞", examples: [
          { en: "That's weird. The door was open.", ja: "変だな。ドアが開いてた。", note: "", form: "weird" },
          { en: "I had a weird dream last night.", ja: "昨夜、変な夢を見たんだ。", note: "a weird dream = 変な夢。", form: "weird" },
        ] },
        { id: "what-a-coincidence", word: "What a coincidence!", meaning: "すごい偶然!", examples: [
          { en: "You're from Osaka too? What a coincidence!", ja: "あなたも大阪出身?すごい偶然!", note: "", form: "What a coincidence" },
          { en: "What a coincidence meeting you here!", ja: "ここで会うなんてすごい偶然だね!", note: "思いがけず共通点が見つかったときに。", form: "What a coincidence" },
        ] },
        { id: "exactly", word: "Exactly.", meaning: "その通り", examples: [
          { en: "Exactly! That's what I mean.", ja: "その通り!そういうことなの。", note: "強く同意するときに使う", form: "Exactly" },
          { en: "Exactly. I feel the same way.", ja: "ほんとその通り。私も同じ気持ち。", note: "", form: "Exactly" },
        ] },
        { id: "definitely", word: "Definitely.", meaning: "間違いなく", examples: [
          { en: "Will you come again? / Definitely!", ja: "また来る?/もちろん!", note: "", form: "Definitely" },
          { en: "This is definitely the best ramen here.", ja: "これは間違いなくここで一番のラーメンだよ。", note: "副詞として文中でも使える。", form: "definitely" },
        ] },
        { id: "of-course", word: "Of course.", meaning: "もちろん", examples: [
          { en: "Can you help me? / Of course.", ja: "手伝ってくれる?/もちろん。", note: "", form: "Of course" },
          { en: "Of course you can come!", ja: "もちろん来ていいよ!", note: "Of course you can! で『もちろんいいよ』。", form: "Of course" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ⑥",
      words: [
        { id: "i-know-right", word: "I know, right?", meaning: "だよね?", examples: [
          { en: "This is so good! / I know, right?", ja: "これ超おいしい!/だよね?", note: "", form: "I know, right" },
          { en: "I know, right? I was surprised too.", ja: "だよね?私も驚いたよ。", note: "相手の意見に強く同意するときに。", form: "I know, right" },
        ] },
        { id: "same-here", word: "Same here.", meaning: "私も同じ", examples: [
          { en: "I love coffee. / Same here.", ja: "コーヒー大好き。/私も。", note: "", form: "Same here" },
          { en: "Same here. I couldn't sleep either.", ja: "私も同じ。私も眠れなかったよ。", note: "Either - 否定文に同意する時に使う I couldn’t sleep either (私も寝れなかった）", form: "Same here" },
        ] },
        { id: "i-feel-you", word: "I feel you.", meaning: "わかる〜、共感するよ", examples: [
          { en: "Mondays are so hard. / I feel you.", ja: "月曜ってつらいよね。/ わかる〜。", note: "", form: "I feel you" },
          { en: "I feel you. I've been there too.", ja: "わかるよ。私もそうだったから。", note: "I've been there.(経験ある)とセットで。", form: "I feel you" },
        ] },
        { id: "thats-too-bad", word: "That's too bad.", meaning: "それは残念", examples: [
          { en: "You can't come? That's too bad.", ja: "来られないの?それは残念。", note: "", form: "That's too bad" },
          { en: "That's too bad. Maybe next time.", ja: "残念だね。また今度だね。", note: "Maybe next time. と続けると自然。", form: "That's too bad" },
        ] },
        { id: "im-glad-to-hear-that", word: "I'm glad to hear that.", meaning: "それを聞いてうれしい", examples: [
          { en: "You're feeling better? I'm glad to hear that.", ja: "元気になったの?それを聞いてうれしいよ。", note: "", form: "I'm glad to hear that" },
          { en: "I'm glad to hear that everything went well.", ja: "全部うまくいったと聞いてうれしいよ。", note: "良い知らせへのリアクション。", form: "I'm glad to hear that" },
        ] },
        { id: "touched", word: "touched", meaning: "感動した", pos: "形容詞", examples: [
          { en: "I was touched by his kindness.", ja: "彼の優しさに感動したんだ。", note: "be touched by 〜 で『〜に感動する』。", form: "touched" },
          { en: "She was touched by the surprise party.", ja: "彼女はサプライズパーティーに感動していたよ。", note: "", form: "touched" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ⑦",
      words: [
        { id: "sounds-good", word: "Sounds good!", meaning: "いいね!", examples: [
          { en: "Dinner at seven? Sounds good!", ja: "7時に夕食?いいね!", note: "", form: "Sounds good" },
          { en: "Sounds good to me!", ja: "私はそれでいいよ!", note: "", form: "Sounds good" },
        ] },
        { id: "im-happy-for-you", word: "I'm happy for you!", meaning: "よかったね！、うれしいよ", examples: [
          { en: "You're getting married? I'm so happy for you!", ja: "結婚するの？本当によかったね！", note: "", form: "I'm so happy for you" },
          { en: "That's wonderful. I'm happy for you.", ja: "それは素晴らしい。うれしいよ。", note: "", form: "I'm happy for you" },
        ] },
        { id: "good-for-you", word: "Good for you!", meaning: "よかったね!", examples: [
          { en: "I got a promotion! / Good for you!", ja: "昇進したんだ!/よかったね!", note: "", form: "Good for you" },
          { en: "Good for you! You worked so hard.", ja: "よかったね!すごくがんばってたもんね。", note: "明るい声で言うのがコツ。", form: "Good for you" },
        ] },
        { id: "congratulations", word: "Congratulations!", meaning: "おめでとう!", examples: [
          { en: "Congratulations on your new job!", ja: "新しい仕事、おめでとう!", note: "Congratulations on 〜 で『〜おめでとう』。", form: "Congratulations" },
          { en: "You got married? Congratulations!", ja: "結婚したの?おめでとう!", note: "略して Congrats! とも。", form: "Congratulations" },
        ] },
        { id: "no-worries", word: "No worries.", meaning: "気にしないで、大丈夫", examples: [
          { en: "Sorry I'm late! / No worries.", ja: "遅れてごめん! / 気にしないで。", note: "", form: "No worries" },
          { en: "No worries, I can wait.", ja: "大丈夫、待てるよ。", note: "謝罪や礼への返しに便利。", form: "No worries" },
        ] },
        { id: "take-your-time", word: "Take your time.", meaning: "ゆっくりでいいよ、急がないで", examples: [
          { en: "Take your time, there's no rush.", ja: "ゆっくりでいいよ、急がないで。", note: "", form: "Take your time" },
          { en: "No hurry! Take your time.", ja: "急がなくていいよ、ゆっくりで。", note: "No rush. と同じ意味。", form: "Take your time" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ⑧",
      words: [
        { id: "do-you-happen-to-have", word: "Do you happen to have ~?", meaning: "もしかして〜持ってる?、〜はありますか?", examples: [
          { en: "Do you happen to have a pen?", ja: "もしかしてペン持ってる?", note: "", form: "Do you happen to have" },
          { en: "Do you happen to have his number?", ja: "もしかして彼の番号わかる?", note: "happen to があると控えめな響き。", form: "Do you happen to have" },
        ] },
        { id: "where-can-i-find", word: "Where can I find ~?", meaning: "〜はどこにありますか?、〜はどこで見つかる?", examples: [
          { en: "Where can I find the restroom?", ja: "トイレはどこにありますか?", note: "", form: "Where can I find" },
          { en: "Where can I find a good coffee shop?", ja: "いいカフェはどこにありますか?", note: "店や施設で物や場所を探すときに。", form: "Where can I find" },
        ] },
        { id: "on-your-right", word: "on your right", meaning: "右手に、右側に", examples: [
          { en: "The station is on your right.", ja: "駅は右手にあります。", note: "", form: "on your right" },
          { en: "You'll find it on your right.", ja: "右側にありますよ。", note: "道案内の定番。左は on your left。", form: "on your right" },
        ] },
        { id: "to-your-left", word: "to your left", meaning: "左手に、左側に", examples: [
          { en: "The elevator is to your left.", ja: "エレベーターは左手にあります。", note: "to your left / on your left で「左手に」 to your right / on your rightで「右手に」", form: "to your left" },
          { en: "You'll see it on your left.", ja: "左側に見えてきますよ。", note: "", form: "on your left" },
        ] },
        { id: "straight-ahead", word: "straight ahead", meaning: "まっすぐ行った先に", examples: [
          { en: "Go straight ahead and you'll see it.", ja: "まっすぐ行けば見えてきますよ。", note: "", form: "straight ahead" },
          { en: "The entrance is straight ahead.", ja: "入口はこの先まっすぐです。", note: "", form: "straight ahead" },
        ] },
        { id: "right-over-there", word: "right over there", meaning: "すぐそこ・あそこに", examples: [
          { en: "The restroom is right over there.", ja: "トイレ?はすぐそこですよ。", note: "", form: "right over there" },
          { en: "Your keys are right over there.", ja: "鍵ならあそこにあるよ。", note: "指さしながら使うことが多い。", form: "right over there" },
        ] },
      ],
    },
    {
      title: "感情・リアクション ⑨",
      words: [
        { id: "down-the-street", word: "down the street", meaning: "この道を行ったところ・通りの先に", examples: [
          { en: "There's a pharmacy just down the street.", ja: "この道を行ったところに薬局があります。", note: "", form: "down the street" },
          { en: "It's a little further down the street.", ja: "もう少し先に行ったところです。", note: "Further down the street - 道の少し先", form: "down the street" },
        ] },
        { id: "around-the-corner", word: "around the corner", meaning: "角を曲がったところ", examples: [
          { en: "The cafe is just around the corner.", ja: "カフェは角を曲がってすぐです。", note: "just around the corner = すぐそこ。", form: "around the corner" },
          { en: "There's a convenience store around the corner.", ja: "角を曲がったところにコンビニがあるよ。", note: "", form: "around the corner" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ①",
      words: [
        { id: "what-kind-of", word: "What kind of ...?", meaning: "どんな種類の〜?", examples: [
          { en: "What kind of music do you like?", ja: "どんな音楽が好き?", note: "", form: "What kind of" },
          { en: "What kind of food is famous here?", ja: "ここではどんな食べ物が有名?", note: "相手の好みを掘り下げるときに便利。", form: "What kind of" },
        ] },
        { id: "how-long", word: "How long ...?", meaning: "どのくらいの期間〜?", examples: [
          { en: "How long are you staying?", ja: "どのくらい滞在するの?", note: "", form: "How long" },
          { en: "How long does it take by train?", ja: "電車でどのくらいかかる?", note: "How long does it take? = どのくらいかかる？", form: "How long" },
        ] },
        { id: "how-often", word: "How often ...?", meaning: "どのくらいの頻度で〜?", examples: [
          { en: "How often do you travel?", ja: "どのくらいの頻度で旅行するの?", note: "", form: "How often" },
          { en: "How often do you eat out?", ja: "外食はどのくらいの頻度?", note: "答えは once a week などの頻度表現。", form: "How often" },
        ] },
        { id: "how-far", word: "How far ...?", meaning: "どのくらい遠い?", examples: [
          { en: "How far is the station from here?", ja: "駅はここからどのくらい?", note: "", form: "How far" },
          { en: "How far is it to the beach?", ja: "ビーチまでどのくらいの距離?", note: "How far is it to 〜? = 〜までどのくらい？", form: "How far" },
        ] },
        { id: "how-much", word: "How much ...?", meaning: "いくら?", examples: [
          { en: "How much is this?", ja: "これ、いくらですか?", note: "How much is this? = これいくら？", form: "How much" },
          { en: "How much time do we have?", ja: "時間はどのくらいある?", note: "How much 〜? で値段や量を尋ねる。", form: "How much" },
        ] },
        { id: "how-many", word: "How many ...?", meaning: "いくつ?", examples: [
          { en: "How many countries have you visited?", ja: "何か国行ったことある?", note: "数えられる名詞に使う。", form: "How many" },
          { en: "How many people are coming?", ja: "何人来るの?", note: "", form: "How many" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ②",
      words: [
        { id: "have-you-ever", word: "Have you ever ...?", meaning: "〜したことある?", examples: [
          { en: "Have you ever tried natto?", ja: "納豆を食べたことある?", note: "", form: "Have you ever" },
          { en: "Have you ever seen snow?", ja: "雪を見たことある?", note: "経験を尋ねる現在完了", form: "Have you ever" },
        ] },
        { id: "have-you-been-to", word: "Have you been to ...?", meaning: "〜に行ったことある?", examples: [
          { en: "Have you been to Kyoto?", ja: "京都に行ったことある?", note: "", form: "Have you been to" },
          { en: "Have you been to that new cafe?", ja: "あの新しいカフェ、行った?", note: "", form: "Have you been to" },
        ] },
        { id: "whats-it-like", word: "What's it like?", meaning: "それってどんな感じ?", examples: [
          { en: "What's it like living in Tokyo?", ja: "東京での生活ってどんな感じ?", note: "", form: "What's it like" },
          { en: "You went to Iceland? What's it like?", ja: "アイスランドに行ったの?どんな感じだった?", note: "", form: "What's it like" },
        ] },
        { id: "what-do-you-think", word: "What do you think?", meaning: "どう思う?", examples: [
          { en: "What do you think of this plan?", ja: "この計画、どう思う?", note: "", form: "What do you think" },
          { en: "I like it. What do you think?", ja: "私はいいと思う。あなたはどう思う?", note: "会話を掘り下げる基本フレーズ。", form: "What do you think" },
        ] },
        { id: "why-did-you", word: "Why did you ...?", meaning: "なんで〜したの?", examples: [
          { en: "Why did you choose Japan?", ja: "なんで日本を選んだの?", note: "", form: "Why did you" },
          { en: "Why did you start learning English?", ja: "なんで英語を学び始めたの?", note: "相手の選択の背景を聞ける。", form: "Why did you" },
        ] },
        { id: "when-did-you", word: "When did you ...?", meaning: "いつ〜したの?", examples: [
          { en: "When did you arrive?", ja: "いつ着いたの?", note: "", form: "When did you" },
          { en: "When did you two meet?", ja: "二人はいつ出会ったの?", note: "", form: "When did you" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ③",
      words: [
        { id: "do-you-like", word: "Do you like ...?", meaning: "〜は好き?", examples: [
          { en: "Do you like Japanese food?", ja: "日本食は好き?", note: "", form: "Do you like" },
          { en: "Do you like traveling alone?", ja: "一人旅は好き?", note: "", form: "Do you like" },
        ] },
        { id: "do-you-know", word: "Do you know ...?", meaning: "〜を知ってる?", examples: [
          { en: "Do you know a good place for lunch?", ja: "ランチにいい場所知ってる?", note: "", form: "Do you know" },
          { en: "Do you know how to get there?", ja: "そこへの行き方、知ってる?", note: "Do you know how to 〜? = やり方を知ってる？ get there = 辿り着き方", form: "Do you know" },
        ] },
        { id: "can-you-tell-me", word: "Can you tell me ...?", meaning: "〜を教えてくれる?", examples: [
          { en: "Can you tell me about your trip?", ja: "旅行のこと教えてくれる?", note: "", form: "Can you tell me" },
          { en: "Can you tell me where the restroom is?", ja: "トイレの場所を教えてもらえますか?", note: "", form: "Can you tell me" },
        ] },
        { id: "whats-your-favorite", word: "What's your favorite ...?", meaning: "一番好きな〜は?", examples: [
          { en: "What's your favorite movie?", ja: "一番好きな映画は?", note: "", form: "What's your favorite" },
          { en: "Where’s your favorite place in Japan?", ja: "日本で一番好きな場所は?", note: "", form: "your favorite" },
        ] },
        { id: "recommend", word: "recommend", meaning: "おすすめする", pos: "動詞", examples: [
          { en: "Can you recommend a good restaurant?", ja: "おすすめのレストランある?", note: "", form: "recommend" },
          { en: "I highly recommend this book.", ja: "この本は本当におすすめだよ。", note: "highly recommend で『強くおすすめ』。", form: "recommend" },
        ] },
        { id: "suggest", word: "suggest", meaning: "提案する", pos: "動詞", examples: [
          { en: "What do you suggest?", ja: "何がおすすめ?", note: "", form: "suggest" },
          { en: "I suggest taking the earlier train.", ja: "早めの電車に乗るのがいいと思うよ。", note: "suggest + 動詞ing の形に注意。", form: "suggest" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ④",
      words: [
        { id: "opinion", word: "opinion", meaning: "意見", pos: "名詞", examples: [
          { en: "What's your opinion on this?", ja: "これについてあなたの意見は?", note: "What's your opinion on 〜? で意見を尋ねる", form: "opinion" },
          { en: "In my opinion, this one is better.", ja: "私の意見では、こっちのほうがいいな。", note: "In my opinion, 〜 = 私の考えでは", form: "opinion" },
        ] },
        { id: "prefer", word: "prefer", meaning: "〜のほうが好き", pos: "動詞", examples: [
          { en: "I prefer coffee to tea.", ja: "紅茶よりコーヒーのほうが好き。", note: "prefer A to B で『BよりAが好き』。", form: "prefer" },
          { en: "Which do you prefer, beach or mountains?", ja: "海と山、どっちが好き?", note: "Which do you prefer? で好みを尋ねる。", form: "prefer" },
        ] },
        { id: "rather", word: "rather", meaning: "むしろ、どちらかというと", pos: "副詞", examples: [
          { en: "I'd rather stay home tonight.", ja: "今夜はむしろ家にいたいな。", note: "would rather + 動詞 で『むしろ〜したい』。", form: "rather" },
          { en: "It's rather cold today.", ja: "今日はどちらかというと寒いね。", note: "rather + 形容詞 で『かなり〜』の意味も。", form: "rather" },
        ] },
        { id: "compare", word: "compare", meaning: "比べる", pos: "動詞", examples: [
          { en: "Don't compare yourself to others.", ja: "他人と自分を比べないで。", note: "Don't compare yourself to others. = 人と比べないで。", form: "compare" },
          { en: "Let's compare hotel A to hotel B", ja: "ホテルAをホテルBと比べてみよう", note: "compare A to/with B で『AをBと比べる』。", form: "compare" },
        ] },
        { id: "choice", word: "choice", meaning: "選択", pos: "名詞", examples: [
          { en: "Good choice!", ja: "いい選択だね!", note: "", form: "choice" },
          { en: "We have two choices.", ja: "選択肢は2つあるよ。", note: "make a choice = 選ぶ。", form: "choices" },
        ] },
        { id: "pick", word: "pick", meaning: "選ぶ", pos: "動詞", examples: [
          { en: "You pick the restaurant tonight.", ja: "今夜のレストランはあなたが選んで。", note: "You pick! = 君が選んで！", form: "pick" },
          { en: "I picked this one for you.", ja: "あなたのためにこれを選んだよ。", note: "choose よりカジュアル。", form: "picked" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ⑤",
      words: [
        { id: "guess", word: "guess", meaning: "推測する、〜かなと思う", pos: "動詞", examples: [
          { en: "Guess what happened today!", ja: "今日何があったと思う?", note: "Guess what! で『ねえ聞いて！』。", form: "Guess" },
          { en: "I guess you're right.", ja: "たぶんあなたの言う通りだね。", note: "I guess 〜 で『〜だと思う』と控えめに。", form: "guess" },
        ] },
        { id: "wonder", word: "wonder", meaning: "〜かなと思う", pos: "動詞", examples: [
          { en: "I wonder if it'll rain tomorrow.", ja: "明日、雨降るかなあ。", note: "I wonder if 〜 で『〜かなあ』。", form: "wonder" },
          { en: "I was wondering if you're free Sunday.", ja: "日曜って空いてるかなと思って。", note: "I was wondering if 〜 でていねいな依頼にも。", form: "wondering" },
        ] },
        { id: "ask-about", word: "ask about", meaning: "〜について尋ねる", examples: [
          { en: "He asked about you yesterday.", ja: "昨日、彼があなたのこと聞いてたよ。", note: "He asked about you. = あなたのこと聞いてたよ。", form: "asked about" },
          { en: "Feel free to ask about anything.", ja: "何でも遠慮なく聞いてね。", note: "ask about 〜 で『〜について尋ねる』。", form: "ask about" },
        ] },
        { id: "find-out", word: "find out", meaning: "調べて知る", examples: [
          { en: "Let me find out the schedule.", ja: "スケジュールを調べてみるね。", note: "find out で『(調べて)知る・わかる』。", form: "find out" },
          { en: "I just found out the news!", ja: "さっきそのニュースを知ったんだ!", note: "find out about 〜 の形も。", form: "found out" },
        ] },
        { id: "tell-me-more", word: "tell me more", meaning: "もっと聞かせて", examples: [
          { en: "That sounds interesting. Tell me more!", ja: "面白そう。もっと聞かせて!", note: "", form: "Tell me more" },
          { en: "Tell me more about your hometown.", ja: "地元のこと、もっと教えて。", note: "会話を掘り下げる相づち。", form: "Tell me more" },
        ] },
        { id: "sounds-like", word: "sounds like", meaning: "〜みたいだね", examples: [
          { en: "Sounds like you had a great time!", ja: "すごく楽しかったみたいだね!", note: "Sounds like 〜 で『〜みたいだね』と受け止める。", form: "Sounds like" },
          { en: "That sounds like a good idea.", ja: "それはいい発案・アイデアだね！", note: "「いいね！」とノリノリのニュアンス", form: "sounds like" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ⑥",
      words: [
        { id: "seem", word: "seem", meaning: "〜のように見える", pos: "動詞", examples: [
          { en: "You seem tired today.", ja: "今日、疲れてるみたいだね。", note: "You seem tired. = 疲れてるみたいだね。", form: "seem" },
          { en: "He seems like a nice person.", ja: "彼はいい人みたいだね。", note: "seem で『〜のように見える・思える』", form: "seems" },
        ] },
        { id: "look", word: "look", meaning: "〜に見える", pos: "動詞", examples: [
          { en: "You look great today!", ja: "今日、すごく素敵だね!", note: "You look great! はほめ言葉。", form: "look" },
          { en: "This dish looks delicious.", ja: "この料理、おいしそう。", note: "look + 形容詞 で『〜に見える』。", form: "looks" },
        ] },
        { id: "what-happened", word: "What happened?", meaning: "何があったの?", examples: [
          { en: "What happened? Are you okay?", ja: "何があったの?大丈夫?", note: "", form: "What happened" },
          { en: "What happened to your phone?", ja: "スマホ、どうしたの?", note: "What happened to 〜? = 〜どうしたの？", form: "What happened" },
        ] },
        { id: "how-was-it", word: "How was it?", meaning: "どうだった?", examples: [
          { en: "You saw the movie? How was it?", ja: "映画観たの?どうだった?", note: "", form: "How was it" },
          { en: "How was your weekend?", ja: "週末はどうだった?", note: "", form: "How was" },
        ] },
        { id: "how-did-it-go", word: "How did it go?", meaning: "どうだった？", examples: [
          { en: "How did the interview go?", ja: "面接どうだった?（上手くいった？）", note: "How did it go? で『うまくいった？』と結果を尋ねる。", form: "How did the interview go" },
          { en: "How did your presentation go?", ja: "プレゼンはどうだった？（うまくいった?）", note: "", form: "How did your presentation go" },
        ] },
        { id: "what-about-you", word: "What about you?", meaning: "あなたは?", examples: [
          { en: "I love sushi. What about you?", ja: "寿司が大好き。あなたは?", note: "", form: "What about you" },
          { en: "I'm from Tokyo. What about you?", ja: "東京出身です。あなたは?", note: "", form: "What about you" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ⑦",
      words: [
        { id: "and-you", word: "And you?", meaning: "あなたは?", examples: [
          { en: "I'm doing great. And you?", ja: "元気だよ。あなたは?", note: "", form: "And you" },
          { en: "I'll have coffee. And you?", ja: "私はコーヒーにする。あなたは?", note: "What about you? より短くカジュアル。", form: "And you" },
        ] },
        { id: "anything-else", word: "Anything else?", meaning: "他には?", examples: [
          { en: "Anything else you want to see?", ja: "他に見たいものはある?", note: "", form: "Anything else" },
          { en: "Is there anything else I can help with?", ja: "他に何かお手伝いできることは?", note: "店やサポートでもよく使う。", form: "anything else" },
        ] },
        { id: "for-example", word: "For example?", meaning: "例えば?", examples: [
          { en: "I like outdoor activities. / For example?", ja: "アウトドアが好き。/例えば?", note: "", form: "For example" },
          { en: "For example, hiking and camping.", ja: "例えば、ハイキングとかキャンプとか。", note: "", form: "For example" },
        ] },
        { id: "like-what", word: "Like what?", meaning: "例えばどんな?", examples: [
          { en: "I have many hobbies. / Like what?", ja: "趣味が多いんだ。/例えばどんな?", note: "", form: "Like what" },
          { en: "Like what? Tell me!", ja: "例えばどんなの?教えて!", note: "", form: "Like what" },
        ] },
        { id: "how-come", word: "How come?", meaning: "なんで?", examples: [
          { en: "You're not coming? How come?", ja: "来ないの?なんで?", note: "How come? で『なんで？』。Why より柔らかい表現", form: "How come" },
          { en: "How come you know so much about Japan?", ja: "なんでそんなに日本に詳しいの?", note: "How come の後は普通の語順(主語+動詞)。", form: "How come" },
        ] },
        { id: "favorite-part", word: "favorite part", meaning: "一番好きなところ", examples: [
          { en: "What was your favorite part of the trip?", ja: "旅行で一番よかったところは?", note: "", form: "favorite part" },
          { en: "My favorite part was the food!", ja: "一番よかったのは食べ物!", note: "", form: "favorite part" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ⑧",
      words: [
        { id: "best-part", word: "best part", meaning: "一番いいところ", examples: [
          { en: "The best part is, it's free!", ja: "一番いいのは、無料ってこと!", note: "The best part is 〜 で『一番いいのは〜』。", form: "best part" },
          { en: "What's the best part of your job?", ja: "仕事の一番いいところは?", note: "", form: "best part" },
        ] },
        { id: "the-most", word: "the most", meaning: "一番、最も", examples: [
          { en: "What do you like the most?", ja: "何が一番好き?", note: "", form: "the most" },
          { en: "I enjoyed the food the most.", ja: "食べ物が一番楽しめたよ。", note: "like 〜 the most = 一番好き。", form: "the most" },
        ] },
        { id: "better-than", word: "better than", meaning: "〜よりいい", examples: [
          { en: "This is better than I expected!", ja: "思ってたよりいいね!", note: "Than I expected = 私が思ってたより", form: "better than" },
          { en: "Homemade food is better than fast food.", ja: "手料理はファストフードよりいいよね。", note: "A is better than B で『AはBよりいい』。", form: "better than" },
        ] },
        { id: "difference", word: "difference", meaning: "違い", pos: "名詞", examples: [
          { en: "What's the difference between Japan and Germany?", ja: "日本とドイツの違いは何？", note: "the difference between A and B = AとBの違い", form: "difference" },
          { en: "There's a big difference in price.", ja: "値段に大きな違いがあるね。", note: "a big difference = 大きな違い。", form: "difference" },
        ] },
        { id: "be-different-from", word: "be different from", meaning: "〜と違う", examples: [
          { en: "Japan is so different from my country.", ja: "日本は私の国とすごく違う。", note: "", form: "different from" },
          { en: "This is different from what I ordered.", ja: "これ、注文したものと違います。", note: "from の代わりに than も使われる。", form: "different from" },
        ] },
        { id: "whats-the-difference", word: "What's the difference?", meaning: "何が違うの?", examples: [
          { en: "They look the same. What's the difference?", ja: "同じに見えるけど。何が違うの?", note: "", form: "What's the difference" },
          { en: "What's the difference between these teas?", ja: "このお茶とあのお茶、何が違うの?", note: "", form: "What's the difference" },
        ] },
      ],
    },
    {
      title: "質問する・掘り下げる ⑨",
      words: [
        { id: "look-up", word: "look up", meaning: "調べる", examples: [
          { en: "Let me look it up on my phone.", ja: "スマホで調べてみるね。", note: "look it up = それ調べてみて。", form: "look it up" },
          { en: "I looked up the word in the dictionary.", ja: "その単語を辞書で調べたよ。", note: "look 〜 up で『(辞書やネットで)調べる』", form: "looked up" },
        ] },
        { id: "it-depends", word: "It depends.", meaning: "場合によるね", examples: [
          { en: "Do you run everyday? / It depends on my mood.", ja: "毎日走ってるの? / 気分によるかな。", note: "", form: "It depends" },
          { en: "It depends on the day.", ja: "日によるね。", note: "It depends on 〜 で『〜次第』。", form: "It depends" },
        ] },
      ],
    },
  ],
};
