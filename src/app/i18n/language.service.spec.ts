import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ACTIVITIES, isActivityUrl, pagePath, pageUrl } from '../activities';
import { PageData } from '../page-routing';
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

  const page = (path: string, data: PageData) => ({ path, children: [], data });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          page('', { page: 'home', language: 'english' }),
          page('maze', { page: 'maze', language: 'english' }),
          page('hr', { page: 'home', language: 'croatian' }),
          page('hr/labirint', { page: 'maze', language: 'croatian' })
        ])
      ]
    });
    service = TestBed.inject(LanguageService);
    service.language = 'english';
    localStorage.removeItem('lwt-language');
  });

  afterEach(() => {
    localStorage.removeItem('lwt-language');
  });

  it('should take the language from the address', async () => {
    await TestBed.inject(Router).navigateByUrl('/hr/labirint');
    expect(service.language).toBe('croatian');
    expect(service.homePath).toBe('/hr');
    expect(service.activityPath(ACTIVITIES.find(activity => activity.key === 'maze')!)).toBe('/hr/labirint');

    await TestBed.inject(Router).navigateByUrl('/');
    expect(service.language).toBe('english');
  });

  it('should open the same page in the chosen language, and remember the choice', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/maze');

    service.choose('croatian');
    await new Promise(resolve => setTimeout(resolve));

    expect(router.url).toBe('/hr/labirint');
    expect(service.language).toBe('croatian');
    expect(localStorage.getItem('lwt-language')).toBe('croatian');
  });

  it('should prefer the remembered choice, then the first browser language the site has', () => {
    const languages = spyOnProperty(navigator, 'languages').and.returnValue(['de-DE', 'bs-BA', 'en']);
    expect(service.preferredLanguage()).toBe('serbian');

    languages.and.returnValue(['hr-HR']);
    expect(service.preferredLanguage()).toBe('croatian');

    languages.and.returnValue(['de-DE']);
    expect(service.preferredLanguage()).toBeNull();

    localStorage.setItem('lwt-language', 'english');
    languages.and.returnValue(['hr-HR']);
    expect(service.preferredLanguage()).toBe('english');
  });

  it('should give every page an address in every language, the Croatian and Serbian home pages ending in a slash', () => {
    expect(pagePath('home', 'english')).toBe('/');
    expect(pagePath('maze', 'english')).toBe('/maze');
    expect(pagePath('home', 'serbian')).toBe('/sr');
    expect(pagePath('maze', 'serbian')).toBe('/sr/lavirint');
    expect(pageUrl('home', 'english')).toBe('https://learningwithtoma.com/');
    expect(pageUrl('home', 'croatian')).toBe('https://learningwithtoma.com/hr/');
    expect(pageUrl('maze', 'croatian')).toBe('https://learningwithtoma.com/hr/labirint');

    for (const option of LANGUAGES) {
      const slugs = ACTIVITIES.map(activity => activity.slugs[option.value]);
      expect(new Set(slugs).size).withContext(option.value).toBe(slugs.length);
      expect(slugs.every(slug => /^[a-z]+(-[a-z]+)*$/.test(slug))).withContext(option.value).toBeTrue();
    }
  });

  it('should recognise activity pages in every language', () => {
    expect(isActivityUrl('/maze')).toBeTrue();
    expect(isActivityUrl('/hr/labirint#top')).toBeTrue();
    expect(isActivityUrl('/sr/lavirint')).toBeTrue();
    expect(isActivityUrl('/hr')).toBeFalse();
    expect(isActivityUrl('/')).toBeFalse();
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
