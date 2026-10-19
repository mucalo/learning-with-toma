/**
 * Supported languages.
 *
 * To add a new language:
 *  1. Add its key to `LanguageKey` and an entry to `LANGUAGES`.
 *  2. Add a full dictionary for it in `translations.ts` (TypeScript will flag any missing keys).
 *  3. Add language-specific content (e.g. the spelling word bank) where the compiler asks for it.
 */
export type LanguageKey = 'english' | 'croatian' | 'serbian';

export interface LanguageOption {
  value: LanguageKey;
  /** Name of the language written in that language, so users can always find their own. */
  label: string;
  /** Short code shown on the language button in the header. */
  shortLabel: string;
  /** Flag icon shown in the language picker. */
  flag: string;
  /** BCP 47 code used for the `<html lang>` attribute. */
  htmlLang: string;
}

export const LANGUAGES: LanguageOption[] = [
  { value: 'english', label: 'English', shortLabel: 'EN', flag: 'assets/flags/gb.svg', htmlLang: 'en' },
  { value: 'croatian', label: 'Hrvatski', shortLabel: 'HR', flag: 'assets/flags/hr.svg', htmlLang: 'hr' },
  { value: 'serbian', label: 'Srpski', shortLabel: 'SR', flag: 'assets/flags/rs.svg', htmlLang: 'sr-Latn' }
];

export const DEFAULT_LANGUAGE: LanguageKey = 'english';
