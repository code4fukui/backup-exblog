# backup-exblog

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A backup tool for the Excite Blog platform.

## Features
- Scrapes blog content and metadata from Excite Blog
- Downloads associated images
- Generates XML files for the blog posts

## Requirements
- [Deno](https://deno.land/) runtime

## Usage

1. Edit the `.env` file to set the URL of the first blog post to scrape:

   ```
   FIRST_URL=https://fukuno.exblog.jp/12466189/
   ```

2. Run the `scrape.js` script to fetch the blog content and generate `contents_org.csv`:

   ```sh
   deno -A --env scrape.js
   ```

3. Edit the `.env` file to add the base URL for the image downloads:

   ```
   IMG_BASE_URL=https://img.fukuno.com/imgexb/
   ```

4. Run the `imgdownload.js` script to download the images and generate `contents.csv` and `images.csv`:

   ```sh
   deno -A --env imgdownload.js
   ```

5. Run the `csv2xml.js` script to generate the XML files in the `xml/` directory:

   ```sh
   deno -A csv2xml.js
   ```

## License
MIT License — see [LICENSE](LICENSE).