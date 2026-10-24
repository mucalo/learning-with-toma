# Learning with Toma

**Beautiful learning activities in seconds.**

Learning with Toma is a free web app that generates small, printable worksheets for children, especially children with neurodevelopmental differences such as autism (ASD), ADHD, dyslexia, dyspraxia and dysgraphia.

You choose an activity, set a few options and click **Generate**. The app creates a fresh randomized worksheet that can be completed on screen or printed.

**Who it's for:** speech-language pathologists and therapists, special-education teachers, kindergarten and early-childhood educators, psychologists, and parents.

The site is deployed to GitHub Pages at [learningwithtoma.com](https://learningwithtoma.com) (custom domain, served from the root).

---

## Activities

| Route | Activity | What the child does | Options |
|---|---|---|---|
| `#/spelling` | Spelling | Sees an emoji picture and writes the word, one line per letter. In Croatian and Serbian, the digraphs `lj`, `nj` and `dž` share a single wider line. | Number of problems, max letters per word |
| `#/counting` | Counting | Counts the emojis scattered in a box and writes the number. | Number of problems, max items (1–20) |
| `#/biggest-smallest` | Biggest & Smallest | Circles the biggest item in green and the smallest in blue. | Number of problems, max items (3–20) |
| `#/sequence` | Continue the Sequence | Sees a pattern repeated twice (e.g. `AAB AAB`) and continues it in empty boxes that fill the rest of the line, up to the edge of the page. | Number of problems, element type (shapes ▲●■ / numbers / letters), items in the pattern (2–5). From 3 items: *exactly N*, or *up to N* (each line picks a length from 2 to N) |
| `#/intruder` | Find the Intruder | Sees pictures from one theme (summer, winter, farm animals, fruit, school, transport, sea creatures, clothes, sports) mixed with pictures that clearly don't belong, and circles the intruders. Intruders are hand-picked per theme in `intruder.component.ts`. | Number of problems, theme pictures (3–8), intruders (1–4, always fewer than theme pictures) |
| `#/line` | Complete the Line | Traces a line pattern (zig-zag, waves, arches, cups, castle, sawtooth or loops) drawn twice as a thick line and twice as a dashed line, then continues it to the edge of the page. | Number of problems, shape (*Mixed*, which picks at random per line, or one specific shape), size (small / medium / large), guide lines above and below the pattern (on/off) |
| `#/shadow` | Match the Shadow | Draws a line from each coloured picture to its black silhouette. The silhouettes are in a different order, and none sits directly below its own picture. | Number of problems, pairs per problem (3–5), difficulty: *easy* (pictures from different groups, very different shapes) or *hard* (pictures from one group, e.g. all animals, so similar shapes) |
| `#/maze` | Maze | Draws the way from an animal (top-left) to its food (bottom-right), e.g. 🐝 → 🌻. Every maze is randomly generated with exactly one route. Mazes always print two per A4 page. | Number of mazes, size (5×5 up to 16×16) |
| `#/where` | Where Is It? | Reads a sentence such as *"The cat is under the table."* and circles the matching scene. Every scene shows the same character and object in a different position. Objects are drawn as line art so positions are exact, and Croatian/Serbian sentences use the correct case (*na stolu* / *ispod stola*). | Number of problems, pictures per problem (2–4), which position words to include (on / under / next to / above, at least two) |
| `#/copy-pattern` | Copy the Pattern | Copies a line drawing from one dot grid onto an empty one beside it. Drawings are either random shapes (always connected, with no repeated or crossing lines) or one of 20 hand-made recognisable figures (house, boat, fish, heart, rocket, castle, stairs…) defined in `FIGURES`. | Number of problems, grid size (3×3 to 6×6), drawings (random shapes / pictures / mixed), number of lines (random shapes only), diagonal lines (on/off; off also limits pictures to straight-line ones) |
| `#/trace` | Trace the Letters | Traces a letter or number shown as dotted copies on handwriting lines, starting at the coloured dot of each stroke, then writes it alone in the space left at the end of the row. The first copy is solid, with numbered start dots showing the writing order. Letters are hand-drawn single-line strokes (`trace/glyphs.ts`), including Č, Ć, Đ, Š, Ž and the digraphs Dž, Lj, Nj. | Number of problems, what to practise (capital letters / small letters / numbers), order (alphabetical / random), size (small / medium / large), only these letters or numbers (optional, e.g. `b d p`) |
| `#/dot-to-dot` | Dot to Dot | Joins numbered (or lettered) dots in order to reveal a picture: house, car, boat, star, mushroom, fish, rocket, cat, heart, fir tree, apple or butterfly (`dot-to-dot/dot-figures.ts`). Extra dots are added along the longest edges to reach the chosen count. Pictures are randomly mirrored and print two per A4 page. | Number of problems, dots marked with (numbers / letters of the current alphabet), number of dots (10–30) |

Every worksheet has a **Print** button. The header, footer and on-screen controls are hidden when printing, the instruction is repeated at the top of every printed page, and a problem is never split across two pages. Spelling, Counting, Sequence, Intruder, Shadow, Maze, Where Is It? and Dot to Dot rows also have a **?** button that shows the answer. Those rows, Complete the Line, Copy the Pattern and Trace the Letters rows have a **✕** button that removes the row.

## Languages

The app currently supports **English, Croatian (Hrvatski) and Serbian (Srpski, Latin script)**. You switch language with the flag button in the header. The choice applies to the whole site, including the worksheet content (for example the spelling word list), and is saved in `localStorage`.

Keeping every language complete is a core project rule (see [`.github/copilot-instructions.md`](.github/copilot-instructions.md)). **When you add or change any UI text, update all languages in the same change.**

---

## Tech stack

- **Angular 14** with NgModules and template-driven forms (`FormsModule`)
- **TypeScript 4.7**
- **Karma + Jasmine** for unit tests
- No backend: everything runs in the browser, and worksheets are generated client-side with `Math.random()`
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
├── index.html
└── app/
    ├── app.module.ts            # declares every component
    ├── app-routing.module.ts    # hash-based routes (useHash: true, needed for GitHub Pages)
    ├── app.component.*          # shell: header, <router-outlet>, footer; print rules
    ├── i18n/
    │   ├── languages.ts         # LanguageKey type + list of supported languages
    │   ├── translations.ts      # all UI text for every language
    │   └── language.service.ts  # current language, persistence, <html lang>
    ├── activities.ts            # the list of activities (home cards, header dropdown, activity links)
    ├── activity-nav/            # links to every activity at the top of each activity page
    ├── header/                  # title, menu with Activities dropdown, language picker (language-picker/), donate link
    ├── footer/                  # donation message
    ├── home/                    # single-page home: activities, About, Want to help? (help-section/), Contact; home-sections.ts drives the menu
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
    ├── dot-to-dot/              # Dot to Dot activity (picture outlines, dot spacing, label placement)
    └── worksheet/               # shared worksheet layout (instruction on every printed page)
brand.json                       # brand guide: colours, fonts, voice, mascot
.github/
├── copilot-instructions.md      # product purpose, audience and contribution rules
└── workflows/deploy.yml         # build + deploy to GitHub Pages on push to main
```

## How translations work

All user-facing text is in [`src/app/i18n/translations.ts`](src/app/i18n/translations.ts). Every dictionary is typed as `Translations`, so a missing key in any language is a **compile error**. A unit test also checks that every language has the same, non-empty keys.

Components inject `LanguageService` and read text in templates through `i18n.t`:

```html
<button (click)="generateProblems()">{{ i18n.t.common.generate }}</button>
```

Content that varies by language but isn't plain UI text stays in the activity, keyed by `LanguageKey`. The spelling word bank (`wordBank: Record<LanguageKey, SpellingItem[]>`) is an example. Code reads the active language from `i18n.language`.

### Adding a new language

1. Add the key to `LanguageKey` and an entry to `LANGUAGES` in `i18n/languages.ts`. Use the language's own name as the label (e.g. `Deutsch`) and give a BCP 47 code.
2. Add a complete dictionary in `i18n/translations.ts` and register it in `TRANSLATIONS`.
3. Run `npm run build`. The compiler points to any `Record<LanguageKey, …>` that still needs content, such as the spelling word bank.

## Adding a new activity

1. Generate a component: `npx ng generate component my-activity` (it gets added to `AppModule`).
2. Add a route in `app-routing.module.ts`.
3. Add it to `ACTIVITIES` in `activities.ts` (this adds the home page card, the header dropdown entry and the activity link), and its `title`/`description` under `activities` in **every** language in `translations.ts`.
4. Add the activity's own text (instruction, labels, aria-labels) as a new section of `Translations`.
5. Follow the existing activities' pattern: `<app-activity-nav>` (links to every activity), a `.controls` bar (number of problems, a difficulty option, **Generate**, **Print**), then the worksheet itself.
6. **Always render the worksheet with the shared `<app-worksheet>` component.** Don't build your own. It puts the instruction at the top of every printed page and keeps each problem on one page:

   ```html
   <app-worksheet *ngIf="generatedItems.length > 0" [instruction]="i18n.t.myActivity.instruction" [items]="generatedItems">
     <ng-template let-item let-i="index">
       <div class="problem-row">...one problem...</div>
     </ng-template>
   </app-worksheet>
   ```

7. Clamp numeric inputs in code, not only through `min`/`max` attributes, since users can type any value.

## Adding a home page section

The home page is a single page. Each item in the header menu scrolls to one of its sections, and from other pages it goes to `#/#<section-id>`.

1. Add a `<section id="my-section" class="home-section my-section">` with a `section-inner` wrapper and a `section-heading` to `home/home.component.html`. Sections alternate between the cream page background and soft blue (`#eef4fd`), so give `.my-section` the blue background in `home.component.css` if the section above it is cream.
2. Add `{ id: 'my-section', key: 'mySection' }` to `HOME_SECTIONS` in `home/home-sections.ts`.
3. Add the menu label under `menu.items`, and the section's own text, in **every** language in `translations.ts`.

## Design guidelines

[`brand.json`](brand.json) is the source of truth for the look and feel:

- **Colours:** Sky Blue `#5B8DEF` (primary), Soft Coral `#F28C82` (secondary/print), Warm Cream `#FFF9F3` (background), Slate `#2F3B45` (text)
- **Fonts:** Nunito for headings and buttons, Inter for body text
- **Voice:** warm, clear, encouraging, never clinical or full of jargon
- **UI:** minimal, generous white space, rounded corners (8/16/24 px), large rounded buttons, subtle animations

Prefer accessibility and clarity over decoration. Use real `<label>`s, translated `aria-label`s on icon-only buttons, and `aria-hidden` on decorative emoji.

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow builds with the default base href `/` (the site is served from the root of the custom domain) and publishes `dist/learning-with-toma` to the `gh-pages` branch. Routing uses hash URLs (`/#/spelling`), so deep links work on GitHub Pages without server rewrites. `src/CNAME` is copied into the build so each deploy keeps the custom domain.

## Contributing

- Make small, focused changes that match the existing style and structure.
- Keep all languages in sync in every change.
- Run the tests before pushing to `main`, because a push deploys straight to production.

## Support

The project is free. If it helps you, you can support it on [Buy Me a Coffee](https://buymeacoffee.com/learningwithtoma).
