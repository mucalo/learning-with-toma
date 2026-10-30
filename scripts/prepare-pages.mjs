// Runs after `npm run build`, to fit the prerendered site to GitHub Pages.
//
// - Angular writes each page as `maze/index.html` or `hr/labirint/index.html`. GitHub Pages would
//   answer `/maze` with a redirect to `/maze/`, so each page becomes `maze.html` instead, which it
//   serves at `/maze`. The other languages' home pages stay `hr/index.html`, `sr/index.html` and
//   `pl/index.html`, in the folder with their activity pages, and are served at `/hr/`, `/sr/`, `/pl/`.
// - `index.csr.html` (the app without a prerendered page) becomes `404.html`, which GitHub Pages
//   shows for any other address; the app then opens and shows the right page, or the home page.
// - `sitemap.xml` (for search engines) and `llms.txt` (for AI tools) list every page, read from
//   the prerendered pages themselves, so a new activity appears in both on its own.

import { existsSync, readdirSync, readFileSync, renameSync, rmdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist/learning-with-toma/browser';
const siteUrl = 'https://learningwithtoma.com/';
/** Folders of the Croatian, Serbian and Polish pages (`path` in `src/app/i18n/languages.ts`). */
const languageFolders = ['hr', 'sr', 'pl'];

/** `dir/page/index.html` → `dir/page.html`, deepest first; a folder with more in it keeps its index.html. */
function flatten(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const folder = join(dir, entry.name);
    flatten(folder);
    const page = join(folder, 'index.html');
    if (existsSync(page) && readdirSync(folder).length === 1) {
      renameSync(page, `${folder}.html`);
      rmdirSync(folder);
    }
  }
}

flatten(root);
renameSync(join(root, 'index.csr.html'), join(root, '404.html'));

// Each language's pages, in the order its home page links to them (the activity cards).

function decode(text) {
  return text.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function describe(html) {
  const title = decode(html.match(/<title>([^<]*)<\/title>/)[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  return { title, description };
}

function languagePages(folder) {
  const dir = folder ? join(root, folder) : root;
  const home = readFileSync(join(dir, 'index.html'), 'utf8');
  const site = describe(home);
  const prefix = folder ? `/${folder}/` : '/';
  const linkOrder = [...home.matchAll(/href="([^"#]+)"/g)].map(match => match[1]);
  const names = readdirSync(dir)
    .filter(file => file.endsWith('.html') && file !== 'index.html' && file !== '404.html')
    .map(file => file.slice(0, -'.html'.length));
  names.sort((a, b) => linkOrder.indexOf(prefix + a) - linkOrder.indexOf(prefix + b));

  const activities = names.map(name => {
    const { title, description } = describe(readFileSync(join(dir, `${name}.html`), 'utf8'));
    // "Learning with Toma - Maze" → "Maze"
    return { url: siteUrl + (folder ? `${folder}/` : '') + name, title: title.replace(`${site.title} - `, ''), description };
  });
  return { url: siteUrl + (folder ? `${folder}/` : ''), ...site, activities };
}

const english = languagePages('');
const others = languageFolders.map(languagePages);

writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[english, ...others].flatMap(language => [language.url, ...language.activities.map(activity => activity.url)]).map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`);

writeFileSync(join(root, 'llms.txt'), `# ${english.title}

> ${english.description}

${english.title} (in Croatian and Serbian: Učimo s Tomom; in Polish: Uczymy się z Tomą) is a free
website that makes printable learning worksheets for children in seconds. Pick an activity,
choose the language (English, Croatian, Serbian or Polish), adjust a few settings and press
Generate: every worksheet is new. Print it on A4 paper or save it as a PDF. There is no account,
sign-up or payment.

## Activities

${english.activities.map(activity => `- [${activity.title}](${activity.url}): ${activity.description}`).join('\n')}

## In Croatian, Serbian and Polish

The whole site, worksheets included, is also in Croatian, Serbian (Latin script) and Polish, with its own addresses:

${others.map(language => `- [${language.title}](${language.url}): ${language.description}`).join('\n')}

## More

- [Home page](${english.url}): how it works, what parents say, the story behind the site and how to help keep it free.
`);
