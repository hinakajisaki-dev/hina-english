// 単語帳 IELTS 語彙 Week 2 (the teacher's list for Haruki, OK'd in his chat): 10
// themes of ten words, one example each. Only for the students the teacher gives
// it to (vocab_books, see words.js); it takes the place of the shared Week 2 for them.
//
// Same shape as week1.js: id (never change it: students' review lists use it),
// word, meaning, pos, examples (en, ja, note, form).

export const IELTS2 = {
  id: "ielts2",
  week: 2,
  title: "IELTS 語彙 Week 2",
  groups: [
    {
      title: "データ・グラフ",
      words: [
        { id: "fluctuate", word: "fluctuate", meaning: "上下する・変動する", pos: "動詞", examples: [
          { en: "The price of oil fluctuated throughout the year.", ja: "石油の価格は一年を通して上下した。", note: "throughout the year=一年を通して\nfluctuation=変動(名)", form: "fluctuated" },
        ] },
        { id: "peak", word: "peak", meaning: "ピーク・最高点に達する", pos: "名詞・動詞", examples: [
          { en: "Car sales peaked in December.", ja: "車の売り上げは12月に最高になった。", note: "reach a peak=ピークに達する", form: "peaked" },
        ] },
        { id: "decline", word: "decline", meaning: "減少する・減少", pos: "動詞・名詞", examples: [
          { en: "The number of smokers has declined over the last ten years.", ja: "喫煙者の数はこの10年で減少した。", note: "over the last 〜 years=この〜年で\ndecrease より少しかたい", form: "declined" },
        ] },
        { id: "steady", word: "steady", meaning: "安定した・着実な", pos: "形容詞", examples: [
          { en: "There was a steady rise in house prices.", ja: "住宅価格は着実に上がった。", note: "steadily=着実に(副)\na steady rise=着実な上昇", form: "steady" },
        ] },
        { id: "sharp", word: "sharp", meaning: "急な・急激な", pos: "形容詞", examples: [
          { en: "There was a sharp drop in sales in April.", ja: "4月に売り上げが急に落ちた。", note: "sharply=急激に(副)\na sharp drop=急な下落", form: "sharp" },
        ] },
        { id: "slight", word: "slight", meaning: "わずかな", pos: "形容詞", examples: [
          { en: "There was a slight increase in the number of visitors.", ja: "訪問者の数はわずかに増えた。", note: "slightly=わずかに(副)\nsharp の反対", form: "slight" },
        ] },
        { id: "proportion", word: "proportion", meaning: "割合", pos: "名詞", examples: [
          { en: "A large proportion of students live with their parents.", ja: "学生の大部分は親と住んでいる。", note: "a large proportion of 〜=〜の大部分", form: "proportion" },
        ] },
        { id: "percentage", word: "percentage", meaning: "割合・パーセンテージ", pos: "名詞", examples: [
          { en: "The percentage of people who work from home has grown.", ja: "在宅勤務をする人の割合が増えた。", note: "the percentage of 〜=〜の割合\npercent は数字のあと（20 percent）", form: "percentage" },
        ] },
        { id: "figure", word: "figure", meaning: "数字・数値", pos: "名詞", examples: [
          { en: "The figures show that exports doubled in 2025.", ja: "数字を見ると、2025年に輸出は2倍になった。", note: "The figures show that 〜=数字から〜がわかる", form: "figures" },
        ] },
        { id: "approximately", word: "approximately", meaning: "およそ", pos: "副詞", examples: [
          { en: "Approximately 30 percent of the cars were electric.", ja: "車のおよそ30%が電気自動車だった。", note: "about よりかたい言い方\nIELTS のグラフ問題でよく使う", form: "Approximately" },
        ] },
      ],
    },
    {
      title: "比較・対比",
      words: [
        { id: "compare", word: "compare", meaning: "比べる", pos: "動詞", examples: [
          { en: "Compared with last year, sales have improved.", ja: "昨年と比べて、売り上げはよくなった。", note: "compared with/to 〜=〜と比べて", form: "Compared" },
        ] },
        { id: "contrast", word: "contrast", meaning: "対比・対照的である", pos: "名詞・動詞", examples: [
          { en: "In contrast, rural areas have fewer hospitals.", ja: "対照的に、地方は病院が少ない。", note: "in contrast=対照的に\n文の最初に置いてコンマ", form: "contrast" },
        ] },
        { id: "differ", word: "differ", meaning: "異なる", pos: "動詞", examples: [
          { en: "Prices differ from country to country.", ja: "価格は国によって異なる。", note: "differ from 〜=〜と異なる\ndifferent=異なる(形)", form: "differ" },
        ] },
        { id: "equal", word: "equal", meaning: "等しい・平等な", pos: "形容詞", examples: [
          { en: "Men and women should have equal opportunities.", ja: "男女は平等な機会を持つべきだ。", note: "equally=平等に(副)\nopportunity=機会", form: "equal" },
        ] },
        { id: "majority", word: "majority", meaning: "大多数", pos: "名詞", examples: [
          { en: "The majority of people use smartphones every day.", ja: "大多数の人が毎日スマホを使う。", note: "the majority of 〜=〜の大多数", form: "majority" },
        ] },
        { id: "minority", word: "minority", meaning: "少数", pos: "名詞", examples: [
          { en: "Only a minority of workers are against the plan.", ja: "その計画に反対の労働者は少数だけだ。", note: "majority の反対\nbe against 〜=〜に反対", form: "minority" },
        ] },
        { id: "unlike", word: "unlike", meaning: "〜とちがって", pos: "前置詞", examples: [
          { en: "Unlike Japan, Malaysia is hot all year round.", ja: "日本とちがって、マレーシアは一年中暑い。", note: "all year round=一年中\nlike（〜のように）の反対", form: "Unlike" },
        ] },
        { id: "superior", word: "superior", meaning: "よりすぐれた", pos: "形容詞", examples: [
          { en: "This model is superior to the old one.", ja: "このモデルは古いものよりすぐれている。", note: "be superior to 〜（than は使わない）", form: "superior" },
        ] },
        { id: "alternative", word: "alternative", meaning: "代わりのもの・代わりの", pos: "名詞・形容詞", examples: [
          { en: "Electric cars are a good alternative to petrol cars.", ja: "電気自動車はガソリン車の良い代わりになる。", note: "an alternative to 〜=〜の代わり\npetrol=ガソリン（英）", form: "alternative" },
        ] },
        { id: "rather-than", word: "rather than", meaning: "〜よりむしろ", pos: "熟語", examples: [
          { en: "I prefer to take the train rather than drive.", ja: "運転するより電車に乗るほうがいい。", note: "A rather than B=BよりむしろA", form: "rather than" },
        ] },
      ],
    },
    {
      title: "ビジネス・貿易",
      words: [
        { id: "export", word: "export", meaning: "輸出する・輸出", pos: "動詞・名詞", examples: [
          { en: "Japan exports a lot of used cars to Malaysia.", ja: "日本はマレーシアに多くの中古車を輸出している。", note: "export A to B=AをBに輸出する\nused car=中古車", form: "exports" },
        ] },
        { id: "import", word: "import", meaning: "輸入する・輸入", pos: "動詞・名詞", examples: [
          { en: "Malaysia imports cars from Japan.", ja: "マレーシアは日本から車を輸入している。", note: "import A from B=AをBから輸入する", form: "imports" },
        ] },
        { id: "trade", word: "trade", meaning: "貿易・取引する", pos: "名詞・動詞", examples: [
          { en: "Trade between the two countries is growing.", ja: "2つの国の間の貿易は伸びている。", note: "trade between A and B=AとBの間の貿易", form: "Trade" },
        ] },
        { id: "market", word: "market", meaning: "市場", pos: "名詞", examples: [
          { en: "The company wants to expand into the Malaysian market.", ja: "その会社はマレーシア市場に進出したい。", note: "expand into 〜=〜に進出する", form: "market" },
        ] },
        { id: "demand", word: "demand", meaning: "需要・要求する", pos: "名詞・動詞", examples: [
          { en: "Demand for electric cars is weaker than before.", ja: "電気自動車の需要は前より弱い。", note: "demand for 〜=〜の需要\nsupply の反対", form: "Demand" },
        ] },
        { id: "supply", word: "supply", meaning: "供給・供給する", pos: "名詞・動詞", examples: [
          { en: "The supply of new cars is limited.", ja: "新車の供給は限られている。", note: "supply and demand=需要と供給（英語は supply が先）", form: "supply" },
        ] },
        { id: "invest", word: "invest", meaning: "投資する", pos: "動詞", examples: [
          { en: "The government should invest more in public transport.", ja: "政府は公共交通にもっと投資すべきだ。", note: "invest in 〜=〜に投資する\ninvestment=投資(名)", form: "invest" },
        ] },
        { id: "competition", word: "competition", meaning: "競争", pos: "名詞", examples: [
          { en: "Competition between car companies is very strong.", ja: "自動車会社の間の競争はとても激しい。", note: "compete=競争する(動)\ncompetitor=競争相手", form: "Competition" },
        ] },
        { id: "negotiate", word: "negotiate", meaning: "交渉する", pos: "動詞", examples: [
          { en: "We negotiated the price with our client.", ja: "私たちは取引先と価格を交渉した。", note: "negotiate 〜 with 人=人と〜を交渉する\nnegotiation=交渉(名)", form: "negotiated" },
        ] },
        { id: "contract", word: "contract", meaning: "契約", pos: "名詞", examples: [
          { en: "We signed a contract with a local company.", ja: "私たちは地元の会社と契約を結んだ。", note: "sign a contract=契約を結ぶ", form: "contract" },
        ] },
      ],
    },
    {
      title: "都市・住まい",
      words: [
        { id: "urban", word: "urban", meaning: "都市の", pos: "形容詞", examples: [
          { en: "Urban areas often have serious traffic problems.", ja: "都市部はよく深刻な交通問題を抱えている。", note: "urban area=都市部\nrural（地方の）の反対", form: "Urban" },
        ] },
        { id: "rural", word: "rural", meaning: "地方の・田舎の", pos: "形容詞", examples: [
          { en: "Many young people leave rural areas to find jobs.", ja: "多くの若者が仕事を見つけるために地方を出る。", note: "rural area=地方", form: "rural" },
        ] },
        { id: "housing", word: "housing", meaning: "住宅", pos: "名詞", examples: [
          { en: "The city needs more affordable housing.", ja: "その都市にはもっと手ごろな住宅が必要だ。", note: "affordable=手ごろな値段の\n数えない名詞", form: "housing" },
        ] },
        { id: "infrastructure", word: "infrastructure", meaning: "インフラ・社会基盤", pos: "名詞", examples: [
          { en: "Good infrastructure helps the economy grow.", ja: "良いインフラは経済の成長を助ける。", note: "道路・鉄道・電気など\neconomy=経済", form: "infrastructure" },
        ] },
        { id: "crowded", word: "crowded", meaning: "混んでいる", pos: "形容詞", examples: [
          { en: "The trains are very crowded in the morning.", ja: "朝は電車がとても混んでいる。", note: "be crowded with 〜=〜で混んでいる", form: "crowded" },
        ] },
        { id: "facility", word: "facility", meaning: "施設", pos: "名詞", examples: [
          { en: "The school has excellent sports facilities.", ja: "その学校にはすばらしいスポーツ施設がある。", note: "複数形 facilities でよく使う", form: "facilities" },
        ] },
        { id: "resident", word: "resident", meaning: "住民", pos: "名詞", examples: [
          { en: "Local residents are against the new road.", ja: "地元の住民は新しい道路に反対している。", note: "local residents=地元の住民\nreside=住む(動)", form: "residents" },
        ] },
        { id: "local", word: "local", meaning: "地元の・その地域の", pos: "形容詞", examples: [
          { en: "We should support local businesses.", ja: "私たちは地元の店や会社を応援すべきだ。", note: "local business=地元の店・会社\n「田舎の」という意味ではない", form: "local" },
        ] },
        { id: "develop", word: "develop", meaning: "発展する・開発する", pos: "動詞", examples: [
          { en: "Malaysia has developed quickly in the last 30 years.", ja: "マレーシアはこの30年で急速に発展した。", note: "developing country=発展途上国\ndevelopment=発展(名)", form: "developed" },
        ] },
        { id: "construction", word: "construction", meaning: "建設", pos: "名詞", examples: [
          { en: "The construction of the new station will take three years.", ja: "新しい駅の建設には3年かかる。", note: "under construction=建設中\nconstruct=建てる(動)", form: "construction" },
        ] },
      ],
    },
    {
      title: "旅行・グローバル",
      words: [
        { id: "foreign", word: "foreign", meaning: "外国の", pos: "形容詞", examples: [
          { en: "Learning a foreign language takes time.", ja: "外国語を学ぶには時間がかかる。", note: "foreigner=外国人（直接言うと失礼に聞こえることも）", form: "foreign" },
        ] },
        { id: "global", word: "global", meaning: "世界的な", pos: "形容詞", examples: [
          { en: "Climate change is a global problem.", ja: "気候変動は世界的な問題だ。", note: "globally=世界的に(副)", form: "global" },
        ] },
        { id: "international", word: "international", meaning: "国際的な", pos: "形容詞", examples: [
          { en: "My son goes to an international school.", ja: "息子はインターナショナルスクールに通っている。", note: "an international（母音の音なので an）", form: "international" },
        ] },
        { id: "tourism", word: "tourism", meaning: "観光業", pos: "名詞", examples: [
          { en: "Tourism is important for the local economy.", ja: "観光業は地域の経済にとって大切だ。", note: "tourist=観光客", form: "Tourism" },
        ] },
        { id: "attract", word: "attract", meaning: "引きつける", pos: "動詞", examples: [
          { en: "The city attracts millions of tourists every year.", ja: "その都市は毎年何百万人もの観光客を引きつける。", note: "attractive=魅力的な(形)\nmillions of 〜=何百万もの〜", form: "attracts" },
        ] },
        { id: "destination", word: "destination", meaning: "行き先・目的地", pos: "名詞", examples: [
          { en: "Bali is a popular destination for families.", ja: "バリは家族に人気の旅行先だ。", note: "a popular destination=人気の旅行先", form: "destination" },
        ] },
        { id: "accommodation", word: "accommodation", meaning: "宿泊施設", pos: "名詞", examples: [
          { en: "Accommodation in the city centre is expensive.", ja: "都心の宿泊施設は高い。", note: "イギリス英語では数えない名詞\ncity centre=都心（英）", form: "Accommodation" },
        ] },
        { id: "immigrant", word: "immigrant", meaning: "移民", pos: "名詞", examples: [
          { en: "Many immigrants work in the service industry.", ja: "多くの移民がサービス業で働いている。", note: "immigration=移住・入国管理(名)", form: "immigrants" },
        ] },
        { id: "diverse", word: "diverse", meaning: "多様な", pos: "形容詞", examples: [
          { en: "Malaysia has a diverse culture.", ja: "マレーシアには多様な文化がある。", note: "diversity=多様性(名)", form: "diverse" },
        ] },
        { id: "abroad", word: "abroad", meaning: "海外に・海外で", pos: "副詞", examples: [
          { en: "More students want to study abroad.", ja: "留学したい学生が増えている。", note: "go abroad（✗ go to abroad）\n副詞なので to はいらない", form: "abroad" },
        ] },
      ],
    },
    {
      title: "車・新しい技術",
      words: [
        { id: "vehicle", word: "vehicle", meaning: "車両・乗り物", pos: "名詞", examples: [
          { en: "The number of vehicles on the road is increasing.", ja: "道路を走る車の数が増えている。", note: "car より広い言い方（バス・トラックもふくむ）", form: "vehicles" },
        ] },
        { id: "electric", word: "electric", meaning: "電気の", pos: "形容詞", examples: [
          { en: "Electric cars are becoming more popular.", ja: "電気自動車はますます人気になっている。", note: "electric car / EV\nelectricity=電気(名)", form: "Electric" },
        ] },
        { id: "fuel", word: "fuel", meaning: "燃料", pos: "名詞", examples: [
          { en: "Fuel prices went up again this month.", ja: "今月また燃料の価格が上がった。", note: "fuel prices=燃料価格\ngo up=上がる", form: "Fuel" },
        ] },
        { id: "emission", word: "emission", meaning: "排出（ガス）", pos: "名詞", examples: [
          { en: "Cars produce a lot of carbon emissions.", ja: "車は多くの二酸化炭素を出す。", note: "carbon emissions=二酸化炭素の排出\nふつう複数形", form: "emissions" },
        ] },
        { id: "battery", word: "battery", meaning: "電池・バッテリー", pos: "名詞", examples: [
          { en: "The battery of an EV lasts about ten years.", ja: "電気自動車のバッテリーは約10年もつ。", note: "last=もつ・続く", form: "battery" },
        ] },
        { id: "efficient", word: "efficient", meaning: "効率のよい", pos: "形容詞", examples: [
          { en: "This engine is more efficient than the old one.", ja: "このエンジンは古いものより効率がよい。", note: "efficiency=効率(名)\nfuel-efficient=燃費のよい", form: "efficient" },
        ] },
        { id: "renewable", word: "renewable", meaning: "再生可能な", pos: "形容詞", examples: [
          { en: "Solar power is a renewable source of energy.", ja: "太陽光発電は再生可能なエネルギー源だ。", note: "renewable energy=再生可能エネルギー", form: "renewable" },
        ] },
        { id: "sustainable", word: "sustainable", meaning: "持続可能な", pos: "形容詞", examples: [
          { en: "We need a more sustainable way of living.", ja: "もっと持続可能な暮らし方が必要だ。", note: "sustainability=持続可能性(名)\nSDGs の S", form: "sustainable" },
        ] },
        { id: "innovation", word: "innovation", meaning: "革新・新しいアイデア", pos: "名詞", examples: [
          { en: "Innovation is the key to a company's growth.", ja: "革新が会社の成長のカギだ。", note: "the key to 〜=〜のカギ\ninnovative=革新的な(形)", form: "Innovation" },
        ] },
        { id: "automatic", word: "automatic", meaning: "自動の", pos: "形容詞", examples: [
          { en: "Most cars in Japan are automatic.", ja: "日本の車のほとんどはオートマだ。", note: "automatically=自動的に(副)", form: "automatic" },
        ] },
      ],
    },
    {
      title: "仕事・働き方",
      words: [
        { id: "colleague", word: "colleague", meaning: "同僚", pos: "名詞", examples: [
          { en: "I had lunch with my colleagues.", ja: "同僚と昼ごはんを食べた。", note: "coworker と同じ意味\n少しかたい言い方", form: "colleagues" },
        ] },
        { id: "promote", word: "promote", meaning: "昇進させる・宣伝する", pos: "動詞", examples: [
          { en: "She was promoted to manager last year.", ja: "彼女は去年マネージャーに昇進した。", note: "be promoted to 〜=〜に昇進する\npromotion=昇進・宣伝(名)", form: "promoted" },
        ] },
        { id: "qualification", word: "qualification", meaning: "資格", pos: "名詞", examples: [
          { en: "You need a professional qualification for this job.", ja: "この仕事には専門の資格が必要だ。", note: "qualified=資格のある(形)", form: "qualification" },
        ] },
        { id: "responsibility", word: "responsibility", meaning: "責任", pos: "名詞", examples: [
          { en: "It is my responsibility to find new clients.", ja: "新しい取引先を見つけるのが私の責任だ。", note: "take responsibility for 〜=〜の責任をとる\nresponsible=責任がある(形)", form: "responsibility" },
        ] },
        { id: "deadline", word: "deadline", meaning: "しめきり", pos: "名詞", examples: [
          { en: "We have to meet the deadline.", ja: "しめきりに間に合わせなければならない。", note: "meet the deadline=しめきりに間に合わせる", form: "deadline" },
        ] },
        { id: "workload", word: "workload", meaning: "仕事の量", pos: "名詞", examples: [
          { en: "My workload has increased since I moved to Malaysia.", ja: "マレーシアに来てから、仕事の量が増えた。", note: "a heavy workload=多い仕事量", form: "workload" },
        ] },
        { id: "flexible", word: "flexible", meaning: "柔軟な・融通がきく", pos: "形容詞", examples: [
          { en: "Many companies now offer flexible working hours.", ja: "多くの会社が今、柔軟な勤務時間を取り入れている。", note: "flexible working hours=フレックスタイム", form: "flexible" },
        ] },
        { id: "productive", word: "productive", meaning: "生産的な", pos: "形容詞", examples: [
          { en: "I feel more productive in the morning.", ja: "朝のほうがはかどる。", note: "productivity=生産性(名)", form: "productive" },
        ] },
        { id: "unemployed", word: "unemployed", meaning: "失業している", pos: "形容詞", examples: [
          { en: "Many young people are unemployed in some countries.", ja: "一部の国では多くの若者が失業している。", note: "unemployment=失業(名)\nemploy=雇う", form: "unemployed" },
        ] },
        { id: "retire", word: "retire", meaning: "退職する・引退する", pos: "動詞", examples: [
          { en: "My father retired at the age of 65.", ja: "父は65歳で退職した。", note: "at the age of 〜=〜歳で\nretirement=退職(名)", form: "retired" },
        ] },
      ],
    },
    {
      title: "家族・子育て",
      words: [
        { id: "raise", word: "raise", meaning: "育てる", pos: "動詞", examples: [
          { en: "It is expensive to raise children in big cities.", ja: "大都市で子どもを育てるのはお金がかかる。", note: "raise children=子どもを育てる\nrise（上がる）とまちがえない", form: "raise" },
        ] },
        { id: "childcare", word: "childcare", meaning: "保育", pos: "名詞", examples: [
          { en: "The cost of childcare is very high.", ja: "保育の費用はとても高い。", note: "数えない名詞", form: "childcare" },
        ] },
        { id: "behavior", word: "behavior", meaning: "ふるまい・行動", pos: "名詞", examples: [
          { en: "Parents have a strong influence on children's behavior.", ja: "親は子どものふるまいに強い影響を持つ。", note: "behave=ふるまう(動)\n英では behaviour", form: "behavior" },
        ] },
        { id: "discipline", word: "discipline", meaning: "しつけ・規律", pos: "名詞・動詞", examples: [
          { en: "Good discipline is important in schools.", ja: "学校では良い規律が大切だ。", note: "self-discipline=自制心", form: "discipline" },
        ] },
        { id: "independent", word: "independent", meaning: "自立した・独立した", pos: "形容詞", examples: [
          { en: "Children should learn to be independent.", ja: "子どもは自立することを学ぶべきだ。", note: "be independent of 〜=〜から自立している", form: "independent" },
        ] },
        { id: "encourage", word: "encourage", meaning: "はげます・すすめる", pos: "動詞", examples: [
          { en: "My parents encouraged me to play baseball.", ja: "両親は私に野球をするようすすめた。", note: "encourage 人 to do=人に〜するようすすめる", form: "encouraged" },
        ] },
        { id: "support", word: "support", meaning: "支える・支援", pos: "動詞・名詞", examples: [
          { en: "My wife always supports me.", ja: "妻はいつも私を支えてくれる。", note: "support 人=人を支える（about などはいらない）", form: "supports" },
        ] },
        { id: "elderly", word: "elderly", meaning: "年配の", pos: "形容詞", examples: [
          { en: "The number of elderly people is increasing in Japan.", ja: "日本では高齢者の数が増えている。", note: "the elderly=お年寄り\nold よりていねい", form: "elderly" },
        ] },
        { id: "cheat", word: "cheat", meaning: "ずるをする", pos: "動詞", examples: [
          { en: "He cheated on the test.", ja: "彼はテストでずるをした。", note: "cheat on a test=テストでずるをする\n過去形は cheated", form: "cheated" },
        ] },
        { id: "pressure", word: "pressure", meaning: "プレッシャー・圧力", pos: "名詞", examples: [
          { en: "Students are under a lot of pressure to pass exams.", ja: "学生は試験に受かるよう強いプレッシャーを受けている。", note: "be under pressure=プレッシャーを受けている", form: "pressure" },
        ] },
      ],
    },
    {
      title: "意見・議論",
      words: [
        { id: "advantage", word: "advantage", meaning: "利点", pos: "名詞", examples: [
          { en: "One advantage of living in a city is good public transport.", ja: "都市に住む利点の1つは、公共交通が便利なことだ。", note: "One advantage of 〜 is …=〜の利点の1つは…", form: "advantage" },
        ] },
        { id: "disadvantage", word: "disadvantage", meaning: "欠点・不利な点", pos: "名詞", examples: [
          { en: "The main disadvantage is the high cost.", ja: "一番の欠点は費用が高いことだ。", note: "advantages and disadvantages=利点と欠点", form: "disadvantage" },
        ] },
        { id: "drawback", word: "drawback", meaning: "欠点", pos: "名詞", examples: [
          { en: "The only drawback of this car is its price.", ja: "この車の唯一の欠点は値段だ。", note: "disadvantage と同じような意味", form: "drawback" },
        ] },
        { id: "essential", word: "essential", meaning: "欠かせない", pos: "形容詞", examples: [
          { en: "English is essential for my job.", ja: "英語は私の仕事に欠かせない。", note: "be essential for 〜=〜に欠かせない\nimportant より強い", form: "essential" },
        ] },
        { id: "crucial", word: "crucial", meaning: "非常に重要な", pos: "形容詞", examples: [
          { en: "Sleep is crucial for good health.", ja: "睡眠は健康にとって非常に重要だ。", note: "essential と同じくらい強い", form: "crucial" },
        ] },
        { id: "controversial", word: "controversial", meaning: "賛否が分かれる", pos: "形容詞", examples: [
          { en: "Nuclear power is a controversial issue.", ja: "原子力は賛否が分かれる問題だ。", note: "controversy=論争(名)\nissue=問題", form: "controversial" },
        ] },
        { id: "solution", word: "solution", meaning: "解決策", pos: "名詞", examples: [
          { en: "We need to find a solution to this problem.", ja: "この問題の解決策を見つける必要がある。", note: "a solution to 〜（for より to）\nsolve=解決する(動)", form: "solution" },
        ] },
        { id: "approach", word: "approach", meaning: "やり方・近づく", pos: "名詞・動詞", examples: [
          { en: "We need a new approach to sales in Malaysia.", ja: "マレーシアでの営業には新しいやり方が必要だ。", note: "an approach to 〜=〜へのやり方", form: "approach" },
        ] },
        { id: "evidence", word: "evidence", meaning: "証拠・根拠", pos: "名詞", examples: [
          { en: "There is no evidence that this method works.", ja: "この方法が効くという証拠はない。", note: "数えない名詞（✗ an evidence）", form: "evidence" },
        ] },
        { id: "claim", word: "claim", meaning: "主張する・主張", pos: "動詞・名詞", examples: [
          { en: "Some people claim that social media is harmful.", ja: "SNSは有害だと主張する人もいる。", note: "claim that 〜=〜だと主張する", form: "claim" },
        ] },
      ],
    },
    {
      title: "つなぎ言葉",
      words: [
        { id: "moreover", word: "moreover", meaning: "さらに", pos: "副詞", examples: [
          { en: "The car is cheap. Moreover, it uses little fuel.", ja: "その車は安い。さらに、燃料をあまり使わない。", note: "文の最初に置いてコンマ\n書き言葉", form: "Moreover" },
        ] },
        { id: "furthermore", word: "furthermore", meaning: "さらに", pos: "副詞", examples: [
          { en: "Furthermore, the city has many parks.", ja: "さらに、その都市には公園が多い。", note: "moreover と同じ意味", form: "Furthermore" },
        ] },
        { id: "nevertheless", word: "nevertheless", meaning: "それでも", pos: "副詞", examples: [
          { en: "It was raining. Nevertheless, we went out.", ja: "雨だった。それでも、私たちは出かけた。", note: "however より「それでも」の意味が強い", form: "Nevertheless" },
        ] },
        { id: "consequently", word: "consequently", meaning: "その結果", pos: "副詞", examples: [
          { en: "He missed his flight. Consequently, he had to buy a new ticket.", ja: "彼は飛行機に乗り遅れた。その結果、新しいチケットを買わなければならなかった。", note: "as a result と同じ意味", form: "Consequently" },
        ] },
        { id: "in-addition", word: "in addition", meaning: "加えて", pos: "熟語", examples: [
          { en: "In addition, we visited three clients.", ja: "加えて、私たちは3社の取引先を訪れた。", note: "in addition to 〜=〜に加えて", form: "In addition" },
        ] },
        { id: "on-the-other-hand", word: "on the other hand", meaning: "一方で", pos: "熟語", examples: [
          { en: "Cities are convenient. On the other hand, they are expensive.", ja: "都市は便利だ。一方で、お金がかかる。", note: "2つを比べるときに使う", form: "On the other hand" },
        ] },
        { id: "for-instance", word: "for instance", meaning: "たとえば", pos: "熟語", examples: [
          { en: "Some sports, for instance golf and tennis, are popular in Malaysia.", ja: "いくつかのスポーツ、たとえばゴルフやテニスは、マレーシアで人気がある。", note: "for example と同じ意味", form: "for instance" },
        ] },
        { id: "despite", word: "despite", meaning: "〜にもかかわらず", pos: "前置詞", examples: [
          { en: "Despite the rain, the event was a success.", ja: "雨にもかかわらず、イベントは成功した。", note: "despite のあとは名詞（✗ despite of）", form: "Despite" },
        ] },
        { id: "overall", word: "overall", meaning: "全体として", pos: "副詞・形容詞", examples: [
          { en: "Overall, the number of tourists increased.", ja: "全体として、観光客の数は増えた。", note: "IELTS のグラフ問題のまとめでよく使う", form: "Overall" },
        ] },
        { id: "in-conclusion", word: "in conclusion", meaning: "結論として", pos: "熟語", examples: [
          { en: "In conclusion, I believe that education should be free.", ja: "結論として、教育は無料にすべきだと思う。", note: "エッセイの最後の段落の始めに使う", form: "In conclusion" },
        ] },
      ],
    },
  ],
};
