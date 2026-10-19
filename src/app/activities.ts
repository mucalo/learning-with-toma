import { Translations } from './i18n/translations';

export interface Activity {
  /** Key of the activity's title and description in `Translations['activities']`. */
  key: keyof Translations['activities'];
  route: string;
  emoji: string;
}

/**
 * Every activity, in the order shown on the home page, in the header's Activities menu and in the
 * activity links at the top of each activity page. Add new activities here (and a route in
 * `app-routing.module.ts`).
 */
export const ACTIVITIES: Activity[] = [
  { key: 'spelling', route: '/spelling', emoji: '✏️' },
  { key: 'counting', route: '/counting', emoji: '🔢' },
  { key: 'biggestSmallest', route: '/biggest-smallest', emoji: '📏' },
  { key: 'sequence', route: '/sequence', emoji: '🔺' },
  { key: 'intruder', route: '/intruder', emoji: '🔍' },
  { key: 'line', route: '/line', emoji: '〰️' },
  { key: 'shadow', route: '/shadow', emoji: '👤' },
  { key: 'maze', route: '/maze', emoji: '🧩' },
  { key: 'where', route: '/where', emoji: '📍' },
  { key: 'copyPattern', route: '/copy-pattern', emoji: '📐' },
  { key: 'trace', route: '/trace', emoji: '✍️' },
  { key: 'dotToDot', route: '/dot-to-dot', emoji: '⭐' }
];
