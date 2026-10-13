import { Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE, LANGUAGES, LanguageKey } from './languages';
import { TRANSLATIONS, Translations } from './translations';

const STORAGE_KEY = 'lwt-language';

/**
 * Single source of truth for the selected language.
 * Components read `t` for UI text and `language` for language-specific content.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly languages = LANGUAGES;
  private current: LanguageKey = DEFAULT_LANGUAGE;

  constructor() {
    this.language = this.readStoredLanguage() ?? DEFAULT_LANGUAGE;
  }

  get language(): LanguageKey {
    return this.current;
  }

  set language(value: LanguageKey) {
    if (!TRANSLATIONS[value]) {
      return;
    }

    this.current = value;
    this.storeLanguage(value);

    const option = LANGUAGES.find(language => language.value === value);
    if (option && typeof document !== 'undefined') {
      document.documentElement.lang = option.htmlLang;
    }
  }

  get t(): Translations {
    return TRANSLATIONS[this.current];
  }

  private readStoredLanguage(): LanguageKey | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LanguageKey | null;
      return stored && TRANSLATIONS[stored] ? stored : null;
    } catch {
      return null;
    }
  }

  private storeLanguage(value: LanguageKey): void {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the choice just won't persist.
    }
  }
}
