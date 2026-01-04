import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

await Deno.mkdir("./xml/", { recursive: true });

const data = await CSV.fetchJSON("./contents.csv");
let idx = 1000000;
for (const item of data) {
  /*
  <item>
<title>古いタブレットを情報端末付き時計として活用しよう！ JavaScript、ES5対応法 #js</title>
<guid>https://fukuno.jig.jp/20200118</guid>
<pubDate>Sat, 18 Jan 2020 23:55:00 +0900</pubDate>
<description><![CDATA[<p>
<a href=https://fukuno.jig.jp/2697>常設したIoT温度計</a>とねこ観察の結果、家の温度を20度以上に保つことの重要さが分かった。<br>
*/
  const dt = new DateTime(item.dt);
  //console.log(dt, dt.toStringRFC2822());
  const tags = ("exblog," + item.tags).split(",").map(i => "#" + i).join(" ");
  const tags2 = tags.length == 0 ? "" : " " + tags;
  const url = "https://fukuno.jig.jp/" + idx;
  const xml = `<item>
<title>${item.title}${tags2}</title>
<guid>${url}</guid>
<pubDate>${dt.toStringRFC2822()}</pubDate>
<description><![CDATA[<p>
${item.body}
</p>]]></description>
</item>/`;
  const dir = Math.floor(idx / 100).toString();
  await Deno.mkdir("./xml/" + dir, { recursive: true });
  await Deno.writeTextFile("./xml/" + dir + "/" + idx + ".xml", xml);

  idx++;
}