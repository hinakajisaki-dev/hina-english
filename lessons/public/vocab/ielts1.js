// 単語帳 IELTS 語彙 Week 1, from the teacher's PDF (IELTS 語彙 100): 10 themes of
// ten words, one example each. Only for the students the teacher gives it to
// (vocab_books, see words.js); it takes the place of the shared Week 1 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, note, form).

export const IELTS1 = {
  id: "ielts1",
  week: 1,
  title: "IELTS 語彙 Week 1",
  groups: [
    {
      title: "変化・数量",
      words: [
        { id: "increase", word: "increase", meaning: "増える・増加", pos: "動詞・名詞", examples: [
          { en: "The number of students who study abroad has increased recently.", ja: "留学する学生の数は最近増加している。", note: "study abroad=留学する\nabroad=海外へ", form: "increased" },
        ] },
        { id: "decrease", word: "decrease", meaning: "減る・減少", pos: "動詞・名詞", examples: [
          { en: "The number of young people in rural areas is decreasing.", ja: "地方の若者の数は減少している。", note: "rural area=地方・田舎（の地域）", form: "decreasing" },
        ] },
        { id: "reduce", word: "reduce", meaning: "減らす", pos: "動詞", examples: [
          { en: "We should reduce the amount of plastic we use.", ja: "使うプラスチックの量を減らすべきだ。", note: "the amount of 〜=〜の量（数えられない物に使う）", form: "reduce" },
        ] },
        { id: "rise", word: "rise", meaning: "上がる・上昇", pos: "動詞・名詞", examples: [
          { en: "House prices have risen sharply in big cities.", ja: "大都市では住宅価格が急激に上がった。", note: "have risen sharply=急激に上がった\nrise-rose-risen", form: "risen" },
        ] },
        { id: "amount", word: "amount", meaning: "量", pos: "名詞", examples: [
          { en: "A large amount of food is wasted every day.", ja: "毎日大量の食べ物が捨てられている。", note: "is wasted=無駄にされる（waste の受け身）", form: "amount" },
        ] },
        { id: "rate", word: "rate", meaning: "割合・率", pos: "名詞", examples: [
          { en: "The unemployment rate is still high in some countries.", ja: "一部の国では失業率が依然として高い。", note: "unemployment=失業 / still=依然として", form: "rate" },
        ] },
        { id: "average", word: "average", meaning: "平均", pos: "名詞・形容詞", examples: [
          { en: "On average, people spend three hours a day on their phones.", ja: "平均して人々は1日3時間スマホに使う。", note: "spend+時間+on 〜=〜に時間を使う / a day=1日に", form: "average" },
        ] },
        { id: "double", word: "double", meaning: "2倍にする", pos: "動詞", examples: [
          { en: "The city's population has doubled over the past 20 years.", ja: "その都市の人口は過去20年で2倍になった。", note: "over the past 〜 years=この〜年で", form: "doubled" },
        ] },
        { id: "gradually", word: "gradually", meaning: "徐々に", pos: "副詞", examples: [
          { en: "The weather is gradually getting warmer.", ja: "天気は徐々に暖かくなっている。", note: "get+比較級=だんだん〜になる（warmer=より暖かい）", form: "gradually" },
        ] },
        { id: "significant", word: "significant", meaning: "大きな・重要な", pos: "形容詞", examples: [
          { en: "There has been a significant increase in online shopping.", ja: "オンライン買い物が大幅に増えた。", note: "an increase in 〜=〜の増加 / online shopping=ネット通販", form: "significant" },
        ] },
      ],
    },
    {
      title: "因果・影響",
      words: [
        { id: "affect", word: "affect", meaning: "影響を与える", pos: "動詞", examples: [
          { en: "Air pollution can seriously affect our health.", ja: "大気汚染は健康に深刻な影響を与えうる。", note: "seriously=深刻に\naffect(動)↔effect(名)", form: "affect" },
        ] },
        { id: "effect", word: "effect", meaning: "影響・効果", pos: "名詞", examples: [
          { en: "Exercise has a positive effect on mental health.", ja: "運動は心の健康に良い影響がある。", note: "mental health=心の健康\nhave a positive effect on 〜=〜に良い影響がある", form: "effect" },
        ] },
        { id: "cause", word: "cause", meaning: "引き起こす・原因", pos: "動詞・名詞", examples: [
          { en: "Heavy traffic often causes air pollution.", ja: "激しい渋滞はしばしば大気汚染を引き起こす。", note: "heavy traffic=交通量の多さ / often=よく", form: "causes" },
        ] },
        { id: "result", word: "result", meaning: "結果", pos: "名詞・動詞", examples: [
          { en: "As a result, many companies now allow remote work.", ja: "結果として、多くの企業が今は在宅勤務を認める。", note: "allow=認める / remote work=在宅勤務", form: "result" },
        ] },
        { id: "lead-to", word: "lead to", meaning: "〜につながる", pos: "句動詞", examples: [
          { en: "A poor diet can lead to serious health problems.", ja: "悪い食生活は深刻な健康問題につながりうる。", note: "poor diet=偏った食生活（poor=乏しい）/ serious=深刻な", form: "lead to" },
        ] },
        { id: "depend-on", word: "depend on", meaning: "〜次第", pos: "句動詞", examples: [
          { en: "The success of the plan depends on the budget.", ja: "その計画の成功は予算次第だ。", note: "success=成功 / budget=予算", form: "depends on" },
        ] },
        { id: "influence", word: "influence", meaning: "影響", pos: "名詞・動詞", examples: [
          { en: "Parents have a strong influence on their children.", ja: "親は子どもに強い影響を持つ。", note: "have a strong influence on 〜=〜に強い影響がある", form: "influence" },
        ] },
        { id: "impact", word: "impact", meaning: "影響・衝撃", pos: "名詞", examples: [
          { en: "Social media has a huge impact on young people.", ja: "SNSは若者に大きな影響を与える。", note: "huge=非常に大きな / social media=SNS", form: "impact" },
        ] },
        { id: "benefit", word: "benefit", meaning: "利益・ためになる", pos: "名詞・動詞", examples: [
          { en: "Learning a language has many benefits.", ja: "言語を学ぶことには多くの利点がある。", note: "many benefits=多くの利点\nbenefit from 〜=〜から恩恵を受ける", form: "benefits" },
        ] },
        { id: "harm", word: "harm", meaning: "害を与える・害", pos: "動詞・名詞", examples: [
          { en: "Using too many cars harms the environment.", ja: "車を使いすぎることは環境に害を与える。", note: "too many 〜=〜が多すぎる\nharmful=有害な(形)", form: "harms" },
        ] },
      ],
    },
    {
      title: "環境",
      words: [
        { id: "environment", word: "environment", meaning: "環境", pos: "名詞", examples: [
          { en: "We must protect the environment for future generations.", ja: "未来の世代のために環境を守らねばならない。", note: "future generations=未来の世代 / protect=守る", form: "environment" },
        ] },
        { id: "pollution", word: "pollution", meaning: "汚染", pos: "名詞", examples: [
          { en: "Air pollution is a serious problem in large cities.", ja: "大気汚染は大都市で深刻な問題だ。", note: "air pollution=大気汚染 / serious=深刻な", form: "pollution" },
        ] },
        { id: "climate", word: "climate", meaning: "気候", pos: "名詞", examples: [
          { en: "Climate change affects the whole world.", ja: "気候変動は世界全体に影響する。", note: "climate change=気候変動 / the whole world=世界全体", form: "Climate" },
        ] },
        { id: "energy", word: "energy", meaning: "エネルギー", pos: "名詞", examples: [
          { en: "Solar power is a clean source of energy.", ja: "太陽光発電はクリーンなエネルギー源だ。", note: "solar power=太陽光発電 / source=源", form: "energy" },
        ] },
        { id: "resource", word: "resource", meaning: "資源", pos: "名詞", examples: [
          { en: "We should not waste natural resources.", ja: "自然資源を無駄にすべきではない。", note: "natural resources=天然資源 / waste=無駄にする", form: "resources" },
        ] },
        { id: "waste", word: "waste", meaning: "無駄にする・ごみ", pos: "動詞・名詞", examples: [
          { en: "People waste a lot of water every day.", ja: "人々は毎日たくさんの水を無駄にしている。", note: "waste time/money=時間・お金を無駄にする\na lot of=たくさんの", form: "waste" },
        ] },
        { id: "recycle", word: "recycle", meaning: "リサイクルする", pos: "動詞", examples: [
          { en: "It is important to recycle paper and plastic.", ja: "紙やプラスチックのリサイクルは大切だ。", note: "It is important to 〜=〜することが大切", form: "recycle" },
        ] },
        { id: "protect", word: "protect", meaning: "守る", pos: "動詞", examples: [
          { en: "National parks help protect wild animals.", ja: "国立公園は野生動物を守るのに役立つ。", note: "national park=国立公園 / wild animals=野生動物", form: "protect" },
        ] },
        { id: "damage", word: "damage", meaning: "傷つける・損害", pos: "動詞・名詞", examples: [
          { en: "Plastic waste damages the ocean.", ja: "プラスチックごみは海を傷つける。", note: "plastic waste=プラスチックごみ / ocean=海", form: "damages" },
        ] },
        { id: "natural", word: "natural", meaning: "自然の", pos: "形容詞", examples: [
          { en: "The country is rich in natural beauty.", ja: "その国は自然の美しさに富んでいる。", note: "be rich in 〜=〜に富む / natural beauty=自然美", form: "natural" },
        ] },
      ],
    },
    {
      title: "教育・学習",
      words: [
        { id: "education", word: "education", meaning: "教育", pos: "名詞", examples: [
          { en: "A good education gives children more opportunities.", ja: "良い教育は子どもにより多くの機会を与える。", note: "opportunity=機会\ngive 人 物=人に物を与える", form: "education" },
        ] },
        { id: "knowledge", word: "knowledge", meaning: "知識", pos: "名詞", examples: [
          { en: "Reading books helps us gain knowledge.", ja: "読書は知識を得る助けになる。", note: "gain=得る（gain knowledge=知識を得る）", form: "knowledge" },
        ] },
        { id: "research", word: "research", meaning: "研究", pos: "名詞・動詞", examples: [
          { en: "Scientists are doing research on new medicines.", ja: "科学者たちは新薬の研究をしている。", note: "do research on 〜=〜を研究する / medicine=薬", form: "research" },
        ] },
        { id: "skill", word: "skill", meaning: "技能", pos: "名詞", examples: [
          { en: "Communication is an important skill at work.", ja: "コミュニケーションは仕事で重要な技能だ。", note: "at work=職場で\ncommunication=意思疎通", form: "skill" },
        ] },
        { id: "method", word: "method", meaning: "方法", pos: "名詞", examples: [
          { en: "Teachers use different methods to help students learn.", ja: "教師は生徒の学習を助けるため様々な方法を使う。", note: "different=さまざまな\na method of 〜ing=〜する方法", form: "methods" },
        ] },
        { id: "subject", word: "subject", meaning: "科目・話題", pos: "名詞", examples: [
          { en: "Math was my favorite subject at school.", ja: "数学は学校で一番好きな科目だった。", note: "favorite=一番好きな / at school=学生時代に", form: "subject" },
        ] },
        { id: "degree", word: "degree", meaning: "学位・程度", pos: "名詞", examples: [
          { en: "She has a degree in economics.", ja: "彼女は経済学の学位を持っている。", note: "a degree in 〜=〜の学位 / economics=経済学", form: "degree" },
        ] },
        { id: "experience", word: "experience", meaning: "経験", pos: "名詞・動詞", examples: [
          { en: "Travelling abroad is a valuable experience.", ja: "海外旅行は貴重な経験だ。", note: "valuable=貴重な / abroad=海外へ", form: "experience" },
        ] },
        { id: "ability", word: "ability", meaning: "能力", pos: "名詞", examples: [
          { en: "He has the ability to solve difficult problems.", ja: "彼は難しい問題を解く能力がある。", note: "solve=解決する / difficult=難しい\nability to do", form: "ability" },
        ] },
        { id: "improve", word: "improve", meaning: "上達・改善する", pos: "動詞", examples: [
          { en: "I want to improve my English speaking skills.", ja: "英語のスピーキング力を上達させたい。", note: "speaking skills=話す力\nimproveは自動詞『良くなる』も", form: "improve" },
        ] },
      ],
    },
    {
      title: "仕事・お金",
      words: [
        { id: "income", word: "income", meaning: "収入", pos: "名詞", examples: [
          { en: "People with a higher income can afford better housing.", ja: "収入が高い人はより良い住宅を持てる。", note: "afford=〜する余裕がある / housing=住宅", form: "income" },
        ] },
        { id: "salary", word: "salary", meaning: "給料", pos: "名詞", examples: [
          { en: "She is happy with her new salary.", ja: "彼女は新しい給料に満足している。", note: "be happy with 〜=〜に満足している", form: "salary" },
        ] },
        { id: "career", word: "career", meaning: "経歴・キャリア", pos: "名詞", examples: [
          { en: "He wants to build a career in medicine.", ja: "彼は医療分野でキャリアを築きたい。", note: "medicine=医療・医学（≠薬）/ build a career=キャリアを築く", form: "career" },
        ] },
        { id: "industry", word: "industry", meaning: "産業", pos: "名詞", examples: [
          { en: "The tourism industry is growing quickly.", ja: "観光産業は急速に成長している。", note: "tourism=観光(業) / grow=成長する", form: "industry" },
        ] },
        { id: "employ", word: "employ", meaning: "雇う", pos: "動詞", examples: [
          { en: "The company employs over 500 workers.", ja: "その会社は500人以上を雇っている。", note: "employee=従業員 / employer=雇い主", form: "employs" },
        ] },
        { id: "customer", word: "customer", meaning: "客", pos: "名詞", examples: [
          { en: "Good service keeps customers happy.", ja: "良いサービスは客を満足させ続ける。", note: "keep+人+happy=〜を満足させておく", form: "customers" },
        ] },
        { id: "product", word: "product", meaning: "製品", pos: "名詞", examples: [
          { en: "The company launched a new product last month.", ja: "その会社は先月新製品を発売した。", note: "launch=(新製品を)発売する", form: "product" },
        ] },
        { id: "afford", word: "afford", meaning: "〜する余裕がある", pos: "動詞", examples: [
          { en: "Many families cannot afford a house in the city.", ja: "多くの家庭は都市に家を持つ余裕がない。", note: "ふつう can/can't とセット\nafford+名詞 / afford to do", form: "afford" },
        ] },
        { id: "budget", word: "budget", meaning: "予算", pos: "名詞", examples: [
          { en: "We planned the trip on a small budget.", ja: "少ない予算で旅行を計画した。", note: "on a (small) budget=(少ない)予算で", form: "budget" },
        ] },
        { id: "profit", word: "profit", meaning: "利益", pos: "名詞", examples: [
          { en: "The business made a large profit this year.", ja: "その事業は今年大きな利益を上げた。", note: "make a profit=利益を出す（⇔make a loss 損を出す）", form: "profit" },
        ] },
      ],
    },
    {
      title: "社会・人々",
      words: [
        { id: "society", word: "society", meaning: "社会", pos: "名詞", examples: [
          { en: "Technology has changed modern society.", ja: "技術は現代社会を変えた。", note: "modern=現代の / technology=科学技術", form: "society" },
        ] },
        { id: "community", word: "community", meaning: "地域社会", pos: "名詞", examples: [
          { en: "The local community organized a cleanup event.", ja: "地域社会が清掃イベントを企画した。", note: "organize=企画する / cleanup=清掃(活動)", form: "community" },
        ] },
        { id: "culture", word: "culture", meaning: "文化", pos: "名詞", examples: [
          { en: "Travelling helps us understand other cultures.", ja: "旅は他の文化を理解する助けになる。", note: "help+人+動詞原形=〜が…するのを助ける", form: "cultures" },
        ] },
        { id: "population", word: "population", meaning: "人口", pos: "名詞", examples: [
          { en: "The population of the city is growing fast.", ja: "その都市の人口は急速に増えている。", note: "grow=増える・成長する / fast=急速に", form: "population" },
        ] },
        { id: "government", word: "government", meaning: "政府", pos: "名詞", examples: [
          { en: "The government should invest more in education.", ja: "政府は教育にもっと投資すべきだ。", note: "invest in 〜=〜に投資する", form: "government" },
        ] },
        { id: "individual", word: "individual", meaning: "個人(の)", pos: "名詞・形容詞", examples: [
          { en: "Every individual has the right to education.", ja: "すべての個人が教育を受ける権利を持つ。", note: "the right to 〜=〜する権利 / every=どの〜も", form: "individual" },
        ] },
        { id: "public", word: "public", meaning: "公共の・大衆", pos: "形容詞・名詞", examples: [
          { en: "Many people use public transport to get to work.", ja: "多くの人が通勤に公共交通を使う。", note: "get to work=通勤する\npublic transport=公共交通機関", form: "public" },
        ] },
        { id: "responsible", word: "responsible", meaning: "責任がある", pos: "形容詞", examples: [
          { en: "We are all responsible for protecting nature.", ja: "私たちは皆、自然を守る責任がある。", note: "for の後は名詞か〜ing\nprotect=守る", form: "responsible" },
        ] },
        { id: "generation", word: "generation", meaning: "世代", pos: "名詞", examples: [
          { en: "The younger generation uses smartphones a lot.", ja: "若い世代はスマホをよく使う。", note: "younger=より若い / a lot=たくさん・よく", form: "generation" },
        ] },
        { id: "relationship", word: "relationship", meaning: "関係", pos: "名詞", examples: [
          { en: "A good relationship with coworkers makes work easier.", ja: "同僚との良い関係は仕事を楽にする。", note: "coworker=同僚 / make 〜 easier=〜を楽にする", form: "relationship" },
        ] },
      ],
    },
    {
      title: "健康・生活",
      words: [
        { id: "health", word: "health", meaning: "健康", pos: "名詞", examples: [
          { en: "Eating vegetables is good for your health.", ja: "野菜を食べることは健康に良い。", note: "be good for 〜=〜に良い / vegetable=野菜", form: "health" },
        ] },
        { id: "exercise", word: "exercise", meaning: "運動(する)", pos: "名詞・動詞", examples: [
          { en: "Doing regular exercise keeps you healthy.", ja: "定期的な運動は健康を保つ。", note: "regular=定期的な\nexercise は不可算（×an exercise）", form: "exercise" },
        ] },
        { id: "diet", word: "diet", meaning: "食生活", pos: "名詞", examples: [
          { en: "A balanced diet is important for children.", ja: "バランスの取れた食生活は子どもに重要だ。", note: "balanced=バランスの取れた\ndiet=日常の食事（≠減量）", form: "diet" },
        ] },
        { id: "stress", word: "stress", meaning: "ストレス", pos: "名詞", examples: [
          { en: "Many people feel stress at work.", ja: "多くの人が仕事でストレスを感じる。", note: "at work=職場で\nstressful=ストレスの多い(形)", form: "stress" },
        ] },
        { id: "disease", word: "disease", meaning: "病気", pos: "名詞", examples: [
          { en: "A healthy lifestyle can prevent many diseases.", ja: "健康的な生活習慣は多くの病気を防げる。", note: "prevent=防ぐ / lifestyle=生活習慣", form: "diseases" },
        ] },
        { id: "lifestyle", word: "lifestyle", meaning: "生活習慣", pos: "名詞", examples: [
          { en: "A busy lifestyle can affect your sleep.", ja: "忙しい生活習慣は睡眠に影響しうる。", note: "busy=忙しい / affect=影響する / sleep=睡眠", form: "lifestyle" },
        ] },
        { id: "habit", word: "habit", meaning: "習慣", pos: "名詞", examples: [
          { en: "Reading every day is a good habit.", ja: "毎日読書することは良い習慣だ。", note: "have a habit of 〜ing=〜する癖\nbreak a habit=習慣をやめる", form: "habit" },
        ] },
        { id: "recover", word: "recover", meaning: "回復する", pos: "動詞", examples: [
          { en: "It took a week to recover from the flu.", ja: "インフルエンザから回復するのに1週間かかった。", note: "the flu=インフルエンザ\nit took a week=1週間かかった", form: "recover" },
        ] },
        { id: "mental", word: "mental", meaning: "精神の", pos: "形容詞", examples: [
          { en: "Sleep is important for good mental health.", ja: "睡眠は良い精神的健康に重要だ。", note: "physical=身体の（mental の対）\nmental health=心の健康", form: "mental" },
        ] },
        { id: "balance", word: "balance", meaning: "バランス(をとる)", pos: "名詞・動詞", examples: [
          { en: "It is hard to balance work and family.", ja: "仕事と家庭のバランスを取るのは難しい。", note: "hard to 〜=〜するのが難しい\nbalance work and family=両立する", form: "balance" },
        ] },
      ],
    },
    {
      title: "技術・交通",
      words: [
        { id: "technology", word: "technology", meaning: "技術", pos: "名詞", examples: [
          { en: "Technology has made communication easier.", ja: "技術は意思疎通を容易にした。", note: "communication=意思疎通 / make 〜 easier=〜を楽にする", form: "Technology" },
        ] },
        { id: "communicate", word: "communicate", meaning: "意思疎通する", pos: "動詞", examples: [
          { en: "We can easily communicate with people abroad.", ja: "海外の人と簡単に意思疎通できる。", note: "easily=簡単に / abroad=海外で", form: "communicate" },
        ] },
        { id: "information", word: "information", meaning: "情報", pos: "名詞", examples: [
          { en: "The internet gives us access to a lot of information.", ja: "インターネットは多くの情報へのアクセスを与える。", note: "数えない名詞（a piece of information）", form: "information" },
        ] },
        { id: "device", word: "device", meaning: "機器", pos: "名詞", examples: [
          { en: "Most students use a mobile device to study.", ja: "ほとんどの学生は勉強にモバイル機器を使う。", note: "mobile device=携帯端末 / most=ほとんどの", form: "device" },
        ] },
        { id: "access", word: "access", meaning: "利用・接続する", pos: "名詞・動詞", examples: [
          { en: "Everyone should be able to access clean water.", ja: "誰もがきれいな水を利用できるべきだ。", note: "動:access 〜（to 不要）\n名:access to 〜=〜への利用", form: "access" },
        ] },
        { id: "transport", word: "transport", meaning: "交通・輸送", pos: "名詞・動詞", examples: [
          { en: "Public transport reduces traffic in cities.", ja: "公共交通は都市の交通量を減らす。", note: "英 transport / 米 transportation", form: "transport" },
        ] },
        { id: "traffic", word: "traffic", meaning: "交通量", pos: "名詞", examples: [
          { en: "There is heavy traffic during rush hour.", ja: "ラッシュアワーには交通量が多い。", note: "heavy traffic=交通量が多い / rush hour=通勤ラッシュ", form: "traffic" },
        ] },
        { id: "convenient", word: "convenient", meaning: "便利な", pos: "形容詞", examples: [
          { en: "Online shopping is very convenient.", ja: "オンライン買い物はとても便利だ。", note: "物・事に使う（×I am convenient）", form: "convenient" },
        ] },
        { id: "available", word: "available", meaning: "利用できる", pos: "形容詞", examples: [
          { en: "The service is available 24 hours a day.", ja: "そのサービスは1日24時間利用できる。", note: "24 hours a day=1日中\navailable=(物)入手可/(人)手が空いている", form: "available" },
        ] },
        { id: "connect", word: "connect", meaning: "つなぐ", pos: "動詞", examples: [
          { en: "Social media connects people around the world.", ja: "SNSは世界中の人々をつなぐ。", note: "around the world=世界中の\nconnect A to B", form: "connects" },
        ] },
      ],
    },
    {
      title: "描写の形容詞",
      words: [
        { id: "various", word: "various", meaning: "さまざまな", pos: "形容詞", examples: [
          { en: "The museum offers various activities for children.", ja: "その博物館は子ども向けに様々な活動を提供する。", note: "offer=提供する / activity=活動", form: "various" },
        ] },
        { id: "similar", word: "similar", meaning: "似ている", pos: "形容詞", examples: [
          { en: "The two cities have similar problems.", ja: "その2都市は似た問題を抱えている。", note: "be similar to 〜=〜に似ている（≠same 全く同じ）", form: "similar" },
        ] },
        { id: "particular", word: "particular", meaning: "特定の", pos: "形容詞", examples: [
          { en: "This region is famous for one particular fruit.", ja: "この地域はある特定の果物で有名だ。", note: "region=地域 / be famous for 〜=〜で有名", form: "particular" },
        ] },
        { id: "familiar", word: "familiar", meaning: "なじみのある", pos: "形容詞", examples: [
          { en: "I am familiar with this kind of software.", ja: "私はこの種のソフトになじみがある。", note: "be familiar with 〜=〜をよく知っている / this kind of=この種の", form: "familiar" },
        ] },
        { id: "common", word: "common", meaning: "一般的な・共通の", pos: "形容詞", examples: [
          { en: "Stress is a common problem among students.", ja: "ストレスは学生の間で一般的な問題だ。", note: "among 〜=〜の間で\na common problem=よくある問題", form: "common" },
        ] },
        { id: "positive", word: "positive", meaning: "前向きな・良い", pos: "形容詞", examples: [
          { en: "Exercise has a positive effect on the body.", ja: "運動は体に良い影響を与える。", note: "the body=体・身体\na positive effect on 〜=〜への良い影響", form: "positive" },
        ] },
        { id: "negative", word: "negative", meaning: "否定的な・悪い", pos: "形容詞", examples: [
          { en: "Too much screen time can have negative effects.", ja: "画面の見過ぎは悪い影響を与えうる。", note: "screen time=画面を見る時間 / too much=過度の", form: "negative" },
        ] },
        { id: "recent", word: "recent", meaning: "最近の", pos: "形容詞", examples: [
          { en: "In recent years, more people work from home.", ja: "近年、より多くの人が在宅勤務している。", note: "in recent years=近年 / work from home=在宅勤務する", form: "recent" },
        ] },
        { id: "obvious", word: "obvious", meaning: "明らかな", pos: "形容詞", examples: [
          { en: "It is obvious that pollution is a serious problem.", ja: "汚染が深刻な問題であることは明らかだ。", note: "obviously=明らかに(副)\nIt is obvious that 〜", form: "obvious" },
        ] },
        { id: "complex", word: "complex", meaning: "複雑な", pos: "形容詞", examples: [
          { en: "Climate change is a complex issue.", ja: "気候変動は複雑な問題だ。", note: "issue=(社会的な)問題・課題", form: "complex" },
        ] },
      ],
    },
    {
      title: "つなぎ・意見",
      words: [
        { id: "however", word: "however", meaning: "しかし", pos: "副詞", examples: [
          { en: "Cars are useful. However, they cause pollution.", ja: "車は便利だ。しかし、汚染を引き起こす。", note: "useful=役立つ\nHowever の直後にコンマ(,)", form: "However" },
        ] },
        { id: "although", word: "although", meaning: "〜だけれども", pos: "接続詞", examples: [
          { en: "Although it was raining, we enjoyed the trip.", ja: "雨だったけれど、旅行を楽しんだ。", note: "enjoyed=楽しんだ\nAlthough 〜 と but は併用しない", form: "Although" },
        ] },
        { id: "therefore", word: "therefore", meaning: "したがって", pos: "副詞", examples: [
          { en: "The test is important; therefore, you should prepare well.", ja: "その試験は重要だ。したがって、しっかり準備すべきだ。", note: "prepare=準備する / important=重要な\n; の後に therefore", form: "therefore" },
        ] },
        { id: "whereas", word: "whereas", meaning: "一方で", pos: "接続詞", examples: [
          { en: "Some people love cities, whereas others prefer the countryside.", ja: "都会を好む人がいる一方、田舎を好む人もいる。", note: "countryside=田舎・郊外 / prefer=〜のほうを好む", form: "whereas" },
        ] },
        { id: "opinion", word: "opinion", meaning: "意見", pos: "名詞", examples: [
          { en: "In my opinion, education should be free.", ja: "私の意見では、教育は無償であるべきだ。", note: "in my opinion=私の意見では / free=無料の", form: "opinion" },
        ] },
        { id: "argue", word: "argue", meaning: "主張する", pos: "動詞", examples: [
          { en: "Some people argue that exams are unfair.", ja: "試験は不公平だと主張する人もいる。", note: "unfair=不公平な / exam=試験\nargue that 〜", form: "argue" },
        ] },
        { id: "suggest", word: "suggest", meaning: "提案する", pos: "動詞", examples: [
          { en: "Experts suggest drinking more water.", ja: "専門家はもっと水を飲むことを提案している。", note: "experts=専門家\nsuggest ~ing（×suggest to do）", form: "suggest" },
        ] },
        { id: "consider", word: "consider", meaning: "考慮する", pos: "動詞", examples: [
          { en: "We should consider the cost before deciding.", ja: "決める前にコストを考慮すべきだ。", note: "cost=費用 / before deciding=決める前に（×consider to do）", form: "consider" },
        ] },
        { id: "tend-to", word: "tend to", meaning: "〜する傾向がある", pos: "句動詞", examples: [
          { en: "Prices tend to rise during the holidays.", ja: "価格は休暇中に上がる傾向がある。", note: "the holidays=休暇シーズン・年末年始 / prices=物価", form: "tend to" },
        ] },
        { id: "especially", word: "especially", meaning: "特に", pos: "副詞", examples: [
          { en: "Traffic is bad, especially in the morning.", ja: "交通は、特に朝はひどい。", note: "traffic=交通(量) / in the morning=朝(の時間帯)は", form: "especially" },
        ] },
      ],
    },
  ],
};
