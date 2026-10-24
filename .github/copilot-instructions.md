# Copilot Instructions for Learning with Toma

## Project purpose
Learning with Toma (Učimo s Tomom in Croatian and Serbian) is a free website where users generate small, printable worksheets — tasks, problems and exercises — for children aged 4–7, especially neurodivergent children. Tagline: "Printable worksheets for little learners, ready in seconds."

## Target audience
- Parents, including parents of neurodivergent children
- Kindergarten and Early Childhood Educators, and teachers
- Special Education Teachers
- Speech-Language Pathologists (SLPs), Speech and Language Therapists (SLTs) and other speech and language professionals
- Psychologists and other professionals working with neurodivergent children

## Targeted conditions
- Autism Spectrum Disorder (ASD)
- Attention Deficit Hyperactivity Disorder (ADHD)
- Dyslexia
- Dyspraxia
- Dysgraphia

## Main goals
- Provide a user-friendly platform for generating small tasks, problems, or exercises for children.
- Offer a variety of task types and difficulty levels to cater to different needs and abilities.
- Keep the site free; support comes from donations ("Want to help?" on the home page).

## Multi-lingual support
- The website should support multiple languages to accommodate users from different linguistic backgrounds.
- Languages available should be easily selectable and switchable by the user.
- Languages available are: English, Croatian, Serbian (Latin script)
- Whenever any changes are made, always make sure that the translations are updated accordingly.
- Whenever any changes are made or new features are added, always make sure it is architecturally easy to add new languages in the future.

## Brand and design
- `brand.json` is the brand guide; `src/styles.css` turns it into CSS variables. Use the variables (`var(--ink)`, `var(--accent)`, `var(--letters-bg)`…) instead of repeating colour values.
- Colours: Ink `#1A2238`, accent orange `#C2410C`, highlighter yellow `#FFD43B`, soft yellow `#FFF8D6`, soft background `#F6F8FC`; each activity category (Letters & words, Numbers & size, Fine motor, Thinking) has its own background and ink colour.
- Fonts: Bricolage Grotesque for headings, Atkinson Hyperlegible for body text and buttons, Andika for handwritten touches and worksheet lettering.
- Cards have 20–24px corners and 1.5px borders; buttons and pills are fully rounded; every button, link-button and chip is at least 44px.
- Voice: warm, clear, encouraging; never clinical, corporate or full of jargon.
- Photos never show a recognisable child.

## Activity pages and worksheets
- Every activity page uses `<app-activity-page>` (`src/app/activity-page/`), with the activity's own fields in its `settings` slot. Each activity needs a category in `activities.ts`, an icon in `activity-icon/activity-icons.ts`, and a benefit sentence and three tips for grown-ups in `activityInfo` in every language.
- Every exercise must render its worksheet with the shared `<app-worksheet>` component (`src/app/worksheet/`). It shows the worksheet as A4 pages exactly as they print: the instruction repeats at the top of every page and problems are never split across pages.
- Worksheets look the same on screen and on paper: no print-only layout and no narrow-screen rules inside a worksheet. Only buttons and revealed answers are hidden when printing. Keep each problem row equally tall wherever it lands on a page.

## Preferred approach
- Make small, focused improvements rather than unnecessary changes.
- Preserve consistency with the existing style and structure.
- Favor accessibility, clarity, and usefulness over visual clutter: real labels, translated aria-labels, and respect for reduced motion.

## Notes
If the website’s goals, audience or design change, update this file, `brand.json` and the README so future changes stay aligned with the intended direction.
