# backup-exblog


エキサイトブログ（Excite Blog）プラットフォーム用のバックアップツール。

## 機能
- エキサイトブログからブログのコンテンツとメタデータをスクレイピング
- 関連する画像をダウンロード
- ブログ記事のXMLファイルを生成

## 要件
- [Deno](https://deno.land/) ランタイム

## 使用方法

1. `.env` ファイルを編集して、スクレイピングする最初のブログ記事のURLを設定します:

   ```
   FIRST_URL=https://fukuno.exblog.jp/12466189/
   ```

2. `scrape.js` スクリプトを実行してブログのコンテンツを取得し、 `contents_org.csv` を生成します:

   ```sh
   deno -A --env scrape.js
   ```

3. `.env` ファイルを編集して、画像ダウンロード用のベースURLを追加します:

   ```
   IMG_BASE_URL=https://img.fukuno.com/imgexb/
   ```

4. `imgdownload.js` スクリプトを実行して画像をダウンロードし、 `contents.csv` と `images.csv` を生成します:

   ```sh
   deno -A --env imgdownload.js
   ```

5. `csv2xml.js` スクリプトを実行して、 `xml/` ディレクトリにXMLファイルを生成します:

   ```sh
   deno -A csv2xml.js
   ```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
