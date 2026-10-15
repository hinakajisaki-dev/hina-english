// 単語帳 Week 4, from the teacher's slides「単語帳 week 4」: 100 words, two examples each.
// For the students the teacher gives it to (vocab_books); not everyone's yet (everyone: false).
// Same shape as week1.js. form is null where the word can't be marked in the sentence.

export const WEEK4 = {
  id: "w4",
  week: 4,
  title: "単語帳 Week 4",
  everyone: false,
  groups: [
    {
      title: "趣味・好きなこと ①",
      words: [
        { id: "free-time", word: "free time", meaning: "自由時間", examples: [
          { en: "What do you do in your free time?", ja: "自由な時間は何をしてるの?", note: "free time で『自由時間・暇な時間』。", form: "free time" },
          { en: "I don't have much free time these days.", ja: "最近あまり自由時間がなくて。", note: "not have much free time で『あまり暇がない』。", form: "free time" },
        ] },
        { id: "passionate-about", word: "passionate about", meaning: "〇〇に対して情熱的な", examples: [
          { en: "I am passionate about photography.", ja: "私は写真に情熱を注いでいます", note: "", form: "passionate about" },
          { en: "I have a passion for music.", ja: "音楽に対して情熱がある（とても好き）", note: "“Passion for” は名詞とセット", form: "passion for" },
        ] },
        { id: "be-into", word: "be into", meaning: "〜にハマっている", examples: [
          { en: "I'm really into yoga these days.", ja: "最近ヨガにすごくハマってるんだ。", note: "カジュアルな言い方。", form: "into" },
          { en: "What are you into lately?", ja: "最近何にハマってる?", note: "", form: "into" },
        ] },
        { id: "be-crazy-about", word: "be crazy about", meaning: "〜に夢中である", examples: [
          { en: "My son is crazy about dinosaurs.", ja: "息子は恐竜に夢中なんです。", note: "be into より強い。", form: "crazy about" },
          { en: "She's crazy about K-pop.", ja: "彼女はK-POPに夢中だよ。", note: "趣味や推しについて熱く語るときに。", form: "crazy about" },
        ] },
        { id: "work-out", word: "work out", meaning: "トレーニングする", examples: [
          { en: "I work out three times a week.", ja: "週3回トレーニングしています。", note: "work out で『(ジムなどで)体を鍛える』。", form: "work out" },
          { en: "Do you work out?", ja: "トレーニングしてる?", note: "Do you work out? で『鍛えてる？』。", form: "work out" },
        ] },
        { id: "take-pictures", word: "take pictures", meaning: "写真を撮る", examples: [
          { en: "I love taking pictures of food.", ja: "食べ物の写真を撮るのが大好き。", note: "take pictures (of 〜) で『(〜の)写真を撮る』。", form: "taking pictures" },
          { en: "Can I take a picture here?", ja: "ここで写真を撮ってもいいですか?", note: "Can I take a picture? で撮影の許可を求められる。", form: "take a picture" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ②",
      words: [
        { id: "collect", word: "collect", meaning: "集める", examples: [
          { en: "I collect postcards from my trips.", ja: "旅行先のポストカードを集めています。", note: "collect 〜 で『〜を集める・収集する』。", form: "collect" },
          { en: "My son collects trading cards.", ja: "息子はトレーディングカードを集めています。", note: "趣味のコレクションを話すときに。", form: "collects" },
        ] },
        { id: "play", word: "play 〇〇", meaning: "〇〇を弾く\n〇〇をする", examples: [
          { en: "I play the guitar a little.", ja: "ギターを少し弾きます。", note: "play the + 楽器 で『〜を演奏する』。the を付ける。", form: "play" },
          { en: "I like to play video games", ja: "ビデオゲームをするのが好き", note: "", form: "play" },
        ] },
        { id: "be-good-at", word: "be good at", meaning: "〜が得意", examples: [
          { en: "I'm good at cooking.", ja: "料理が得意なんです。", note: "be good at + 名詞/動詞ing で『〜が得意』。", form: "good at" },
          { en: "What are you good at?", ja: "何が得意なの?", note: "", form: "good at" },
        ] },
        { id: "be-bad-at", word: "be bad at", meaning: "〜が苦手", examples: [
          { en: "I'm bad at singing.", ja: "歌うのが苦手なんです。", note: "good at の反対。", form: "bad at" },
          { en: "I'm really bad at remembering names.", ja: "名前を覚えるのが本当に苦手で。", note: "really bad at 〜 で『すごく苦手』と強調できる。", form: "bad at" },
        ] },
        { id: "be-a-big-fan-of", word: "be a big fan of", meaning: "〜の大ファンである", examples: [
          { en: "I'm a big fan of Studio Ghibli.", ja: "ジブリの大ファンなんです。", note: "", form: "a big fan of" },
          { en: "She's a big fan of Korean food.", ja: "彼女は韓国料理の大ファンだよ。", note: "好きなものを強く伝えられる。", form: "a big fan of" },
        ] },
        { id: "get-into", word: "get into", meaning: "〜にハマり始める", examples: [
          { en: "I got into camping last year.", ja: "去年キャンプにハマったんだ。", note: "be into は状態、get into は始まり。", form: "got into" },
          { en: "How did you get into photography?", ja: "どうやって写真にハマったの?", note: "How did you get into 〜? できっかけを聞ける。", form: "get into" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ③",
      words: [
        { id: "take-lessons", word: "take lessons", meaning: "習い事をする", examples: [
          { en: "I take piano lessons every week.", ja: "毎週ピアノを習っています。", note: "take 〜 lessons で『〜を習う』。piano lessons = ピアノのレッスン。", form: "take piano lessons" },
          { en: "I'm thinking of taking cooking lessons.", ja: "料理教室に通おうかと思ってるんだ。", note: "thinking of + 動詞ing で『〜しようか考え中』。", form: "taking cooking lessons" },
        ] },
        { id: "get-better-at", word: "get better at", meaning: "〜が上達する", examples: [
          { en: "I'm getting better at English!", ja: "英語が上達してきた!", note: "", form: "getting better at" },
          { en: "How can I get better at speaking?", ja: "どうしたらスピーキングが上達するかな?", note: "How can I get better at 〜? で上達法を聞ける。", form: "get better at" },
        ] },
        { id: "give-it-a-try", word: "give it a try", meaning: "試してみる", examples: [
          { en: "Never done it? Give it a try!", ja: "やったことない?試してみなよ!", note: "", form: "Give it a try" },
          { en: "Okay, I'll give it a try.", ja: "わかった、試してみるよ。", note: "誘うときにも、応じるときにも使える。", form: "give it a try" },
        ] },
        { id: "cant-stop-ing", word: "can't stop -ing", meaning: "〜が止まらない", examples: [
          { en: "I can't stop watching this show.", ja: "この番組を観るのが止まらないんだ。", note: "can't stop + 動詞ing で『〜が止まらない』。", form: "can't stop" },
          { en: "I can't stop laughing!", ja: "笑いが止まらない!", note: "夢中な状態や笑いが止まらないときに。", form: "can't stop" },
        ] },
        { id: "kill-time", word: "kill time", meaning: "暇をつぶす", examples: [
          { en: "I killed time at a cafe before the movie.", ja: "映画の前にカフェで時間をつぶしたよ。", note: "", form: "killed time" },
          { en: "How do you kill time on the train?", ja: "電車では何して時間をつぶしてる?", note: "How do you kill time? で『どう時間つぶす？』。", form: "kill time" },
        ] },
        { id: "draw", word: "draw", meaning: "絵を描く", examples: [
          { en: "I like to draw in my free time.", ja: "暇なときに絵を描くのが好きなんです。", note: "draw a map = 地図を描く。", form: "draw" },
          { en: "Can you draw a map for me?", ja: "地図を描いてくれる?", note: "paint(絵の具で塗る)と区別。", form: "draw" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ④",
      words: [
        { id: "paint", word: "paint", meaning: "絵の具で描く\n塗る", examples: [
          { en: "She paints beautiful landscapes.", ja: "彼女は美しい風景画を描くんです。", note: "", form: "paints" },
          { en: "We painted the wall white.", ja: "壁を白く塗ったんだ。", note: "paint A + 色 で『Aを〜色に塗る』。", form: "painted" },
        ] },
        { id: "sing", word: "sing", meaning: "歌う", examples: [
          { en: "You sing really well!", ja: "歌、すごく上手だね!", note: "You sing well! でほめられる。", form: "sing" },
          { en: "Let's sing together at karaoke.", ja: "カラオケで一緒に歌おう。", note: "sing together で『一緒に歌う』。", form: "sing" },
        ] },
        { id: "bake", word: "bake", meaning: "お菓子やパンを焼く", examples: [
          { en: "I baked cookies this morning.", ja: "今朝クッキーを焼いたんだ。", note: "", form: "baked" },
          { en: "She bakes her own bread.", ja: "彼女は自分でパンを焼くんです。", note: "", form: "bakes" },
        ] },
        { id: "grow", word: "grow", meaning: "育てる\n栽培する", examples: [
          { en: "I grow herbs on my balcony.", ja: "ベランダでハーブを育てています。", note: "", form: "grow" },
          { en: "My dad grows tomatoes.", ja: "父はトマトを育てているんです。", note: "grow + 野菜/ハーブ の形でよく使う。", form: "grows" },
        ] },
        { id: "build", word: "build", meaning: "作る\n組み立てる", examples: [
          { en: "He built this shelf himself.", ja: "彼はこの棚を自分で作ったんだ。", note: "過去形 built。", form: "built" },
          { en: "I want to build my own website.", ja: "自分のウェブサイトを作りたいな。", note: "build my own 〜 で『自分の〜を作る』。", form: "build" },
        ] },
        { id: "fix", word: "fix", meaning: "直す", examples: [
          { en: "Can you fix my bike?", ja: "自転車を直してくれる?", note: "fix で『(壊れた物を)直す』。Can you fix 〜? で修理を頼める。", form: "fix" },
          { en: "I fixed the door myself!", ja: "ドアを自分で直したんだよ!", note: "fix 〜 myself で『自分で直す』。", form: "fixed" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ⑤",
      words: [
        { id: "create", word: "create", meaning: "作り出す", examples: [
          { en: "I love creating things.", ja: "何かを作り出すのが大好きなんです。", note: "create で『作り出す・生み出す』。", form: "creating" },
          { en: "She creates videos for fun.", ja: "彼女は趣味で動画を作っています。", note: "create things で『ものを作る』。", form: "creates" },
        ] },
        { id: "edit", word: "edit", meaning: "編集する", examples: [
          { en: "I edit my own videos.", ja: "自分で動画を編集しています。", note: "動画や写真に使う。", form: "edit" },
          { en: "Editing photos takes time.", ja: "写真の編集は時間がかかるね。", note: "Editing 〜 takes time. で動名詞を主語にできる。", form: "Editing" },
        ] },
        { id: "post", word: "post", meaning: "投稿する", examples: [
          { en: "I posted the photos yesterday.", ja: "昨日その写真を投稿したよ。", note: "post で『(SNSに)投稿する』。", form: "posted" },
          { en: "She posts about food every day.", ja: "彼女は毎日食べ物のことを投稿してるね。", note: "post about 〜 で『〜について投稿する』。", form: "posts" },
        ] },
        { id: "attend", word: "attend", meaning: "参加する\n出席する", examples: [
          { en: "I attended a workshop last week.", ja: "先週ワークショップに参加しました。", note: "イベントや講座に。", form: "attended" },
          { en: "Are you attending the event?", ja: "そのイベントに参加するの?", note: "Are you attending 〜? で参加を確認できる。", form: "attending" },
        ] },
        { id: "win", word: "win", meaning: "勝つ", examples: [
          { en: "Our team won the game!", ja: "うちのチームが試合に勝ったよ!", note: "過去形 won。win the game = 試合に勝つ。", form: "won" },
          { en: "I never win at card games.", ja: "トランプでは全然勝てないんだよね。", note: "never win at 〜 で『〜で全然勝てない』。", form: "win" },
        ] },
        { id: "compete", word: "compete", meaning: "競う", examples: [
          { en: "I competed in a marathon once.", ja: "一度マラソン大会に出たことがあるんです。", note: "compete で『競う・競争する』。compete in 〜 = 〜に出場する。", form: "competed" },
          { en: "They compete with each other in a fun way.", ja: "彼らは楽しく競い合っているね。", note: "compete with 〜 で『〜と競う』。", form: "compete" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ⑥",
      words: [
        { id: "climb", word: "climb", meaning: "登る", examples: [
          { en: "Have you ever climbed Mt. Fuji?", ja: "富士山に登ったことある?", note: "climb Mt. Fuji = 富士山に登る。have you ever ~ 〇〇したことある？", form: "climbed" },
          { en: "We climbed to the top for the view.", ja: "眺めを見るために頂上まで登ったんだ。", note: "climb to the top で『頂上まで登る』。", form: "climbed" },
        ] },
        { id: "ride", word: "ride", meaning: "乗る", examples: [
          { en: "I ride my bike to work.", ja: "自転車で通勤しています。", note: "ride で『(乗り物に)乗る』。ride a bike = 自転車に乗る。", form: "ride" },
          { en: "Let's ride the ferris wheel!", ja: "観覧車に乗ろうよ!", note: "Let's ride 〜! で乗り物に誘える。", form: "ride" },
        ] },
        { id: "swim", word: "swim", meaning: "泳ぐ", examples: [
          { en: "I swim twice a week.", ja: "週2回泳いでいます。", note: "twice a week = 週2回。", form: "swim" },
          { en: "Can you swim in this river?", ja: "この川で泳げるの?", note: "", form: "swim" },
        ] },
        { id: "record", word: "record", meaning: "録音、録画する", examples: [
          { en: "I record myself speaking English.", ja: "自分の英語を録音しているんです。", note: "アクセントは後ろ。", form: "record" },
          { en: "Did you record the show?", ja: "その番組、録画した?", note: "", form: "record" },
        ] },
        { id: "thrilling", word: "thrilling", meaning: "スリル満点の、ぞくぞくする", examples: [
          { en: "The roller coaster was so thrilling!", ja: "そのジェットコースター、すごくスリルがあった！", note: "exciting より刺激が強い。", form: "thrilling" },
          { en: "It was a thrilling game until the very end.", ja: "最後の最後までハラハラする試合だった。", note: "スポーツ・映画・乗り物など、興奮する体験に使う。", form: "thrilling" },
        ] },
        { id: "impressive", word: "impressive", meaning: "印象的な、見事な", examples: [
          { en: "Your English is really impressive!", ja: "あなたの英語、本当に見事だね！", note: "人の技量や成果をほめるときに。", form: "impressive" },
          { en: "That's an impressive collection.", ja: "それは見事なコレクションだね。", note: "be impressed (by 〜) で『(〜に)感心する』も一緒に覚えると便利。", form: "impressive" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ⑦",
      words: [
        { id: "relaxing", word: "relaxing", meaning: "くつろげる", examples: [
          { en: "This music is so relaxing.", ja: "この音楽、すごく癒されるね。", note: "", form: "relaxing" },
          { en: "I had a relaxing weekend at home.", ja: "家でのんびりした週末を過ごしたよ。", note: "", form: "relaxing" },
        ] },
        { id: "creative", word: "creative", meaning: "創造的な", examples: [
          { en: "She's really creative.", ja: "彼女は本当にクリエイティブだね。", note: "creative は『創造的な・独創的な』。", form: "creative" },
          { en: "I like creative hobbies.", ja: "ものづくり系の趣味が好きなんです。", note: "", form: "creative" },
        ] },
        { id: "active", word: "active", meaning: "活動的な", examples: [
          { en: "My grandmother is still very active.", ja: "祖母は今でもとても活動的なんです。", note: "stay active = 活発でいる。", form: "active" },
          { en: "I try to stay active on weekends.", ja: "週末は体を動かすようにしています。", note: "still very active で『今でも元気』。", form: "active" },
        ] },
        { id: "addictive", word: "addictive", meaning: "やみつきになる", examples: [
          { en: "This game is so addictive!", ja: "このゲーム、やみつきになるよ!", note: "", form: "addictive" },
          { en: "Be careful, this snack is addictive.", ja: "気をつけて、このお菓子やみつきになるから。", note: "ゲームやお菓子について使える。", form: "addictive" },
        ] },
        { id: "competitive", word: "competitive", meaning: "負けず嫌いな、競争の激しい", examples: [
          { en: "I'm pretty competitive at games.", ja: "ゲームになるとけっこう負けず嫌いなんです。", note: "", form: "competitive" },
          { en: "He's competitive about everything.", ja: "彼は何でも張り合うんだよね。", note: "competitive about 〜 で『〜で張り合う』。", form: "competitive" },
        ] },
        { id: "talented", word: "talented", meaning: "才能がある", examples: [
          { en: "She's a talented singer.", ja: "彼女は才能ある歌手だね。", note: "a talented singer = 才能ある歌手。", form: "talented" },
          { en: "You're so talented at drawing!", ja: "絵の才能、すごいね!", note: "talented at 〜 で『〜の才能がある』。", form: "talented" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ⑧",
      words: [
        { id: "beginner", word: "beginner", meaning: "初心者", examples: [
          { en: "I'm a beginner at golf.", ja: "ゴルフは初心者なんです。", note: "a beginner at 〜 = 〜の初心者。", form: "beginner" },
          { en: "This class is for beginners.", ja: "このクラスは初心者向けです。", note: "for beginners で『初心者向け』。", form: "beginners" },
        ] },
        { id: "spend-time-ing", word: "spend time -ing", meaning: "〜して時間を過ごす", examples: [
          { en: "I spend time reading on weekends.", ja: "週末は読書をして過ごします。", note: "spend time + 動詞ing で『〜して時間を過ごす』。", form: "spend time" },
          { en: "We spent all day walking around.", ja: "一日中歩き回って過ごしたよ。", note: "spend all day + 動詞ing で『一日中〜して過ごす』。", form: "spent all day" },
        ] },
        { id: "once-a-week", word: "once a week", meaning: "週1回", examples: [
          { en: "I go to the gym once a week.", ja: "週1回ジムに行っています。", note: "頻度の表現。", form: "once a week" },
          { en: "We meet once a week for coffee.", ja: "週1回コーヒーを飲みに集まるんだ。", note: "once a 〜 で『〜に1回』。", form: "once a week" },
        ] },
        { id: "twice-a-month", word: "twice a month", meaning: "月2回", examples: [
          { en: "I eat out twice a month.", ja: "月2回外食します。", note: "twice = 2回。", form: "twice a month" },
          { en: "He visits his parents twice a month.", ja: "彼は月2回、両親のところに行くんだ。", note: "〜 times a 〜 で回数を表す。", form: "twice a month" },
        ] },
        { id: "regularly", word: "regularly", meaning: "定期的に", examples: [
          { en: "I exercise regularly.", ja: "定期的に運動しています。", note: "", form: "regularly" },
          { en: "Do you check the news regularly?", ja: "ニュースは定期的にチェックしてる?", note: "exercise regularly で『定期的に運動する』。", form: "regularly" },
        ] },
        { id: "rarely", word: "rarely", meaning: "めったに〜ない", examples: [
          { en: "I rarely watch TV.", ja: "テレビはめったに見ないんです。", note: "否定の意味を含む。", form: "rarely" },
          { en: "It rarely snows here.", ja: "ここではめったに雪が降りません。", note: "", form: "rarely" },
        ] },
      ],
    },
    {
      title: "趣味・好きなこと ⑨",
      words: [
        { id: "hardly-ever", word: "hardly ever", meaning: "ほとんど〜ない", examples: [
          { en: "I hardly ever cook.", ja: "ほとんど料理しないんです。", note: "rarely とほぼ同じ。", form: "hardly ever" },
          { en: "We hardly ever fight.", ja: "私たち、ほとんどけんかしないんだ。", note: "頻度がとても低いことを表す。", form: "hardly ever" },
        ] },
        { id: "for-fun", word: "for fun", meaning: "楽しみで", examples: [
          { en: "I study languages for fun.", ja: "楽しみで語学を勉強しています。", note: "", form: "for fun" },
          { en: "What do you do for fun?", ja: "楽しみでやってることって何?", note: "What do you do for fun? で『趣味は？』の定番。", form: "for fun" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ①",
      words: [
        { id: "older", word: "older", meaning: "年上の", examples: [
          { en: "My older sister is a teacher.", ja: "姉は教師です。", note: "older は old の比較級。older sister = 姉。", form: "older" },
          { en: "He looks older than me.", ja: "彼は私より年上に見えるね。", note: "older than 〜 で『〜より年上』。", form: "older" },
        ] },
        { id: "younger", word: "younger", meaning: "年下の", examples: [
          { en: "My younger brother is still a student.", ja: "弟はまだ学生です。", note: "younger は young の比較級。younger brother = 弟。", form: "younger" },
          { en: "She's two years younger than me.", ja: "彼女は私より2歳年下です。", note: "", form: "younger" },
        ] },
        { id: "only-child", word: "only child", meaning: "一人っ子", examples: [
          { en: "I'm an only child.", ja: "一人っ子です。", note: "", form: "only child" },
          { en: "Being an only child wasn't lonely.", ja: "一人っ子でも寂しくなかったよ。", note: "", form: "only child" },
        ] },
        { id: "close-friend", word: "close friend", meaning: "仲の良い友だち", examples: [
          { en: "He's one of my close friends.", ja: "彼は仲の良い友だちの一人です。", note: "", form: "close friends" },
          { en: "I have a few close friends.", ja: "仲の良い友だちが数人います。", note: "a few close friends で『親しい友が数人』。", form: "close friends" },
        ] },
        { id: "neighbor", word: "neighbor", meaning: "近所の人", examples: [
          { en: "My neighbors are really nice.", ja: "ご近所さんは本当にいい人たちです。", note: "", form: "neighbors" },
          { en: "Our neighbor gave us vegetables.", ja: "近所の人が野菜をくれました。", note: "My neighbors are nice. で『ご近所さんはいい人』。", form: "neighbor" },
        ] },
        { id: "married", word: "married", meaning: "結婚している", examples: [
          { en: "Are you married?", ja: "結婚してるの?", note: "Are you married? で聞ける。", form: "married" },
          { en: "I've been married for ten years.", ja: "結婚して10年になります。", note: "married for 〜 years で『結婚して〜年』。", form: "married" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ②",
      words: [
        { id: "single", word: "single", meaning: "独身の", examples: [
          { en: "I'm single right now.", ja: "今は独身です。", note: "", form: "single" },
          { en: "He's still single.", ja: "彼はまだ独身だよ。", note: "", form: "single" },
        ] },
        { id: "engaged", word: "engaged", meaning: "婚約している", examples: [
          { en: "We just got engaged!", ja: "婚約したばかりなんです!", note: "", form: "engaged" },
          { en: "My sister is engaged.", ja: "妹は婚約しています。", note: "We got engaged! で『婚約しました！』。", form: "engaged" },
        ] },
        { id: "divorced", word: "divorced", meaning: "離婚している", examples: [
          { en: "They got divorced last year.", ja: "彼らは去年離婚しました。", note: "get divorced で『離婚する』。be divorced = 離婚している。", form: "divorced" },
          { en: "She's divorced and has two kids.", ja: "彼女は離婚していて子どもが2人います。", note: "married/single/engaged と並ぶ状態表現。", form: "divorced" },
        ] },
        { id: "go-on-a-date", word: "go on a date", meaning: "デートする", examples: [
          { en: "We went on a date last Friday.", ja: "先週の金曜にデートしました。", note: "", form: "went on a date" },
          { en: "Where did you go on your first date?", ja: "初デートはどこに行ったの?", note: "first date = 初デート。", form: "go on your first date" },
        ] },
        { id: "raise", word: "raise", meaning: "育てる", examples: [
          { en: "Raising kids is hard work.", ja: "子育ては大変な仕事だね。", note: "過去分詞 raised。", form: "Raising" },
          { en: "I was raised by my grandmother.", ja: "祖母に育てられました。", note: "be raised by 〜 で『〜に育てられる』。", form: "raised" },
        ] },
        { id: "take-care-of", word: "take care of", meaning: "世話をする", examples: [
          { en: "I take care of my parents' dog.", ja: "両親の犬の世話をしています。", note: "", form: "take care of" },
          { en: "Take care of yourself!", ja: "体に気をつけてね!", note: "", form: "Take care of" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ③",
      words: [
        { id: "look-like", word: "look like", meaning: "(見た目が)〜に似ている", examples: [
          { en: "You look like your mother.", ja: "お母さんに似てるね。", note: "", form: "look like" },
          { en: "What does he look like?", ja: "彼ってどんな見た目?", note: "", form: "look like" },
        ] },
        { id: "look-up-to", word: "look up to", meaning: "〜を尊敬する、憧れる", examples: [
          { en: "I really look up to my father.", ja: "父を本当に尊敬しているんです。", note: "look up to + 人 で『〜を尊敬する・見習う』。", form: "look up to" },
          { en: "She's someone I've always looked up to.", ja: "彼女はずっと憧れてきた人なんです。", note: "respect と近いが、look up to は『憧れて手本にする』ニュアンス。", form: "looked up to" },
        ] },
        { id: "similar", word: "similar", meaning: "似ている", examples: [
          { en: "We have similar tastes.", ja: "私たち、好みが似てるね。", note: "similar tastes = 似た好み。", form: "similar" },
          { en: "Our jobs are quite similar.", ja: "私たちの仕事はかなり似ています。", note: "similar to 〜 で『〜に似ている』。", form: "similar" },
        ] },
        { id: "get-along", word: "get along", meaning: "仲が良い", examples: [
          { en: "I get along well with my coworkers.", ja: "同僚とは仲良くやっています。", note: "get along (with 〜) で『(〜と)仲良くする』。", form: "get along" },
          { en: "Do you get along with your sister?", ja: "お姉さんとは仲がいい?", note: "get along well で『うまくやっている』。", form: "get along" },
        ] },
        { id: "hang-out", word: "hang out", meaning: "遊ぶ、つるむ", examples: [
          { en: "Let's hang out this weekend!", ja: "今週末、遊ぼうよ!", note: "hang out (with 〜) で『(〜と)遊ぶ・つるむ』。", form: "hang out" },
          { en: "I often hang out with my friends after work.", ja: "仕事の後、よく友だちと遊びます。", note: "Let's hang out! で気軽に誘える。", form: "hang out" },
        ] },
        { id: "stay-in-touch", word: "stay in touch", meaning: "連絡を取り合う", examples: [
          { en: "Let's stay in touch!", ja: "連絡取り合おうね!", note: "", form: "stay in touch" },
          { en: "I still stay in touch with my old friends.", ja: "昔の友だちとは今でも連絡を取っています。", note: "別れ際の Let's stay in touch! が定番。", form: "stay in touch" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ④",
      words: [
        { id: "contact", word: "contact", meaning: "連絡する", examples: [
          { en: "You can contact me anytime.", ja: "いつでも連絡してね。", note: "contact + 人 で『〜に連絡する』。前置詞は不要。", form: "contact" },
          { en: "How can I contact you?", ja: "どうやって連絡すればいい?", note: "How can I contact you? で連絡先を聞ける。", form: "contact" },
        ] },
        { id: "text", word: "text", meaning: "メッセージを送る", examples: [
          { en: "Text me when you get home.", ja: "家に着いたらメッセージしてね。", note: "text + 人 で『〜にメッセージを送る』。", form: "Text" },
          { en: "I'll text you the details.", ja: "詳細をメッセージで送るね。", note: "Text me when 〜 で『〜したら連絡して』。", form: "text" },
        ] },
        { id: "follow", word: "follow", meaning: "フォローする", examples: [
          { en: "Follow me on Instagram!", ja: "インスタでフォローしてね!", note: "", form: "Follow" },
          { en: "I follow a lot of travel accounts.", ja: "旅行系のアカウントをたくさんフォローしています。", note: "Follow me on 〜! でフォローを促せる。", form: "follow" },
        ] },
        { id: "invite", word: "invite", meaning: "招待する", examples: [
          { en: "Thank you for inviting me!", ja: "招待してくれてありがとう!", note: "invite + 人 で『〜を招待する』。", form: "inviting" },
          { en: "Let's invite them to dinner.", ja: "彼らを夕食に招待しよう。", note: "invite 人 to 〜 で『人を〜に招く』。", form: "invite" },
        ] },
        { id: "relationship", word: "relationship", meaning: "関係", examples: [
          { en: "We have a good relationship.", ja: "私たちはいい関係です。", note: "relationship は『関係・間柄』。", form: "relationship" },
          { en: "How's your relationship with your boss?", ja: "上司との関係はどう?", note: "a good relationship で『良い関係』。", form: "relationship" },
        ] },
        { id: "get-married", word: "get married", meaning: "結婚する", examples: [
          { en: "We got married five years ago.", ja: "5年前に結婚しました。", note: "be married(状態)と区別。", form: "got married" },
          { en: "When did you get married?", ja: "いつ結婚したの?", note: "get married to 〜 で『〜と結婚する』。", form: "get married" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ⑤",
      words: [
        { id: "trust", word: "trust", meaning: "信頼する", examples: [
          { en: "I trust her completely.", ja: "彼女を完全に信頼しています。", note: "Trust me. = 信じて。", form: "trust" },
          { en: "Trust me, it's worth it.", ja: "信じて、それだけの価値があるから。", note: "", form: "Trust" },
        ] },
        { id: "respect", word: "respect", meaning: "尊敬する", examples: [
          { en: "I really respect my grandmother.", ja: "祖母を本当に尊敬しているんです。", note: "respect で『尊敬する・尊重する』。", form: "respect" },
          { en: "We respect each other's opinions.", ja: "私たちはお互いの意見を尊重しています。", note: "respect each other で『お互いを尊重する』。", form: "respect" },
        ] },
        { id: "support", word: "support", meaning: "支える、応援する", examples: [
          { en: "My family supports my dream.", ja: "家族が私の夢を応援してくれています。", note: "", form: "supports" },
          { en: "Thanks for supporting me.", ja: "支えてくれてありがとう。", note: "Thanks for supporting me. で感謝を伝えられる。", form: "supporting" },
        ] },
        { id: "encourage", word: "encourage", meaning: "励ます", examples: [
          { en: "She always encourages me.", ja: "彼女はいつも私を励ましてくれるんです。", note: "encourage + 人 で『励ます』。", form: "encourages" },
          { en: "My teacher encouraged me to study abroad.", ja: "先生が留学を後押ししてくれました。", note: "encourage 人 to + 動詞 で『人に〜を勧める』。", form: "encouraged" },
        ] },
        { id: "depend-on", word: "depend on", meaning: "頼る", examples: [
          { en: "You can depend on me.", ja: "私を頼っていいよ。", note: "depend on 〜 で『〜に頼る・〜次第』。", form: "depend on" },
          { en: "It depends on the weather.", ja: "それは天気次第だね。", note: "It depends on 〜. で『〜による』。", form: "depends on" },
        ] },
        { id: "rely-on", word: "rely on", meaning: "頼る、当てにする", examples: [
          { en: "I rely on my sister a lot.", ja: "姉にはすごく頼っています。", note: "depend on とほぼ同じ。", form: "rely on" },
          { en: "Don't rely on your phone too much.", ja: "スマホに頼りすぎないほうがいいよ。", note: "rely on 〜 too much で『頼りすぎる』。", form: "rely on" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ⑥",
      words: [
        { id: "forgive", word: "forgive", meaning: "許す", examples: [
          { en: "I forgave him right away.", ja: "すぐに彼を許したよ。", note: "forgive + 人 で『〜を許す』。過去形 forgave。", form: "forgave" },
          { en: "Can you forgive me?", ja: "許してくれる?", note: "", form: "forgive" },
        ] },
        { id: "argue", word: "argue", meaning: "口論する", examples: [
          { en: "We argued about small things.", ja: "ささいなことで口論したんだ。", note: "argue (about 〜) で『(〜のことで)口論する』。", form: "argued" },
          { en: "Let's not argue about this.", ja: "このことで言い争うのはやめよう。", note: "", form: "argue" },
        ] },
        { id: "fight", word: "fight", meaning: "けんかする", examples: [
          { en: "My brother and I fought a lot as kids.", ja: "子どものころ、兄とよくけんかしました。", note: "過去形 fought。", form: "fought" },
          { en: "They never fight in front of others.", ja: "彼らは人前では決してけんかしないね。", note: "fight in front of others で『人前でけんかする』。", form: "fight" },
        ] },
        { id: "make-up", word: "make up", meaning: "仲直りする", examples: [
          { en: "We fought, but we made up quickly.", ja: "けんかしたけど、すぐ仲直りしたよ。", note: "make up (with 〜) で『(〜と)仲直りする』。", form: "made up" },
          { en: "Did you make up with her?", ja: "彼女と仲直りした?", note: "fight とセットで覚えると便利。", form: "make up" },
        ] },
        { id: "break-up", word: "break up", meaning: "別れる", examples: [
          { en: "They broke up last month.", ja: "彼らは先月別れたんだ。", note: "break up (with 〜) で『(恋人と)別れる』。", form: "broke up" },
          { en: "We broke up but stayed friends.", ja: "別れたけど友だちのままなんです。", note: "stay friends で『友だちのままでいる』。", form: "broke up" },
        ] },
        { id: "care-about", word: "care about", meaning: "〜を大切に思う", examples: [
          { en: "I really care about my friends.", ja: "友だちを本当に大切に思っています。", note: "", form: "care about" },
          { en: "He cares about what people think.", ja: "彼は人の目を気にするんだよね。", note: "care about what people think = 人の目を気にする。", form: "cares about" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ⑦",
      words: [
        { id: "generous", word: "generous", meaning: "気前がいい", examples: [
          { en: "My uncle is really generous.", ja: "おじは本当に気前がいいんです。", note: "", form: "generous" },
          { en: "That's very generous of you!", ja: "なんて気前がいいの!", note: "That's generous of you! で『気前いいね！』。", form: "generous" },
        ] },
        { id: "selfish", word: "selfish", meaning: "わがままな", examples: [
          { en: "Don't be selfish. Let's share.", ja: "わがまま言わないで。分け合おう。", note: "selfish は『わがままな・自分勝手な』。", form: "selfish" },
          { en: "I was selfish when I was young.", ja: "若いころはわがままだったな。", note: "", form: "selfish" },
        ] },
        { id: "reliable", word: "reliable", meaning: "頼りになる", examples: [
          { en: "She's the most reliable person I know.", ja: "彼女は私の知る中で一番頼りになる人です。", note: "reliable は『頼りになる・信頼できる』。", form: "reliable" },
          { en: "I need a reliable friend like you.", ja: "あなたみたいな頼れる友だちが必要なんだ。", note: "", form: "reliable" },
        ] },
        { id: "caring", word: "caring", meaning: "思いやりのある", examples: [
          { en: "He's a very caring person.", ja: "彼はとても思いやりのある人だね。", note: "", form: "caring" },
          { en: "My mother is kind and caring.", ja: "母は優しくて思いやりがあるんです。", note: "", form: "caring" },
        ] },
        { id: "supportive", word: "supportive", meaning: "協力的な、支えてくれる", examples: [
          { en: "My family is very supportive.", ja: "家族がとても応援してくれるんです。", note: "", form: "supportive" },
          { en: "Thanks for being so supportive.", ja: "いつも支えてくれてありがとう。", note: "Thanks for being supportive. で感謝を伝えられる。", form: "supportive" },
        ] },
        { id: "cheerful", word: "cheerful", meaning: "明るい", examples: [
          { en: "She's always cheerful.", ja: "彼女はいつも明るいね。", note: "cheerful は『明るい・元気な』。", form: "cheerful" },
          { en: "His cheerful smile makes everyone happy.", ja: "彼の明るい笑顔はみんなを幸せにするね。", note: "", form: "cheerful" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ⑧",
      words: [
        { id: "outgoing", word: "outgoing", meaning: "社交的な", examples: [
          { en: "My sister is more outgoing than me.", ja: "妹のほうが私より社交的なんです。", note: "outgoing は『社交的な・外向的な』。", form: "outgoing" },
          { en: "You seem really outgoing!", ja: "すごく社交的だね!", note: "more outgoing than 〜 で『〜より社交的』。", form: "outgoing" },
        ] },
        { id: "easygoing", word: "easygoing", meaning: "おおらかな", examples: [
          { en: "My boss is pretty easygoing.", ja: "上司はけっこうおおらかなんです。", note: "easygoing は『おおらかな・のんびりした』。", form: "easygoing" },
          { en: "I like easygoing people.", ja: "おおらかな人が好きだな。", note: "", form: "easygoing" },
        ] },
        { id: "stubborn", word: "stubborn", meaning: "頑固な", examples: [
          { en: "My father is a little stubborn.", ja: "父はちょっと頑固なんです。", note: "stubborn は『頑固な・意地っ張りの』。", form: "stubborn" },
          { en: "Don't be so stubborn!", ja: "そんなに意地張らないで!", note: "", form: "stubborn" },
        ] },
        { id: "positive", word: "positive", meaning: "前向きな", examples: [
          { en: "Try to stay positive!", ja: "前向きにいこう!", note: "stay positive = 前向きでいる。", form: "positive" },
          { en: "She has a positive attitude.", ja: "彼女は前向きな姿勢だね。", note: "", form: "positive" },
        ] },
        { id: "negative", word: "negative", meaning: "後ろ向きな\n否定的な", examples: [
          { en: "Don't be so negative about it.", ja: "そんなに悲観的にならないで。", note: "positive の反対。", form: "negative" },
          { en: "I try to avoid negative thinking.", ja: "ネガティブ思考は避けるようにしています。", note: "", form: "negative" },
        ] },
        { id: "have-a-lot-in-common", word: "have a lot in common", meaning: "共通点が多い", examples: [
          { en: "We have a lot in common!", ja: "私たち、共通点が多いね!", note: "", form: "have a lot in common" },
          { en: "Do you two have anything in common?", ja: "二人に共通点はあるの?", note: "have 〜 in common で『〜という共通点がある』。", form: "have anything in common" },
        ] },
      ],
    },
    {
      title: "家族・人間関係 ⑨",
      words: [
        { id: "get-to-know", word: "get to know", meaning: "知り合う、親しくなる", examples: [
          { en: "I want to get to know you better.", ja: "あなたのことをもっと知りたいな。", note: "", form: "get to know" },
          { en: "It takes time to get to know someone.", ja: "人と親しくなるには時間がかかるね。", note: "get to know 人 better で『もっと知る』。", form: "get to know" },
        ] },
        { id: "make-friends", word: "make friends", meaning: "友だちを作る", examples: [
          { en: "It's easy to make friends here.", ja: "ここでは友だちを作りやすいよ。", note: "make friends (with 〜) で『(〜と)友だちになる』。", form: "make friends" },
          { en: "I made friends with my neighbor.", ja: "近所の人と友だちになったんだ。", note: "easy to make friends で『友だちを作りやすい』。", form: "made friends" },
        ] },
      ],
    },
  ],
};
