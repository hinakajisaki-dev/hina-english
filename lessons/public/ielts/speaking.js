// IELTS スピーキング練習 (for a student with ielts_speaking on): the questions for
// Part 1 and the cue cards for Part 2, in the style of the real test.
//
// The test (ielts.org, British Council): 11–14 minutes, one to one with the examiner.
// - Part 1 (4–5 min): questions about yourself and everyday topics. The first
//   topic is your work or studies, your home or your hometown; then two more.
// - Part 2 (3–4 min): a cue card. 1 minute to prepare (notes allowed), then
//   speak for 1–2 minutes; the examiner stops you at 2 minutes.
// - Part 3 (4–5 min): a discussion linked to Part 2 (not practised here yet).
//
// Keys ("p1/work/2", "p2/person-admire") are kept with each recording, so
// questions can be added (at the end of a list) but not reordered or removed.
// The server uses this file too, to check what was answered and to voice the questions.

export const PART1_SECONDS = { aim: [20, 30], max: 60 };
export const PART2_PREP = 60;
export const PART2_SPEAK = 120;
export const PART2_AIM = 90;

// The points shown before each part (short: key words in **bold**).
export const RULES = {
  test: [
    "全部で **11〜14分**。試験官と1対1で話す（録音される）",
    "Part 1 → Part 2 → Part 3 の順",
    "採点は4つ：**流暢さ・語彙・文法・発音**（同じ重さ）",
  ],
  part1: {
    time: "4〜5分 ・ 質問 10こくらい",
    lines: [
      "身近なテーマ **2〜3つ** について質問される",
      "最初は **仕事・勉強・家・出身地** のどれか",
    ],
    points: [
      "1問 **20〜30秒**（2〜3文）",
      "**答え → 理由・例** の順で。Yes / No だけで終わらない",
      "質問の英語をくり返さず、**自分の言葉で言いかえる**",
      "覚えた文を読むように話さない。**自然に**",
      "時制を合わせる（過去のことは **過去形**）",
    ],
  },
  part2: {
    time: "3〜4分",
    lines: [
      "カードのお題について、1人で話す",
      "**1分 準備**（メモOK）→ **2分 話す**（2分で止められる）",
    ],
    points: [
      "カードの **3つの質問 ＋ 最後の explain** を全部話す",
      "**1分半以上**、できれば **2分** 話しきる",
      "メモは **キーワードだけ**（文は書かない）",
      "つまったら、**具体例・そのときの気持ち** を足す",
      "最初の一言でお題を言う：I'd like to talk about …",
    ],
  },
};

