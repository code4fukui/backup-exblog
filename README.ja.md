# Exblog バックアップ

Exblogのコンテンツをバックアップするためのツールです。

## 使い方

1. `.env`ファイルを編集して最初のURLを設定します。
```
FIRST_URL=https://fukuno.exblog.jp/12466189/
```

2. `scrape.js`を実行してコンテンツのCSVファイル(`contents_org.csv`)を作成します。
```sh
deno -A --env scrape.js
```

3. `.env`ファイルを編集して画像のURLのプレフィックスを設定します。
```
IMG_BASE_URL=https://img.fukuno.com/imgexb/
```

4. `imgdownload.js`を実行して画像をダウンロードし、`contents.csv`と`images.csv`を作成します。
```sh
deno -A --env imgdownload.js
```

5. `csv2xml.js`を実行してXMLファイルを`xml/`ディレクトリに出力します。
```sh
deno -A csv2xml.js
```

## ライセンス

MIT License