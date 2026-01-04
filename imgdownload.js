import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";
import { fetchWithTimeout } from "https://code4fukui.github.io/ipscan/fetchWithTimeout.js";
import { checkExists } from "./checkExists.js";

/*
<center><a href=""https://fukuno.exblog.jp/iv/detail/?s=6911338&amp;i=200712%2F08%2F18%2Fe0024918_1352172.jpg"" rel=""nofollow""><img src=""https://pds.exblog.jp/pds/1/200712/08/18/e0024918_1352172.jpg"" alt=""モスチキン予約_e0024918_1352172.jpg"" class=""IMAGE_MID"" height=""288"" width=""352"" ></a></center><br>
*/

const map = {};

const list = [];


const baseurl = Deno.env.get("IMG_BASE_URL");

const data = await CSV.fetchJSON("./contents_org.csv");
for (const item of data) {
  const body = item.body;
  const dom = HTMLParser.parse(body);
  const imgs = dom.querySelectorAll("img").map(i => i.getAttribute("src"));
  for (const img0 of imgs) {
    const img = img0.startsWith("http://club.jig.jp/resproxy/") ? decodeURIComponent(img0.substring(img0.indexOf("url=") + 4)) : img0;
    const fn = img.substring(img.lastIndexOf("/") + 1);
    if (map[fn]) {
      //console.log("duplicated " + img + " " + map[fn]);
      map[fn] = [map[fn], img];
    } else {
      map[fn] = img;
    }

    console.log(img);
    try {
      if (!await checkExists("img/" + fn)) {
        const bin = await (await fetchWithTimeout(img, { timeout: 3000 })).bytes();
        await Deno.writeFile("img/" + fn, bin);
        await sleep(100 + 100 * Math.random());
      }
      list.push({ fn, img, err: "" });
    } catch (e) {
      list.push({ fn, img, err: "err" });
    }

    item.body = item.body.replaceAll(img, baseurl + fn);
  }
}
await Deno.writeTextFile("./images.csv", CSV.stringify(list));
await Deno.writeTextFile("./contents.csv", CSV.stringify(data));
