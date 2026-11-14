// 会話で復習 Week 1: the words of 単語帳 Week 1 again, a few at a time, each
// group in a short conversation between Mia and Ken (words.js TALK_PEOPLE).
// The voices are made once with ElevenLabs and kept in R2
// (scripts/teacher.mjs talk-audio; the app falls back to its usual voice).
//
// A talk: title, emoji, words (ids in the `from` 単語帳, or "w2/know" for
// another book's) and lines [who, English, Japanese]. In the English, [ ]
// marks a word of the talk as it is used there (shown in red). A talk's
// number is its place in the list, so add new talks at the end.

export const KAIWA1 = {
  id: "kaiwa1",
  week: 4,
  talk: true,
  from: "w1",
  label: "会話で復習",
  title: "会話で復習（Week 1 の単語）",
  everyone: false,
  talks: [
    {
      title: "朝の駅で", emoji: "🚉",
      words: ["early", "leave", "take", "drive", "still", "wait", "soon", "go"],
      lines: [
        ["mia", "Good morning, Ken! You're here [early] today.", "おはよう、ケン！今日は早いね。"],
        ["ken", "Morning, Mia! I [left] home at six.", "おはよう、ミア！6時に家を出たんだ。"],
        ["mia", "Wow! How long does it [take] from your home?", "すごい！家からどのくらいかかるの？"],
        ["ken", "About an hour. I don't [drive].", "1時間くらい。車は運転しないんだ。"],
        ["mia", "Hmm, our train is [still] not here.", "うーん、電車がまだ来ないね。"],
        ["ken", "Let's [wait]. It'll come [soon].", "待とう。もうすぐ来るよ。"],
        ["mia", "Oh, here it comes! Let's [go]!", "あ、来た！行こう！"],
      ],
    },
    {
      title: "カフェで", emoji: "☕",
      words: ["buy", "have", "hot", "cold", "big", "small", "order", "pay"],
      lines: [
        ["mia", "Ken, let me [buy] you a coffee today.", "ケン、今日はコーヒーをおごらせて。"],
        ["ken", "Really? Thanks, Mia!", "本当？ありがとう、ミア！"],
        ["mia", "What will you [have]? [Hot] or [cold]?", "何にする？ホット？アイス？"],
        ["ken", "[Cold], please. It's so [hot] today.", "アイスで。今日はすごく暑いから。"],
        ["mia", "[Big] or [small]?", "大きいの？小さいの？"],
        ["ken", "[Small] is fine.", "小さいのでいいよ。"],
        ["mia", "Oh, our [order] is ready!", "あ、頼んだのができたよ！"],
        ["ken", "Thank you! I'll [pay] next time.", "ありがとう！次はぼくが払うね。"],
      ],
    },
    {
      title: "新しい仕事", emoji: "💼",
      words: ["start", "job", "work", "company", "employee", "different", "interested", "pleased"],
      lines: [
        ["mia", "Ken, I heard you [started] a new [job]!", "ケン、新しい仕事を始めたって聞いたよ！"],
        ["ken", "Yes! I [work] for a travel [company] now.", "うん！今は旅行会社で働いてるんだ。"],
        ["mia", "Nice! How many [employees] are there?", "いいね！社員は何人いるの？"],
        ["ken", "About fifty.", "50人くらい。"],
        ["mia", "Is it [different] from your old job?", "前の仕事とはちがう？"],
        ["ken", "Very [different]. But I'm [interested] in travel, so I like it.", "すごくちがうよ。でも旅行に興味があるから、気に入ってる。"],
        ["mia", "I'm [pleased] to hear that!", "それを聞いてうれしいよ！"],
      ],
    },
    {
      title: "旅行の相談", emoji: "📞",
      words: ["ask", "question", "sure", "information", "find", "call", "later", "talk"],
      lines: [
        ["mia", "Ken, can I [ask] you a [question]?", "ケン、質問してもいい？"],
        ["ken", "[Sure]. What is it?", "もちろん。なに？"],
        ["mia", "I want to go to Hokkaido. I need some [information].", "北海道に行きたいの。情報がほしくて。"],
        ["ken", "OK! Let me [find] some good hotels.", "いいよ！いいホテルを探してみるね。"],
        ["mia", "Thanks! Can you [call] me [later]?", "ありがとう！あとで電話してくれる？"],
        ["ken", "[Sure]. Let's [talk] tonight.", "うん。今夜話そう。"],
      ],
    },
    {
      title: "お昼ごはん", emoji: "🍜",
      words: ["almost", "eat", "good", "nice", "place", "bad", "need", "enough", "quickly"],
      lines: [
        ["ken", "Mia, it's [almost] twelve. Let's [eat] lunch!", "ミア、もうすぐ12時だよ。お昼ごはん食べよう！"],
        ["mia", "[Good] idea! Do you know a [nice] [place]?", "いいね！いいお店、知ってる？"],
        ["ken", "There's a ramen shop near here. It's not [bad].", "近くにラーメン屋があるよ。悪くないよ。"],
        ["mia", "But I [need] to go back at 12:30.", "でも、12時半に戻らないといけないの。"],
        ["ken", "Hmm, is thirty minutes [enough]?", "うーん、30分で足りるかな？"],
        ["mia", "Yes, if we eat [quickly]!", "うん、さっと食べればね！"],
      ],
    },
    {
      title: "プレゼント選び", emoji: "🎁",
      words: ["give", "present", "think", "help", "boring", "see", "funny", "same"],
      lines: [
        ["mia", "I want to [give] my sister a [present].", "妹にプレゼントをあげたいの。"],
        ["ken", "What do you [think] she wants?", "何がほしいと思う？"],
        ["mia", "I don't know. Can you [help] me?", "わからない。手伝ってくれる？"],
        ["ken", "Sure. How about a book?", "いいよ。本はどう？"],
        ["mia", "Hmm, books are [boring] for her.", "うーん、妹には本はつまらないかな。"],
        ["ken", "Did you [see] this T-shirt? It's [funny]!", "このTシャツ見た？おもしろいよ！"],
        ["mia", "Ha! She has the [same] one!", "はは！妹、同じのを持ってる！"],
      ],
    },
    {
      title: "旅行の話", emoji: "✈️",
      words: ["trip", "last", "visit", "stay", "time", "once", "already", "travel"],
      lines: [
        ["mia", "How was your [trip] [last] week?", "先週の旅行はどうだった？"],
        ["ken", "Great! It was my first [visit] to Okinawa.", "最高！沖縄は初めてだったんだ。"],
        ["mia", "How long was your [stay]?", "どのくらい滞在したの？"],
        ["ken", "Four days. But I didn't have [time] to see everything.", "4日間。でも、全部見る時間はなかったな。"],
        ["mia", "I went there [once]. It's beautiful!", "私も一度行ったことある。きれいだよね！"],
        ["ken", "Yes! I [already] want to go back.", "うん！もうまた行きたいよ。"],
        ["mia", "[Travel] is the best!", "旅行って最高だよね！"],
      ],
    },
    {
      title: "引っ越し", emoji: "📦",
      words: ["move", "ready", "move-n", "put", "into", "close", "open"],
      lines: [
        ["mia", "Ken, I heard you're [moving]!", "ケン、引っ越すんだってね！"],
        ["ken", "Yes, on Saturday. But I'm not [ready] yet.", "うん、土曜日に。でも、まだ準備ができてないんだ。"],
        ["mia", "Do you need help with the [move]?", "引っ越し、手伝おうか？"],
        ["ken", "Really? Thank you!", "本当？ありがとう！"],
        ["mia", "Where should I [put] these books?", "この本、どこに置けばいい？"],
        ["ken", "Put them [into] this box, please.", "この箱に入れてね。"],
        ["mia", "OK! Should I [close] the box?", "わかった！箱、閉じていい？"],
        ["ken", "Yes. Oh, and can you [open] the window? It's hot.", "うん。あ、窓を開けてくれる？暑くて。"],
      ],
    },
    {
      title: "仕事のなやみ", emoji: "😓",
      words: ["problem", "work-n", "until", "pay-n", "rude", "issue", "polite"],
      lines: [
        ["mia", "You look tired, Ken. Is there a [problem]?", "ケン、疲れてるみたい。何か問題があるの？"],
        ["ken", "I have too much [work]. I'm at the office [until] ten every night.", "仕事が多すぎて。毎晩10時まで会社にいるんだ。"],
        ["mia", "Oh no. Is the [pay] good?", "ええっ。お給料はいいの？"],
        ["ken", "The [pay] is OK. But one customer is very [rude].", "給料はまあまあ。でも、すごく失礼なお客さんが一人いて。"],
        ["mia", "That's a big [issue].", "それは大きな問題だね。"],
        ["ken", "I'm always [polite] to him, but it's hard.", "いつも丁寧にしてるけど、大変だよ。"],
        ["mia", "Talk to your boss. You can do it!", "上司に話してみて。がんばって！"],
      ],
    },
    {
      title: "待ち合わせ", emoji: "🗺️",
      words: ["across", "behind", "sign", "above", "at", "by", "closed"],
      lines: [
        ["ken", "Mia, where's the new bakery?", "ミア、新しいパン屋さんってどこ？"],
        ["mia", "It's [across] the street, [behind] the bank.", "道の向こう側、銀行の裏だよ。"],
        ["ken", "Oh, I see a [sign] [above] the door.", "あ、ドアの上に看板が見える。"],
        ["mia", "That's it! Let's meet there [at] ten.", "そこそこ！10時にそこで会おう。"],
        ["ken", "OK. Should I come [by] car?", "わかった。車で行こうか？"],
        ["mia", "No. The parking lot is [closed] today.", "ううん。今日は駐車場が閉まってるの。"],
      ],
    },
    {
      title: "映画の約束", emoji: "🎬",
      words: ["watch", "about", "read", "before", "of", "on", "after", "off"],
      lines: [
        ["mia", "Ken, do you want to [watch] a movie tonight?", "ケン、今夜、映画を見ない？"],
        ["ken", "Sure! What's it [about]?", "いいね！どんな話？"],
        ["mia", "It's [about] a dog. I [read] the book [before].", "犬の話。前に原作の本を読んだの。"],
        ["ken", "Is it good?", "おもしろい？"],
        ["mia", "Yes! It's one [of] my favorite stories.", "うん！大好きなお話のひとつなの。"],
        ["ken", "Is it [on] TV?", "テレビでやるの？"],
        ["mia", "Yes, at nine. Let's eat dinner [after] work.", "うん、9時から。仕事のあとに夜ごはんを食べよう。"],
        ["ken", "OK! And I'll turn [off] my phone.", "いいよ！スマホの電源も切っておくね。"],
      ],
    },
    {
      title: "日曜のランニング", emoji: "🏃",
      words: ["run", "with", "from", "to", "for", "in", "also"],
      lines: [
        ["ken", "I [run] every Sunday morning.", "毎週日曜の朝、走ってるんだ。"],
        ["mia", "Really? Do you run alone?", "本当？一人で走るの？"],
        ["ken", "No, [with] my brother.", "ううん、兄と一緒に。"],
        ["mia", "Where do you run?", "どこを走るの？"],
        ["ken", "[From] my house [to] the park. We run [for] an hour.", "家から公園まで。1時間走るよ。"],
        ["mia", "Even [in] the rain?", "雨の中でも？"],
        ["ken", "Ha, no way!", "はは、まさか！"],
        ["mia", "I [also] want to try running!", "私も走ってみたいな！"],
        ["ken", "Then come with us!", "じゃあ、一緒においでよ！"],
      ],
    },
    {
      title: "みんなの夜ごはん", emoji: "🍛",
      words: ["make", "against", "use", "below", "get", "close-adj", "need-n"],
      lines: [
        ["mia", "Ken, let's [make] dinner for everyone tonight!", "ケン、今夜みんなに夜ごはんを作ろうよ！"],
        ["ken", "Good idea! How about curry? Is anyone [against] it?", "いいね！カレーはどう？反対の人いるかな？"],
        ["mia", "Ha! Nobody is against curry!", "はは！カレーに反対する人なんていないよ！"],
        ["ken", "Can I [use] this pot? And where are the plates?", "このお鍋、使っていい？あと、お皿はどこ？"],
        ["mia", "Sure! The plates are [below] the sink.", "どうぞ！お皿はシンクの下だよ。"],
        ["ken", "Should I [get] more onions? The store is [close].", "玉ねぎ、もっと買ってこようか？お店、近いし。"],
        ["mia", "No [need]. We have enough.", "その必要はないよ。足りてるから。"],
      ],
    },
  ],
};
