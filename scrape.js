import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

const firsturl = Deno.env.get("FIRST_URL");
const lasturl = firsturl.substring(0, firsturl.indexOf("/", 8)) + "//";

/*
		<TD ALIGN=LEFT WIDTH=45%>      <a class="older_page" href="https://fukuno.exblog.jp/12263998/" title="  次のページ >">
      眼鏡でイルカ能力ゲット！超音波... &gt;&gt;
*/

const parseTitle = (dom) => {
  let title = dom.querySelector("title").text;
  const n = title.lastIndexOf(" : ");
  if (n >= 0) title = title.substring(0, n);
  return title.trim();
};
const parseBody = (dom) => {
  let body = dom.querySelector("div.POST_BODY").innerHTML;
  const n = body.indexOf('<br class="clear">');
  if (n >= 0) body = body.substring(0, n);
  return body.trim();
};
const parseTags = (dom) => {
//    <ul class="taglist-list">
// "技術（ぎじゅつ）\n        ", "IT(あいてぃー
  const lis = dom.querySelectorAll("ul.taglist-list li");
  const tags = lis.map(i => {
    let s = i.text;
    const n = s.indexOf("(");
    if (n >= 0) s = s.substring(0, n);
    const m = s.indexOf("（");
    if (m >= 0) s = s.substring(0, m);
    return s.trim();
  });
  //	<DIV CLASS=POST_TAIL>      <span class="TIME">
  //    by <span class="AUTHOR">t_fukuno</span>
  //    | <a href="https://fukuno.exblog.jp/11816388/">2009-12-21 12:42</a>
  //    | <a href="https://fukuno.exblog.jp/i19/">紹介</a>
  //              </span>
  const cate = dom.querySelectorAll("span.TIME a")[1]?.text;
  if (cate && cate.length > 0 && tags.indexOf(cate) == -1) {
    tags.unshift(cate);
  }
  return tags;
};
const parseDateTime = (dom) => {
  // <span class="TIME">
  //    by <span class="AUTHOR">t_fukuno</span>
  //    | <a href="https://fukuno.exblog.jp/11904561/">2010-01-05 06:59</a>
  const dt = dom.querySelector("span.TIME a").text;
  return dt.trim();
};

const first = false; // true if first fetch

const list = [];

for (let url = firsturl;;) {
  const html = await fetchOrLoad(url);
  //console.log(html);
  const dom = HTMLParser.parse(html);

  const title = parseTitle(dom);
  const body = parseBody(dom);
  const tags = parseTags(dom).join(",");
  const dt = parseDateTime(dom);
  console.log(url, title, body, tags, dt);
  list.push({ url, dt, tags, title, body });

  // next
  const url2 = dom.querySelector("a.older_page").getAttribute("href");
  console.log(url2);
  url = url2;
  if (url == lasturl) break;
  if (first) await sleep(100 + 50 * Math.random());
}

list.reverse();
await Deno.writeTextFile("contents_org.csv", CSV.stringify(list));
