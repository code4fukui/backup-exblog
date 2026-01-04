# backup exblog

- a backup tool from excite blog

## usage

1. edit .env to set the first URL
```
FIRST_URL=https://fukuno.exblog.jp/12466189/
```

2. run scrape.js to make contents_org.csv
```sh
deno -A --env scrape.js
```

3. edit .env to add prefix for img tag
```
IMG_BASE_URL=https://img.fukuno.com/imgexb/
```

4. run imgdownload.js to download image as img dir and to make contents.csv, images.csv
```sh
deno -A --env imgdownload.js
```

5. run csv2xml.js to make xml dir
```sh
deno -A csv2xml.js
```
