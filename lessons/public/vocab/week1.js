// 単語帳 Week 1, from the teacher's slides. Every student gets the same words.
//
// Each word: id (unique in the week, never change it: students' review lists
// use it), word, meaning, examples. Each example: en, ja, note (the
// explanation under it; \n starts a new line) and form, the exact word as it
// appears in the sentence (made, going …). The cards show it in red and the
// fill-in game blanks it out.

export const WEEK1 = {
  week: 1,
  title: "単語帳 Week 1",
  groups: [
    {
      title: "動詞 ①",
      pos: "動詞",
      words: [
        { id: "go", word: "go", meaning: "行く", examples: [
          { en: "I'm going to the store.", ja: "お店に行く予定です。", note: "go to + 場所 で『〜に行く』。I'm going to ... で予定を言える。", form: "going" },
          { en: "Let's go home.", ja: "家に帰ろう。", note: "go home = 家に帰る", form: "go" },
        ] },
        { id: "get", word: "get", meaning: "①得る ②理解する", examples: [
          { en: "Can you get me some water?", ja: "水を取ってくれる？", note: "Can you get me 〇〇 - 〇〇をとってくれる？ ※some water = 水を少し", form: "get" },
          { en: "I don't get it.", ja: "意味が分からない。", note: "get は『理解する』の意味でも使う。I don't understand より少しカジュアル。", form: "get" },
        ] },
        { id: "make", word: "make", meaning: "①作る ②〜させる", examples: [
          { en: "I'll make dinner tonight.", ja: "今夜は私が夕食を作るね。", note: "食事や飲み物にもよく使う。", form: "make" },
          { en: "This movie made me cry.", ja: "この映画で泣いちゃった。", note: "made（過去形）。make + 【人物】 + 動詞 で『人に〜させる』。", form: "made" },
        ] },
        { id: "have", word: "have", meaning: "①ある ②持つ ③食べる・飲む", examples: [
          { en: "I have a meeting at 3 PM.", ja: "午後3時に会議があります。", note: "have a meeting は『会議がある』。I have a brother（「お兄さんがいる」）という意味でも使える。", form: "have" },
          { en: "I had coffee this morning.", ja: "今朝コーヒーを飲みました。", note: "had（過去形）。have は『食べる・飲む』でも使う。have lunch, have dinner などもよく使う。\n※I had a sandwich for lunch.（お昼ご飯にはサンドイッチを食べた）", form: "had" },
        ] },
        { id: "take", word: "take", meaning: "①取る ②持って行く ③（時間が）かかる", examples: [
          { en: "Please take this to the office.", ja: "これをオフィスに持って行ってください。", note: "take A to B で『AをBに持って行く』。", form: "take" },
          { en: "It takes 10 minutes.", ja: "10分かかります。", note: "It takes + 時間 で『〜時間かかる』。移動や作業時間に使える。\n※It takes 2 hours by train.（電車で2時間かかる）", form: "takes" },
        ] },
      ],
    },
    {
      title: "動詞 ②",
      pos: "動詞",
      words: [
        { id: "use", word: "use", meaning: "使う", examples: [
          { en: "Can I use your phone?", ja: "あなたの電話を使ってもいい？", note: "Can I ... ? で許可を聞ける。", form: "use" },
          { en: "I use this app every day.", ja: "私はこのアプリを毎日使います。", note: "", form: "use" },
        ] },
        { id: "need", word: "need", meaning: "必要とする", examples: [
          { en: "I need more time to finish this.", ja: "これを終わらせるのに、もっと時間が必要です。", note: "more time - もっと時間　finish - 終了、終わる　to finish this - これを終わらせるのに", form: "need" },
          { en: "Do you need any help?", ja: "何か手伝いが必要ですか？", note: "Do you need 〇〇 - 〇〇は必要？　any help - 何かしらの助け", form: "need" },
        ] },
        { id: "find", word: "find", meaning: "見つける", examples: [
          { en: "Did you find your keys?", ja: "鍵、見つかった？", note: "Did you 〇〇? 〇〇した？（過去を聞く質問）", form: "find" },
          { en: "I can't find my bag.", ja: "かばんが見つからない。", note: "can't - can not（できない）。can't find で見つけられないという意味。探し物のときによく使う。", form: "find" },
        ] },
        { id: "put", word: "put", meaning: "置く", examples: [
          { en: "Put the book on the table.", ja: "本をテーブルの上に置いて。", note: "put + もの + 場所 で『〜をどこに置く』。", form: "Put" },
          { en: "Please put your phone in your bag.", ja: "スマホをバッグに入れてください。", note: "on は『上に』、in は『中に』", form: "put" },
        ] },
        { id: "give", word: "give", meaning: "与える", examples: [
          { en: "I'll give you a call later.", ja: "後で電話するね。", note: "give a call は『電話する』。", form: "give" },
          { en: "She gave me a present.", ja: "彼女は私にプレゼントをくれました。", note: "gave - 与えた・くれた（過去形）\nShe gave him（彼女は彼にあげた）、I gave her（私は彼女にあげた）などのパターンがある", form: "gave" },
        ] },
      ],
    },
    {
      title: "動詞 ③",
      pos: "動詞",
      words: [
        { id: "call", word: "call", meaning: "①電話する ②呼ぶ", examples: [
          { en: "Call me when you arrive.", ja: "着いたら電話してね。", note: "when you arrive - あなたが到着したら", form: "Call" },
          { en: "My friends call me Hina.", ja: "友だちは私をひなと呼びます。", note: "", form: "call" },
        ] },
        { id: "ask", word: "ask", meaning: "尋ねる", examples: [
          { en: "I need to ask you a question.", ja: "あなたに質問したいことがあります。", note: "I need to 〇〇 - 〇〇しないといけない", form: "ask" },
          { en: "Can I ask something?", ja: "ちょっと聞いてもいい？", note: "something＝何か。何かちょっと聞いてもいい？という意味", form: "ask" },
        ] },
        { id: "work", word: "work", meaning: "①働く ②うまくいく", examples: [
          { en: "I work from home on Friday.", ja: "金曜日は在宅勤務です。", note: "work from home -『在宅で働く』。", form: "work" },
          { en: "This plan won't work.", ja: "この案はうまくいかない。", note: "work は『機能する・うまくいく』という意味でもよく使う。", form: "work" },
        ] },
        { id: "see", word: "see", meaning: "①見る ②会う", examples: [
          { en: "I can't wait to see that movie!", ja: "あの映画、早く見たい！", note: "see a movie で『映画を見る』。can't wait to 〇〇『〇〇が待ちきれない』。", form: "see" },
          { en: "I'm seeing my friend tomorrow.", ja: "明日、友だちに会います。", note: "see + 【人物】 で『【人物】に会う』。", form: "seeing" },
        ] },
        { id: "talk", word: "talk", meaning: "話す", examples: [
          { en: "Let's talk about the project tomorrow.", ja: "明日プロジェクトについて話そう。", note: "talk about ... で『〜について話す』。", form: "talk" },
          { en: "Can we talk later?", ja: "あとで話せる？", note: "Can we ... ? で相手にやわらかく提案・相談できる。", form: "talk" },
        ] },
      ],
    },
    {
      title: "動詞 ④",
      pos: "動詞",
      words: [
        { id: "buy", word: "buy", meaning: "買う", examples: [
          { en: "I'm going to buy a new phone.", ja: "新しいスマホを買う予定です。", note: "buy + もの で『〜を買う』。going to で予定を表せる。", form: "buy" },
          { en: "I bought some bread this morning.", ja: "今朝パンを買いました。", note: "bought は buy の過去形。よく使うので形ごと覚える。", form: "bought" },
        ] },
        { id: "eat", word: "eat", meaning: "食べる", examples: [
          { en: "Let's eat at that new restaurant.", ja: "あの新しいレストランで食べよう。", note: "eat at + 場所 で『その場所で食べる』。", form: "eat" },
          { en: "What do you want to eat?", ja: "何が食べたい？", note: "", form: "eat" },
        ] },
        { id: "read", word: "read", meaning: "読む", examples: [
          { en: "Have you read this book?", ja: "この本、読んだことある？", note: "Have you read ... ? で『読んだことある？』と過去の経験を聞いている。", form: "read" },
          { en: "I read the news every morning.", ja: "毎朝ニュースを読みます。", note: "every morning - 毎朝　every night - 毎晩　every day - 毎日", form: "read" },
        ] },
        { id: "watch", word: "watch", meaning: "①見る ②見守る", examples: [
          { en: "We're watching the game tonight.", ja: "今夜、試合を見る予定です。", note: "watch は動きのあるものを見るときによく使う。", form: "watching" },
          { en: "Can you watch my bag for a minute?", ja: "ちょっとの間、私のバッグ見ててくれる？", note: "watch は『見守る』の意味でも使える。\nfor a minute - 一瞬", form: "watch" },
        ] },
        { id: "help", word: "help", meaning: "助ける", examples: [
          { en: "Can you help me with this task?", ja: "この仕事を手伝ってもらえる？", note: "task - 仕事、タスク", form: "help" },
          { en: "Thanks for helping me.", ja: "手伝ってくれてありがとう。", note: "Thanks for 〇〇 - 〇〇をありがとう", form: "helping" },
        ] },
      ],
    },
    {
      title: "動詞 ⑤",
      pos: "動詞",
      words: [
        { id: "think", word: "think", meaning: "①考える ②〜と思う（意見）", examples: [
          { en: "I think it's going to rain today.", ja: "今日は雨が降りそうだと思います。", note: "I think ... で『〜だと思う』。自分の考えを言う基本表現。", form: "think" },
          { en: "What do you think?", ja: "どう思う？", note: "相手の意見を聞くときの定番フレーズ。", form: "think" },
        ] },
        { id: "start", word: "start", meaning: "始める", examples: [
          { en: "Let's start the meeting at 10 AM.", ja: "10時に会議を始めましょう。", note: "", form: "start" },
          { en: "I started learning English last year.", ja: "去年、英語の勉強を始めました。", note: "started - 始めた（過去形）　last year - 去年　next year - 来年　this year - 今年", form: "started" },
        ] },
        { id: "pay", word: "pay", meaning: "支払う", examples: [
          { en: "I'll pay for dinner.", ja: "夕食は私が払います。", note: "pay for 〇〇 - 〇〇の代金を払う", form: "pay" },
          { en: "How can I pay?", ja: "どうやって支払えますか？", note: "お店やオンライン決済など、支払い方法を聞くときに便利。", form: "pay" },
        ] },
        { id: "wait", word: "wait", meaning: "待つ", examples: [
          { en: "Please wait here for a moment.", ja: "ちょっとここで待っていてください。", note: "wait here で『ここで待つ』。for a moment で『少しの間』。", form: "wait" },
          { en: "I'm waiting for the bus.", ja: "バスを待っています。", note: "wait for ... で『〜を待つ』。for を忘れやすいので注意。", form: "waiting" },
        ] },
        { id: "leave", word: "leave", meaning: "①出発する ②残す", examples: [
          { en: "I have to leave early today.", ja: "今日は早く出ないといけません。", note: "leave で『出発する・出る』。have to で『〜しなければならない』。", form: "leave" },
          { en: "Please leave your name here.", ja: "ここに名前を書いて残してください。", note: "leave は『残しておく』の意味でも使う。", form: "leave" },
        ] },
      ],
    },
    {
      title: "動詞 ⑥",
      pos: "動詞",
      words: [
        { id: "run", word: "run", meaning: "走る", examples: [
          { en: "I run every morning.", ja: "私は毎朝走ります。", note: "every morning - 毎朝　every night - 毎晩", form: "run" },
          { en: "The train runs every 10 minutes.", ja: "その電車は10分おきに運行しています。", note: "every 10 minutes - 10分おき", form: "runs" },
        ] },
        { id: "open", word: "open", meaning: "開ける", examples: [
          { en: "Can you open the window?", ja: "窓を開けてくれる？", note: "Can you ... ? で依頼・リクエストできる。", form: "open" },
          { en: "The store opens at 9 AM.", ja: "その店は9時に開きます。", note: "open は店やイベントが『始まる・開く』ときにも使う。", form: "opens" },
        ] },
        { id: "close", word: "close", meaning: "閉じる", examples: [
          { en: "Please close the door when you leave.", ja: "出るときはドアを閉めてください。", note: "when でタイミングを説明できる。when you leave - あなたが出た時", form: "close" },
          { en: "I closed my laptop.", ja: "ノートパソコンを閉じました。", note: "過去の行動は closed のように過去形で言う。", form: "closed" },
        ] },
        { id: "move", word: "move", meaning: "①動かす ②引っ越す", examples: [
          { en: "We're moving to a new house next month.", ja: "来月、新しい家に引っ越します。", note: "move to ... で『〜へ引っ越す』。", form: "moving" },
          { en: "Can you move this chair?", ja: "この椅子を動かしてくれる？", note: "", form: "move" },
        ] },
        { id: "drive", word: "drive", meaning: "①運転する ②車で行く", examples: [
          { en: "I drive to work every day.", ja: "毎日車で通勤しています。", note: "drive to work で『車で通勤する』。", form: "drive" },
          { en: "Can you drive me to the station?", ja: "駅まで車で送ってくれる？", note: "Can you 〇〇 - 〇〇できる？", form: "drive" },
        ] },
      ],
    },
    {
      title: "名詞 ①",
      pos: "名詞",
      words: [
        { id: "work-n", word: "work", meaning: "①仕事 ②作業 ③作品", examples: [
          { en: "I have a lot of work to finish before the deadline.", ja: "締め切り前に終わらせる仕事がたくさんあります。", note: "deadline - 締切", form: "work" },
          { en: "This is one of his best works.", ja: "これは彼の最高傑作のひとつです。", note: "作品の意味では works と複数形で使うことが多い。", form: "works" },
        ] },
        { id: "company", word: "company", meaning: "会社", examples: [
          { en: "I work at a marketing company.", ja: "私はマーケティングの会社で働いている。", note: "", form: "company" },
          { en: "She works for a tech company.", ja: "彼女はIT企業で働いています。", note: "work for a company で『会社で働く』と表せる。", form: "company" },
        ] },
        { id: "order", word: "order", meaning: "①注文 ②順番", examples: [
          { en: "I placed an order for a new phone online.", ja: "新しいスマホをオンラインで注文しました。", note: "place an order で『注文する』。よくセットで使う。", form: "order" },
          { en: "Please stand in order.", ja: "順番に並んでください。", note: "order は『順番・秩序』の意味でも使う。", form: "order" },
        ] },
        { id: "employee", word: "employee", meaning: "社員、従業員", examples: [
          { en: "The company has over 500 employees worldwide.", ja: "その会社は世界中で500人以上の従業員がいます。", note: "employee は会社に雇われている人のこと。employer - 雇い主", form: "employees" },
          { en: "She is a full-time employee.", ja: "彼女は正社員です。", note: "full-time employee で『フルタイムの従業員』。", form: "employee" },
        ] },
        { id: "information", word: "information", meaning: "情報", examples: [
          { en: "I need more information before I can make a decision.", ja: "決める前にもっと情報が必要です。", note: "before I can 〇〇 - 〇〇する前に", form: "information" },
          { en: "Can you send me the information?", ja: "その情報を送ってもらえますか？", note: "the information のように特定の情報を指して使える。", form: "information" },
        ] },
      ],
    },
    {
      title: "名詞 ②",
      pos: "名詞",
      words: [
        { id: "need-n", word: "need", meaning: "必要性、〜が必要", examples: [
          { en: "I need to wake up at 7 AM.", ja: "7時に起きないといけない。", note: "wake up - 起きる", form: "need" },
          { en: "There is a need for more staff.", ja: "もっとスタッフが必要です。", note: "a need for 〇〇 - 〇〇が必要", form: "need" },
        ] },
        { id: "travel", word: "travel", meaning: "旅、旅行", examples: [
          { en: "I want to travel to France next year.", ja: "来年はフランスに旅行に行きたい。", note: "travel - 移動、旅行　next year - 来年", form: "travel" },
          { en: "I want to travel the world.", ja: "私は世界を旅したい。", note: "※business trip は『出張』のこと", form: "travel" },
        ] },
        { id: "job", word: "job", meaning: "仕事", examples: [
          { en: "I'm looking for a new job in marketing.", ja: "マーケティングの新しい仕事を探しています。", note: "look for a job で『仕事を探す』。", form: "job" },
          { en: "She got a job at a bank.", ja: "彼女は銀行に就職しました。", note: "get a job で『仕事を得る・就職する』。", form: "job" },
        ] },
        { id: "place", word: "place", meaning: "場所", examples: [
          { en: "This is a nice place to read.", ja: "ここは本を読むのにいい場所だ。", note: "", form: "place" },
          { en: "Have you ever visited this place?", ja: "ここの場所は訪れたことある？", note: "Have you ever 〇〇? 〇〇したことある？", form: "place" },
        ] },
        { id: "visit", word: "visit", meaning: "訪問", examples: [
          { en: "We are visiting Tokyo next month.", ja: "来月東京に行きます。", note: "", form: "visiting" },
          { en: "Her visit made us happy.", ja: "彼女の訪問で私たちはうれしくなりました。", note: "visit は名詞で『訪問』、動詞で『訪れる』にもなる。", form: "visit" },
        ] },
      ],
    },
    {
      title: "名詞 ③",
      pos: "名詞",
      words: [
        { id: "time", word: "time", meaning: "時間", examples: [
          { en: "What time is it?", ja: "今何時？", note: "What time? 時間を聞くときに使う。Can you tell me the time? と聞く場合もある", form: "time" },
          { en: "She made it on time.", ja: "彼女は時間に間に合った。", note: "made it on time - 時間に間に合う（塊で覚える）", form: "time" },
        ] },
        { id: "question", word: "question", meaning: "質問", examples: [
          { en: "I have a question.", ja: "質問があります。", note: "", form: "question" },
          { en: "Feel free to ask any questions.", ja: "質問があればいつでもおっしゃってください。", note: "ホテルなどサービス業で使われる。feel free - お気楽に", form: "questions" },
        ] },
        { id: "move-n", word: "move", meaning: "動き、引っ越し", examples: [
          { en: "I am moving to a new apartment next week.", ja: "来週新しいマンションに引っ越しをします。", note: "apartment - マンション・アパート", form: "moving" },
          { en: "That was a smart move.", ja: "それは賢い行動でした。", note: "move は『一手・行動』という意味でも使う。", form: "move" },
        ] },
        { id: "problem", word: "problem", meaning: "問題", examples: [
          { en: "This problem is hard to solve.", ja: "この問題を解決するのは難しい。", note: "solve - 解決", form: "problem" },
          { en: "That's not a problem.", ja: "問題ありません。", note: "No problem と言う人も多い。「大丈夫よ全然！」のニュアンス", form: "problem" },
        ] },
        { id: "issue", word: "issue", meaning: "問題・課題", examples: [
          { en: "We have an issue with the room.", ja: "この部屋には問題があります（クレーム）。", note: "", form: "issue" },
          { en: "This is an important issue.", ja: "これは重要な課題だ。", note: "Problem と issue の違い：\nproblem はネガティブで実際に害や不都合をもたらすため「解決」すべき具体的なトラブルを指す。\nissue は中立的な言葉で必ずしも悪いことではなく、みんなで「話し合い、取り組むべきテーマや課題」を指す。problem よりも響きが柔らかく、ビジネスシーンで好んで使われる。", form: "issue" },
        ] },
      ],
    },
    {
      title: "名詞 ④",
      pos: "名詞",
      words: [
        { id: "sign", word: "sign", meaning: "看板、標識", examples: [
          { en: "Follow the signs to find the parking area.", ja: "駐車場は標識に従って進んでください。", note: "複数形 signs もよく使う。", form: "signs" },
          { en: "There is a stop sign over there.", ja: "あそこに一時停止の標識があります。", note: "stop sign は『一時停止標識』。", form: "sign" },
        ] },
        { id: "pay-n", word: "pay", meaning: "給料、支払い", examples: [
          { en: "The pay is good, but the hours are long.", ja: "給料はいいけど、勤務時間が長い。", note: "名詞の pay は『給料・報酬』。the pay で『（その仕事の）給料』。", form: "pay" },
          { en: "I got a pay raise this year.", ja: "今年、昇給しました。", note: "pay raise で『昇給』。動詞の pay（支払う）と同じ形なので、文の中での使い方で見分ける。", form: "pay" },
        ] },
        { id: "trip", word: "trip", meaning: "出張、旅行", examples: [
          { en: "I have a business trip to New York next week.", ja: "来週ニューヨークに出張があります。", note: "business trip で『出張』。trip to ... で『〜への旅行』。", form: "trip" },
          { en: "We took a short trip last weekend.", ja: "先週末、私たちは短い旅行をしました。", note: "take a trip で『旅行する』という言い方もよく使う。", form: "trip" },
        ] },
        { id: "stay", word: "stay", meaning: "滞在", examples: [
          { en: "Where are you staying?", ja: "どこに滞在するの？", note: "空港などでよく聞かれるフレーズ", form: "staying" },
          { en: "How long was your stay?", ja: "滞在はどのくらいでしたか？", note: "how long で期間をたずねられる。", form: "stay" },
        ] },
        { id: "present", word: "present", meaning: "プレゼント", examples: [
          { en: "I got her a present for her birthday.", ja: "彼女の誕生日にプレゼントをあげました。", note: "present は『贈り物』の意味。gift も使える。", form: "present" },
          { en: "Thank you for giving me this present.", ja: "このプレゼントをくれてありがとう！", note: "the present で『現在』という意味になる。", form: "present" },
        ] },
      ],
    },
    {
      title: "形容詞 ①",
      pos: "形容詞",
      words: [
        { id: "good", word: "good", meaning: "良い", examples: [
          { en: "This pizza is really good!", ja: "このピザ、すごくおいしい！", note: "味・質・気分など広く使える。", form: "good" },
          { en: "I'm not good at math.", ja: "私は数学が得意ではありません。", note: "not good - 得意ではない", form: "good" },
        ] },
        { id: "bad", word: "bad", meaning: "悪い", examples: [
          { en: "I had a bad day at work today.", ja: "今日は仕事でひどい一日でした。", note: "bad day で『嫌な一日』。気分や状況が悪いときに使える。", form: "bad" },
          { en: "This milk smells bad.", ja: "この牛乳、変なにおいがする。", note: "smell bad で『変なにおいがする』。", form: "bad" },
        ] },
        { id: "hot", word: "hot", meaning: "暑い、熱い", examples: [
          { en: "It's so hot outside, I can't wait for winter!", ja: "外はすごく暑くて、冬が待ち遠しい！", note: "hot は天気や物の「温度」にも使える。", form: "hot" },
          { en: "Be careful, the soup is hot.", ja: "気をつけて、そのスープ熱いよ。", note: "食べ物や飲み物が熱いときにも hot を使う。", form: "hot" },
        ] },
        { id: "cold", word: "cold", meaning: "寒い、冷たい", examples: [
          { en: "This coffee is cold. Can I get a new one?", ja: "このコーヒー冷たいです。新しいのをもらえますか？", note: "cold は天気にも飲み物の温度にも使える。", form: "cold" },
          { en: "My hands are cold.", ja: "手が冷たいです。", note: "", form: "cold" },
        ] },
        { id: "nice", word: "nice", meaning: "素敵な、良い", examples: [
          { en: "That's a really nice jacket you're wearing!", ja: "そのジャケット、すごくいいね！", note: "nice は『素敵な・感じのよい』と幅広く使える。", form: "nice" },
          { en: "Have a nice day!", ja: "よい一日を！", note: "あいさつの定番表現。You too! で返すのが礼儀です。", form: "nice" },
        ] },
      ],
    },
    {
      title: "形容詞 ②",
      pos: "形容詞",
      words: [
        { id: "big", word: "big", meaning: "大きい", examples: [
          { en: "We need a bigger table for all the food.", ja: "食べ物を全部置くにはもっと大きいテーブルが必要です。", note: "bigger は『もっと大きい』という意味を持つ", form: "bigger" },
          { en: "Tokyo is a big city.", ja: "東京は大きな都市です。", note: "big city のように名詞の前に置いて使う。", form: "big" },
        ] },
        { id: "small", word: "small", meaning: "小さい", examples: [
          { en: "I live in a small apartment near downtown.", ja: "私はダウンタウン近くの小さなアパートに住んでいます。", note: "", form: "small" },
          { en: "That's a small problem.", ja: "それは小さな問題です。", note: "物だけでなく『大したことない』という感じでも使える。", form: "small" },
        ] },
        { id: "rude", word: "rude", meaning: "失礼な", examples: [
          { en: "It was rude of him to interrupt our conversation like that.", ja: "そんなふうに話をさえぎるなんて彼は失礼でした。", note: "rude - 失礼　interrupt - さえぎる　conversation - 会話", form: "rude" },
          { en: "Don't be rude to your teacher.", ja: "先生に失礼なことをしてはいけません。", note: "be rude to ... で『〜に失礼である』。", form: "rude" },
        ] },
        { id: "polite", word: "polite", meaning: "丁寧な、礼儀正しい", examples: [
          { en: "She's always polite.", ja: "彼女はいつも礼儀正しいです。", note: "", form: "polite" },
          { en: "Japanese people are known to be polite.", ja: "日本人は礼儀正しいことで有名だ。", note: "known to be 〇〇 - 〇〇で有名、〇〇として知られている（known for 〇〇）", form: "polite" },
        ] },
        { id: "funny", word: "funny", meaning: "面白い", examples: [
          { en: "That movie was so funny, I couldn't stop laughing!", ja: "あの映画、すごく面白くて笑いが止まりませんでした。", note: "funny はコミカルな意味での『おもしろい』という意味", form: "funny" },
          { en: "He looks funny in that hat.", ja: "彼があの帽子をかぶるとなんかおかしい。", note: "funny は『変な・おかしい』というニュアンスにもなる。", form: "funny" },
        ] },
      ],
    },
    {
      title: "形容詞 ③",
      pos: "形容詞",
      words: [
        { id: "last", word: "last", meaning: "この前の、最後の", examples: [
          { en: "Do you remember the last time we went to that restaurant?", ja: "あのレストランに行ったときのこと覚えてる？", note: "Do you remember 〇〇? - 〇〇を覚えている？", form: "last" },
          { en: "This is the last train.", ja: "これが最終電車です。", note: "", form: "last" },
        ] },
        { id: "sure", word: "sure", meaning: "確かな、もちろん", examples: [
          { en: "Are you sure you want to go to that concert?", ja: "本当にそのコンサートに行きたいの？", note: "Are you sure ... ? で『本当に〜？』と確認できる。", form: "sure" },
          { en: "Sure, I can help you.", ja: "もちろん、手伝えるよ。", note: "Sure. は単独で『もちろん』という返事になる。", form: "Sure" },
        ] },
        { id: "different", word: "different", meaning: "異なる、違う", examples: [
          { en: "Each country has different cultures.", ja: "それぞれの国の文化は異なる。", note: "", form: "different" },
          { en: "We have different ideas.", ja: "私たちは違う考えを持っています。", note: "", form: "different" },
        ] },
        { id: "close-adj", word: "close", meaning: "近い", examples: [
          { en: "My house is close to the station, so I walk there every day.", ja: "私の家は駅に近いので、毎日歩いて行きます。", note: "close to ... で『〜に近い』。near も使える。", form: "close" },
          { en: "We are very close friends.", ja: "私たちはとても仲の良い友だちです。", note: "close friends で『親しい友だち』。距離以外にも使える。", form: "close" },
        ] },
        { id: "ready", word: "ready", meaning: "準備ができている", examples: [
          { en: "Are you ready to leave? We're running late!", ja: "出かける準備できた？もう遅れそう！", note: "running late - 遅れている（現在進行形）", form: "ready" },
          { en: "Dinner is ready.", ja: "夕食の準備ができました。", note: "", form: "ready" },
        ] },
      ],
    },
    {
      title: "形容詞 ④",
      pos: "形容詞",
      words: [
        { id: "closed", word: "closed", meaning: "閉まっている", examples: [
          { en: "The store is closed on Sundays.", ja: "その店は日曜日は閉まっています。", note: "", form: "closed" },
          { en: "The door is closed.", ja: "ドアは閉まっています。", note: "", form: "closed" },
        ] },
        { id: "same", word: "same", meaning: "同じ", examples: [
          { en: "We have the same phone!", ja: "私たち同じ携帯持ってる！", note: "", form: "same" },
          { en: "I feel the same way.", ja: "私も同じ気持ちです。", note: "the same way で『同じように・同じ気持ちで』。", form: "same" },
        ] },
        { id: "boring", word: "boring", meaning: "退屈な、つまらない", examples: [
          { en: "The movie was so boring that I fell asleep.", ja: "その映画は退屈すぎて寝てしまいました。", note: "", form: "boring" },
          { en: "Everyone is bored in the class.", ja: "クラスのみんなは退屈そうにしている。", note: "人が退屈しているなら bored を使う", form: "bored" },
        ] },
        { id: "pleased", word: "pleased", meaning: "喜んで、満足している", examples: [
          { en: "I'm really pleased with how the project turned out.", ja: "そのプロジェクトの結果にとても満足しています。", note: "pleased with ... で『〜に満足している』。", form: "pleased" },
          { en: "She was pleased to hear the news.", ja: "彼女はその知らせを聞いて喜びました。", note: "pleased to ... で『〜してうれしい』。", form: "pleased" },
        ] },
        { id: "interested", word: "interested", meaning: "興味がある", examples: [
          { en: "I'm interested in learning more about photography.", ja: "私は写真についてもっと学ぶことに興味があります。", note: "interested in ... で『〜に興味がある』。", form: "interested" },
          { en: "Are you interested in music?", ja: "音楽に興味がありますか？", note: "", form: "interested" },
        ] },
      ],
    },
    {
      title: "副詞 ①",
      pos: "副詞",
      words: [
        { id: "also", word: "also", meaning: "〜もまた", examples: [
          { en: "She's a great singer, and she also plays the guitar.", ja: "彼女はすばらしい歌手で、ギターも弾きます。", note: "文の中ほどに置かれることが多い。", form: "also" },
          { en: "I also want to go.", ja: "私も行きたいです。", note: "I want to go too. でもOK（too と also は同じ「〜も」という意味を持つ）。", form: "also" },
        ] },
        { id: "soon", word: "soon", meaning: "もうすぐ", examples: [
          { en: "I'll be home soon.", ja: "もうすぐ家に帰ります。", note: "近い未来を表す。", form: "soon" },
          { en: "See you soon.", ja: "またすぐ会おうね。", note: "あいさつとしてそのまま使える便利な表現。", form: "soon" },
        ] },
        { id: "still", word: "still", meaning: "まだ、今でも", examples: [
          { en: "He's still waiting for your response.", ja: "彼はまだあなたの返事を待っています。", note: "still は『まだ』。今も続いていることを表す。", form: "still" },
          { en: "I still live in Kyoto.", ja: "私は今でも京都に住んでいます。", note: "今も変わらない状態を言うときに使う。", form: "still" },
        ] },
        { id: "later", word: "later", meaning: "あとで", examples: [
          { en: "I'll call you later tonight.", ja: "今夜あとで電話するね。", note: "時間を少し後ろにずらす感じ。", form: "later" },
          { en: "Let's talk later.", ja: "あとで話そう。", note: "命令っぽくなく、やわらかく提案するときに使える。", form: "later" },
        ] },
        { id: "already", word: "already", meaning: "すでに", examples: [
          { en: "I've already finished the report.", ja: "私はもうレポートを終えています。", note: "完了したことを強調する。", form: "already" },
          { en: "We already know that.", ja: "私たちはそれをすでに知っています。", note: "", form: "already" },
        ] },
      ],
    },
    {
      title: "副詞 ②",
      pos: "副詞",
      words: [
        { id: "once", word: "once", meaning: "一度、かつて", examples: [
          { en: "I met him once at a party.", ja: "彼には一度パーティーで会ったことがあります。", note: "", form: "once" },
          { en: "This place was once a school.", ja: "この場所はかつて学校でした。", note: "once は『かつて』の意味でも使える。", form: "once" },
        ] },
        { id: "early", word: "early", meaning: "早く、早い", examples: [
          { en: "We arrived early to get good seats.", ja: "良い席を取るために早く着きました。", note: "", form: "early" },
          { en: "I went to bed early last night.", ja: "昨夜は早く寝ました。", note: "go to bed early で『早く寝る』。", form: "early" },
        ] },
        { id: "enough", word: "enough", meaning: "十分に", examples: [
          { en: "We have enough food for everyone.", ja: "みんなの分の食べ物は十分にあります。", note: "enough + 名詞 で『十分な〜』。", form: "enough" },
          { en: "Are you warm enough?", ja: "十分暖かいですか？", note: "", form: "enough" },
        ] },
        { id: "almost", word: "almost", meaning: "ほとんど、もう少しで", examples: [
          { en: "I almost forgot to bring my keys.", ja: "鍵を持ってくるのをもう少しで忘れるところでした。", note: "実際には起こらなかったことに使う。", form: "almost" },
          { en: "It's almost 8 o'clock.", ja: "もうすぐ8時です。", note: "時間や数量に『ほとんど』の意味でも使える。", form: "almost" },
        ] },
        { id: "quickly", word: "quickly", meaning: "素早く", examples: [
          { en: "She quickly finished her homework.", ja: "彼女は宿題を素早く終わらせました。", note: "", form: "quickly" },
          { en: "Please reply quickly.", ja: "早めに返信してください。", note: "ビジネスでも日常でも使いやすい。\nほかの言い方でよく使うので、as soon as possible（なるべく早く）も覚えてください。", form: "quickly" },
        ] },
      ],
    },
    {
      title: "前置詞 ①",
      pos: "前置詞",
      words: [
        { id: "for", word: "for", meaning: "①〜のために ②〜に対して", examples: [
          { en: "I bought a gift for my friend's birthday.", ja: "友だちの誕生日のためにプレゼントを買いました。", note: "目的や相手を表せる。", form: "for" },
          { en: "This letter is for you.", ja: "この手紙はあなた宛てです。", note: "for you で『あなたのための・あなた宛ての』。", form: "for" },
        ] },
        { id: "with", word: "with", meaning: "①〜と一緒に ②〜で", examples: [
          { en: "I went to the concert with my brother.", ja: "兄と一緒にコンサートに行きました。", note: "with + 人 で『〜と一緒に』。", form: "with" },
          { en: "I eat rice with chopsticks.", ja: "私は箸でご飯を食べます。", note: "道具を表すときも with を使う。", form: "with" },
        ] },
        { id: "in", word: "in", meaning: "〜の中に、〜で", examples: [
          { en: "There's a lot of water in the bottle.", ja: "ボトルの中にはたくさんの水が入っています。", note: "in は『中に』。場所や空間の中を表す。", form: "in" },
          { en: "I live in Osaka.", ja: "私は大阪に住んでいます。", note: "都市や国などの広い場所にも in を使う。", form: "in" },
        ] },
        { id: "from", word: "from", meaning: "から", examples: [
          { en: "She received a letter from her grandmother.", ja: "彼女は祖母から手紙を受け取りました。", note: "出どころや送り主を表す。", form: "from" },
          { en: "This train is from Kyoto.", ja: "この電車は京都から来ます。", note: "京都から〜のように、場所の起点を表すときにも使える。", form: "from" },
        ] },
        { id: "to", word: "to", meaning: "へ、に", examples: [
          { en: "I'm going to the store later today.", ja: "今日このあと、あのお店に行く予定です。", note: "to は『〜へ』。方向や到着点を表す。", form: "to" },
          { en: "Give this book to Tom.", ja: "この本をトムに渡してください。", note: "相手を表すときにも to を使う。", form: "to" },
        ] },
      ],
    },
    {
      title: "前置詞 ②",
      pos: "前置詞",
      words: [
        { id: "at", word: "at", meaning: "〜で、〜に", examples: [
          { en: "Let's meet at the park at 3 PM.", ja: "3時に公園で会いましょう。", note: "at は点のイメージ。時刻や特定の場所に使う。", form: "at" },
          { en: "She is good at tennis.", ja: "彼女はテニスが得意です。", note: "good at ... - 〇〇が得意。よく出てくる塊", form: "at" },
        ] },
        { id: "of", word: "of", meaning: "の、から", examples: [
          { en: "She's the manager of the cafe.", ja: "彼女はカフェのマネージャーです。", note: "A of B で『BのA』。つながりや所属を表せる。", form: "of" },
          { en: "A cup of tea, please.", ja: "紅茶を一杯お願いします。【紅茶の一部（一杯）】", note: "数量やまとまりの一部を表すときに使う。a piece of cake - ケーキの一部", form: "of" },
        ] },
        { id: "off", word: "〜 off", meaning: "離れて", examples: [
          { en: "Please take off your hat.", ja: "帽子をとってください。", note: "体の一部から帽子を離すイメージ - take off", form: "off" },
          { en: "Please turn off the light.", ja: "電気を消してください。", note: "turn off - ついている状態から「切る」", form: "off" },
        ] },
        { id: "on", word: "on", meaning: "の上に、〜に", examples: [
          { en: "The book is on the table.", ja: "本はテーブルの上にあります。", note: "on は『〜の上に接している』イメージ。本がテーブルの上に接しているイメージ", form: "on" },
          { en: "I have a meeting on Monday.", ja: "月曜日に会議があります。", note: "曜日には on を使う。", form: "on" },
        ] },
        { id: "into", word: "into", meaning: "〜の中に、〜に", examples: [
          { en: "He put the keys into his pocket.", ja: "彼はポケットに鍵を入れました。", note: "into は『外から中へ入る動き』を表す。外からポッケの中に入れるイメージ。", form: "into" },
          { en: "The cat ran into the room.", ja: "その猫は部屋の中に走って入りました。", note: "動きがあるときに in より into が合いやすい。", form: "into" },
        ] },
      ],
    },
    {
      title: "前置詞 ③",
      pos: "前置詞",
      words: [
        { id: "by", word: "by", meaning: "①〜のそばに ②〜によって", examples: [
          { en: "I'll be waiting by the entrance.", ja: "入口のそばで待っています。", note: "by は『〜のそばに』。近くの位置を表す。", form: "by" },
          { en: "This book was written by my teacher.", ja: "この本は私の先生によって書かれました。", note: "受け身では『〜によって』の意味になる。", form: "by" },
        ] },
        { id: "against", word: "against", meaning: "〜に対して、〜に反対して", examples: [
          { en: "The team is playing against their biggest rivals today.", ja: "そのチームは今日、最大のライバルと対戦します。", note: "biggest - 最大の", form: "against" },
          { en: "I'm against that idea.", ja: "私はその案に反対です。", note: "be against ... で『〜に反対である』。", form: "against" },
        ] },
        { id: "until", word: "until", meaning: "〜まで", examples: [
          { en: "I'll be here until 6 PM.", ja: "6時までここにいます。", note: "until はある時点まで続くことを表す。", form: "until" },
          { en: "Wait here until I come back.", ja: "私が戻るまでここで待っていてください。", note: "行動が終わるタイミングまでを示せる。", form: "until" },
        ] },
        { id: "about", word: "about", meaning: "①〜について ②約", examples: [
          { en: "We talked about the movie after we watched it.", ja: "映画を観たあと、その映画について話しました。", note: "talk about はよく使う。", form: "about" },
          { en: "It's about 10 minutes from here.", ja: "ここから約10分です。", note: "数や時間の『約』という意味でも使える。", form: "about" },
        ] },
        { id: "above", word: "above", meaning: "上に", examples: [
          { en: "The picture is hanging above the fireplace.", ja: "その絵は暖炉の上に掛かっています。", note: "above は『〜より上に』。接していない位置を表す。", form: "above" },
          { en: "The temperature is above zero.", ja: "気温は0度より上です。", note: "数値の『〜より上』にも使える。", form: "above" },
        ] },
      ],
    },
    {
      title: "前置詞 ④",
      pos: "前置詞",
      words: [
        { id: "across", word: "across", meaning: "横切って", examples: [
          { en: "We walked across the bridge.", ja: "私たちは橋を渡って歩きました。", note: "across は『端から端へ横切る』イメージ。", form: "across" },
          { en: "The bank is across the street.", ja: "銀行は通りの向こう側にあります。", note: "位置を表して『向こう側に』の意味にもなる。", form: "across" },
        ] },
        { id: "after", word: "after", meaning: "後に", examples: [
          { en: "Let's grab dinner after the meeting.", ja: "会議のあと、夕食を食べましょう。", note: "順番を表す。", form: "after" },
          { en: "I went home after class.", ja: "授業のあと家に帰りました。", note: "", form: "after" },
        ] },
        { id: "before", word: "before", meaning: "前に", examples: [
          { en: "I'll call you before I leave the house.", ja: "家を出る前に電話します。", note: "after の反対。", form: "before" },
          { en: "Wash your hands before dinner.", ja: "夕食の前に手を洗ってください。", note: "", form: "before" },
        ] },
        { id: "behind", word: "behind", meaning: "〜の後ろに", examples: [
          { en: "The car is parked behind the building.", ja: "その車は建物の後ろに止まっています。", note: "位置関係を表す。", form: "behind" },
          { en: "She sat behind me.", ja: "彼女は私の後ろに座りました。", note: "人や物の後ろ、どちらにも使える。", form: "behind" },
        ] },
        { id: "below", word: "below", meaning: "〜の下に", examples: [
          { en: "The temperature dropped below freezing last night.", ja: "昨夜、気温は氷点下まで下がりました。", note: "below は『〜より下に』。", form: "below" },
          { en: "Please write your name below.", ja: "下に名前を書いてください。", note: "数値だけでなく、位置を表すときに使える", form: "below" },
        ] },
      ],
    },
  ],
};
