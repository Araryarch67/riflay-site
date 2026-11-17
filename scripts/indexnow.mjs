// Tells IndexNow's search engines (Bing, Yandex, Seznam, Naver...) that the site changed, so they crawl it now
// instead of whenever they next come by. Google doesn't take part: use Search Console's "Request indexing".
// Run after a deploy is live:  npm run indexnow
const site = process.env.SITE_URL || "https://www.riflay.my.id";
const key = "fb4928981ca0b2563383a733bb6493ea";
const urls = [site + "/", site + "/sitemap.xml"];
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urls.join(", ")}`);
if (response.status >= 400) process.exitCode = 1;
