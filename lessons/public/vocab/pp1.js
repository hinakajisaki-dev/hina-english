// 過去分詞: 25 irregular verbs whose three forms all differ (ABC: drink – drank –
// drunk), for a student studying them after Week 3. week 3.5 puts the book
// between Week 3 and Week 4 (in a student's own pace too), and label is what the
// screens call it. Each word has its past and past participle (past, pp; ppAlso
// are other right answers); example 1 uses the past form and example 2 the
// past participle (have / be ＋ 過去分詞), form marking it. The test asks for both forms.
export const PP1 = {
  id: "pp1",
  week: 3.5,
  label: "過去分詞",
  title: "過去分詞（不規則動詞 25）",
  everyone: false,
  groups: [
    {
      title: "過去分詞",
      pos: "動詞",
      words: [
        {"id": "be", "word": "be", "past": "was / were", "pp": "been", "meaning": "いる・である", "examples": [{"en": "I was very busy yesterday.", "ja": "昨日はとても忙しかった。", "note": "was ＝ be の過去形（I・he・she・it）", "form": "was"}, {"en": "I have been to Taiwan twice.", "ja": "台湾に2回行ったことがある。", "note": "have been to 〜 ＝ 〜に行ったことがある", "form": "been"}]},
        {"id": "do", "word": "do", "past": "did", "pp": "done", "meaning": "する", "examples": [{"en": "I did my homework last night.", "ja": "昨日の夜、宿題をした。", "note": "did ＝ do の過去形", "form": "did"}, {"en": "Have you done your homework?", "ja": "宿題はもう終わった？", "note": "have ＋ done ＝ もう〜した", "form": "done"}]},
        {"id": "go", "word": "go", "past": "went", "pp": "gone", "meaning": "行く", "examples": [{"en": "We went to the park on Sunday.", "ja": "日曜日に公園へ行った。", "note": "went ＝ go の過去形", "form": "went"}, {"en": "He has already gone home.", "ja": "彼はもう帰っちゃったよ。", "note": "has gone ＝ 行ってしまった（もういない）", "form": "gone"}]},
        {"id": "get", "word": "get", "past": "got", "pp": "gotten", "meaning": "得る", "ppAlso": ["got"], "examples": [{"en": "I got a new phone last week.", "ja": "先週、新しいスマホを買った。", "note": "got ＝ get の過去形", "form": "got"}, {"en": "It has gotten cold recently.", "ja": "最近、寒くなってきた。", "note": "have gotten ＋ 形容詞 ＝ 〜になってきた（イギリス英語では got）", "form": "gotten"}]},
        {"id": "take", "word": "take", "past": "took", "pp": "taken", "meaning": "取る", "examples": [{"en": "I took a lot of photos in Kyoto.", "ja": "京都で写真をたくさん撮った。", "note": "took ＝ take の過去形", "form": "took"}, {"en": "This photo was taken in Hawaii.", "ja": "この写真はハワイで撮られた。", "note": "was ＋ taken ＝ 〜された", "form": "taken"}]},
        {"id": "give", "word": "give", "past": "gave", "pp": "given", "meaning": "あげる", "examples": [{"en": "My wife gave me a present.", "ja": "妻がプレゼントをくれた。", "note": "gave ＝ give の過去形", "form": "gave"}, {"en": "We were given a free dessert.", "ja": "無料のデザートをもらった。", "note": "were ＋ given ＝ 〜をもらった（あたえられた）", "form": "given"}]},
        {"id": "see", "word": "see", "past": "saw", "pp": "seen", "meaning": "見る", "examples": [{"en": "I saw an old friend at the station.", "ja": "駅で昔の友だちに会った。", "note": "saw ＝ see の過去形", "form": "saw"}, {"en": "Have you seen this movie?", "ja": "この映画、見たことある？", "note": "have ＋ seen ＝ 見たことがある", "form": "seen"}]},
        {"id": "know", "word": "know", "past": "knew", "pp": "known", "meaning": "知る", "examples": [{"en": "I knew the answer.", "ja": "答えを知っていた。", "note": "knew ＝ know の過去形", "form": "knew"}, {"en": "I have known him for ten years.", "ja": "彼とは10年の付き合いです。", "note": "have known ＋ for 〜 ＝ 〜のあいだ知っている", "form": "known"}]},
        {"id": "speak", "word": "speak", "past": "spoke", "pp": "spoken", "meaning": "話す", "examples": [{"en": "I spoke English at work today.", "ja": "今日、仕事で英語を話した。", "note": "spoke ＝ speak の過去形", "form": "spoke"}, {"en": "English is spoken in many countries.", "ja": "英語はたくさんの国で話されている。", "note": "is ＋ spoken ＝ 話されている", "form": "spoken"}]},
        {"id": "eat", "word": "eat", "past": "ate", "pp": "eaten", "meaning": "食べる", "examples": [{"en": "I ate ramen for lunch.", "ja": "お昼にラーメンを食べた。", "note": "ate ＝ eat の過去形", "form": "ate"}, {"en": "Have you ever eaten Thai food?", "ja": "タイ料理を食べたことある？", "note": "Have you ever ＋ 過去分詞? ＝ 〜したことある？", "form": "eaten"}]},
        {"id": "drink", "word": "drink", "past": "drank", "pp": "drunk", "meaning": "飲む", "examples": [{"en": "I drank a lot last night.", "ja": "昨日の夜、たくさん飲んだ。", "note": "drank ＝ drink の過去形（✗ drunk）", "form": "drank"}, {"en": "I've drunk three cups of coffee today.", "ja": "今日はもうコーヒーを3杯飲んだ。", "note": "have ＋ drunk ＝ もう〜飲んだ", "form": "drunk"}]},
        {"id": "write", "word": "write", "past": "wrote", "pp": "written", "meaning": "書く", "examples": [{"en": "I wrote an email to my boss.", "ja": "上司にメールを書いた。", "note": "wrote ＝ write の過去形", "form": "wrote"}, {"en": "This book was written in English.", "ja": "この本は英語で書かれている。", "note": "was ＋ written ＝ 書かれた", "form": "written"}]},
        {"id": "forget", "word": "forget", "past": "forgot", "pp": "forgotten", "meaning": "忘れる", "examples": [{"en": "I forgot my umbrella.", "ja": "傘を忘れた。", "note": "forgot ＝ forget の過去形", "form": "forgot"}, {"en": "I've forgotten his name.", "ja": "彼の名前を忘れちゃった。", "note": "have ＋ forgotten ＝ 忘れてしまった（いまも思い出せない）", "form": "forgotten"}]},
        {"id": "wear", "word": "wear", "past": "wore", "pp": "worn", "meaning": "着る", "examples": [{"en": "She wore a beautiful dress.", "ja": "彼女はきれいなドレスを着ていた。", "note": "wore ＝ wear の過去形", "form": "wore"}, {"en": "I've worn these shoes for five years.", "ja": "この靴は5年はいている。", "note": "have worn ＋ for 〜 ＝ 〜のあいだ着て（はいて）いる", "form": "worn"}]},
        {"id": "wake", "word": "wake", "past": "woke", "pp": "woken", "meaning": "起きる", "examples": [{"en": "I woke up at six.", "ja": "6時に起きた。", "note": "woke ＝ wake の過去形", "form": "woke"}, {"en": "I was woken up by my son.", "ja": "息子に起こされた。", "note": "was ＋ woken ＝ 起こされた", "form": "woken"}]},
        {"id": "break", "word": "break", "past": "broke", "pp": "broken", "meaning": "壊す", "examples": [{"en": "My son broke a glass.", "ja": "息子がコップを割った。", "note": "broke ＝ break の過去形", "form": "broke"}, {"en": "My phone is broken.", "ja": "スマホが壊れている。", "note": "is ＋ broken ＝ 壊れている", "form": "broken"}]},
        {"id": "choose", "word": "choose", "past": "chose", "pp": "chosen", "meaning": "選ぶ", "examples": [{"en": "I chose the fish.", "ja": "魚料理を選んだ。", "note": "chose ＝ choose の過去形", "form": "chose"}, {"en": "She was chosen as the team leader.", "ja": "彼女がチームリーダーに選ばれた。", "note": "was ＋ chosen ＝ 選ばれた", "form": "chosen"}]},
        {"id": "fall", "word": "fall", "past": "fell", "pp": "fallen", "meaning": "落ちる", "examples": [{"en": "My son fell off his bike.", "ja": "息子が自転車から落ちた。", "note": "fell ＝ fall の過去形", "form": "fell"}, {"en": "The leaves have fallen.", "ja": "葉っぱが落ちてしまった。", "note": "have ＋ fallen ＝ 落ちてしまった", "form": "fallen"}]},
        {"id": "grow", "word": "grow", "past": "grew", "pp": "grown", "meaning": "育つ", "examples": [{"en": "I grew up in Osaka.", "ja": "大阪で育った。", "note": "grew up ＝ 育った（grow up の過去形）", "form": "grew"}, {"en": "My kids have grown so much.", "ja": "子どもたちはとても大きくなった。", "note": "have ＋ grown ＝ 大きくなった", "form": "grown"}]},
        {"id": "begin", "word": "begin", "past": "began", "pp": "begun", "meaning": "始まる", "examples": [{"en": "The meeting began at nine.", "ja": "会議は9時に始まった。", "note": "began ＝ begin の過去形", "form": "began"}, {"en": "Has the movie begun yet?", "ja": "映画はもう始まった？", "note": "Has 〜 begun yet? ＝ もう始まった？", "form": "begun"}]},
        {"id": "drive", "word": "drive", "past": "drove", "pp": "driven", "meaning": "運転する", "examples": [{"en": "I drove to work today.", "ja": "今日は車で仕事に行った。", "note": "drove ＝ drive の過去形", "form": "drove"}, {"en": "I have never driven in America.", "ja": "アメリカで運転したことはない。", "note": "have never ＋ 過去分詞 ＝ 〜したことがない", "form": "driven"}]},
        {"id": "ride", "word": "ride", "past": "rode", "pp": "ridden", "meaning": "乗る", "examples": [{"en": "I rode a bike to the station.", "ja": "駅まで自転車に乗って行った。", "note": "rode ＝ ride の過去形", "form": "rode"}, {"en": "Have you ever ridden a horse?", "ja": "馬に乗ったことある？", "note": "Have you ever ＋ 過去分詞? ＝ 〜したことある？", "form": "ridden"}]},
        {"id": "swim", "word": "swim", "past": "swam", "pp": "swum", "meaning": "泳ぐ", "examples": [{"en": "We swam in the sea.", "ja": "海で泳いだ。", "note": "swam ＝ swim の過去形", "form": "swam"}, {"en": "I haven't swum for years.", "ja": "何年も泳いでいない。", "note": "haven't ＋ 過去分詞 ＋ for 〜 ＝ 〜のあいだしていない", "form": "swum"}]},
        {"id": "sing", "word": "sing", "past": "sang", "pp": "sung", "meaning": "歌う", "examples": [{"en": "We sang karaoke last night.", "ja": "昨日の夜、カラオケで歌った。", "note": "sang ＝ sing の過去形", "form": "sang"}, {"en": "I have never sung in English.", "ja": "英語で歌ったことはない。", "note": "have never ＋ sung ＝ 歌ったことがない", "form": "sung"}]},
        {"id": "show", "word": "show", "past": "showed", "pp": "shown", "meaning": "見せる", "examples": [{"en": "She showed me her new car.", "ja": "彼女が新しい車を見せてくれた。", "note": "showed ＝ show の過去形", "form": "showed"}, {"en": "Have you shown it to your boss?", "ja": "それ、上司に見せた？", "note": "have ＋ shown ＝ もう見せた", "form": "shown"}]},
      ],
    },
  ],
};
