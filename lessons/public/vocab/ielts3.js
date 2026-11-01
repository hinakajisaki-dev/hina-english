// 単語帳 IELTS 語彙 Week 3 (the teacher's list for Haruki, OK'd in his chat): 10
// themes of ten words, one example each. Only for the students the teacher gives
// it to (vocab_books, see words.js); it takes the place of the shared Week 3 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, note, form).

export const IELTS3 = {
  id: "ielts3",
  week: 3,
  title: "IELTS 語彙 Week 3",
  groups: [
    {
      title: "健康・医療",
      words: [
        { id: "symptom", word: "symptom", meaning: "症状", pos: "名詞", examples: [
          { en: "A sore throat is a common symptom of a cold.", ja: "のどの痛みは風邪のよくある症状だ。", note: "sore throat=のどの痛み", form: "symptom" },
        ] },
        { id: "treatment", word: "treatment", meaning: "治療", pos: "名詞", examples: [
          { en: "The treatment for this disease is very expensive.", ja: "この病気の治療はとても高い。", note: "treat=治療する(動)\ntreatment for 〜=〜の治療", form: "treatment" },
        ] },
        { id: "medicine", word: "medicine", meaning: "薬・医学", pos: "名詞", examples: [
          { en: "Take this medicine three times a day.", ja: "この薬を1日3回飲んでください。", note: "「薬を飲む」は take medicine（✗ drink）", form: "medicine" },
        ] },
        { id: "patient", word: "patient", meaning: "患者・がまん強い", pos: "名詞・形容詞", examples: [
          { en: "The hospital has too many patients.", ja: "その病院は患者が多すぎる。", note: "be patient=がまん強い", form: "patients" },
        ] },
        { id: "obesity", word: "obesity", meaning: "肥満", pos: "名詞", examples: [
          { en: "Obesity is a growing problem in many countries.", ja: "肥満は多くの国で増えている問題だ。", note: "obese=肥満の(形)\nIELTS でよく出るテーマ", form: "Obesity" },
        ] },
        { id: "prevent", word: "prevent", meaning: "防ぐ", pos: "動詞", examples: [
          { en: "Washing your hands can prevent many illnesses.", ja: "手を洗うことで多くの病気を防げる。", note: "prevent A from 〜ing=Aが〜するのを防ぐ", form: "prevent" },
        ] },
        { id: "nutrition", word: "nutrition", meaning: "栄養", pos: "名詞", examples: [
          { en: "Good nutrition is important for children.", ja: "子どもには良い栄養が大切だ。", note: "nutritious=栄養のある(形)", form: "nutrition" },
        ] },
        { id: "sleep", word: "sleep", meaning: "睡眠・眠る", pos: "名詞・動詞", examples: [
          { en: "Most adults need seven or eight hours of sleep.", ja: "ほとんどの大人は7〜8時間の睡眠が必要だ。", note: "get enough sleep=十分に眠る", form: "sleep" },
        ] },
        { id: "addicted", word: "addicted", meaning: "中毒の・はまっている", pos: "形容詞", examples: [
          { en: "Many teenagers are addicted to their phones.", ja: "多くの10代がスマホ中毒だ。", note: "be addicted to 〜（to のあとは名詞か -ing）", form: "addicted" },
        ] },
        { id: "well-being", word: "well-being", meaning: "心身の健康・幸せ", pos: "名詞", examples: [
          { en: "Exercise is good for your well-being.", ja: "運動は心身の健康に良い。", note: "health より広く「幸せ・元気」もふくむ", form: "well-being" },
        ] },
      ],
    },
    {
      title: "仕事の成果・お金",
      words: [
        { id: "economy", word: "economy", meaning: "経済", pos: "名詞", examples: [
          { en: "The Malaysian economy is growing steadily.", ja: "マレーシアの経済は着実に成長している。", note: "economic=経済の(形)\neconomical=節約になる", form: "economy" },
        ] },
        { id: "revenue", word: "revenue", meaning: "売上・収入", pos: "名詞", examples: [
          { en: "The company's revenue rose by 10 percent.", ja: "その会社の売上は10%上がった。", note: "rise by 〜%=〜%上がる", form: "revenue" },
        ] },
        { id: "cost", word: "cost", meaning: "費用・（お金が）かかる", pos: "名詞・動詞", examples: [
          { en: "The cost of living in Tokyo is high.", ja: "東京の生活費は高い。", note: "the cost of living=生活費\ncost-cost-cost", form: "cost" },
        ] },
        { id: "loan", word: "loan", meaning: "ローン・貸付", pos: "名詞", examples: [
          { en: "We took out a loan to buy a house.", ja: "家を買うためにローンを組んだ。", note: "take out a loan=ローンを組む", form: "loan" },
        ] },
        { id: "tax", word: "tax", meaning: "税金", pos: "名詞", examples: [
          { en: "The government plans to raise taxes on cars.", ja: "政府は車の税金を上げる予定だ。", note: "raise taxes=増税する", form: "taxes" },
        ] },
        { id: "wealthy", word: "wealthy", meaning: "裕福な", pos: "形容詞", examples: [
          { en: "Wealthy people often live in the city centre.", ja: "裕福な人は都心に住むことが多い。", note: "rich と同じ意味で少しかたい\nwealth=富(名)", form: "Wealthy" },
        ] },
        { id: "poverty", word: "poverty", meaning: "貧困", pos: "名詞", examples: [
          { en: "Education can help people escape poverty.", ja: "教育は人々が貧困からぬけ出す助けになる。", note: "poor=貧しい(形)", form: "poverty" },
        ] },
        { id: "expense", word: "expense", meaning: "出費・経費", pos: "名詞", examples: [
          { en: "Business trips are a big expense for our company.", ja: "出張はうちの会社にとって大きな出費だ。", note: "expensive=高い(形)", form: "expense" },
        ] },
        { id: "earn", word: "earn", meaning: "かせぐ", pos: "動詞", examples: [
          { en: "He earns more than his father did.", ja: "彼は父親よりかせいでいる。", note: "earn money=お金をかせぐ", form: "earns" },
        ] },
        { id: "save", word: "save", meaning: "貯める・節約する", pos: "動詞", examples: [
          { en: "I'm trying to save money for my son's education.", ja: "息子の教育のためにお金を貯めている。", note: "save money / save time", form: "save" },
        ] },
      ],
    },
    {
      title: "法律・社会のルール",
      words: [
        { id: "crime", word: "crime", meaning: "犯罪", pos: "名詞", examples: [
          { en: "Crime has decreased in this area.", ja: "この地域では犯罪が減った。", note: "criminal=犯罪者・犯罪の", form: "Crime" },
        ] },
        { id: "law", word: "law", meaning: "法律", pos: "名詞", examples: [
          { en: "It is against the law to drive without a licence.", ja: "免許なしで運転するのは法律違反だ。", note: "against the law=法律違反で\nlicence=免許（英）", form: "law" },
        ] },
        { id: "rule", word: "rule", meaning: "規則・ルール", pos: "名詞", examples: [
          { en: "Every school has its own rules.", ja: "どの学校にも独自のルールがある。", note: "follow the rules=ルールを守る", form: "rules" },
        ] },
        { id: "punish", word: "punish", meaning: "罰する", pos: "動詞", examples: [
          { en: "Drivers who use their phones should be punished.", ja: "運転中にスマホを使う人は罰せられるべきだ。", note: "punishment=罰(名)", form: "punished" },
        ] },
        { id: "fine", word: "fine", meaning: "罰金", pos: "名詞", examples: [
          { en: "He had to pay a fine for parking illegally.", ja: "彼は違法駐車で罰金を払わなければならなかった。", note: "「元気な」の fine とは別の意味", form: "fine" },
        ] },
        { id: "illegal", word: "illegal", meaning: "違法の", pos: "形容詞", examples: [
          { en: "It is illegal to sell alcohol to children.", ja: "子どもにお酒を売るのは違法だ。", note: "legal=合法の\nil- で反対の意味", form: "illegal" },
        ] },
        { id: "safety", word: "safety", meaning: "安全", pos: "名詞", examples: [
          { en: "Road safety is a big issue in big cities.", ja: "交通安全は大都市の大きな問題だ。", note: "safe=安全な(形)", form: "safety" },
        ] },
        { id: "security", word: "security", meaning: "安全・警備", pos: "名詞", examples: [
          { en: "Airport security has become stricter.", ja: "空港の警備は厳しくなった。", note: "strict=厳しい", form: "security" },
        ] },
        { id: "rights", word: "rights", meaning: "権利", pos: "名詞", examples: [
          { en: "Workers have the right to take holidays.", ja: "労働者には休暇をとる権利がある。", note: "the right to 〜=〜する権利", form: "right" },
        ] },
        { id: "ban", word: "ban", meaning: "禁止する・禁止", pos: "動詞・名詞", examples: [
          { en: "Some countries have banned plastic bags.", ja: "レジ袋を禁止した国もある。", note: "ban 〜 from 〜ing=〜が…するのを禁止する", form: "banned" },
        ] },
      ],
    },
    {
      title: "メディア・広告",
      words: [
        { id: "media", word: "media", meaning: "メディア", pos: "名詞", examples: [
          { en: "The media has a strong influence on young people.", ja: "メディアは若者に強い影響を持つ。", note: "social media=SNS", form: "media" },
        ] },
        { id: "advertisement", word: "advertisement", meaning: "広告", pos: "名詞", examples: [
          { en: "We see hundreds of advertisements every day.", ja: "私たちは毎日何百もの広告を見る。", note: "短く ad とも言う\nadvertise=宣伝する(動)", form: "advertisements" },
        ] },
        { id: "brand", word: "brand", meaning: "ブランド", pos: "名詞", examples: [
          { en: "Young people often choose famous brands.", ja: "若者は有名なブランドを選ぶことが多い。", note: "brand image=ブランドイメージ", form: "brands" },
        ] },
        { id: "consumer", word: "consumer", meaning: "消費者", pos: "名詞", examples: [
          { en: "Consumers want cheaper and greener cars.", ja: "消費者はもっと安くて環境に良い車を求めている。", note: "consume=消費する(動)", form: "Consumers" },
        ] },
        { id: "influencer", word: "influencer", meaning: "インフルエンサー", pos: "名詞", examples: [
          { en: "Our CEO is also a popular car influencer.", ja: "うちの社長は人気の車のインフルエンサーでもある。", note: "influence=影響(名)", form: "influencer" },
        ] },
        { id: "reliable", word: "reliable", meaning: "信頼できる", pos: "形容詞", examples: [
          { en: "Not all information online is reliable.", ja: "ネットの情報がすべて信頼できるわけではない。", note: "rely on 〜=〜に頼る", form: "reliable" },
        ] },
        { id: "publish", word: "publish", meaning: "出版する・公開する", pos: "動詞", examples: [
          { en: "The report was published last month.", ja: "その報告書は先月公開された。", note: "publisher=出版社", form: "published" },
        ] },
        { id: "broadcast", word: "broadcast", meaning: "放送する・放送", pos: "動詞・名詞", examples: [
          { en: "The game was broadcast live on TV.", ja: "その試合はテレビで生放送された。", note: "broadcast-broadcast-broadcast", form: "broadcast" },
        ] },
        { id: "privacy", word: "privacy", meaning: "プライバシー", pos: "名詞", examples: [
          { en: "Social media can be a threat to our privacy.", ja: "SNSはプライバシーをおびやかすことがある。", note: "private=個人的な(形)\nthreat=おどし・脅威", form: "privacy" },
        ] },
        { id: "trend", word: "trend", meaning: "流行・傾向", pos: "名詞", examples: [
          { en: "Working from home is a growing trend.", ja: "在宅勤務は広がっている傾向だ。", note: "a growing trend=広がっている傾向", form: "trend" },
        ] },
      ],
    },
    {
      title: "自然・動物",
      words: [
        { id: "wildlife", word: "wildlife", meaning: "野生生物", pos: "名詞", examples: [
          { en: "Bushfires destroyed the homes of many wildlife species.", ja: "森林火災で多くの野生生物のすみかがなくなった。", note: "species=種（単数も複数も species）", form: "wildlife" },
        ] },
        { id: "species", word: "species", meaning: "種（しゅ）", pos: "名詞", examples: [
          { en: "Many species are in danger of extinction.", ja: "多くの種が絶滅の危機にある。", note: "単数も複数も species", form: "species" },
        ] },
        { id: "extinct", word: "extinct", meaning: "絶滅した", pos: "形容詞", examples: [
          { en: "Dinosaurs became extinct millions of years ago.", ja: "恐竜は何百万年も前に絶滅した。", note: "extinction=絶滅(名)", form: "extinct" },
        ] },
        { id: "habitat", word: "habitat", meaning: "すみか・生息地", pos: "名詞", examples: [
          { en: "Koalas are losing their natural habitat.", ja: "コアラは自然のすみかを失っている。", note: "natural habitat=自然の生息地", form: "habitat" },
        ] },
        { id: "forest", word: "forest", meaning: "森林", pos: "名詞", examples: [
          { en: "Large areas of forest are cut down every year.", ja: "毎年広い森林が伐採されている。", note: "cut down=切り倒す", form: "forest" },
        ] },
        { id: "ocean", word: "ocean", meaning: "海・大洋", pos: "名詞", examples: [
          { en: "Plastic in the ocean is harmful to fish.", ja: "海のプラスチックは魚に有害だ。", note: "sea より大きな海", form: "ocean" },
        ] },
        { id: "flood", word: "flood", meaning: "洪水・水びたしにする", pos: "名詞・動詞", examples: [
          { en: "Heavy rain caused floods in the city.", ja: "大雨で街に洪水が起きた。", note: "cause floods=洪水を起こす", form: "floods" },
        ] },
        { id: "drought", word: "drought", meaning: "干ばつ", pos: "名詞", examples: [
          { en: "The drought damaged crops across the country.", ja: "干ばつで国中の作物が被害を受けた。", note: "crop=作物\n発音は「ドラウト」", form: "drought" },
        ] },
        { id: "temperature", word: "temperature", meaning: "気温・温度", pos: "名詞", examples: [
          { en: "The temperature rises above 30 degrees every day.", ja: "毎日気温が30度を超える。", note: "above 〜 degrees=〜度を超えて", form: "temperature" },
        ] },
        { id: "disaster", word: "disaster", meaning: "災害", pos: "名詞", examples: [
          { en: "Japan has many natural disasters.", ja: "日本は自然災害が多い。", note: "natural disaster=自然災害", form: "disasters" },
        ] },
      ],
    },
    {
      title: "科学・研究",
      words: [
        { id: "experiment", word: "experiment", meaning: "実験・実験する", pos: "名詞・動詞", examples: [
          { en: "Scientists did an experiment on mice.", ja: "科学者たちはネズミで実験をした。", note: "do an experiment=実験をする", form: "experiment" },
        ] },
        { id: "discover", word: "discover", meaning: "発見する", pos: "動詞", examples: [
          { en: "Scientists discovered a new type of virus.", ja: "科学者たちは新しい種類のウイルスを発見した。", note: "discovery=発見(名)", form: "discovered" },
        ] },
        { id: "invent", word: "invent", meaning: "発明する", pos: "動詞", examples: [
          { en: "The telephone was invented in 1876.", ja: "電話は1876年に発明された。", note: "invention=発明(名)\ndiscover（見つける）とのちがいに注意", form: "invented" },
        ] },
        { id: "survey", word: "survey", meaning: "調査・調査する", pos: "名詞・動詞", examples: [
          { en: "According to a survey, most people want shorter meetings.", ja: "調査によると、ほとんどの人が会議を短くしたいと思っている。", note: "according to 〜=〜によると", form: "survey" },
        ] },
        { id: "data", word: "data", meaning: "データ", pos: "名詞", examples: [
          { en: "The data shows that sales are increasing.", ja: "データを見ると、売上が増えている。", note: "ふつう数えない名詞として使う", form: "data" },
        ] },
        { id: "analyse", word: "analyse", meaning: "分析する", pos: "動詞", examples: [
          { en: "We need to analyse the market before we start.", ja: "始める前に市場を分析する必要がある。", note: "analysis=分析(名)\n米では analyze", form: "analyse" },
        ] },
        { id: "theory", word: "theory", meaning: "理論・説", pos: "名詞", examples: [
          { en: "There are many theories about why this happened.", ja: "なぜこれが起きたかについては多くの説がある。", note: "in theory=理論上は", form: "theories" },
        ] },
        { id: "result-in", word: "result in", meaning: "〜という結果になる", pos: "句動詞", examples: [
          { en: "Too much stress can result in illness.", ja: "ストレスが多すぎると病気になることがある。", note: "result from 〜=〜が原因で起こる", form: "result in" },
        ] },
        { id: "conclude", word: "conclude", meaning: "結論を出す", pos: "動詞", examples: [
          { en: "The study concluded that sleep improves memory.", ja: "その研究は、睡眠は記憶力を高めると結論づけた。", note: "conclusion=結論(名)", form: "concluded" },
        ] },
        { id: "process", word: "process", meaning: "過程・手順", pos: "名詞", examples: [
          { en: "The process of making cars has changed a lot.", ja: "車を作る過程は大きく変わった。", note: "IELTS のプロセス図の問題でよく使う", form: "process" },
        ] },
      ],
    },
    {
      title: "食べ物・農業",
      words: [
        { id: "crop", word: "crop", meaning: "作物", pos: "名詞", examples: [
          { en: "Rice is the main crop in this area.", ja: "この地域の主な作物は米だ。", note: "main crop=主な作物", form: "crop" },
        ] },
        { id: "agriculture", word: "agriculture", meaning: "農業", pos: "名詞", examples: [
          { en: "Agriculture is still important in Malaysia.", ja: "マレーシアでは今も農業が大切だ。", note: "agricultural=農業の(形)", form: "Agriculture" },
        ] },
        { id: "organic", word: "organic", meaning: "有機の", pos: "形容詞", examples: [
          { en: "Organic vegetables are more expensive.", ja: "有機野菜のほうが高い。", note: "organic food=有機食品", form: "Organic" },
        ] },
        { id: "ingredient", word: "ingredient", meaning: "材料", pos: "名詞", examples: [
          { en: "Fresh ingredients make food taste better.", ja: "新鮮な材料を使うと料理がおいしくなる。", note: "make 〜 taste better=〜をおいしくする", form: "ingredients" },
        ] },
        { id: "processed", word: "processed", meaning: "加工された", pos: "形容詞", examples: [
          { en: "Processed food often contains a lot of salt.", ja: "加工食品には塩が多く入っていることが多い。", note: "contain=ふくむ", form: "Processed" },
        ] },
        { id: "vegetarian", word: "vegetarian", meaning: "ベジタリアン・菜食の", pos: "名詞・形容詞", examples: [
          { en: "More people are becoming vegetarian.", ja: "ベジタリアンになる人が増えている。", note: "vegan=肉も乳製品も食べない人", form: "vegetarian" },
        ] },
        { id: "fast-food", word: "fast food", meaning: "ファストフード", pos: "名詞", examples: [
          { en: "Eating too much fast food is bad for your health.", ja: "ファストフードを食べすぎると体に悪い。", note: "数えない名詞", form: "fast food" },
        ] },
        { id: "portion", word: "portion", meaning: "（料理の）量・一人前", pos: "名詞", examples: [
          { en: "The portions in this restaurant are very large.", ja: "このレストランの料理の量はとても多い。", note: "a large portion=大盛り", form: "portions" },
        ] },
        { id: "produce", word: "produce", meaning: "生産する", pos: "動詞", examples: [
          { en: "Malaysia produces a lot of palm oil.", ja: "マレーシアはたくさんのパーム油を生産している。", note: "product=製品\nproduction=生産", form: "produces" },
        ] },
        { id: "shortage", word: "shortage", meaning: "不足", pos: "名詞", examples: [
          { en: "There is a shortage of workers in farming.", ja: "農業では働き手が不足している。", note: "a shortage of 〜=〜の不足", form: "shortage" },
        ] },
      ],
    },
    {
      title: "変化・プロセスの動詞",
      words: [
        { id: "expand", word: "expand", meaning: "広げる・拡大する", pos: "動詞", examples: [
          { en: "We are planning to expand our business in Malaysia.", ja: "マレーシアでの事業を拡大する予定だ。", note: "expansion=拡大(名)", form: "expand" },
        ] },
        { id: "replace", word: "replace", meaning: "取りかえる", pos: "動詞", examples: [
          { en: "Robots may replace many workers in the future.", ja: "将来、ロボットが多くの働き手に取ってかわるかもしれない。", note: "replace A with B=AをBに取りかえる", form: "replace" },
        ] },
        { id: "transform", word: "transform", meaning: "大きく変える", pos: "動詞", examples: [
          { en: "The internet has transformed the way we shop.", ja: "インターネットは買い物のしかたを大きく変えた。", note: "the way we 〜=私たちの〜のしかた", form: "transformed" },
        ] },
        { id: "adapt", word: "adapt", meaning: "慣れる・適応する", pos: "動詞", examples: [
          { en: "It took me a few months to adapt to life in Malaysia.", ja: "マレーシアの生活に慣れるのに数か月かかった。", note: "adapt to 〜=〜に慣れる（to のあとは名詞）", form: "adapt" },
        ] },
        { id: "maintain", word: "maintain", meaning: "保つ", pos: "動詞", examples: [
          { en: "It is important to maintain good health.", ja: "健康を保つことは大切だ。", note: "maintenance=維持・メンテナンス(名)", form: "maintain" },
        ] },
        { id: "remove", word: "remove", meaning: "取りのぞく", pos: "動詞", examples: [
          { en: "The old trees were removed.", ja: "古い木は取りのぞかれた。", note: "remove A from B=BからAを取りのぞく", form: "removed" },
        ] },
        { id: "establish", word: "establish", meaning: "設立する", pos: "動詞", examples: [
          { en: "Our company was established in 2017.", ja: "私たちの会社は2017年に設立された。", note: "found とほぼ同じ意味", form: "established" },
        ] },
        { id: "achieve", word: "achieve", meaning: "達成する", pos: "動詞", examples: [
          { en: "I want to achieve IELTS 6.0 by next August.", ja: "来年の8月までに IELTS 6.0 を達成したい。", note: "achievement=達成(名)\nby 〜=〜までに", form: "achieve" },
        ] },
        { id: "require", word: "require", meaning: "必要とする", pos: "動詞", examples: [
          { en: "This job requires good English skills.", ja: "この仕事には高い英語力が必要だ。", note: "requirement=必要条件(名)", form: "requires" },
        ] },
        { id: "provide", word: "provide", meaning: "提供する", pos: "動詞", examples: [
          { en: "The hotel provides free breakfast.", ja: "そのホテルは無料の朝食を出している。", note: "provide 人 with 物=人に物を提供する", form: "provides" },
        ] },
      ],
    },
    {
      title: "人の性格・気持ち",
      words: [
        { id: "confident", word: "confident", meaning: "自信がある", pos: "形容詞", examples: [
          { en: "I feel more confident when I speak English now.", ja: "今は英語を話すとき、前より自信がある。", note: "confidence=自信(名)", form: "confident" },
        ] },
        { id: "anxious", word: "anxious", meaning: "不安な", pos: "形容詞", examples: [
          { en: "Many students feel anxious before exams.", ja: "多くの学生が試験の前に不安になる。", note: "anxiety=不安(名)", form: "anxious" },
        ] },
        { id: "motivated", word: "motivated", meaning: "やる気がある", pos: "形容詞", examples: [
          { en: "It is hard to stay motivated every day.", ja: "毎日やる気を保つのは難しい。", note: "motivation=やる気(名)", form: "motivated" },
        ] },
        { id: "ambitious", word: "ambitious", meaning: "野心的な・意欲的な", pos: "形容詞", examples: [
          { en: "He is an ambitious businessman.", ja: "彼は意欲的なビジネスマンだ。", note: "ambition=野心・夢(名)", form: "ambitious" },
        ] },
        { id: "outgoing", word: "outgoing", meaning: "社交的な", pos: "形容詞", examples: [
          { en: "My son is very outgoing and makes friends easily.", ja: "息子はとても社交的で、すぐ友だちができる。", note: "extrovert とほぼ同じ意味", form: "outgoing" },
        ] },
        { id: "optimistic", word: "optimistic", meaning: "前向きな・楽観的な", pos: "形容詞", examples: [
          { en: "I am optimistic about the future of our business.", ja: "私たちの事業の将来について前向きだ。", note: "pessimistic=悲観的な\nbe optimistic about 〜", form: "optimistic" },
        ] },
        { id: "grateful", word: "grateful", meaning: "感謝している", pos: "形容詞", examples: [
          { en: "I'm grateful for my family's support.", ja: "家族の支えに感謝している。", note: "be grateful for 〜=〜に感謝している", form: "grateful" },
        ] },
        { id: "frustrated", word: "frustrated", meaning: "イライラした・もどかしい", pos: "形容詞", examples: [
          { en: "I get frustrated when I can't explain things in English.", ja: "英語でうまく説明できないとき、もどかしくなる。", note: "frustrating=イライラさせる（もの）", form: "frustrated" },
        ] },
        { id: "curious", word: "curious", meaning: "好奇心がある", pos: "形容詞", examples: [
          { en: "Children are naturally curious.", ja: "子どもは生まれつき好奇心が強い。", note: "curiosity=好奇心(名)", form: "curious" },
        ] },
        { id: "honest", word: "honest", meaning: "正直な", pos: "形容詞", examples: [
          { en: "It is important to be honest with your clients.", ja: "取引先に正直でいることは大切だ。", note: "to be honest=正直に言うと（92の表現）\nh は読まない", form: "honest" },
        ] },
      ],
    },
    {
      title: "話すときに使える表現",
      words: [
        { id: "as-far-as-i-know", word: "as far as I know", meaning: "私の知るかぎりでは", pos: "熟語", examples: [
          { en: "As far as I know, the meeting is at three.", ja: "私の知るかぎりでは、会議は3時だ。", note: "IELTS Speaking で使える", form: "As far as I know" },
        ] },
        { id: "to-be-honest", word: "to be honest", meaning: "正直に言うと", pos: "熟語", examples: [
          { en: "To be honest, I don't like crowded places.", ja: "正直に言うと、人ごみは好きじゃない。", note: "文の最初に置く", form: "To be honest" },
        ] },
        { id: "in-my-experience", word: "in my experience", meaning: "私の経験では", pos: "熟語", examples: [
          { en: "In my experience, face-to-face meetings work better.", ja: "私の経験では、対面の会議のほうがうまくいく。", note: "face-to-face=対面の", form: "In my experience" },
        ] },
        { id: "it-depends", word: "it depends", meaning: "場合による", pos: "熟語", examples: [
          { en: "It depends on the situation.", ja: "状況によります。", note: "it depends on 〜=〜による", form: "It depends" },
        ] },
        { id: "generally-speaking", word: "generally speaking", meaning: "一般的に言うと", pos: "熟語", examples: [
          { en: "Generally speaking, Japanese people work long hours.", ja: "一般的に言うと、日本人は長時間働く。", note: "意見の前置きに使う", form: "Generally speaking" },
        ] },
        { id: "as-a-result", word: "as a result", meaning: "その結果", pos: "熟語", examples: [
          { en: "I slept well. As a result, I felt great.", ja: "よく眠れた。その結果、とても気分がよかった。", note: "consequently より会話的", form: "As a result" },
        ] },
        { id: "for-example", word: "for example", meaning: "たとえば", pos: "熟語", examples: [
          { en: "Some sports, for example golf, are expensive.", ja: "いくつかのスポーツ、たとえばゴルフはお金がかかる。", note: "for instance と同じ意味", form: "for example" },
        ] },
        { id: "in-the-long-run", word: "in the long run", meaning: "長い目で見ると", pos: "熟語", examples: [
          { en: "Learning English will help me in the long run.", ja: "英語を学ぶことは、長い目で見ると役に立つ。", note: "IELTS の Part 3 で使える", form: "in the long run" },
        ] },
        { id: "opportunity", word: "opportunity", meaning: "機会・チャンス", pos: "名詞", examples: [
          { en: "This job gives me the opportunity to travel a lot.", ja: "この仕事のおかげで、たくさん旅行する機会がある。", note: "the opportunity to 〜=〜する機会\na business opportunity=ビジネスチャンス", form: "opportunity" },
        ] },
        { id: "thats-a-good-question", word: "that's a good question", meaning: "いい質問ですね", pos: "熟語", examples: [
          { en: "That's a good question. Let me think.", ja: "いい質問ですね。ちょっと考えさせてください。", note: "考える時間をかせぐ言い方", form: "That's a good question" },
        ] },
      ],
    },
  ],
};
