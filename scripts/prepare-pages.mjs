// Runs after `npm run build`, to fit the prerendered site to GitHub Pages.
//
// - Angular writes each page as `maze/index.html`. GitHub Pages would answer `/maze` with a
//   redirect to `/maze/`, so each page becomes `maze.html` instead, which it serves at `/maze`.
// - `index.csr.html` (the app without a prerendered page) becomes `404.html`, which GitHub Pages
//   shows for any other address; the app then opens and shows the right page, or the home page.

import { existsSync, readdirSync, renameSync, rmdirSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist/learning-with-toma/browser';

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
