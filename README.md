# Learning with Toma

**Beautiful learning activities in seconds.**

Learning with Toma is a free web app that generates small, printable worksheets for children, especially children with neurodevelopmental differences such as autism (ASD), ADHD, dyslexia, dyspraxia and dysgraphia.

You choose an activity, set a few options and click **Generate**. The app creates a fresh randomized worksheet that can be completed on screen or printed.

**Who it's for:** speech-language pathologists and therapists, special-education teachers, kindergarten and early-childhood educators, psychologists, and parents.

The site is deployed to GitHub Pages at `/learning-with-toma/`.

---

## Activities

| Route | Activity | What the child does | Options |
|---|---|---|---|
| `#/spelling` | Spelling | Sees an emoji picture and writes the word, one line per letter. In Croatian and Serbian, the digraphs `lj`, `nj` and `dž` share a single wider line. | Number of problems, max letters per word |
| `#/counting` | Counting | Counts the emojis scattered in a box and writes the number. | Number of problems, max items (1–20) |
| `#/biggest-smallest` | Biggest & Smallest | Circles the biggest item in green and the smallest in blue. | Number of problems, max items (3–20) |
| `#/sequence` | Continue the Sequence | Sees a pattern repeated twice (e.g. `AAB AAB`) and continues it for three more repeats in empty boxes, which wrap onto extra lines as needed. | Number of problems, element type (shapes ▲●■ / numbers / letters), items in the pattern (2–5). From 3 items: *exactly N*, or *up to N* (each line picks a length from 2 to N) |

Every worksheet has a **Print** button. The header, footer and on-screen controls are hidden when printing, the instruction is repeated at the top of every printed page, and a problem is never split across two pages. Spelling, Counting and Sequence rows also have a **?** button that shows the answer and a **✕** button that removes the row.

## Languages

The app currently supports **English, Croatian (Hrvatski) and Serbian (Srpski, Latin script)**. You switch language with the selector in the header. The choice applies to the whole site, including the worksheet content (for example the spelling word list), and is saved in `localStorage`.

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
    ├── header/                  # title, subtitle, language selector, donate link
    ├── footer/                  # donation message
    ├── home/                    # grid of activity cards
    ├── spelling/                # Spelling activity (includes per-language word banks)
    ├── counting/                # Counting activity
    ├── biggest-smallest/        # Biggest & Smallest activity
    ├── sequence/                # Continue the Sequence activity
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
3. Add a card to `activities` in `home/home.component.ts`, and its `title`/`description` under `activities` in **every** language in `translations.ts`.
4. Add the activity's own text (instruction, labels, aria-labels) as a new section of `Translations`.
5. Follow the existing activities' pattern: a back link, a `.controls` bar (number of problems, a difficulty option, **Generate**, **Print**), then the worksheet itself.
6. **Always render the worksheet with the shared `<app-worksheet>` component.** Don't build your own. It puts the instruction at the top of every printed page and keeps each problem on one page:

   ```html
   <app-worksheet *ngIf="generatedItems.length > 0" [instruction]="i18n.t.myActivity.instruction" [items]="generatedItems">
     <ng-template let-item let-i="index">
       <div class="problem-row">...one problem...</div>
     </ng-template>
   </app-worksheet>
   ```

7. Clamp numeric inputs in code, not only through `min`/`max` attributes, since users can type any value.

## Design guidelines

[`brand.json`](brand.json) is the source of truth for the look and feel:

- **Colours:** Sky Blue `#5B8DEF` (primary), Soft Coral `#F28C82` (secondary/print), Warm Cream `#FFF9F3` (background), Slate `#2F3B45` (text)
- **Fonts:** Nunito for headings and buttons, Inter for body text
- **Voice:** warm, clear, encouraging, never clinical or full of jargon
- **UI:** minimal, generous white space, rounded corners (8/16/24 px), large rounded buttons, subtle animations

Prefer accessibility and clarity over decoration. Use real `<label>`s, translated `aria-label`s on icon-only buttons, and `aria-hidden` on decorative emoji.

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow builds with `--base-href /learning-with-toma/` and publishes `dist/learning-with-toma` to the `gh-pages` branch. Routing uses hash URLs (`/#/spelling`), so deep links work on GitHub Pages without server rewrites.

## Contributing

- Make small, focused changes that match the existing style and structure.
- Keep all languages in sync in every change.
- Run the tests before pushing to `main`, because a push deploys straight to production.

## Support

The project is free. If it helps you, you can support it on [Buy Me a Coffee](https://buymeacoffee.com/mariomucalo).
