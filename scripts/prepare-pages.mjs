// Runs after `npm run build`, to fit the prerendered site to GitHub Pages.
//
// - Angular writes each page as `maze/index.html`. GitHub Pages would answer `/maze` with a
//   redirect to `/maze/`, so each page becomes `maze.html` instead, which it serves at `/maze`.
// - `index.csr.html` (the app without a prerendered page) becomes `404.html`, which GitHub Pages
//   shows for any other address; the app then opens and shows the right page, or the home page.
// - `sitemap.xml` (for search engines) and `llms.txt` (for AI tools) list every page, read from
//   the prerendered pages themselves, so a new activity appears in both on its own.

import { existsSync, readdirSync, readFileSync, renameSync, rmdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist/learning-with-toma/browser';
const siteUrl = 'https://learningwithtoma.com/';

for (const entry of readdirSync(root, { withFileTypes: true })) {
  const page = join(root, entry.name, 'index.html');
  if (entry.isDirectory() && existsSync(page)) {
    renameSync(page, join(root, `${entry.name}.html`));
    if (readdirSync(join(root, entry.name)).length === 0) {
      rmdirSync(join(root, entry.name));
    }
  }
}

renameSync(join(root, 'index.csr.html'), join(root, '404.html'));

// The pages, in the order the home page links to them (the activity cards).

const home = readFileSync(join(root, 'index.html'), 'utf8');
const names = readdirSync(root)
  .filter(file => file.endsWith('.html') && file !== 'index.html' && file !== '404.html')
  .map(file => file.slice(0, -'.html'.length));
const linkOrder = [...home.matchAll(/href="\/([\w-]+)"/g)].map(match => match[1]);
names.sort((a, b) => linkOrder.indexOf(a) - linkOrder.indexOf(b));

function decode(text) {
  return text.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function describe(html) {
  const title = decode(html.match(/<title>([^<]*)<\/title>/)[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  return { title, description };
}

const site = describe(home);
const activities = names.map(name => {
  const { title, description } = describe(readFileSync(join(root, `${name}.html`), 'utf8'));
  // "Learning with Toma - Maze" → "Maze"
  return { url: siteUrl + name, title: title.replace(`${site.title} - `, ''), description };
});

writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[siteUrl, ...activities.map(activity => activity.url)].map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`);

writeFileSync(join(root, 'llms.txt'), `# ${site.title}

> ${site.description}

${site.title} (in Croatian and Serbian: Učimo s Tomom) is a free website that makes printable
learning worksheets for children in seconds. Pick an activity, choose the language (English,
Croatian or Serbian), adjust a few settings and press Generate: every worksheet is new. Print it
on A4 paper or save it as a PDF. There is no account, sign-up or payment.

## Activities

${activities.map(activity => `- [${activity.title}](${activity.url}): ${activity.description}`).join('\n')}

## More

- [Home page](${siteUrl}): how it works, what parents say, the story behind the site and how to help keep it free.
`);
