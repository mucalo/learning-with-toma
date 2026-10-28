import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Activity, PageKey, pagePath } from '../activities';
import { PageMetaService } from '../page-meta.service';
import { pageData } from '../page-routing';
import { DEFAULT_LANGUAGE, LANGUAGES, LanguageKey } from './languages';
import { TRANSLATIONS, Translations } from './translations';

/** Where a visitor's own choice of language is remembered; `index.html` reads it too. */
const STORAGE_KEY = 'lwt-language';

/**
 * Single source of truth for the selected language.
 * Components read `t` for UI text and `language` for language-specific content.
 *
 * The address decides the language (`/maze` is English, `/hr/labirint` Croatian). Choosing
 * another language opens the same page in it, and remembers the choice for the next visit.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly languages = LANGUAGES;
  private current: LanguageKey = DEFAULT_LANGUAGE;
  /** The page that is shown, so a new language can open the same page. */
  private page: PageKey = 'home';

  constructor(
    private readonly pageMeta: PageMetaService,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.language = DEFAULT_LANGUAGE;

    // Settled before the page is shown, so it never appears in the wrong language first.
    router.events
      .pipe(filter((event): event is ResolveEnd => event instanceof ResolveEnd))
      .subscribe(event => {
        const data = pageData(event.state.root);
        if (data) {
          this.page = data.page;
          this.language = data.language;
        }
      });
  }

  get language(): LanguageKey {
    return this.current;
  }

  set language(value: LanguageKey) {
    if (!TRANSLATIONS[value]) {
      return;
    }

    this.current = value;

    this.pageMeta.setTitle(TRANSLATIONS[value].header.appTitle);
    this.pageMeta.setDescription(TRANSLATIONS[value].footer.description);

    const option = LANGUAGES.find(language => language.value === value);
    if (option) {
      this.document.documentElement.setAttribute('lang', option.htmlLang);
      this.pageMeta.setLanguage(option);
    }
  }

  get t(): Translations {
    return TRANSLATIONS[this.current];
  }

  /** The visitor picked a language: open the same page in it, and remember it for next time. */
  choose(value: LanguageKey): void {
    this.storeLanguage(value);
    this.router.navigateByUrl(pagePath(this.page, value));
  }

  /** The current language's home page, e.g. for links to its sections (`/hr#about`). */
  get homePath(): string {
    return pagePath('home', this.current);
  }

  activityPath(activity: Activity): string {
    return pagePath(activity.key, this.current);
  }

  /**
   * The language this visitor would like: the one they chose before, or else the first of their
   * browser's languages that the site has. `index.html` makes the same guess, to hide the page
   * while it switches.
   */
  preferredLanguage(): LanguageKey | null {
    const stored = this.readStoredLanguage();
    if (stored) {
      return stored;
    }
    const codes = typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language];
    for (const code of codes) {
      const language = BROWSER_LANGUAGES[code.toLowerCase().split('-')[0]];
      if (language) {
        return language;
      }
    }
    return null;
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

/** Browser language codes and the site language closest to each (Bosnian and Montenegrin read Serbian Latin easily). */
const BROWSER_LANGUAGES: Record<string, LanguageKey> = {
  en: 'english',
  hr: 'croatian',
  sr: 'serbian',
  bs: 'serbian',
  cnr: 'serbian'
};
