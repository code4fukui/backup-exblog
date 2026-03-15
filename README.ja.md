# Exblog バックアップ

Exblogのブログコンテンツをバックアップするためのツールです。

## 使い方

1. `.env`ファイルを編集して、最初のブログ記事のURLを設定します。
```
FIRST_URL=https://fukuno.exblog.jp/12466189/
```

2. `scrape.js`を実行してブログ記事のデータを`contents_org.csv`に出力します。
```sh
deno -A --env scrape.js
```

3. `.env`ファイルを編集して、画像ダウンロード用のベースURLを設定します。
```
IMG_BASE_URL=https://img.fukuno.com/imgexb/
```

4. `imgdownload.js`を実行して画像ファイルをダウンロードし、`contents.csv`と`images.csv`を出力します。
```sh
deno -A --env imgdownload.js
```

5. `csv2xml.js`を実行してブログ記事のXMLファイルを`xml/`ディレクトリに出力します。
```sh
deno -A csv2xml.js
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。