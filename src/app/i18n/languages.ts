/**
 * Supported languages.
 *
 * To add a new language:
 *  1. Add its key to `LanguageKey` and an entry to `LANGUAGES`.
 *  2. Add a full dictionary for it in `translations.ts` (TypeScript will flag any missing keys).
 *  3. Add language-specific content (e.g. the spelling word bank) where the compiler asks for it.
 *  4. Give every activity an address in it (`slugs` in `activities.ts`).
 */
export type LanguageKey = 'english' | 'croatian' | 'serbian' | 'polish';

export interface LanguageOption {
  value: LanguageKey;
  /** Name of the language written in that language, so users can always find their own. */
  label: string;
  /** Short code shown on the language button in the header. */
  shortLabel: string;
  /** Flag icon shown in the language picker. */
  flag: string;
  /** BCP 47 code used for the `<html lang>` attribute and to link the translations of a page. */
  htmlLang: string;
  /** First part of the language's addresses (`hr` in `/hr/labirint`); empty at the root. */
  path: string;
  /** Language and country for link previews (Open Graph). */
  ogLocale: string;
  /** Link preview image, with the text in this language (made from `scripts/og-image.html`). */
  ogImage: string;
}

export const LANGUAGES: LanguageOption[] = [
  { value: 'english', label: 'English', shortLabel: 'EN', flag: 'assets/flags/gb.svg', htmlLang: 'en', path: '', ogLocale: 'en_GB', ogImage: 'og-image.png' },
  { value: 'croatian', label: 'Hrvatski', shortLabel: 'HR', flag: 'assets/flags/hr.svg', htmlLang: 'hr', path: 'hr', ogLocale: 'hr_HR', ogImage: 'og-image-hr.png' },
  { value: 'serbian', label: 'Srpski', shortLabel: 'SR', flag: 'assets/flags/rs.svg', htmlLang: 'sr-Latn', path: 'sr', ogLocale: 'sr_RS', ogImage: 'og-image-sr.png' },
  { value: 'polish', label: 'Polski', shortLabel: 'PL', flag: 'assets/flags/pl.svg', htmlLang: 'pl', path: 'pl', ogLocale: 'pl_PL', ogImage: 'og-image-pl.png' }
];

/** The language of the pages at the root of the site, and of new visitors with no preference. */
export const DEFAULT_LANGUAGE: LanguageKey = 'english';
