# スライド

動画ごとのスライド（復習用の「まとめ」と、動画の中で映すスライド）。

| フォルダ | 内容 |
| --- | --- |
| `9-phrases/` | 日常英会話フレーズ 9選（`9-phrases-matome.pdf` / 編集できる `9-phrases-matome.pptx`）。スライド11枚＋練習問題45問と解答 |
| `a-the/` | 文法解説動画「冠詞 — a / an と the の違い」（`a-the-slides.pdf` / 編集できる `a-the-slides.pptx`）。動画で映すスライド18枚。サロン（Hina English）の画面に合わせたデザインで、例文にはオリジナルのイラストつき。a / an と the が両方出てくる文は、問題ページと答えページの2枚で視聴者に問いかける |

## PDF の作り直し方

スライドの中身は各フォルダの `slides.html` にあります。文章を直したら、次のコマンドで PDF を作り直します。

```sh
npm install                      # 初回のみ
npx playwright install chromium  # 初回のみ
npm run matome -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pdf
npm run matome:pptx -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pptx

# 冠詞（a / an と the）の動画スライド
npm run matome -- matome/a-the/slides.html matome/a-the/a-the-slides.pdf
npm run matome:pptx -- matome/a-the/slides.html matome/a-the/a-the-slides.pptx
```

`a-the/` のイラストは `a-the/illust/*.svg` が元データです。SVG を直したら PNG（`a-the/img/`）を書き出し直してから、PDF と PPTX を作り直します。

```sh
npm run illust -- matome/a-the/illust matome/a-the/img
```

`.pptx` はレイアウトを HTML からそのまま写した編集可能なスライドです。Google ドライブにアップロードすると Google スライドに変換されます（`9-phrases/` は英語 Arial・日本語 Noto Sans JP、`a-the/` は英語 DM Sans・手書き風 Caveat・日本語 Noto Sans JP を指定。どれも Google スライドで使えるフォントです）。

フォントは `fonts/` に同梱しています（Noto Sans JP、Arial と同じ字幅の Liberation Sans、DM Sans、Caveat。すべて SIL Open Font License）。インターネット接続なしでビルドできます。
