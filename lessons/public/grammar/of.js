// Unit: 前置詞 of. Follows the 前置詞 of chapter of the teacher's 中学文法
// document. Step format is described in lessons.js. Red marks of and 's.

export const OF = {
  id: "of",
  title: "前置詞 of",
  subtitle: "the top of the mountain・one of …",
  lessons: [
    {
      id: "of-order",
      title: "B of A と 's",
      subtitle: "本の表紙・ケンのバッグ",
      steps: [
        {
          type: "explain",
          title: "[[of]] とは？",
          text: ["2つの名詞をつないで、**AとBのつながり**を表します。", "特に「**全体**」と「**その一部**」によく使います。"],
          examples: [
            { en: "Look at the door [[of]] the room.", ja: "部屋のドアを見てください。" },
            { en: "I like the end [[of]] the movie.", ja: "私はその映画の最後が好きです。" },
          ],
          key: "[[of]] ＝ 全体から一部を取り出す",
          note: ["前置詞なので、[[of]] のあとは**名詞**です。"],
        },
        {
          type: "explain",
          title: "語順は日本語と「逆」",
          text: ["英語は、**言いたいもの（主役）を先に**言います。"],
          table: {
            head: ["日本語", "英語"],
            rows: [
              ["駅の入り口", "the entrance [[of]] the station"],
              ["日本の首都", "the capital [[of]] Japan"],
              ["山の頂上", "the top [[of]] the mountain"],
              ["映画の最後", "the end [[of]] the movie"],
            ],
          },
          key: "AのB ＝ B [[of]] A",
          note: ["コツ：[[of]] を「←」と思って、後ろから訳します。\nthe top ← [[of]] ← the mountain ＝ 山の頂上"],
        },
        {
          type: "choice",
          q: "I cried at ___.",
          ja: "私は映画の最後で泣きました。",
          choices: ["the end of the movie", "the movie of the end"],
          answer: "the end of the movie",
          why: "主役（最後 ＝ the end）が先です。the end [[of]] the movie。",
        },
        {
          type: "order",
          ja: "日本の首都は東京です。",
          words: ["The", "capital", "of", "Japan", "is", "Tokyo"],
          end: ".",
          why: "「日本の首都」は the capital [[of]] Japan です。",
        },
        {
          type: "explain",
          title: "[['s]] と [[of]] の使い分け",
          text: ["「〜の」は [['s]] でも表せます。", "**人・動物**か、**物・場所**かで使い分けます。"],
          table: {
            head: ["形", "使うとき", "例"],
            rows: [
              ["[['s]]", "人・動物の\n「〜の」", "Ken[['s]] bag\nthe dog[['s]] name"],
              ["[[of]]", "物・場所の\n「〜の」", "the color [[of]] the car\nthe top [[of]] the mountain"],
            ],
          },
          examples: [
            { en: "This is my sister[['s]] room.", ja: "これは姉の部屋です。" },
            { en: "The color [[of]] the sky is beautiful.", ja: "空の色がきれいです。" },
          ],
          note: ["✗ the car of my father"],
        },
        {
          type: "choice",
          q: "This is ___.",
          ja: "これはケンの部屋です。",
          choices: ["Ken's room", "the room of Ken"],
          answer: "Ken's room",
          why: "ケンは人なので、[['s]] です。",
        },
        {
          type: "choice",
          q: "I like ___.",
          ja: "私はこの町の名前が好きです。",
          choices: ["the name of this town", "this town of the name"],
          answer: "the name of this town",
          why: "町は場所なので [[of]]。主役（名前）が先です。",
        },
        {
          type: "order",
          ja: "このバッグの値段はいくらですか？",
          words: ["What", "is", "the", "price", "of", "this", "bag"],
          end: "?",
          why: "物の「〜の」なので、the price [[of]] this bag です。",
        },
        {
          type: "write",
          ja: "この歌の名前は何ですか？",
          answers: ["What is the name of this song?", "What's the name of this song?"],
          hint: "名前 → name\n歌 → song",
          why: "「この歌の名前」は the name [[of]] this song です。",
        },
        {
          type: "write",
          ja: "その本の表紙は青いです。",
          answers: ["The cover of the book is blue.", "The cover of that book is blue."],
          hint: "表紙 → cover",
          why: "「本の表紙」は the cover [[of]] the book です。",
        },
        {
          type: "write",
          ja: "私の母の車は白いです。",
          answers: ["My mother's car is white.", "My mom's car is white."],
          hint: "母 → mother",
          why: "母は人なので、my mother[['s]] car です。",
        },
        {
          type: "write",
          ja: "その犬の名前はポチです。",
          answers: ["The dog's name is Pochi.", "The name of the dog is Pochi."],
          hint: "犬 → dog",
          why: "犬は動物なので、the dog[['s]] name です。",
        },
      ],
    },
  ],
};
