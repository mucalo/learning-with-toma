import { Translations } from './i18n/translations';

/** Key of an activity's title and description in `Translations['activities']`. */
export type ActivityKey = keyof Translations['activities'];

/** Groups for the filter on the home page; each has its own colours (see `styles.css`). */
export type ActivityCategory = 'letters' | 'numbers' | 'motor' | 'thinking';

export const CATEGORIES: ActivityCategory[] = ['letters', 'numbers', 'motor', 'thinking'];

export interface Activity {
  key: ActivityKey;
  route: string;
  emoji: string;
  category: ActivityCategory;
}

/**
 * Every activity, in the order shown on the home page and in the activity links at the top of
 * each activity page. Add new activities here (and a route in `app-routing.module.ts` and an
 * icon in `activity-icon/activity-icons.ts`).
 */
export const ACTIVITIES: Activity[] = [
  { key: 'spelling', route: '/spelling', emoji: '✏️', category: 'letters' },
  { key: 'counting', route: '/counting', emoji: '🔢', category: 'numbers' },
  { key: 'biggestSmallest', route: '/biggest-smallest', emoji: '📏', category: 'numbers' },
  { key: 'sequence', route: '/sequence', emoji: '🔺', category: 'thinking' },
  { key: 'intruder', route: '/intruder', emoji: '🔍', category: 'thinking' },
  { key: 'line', route: '/line', emoji: '〰️', category: 'motor' },
  { key: 'shadow', route: '/shadow', emoji: '👤', category: 'thinking' },
  { key: 'maze', route: '/maze', emoji: '🧩', category: 'motor' },
  { key: 'where', route: '/where', emoji: '📍', category: 'letters' },
  { key: 'copyPattern', route: '/copy-pattern', emoji: '📐', category: 'motor' },
  { key: 'trace', route: '/trace', emoji: '✍️', category: 'letters' },
  { key: 'dotToDot', route: '/dot-to-dot', emoji: '⭐', category: 'numbers' }
];

/** Whether a router URL (e.g. `/maze` or `/maze#top`) is an activity page. */
export function isActivityUrl(url: string): boolean {
  const path = url.split(/[?#]/)[0];
  return ACTIVITIES.some(activity => activity.route === path);
}