// Part 1. intro: one of these is always the first topic (like the real test).
export const PART1_TOPICS = [
  {
    key: "work", name: "Work", ja: "仕事", intro: true,
    questions: [
      ["What do you do?", "お仕事は何をしていますか？"],
      ["Why did you choose this job?", "なぜこの仕事を選んだのですか？"],
      ["What do you like most about your job?", "仕事でいちばん好きなところは何ですか？"],
      ["Would you like to change your job in the future?", "将来、仕事を変えたいですか？"],
    ],
  },
  {
    key: "study", name: "Studies", ja: "勉強", intro: true,
    questions: [
      ["Are you studying anything at the moment?", "いま何か勉強していますか？"],
      ["Why are you learning English?", "なぜ英語を勉強しているのですか？"],
      ["What's the most difficult part of learning English for you?", "英語の勉強でいちばんむずかしいのは何ですか？"],
      ["Do you prefer studying alone or with other people?", "1人で勉強するのと、ほかの人とするのと、どちらが好きですか？"],
    ],
  },
  {
    key: "home", name: "Home", ja: "住まい", intro: true,
    questions: [
      ["Do you live in a house or an apartment?", "一軒家とアパート・マンション、どちらに住んでいますか？"],
      ["What's your favourite room in your home?", "家でいちばん好きな部屋はどこですか？"],
      ["What would you like to change about your home?", "家で変えたいところはありますか？"],
      ["Do you plan to live there for a long time?", "そこに長く住むつもりですか？"],
    ],
  },
  {
    key: "hometown", name: "Hometown", ja: "出身地", intro: true,
    questions: [
      ["Where is your hometown?", "出身はどこですか？"],
      ["What do you like about your hometown?", "出身地の好きなところは何ですか？"],
      ["Has your hometown changed much since you were a child?", "子どものころから、出身地はだいぶ変わりましたか？"],
      ["Would you like to live there in the future?", "将来そこに住みたいですか？"],
    ],
  },
  {
    key: "free-time", name: "Free time", ja: "自由な時間",
    questions: [
      ["What do you usually do in your free time?", "自由な時間には、ふだん何をしますか？"],
      ["Do you prefer spending your free time alone or with others?", "自由な時間は1人と、ほかの人といっしょと、どちらがいいですか？"],
      ["Did you have more free time when you were a child?", "子どものころのほうが、自由な時間は多かったですか？"],
      ["Is there a new hobby you'd like to try?", "やってみたい新しい趣味はありますか？"],
    ],
  },
  {
    key: "weekends", name: "Weekends", ja: "週末",
    questions: [
      ["What did you do last weekend?", "先週末は何をしましたか？"],
      ["Do you usually plan your weekends?", "ふだん週末の予定を立てますか？"],
      ["Are weekends important to you? Why?", "週末はあなたにとって大切ですか？ なぜですか？"],
      ["How do you think your weekends will change in the future?", "これから週末の過ごし方はどう変わると思いますか？"],
    ],
  },
  {
    key: "food", name: "Food", ja: "食べもの",
    questions: [
      ["What's your favourite food?", "好きな食べものは何ですか？"],
      ["Do you prefer eating at home or eating out?", "家で食べるのと外食と、どちらが好きですか？"],
      ["Can you cook?", "料理はできますか？"],
      ["Is there any food you didn't like as a child but like now?", "子どものころは苦手で、いまは好きな食べものはありますか？"],
    ],
  },
  {
    key: "music", name: "Music", ja: "音楽",
    questions: [
      ["What kind of music do you like?", "どんな音楽が好きですか？"],
      ["When do you usually listen to music?", "ふだん、いつ音楽を聞きますか？"],
      ["Have you ever learned to play a musical instrument?", "楽器を習ったことはありますか？"],
      ["Do you prefer listening to music alone or with friends?", "音楽は1人で聞くのと友だちと聞くのと、どちらが好きですか？"],
    ],
  },
  {
    key: "reading", name: "Reading", ja: "読書",
    questions: [
      ["Do you like reading?", "読書は好きですか？"],
      ["What kind of books do you usually read?", "ふだん、どんな本を読みますか？"],
      ["Do you prefer paper books or e-books?", "紙の本と電子書籍、どちらが好きですか？"],
      ["Did you read a lot when you were a child?", "子どものころ、よく本を読みましたか？"],
    ],
  },
  {
    key: "sport", name: "Sport and exercise", ja: "スポーツ・運動",
    questions: [
      ["Do you do any sport or exercise?", "何かスポーツや運動をしていますか？"],
      ["What sports are popular in your country?", "あなたの国では、どんなスポーツが人気ですか？"],
      ["Did you play any sports at school?", "学生のころ、何かスポーツをしていましたか？"],
      ["Do you prefer watching sports or playing them?", "スポーツは見るのとするのと、どちらが好きですか？"],
    ],
  },
  {
    key: "weather", name: "Weather", ja: "天気",
    questions: [
      ["What's the weather like where you live?", "住んでいるところの天気はどうですか？"],
      ["What's your favourite season? Why?", "好きな季節はいつですか？ なぜですか？"],
      ["Does the weather change your mood?", "天気で気分は変わりますか？"],
      ["What do you usually do on rainy days?", "雨の日は、ふだん何をしますか？"],
    ],
  },
  {
    key: "shopping", name: "Shopping", ja: "買いもの",
    questions: [
      ["Do you enjoy shopping?", "買いものは好きですか？"],
      ["Do you prefer shopping online or in shops?", "ネットで買うのとお店で買うのと、どちらが好きですか？"],
      ["What was the last thing you bought?", "最後に買ったものは何ですか？"],
      ["Do you usually plan what to buy before you go shopping?", "買いものに行く前に、買うものを決めておきますか？"],
    ],
  },
  {
    key: "transport", name: "Transport", ja: "交通",
    questions: [
      ["How do you usually get to work or school?", "仕事や学校には、ふだんどうやって行きますか？"],
      ["Is public transport good where you live?", "住んでいるところの公共交通は便利ですか？"],
      ["Do you like driving?", "運転は好きですか？"],
      ["How do you think transport will change in the future?", "交通はこれからどう変わると思いますか？"],
    ],
  },
  {
    key: "travel", name: "Travel", ja: "旅行",
    questions: [
      ["Do you like travelling?", "旅行は好きですか？"],
      ["Where did you go on your last holiday?", "この前の休みには、どこに行きましたか？"],
      ["Do you prefer travelling alone or with others?", "旅行は1人と、ほかの人といっしょと、どちらが好きですか？"],
      ["Where would you like to travel in the future?", "これからどこに旅行したいですか？"],
    ],
  },
  {
    key: "friends", name: "Friends", ja: "友だち",
    questions: [
      ["How often do you see your friends?", "友だちとはどのくらい会いますか？"],
      ["What do you usually do together?", "いっしょに、ふだん何をしますか？"],
      ["Do you prefer having a few close friends or many friends?", "親しい友だちが少しいるのと、友だちがたくさんいるのと、どちらがいいですか？"],
      ["Is it easy to make new friends as an adult?", "大人になってから新しい友だちを作るのは簡単ですか？"],
    ],
  },
  {
    key: "phones", name: "Mobile phones", ja: "スマホ",
    questions: [
      ["How often do you use your phone?", "スマホはどのくらい使いますか？"],
      ["What do you use your phone for most?", "スマホはおもに何に使いますか？"],
      ["Could you live without your phone for a week?", "1週間スマホなしで生活できますか？"],
      ["Do you think people use their phones too much?", "人はスマホを使いすぎだと思いますか？"],
    ],
  },
  {
    key: "films", name: "Films and TV", ja: "映画・テレビ",
    questions: [
      ["Do you like watching films?", "映画を見るのは好きですか？"],
      ["What kind of films do you enjoy?", "どんな映画が好きですか？"],
      ["Do you prefer watching films at home or at the cinema?", "映画は家で見るのと映画館で見るのと、どちらが好きですか？"],
      ["Is there a film you've watched more than once?", "2回以上見た映画はありますか？"],
    ],
  },
  {
    key: "sleep", name: "Sleep", ja: "睡眠",
    questions: [
      ["How many hours do you usually sleep?", "ふだん何時間くらい寝ますか？"],
      ["Do you ever take naps during the day?", "昼寝をすることはありますか？"],
      ["What do you do when you can't sleep?", "眠れないときは何をしますか？"],
      ["Do you think people sleep less now than in the past?", "昔より、いまの人は寝る時間が短いと思いますか？"],
    ],
  },
  {
    key: "drinks", name: "Coffee and tea", ja: "コーヒー・お茶",
    questions: [
      ["Do you prefer coffee or tea?", "コーヒーとお茶、どちらが好きですか？"],
      ["How many cups do you drink a day?", "1日に何杯くらい飲みますか？"],
      ["Do you often go to cafés?", "カフェにはよく行きますか？"],
      ["What do people in your country usually drink when guests visit?", "あなたの国では、お客さんが来たとき、ふつう何を出しますか？"],
    ],
  },
  {
    key: "mornings", name: "Mornings", ja: "朝",
    questions: [
      ["What time do you usually get up?", "ふだん何時に起きますか？"],
      ["What do you usually do in the morning?", "朝はふだん何をしますか？"],
      ["Do you eat breakfast every day?", "朝ごはんは毎日食べますか？"],
      ["Are you a morning person?", "朝型ですか？"],
    ],
  },
  {
    key: "photos", name: "Photos", ja: "写真",
    questions: [
      ["Do you like taking photos?", "写真をとるのは好きですか？"],
      ["What do you usually take photos of?", "ふだん何の写真をとりますか？"],
      ["Do you print your photos or keep them on your phone?", "写真は印刷しますか、それともスマホに入れておきますか？"],
      ["Do you like having your photo taken?", "自分の写真をとられるのは好きですか？"],
    ],
  },
  {
    key: "parks", name: "Parks and nature", ja: "公園・自然",
    questions: [
      ["Is there a park near your home?", "家の近くに公園はありますか？"],
      ["How often do you go to parks?", "公園にはどのくらい行きますか？"],
      ["Do you prefer the countryside or the city?", "いなかと都会、どちらが好きですか？"],
      ["What did you do outdoors when you were a child?", "子どものころ、外で何をして遊びましたか？"],
    ],
  },
  {
    key: "clothes", name: "Clothes", ja: "服",
    questions: [
      ["What kind of clothes do you usually wear?", "ふだん、どんな服を着ますか？"],
      ["Do you wear different clothes at work and at home?", "仕事と家で、ちがう服を着ますか？"],
      ["Where do you usually buy your clothes?", "服はふだん、どこで買いますか？"],
      ["Is fashion important to you?", "ファッションは大切ですか？"],
    ],
  },
  {
    key: "neighbours", name: "Neighbours", ja: "近所の人",
    questions: [
      ["Do you know your neighbours well?", "近所の人をよく知っていますか？"],
      ["How often do you talk to them?", "どのくらい話しますか？"],
      ["Have your neighbours ever helped you?", "近所の人に助けてもらったことはありますか？"],
      ["Is it important to have good neighbours?", "いい近所の人がいるのは大切ですか？"],
    ],
  },
  {
    key: "birthdays", name: "Birthdays", ja: "誕生日",
    questions: [
      ["How do you usually celebrate your birthday?", "誕生日はふだん、どうお祝いしますか？"],
      ["What did you do on your last birthday?", "この前の誕生日は何をしましたか？"],
      ["Do you think birthdays are more important for children or adults?", "誕生日は子どもと大人、どちらにとって大切だと思いますか？"],
      ["What's a good birthday present?", "誕生日のプレゼントには何がいいですか？"],
    ],
  },
  {
    key: "internet", name: "The internet", ja: "インターネット",
    questions: [
      ["How much time do you spend online every day?", "毎日どのくらいネットを使いますか？"],
      ["What websites or apps do you use most?", "いちばん使うサイトやアプリは何ですか？"],
      ["Do you think the internet has made life better?", "インターネットで生活はよくなったと思いますか？"],
      ["Did you use the internet a lot when you were a child?", "子どものころ、ネットをよく使いましたか？"],
    ],
  },
];

