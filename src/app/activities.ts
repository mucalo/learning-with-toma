import { LANGUAGES, LanguageKey } from './i18n/languages';
import { Translations } from './i18n/translations';
import { SITE_URL } from './links';

/** Key of an activity's title and description in `Translations['activities']`. */
export type ActivityKey = keyof Translations['activities'];

/** A page of the site: the home page or one of the activities. */
export type PageKey = 'home' | ActivityKey;

/** Groups for the filter on the home page; each has its own colours (see `styles.css`). */
export type ActivityCategory = 'letters' | 'numbers' | 'motor' | 'thinking';

export const CATEGORIES: ActivityCategory[] = ['letters', 'numbers', 'motor', 'thinking'];

export interface Activity {
  key: ActivityKey;
  /** The activity's address in each language, from its title: `maze`, `labirint`, `lavirint`, `labirynt`. */
  slugs: Record<LanguageKey, string>;
  emoji: string;
  category: ActivityCategory;
}

/**
 * Every activity, in the order shown on the home page and in the activity links at the top of
 * each activity page. Add new activities here (and a component in `app-routing.module.ts` and an
 * icon in `activity-icon/activity-icons.ts`).
 */
export const ACTIVITIES: Activity[] = [
  { key: 'spelling', slugs: { english: 'spelling', croatian: 'pisanje-rijeci', serbian: 'pisanje-reci', polish: 'pisanie-wyrazow' }, emoji: '✏️', category: 'letters' },
  { key: 'counting', slugs: { english: 'counting', croatian: 'brojanje', serbian: 'brojanje', polish: 'liczenie' }, emoji: '🔢', category: 'numbers' },
  { key: 'biggestSmallest', slugs: { english: 'biggest-smallest', croatian: 'najvece-i-najmanje', serbian: 'najvece-i-najmanje', polish: 'najwieksze-i-najmniejsze' }, emoji: '📏', category: 'numbers' },
  { key: 'sequence', slugs: { english: 'sequence', croatian: 'nastavi-niz', serbian: 'nastavi-niz', polish: 'dokoncz-rytm' }, emoji: '🔺', category: 'thinking' },
  { key: 'intruder', slugs: { english: 'intruder', croatian: 'pronadji-uljeza', serbian: 'pronadji-uljeza', polish: 'znajdz-intruza' }, emoji: '🔍', category: 'thinking' },
  { key: 'line', slugs: { english: 'line', croatian: 'dovrsi-crtu', serbian: 'dovrsi-liniju', polish: 'dokoncz-szlaczek' }, emoji: '〰️', category: 'motor' },
  { key: 'shadow', slugs: { english: 'shadow', croatian: 'pronadji-sjenu', serbian: 'pronadji-senku', polish: 'dopasuj-cien' }, emoji: '👤', category: 'thinking' },
  { key: 'maze', slugs: { english: 'maze', croatian: 'labirint', serbian: 'lavirint', polish: 'labirynt' }, emoji: '🧩', category: 'motor' },
  { key: 'where', slugs: { english: 'where', croatian: 'gdje-je', serbian: 'gde-je', polish: 'gdzie-to-jest' }, emoji: '📍', category: 'letters' },
  { key: 'copyPattern', slugs: { english: 'copy-pattern', croatian: 'precrtaj-uzorak', serbian: 'precrtaj-obrazac', polish: 'przerysuj-wzor' }, emoji: '📐', category: 'motor' },
  { key: 'trace', slugs: { english: 'trace', croatian: 'prati-slova', serbian: 'prati-slova', polish: 'pisz-po-sladzie' }, emoji: '✍️', category: 'letters' },
  { key: 'dotToDot', slugs: { english: 'dot-to-dot', croatian: 'spoji-tockice', serbian: 'spoji-tackice', polish: 'polacz-kropki' }, emoji: '⭐', category: 'numbers' }
];

/** A page's path in a language, for links: `/`, `/maze`, `/hr` (Croatian home), `/hr/labirint`. */
export function pagePath(page: PageKey, language: LanguageKey): string {
  const prefix = LANGUAGES.find(option => option.value === language)?.path ?? '';
  const slug = ACTIVITIES.find(activity => activity.key === page)?.slugs[language] ?? '';
  return `/${[prefix, slug].filter(Boolean).join('/')}`;
}

/**
 * A page's full address on the live site. The Croatian and Serbian home pages end in a slash
 * (`/hr/`): they are folders on GitHub Pages, next to their activity pages.
 */
export function pageUrl(page: PageKey, language: LanguageKey): string {
  const path = pagePath(page, language).slice(1);
  return SITE_URL + (page === 'home' && path ? `${path}/` : path);
}

/** Whether a router URL (e.g. `/maze`, `/hr/labirint` or `/maze#top`) is an activity page. */
export function isActivityUrl(url: string): boolean {
  const path = url.split(/[?#]/)[0];
  return ACTIVITIES.some(activity => LANGUAGES.some(language => pagePath(activity.key, language.value) === path));
}
