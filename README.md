# Learning with Toma

**Printable worksheets for little learners, ready in seconds.**

Learning with Toma is a free web app that generates small, printable worksheets for children aged 4–7, especially children with neurodevelopmental differences such as autism (ASD), ADHD, dyslexia, dyspraxia and dysgraphia.

You choose an activity, set a few options and click **Generate worksheet**. The app creates a fresh randomized worksheet, shown as A4 pages exactly as it will print, that can be completed on screen or printed.

**Who it's for:** parents, teachers, kindergartens, speech-language pathologists and therapists, special-education teachers, and psychologists.

The site is deployed to GitHub Pages at [learningwithtoma.com](https://learningwithtoma.com) (custom domain, served from the root).

---

## Activities

Activities are grouped into four categories, used for the filter on the home page and the colours of their cards: **Letters & words**, **Numbers & size**, **Fine motor** and **Thinking**.

| Route | Activity | Category | What the child does | Options |
|---|---|---|---|---|
| `#/spelling` | Spelling | Letters & words | Sees an emoji picture and writes the word, one line per letter. In Croatian and Serbian, the digraphs `lj`, `nj` and `dž` share a single wider line. | Number of problems, max letters per word |
| `#/counting` | Counting | Numbers & size | Counts the emojis scattered in a box and writes the number. | Number of problems, max items (1–20) |
| `#/biggest-smallest` | Biggest & Smallest | Numbers & size | Circles the biggest item in green and the smallest in blue. | Number of problems, max items (3–20) |
| `#/sequence` | Continue the Sequence | Thinking | Sees a pattern repeated twice (e.g. `AAB AAB`) and continues it in empty boxes that fill the rest of the line, up to the edge of the page. | Number of problems, element type (shapes ▲●■ / numbers / letters), items in the pattern (2–5). From 3 items: *exactly N*, or *up to N* (each line picks a length from 2 to N) |
| `#/intruder` | Find the Intruder | Thinking | Sees pictures from one theme (summer, winter, farm animals, fruit, school, transport, sea creatures, clothes, sports) mixed with pictures that clearly don't belong, and circles the intruders. Intruders are hand-picked per theme in `intruder.component.ts`. | Number of problems, theme pictures (3–8), intruders (1–4, always fewer than theme pictures) |
| `#/line` | Complete the Line | Fine motor | Traces a line pattern (zig-zag, waves, arches, cups, castle, sawtooth or loops) drawn twice as a thick line and twice as a dashed line, then continues it to the edge of the page. | Number of problems, shape (*Mixed*, which picks at random per line, or one specific shape), size (small / medium / large), guide lines above and below the pattern (on/off) |
| `#/shadow` | Match the Shadow | Thinking | Draws a line from each coloured picture to its black silhouette. The silhouettes are in a different order, and none sits directly below its own picture. | Number of problems, pairs per problem (3–5), difficulty: *easy* (pictures from different groups, very different shapes) or *hard* (pictures from one group, e.g. all animals, so similar shapes) |
| `#/maze` | Maze | Fine motor | Draws the way from an animal (top-left) to its food (bottom-right), e.g. 🐝 → 🌻. Every maze is randomly generated with exactly one route. Mazes always fit two per A4 page. | Number of mazes, size (5×5 up to 16×16) |
| `#/where` | Where Is It? | Letters & words | Reads a sentence such as *"The cat is **under** the table."* and circles the matching scene. Every scene shows the same character and object in a different position. Objects are drawn as line art so positions are exact, and Croatian/Serbian sentences use the correct case (*na stolu* / *ispod stola*). | Number of problems, pictures per problem (2–4), which position words to include (on / under / next to / above, at least two) |
| `#/copy-pattern` | Copy the Pattern | Fine motor | Copies a line drawing from one dot grid onto an empty one beside it. Drawings are either random shapes (always connected, with no repeated or crossing lines) or one of 20 hand-made recognisable figures (house, boat, fish, heart, rocket, castle, stairs…) defined in `FIGURES`. | Number of problems, grid size (3×3 to 6×6), drawings (random shapes / pictures / mixed), number of lines (random shapes only), diagonal lines (on/off; off also limits pictures to straight-line ones) |
| `#/trace` | Trace the Letters | Letters & words | Traces a letter or number shown as dotted copies on handwriting lines, starting at the coloured dot of each stroke, then writes it alone in the space left at the end of the row. The first copy is solid, with numbered start dots showing the writing order. Letters are hand-drawn single-line strokes (`trace/glyphs.ts`), including Č, Ć, Đ, Š, Ž and the digraphs Dž, Lj, Nj. | Number of problems, what to practise (capital letters / small letters / numbers), order (alphabetical / random), size (small / medium / large), only these letters or numbers (optional, e.g. `b d p`) |
| `#/dot-to-dot` | Dot to Dot | Numbers & size | Joins numbered (or lettered) dots in order to reveal a picture: house, car, boat, star, mushroom, fish, rocket, cat, heart, fir tree, apple or butterfly (`dot-to-dot/dot-figures.ts`). Extra dots are added along the longest edges to reach the chosen count. Pictures are randomly mirrored and fit two per A4 page. | Number of problems, dots marked with (numbers / letters of the current alphabet), number of dots (10–30) |

Every activity page has the same layout: a switcher with every activity, the title, a **settings panel** (language, the activity's own options, **Generate worksheet** and **Print worksheet**), the **preview**, three **tips for grown-ups** and activities to **try next**.

The preview shows the worksheet as **A4 pages, exactly as they print**: rows are measured and spread over pages, a problem is never split across two pages, and the instruction is repeated at the top of every page. Spelling, Counting, Sequence, Intruder, Shadow, Maze, Where Is It? and Dot to Dot rows have a **?** button that shows the answer, and most rows have a **✕** button that removes the row. Both sit beside the paper and are hidden when printing, as are revealed answers.

## Languages

The app currently supports **English, Croatian (Hrvatski) and Serbian (Srpski, Latin script)**. You switch language with the flag picker in the header, the buttons in the languages band on the home page, or the **Language** field in each activity's settings panel. The choice applies to the whole site, including the worksheet content (for example the spelling word list), and is saved in `localStorage`.

Keeping every language complete is a core project rule (see [`.github/copilot-instructions.md`](.github/copilot-instructions.md)). **When you add or change any UI text, update all languages in the same change.**

---

## Tech stack

- **Angular 14** with NgModules and template-driven forms (`FormsModule`)
- **TypeScript 4.7**
- **Karma + Jasmine** for unit tests
- No backend: everything runs in the browser, and worksheets are generated client-side with `Math.random()`
- **Google Fonts**: Bricolage Grotesque, Atkinson Hyperlegible and Andika (linked in `src/index.html`)
- **GitHub Actions → GitHub Pages** for deployment

## Getting started

Prerequisites: Node.js 18 (the version CI uses; newer versions also work) and npm.

```bash
npm ci          # install exact dependency versions from package-lock.json
npm start       # dev server at http://localhost:4200 with live reload
npm run build   # production build into dist/learning-with-toma
npm test        # unit tests in watch mode (Chrome)
npx ng test --watch=false --browsers=ChromeHeadless   # single headless run, as in CI
```

## Project structure

```
src/
├── index.html                   # fonts, theme colour, icons
├── styles.css                   # design tokens (colours, fonts) and shared styles: buttons, settings fields, A4 print setup
├── favicon.svg / favicon.ico / apple-touch-icon.png   # the "t" logo tile
└── app/
    ├── app.module.ts            # declares every component
    ├── app-routing.module.ts    # hash-based routes (useHash: true, needed for GitHub Pages)
    ├── app.component.*          # shell: header, <router-outlet>, footer; new pages start at the top
    ├── i18n/
    │   ├── languages.ts         # LanguageKey type + list of supported languages
    │   ├── translations.ts      # all UI text for every language
    │   └── language.service.ts  # current language, persistence, <html lang>
    ├── activities.ts            # every activity: key, route, category (home cards, switcher, "Try next")
    ├── activity-icon/           # the activities' illustrated icons (activity-icons.ts)
    ├── activity-page/           # layout around every activity: title, settings panel, preview, tips, try next
    ├── activity-nav/            # the activity switcher at the top of each activity page
    ├── worksheet/               # A4 pages, exactly as they print (paginate.ts splits rows over pages)
    ├── header/                  # logo, section links, language picker (language-picker/), Support button
    ├── footer/                  # links, contact e-mail and "Keep it free" (a single line on activity pages)
    ├── home/                    # single-page home; home-sections.ts drives the header menu
    │   ├── hero/                # heading, buttons, example worksheet stack
    │   ├── testimonials/        # testimonials as a scrolling row of notes
    │   ├── about/               # the story, stats and photos
    │   └── help-section/        # "Want to help?": donate, share, feedback, photos
    ├── spelling/                # Spelling activity (includes per-language word banks)
    ├── counting/                # Counting activity
    ├── biggest-smallest/        # Biggest & Smallest activity
    ├── sequence/                # Continue the Sequence activity
    ├── intruder/                # Find the Intruder activity (themes + intruders data)
    ├── line/                    # Complete the Line activity (line pattern geometry)
    ├── shadow/                  # Match the Shadow activity (silhouette-friendly picture groups)
    ├── maze/                    # Maze activity (maze generator and solver)
    ├── where/                   # Where Is It? activity (scenes, noun cases, sentence grammar per language)
    ├── copy-pattern/            # Copy the Pattern activity (dot-grid figure generator)
    ├── trace/                   # Trace the Letters activity (hand-drawn single-line letters and digits)
    └── dot-to-dot/              # Dot to Dot activity (picture outlines, dot spacing, label placement)
brand.json                       # brand guide: colours, fonts, voice, layout, messaging
.github/
├── copilot-instructions.md      # product purpose, audience and contribution rules
└── workflows/deploy.yml         # build + deploy to GitHub Pages on push to main
```

## How translations work

All user-facing text is in [`src/app/i18n/translations.ts`](src/app/i18n/translations.ts). Every dictionary is typed as `Translations`, so a missing key in any language is a **compile error**. A unit test also checks that every language has the same, non-empty keys.

Components inject `LanguageService` and read text in templates through `i18n.t`:

```html
<label for="problemCount">{{ i18n.t.common.numberOfProblems }}</label>
```

Longer texts may mark key phrases in bold with `**…**`, which the `emphasis` pipe turns into `<strong>`. Content that varies by language but isn't plain UI text stays in the activity, keyed by `LanguageKey`. The spelling word bank (`wordBank: Record<LanguageKey, SpellingItem[]>`) is an example. Code reads the active language from `i18n.language`.

### Adding a new language

1. Add the key to `LanguageKey` and an entry to `LANGUAGES` in `i18n/languages.ts`. Use the language's own name as the label (e.g. `Deutsch`), give a BCP 47 code, and add a flag in `src/assets/flags/`.
2. Add a complete dictionary in `i18n/translations.ts` and register it in `TRANSLATIONS`. Words that change with numbers (e.g. the page count) have `one` / `few` / `other` forms, picked with `Intl.PluralRules`.
3. Run `npm run build`. The compiler points to any `Record<LanguageKey, …>` that still needs content, such as the spelling word bank.

## Adding a new activity

1. Generate a component: `npx ng generate component my-activity` (it gets added to `AppModule`).
2. Add a route in `app-routing.module.ts`.
3. Add it to `ACTIVITIES` in `activities.ts` with its **category**, and an icon in `activity-icon/activity-icons.ts` (64×64 SVG markup in the brand's style). This adds the home page card, the switcher entry and "Try next".
4. In **every** language in `translations.ts`, add its `title`/`description` under `activities`, a `benefit` sentence and three tips under `activityInfo`, and its own text (instruction, labels, aria-labels) as a new section.
5. Wrap the page in `<app-activity-page>`. Put the activity's own fields in a `settings` element; the layout adds the language, **Generate worksheet**, **Print worksheet**, tips and "Try next". Use the existing field markup (`.field` with a `<label>`, or `.checkbox-field`) so the fields get the shared look.
6. **Always render the worksheet with the shared `<app-worksheet>` component.** Don't build your own. It lays the rows out on A4 pages exactly as they print, repeats the instruction on every page and keeps each problem on one page:

   ```html
   <app-activity-page activity="myActivity" [hasWorksheet]="generatedItems.length > 0" (generate)="generateProblems()" (print)="printWorksheet()">
     <div settings>
       <div class="field">
         <label for="problemCount">{{ i18n.t.common.numberOfProblems }}</label>
         <input id="problemCount" type="number" min="1" max="100" [(ngModel)]="problemCount" />
       </div>
     </div>

     <app-worksheet *ngIf="generatedItems.length > 0" [instruction]="i18n.t.myActivity.instruction" [items]="generatedItems">
       <ng-template let-item let-i="index">
         <div class="problem-row">
           ...one problem...
           <div class="action-area">
             <button type="button" class="action-button remove-button" (click)="removeItem(i)" [attr.aria-label]="i18n.t.common.removeRow">✕</button>
           </div>
         </div>
       </ng-template>
     </app-worksheet>
   </app-activity-page>
   ```

7. Style the problem row for the A4 sheet: it is the same on screen and on paper, so don't add print-only layout or narrow-screen rules. Only hide revealed answers in `@media print`. Keep a row's height the same wherever it lands on a page (e.g. a line below every row, not between rows), so the pages lay out cleanly.
8. Clamp numeric inputs in code, not only through `min`/`max` attributes, since users can type any value.

## Adding a home page section

The home page is a single page. Each item in the header menu scrolls to one of its sections, and from other pages it goes to `#/#<section-id>`.

1. Create the section as its own component under `home/` (like `hero/`, `testimonials/` or `about/`), with `<section id="my-section" aria-labelledby="…">`, a `.container` inside, an `.eyebrow` and a `.section-title` heading. Alternate backgrounds with the neighbouring sections: white, `var(--soft)`, or the `paper-grid` class.
2. Add it to `home/home.component.html` in the right place.
3. If it belongs in the menu, add `{ id: 'my-section', key: 'mySection' }` to `HOME_SECTIONS` in `home/home-sections.ts` and the label under `menu.items`.
4. Add the section's own text in **every** language in `translations.ts`.

## Design guidelines

[`brand.json`](brand.json) is the brand guide, and [`src/styles.css`](src/styles.css) turns it into CSS variables. Use the variables (`var(--ink)`, `var(--accent)`…) rather than repeating colour values.

- **Colours:** Ink `#1A2238` (text, dark buttons), Muted `#4A5470`, Accent orange `#C2410C` (main buttons, numbers, logo tile), Highlighter yellow `#FFD43B`, Soft yellow `#FFF8D6` (support notes), Heart red `#E5484D`, Soft background `#F6F8FC`, Lines `#E3EAF5`
- **Category colours** (background / text and icon): Letters & words `#E7F0FF` / `#1D4ED8`, Numbers & size `#FFF1E6` / `#C2410C`, Fine motor `#E6F6EC` / `#047857`, Thinking `#F1ECFF` / `#6D28D9`
- **Fonts:** Bricolage Grotesque for headings and the logo, Atkinson Hyperlegible for body text and buttons (17px, line-height 1.6), Andika for handwritten touches and worksheet lettering
- **Shapes:** content up to 1240px wide, cards with 20–24px corners and 1.5px borders, fully rounded buttons and pills, at least 44px for every button, link-button and chip
- **Voice:** warm, clear, encouraging, never clinical or full of jargon

Prefer accessibility and clarity over decoration. Use real `<label>`s, translated `aria-label`s on icon-only buttons, `aria-pressed` / `aria-current` for toggles and the current page, `aria-hidden` on decorative icons, and respect `prefers-reduced-motion`.

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow builds with the default base href `/` (the site is served from the root of the custom domain) and publishes `dist/learning-with-toma` to the `gh-pages` branch. Routing uses hash URLs (`/#/spelling`), so deep links work on GitHub Pages without server rewrites. `src/CNAME` is copied into the build so each deploy keeps the custom domain.

## Contributing

- Make small, focused changes that match the existing style and structure.
- Keep all languages in sync in every change.
- Run the tests before pushing to `main`, because a push deploys straight to production.

## Support

The project is free. If it helps you, you can support it on [Buy Me a Coffee](https://buymeacoffee.com/learningwithtoma).
