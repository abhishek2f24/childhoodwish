// Submits every sitemap URL to IndexNow (Bing/Yandex index within hours, no
// Search Console needed). Run AFTER the site is deployed with the key file:
//   node scripts/indexnow-ping.mjs
const HOST = 'www.childhoodwish.in';
const KEY = 'f4f44f30cd26f9d925a5ba673301bea0';

const sitemapXml = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urls.length === 0) {
  console.error('No URLs found in sitemap — is the site deployed?');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`Submitted ${urls.length} URLs to IndexNow — HTTP ${res.status}`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
