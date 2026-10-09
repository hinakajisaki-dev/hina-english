# 04 英語リスニングの神経科学：音声が「聞こえる」脳内メカニズムと、L2リスニング上達で脳はどう変わるか

凡例：[検証済] = 本セッションのWeb検索で書誌情報または主要知見を確認。[要照合] = 定番文献で書誌・知見は既知だが、本セッションでは原典ページを再取得できていない（NCBI/PubMed・Nature等のドメインが取得ツールから到達不可だったため）。動画で数値を出す前に原典確認を推奨。エビデンス強度：[強] 再現多数/大規模、[中] 単一〜少数研究、[論争] 反証・再現失敗あり。

---

## Q1. 聴覚経路（蝸牛→皮質）の平易な説明と、「L2リスニングのボトルネックは耳ではなく脳の処理」という主張の根拠

### Takeaway
音は蝸牛で周波数ごとに分解され（トノトピー）、脳幹・視床を経てヘシュル回（一次聴覚野）と上側頭回/溝（STG/STS）に届く。日本語話者の耳（末梢）は英語の音響情報を物理的には拾えている。差を生むのは「どの音響手がかりを重視するか」「単語の境界をどう切るか」という脳側のチューニングで、このチューニングは乳児期の経験で作られる。ただし最新研究では、脳幹レベルの符号化もすでに母語経験の影響を受けており、「耳＝末梢は同じ、脳幹から上は経験でチューニング済み」と言うのが正確。