// Part 2 cue cards: "Describe …", three things to say, and the explain line.
export const PART2_CARDS = [
  {
    key: "person-admire", title: "Describe a person you admire.", ja: "尊敬している人について話してください。",
    points: ["who this person is", "how you know this person", "what this person has done"],
    explain: "and explain why you admire this person.",
  },
  {
    key: "place-visit", title: "Describe a place you would like to visit in the future.", ja: "これから行ってみたい場所について話してください。",
    points: ["where it is", "how you know about this place", "what you would like to do there"],
    explain: "and explain why you would like to visit this place.",
  },
  {
    key: "trip", title: "Describe a trip you remember well.", ja: "よく覚えている旅行について話してください。",
    points: ["where you went", "who you went with", "what you did there"],
    explain: "and explain why you remember this trip well.",
  },
  {
    key: "skill", title: "Describe a skill you learned that is useful to you.", ja: "身につけて役に立っているスキルについて話してください。",
    points: ["what the skill is", "when and how you learned it", "how you use it"],
    explain: "and explain why this skill is useful to you.",
  },
  {
    key: "book-film", title: "Describe a book or a film that you enjoyed.", ja: "楽しめた本か映画について話してください。",
    points: ["what it is", "when you read or watched it", "what it is about"],
    explain: "and explain why you enjoyed it.",
  },
  {
    key: "gift", title: "Describe a gift you gave to someone.", ja: "だれかにあげたプレゼントについて話してください。",
    points: ["what the gift was", "who you gave it to", "why you chose it"],
    explain: "and explain how the person felt about it.",
  },
  {
    key: "helped", title: "Describe a time when you helped someone.", ja: "だれかを助けたときのことを話してください。",
    points: ["who you helped", "when and where it happened", "how you helped this person"],
    explain: "and explain how you felt about it.",
  },
  {
    key: "restaurant", title: "Describe a restaurant or café you like.", ja: "好きなレストランかカフェについて話してください。",
    points: ["where it is", "how often you go there", "what you usually eat or drink there"],
    explain: "and explain why you like it.",
  },
  {
    key: "technology", title: "Describe a piece of technology you use every day.", ja: "毎日使っている機械や道具について話してください。",
    points: ["what it is", "when you started using it", "what you use it for"],
    explain: "and explain how your life would be different without it.",
  },
  {
    key: "decision", title: "Describe an important decision you made.", ja: "自分でした大事な決断について話してください。",
    points: ["what the decision was", "when you made it", "how you made it"],
    explain: "and explain why it was important.",
  },
  {
    key: "busy", title: "Describe a time when you were very busy.", ja: "とても忙しかったときのことを話してください。",
    points: ["when it was", "what you had to do", "how you managed it"],
    explain: "and explain how you felt at that time.",
  },
  {
    key: "goal", title: "Describe a goal you would like to achieve.", ja: "達成したい目標について話してください。",
    points: ["what the goal is", "when you decided on it", "what you are doing to achieve it"],
    explain: "and explain why this goal is important to you.",
  },
  {
    key: "teacher", title: "Describe a teacher who has influenced you.", ja: "影響を受けた先生について話してください。",
    points: ["who this teacher is", "what this teacher taught you", "what this teacher was like"],
    explain: "and explain how this teacher influenced you.",
  },
  {
    key: "city", title: "Describe a city you have visited.", ja: "行ったことのある街について話してください。",
    points: ["where it is", "when you went there", "what you saw and did there"],
    explain: "and explain what you thought of this city.",
  },
  {
    key: "wait", title: "Describe a time when you had to wait for something.", ja: "何かを待たなければならなかったときのことを話してください。",
    points: ["what you were waiting for", "where and how long you waited", "what you did while you were waiting"],
    explain: "and explain how you felt about waiting.",
  },
  {
    key: "friend", title: "Describe a good friend of yours.", ja: "仲のいい友だちについて話してください。",
    points: ["who this friend is", "how you met", "what you do together"],
    explain: "and explain why you are good friends.",
  },
  {
    key: "conversation", title: "Describe an interesting conversation you had.", ja: "おもしろかった会話について話してください。",
    points: ["who you talked with", "when and where it happened", "what you talked about"],
    explain: "and explain why it was interesting.",
  },
  {
    key: "bought", title: "Describe something you bought recently that you are happy with.", ja: "最近買って満足しているものについて話してください。",
    points: ["what it is", "where you bought it", "how you use it"],
    explain: "and explain why you are happy with it.",
  },
  {
    key: "plan-change", title: "Describe a time when you had to change your plans.", ja: "予定を変えなければならなかったときのことを話してください。",
    points: ["what your plan was", "why you had to change it", "what you did instead"],
    explain: "and explain how you felt about the change.",
  },
  {
    key: "hobby", title: "Describe a hobby you enjoy.", ja: "楽しんでいる趣味について話してください。",
    points: ["what the hobby is", "when you started it", "how often you do it"],
    explain: "and explain why you enjoy it.",
  },
  {
    key: "app", title: "Describe an app or website you find useful.", ja: "役に立っているアプリかウェブサイトについて話してください。",
    points: ["what it is", "how you found it", "what you use it for"],
    explain: "and explain why you find it useful.",
  },
  {
    key: "proud", title: "Describe something you did that made you proud.", ja: "自分でやって誇りに思ったことについて話してください。",
    points: ["what you did", "when you did it", "how you did it"],
    explain: "and explain why it made you proud.",
  },
  {
    key: "event", title: "Describe a festival or celebration you enjoyed.", ja: "楽しかったお祭りやお祝いについて話してください。",
    points: ["what it was", "where and when it happened", "what people did"],
    explain: "and explain why you enjoyed it.",
  },
  {
    key: "outdoor", title: "Describe an outdoor activity you enjoyed.", ja: "楽しかった外での活動について話してください。",
    points: ["what the activity was", "where you did it", "who you did it with"],
    explain: "and explain why you enjoyed it.",
  },
];

