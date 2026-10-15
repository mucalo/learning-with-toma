import { Translations } from '../i18n/translations';

export interface HomeSection {
  /** Element id of the section on the home page, also used as the URL fragment (`#/#about`). */
  id: string;
  key: keyof Translations['menu']['items'];
}

/** Sections of the home page, in the order they appear in the header menu. */
export const HOME_SECTIONS: HomeSection[] = [
  { id: 'activities', key: 'activities' },
  { id: 'about', key: 'about' }
];

/** Scrolls to a home page section, if it is on the page. Returns whether it was found. */
export function scrollToSection(id: string): boolean {
  const element = document.getElementById(id);
  if (!element) {
    return false;
  }

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  return true;
}
