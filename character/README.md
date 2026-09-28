# キャラクター

ひなのちびキャラ。黒髪センターパート、ブラウンの瞳にはね上げライン、コーラルのリップ、黒×ゴールドのジャージにサテンのシュシュ、ちょうちょのヘアクリップ。

| ファイル | 内容 |
| --- | --- |
| `hina-chibi.svg` | 元データ（色や形はここを直す） |
| `hina-chibi.png` | 背景なし（動画やスライドに重ねる用） |
| `hina-chibi-icon.png` | ピンク背景＋ちょうちょ（アイコン用） |

## PNG の作り直し方

```sh
npm install                      # 初回のみ
npx playwright install chromium  # 初回のみ
npm run character -- character/hina-chibi.svg
```