### Cited Findings
**聴覚経路の基本**
- 蝸牛の基底膜は場所ごとに異なる周波数で振動する（進行波説）。これを示したゲオルク・フォン・ベケシーは1961年のノーベル生理学・医学賞を受賞した。基底膜の基部が高音、頂部が低音を担う「場所による周波数地図」がトノトピーの出発点 — [Nobel Prize 1961 Békésy](https://www.nobelprize.org/prizes/medicine/1961/summary/)
- トノトピー（周波数順の配列）は蝸牛で始まり、上行路の各段階（蝸牛神経核→上オリーブ複合体→外側毛帯→下丘→視床の内側膝状体腹側部）を通って聴覚皮質まで保たれる。内側膝状体のうち腹側部は等周波数層で組織され下丘中心核から入力を受けるが、背側部はトノトピー的ではない — [UNM講義ノート「Inner Ear and Auditory Pathway」（教育用・二次資料）](https://www.unm.edu/~atneel/shs310/lec_innerear1.html)
- ヒトの一次聴覚野（ヘシュル回）には、互いに鏡像になった2つのトノトピー地図がある（7T fMRI）[要照合][強]。Formisano E et al. (2003) "Mirror-symmetric tonotopic maps in human primary auditory cortex." *Neuron* 40(4):859–869 — [doi:10.1016/S0896-6273(03)00669-X](https://doi.org/10.1016/S0896-6273(03)00669-X)
- Hickok & Poeppel の枠組みでは、まず両側の背側STGが分光時間的な（音響的な）解析を行い、次に中〜後部STS（両側）で音韻レベルの処理が行われる。その後、意味へ向かう腹側路と、構音へ向かう背側路に分かれる（Q2参照）[検証済（書誌）][強]。Hickok G, Poeppel D (2007) "The cortical organization of speech processing." *Nat Rev Neurosci* 8(5):393–402 — [doi:10.1038/nrn2113](https://doi.org/10.1038/nrn2113)
- ヒトSTGの電極（皮質脳波ECoG）は、個々の音素よりも「破裂音」「摩擦音」「鼻音」「母音」などの**音声特徴**ごとに選択的に反応する [要照合][強]。Mesgarani N, Cheung C, Johnson K, Chang EF (2014) "Phonetic feature encoding in human superior temporal gyrus." *Science* 343(6174):1006–1010 — [doi:10.1126/science.1245994](https://doi.org/10.1126/science.1245994)
- **新しい知見で古いモデルが修正された点**：教科書的な「一次聴覚野→STGへの直列処理」は崩れつつある。聴覚皮質全体を同時にECoGで記録したところ、一次聴覚野（ヘシュル回）とSTGに速い並列入力が来ており、順番に活動するわけではなかった [検証済][中]。Hamilton LS, Oganian Y, Hall J, Chang EF (2021) "Parallel and distributed encoding of speech across human auditory cortex." *Cell* 184(18):4626–4639 — [Semantic Scholar](https://www.semanticscholar.org/paper/Parallel-and-distributed-encoding-of-speech-across-Hamilton-Oganian/586b0c8f9e1e56d908cf191a3ebe558322155b05); [Hearing Review 解説](https://hearingreview.com/inside-hearing/research/processing)
- 脳は連続する音素を約3個分同時に保持し、それぞれの「中身」と「順序」を別々に符号化している（MEG）[要照合][中]。Gwilliams L, King JR, Marantz A, Poeppel D (2022) "Neural dynamics of phoneme sequences reveal position-invariant code for content and order." *Nat Commun* 13:6606 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Gwilliams+2022+Neural+dynamics+of+phoneme+sequences+position-invariant+code)

**「耳はボトルネックではない」を支持する証拠**
- 日本語母語話者は合成音声の[r]–[l]連続体（F3＝第3フォルマントを変化させたもの）の弁別が苦手だった。古典研究であり書誌は確認済 [検証済（書誌）]。Miyawaki K, Strange W, Verbrugge R, Liberman AM, Jenkins JJ, Fujimura O (1975) "An effect of linguistic experience: The discrimination of [r] and [l] by native speakers of Japanese and English." *Perception & Psychophysics* 18:331–340 — [書誌を引用する論文（Springer）](https://link.springer.com/article/10.3758/BF03194435)。なお、同じF3の違いを**非音声**（F3成分だけの音）で聞かせると日本人も米国人並みに弁別できた、という結果がこの論文の核心として広く引用されている。ただし本セッションでは原文を取得できなかった [要照合]。この結果は「音響差は耳で聞き取れていて、"言語音として聞くモード"で潰れる」ことを示す代表例としてよく使われる。先行研究：Liberman, Miyawaki, Jenkins, Fujimura (1973) "Cross-language study of the perception of the F3 cue for [r] vs. [l] in speech- and nonspeech-like patterns" — [引用元（Springer）](https://link.springer.com/article/10.3758/BF03206698)
- 日本人・ドイツ人・米国人の知覚空間を比べると、日本人は/r/–/l/の決め手であるF3ではなく、**F2の変化に敏感**だった。つまり日本人の耳は音響的な違いに反応しているが、母語経験によって「注目する手がかり」がずれている（知覚的干渉説）[要照合][強]。Iverson P, Kuhl PK, Akahane-Yamada R, Diesch E, Tohkura Y, Kettermann A, Siebert C (2003) "A perceptual interference account of acquisition difficulties for non-native phonemes." *Cognition* 87(1):B47–B57 — [doi:10.1016/S0010-0277(02)00198-1](https://doi.org/10.1016/S0010-0277(02)00198-1)
- **日本人乳児も最初は/r/–/l/を聞き分けられる**。生後6–8か月では米国児63.7%、日本児64.7%で差がなかった。10–12か月になると米国児は73.8%に上がり、日本児は59.9%に下がった（head-turn法、計72名）[検証済（学会抄録の数値）][強]。数値の出典はASA 1997の学会抄録 — [auditory.org ASA抄録](https://auditory.org/asamtgs/asa97snd/3aSCb/3aSCb13.html)。論文版：Kuhl PK, Stevens E, Hayashi A, Deguchi T, Kiritani S, Iverson P (2006) "Infants show a facilitation effect for native language phonetic perception between 6 and 12 months." *Dev Sci* 9(2):F13–F21 — [doi:10.1111/j.1467-7687.2006.00468.x](https://doi.org/10.1111/j.1467-7687.2006.00468.x)（論文版の数値は抄録と異なる可能性あり）
- 日本人乳児では、6–8か月で/r–l/も/w–y/も弁別できたが、10–12か月では/w–y/だけが弁別可能だった（ICSLP 1994）— [ISCA Archive, Tsushima et al. 1994](https://www.isca-archive.org/icslp_1994/tsushima94_icslp.html)
- **2025年Nature（最重要の最新知見）**：高密度皮質脳波で、母語と未知の外国語を聞いたときのSTGを比べた。母語話者か否かに関係なく、母音・子音などの**音響音声的特徴には両言語でほぼ同じ反応**が出た。これに対し、**単語境界、単語頻度、言語特有の音の並びの統計**の符号化は、理解できる言語を聞いたときにだけ強まった。バイリンガルの別コホートでも検討している [検証済][中〜強]。Bhaya-Grossman I, Leonard MK, Zhang Y, Gwilliams L, Johnson K, Lu J, Chang EF (2025) "Shared and language-specific phonological processing in the human temporal lobe." *Nature*（2025年11月19日公開）— [doi:10.1038/s41586-025-09748-8](https://www.nature.com/articles/s41586-025-09748-8); [Nature News & Views](https://www.nature.com/articles/d41586-025-03827-6); [BPS解説「未知の言語が"ぼやけて"聞こえる理由」](https://www.bps.org.uk/research-digest/new-study-reveals-why-unknown-languages-sound-blur); [MedicalXpress](https://medicalxpress.com/news/2025-11-foreign-language-blur-native-ears.html)。同じグループが、STGが単語の始まりと終わりを検出する仕組みを扱った関連研究を*Neuron*に発表している（同上）
- MEGで日本人成人と米国人成人に/ra/–/la/を聞かせると、米国人のほうがミスマッチ磁場（MMF）が大きかった。日本人は、より広い範囲で長時間活動する「非効率な」処理を示し、母語への「神経的コミットメント」と解釈された [要照合][中]。Zhang Y, Kuhl PK, Imada T, Kotani M, Tohkura Y (2005) "Effects of language experience: neural commitment to language-specific auditory patterns." *NeuroImage* 26(3):703–720 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Zhang+Kuhl+2005+neural+commitment+language-specific+auditory+patterns)
- 長期滞在だけでは/r/–/l/の知覚は母語話者並みにならない。米国に長年住む日本人成人でも完全な習得に至らなかった [検証済（書誌）][中]。Takagi N, Mann V (1995) "The limits of extended naturalistic exposure on the perceptual mastery of English /r/ and /l/ by adult Japanese learners of English." *Applied Psycholinguistics* 16(4):379–405 — [Cambridge](https://resolve.cambridge.org/core/journals/applied-psycholinguistics/article/limits-of-extended-naturalistic-exposure-on-the-perceptual-mastery-of-english-r-and-l-by-adult-japanese-learners-of-english/84D5423B6EE616573D2961098D597B1F)

**ニュアンス：「脳幹から上はすでに母語でチューニングされている」**
- 脳幹の周波数追従反応（FFR）は母語経験に敏感：中国語（声調言語）話者は英語話者より脳幹のピッチ追従が強い [要照合][強]。Krishnan A, Xu Y, Gandour J, Cariani P (2005) "Encoding of pitch in the human brainstem is sensitive to language experience." *Cogn Brain Res* 25(1):161–168 — [doi:10.1016/j.cogbrainres.2005.05.004](https://doi.org/10.1016/j.cogbrainres.2005.05.004)
- 非声調言語どうし（フランス語と英語）でも、脳幹レベルの符号化が母語で異なる。米国英語話者は音節に関係なく基本周波数（F0）をより強く表現し（英語の強勢でF0が重要なためと解釈）、第1フォルマント（F1）は母語の音節でより頑健・精密に符号化された [検証済][中]。Intartaglia B, White-Schwoch T, Meunier C, Roman S, Kraus N, Schön D (2016) "Native language shapes automatic neural processing of speech." *Neuropsychologia* 89:57–65 — [HAL](https://hal.archives-ouvertes.fr/hal-01431302); [PDF](https://brainvolts.northwestern.edu/wp-content/uploads/boxtrx/Intartaglia_Neuropsychologia2016.pdf)
- 成人でも短期間の言語訓練（中国語風のピッチ単語の学習）で脳幹のピッチ符号化が改善した [要照合][中]。Song JH, Skoe E, Wong PCM, Kraus N (2008) "Plasticity in the adult human auditory brainstem following short-term linguistic training." *J Cogn Neurosci* 20(10):1892–1902 — [doi:10.1162/jocn.2008.20131](https://doi.org/10.1162/jocn.2008.20131)
- **日本人対象**：英国在住の日本語母語話者では、FFRの試行間の位相一貫性が高い（タイミングのぶれが小さい）人ほど英語子音の知覚が正確だった。この神経指標は、渡英年齢や滞在期間よりもよく子音知覚を予測した [検証済][中]。Omote A, Jasmin K, Tierney A (2017) "Successful non-native speech perception is linked to frequency following response phase consistency." *Cortex* 93:146–154 — [doi:10.1016/j.cortex.2017.05.005](https://www.researchgate.net/publication/317153977_Successful_non-native_speech_perception_is_linked_to_frequency_following_response_phase_consistency); [Birkbeck repository](https://eprints.bbk.ac.uk/id/eprint/19245/)

### Inferences
- 動画で使える言い方：「日本人の耳が悪いわけではない。赤ちゃんの頃は聞き分けられていた（Kuhl）。耳はF3の違いも拾っている（Miyawaki、要照合）。違いは脳が"どの手がかりに注目するか"（Iverson）と"どこで単語を切るか"（Bhaya-Grossman 2025）」。
- 厳密に言うと、「末梢の蝸牛は同じ」でも「脳幹からすでに母語仕様」（Krishnan, Intartaglia）。「耳じゃなくて脳」は、「蝸牛じゃなくて中枢（脳幹〜皮質）」と言い換えると正確になる。
- Bhaya-Grossman 2025は「知らない言語が音の"だんご"に聞こえる」体験を説明している。子音・母音の特徴は処理できているのに、単語境界の信号が出ない。英語学習で起きるのは、この「単語境界の検出器」を英語向けに育てる作業だと説明できる。
- 日本の英語教材でよく見る「英語は2,000–12,000Hz、日本語は125–1,500Hz」という"周波数帯（パスバンド）"の主張は、上記の神経科学的知見（耳は音響差を拾える／差は中枢の重み付け）と整合しない。日本語にも/s/など高周波の摩擦音はある。ただし、この主張を直接検証・反証した査読論文は今回見つけられていない（Gaps参照）。

### Gaps
- Miyawaki et al. (1975) の非音声条件の具体的な結果（正答率など）は原文を確認できていない。DOIも未確認。
- 教科書的な数値（内有毛細胞 約3,500個、聴神経線維 約30,000本、可聴域 約20Hz–20kHz）は、本セッションでは引用可能なURLを確保できていない（Purves *Neuroscience* 等の教科書で確認を推奨）。
- Hamilton et al. (2021) では「ヘシュル回を電気刺激しても音声知覚は妨げられず、STGの刺激では妨げられた」と記憶しているが、本セッションでは確認できなかった。
- Tomatis系の「言語別周波数帯（パスバンド）」説への査読付き反証は見つからなかった。

---

## Q2. 二重経路モデル（腹側「what」路／背側「how」路）と、ブローカ野・運動野の役割（運動理論、TMS研究、必要性をめぐる論争）

### Takeaway
Hickok & Poeppel (2007) によると、音声理解の主役は両側性の腹側路（音→意味）。左優位の背側路（音→構音）は、発話・復唱・音韻作業記憶・学習を支える。運動野が音声知覚中に活動すること自体は確実（fMRI/TMS）。しかし、それが知覚に**必要**かというと、効果は小さく、雑音下など曖昧な条件に限られるというのが現在の主流。2026年には運動前野へのTMSで効果が出なかった研究もある。L2学習者では背側路（構音系）が通常より強く動員されるという証拠がある。

### Cited Findings
**二重経路モデル**
- 腹側路（*what*）は音を意味（語彙・概念）に対応づけ、両側性（弱い左偏り）で側頭葉の中・前部へ向かう。背側路（*how*）は音を構音表象に対応づけ、強く左優位で、シルビウス裂後端の側頭頭頂接合部（area Spt）から後部前頭葉（ブローカ野・運動前野）へ向かう [検証済（書誌）][強]。Hickok & Poeppel (2007) *Nat Rev Neurosci* 8:393–402 — [doi:10.1038/nrn2113](https://doi.org/10.1038/nrn2113)
- サルの聴覚皮質研究に基づく同種の二重経路論として、前方路は音の同定、後方路は感覚運動統合・空間を担うとする説がある [要照合][強]。Rauschecker JP, Scott SK (2009) "Maps and streams in the auditory cortex: nonhuman primates illuminate human speech processing." *Nat Neurosci* 12(6):718–724 — [doi:10.1038/nn.2331](https://doi.org/10.1038/nn.2331)
- 背側路の役割は「発話のための感覚運動統合」（順モデルによる予測と誤差修正）であり、知覚そのものではないと位置づけられている [要照合]。Hickok G, Houde J, Rong F (2011) "Sensorimotor integration in speech processing: computational basis and neural organization." *Neuron* 69(3):407–422 — [doi:10.1016/j.neuron.2011.01.019](https://doi.org/10.1016/j.neuron.2011.01.019)

**運動理論とそれを支持する証拠**
- 運動理論（Liberman）は、音声知覚の対象は音響ではなく話者の「意図された構音ジェスチャー」だとする [要照合]。Liberman AM, Cooper FS, Shankweiler DP, Studdert-Kennedy M (1967) "Perception of the speech code." *Psychol Rev* 74(6):431–461 — [doi:10.1037/h0020279](https://doi.org/10.1037/h0020279); Liberman AM, Mattingly IG (1985) "The motor theory of speech perception revised." *Cognition* 21(1):1–36 — [doi:10.1016/0010-0277(85)90021-6](https://doi.org/10.1016/0010-0277(85)90021-6)
- イタリア語の巻き舌"rr"を含む単語を聞くと、舌の筋肉の運動誘発電位（TMSで測定）が大きくなった [要照合][中]。Fadiga L, Craighero L, Buccino G, Rizzolatti G (2002) "Speech listening specifically modulates the excitability of tongue muscles: a TMS study." *Eur J Neurosci* 15(2):399–402 — [doi:10.1046/j.0953-816x.2001.01874.x](https://doi.org/10.1046/j.0953-816x.2001.01874.x)
- 音声を聞くと、唇の音（[p]）では唇の運動野、舌の音（[t]）では舌の運動野が体部位局在的に活動した（**fMRI研究**。依頼文にある"TMS研究"ではない点に注意）[要照合][中]。Pulvermüller F, Huss M, Kherif F, Moscoso del Prado Martin F, Hauk O, Shtyrov Y (2006) "Motor cortex maps articulatory features of speech sounds." *PNAS* 103(20):7865–7870 — [doi:10.1073/pnas.0509989103](https://doi.org/10.1073/pnas.0509989103)
- 左運動前野をrTMSで一時的に抑制すると、雑音下の音素弁別が低下した（色の弁別は低下しなかった）[要照合][中]。Meister IG, Wilson SM, Deblieck C, Wu AD, Iacoboni M (2007) "The essential role of premotor cortex in speech perception." *Curr Biol* 17(19):1692–1696 — [doi:10.1016/j.cub.2007.08.064](https://doi.org/10.1016/j.cub.2007.08.064)
- 唇の運動野をTMSで刺激すると唇音（b/p）の、舌の運動野を刺激すると舌音（d/t）の雑音下での識別が促進された（二重乖離）[要照合][中]。D'Ausilio A, Pulvermüller F, Salmas P, Bufalari I, Begliomini C, Fadiga L (2009) "The motor somatotopy of speech perception." *Curr Biol* 19(5):381–385 — [doi:10.1016/j.cub.2009.01.017](https://doi.org/10.1016/j.cub.2009.01.017)
- 唇の運動野にrTMSをかけると/ba/–/da/の範疇知覚が鈍ったが、唇を使わない/ka/–/ga/は影響を受けなかった [要照合][中]。Möttönen R, Watkins KE (2009) "Motor representations of articulators contribute to categorical perception of speech sounds." *J Neurosci* 29(31):9819–9825 — [doi:10.1523/JNEUROSCI.6018-08.2009](https://doi.org/10.1523/JNEUROSCI.6018-08.2009)

**批判・「必要ではない」側の証拠**
- 構音できない生物も音声範疇を知覚できる。チンチラは/da/–/ta/（VOT）の範疇境界を人間とほぼ同じ位置で示した [要照合][強]。Kuhl PK, Miller JD (1975) "Speech perception by the chinchilla: voiced-voiceless distinction in alveolar plosive consonants." *Science* 190(4209):69–72 — [doi:10.1126/science.1166301](https://doi.org/10.1126/science.1166301)
- ミラーニューロン的な説明への理論的批判（運動系の活動は知覚に伴うものの、知覚の基盤ではない可能性）[要照合]。Lotto AJ, Hickok GS, Holt LL (2009) "Reflections on mirror neurons and speech perception." *Trends Cogn Sci* 13(3):110–114 — [doi:10.1016/j.tics.2008.11.008](https://doi.org/10.1016/j.tics.2008.11.008)
- 過去の「因果的」研究の多くは、単一のSN比でしか成績を測っておらず、反応バイアスや課題効果が混入している可能性がある。心理測定関数を推定し直すと、運動系の寄与は「控えめ（modest）」だった [検証済][中]。Stokes RC, Venezia JH, Hickok G (2019) "The motor system's [modest] contribution to speech perception." *Psychon Bull Rev* 26:1354–1366 — [doi:10.3758/s13423-019-01580-2](https://link.springer.com/article/10.3758/s13423-019-01580-2)
- オンライン部分追試では、若年成人は構音資源を塞がれると雑音下の音声知覚がやや低下した（効果は残るが小さい）[検証済][中]。Slade et al. (2024) "The effect of motor resource suppression on speech perception in noise in younger and older listeners: An online study." *Psychon Bull Rev* — [doi:10.3758/s13423-023-02361-8](https://link.springer.com/article/10.3758/s13423-023-02361-8)
- **2026年の新知見**：劣化音声の知覚と「聞き間違い」を調べたTMS研究。対照部位（頭頂）と比べると、左後部STGの抑制は実在文のプライミングを選択的に妨げた。一方、左運動前野の抑制は、実在文の知覚にも疑似文の聞き間違いにも有意な影響を与えなかった [検証済][中]。Tolkacheva V, Brownsett SLE, McMahon KL, de Zubicaray GI (2026) "No causal role for premotor cortex in the perception or misperception of degraded speech: Evidence from transcranial magnetic stimulation." *J Cogn Neurosci* 38(4):731– — [MIT Press](https://direct.mit.edu/jocn/article/38/4/731/133668/No-Causal-Role-for-Premotor-Cortex-in-the); [ANT Neuro 掲載情報](https://www.ant-neuro.com/blog/publication-7/no-causal-role-for-premotor-cortex-in-the-perception-or-misperception-of-degraded-speech-evidence-from-transcranial-magnetic-stimulation-2490)
- Wada検査（片側大脳半球の麻酔）で左半球を止めても単語の聴覚理解はかなり保たれ、両側性の音声処理能力が示された [要照合][中]。Hickok G et al. (2008) "Bilateral capacity for speech sound processing in auditory comprehension: evidence from Wada procedures." *Brain Lang* 107(3):179–184 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Hickok+2008+Bilateral+capacity+for+speech+sound+processing+Wada)
- 中間的な立場の総説：運動系は特に雑音・曖昧・視覚情報ありの条件で知覚に寄与する [要照合]。Skipper JI, Devlin JT, Lametti DR (2017) "The hearing ear is always found close to the speaking tongue: Review of the role of the motor system in speech perception." *Brain Lang* 164:77–105 — [doi:10.1016/j.bandl.2016.10.004](https://doi.org/10.1016/j.bandl.2016.10.004)

**L2との関係**
- 発音しにくい非母語音素ほど、聞いているときの運動前野の活動が大きかった（fMRI）[要照合][中]。Wilson SM, Iacoboni M (2006) "Neural responses to non-native phonemes varying in producibility: evidence for the sensorimotor nature of speech perception." *NeuroImage* 33(1):316–325 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Wilson+Iacoboni+2006+Neural+responses+to+non-native+phonemes+varying+in+producibility)
- 日本人の/r/–/l/識別課題では、母語話者に比べて構音・聴覚の内部モデルに関わる領域（運動前野・ブローカ野・小脳など）の動員が大きかった [検証済（書誌）／知見は要照合]。Callan DE, Jones JA, Callan AM, Akahane-Yamada R (2004) *NeuroImage* 22:1182–1194（書誌は検索結果中の引用リストで確認）— [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Callan+Jones+Callan+Akahane-Yamada+2004+NeuroImage+phonetic+perceptual+identification+native+second-language)

### Inferences
- 動画では「英語を聞くと口の運動野もこっそり動く（Fadiga, Pulvermüller）。ただし、運動野がないと聞けないわけではない（チンチラ、Stokes 2019、Tolkacheva 2026）。**助っ人**であって**主役**ではない」とまとめるのが科学的に正確。
- L2学習者で背側路の動員が大きい（Wilson & Iacoboni、Callan）のは、「よく知らない音を、自分ならどう発音するかでシミュレーションして補っている」と解釈できる。これはシャドーイングや発音練習がリスニングを助ける可能性の神経的な根拠に**なりうる**が、因果を直接示した研究は今回確認していない。

### Gaps
- 「発音練習→リスニング向上」を脳レベルで因果的に示したRCTは今回見つからなかった（行動研究は別ノート担当の範囲と思われる）。
- Callan et al. (2004) の活動部位の詳細は原文未確認。

---

## Q3. 神経振動と音声追従（speech tracking）：シータ/ガンマ、Ding et al. (2016) の階層的追従、L2の追従研究

### Takeaway
脳の聴覚野のリズム（シータ波 約4–8Hz ≒ 音節の速さ、ガンマ波 ≒ 音素レベルの細かい特徴、デルタ波 約1–3Hz ≒ 句・文）は、音声の時間構造に位相を合わせて、連続音声を処理単位に「切り分ける」とされる（Giraud & Poeppel 2012）。Ding et al. (2016) は、音響的には4Hzの音節しかない刺激でも、**言語を理解できる人の脳だけが2Hz（句）と1Hz（文）のリズムを"自分で"作り出す**ことを示した。L2では、音節（シータ）レベルの追従は習熟度とあまり関係しない。習熟度とともに伸びるのは句・文レベル（デルタ）の追従と、新しい音素対比の符号化である。

### Cited Findings
**基礎理論**
- 聴覚皮質の内因性振動が音声のリズムに同期する。シータ帯（約4–8Hz）は音節（約150–300ms）の、低ガンマ帯（約25–35Hz前後）は音素的特徴（約30ms）のサンプリングに対応し、シータ–ガンマ結合が音声を処理単位に分節する、という計算論的枠組み [検証済（書誌）][強（理論）]。Giraud AL, Poeppel D (2012) "Cortical oscillations and speech processing: emerging computational principles and operations." *Nat Neurosci* 15(4):511–517 — [doi:10.1038/nn.3063](https://doi.org/10.1038/nn.3063)
- 音声の振幅変調スペクトルのピークは言語を問わずおよそ4–5Hz（≒音節の速さ）にある [要照合][強]。Ding N, Patel AD, Chen L, Butler H, Luo C, Poeppel D (2017) "Temporal modulations in speech and music." *Neurosci Biobehav Rev* 81:181–187 — [doi:10.1016/j.neubiorev.2017.02.011](https://doi.org/10.1016/j.neubiorev.2017.02.011)
- 聴覚皮質のシータ帯の位相パターンだけで、どの文を聞いていたかを判別できた（MEG）[要照合][中]。Luo H, Poeppel D (2007) "Phase patterns of neuronal responses reliably discriminate speech in human auditory cortex." *Neuron* 54(6):1001–1010 — [doi:10.1016/j.neuron.2007.06.004](https://doi.org/10.1016/j.neuron.2007.06.004)
- 音声への位相同期は、音声が**理解可能なとき**に強まる [要照合][中]。Peelle JE, Gross J, Davis MH (2013) "Phase-locked responses to speech in human auditory cortex are enhanced during comprehension." *Cereb Cortex* 23(6):1378–1387 — [doi:10.1093/cercor/bhs118](https://doi.org/10.1093/cercor/bhs118)
- 雑音下で、母語（英語）と理解できない言語（オランダ語）を比べた研究では、シータ帯の追従は音の明瞭さを、デルタ帯の追従は理解度を反映した [要照合][中]。Etard O, Reichenbach T (2019) "Neural speech tracking in the theta and in the delta frequency band differentially encode clarity and comprehension of speech in noise." *J Neurosci* 39(29):5750–5759 — [doi:10.1523/JNEUROSCI.1828-18.2019](https://doi.org/10.1523/JNEUROSCI.1828-18.2019)

**Ding et al. (2016)：動画の目玉候補**
- 合成した中国語音節を等間隔（4Hz）で並べ、2音節で句（2Hz）、4音節で文（1Hz）になる刺激を作った。音響的なエネルギーは4Hzにしかない。中国語母語話者のMEGでは4・2・1Hzすべてにピークが出たが、**中国語を理解しない英語話者では4Hz（音節）のピークだけ**だった。つまり句・文のリズムは耳ではなく、脳の言語知識が作り出している [検証済（書誌）／詳細は要照合][強]。Ding N, Melloni L, Zhang H, Tian X, Poeppel D (2016) "Cortical tracking of hierarchical linguistic structures in connected speech." *Nat Neurosci* 19(1):158–164 — [doi:10.1038/nn.4186](https://doi.org/10.1038/nn.4186)
- [論争] この句・文レベルの追従が統語構造そのものを反映するのか、語彙レベルの情報（単語の切れ目や意味のまとまり）で説明できるのかは議論が続いている [要照合]。Frank SL, Yang J (2018) "Lexical representation explains cortical entrainment during speech comprehension." *PLoS ONE* 13(5):e0197304 — [doi:10.1371/journal.pone.0197304](https://doi.org/10.1371/journal.pone.0197304)。Ding側は、規則に基づくチャンキングを反映すると反論している：Jin P, Lu Y, Ding N (2020) "Low-frequency neural activity reflects rule-based chunking during speech listening." *eLife* 9:e55613 — [doi:10.7554/eLife.55613](https://doi.org/10.7554/eLife.55613)

**カクテルパーティ（注意）と追従**
- 2人の話者が同時に話していても、聴覚皮質は**注意を向けた話者**の音声包絡を選択的に追従する（MEG）[要照合][強]。Ding N, Simon JZ (2012) "Emergence of neural encoding of auditory objects while listening to competing speakers." *PNAS* 109(29):11854–11859 — [doi:10.1073/pnas.1205381109](https://doi.org/10.1073/pnas.1205381109)
- ECoGでも、STGの活動から注意している話者の音声を再構成できた [要照合][強]。Mesgarani N, Chang EF (2012) "Selective cortical representation of attended speaker in multi-talker speech perception." *Nature* 485:233–236 — [doi:10.1038/nature11020](https://doi.org/10.1038/nature11020)

**L2の追従研究**
- **Lizarazu et al. (2021)**：スペイン語母語話者で第二言語のバスク語（※英語ではない）の習熟度が異なる3群をMEGで計測。L1（スペイン語）では音声–脳同期に群間差がなく、L2（バスク語）では同期の強さが習熟度と正に関係した。デルタ帯では下前頭皮質が聴覚皮質を句のまとまりに位相合わせする方向で調節し、シータ帯では中側頭領域が音節レベルで聴覚皮質と相互作用した。この2つのトップダウン経路がどちらもL2習熟度と関係した [検証済][中]。Lizarazu M, Carreiras M, Bourguignon M, Zarraga A, Molinaro N (2021) "Language proficiency entails tuning cortical activity to second language speech." *Cereb Cortex* 31(8):3820–3831 — [doi:10.1093/cercor/bhab051](https://academic.oup.com/cercor/article-abstract/31/8/3820/6206850); [PubMed 33791775](https://pubmed.ncbi.nlm.nih.gov/33791775/)
- 同グループの続報では、聴覚皮質のシータ–ガンマ位相振幅結合（PAC）も言語習熟度で変化した [検証済（書誌）][中]。Lizarazu M et al. (2023) "Theta-gamma phase-amplitude coupling in auditory cortex is modulated by language proficiency." *Hum Brain Mapp* — [doi:10.1002/hbm.26250](https://onlinelibrary.wiley.com/doi/full/10.1002/hbm.26250)
- **Blanco-Elorrieta et al. (2020)**：中国語–英語バイリンガル51名を、周波数タギング＋MEGで、習熟度の幅を持たせて計測。物理的な音声リズム（音節）の追従は雑音の影響を受けたが**習熟度の影響は受けなかった**。言語構造（句・文）の追従は、雑音と知識の**交互作用**を示した。L2が雑音下で崩れる一因は、「音節より上のレベルへの皮質同期」という低次で自動的な処理の失敗にある、と結論 [検証済][中]。Blanco-Elorrieta E, Ding N, Pylkkänen L, Poeppel D (2020) "Understanding requires tracking: Noise and knowledge interact in bilingual comprehension." *J Cogn Neurosci* 32(10):1975–1983 — [doi:10.1162/jocn_a_01610](https://estiblancoelorrieta.github.io/BlancoElorrieta_etal_2020.pdf); [bioRxiv preprint](https://www.biorxiv.org/content/10.1101/609628.full.pdf)
- **Reetzke et al. (2021)**：英語の物語の包絡追従と、非音声への聴覚誘発電位を、英語母語話者と非母語話者で同時に計測。注意は全員の追従を高めたが、追従の増強は**理解度の向上と必ずしも結びつかず**、特に非母語話者でそうだった [検証済][中]。Reetzke R, Gnanateja GN, Chandrasekaran B (2021) "Neural tracking of the speech envelope is differentially modulated by attention and language experience." *Brain Lang* 213:104891 — [doi:10.1016/j.bandl.2020.104891](https://www.sciencedirect.com/science/article/abs/pii/S0093934X20301504)（非母語話者群の母語は今回確認できず）
- **Di Liberto et al. (2021)**：英語の習熟度がさまざまな中国語母語話者と、英語母語話者が英語の物語を聞くときのEEGを、TRF（時間応答関数）で音響・音素・音素配列・意味の各レベルに分けて解析。習熟度は言語的符号化に主効果を持ち、最も強かったのは**音素レベル**だった。特に中国語にない「新しい」英語の音素対比の符号化が習熟度とともに強まり、上級者ほど母語話者に近い表象を示した。脳波から習熟度を推定（デコード）することもできた [検証済][中]。Di Liberto GM, Nie J, Yeaton J, Khalighinejad B, Shamma SA, Mesgarani N (2021) "Neural representation of linguistic feature hierarchy reflects second-language proficiency." *NeuroImage* 227:117586 — [doi:10.1016/j.neuroimage.2020.117586](https://jeremyyeaton.github.io/publication/di-liberto-2021-l-2/)（巻号は222と227の表記揺れあり。227が一般的）
- **Lu et al. (2023)**：周波数タギングEEGでL1・L2聞き手の音節・句・文の追従を比較。L2聞き手では**文レベル（1Hz）の追従が完全に崩れていた** [検証済][中]。Lu L, Deng Y, Xiao Z, Jiang R, Gao JH (2023) "Neural signatures of hierarchical linguistic structures in second language listening comprehension." *eNeuro* 10(6):ENEURO.0346-22.2023 — [doi:10.1523/ENEURO.0346-22.2023](https://www.eneuro.org/content/10/6/ENEURO.0346-22.2023)
- **Tezcan et al. (2026)**：音素レベルの神経追従は、単語リストより文で、ランダム音節より実在語で強まった。理解できない言語では、その言語に**事前に触れた経験がある人だけ**音素符号化が母語に近いレベルになった（理解できなくても接触経験が音素表象を鋭くする）[検証済][中]。Tezcan F, ten Oever S, Bai F, te Rietmolen N, Martin AE (2026) "Linguistic structure and language familiarity sharpen phoneme encoding in the brain." *Commun Biol* 9:638 — [doi:10.1038/s42003-026-09865-8](https://www.nature.com/articles/s42003-026-09865-8)
- 韓国人英語学習者などを対象に、聴取努力（リスニングエフォート）が非母語話者の聴覚・語彙処理を高めることを示した研究 [要照合][中]。Song J, Iverson P (2018) "Listening effort during speech perception enhances auditory and lexical processing for non-native listeners and accents." *Cognition* 179:163–170 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Song+Iverson+2018+Listening+effort+during+speech+perception+enhances+auditory+and+lexical+processing+non-native)
- 意味的な予想外れに対するN400様のTRF応答は、音声を理解しているときにだけ現れ、逆再生音声や注意を向けていない音声では消えた [要照合][中]。Broderick MP, Anderson AJ, Di Liberto GM, Crosse MJ, Lalor EC (2018) "Electrophysiological correlates of semantic dissimilarity reflect the comprehension of natural, narrative speech." *Curr Biol* 28(5):803–809 — [doi:10.1016/j.cub.2018.01.080](https://doi.org/10.1016/j.cub.2018.01.080)

### Inferences
- 「脳波が音声に"ノる"」は動画映えする。ポイントは、**音節のリズム（4Hz前後）には誰の脳でもノる。句・文のリズム（1–2Hz）には言語がわかる脳だけがノる**こと（Ding 2016）。L2学習者はこの「大きいリズム」が弱く（Lu 2023、Lizarazu 2021）、雑音でさらに崩れる（Blanco-Elorrieta 2020）。
- 「音節レベルの追従＝聞こえている」と考えるのは誤り。Reetzke 2021、Blanco-Elorrieta 2020が示すように、音響的な追従は理解の指標として不十分で、理解を反映するのは句・文レベルや言語特徴レベルの符号化。
- 英語は強勢拍リズム、日本語はモーラ拍リズムと言われる。日本人がデルタ帯（句・強勢単位）で英語に同期しにくい可能性は理論的に考えられるが、直接示したデータは今回見つからなかった（Gaps）。

### Gaps
- **日本語母語話者が英語を聞く際の皮質追従（EEG/MEG）研究**は今回特定できなかった。最も近いのは中国語母語話者の研究（Di Liberto 2021、Blanco-Elorrieta 2020、Lu 2023）。
- Reetzke 2021の非母語話者群の母語と、L2群の追従が母語話者より強かったか弱かったかは、原文で要確認。
- 追従が本当に「内因性振動の同期（entrainment）」なのか、誘発応答の積み重ねなのかについて方法論的論争があるが、本セッションでは総説を取得していない。

---

## Q4. ミスマッチ陰性電位（MMN）の証拠：母語音素の記憶痕跡と、L2学習で新しい音素表象ができる証拠

### Takeaway
MMNは、繰り返される音の中に違う音が混じると、注意を向けていなくても自動的に出る脳反応（約100–250ms）。Näätänen et al. (1997, *Nature*) は、MMNが母語の音素カテゴリーで増強されることを示し、「母語音素の記憶痕跡」の証拠とした。この痕跡は生後1年で形成され（Cheour 1998）、成人でもL2への浸漬や訓練で新しい痕跡ができる（Winkler 1999、Tremblay 1997、Menning 2002、Zhang 2009）。日本人の/r/–/l/では、訓練後に左半球のMMFが大きくなり、処理が効率化した（Zhang 2009）。

### Cited Findings
- MMNの基礎（自動的な変化検出、前注意的、聴覚皮質起源）の総説 [要照合][強]。Näätänen R, Paavilainen P, Rinne T, Alho K (2007) "The mismatch negativity (MMN) in basic research of central auditory processing: a review." *Clin Neurophysiol* 118(12):2544–2590 — [doi:10.1016/j.clinph.2007.04.026](https://doi.org/10.1016/j.clinph.2007.04.026)
- **Näätänen et al. (1997)**：フィンランド語話者とエストニア語話者で、母音/õ/（エストニア語にはあるがフィンランド語にはない）を含む系列を比較。音響的な差が大きいにもかかわらず、フィンランド人では非母語の/õ/に対するMMNが母語の母音（プロトタイプ/ö/）より小さかった。エストニア人では/õ/でも大きなMMNが出た。MEGでは、言語特異的な効果が左聴覚皮質に局在した [要照合][強]。Näätänen R, Lehtokoski A, Lennes M, Cheour M, Huotilainen M, Iivonen A, Vainio M, Alku P, Ilmoniemi RJ, Luuk A, Allik J, Sinkkonen J, Alho K (1997) "Language-specific phoneme representations revealed by electric and magnetic brain responses." *Nature* 385:432–434 — [doi:10.1038/385432a0](https://doi.org/10.1038/385432a0)
- 同じフィンランド語/エストニア語の母音で、乳児では生後6か月から12か月にかけて言語特異的なMMNが発達した（母語の音素記憶痕跡は生後1年以内にできる）[要照合][強]。Cheour M, Ceponiene R, Lehtokoski A, Luuk A, Allik J, Alho K, Näätänen R (1998) "Development of language-specific phoneme representations in the infant brain." *Nat Neurosci* 1(5):351–353 — [doi:10.1038/1561](https://doi.org/10.1038/1561)
- **Winkler et al. (1999)**：フィンランド語の/e/–/æ/対比（ハンガリー語にはない）に対し、フィンランドに住みフィンランド語が流暢なハンガリー人はフィンランド人と同様のMMNを示した。フィンランド語を知らないハンガリー人では示さなかった。成人のL2浸漬で新しい音素痕跡ができる証拠 [要照合][中]。Winkler I, Kujala T, Tiitinen H, Sivonen P, Alku P, Lehtokoski A, Czigler I, Csépe V, Ilmoniemi RJ, Näätänen R (1999) "Brain responses reveal the learning of foreign language phonemes." *Psychophysiology* 36(5):638–642 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Winkler+1999+Brain+responses+reveal+the+learning+of+foreign+language+phonemes)
- 微細な/da/–/ga/変異音の弁別訓練で、MMNが訓練後に出現・増大した [要照合][中]。Kraus N, McGee T, Carrell TD, King C, Tremblay K, Nicol T (1995) "Central auditory system plasticity associated with speech discrimination training." *J Cogn Neurosci* 7(1):25–32 — [doi:10.1162/jocn.1995.7.1.25](https://doi.org/10.1162/jocn.1995.7.1.25)
- **Tremblay et al. (1997)**：英語話者に、英語にない有声性（プリボイシング、VOTの違い）の唇音対比を訓練した。訓練後にMMNが変化し、その効果は訓練していない歯茎音の対比にも汎化した [要照合][中]。Tremblay K, Kraus N, Carrell TD, McGee T (1997) "Central auditory system plasticity: generalization to novel stimuli following listening training." *J Acoust Soc Am* 102(6):3762–3773 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Tremblay+Kraus+1997+Central+auditory+system+plasticity+generalization)
- 訓練中の神経生理学的変化（MMN）が、行動上の改善より**先に**現れたという報告。「脳は本人が気づく前に変わり始める」というストーリーの根拠 [要照合][中]。Tremblay K, Kraus N, McGee T (1998) "The time course of auditory perceptual learning: neurophysiological changes during speech-sound training." *NeuroReport* 9(16):3557–3560 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Tremblay+1998+time+course+auditory+perceptual+learning+NeuroReport)
- **Menning, Imaizumi et al. (2002)**：対象は「日本人学習者」ではなく、**ドイツ語話者が日本語のモーラ長（母音・子音の長短）の対比を学習**した研究。弁別訓練でMMNm（MEG）が増大し、訓練終了から数週間後も保たれた [要照合][中]。Menning H, Imaizumi S, Zwitserlood P, Pantev C (2002) "Plasticity of the human auditory cortex induced by discrimination learning of non-native, mora-timed contrasts of the Japanese language." *Learn Mem* 9(5):253–267 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Menning+Imaizumi+2002+mora-timed+contrasts)
- **Zhang et al. (2009)：日本人成人の/r/–/l/訓練（MEG）**。12セッションの訓練で、合成/r/–/l/連続体の識別は母語話者並みの範疇境界には届かなかったが改善し、新しい刺激にも転移した。訓練前後の比較では**左半球MMFの/r/–/l/感受性が高まり**、刺激符号化に関わる下頭頂領域の等価電流双極子（ECD）のクラスター数と持続時間が両側で減少した。感度と効率の向上を示す [検証済][中]。Zhang Y, Kuhl PK, Imada T, Iverson P, Pruitt J, Stevens EB, Kawakatsu M, Tohkura Y, Nemoto I (2009) "Neural signatures of phonetic learning in adulthood: A magnetoencephalography study." *NeuroImage* 46(1):226–240 — [doi:10.1016/j.neuroimage.2009.01.028](https://www.sciencedirect.com/science/article/abs/pii/S1053811909000731)
- フィンランド人英語学習者は、英語の母音対比を（スペクトルより）長さの手がかりで判断しがちだった。訓練で手がかりの重み付けが変わり、MMNにも変化が出た。日本人がF3よりF2を重視する問題（Iverson 2003）と同じ「手がかり重み付け」の問題 [要照合][中]。Ylinen S, Uther M, Latvala A, Vepsäläinen S, Iverson P, Akahane-Yamada R, Näätänen R (2010) "Training the brain to weight speech cues differently: a study of Finnish second-language users of English." *J Cogn Neurosci* 22(6):1319–1332 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Ylinen+2010+Training+the+brain+to+weight+speech+cues+differently)
- [注意] MMNは集団平均では頑健だが、個人レベルでの信頼性は低い（臨床・個人診断での利用には限界がある）[要照合]。Bishop DVM (2007) "Using mismatch negativity to study central auditory processing in developmental language and literacy impairments: where are we, and where should we be going?" *Psychol Bull* 133(4):651–672 — [doi:10.1037/0033-2909.133.4.651](https://doi.org/10.1037/0033-2909.133.4.651)

### Inferences
- 動画用の比喩：MMNは「脳の自動間違い探しセンサー」。母語の音素には反応が鋭く、カテゴリーにない音には鈍い（Näätänen 1997）。日本人が/r/と/l/の違いに「気づかない」のは、注意不足ではなく、このセンサーの段階で区別が弱いから（Zhang 2005）。訓練でセンサーは鋭くなる（Zhang 2009）。
- 「上達＝脳が省エネになる」ストーリー：訓練前の日本人は/r/–/l/を広い範囲で長く処理していた（Zhang 2005）。訓練後はその範囲と時間が縮み、MMFは強まった（Zhang 2009）。

### Gaps
- 依頼文の「Menning, Imaizumi et al. on Japanese learners」は、実際には「日本語を学ぶドイツ語話者」の研究。日本語母語話者が英語音素を訓練してMMNが変化した研究としてはZhang et al. (2009) が最も直接的。
- Winkler 1999、Tremblay 1997/1998、Menning 2002の正確な効果量・セッション数は原文未確認。

---

## Q5. L2知覚訓練と習熟に伴う脳の変化：Callan et al. (2003)、Golestani/Zatorre の個人差研究、Wong et al. (2008) ほか

### Takeaway
日本人の/r/–/l/訓練（高変動音声訓練HVPT）では、聴覚野だけでなく構音・運動系の活動が変化する（Callan 2003）。ヘシュル回の白質量・体積が大きい人ほど新しい音の学習が速いという「脳の個人差」もある（Golestani 2002/2007、Wong 2008）。習熟が進むと、音素符号化が母語話者に近づき（Di Liberto 2021）、単語境界の符号化が現れ（Bhaya-Grossman 2025）、灰白質・白質の構造も変わる（Hosoda 2013、日本人）。

### Cited Findings
**日本人の/r/–/l/訓練（行動）：高変動音声訓練（HVPT）**
- 複数話者・複数音環境の自然音声で/r/–/l/の識別訓練をすると、成績が上がり、新しい話者・単語にも汎化した（HVPTの原点）[要照合][強]。Logan JS, Lively SE, Pisoni DB (1991) "Training Japanese listeners to identify English /r/ and /l/: A first report." *J Acoust Soc Am* 89(2):874–886 — [doi:10.1121/1.1894649](https://doi.org/10.1121/1.1894649)
- 知覚訓練だけで**発音（産出）も改善**した [要照合][強]。Bradlow AR, Pisoni DB, Akahane-Yamada R, Tohkura Y (1997) "Training Japanese listeners to identify English /r/ and /l/: IV. Some effects of perceptual learning on speech production." *J Acoust Soc Am* 101(4):2299–2310 — [doi:10.1121/1.418276](https://doi.org/10.1121/1.418276)
- 訓練効果は知覚・産出とも長期間（追跡調査で数か月後）保持された [検証済（書誌）]。Bradlow AR, Akahane-Yamada R, Pisoni DB, Tohkura Y (1999) "Training Japanese listeners to identify English /r/ and /l/: Long-term retention of learning in perception and production." *Percept Psychophys* 61(5):977–985 — [Springer](https://link.springer.com/article/10.3758/BF03206911)
- F3開始周波数を手がかりにした訓練（非音声→合成音声）では、改善したのは一部の日本人だけだった。F3手がかりの習得は難しい [検証済（書誌）][中]。Ingvalson EM, Holt LL, McClelland JL (2012) "Can native Japanese listeners learn to differentiate /r–l/ on the basis of F3 onset frequency?" *Bilingualism: Language and Cognition* — [Cambridge](https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/abs/can-native-japanese-listeners-learn-to-differentiate-rl-on-the-basis-of-f3-onset-frequency/E56CBC2AD9112D57757971572B69A03C)
- 明示的な指示なしでもビデオゲーム内の課題で/r/–/l/の範疇化が改善した（日本人）[要照合][中]。Lim SJ, Holt LL (2011) "Learning foreign sounds in an alien world: Videogame training improves non-native speech categorization." *Cogn Sci* 35(7):1390–1405 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Lim+Holt+2011+Learning+foreign+sounds+in+an+alien+world+videogame)

**訓練による脳活動の変化**
- **Callan et al. (2003)**：日本人成人の/r/–/l/識別訓練の前後でfMRIを撮った研究。書誌は確認済 [検証済（書誌）]。Callan DE, Tajima K, Callan AM, Kubo R, Masaki S, Akahane-Yamada R (2003) "Learning-induced neural plasticity associated with improved identification performance after training of a difficult second-language phonetic contrast." *NeuroImage* 19(1):113–124 — [書誌を引用する文献（Cambridge, SLM-r章）](https://www.cambridge.org/core/books/abs/second-language-speech-learning/revised-speech-learning-model-slmr-applied/C10B87921D819D8A43665F85734D3ED7)。主要知見として、識別成績の向上に伴い、聴覚領域（STG/STS）に加えて**ブローカ野・運動前野・縁上回・小脳**など構音・聴覚内部モデルに関わる領域の活動が増えたとされる [要照合：本セッションでは抄録を取得できず]。
- Zhang et al. (2009)：日本人の/r/–/l/訓練後に、左半球MMFの感受性が上がり、処理の持続時間・範囲が減った（効率化）[検証済] — Q4参照 [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1053811909000731)

**学習の速さを予測する脳の個人差**
- ヒンディー語の歯音–そり舌音などの新しい音声対比を速く学んだ人は、左ヘシュル回の白質密度・体積が大きかった [要照合][中]。Golestani N, Paus T, Zatorre RJ (2002) "Anatomical correlates of learning novel speech sounds." *Neuron* 35(5):997–1010 — [doi:10.1016/S0896-6273(02)00862-0](https://doi.org/10.1016/S0896-6273(02)00862-0)
- 新しい音を速く学ぶ人は、左ヘシュル回と頭頂葉の白質量が大きかった（MRI形態計測）[要照合][中]。Golestani N, Molko N, Dehaene S, LeBihan D, Pallier C (2007) "Brain structure predicts the learning of foreign speech sounds." *Cereb Cortex* 17(3):575–582 — [doi:10.1093/cercor/bhk001](https://doi.org/10.1093/cercor/bhk001)
- 中国語風の声調（ピッチ）を持つ疑似単語の学習に成功した英語話者は、左ヘシュル回の体積が大きかった [要照合][中]。Wong PCM, Warrier CM, Penhune VB, Roy AK, Sadehh A, Parrish TB, Zatorre RJ (2008) "Volume of left Heschl's gyrus and linguistic pitch learning." *Cereb Cortex* 18(4):828–836 — [doi:10.1093/cercor/bhm115](https://doi.org/10.1093/cercor/bhm115)
- 音声学者（プロのphonetician）では左横側頭回の重複（ヘシュル回が2本ある形）が多かった。これは訓練年数と関係せず生得的素因を示唆する一方、ブローカ野弁蓋部の形態は訓練年数と関係した [要照合][中]。Golestani N, Price CJ, Scott SK (2011) "Born with an ear for dialects? Structural plasticity in the expert phonetician brain." *J Neurosci* 31(11):4213–4220 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Golestani+Price+Scott+2011+Born+with+an+ear+for+dialects)
- 日本人（英国在住）では、脳幹FFRの位相一貫性が英語子音知覚を、渡英年齢・滞在期間以上によく予測した [検証済] — Q1参照 [Birkbeck](https://eprints.bbk.ac.uk/id/eprint/19245/)

**習熟・学習に伴う脳の変化（構造・機能）**
- **日本人対象**：英語経験の少ない日本語母語話者が16週間の英単語学習を行った。右下前頭回（弁蓋部）の灰白質・白質密度が増え、増加量は習熟度の伸びと相関した。右下縦束のFA（拡散MRIの指標）の増加や、右下前頭回–尾状核の構造的結合の増加も報告されている [検証済（書誌）／知見は二次資料経由][中]。Hosoda C, Tanaka K, Nariai T, Honda M, Hanakawa T (2013) "Dynamic neural network reorganization associated with second language vocabulary acquisition: A multimodal imaging study." *J Neurosci* 33(34):13663–13672 — [doi:10.1523/JNEUROSCI.0410-13.2013](https://doi.org/10.1523/JNEUROSCI.0410-13.2013)
- **日本人対象**：日本人中学生（双子）が2か月間の英語動詞の集中授業を受けると、左下前頭回（文法処理）の活動変化が成績の向上と相関した [要照合][中]。Sakai KL, Miura K, Narafu N, Muraishi Y (2004) "Correlated functional changes of the prefrontal cortex in twins induced by classroom education of second language." *Cereb Cortex* 14(11):1233–1239 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Sakai+Miura+Narafu+Muraishi+2004+twins+classroom+education+second+language)
- **日本人対象**：日本人英語学習者の左前頭前野の言語関連活動は、年齢・習熟度・課題負荷によって異なる方向に変化した。習熟が進むと活動が「節約的」になる方向の結果を含む [要照合][中]。Tatsuno Y, Sakai KL (2005) "Language-related activations in the left prefrontal regions are differentially modulated by age, proficiency, and task demands." *J Neurosci* 25(7):1637–1644 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Tatsuno+Sakai+2005+Language-related+activations+left+prefrontal+age+proficiency+task+demands)
- スウェーデンの軍の通訳訓練生が3か月間の集中的な外国語学習を受けると、海馬の体積と、左上側頭回などの皮質厚が増えた（対照群では増えなかった）[要照合][中]。Mårtensson J, Eriksson J, Bodammer NC, Lindgren M, Johansson M, Nyberg L, Lövdén M (2012) "Growth of language-related brain areas after foreign language learning." *NeuroImage* 63(1):240–244 — [doi:10.1016/j.neuroimage.2012.06.043](https://doi.org/10.1016/j.neuroimage.2012.06.043)
- 成人の第二言語（ドイツ語）学習の数か月間に、半球内・半球間の白質結合が変化した（縦断拡散MRI）[検証済（書誌）][中]。Wei X et al. (2024) "White matter plasticity during second language learning within and across hemispheres." *PNAS* 121 — [doi:10.1073/pnas.2306286121](https://www.pnas.org/doi/10.1073/pnas.2306286121)（著者リストは要確認）
- L2の脳内表現では、習得年齢よりも**習熟度**のほうが大きく効く（高習熟者はL1とL2で類似の活性化）[要照合][中]。Perani D, Paulesu E, Galles NS, Dupoux E, Dehaene S, Bettinardi V, Cappa SF, Fazio F, Mehler J (1998) "The bilingual brain. Proficiency and age of acquisition of the second language." *Brain* 121(10):1841–1852 — [doi:10.1093/brain/121.10.1841](https://doi.org/10.1093/brain/121.10.1841)
- バイリンガルでは左下頭頂皮質の灰白質密度が高く、習得が早いほど・習熟度が高いほど高かった [要照合][中]。Mechelli A, Crinion JT, Noppeney U, O'Doherty J, Ashburner J, Frackowiak RS, Price CJ (2004) "Structural plasticity in the bilingual brain." *Nature* 431:757 — [doi:10.1038/431757a](https://doi.org/10.1038/431757a)
- 英語習熟度が上がるほど、中国語母語話者の脳は英語の新しい音素対比を強く符号化し、全体として母語話者に近い言語特徴表象になる [検証済] — Q3参照 [Di Liberto 2021](https://jeremyyeaton.github.io/publication/di-liberto-2021-l-2/)
- 単語境界・単語頻度・音の並びの統計の符号化は「知っている言語」でだけ強まる（バイリンガルで検証）[検証済] — Q1参照 [Bhaya-Grossman 2025](https://www.nature.com/articles/s41586-025-09748-8)
- 乳児期の音声学習は、ビデオ・音声だけより**生身の人との対面**で起きやすい（米国乳児が中国語の音素を対面で学習）[要照合][中]。Kuhl PK, Tsao FM, Liu HM (2003) "Foreign-language experience in infancy: effects of short-term exposure and social interaction on phonetic learning." *PNAS* 100(15):9096–9101 — [doi:10.1073/pnas.1532872100](https://doi.org/10.1073/pnas.1532872100)

### Inferences
- 動画のストーリー：「①最初は脳が"英語用の音のフォルダ"を持っていない（Näätänen/Zhang 2005）→ ②訓練で聴覚野と口の運動系がつながり直す（Callan 2003）→ ③処理が省エネになる（Zhang 2009）→ ④上達すると音素の符号化が母語話者に近づき（Di Liberto 2021）、単語の切れ目を脳が自動検出するようになる（Bhaya-Grossman 2025）→ ⑤脳の構造も変わる（Hosoda 2013は日本人で16週間）」。
- 個人差（Golestani、Wong）は「才能」の話になりやすいが、効果の大きさは中程度で、訓練による改善はほぼ全員に見られる（HVPT研究）。「脳の形で決まる」と言い切るのは誤り。

### Gaps
- Callan et al. (2003) の具体的な賦活部位と訓練期間（約1か月とされる）は原文で要確認。
- Tatsuno & Sakai (2005) の年齢群・習熟度ごとの具体的な増減パターンは要確認。
- 日本人の「英語リスニング（文・談話レベル）」の上達を縦断的に脳計測した研究は今回見つけられなかった（Hosoda 2013は語彙、Zhang 2009とCallan 2003は音素）。
- Wei et al. (2024) の著者・対象者の詳細は要確認。

---

## Q6. 予測符号化：脳は次の音・単語を予測している（Sohoglu & Davis、DeLong 2005とその再現論争）、劣化音声の「ポップアウト」効果（動画デモ案）

### Takeaway
脳は入力を待つだけでなく、文脈や事前知識から次に来る音を予測する。上側頭回では「予測と実際の入力のズレ（予測誤差）」が処理されている（Sohoglu & Davis 2016）。ノイズボコード音声や正弦波音声は最初は意味不明でも、内容を一度知ると突然はっきり聞こえる（ポップアウト）。これは「聞こえ」が耳の入力と脳の予測の合作であることを示す、最も強力なデモ。一方、「冠詞a/anから次の名詞を予測している」とするDeLong et al. (2005) の冠詞効果は、大規模追試で再現されなかった。

### Cited Findings
**劣化音声とポップアウト**
- ノイズボコード音声：音声を少数の周波数帯の振幅包絡だけで作り直したもの（人工内耳のシミュレーション）。スペクトル情報をほとんど除いても、時間的手がかりだけで高い認識が可能 [要照合][強]。Shannon RV, Zeng FG, Kamath V, Wygonski J, Ekelid M (1995) "Speech recognition with primarily temporal cues." *Science* 270(5234):303–304 — [doi:10.1126/science.270.5234.303](https://doi.org/10.1126/science.270.5234.303)
- 正弦波音声：フォルマントの動きを3本の純音（口笛のような音）に置き換えたもの。事前に知らされない聞き手は「SFの効果音」「口笛」などと答えたが、音声だと教えられると多くが文を書き取れた [要照合][強]。Remez RE, Rubin PE, Pisoni DB, Carrell TD (1981) "Speech perception without traditional speech cues." *Science* 212(4497):947–949 — [doi:10.1126/science.7233191](https://doi.org/10.1126/science.7233191)
- 同じ正弦波音声でも「音声として聞くモード」に切り替わると、左後部側頭領域（STS付近）の活動が増える（fMRI）[要照合][中]。Dehaene-Lambertz G, Pallier C, Serniclaes W, Sprenger-Charolles L, Jobert A, Dehaene S (2005) "Neural correlates of switching from auditory to speech perception." *NeuroImage* 24(1):21–33 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Dehaene-Lambertz+2005+Neural+correlates+of+switching+from+auditory+to+speech+perception)
- ノイズボコード文の知覚学習：聞き手は数十文程度で急速に上達した。学習を駆動するのは**語彙（単語）情報**で、無意味語の文では学習が劣った。明瞭な音声を先に聞くと劣化音声が急にわかる「ポップアウト」現象も記述されている [要照合][強]。Davis MH, Johnsrude IS, Hervais-Adelman A, Taylor K, McGettigan C (2005) "Lexical information drives perceptual learning of distorted speech: evidence from the comprehension of noise-vocoded sentences." *J Exp Psychol Gen* 134(2):222–241 — [doi:10.1037/0096-3445.134.2.222](https://doi.org/10.1037/0096-3445.134.2.222)
- 劣化音声の直前に一致する文字（テキスト）を見せると、主観的な明瞭さが上がり、STGの活動は**減少**した（予測が当たると誤差信号が減る）。下前頭回の活動がSTGに先行し、トップダウンの予測を示唆した（MEG/EEG）[要照合][中]。Sohoglu E, Peelle JE, Carlyon RP, Davis MH (2012) "Predictive top-down integration of prior knowledge during speech perception." *J Neurosci* 32(25):8443–8453 — [doi:10.1523/JNEUROSCI.5069-11.2012](https://doi.org/10.1523/JNEUROSCI.5069-11.2012)
- 事前知識（文字）と知覚学習は、どちらも上側頭回の応答を減らした。この結果は「予測誤差を最小化する」予測符号化モデルでよく説明できた [要照合][中]。Sohoglu E, Davis MH (2016) "Perceptual learning of degraded speech by minimizing prediction error." *PNAS* 113(12):E1747–E1756 — [doi:10.1073/pnas.1523266113](https://doi.org/10.1073/pnas.1523266113)
- てんかん患者の皮質脳波（ECoG）で、劣化音声を明瞭版の前後に聞かせた。明瞭版を聞いた後は、聴覚皮質の神経細胞群の分光時間的な受容野が、音声に重要な特徴へ急速にシフトした [要照合][中]。Holdgraf CR, de Heer W, Pasley B, Rieger J, Crone N, Lin JJ, Knight RT, Theunissen FE (2016) "Rapid tuning shifts in human auditory cortex enhance speech intelligibility." *Nat Commun* 7:13654 — [doi:10.1038/ncomms13654](https://doi.org/10.1038/ncomms13654)

**単語予測とN400：DeLong 2005と再現論争**
- DeLong et al. (2005)："The day was breezy so the boy went outside to fly **a kite** / **an airplane**" のような文で、予測されにくい冠詞（an）でN400が大きくなった。これを、名詞の音韻形式まで先読みしている証拠とした [要照合]。DeLong KA, Urbach TP, Kutas M (2005) "Probabilistic word pre-activation during language comprehension inferred from electrical brain activity." *Nat Neurosci* 8(8):1117–1121 — [doi:10.1038/nn1504](https://doi.org/10.1038/nn1504)
- [論争・再現失敗] 9つの研究室・計334名による事前登録の大規模追試では、名詞のN400予測可能性効果は再現されたが、**冠詞の効果は再現されなかった** [要照合][強]。Nieuwland MS, Politzer-Ahles S, Heyselaar E, et al. (2018) "Large-scale replication study reveals a limit on probabilistic prediction in language comprehension." *eLife* 7:e33468 — [doi:10.7554/eLife.33468](https://doi.org/10.7554/eLife.33468)
- L2の予測：L2話者は母語話者より予測が遅い・弱い傾向が報告されているが、課題・習熟度・処理資源に依存し、「L2話者は予測しない」とは言えない（総説）[要照合][中]。Kaan E (2014) "Predictive sentence processing in L2 and L1: What is different?" *Linguistic Approaches to Bilingualism* 4(2):257–282 — [doi:10.1075/lab.4.2.05kaa](https://doi.org/10.1075/lab.4.2.05kaa)。L2読者で冠詞ベースのN400予測効果が見られなかったという研究（Martin CD et al. 2013, *J Mem Lang* 69(4):574–588, [doi:10.1016/j.jml.2013.08.001](https://doi.org/10.1016/j.jml.2013.08.001)）もあるが、同じ冠詞パラダイム自体の頑健性がNieuwland 2018で疑われているため、解釈には慎重さが必要。

**字幕と予測（L2応用）**
- オランダ人が聞き慣れないスコットランド英語・オーストラリア英語に適応する実験で、**英語字幕は適応を助け、オランダ語（母語）字幕はむしろ妨げた** [要照合][中]。Mitterer H, McQueen JM (2009) "Foreign subtitles help but native-language subtitles harm foreign speech perception." *PLoS ONE* 4(11):e7785 — [doi:10.1371/journal.pone.0007785](https://doi.org/10.1371/journal.pone.0007785)

### Inferences
- **動画デモ案（強く推奨）**：①ノイズボコード（または正弦波）化した英文を流す（ほぼ聞き取れない）→ ②テロップで正解の英文を見せる、または原音を流す → ③同じ劣化音声をもう一度流す → 「さっきと同じ音なのに、聞こえる！」。物理的な入力は同じで、変わったのは脳の予測だけ（Sohoglu 2012/2016、Davis 2005、Holdgraf 2016）。英語学習への橋渡しとしては、「英語が聞こえない」状態の一部は、脳に正しい予測（単語・音の型）がないこと。スクリプトで確認してから聞き直すと聞こえるのは、このポップアウトと同じ仕組み。
- 正弦波音声は Remez 1981 のSF音の逸話とセットで紹介するとわかりやすい。
- 字幕の使い方：Mitterer & McQueen 2009 から「英語音声＋英語字幕」は音と単語の対応づけを助けると推測できる。ただし同研究は「訛りへの適応」であり、初級者の一般的なリスニング力向上を直接示したものではない点に注意。
- DeLong 2005を「脳は冠詞から名詞を予測している」として紹介するのは避ける（再現失敗）。「脳は文脈から単語を予測しており、予測しやすい単語ほどN400が小さい」（名詞の効果）なら頑健。

### Gaps
- デモ音源：MRC CBUのMatt Davisのページ（正弦波音声・ノイズボコード音声のデモ）が定番と記憶しているが、本セッションではURLを確認できていない。自作する場合は Praat スクリプトや vocoder ツールが使える（ライセンス・URLは要確認）。
- 日本人英語学習者を対象にしたポップアウト／知覚学習のfMRI・MEG研究は今回見つけられなかった。

---

## Q7. 音素修復（Warren 1970）とマガーク効果（McGurk & MacDonald 1976）：「聞こえ」は脳が構成している証拠と、L2への示唆（口の動きはL2リスニングを助ける）

### Takeaway
単語の一部の音を咳で置き換えても、人は欠けた音を「聞いて」しまう（音素修復）。2016年のECoG研究では、STGがリアルタイムで欠けた音素を「補完」している様子が捉えられた。視覚の口の動きも聞こえを変える（マガーク効果）。日本人は日本語の音声ではマガーク効果が弱いが、**外国語音声では視覚の影響が強まる**。視覚手がかりはL2の音素弁別を助ける（Navarra & Soto-Faraco 2007、Hardison 2003）。ただしマガーク効果は個人差・刺激差が大きく、日常の視聴覚統合の指標としては限界も指摘されている。

### Cited Findings
**音素修復**
- 文中の"legislatures"の最初の/s/を咳の音で置き換えても、ほとんどの聞き手は音が欠けていることに気づかず、咳がどこにあったかも正確に言えなかった [要照合][強]。Warren RM (1970) "Perceptual restoration of missing speech sounds." *Science* 167(3917):392–393 — [doi:10.1126/science.167.3917.392](https://doi.org/10.1126/science.167.3917.392)
- 日本語で読める解説：「音素修復：脳が欠けた音声を作り出す」[要照合]。Kashino M (2006) "Phonemic restoration: The brain creates missing speech sounds." *Acoust Sci Tech* 27(6):318–321 — [doi:10.1250/ast.27.318](https://doi.org/10.1250/ast.27.318)
- 欠けた音素をノイズで置き換えた単語（例："fa#ter" → faster / factor）を聞かせると、ヒトSTGの神経活動は、聞き手が知覚した方の音素をリアルタイムで表現した。ノイズの到来**前**の前頭部の活動から、どちらに聞こえるかを予測できた [要照合][中]。Leonard MK, Baud MO, Sjerps MJ, Chang EF (2016) "Perceptual restoration of masked speech in human cortex." *Nat Commun* 7:13619 — [doi:10.1038/ncomms13619](https://doi.org/10.1038/ncomms13619)
- **日本人対象（L2と修復）**：局所時間反転音声（数十msごとに音声を逆再生したもの）の明瞭度は、6段階の歪みにわたって英語母語話者と非母語話者でほぼ同程度だった [検証済][中]。Ishida M, Arai T, Kashino M (2018) "Perceptual restoration of temporally distorted speech in L1 vs. L2: Local time reversal and modulation filtering." *Front Psychol* 9:1749 — [doi:10.3389/fpsyg.2018.01749](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.01749/full)
- **日本人対象**：日本人が英語単語（L2）を聞く場合と日本語（L1）を聞く場合を比較した。音素タイプ（摩擦音か破裂音か）は、L1では局所時間反転音声の明瞭度に有意に影響したが、L2では影響しなかった。著者の解釈では、知覚修復は主に語彙文脈で調整され、音響音声的な性質が効いてくるのは、その言語に慣れていて音響の細部に注意を向けられる場合である [検証済][中]。Ishida M (2021) "Perceptual restoration of locally time-reversed speech: Non-native listeners' performance in their L2 vs. L1." *Atten Percept Psychophys* — [doi:10.3758/s13414-021-02258-5](https://link.springer.com/article/10.3758/s13414-021-02258-5)
- 日本語の単語は、100–200msという極端な局所時間反転にも非常に強かった。著者は、優勢な音素タイプ、遅い発話速度、語彙性によると解釈している [検証済][中]。Ishida M, Arai T, Kashino M (2025) "Perceptual restoration of locally time-reversed speech: Japanese words are very tolerant of severe temporal distortion." *Atten Percept Psychophys* — [doi:10.3758/s13414-025-03114-6](https://link.springer.com/article/10.3758/s13414-025-03114-6)

**マガーク効果**
- 音声「バ」に口の動き「ガ」を重ねると「ダ」に聞こえる [要照合][強]。McGurk H, MacDonald J (1976) "Hearing lips and seeing voices." *Nature* 264(5588):746–748 — [doi:10.1038/264746a0](https://doi.org/10.1038/264746a0)
- **日本人と日本語**：日本語音節を使うと、雑音なしではマガーク効果が小さく、ほぼ聴覚的明瞭度が100%未満の刺激に限られた。雑音を加えると効果は非常に強く広範になった [検証済][中]。Sekiyama K, Tohkura Y (1991) "McGurk effect in non-English listeners: Few visual effects for Japanese subjects hearing Japanese syllables of high auditory intelligibility." *J Acoust Soc Am* 90(4):1797–1805 — [Semantic Scholar](https://www.semanticscholar.org/paper/McGurk-effect-in-non-English-listeners:-few-visual-Sekiyama-Tohkura/9bf1d808d5a61868e36ddc3357c0afbe71e4766c)
- **外国語効果**：日米の聞き手×日米の話者の2×2設計。日本人の聞き手は全体として視覚の影響が小さかったが、日米どちらの聞き手も**非母語の話者の刺激で視覚の影響が大きくなった** [検証済（二次資料経由）][中]。Sekiyama K, Tohkura Y (1993) "Inter-language differences in the influence of visual cues in speech perception." *J Phonetics* 21:427–444 — [総説（Eureka）](https://journals.library.ualberta.ca/eureka/index.php/eureka/article/download/28785/21084)。関連：Hayashi Y, Sekiyama K (1998) "Native-foreign language effect in the McGurk effect." AVSP 1998 — [ISCA Archive](https://www.isca-archive.org/avsp_1998/hayashi98_avsp.pdf)
- 日本人で視覚の影響が小さい理由として、Sekiyamaは文化的要因（話し手の顔を直視しない傾向）も提案している（仮説）。後続研究の結果は一様でなく、フィンランド人・日本人を対象とした研究では、両群とも日本語刺激でマガーク効果が強かった [検証済][中]。"Investigation of cross-language and stimulus-dependent effects on the McGurk effect with Finnish and Japanese speakers and listeners"（2023, *Brain Sci*、著者要確認）— [PMC10452414](https://pmc.ncbi.nlm.nih.gov/articles/PMC10452414/)
- 発達：6歳時点では日英の子どもに差がなく、英語話者の子どもでは8歳までに視覚の影響が増えたが、日本人の子どもでは増えなかった [要照合][中]。Sekiyama K, Burnham D (2008) "Impact of language on development of auditory-visual speech perception." *Dev Sci* 11(2):306–320 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Sekiyama+Burnham+2008+Impact+of+language+on+development+of+auditory-visual+speech+perception)
- [限界] マガーク効果は刺激・個人によるばらつきが大きく、日常会話の視聴覚統合の代表指標として使うことには批判がある [要照合]。Van Engen KJ, Dey A, Sommers MS, Peelle JE (2022) "Audiovisual speech perception: Moving beyond McGurk." *J Acoust Soc Am* 152(6)（頁は要確認） — [doi:10.1121/10.0015262](https://doi.org/10.1121/10.0015262); Alsius A, Paré M, Munhall KG (2018) "Forty years after Hearing Lips and Seeing Voices: the McGurk effect revisited." *Multisens Res* 31(1–2):111–144 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Alsius+Pare+Munhall+2018+Forty+years+after+Hearing+Lips+and+Seeing+Voices)

**視覚手がかりがL2を助ける**
- スペイン語優位のスペイン語–カタルーニャ語バイリンガルは、カタルーニャ語の/e/–/ɛ/を音声だけでは弁別できなかったが、**口の動きが見えると弁別できた** [要照合][中]。Navarra J, Soto-Faraco S (2007) "Hearing lips in a second language: visual articulatory information enables the perception of second language sounds." *Psychol Res* 71(1):4–12 — [doi:10.1007/s00426-005-0031-5](https://doi.org/10.1007/s00426-005-0031-5)
- 日本人・韓国人の英語学習者に/r/–/l/を訓練した研究で、**視聴覚（話者の顔つき）訓練は音声のみの訓練より効果が大きかった**。話者の多様性も効果に影響した [要照合][中]。Hardison DM (2003) "Acquisition of second-language speech: Effects of visual cues, context, and talker variability." *Applied Psycholinguistics* 24(4):495–522 — [Google Scholar検索](https://scholar.google.com/scholar?q=Hardison+2003+Acquisition+of+second-language+speech%3A+Effects+of+visual+cues%2C+context%2C+and+talker+variability)

### Inferences
- 動画用の言い方：「あなたが"聞いている"音は、耳に届いた音そのものではなく、脳が作った完成予想図」。証拠は、咳で消した音が聞こえる（Warren）、脳が実際に欠けた音素を補完している（Leonard 2016）、口の動きで聞こえが変わる（McGurk）。
- L2への含意：L2の聞き手は、語彙知識が弱いぶん修復の材料が少ない（Ishida 2021の解釈）。そのため雑音や崩れた音（リエゾン・脱落）に弱い。一方、外国語では日本人でも視覚に頼る度合いが上がる（Sekiyama & Tohkura 1993）。口元が見える動画教材は理にかなっている（Hardison 2003、Navarra 2007）。
- 「日本人はマガーク効果が弱い」は話題性があるが、後続研究は一様ではない。動画では「傾向が報告されている」程度にとどめるのが安全。

### Gaps
- Ishida & Arai (2016) *SpringerPlus*「欠けた音素は母語話者と非母語話者で異なる形で修復される」と記憶しているが、本セッションで書誌を確認できなかったため引用を控えた。
- Warren (1970) の参加者数（20人中19人が欠落に気づかなかった、と記憶）は要照合。
- 日本人英語学習者で、視聴覚訓練がリスニング（文レベル）を改善するかを脳計測で検証した研究は見つからなかった。

---

## Q8. 睡眠と音声学習の固定化：Earle & Myers (2015)、Fenn, Nusbaum & Margoliash (2003)

### Takeaway
新しく学んだ音声知覚（合成音声や非母語の音素対比）は、睡眠を挟むと回復・安定し、他の話者へ汎化しやすくなる。Fenn et al. (2003, *Nature*) は、合成音声の学習成績が日中に落ちても睡眠後に回復することを示した。Earle & Myers (2015) は、夜に訓練したグループでヒンディー語の音素対比が睡眠後に別の話者へ汎化することを示し、日中に母語の似た音を聞くと固定化が妨げられる可能性も報告した。ただし「朝の訓練では睡眠効果がない」点には反証もある。

### Cited Findings
- **Fenn et al. (2003)**：聞き取りにくい合成音声（規則合成のテキスト読み上げ音声）の単語識別を訓練すると、成績は12時間の覚醒後に低下したが、睡眠後に回復した。睡眠は学習を「回復・安定化」させる [要照合][中]。Fenn KM, Nusbaum HC, Margoliash D (2003) "Consolidation during sleep of perceptual learning of spoken language." *Nature* 425(6958):614–616 — [doi:10.1038/nature01951](https://doi.org/10.1038/nature01951)
- **Earle & Myers (2015, JASA)**：英語話者がヒンディー語の歯音–そり舌音（/d̪ɛ/–/ɖɛ/、男性母語話者2名の自然音声）を朝または夜に訓練し、24時間で3回テストした。一晩の固定化は、**識別**課題での訓練していない話者への汎化を促進したが、**弁別**課題では明確な効果がなかった [検証済][中]。Earle FS, Myers EB (2015) "Overnight consolidation promotes generalization across talkers in the identification of nonnative speech sounds." *J Acoust Soc Am* 137(1):EL91–EL97 — [JASA EL](https://pubs.aip.org/asa/jasa/article/137/1/EL91/912458/Overnight-consolidation-promotes-generalization)
- 夜に訓練した参加者は睡眠後に改善したが、朝に訓練した参加者は一晩を挟んでも改善しなかった。日中に母語（英語）の似た音に触れることが干渉する、と解釈された [要照合（同グループの報告として検索結果に記載）][中]。Earle FS, Myers EB (2015) "Sleep and native language interference affect non-native speech sound learning." *J Exp Psychol Hum Percept Perform* 41(6):1680–1695 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Earle+Myers+2015+Sleep+and+native+language+interference+affect+non-native+speech+sound+learning)
- [反証・修正] 朝に訓練しても、訓練量（過剰学習）に関係なく一晩の効果が見られた。過剰学習は睡眠後の固定化を優位にしなかった [検証済][中]。Fuhrmeister P, Smith G, Myers EB (2020) "Overlearning of non-native speech sounds does not result in superior consolidation after a period of sleep." *J Acoust Soc Am* 147(3):EL289 — [JASA EL](https://pubs.aip.org/asa/jasa/article/147/3/EL289/997274/Overlearning-of-non-native-speech-sounds-does-not); [PDF](https://pamfuhrmeister.github.io/Fuhrmeister_Smith_Myers_2020.pdf)
- 神経画像の追試：前視床放線と鉤状束の白質FAが、汎化（訓練していない話者）での一晩の変化量と関連した [検証済（タイトル・要旨）][中]。"Neuroimaging findings for the overnight consolidation of learned non-native speech sounds"（著者要確認）— [PMC11740156](https://pmc.ncbi.nlm.nih.gov/articles/PMC11740156/)
- 睡眠が訛りへの適応を新しい話者へ汎化させるという報告もある [要照合][中]。Xie X, Earle FS, Myers EB (2018) "Sleep facilitates generalisation of accent adaptation to a new talker." *Lang Cogn Neurosci* 33(2):196–210 — [Google Scholar検索](https://scholar.google.com/scholar?q=Xie+Earle+Myers+2018+Sleep+facilitates+generalisation+of+accent+adaptation+to+a+new+talker)
- 声調対比の知覚学習での一晩の固定化 [検証済（タイトル）]。"The effect of overnight consolidation in the perceptual learning of non-native tonal contrasts." *PLoS ONE* (2019) — [PLoS ONE](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0221498)
- 睡眠の記憶機能の一般的な総説 [要照合][強]。Diekelmann S, Born J (2010) "The memory function of sleep." *Nat Rev Neurosci* 11(2):114–126 — [doi:10.1038/nrn2762](https://doi.org/10.1038/nrn2762)

### Inferences
- 動画用：「寝ている間に脳が"英語の音のフォルダ"を整理して、別の人の声でも聞き取れるように一般化してくれる（Earle & Myers 2015）」。実践的には「夜にリスニング・音素訓練→寝る」が理にかなっている可能性がある。ただし朝の訓練が無駄という意味ではない（Fuhrmeister 2020）。
- 「寝ながら英語を流せば覚える（睡眠学習）」は、ここで紹介した研究とは別物。これらの研究は**起きている間に学習した内容が睡眠で固定化される**ことを示しており、睡眠中に新しい音声を聞かせて学習させたものではない。

### Gaps
- 睡眠中の音声提示による新規学習の研究（いわゆる睡眠学習）や、ターゲット記憶再活性化（TMR）の言語音への応用は、本セッションでは調べていない。
- 日本人の/r/–/l/学習と睡眠を直接扱った研究は見つからなかった。

---

## Q9. カクテルパーティ効果と雑音：なぜL2リスニングは雑音下でL1よりはるかに崩れるのか

### Takeaway
静かな環境では母語話者並みに聞ける上級者でも、雑音下ではL2の成績が大きく落ちる。早期バイリンガルですら影響を受ける。L2の不利は音素・語彙・意味・予測の各段階の小さな弱さが累積したもので（Lecumberri, Cooke & Cutler 2010）、雑音はその「穴」を拡大する。神経レベルでは、雑音とL2知識不足が組み合わさると、句・文レベルの皮質追従が崩れる（Blanco-Elorrieta 2020）。日本人については、英語子音の認識が雑音・残響で米国人より大きく低下することが報告されている（Takata & Nábělek 1990）。

### Cited Findings
**カクテルパーティの神経基盤**
- 聴覚皮質は、複数話者の中から注意を向けた話者の音声を選択的に表現する [要照合][強] — [Ding & Simon 2012 PNAS](https://doi.org/10.1073/pnas.1205381109); [Mesgarani & Chang 2012 Nature](https://doi.org/10.1038/nature11020)

**L2は雑音に弱い（行動）**
- 英語単一言語話者、早期バイリンガル（幼少期に英語習得）、後期バイリンガル（思春期以降に英語習得）を比較すると、静かな環境では差が小さくても、雑音下で文の最終語を正しく聞き取るのに必要なSN比は、英語の習得年齢が遅いほど高くなった [要照合][強]。Mayo LH, Florentine M, Buus S (1997) "Age of second-language acquisition and perception of speech in noise." *J Speech Lang Hear Res* 40(3):686–693 — [doi:10.1044/jslhr.4003.686](https://doi.org/10.1044/jslhr.4003.686)
- **日本人対象**：日本人の聞き手の英語子音認識は、雑音と残響によって米国人の聞き手より大きく低下した [要照合][中]。Takata Y, Nábělek AK (1990) "English consonant recognition in noise and in reverberation by Japanese and American listeners." *J Acoust Soc Am* 88(2):663–666 — [PubMed検索](https://pubmed.ncbi.nlm.nih.gov/?term=Takata+Nabelek+1990+English+consonant+recognition+noise+reverberation+Japanese)
- 総説：非母語話者の不利は雑音・残響・競合話者などの悪条件で一貫して拡大する。原因は音響音声・語彙・統語・意味の各レベルの効果の累積である [要照合][強]。Garcia Lecumberri ML, Cooke M, Cutler A (2010) "Non-native speech perception in adverse conditions: A review." *Speech Commun* 52(11–12):864–886 — [doi:10.1016/j.specom.2010.08.014](https://doi.org/10.1016/j.specom.2010.08.014)
- 非母語話者（スペイン人英語学習者）は、エネルギー的マスキング（音が物理的に覆われる）と情報的マスキング（競合する話し声に気を取られる）の両方で、母語話者より大きな影響を受けた [要照合][中]。Cooke M, Garcia Lecumberri ML, Barker J (2008) "The foreign language cocktail party problem: Energetic and informational masking effects in non-native speech perception." *J Acoust Soc Am* 123(1):414–427 — [doi:10.1121/1.2804952](https://doi.org/10.1121/1.2804952)
- 母語の雑音下での優位は、主に**意味文脈の利用**による（フランス語–英語バイリンガル）[要照合][中]。Golestani N, Rosen S, Scott SK (2009) "Native-language benefit for understanding speech-in-noise: The contribution of semantics." *Bilingualism: Lang Cogn* 12(3):385–392 — [Google Scholar検索](https://scholar.google.com/scholar?q=Golestani+Rosen+Scott+2009+Native-language+benefit+for+understanding+speech-in-noise+contribution+of+semantics)
- 静かな環境では単一言語話者と差がない早期・高習熟のスペイン語–英語バイリンガルでも、雑音・残響下では成績が落ちた [要照合][中]。Rogers CL, Lister JJ, Febo DM, Besing JM, Abrams HB (2006) "Effects of bilingualism, noise, and reverberation on speech perception by listeners with normal hearing." *Applied Psycholinguistics* 27(3):465–485 — [Google Scholar検索](https://scholar.google.com/scholar?q=Rogers+Lister+Febo+Besing+Abrams+2006+Effects+of+bilingualism%2C+noise%2C+and+reverberation+on+speech+perception)
- 非母語話者は、意味的手がかり（文脈）と音声的手がかり（はっきりした発話）の両方がそろったときにしか雑音下で十分な恩恵を受けられなかった [要照合][中]。Bradlow AR, Alexander JA (2007) "Semantic and phonetic enhancements for speech-in-noise recognition by native and non-native listeners." *J Acoust Soc Am* 121(4):2339–2349 — [doi:10.1121/1.2642103](https://doi.org/10.1121/1.2642103)
- 非母語話者は、明瞭度をそろえても聴取努力（瞳孔径）が大きかった。「聞けている」ときでも脳はより疲れている [要照合][中]。Borghini G, Hazan V (2018) "Listening effort during sentence processing is increased for non-native listeners: A pupillometry study." *Front Neurosci* 12:152 — [doi:10.3389/fnins.2018.00152](https://doi.org/10.3389/fnins.2018.00152)
- 日本人の聞き手は、雑音を加えると日本語音節でもマガーク効果（視覚依存）が非常に強くなった。雑音下で脳が視覚情報に頼る切り替えを示す [検証済][中] — [Sekiyama & Tohkura 1991](https://www.semanticscholar.org/paper/McGurk-effect-in-non-English-listeners:-few-visual-Sekiyama-Tohkura/9bf1d808d5a61868e36ddc3357c0afbe71e4766c)

**神経レベル**
- 中国語–英語バイリンガル51名で、雑音は音節リズムの追従を下げたが、それは習熟度とは無関係だった。句・文レベルの追従は、雑音とL2知識の交互作用を示した（雑音下では知識の少ない人ほど上位構造の追従が崩れる）[検証済][中] — [Blanco-Elorrieta et al. 2020](https://estiblancoelorrieta.github.io/BlancoElorrieta_etal_2020.pdf)
- 雑音下では、デルタ帯の追従が理解度を反映する（母語 vs 理解できない言語）[要照合][中] — [Etard & Reichenbach 2019](https://doi.org/10.1523/JNEUROSCI.1828-18.2019)

### Inferences
- 動画用の説明モデル：「母語の脳は、雑音で欠けた部分を語彙・文脈・予測で"自動補完"できる（音素修復と同じ仕組み）。L2の脳は補完の材料（単語の音の型、コロケーション、予測）が少ないので、雑音の穴がそのまま理解の穴になる」（Lecumberri 2010、Golestani 2009、Blanco-Elorrieta 2020）。
- 「英会話カフェや飲み会で急に聞こえなくなる」のは能力が下がったからではなく、雑音で差が拡大するのが科学的に普通、と伝えると視聴者の安心材料になる。上級者でも雑音には弱い（Rogers 2006、Mayo 1997）。
- 非母語話者は聞けていても脳の負担が大きい（Borghini & Hazan 2018）。「英語を聞くと疲れる」の科学的裏づけとして使える。

### Gaps
- Mayo et al. (1997) と Takata & Nábělek (1990) の具体的な数値（必要SN比のdB差、正答率）は原文未確認。
- 日本人英語学習者を対象にした、雑音下の皮質追従（EEG/MEG）研究は見つからなかった。