// ---------- lookups (the screens and the server) ----------

const p1Key = (topic, i) => `p1/${topic}/${i}`;
const p2Key = (card) => `p2/${card}`;

// Every Part 1 question as { key, topic, en, ja }.
export function part1Questions(topic) {
  return topic.questions.map(([en, ja], i) => ({ key: p1Key(topic.key, i), topic: topic.key, en, ja }));
}

// A question or card by its key: { part, key, en, ja, topic?, card? }, or null.
export function findIeltsItem(key) {
  const [part, a, b] = String(key).split("/");
  if (part === "p1") {
    const topic = PART1_TOPICS.find((t) => t.key === a);
    const q = topic?.questions[Number(b)];
    return q && /^\d+$/.test(b) ? { part: 1, key, topic: topic.key, topicName: topic.name, en: q[0], ja: q[1] } : null;
  }
  if (part === "p2") {
    const card = PART2_CARDS.find((c) => c.key === a);
    return card ? { part: 2, key, card: card.key, en: card.title, ja: card.ja } : null;
  }
  return null;
}
export const cardKey = (card) => p2Key(card.key);

// The English to voice (🔊): the questions and the cards' titles.
export function ieltsSentences() {
  return new Set([
    ...PART1_TOPICS.flatMap((t) => t.questions.map(([en]) => en)),
    ...PART2_CARDS.map((c) => c.title),
  ]);
}

// Random order (Fisher–Yates), so each round is different.
export function shuffled(list, random = Math.random) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// A Part 1 round: like the test (an intro topic, then two others; 4 questions each),
// or one topic. Topics done lately ("recent" keys) come last.
export function part1Round({ topics = 3, recent = [], random = Math.random } = {}) {
  const fresh = (list) => {
    const s = shuffled(list, random);
    return [...s.filter((t) => !recent.includes(t.key)), ...s.filter((t) => recent.includes(t.key))];
  };
  const intro = fresh(PART1_TOPICS.filter((t) => t.intro));
  const others = fresh(PART1_TOPICS.filter((t) => !t.intro));
  const chosen = topics === 1 ? [fresh(PART1_TOPICS)[0]] : [intro[0], ...others.slice(0, topics - 1)];
  return chosen.flatMap((t) => part1Questions(t));
}
