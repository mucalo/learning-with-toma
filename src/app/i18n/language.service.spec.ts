import { TestBed } from '@angular/core/testing';
import { LANGUAGES } from './languages';
import { LanguageService } from './language.service';
import { TRANSLATIONS, Translations } from './translations';

function collectKeys(value: object, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' ? collectKeys(child, `${prefix}${key}.`) : [`${prefix}${key}`]
  );
}

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
    service.language = 'english';
  });

  it('should switch translations with the language', () => {
    service.language = 'serbian';
    expect(service.t.activityPage.print).toBe('Odštampajte radni list');
    expect(document.documentElement.lang).toBe('sr-Latn');
    expect(document.title).toBe('Učimo s Tomom');

    service.language = 'english';
    expect(document.title).toBe('Learning with Toma');
  });

  it('should provide a non-empty translation for every key in every language', () => {
    const englishKeys = collectKeys(TRANSLATIONS.english);
    for (const option of LANGUAGES) {
      const dictionary: Translations = TRANSLATIONS[option.value];
      expect(collectKeys(dictionary)).toEqual(englishKeys);
      for (const key of englishKeys) {
        const text = key.split('.').reduce((node: any, part) => node[part], dictionary);
        expect(text).withContext(`${option.value}.${key}`).toBeTruthy();
      }
    }
  });
});
