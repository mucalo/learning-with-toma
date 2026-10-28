import { TestBed } from '@angular/core/testing';
import { LANGUAGES } from './i18n/languages';
import { PageMetaService } from './page-meta.service';

describe('PageMetaService', () => {
  let pageMeta: PageMetaService;

  function attribute(selector: string, name: string): string | null {
    return document.head.querySelector(selector)?.getAttribute(name) ?? null;
  }

  beforeEach(() => {
    pageMeta = TestBed.inject(PageMetaService);
  });

  afterEach(() => {
    pageMeta.setStructuredData(null);
  });

  it('should set the title for the browser and for link previews', () => {
    pageMeta.setTitle('Learning with Toma - Maze');
    expect(document.title).toBe('Learning with Toma - Maze');
    expect(attribute('meta[property="og:title"]', 'content')).toBe('Learning with Toma - Maze');
  });

  it('should set the description for search results and for link previews', () => {
    pageMeta.setDescription('Find the way through the maze.');
    expect(pageMeta.description).toBe('Find the way through the maze.');
    expect(attribute('meta[property="og:description"]', 'content')).toBe('Find the way through the maze.');
  });

  it('should give the page its address, for search engines and link previews', () => {
    pageMeta.setUrl('https://learningwithtoma.com/maze');
    expect(attribute('link[rel="canonical"]', 'href')).toBe('https://learningwithtoma.com/maze');
    expect(attribute('meta[property="og:url"]', 'content')).toBe('https://learningwithtoma.com/maze');

    pageMeta.setUrl('https://learningwithtoma.com/');
    expect(attribute('link[rel="canonical"]', 'href')).toBe('https://learningwithtoma.com/');
    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
  });

  it('should link the page\'s translations, replacing those of the previous page', () => {
    pageMeta.setTranslations([{ hreflang: 'en', url: 'https://learningwithtoma.com/maze' }, { hreflang: 'hr', url: 'https://learningwithtoma.com/hr/labirint' }]);
    pageMeta.setTranslations([{ hreflang: 'en', url: 'https://learningwithtoma.com/trace' }, { hreflang: 'hr', url: 'https://learningwithtoma.com/hr/prati-slova' }]);

    const links = Array.from(document.head.querySelectorAll('link[rel="alternate"][hreflang]'));
    expect(links.map(link => [link.getAttribute('hreflang'), link.getAttribute('href')])).toEqual([
      ['en', 'https://learningwithtoma.com/trace'],
      ['hr', 'https://learningwithtoma.com/hr/prati-slova']
    ]);
  });

  it('should show the preview image and locale of the page\'s language', () => {
    pageMeta.setLanguage(LANGUAGES.find(language => language.value === 'croatian')!);
    expect(attribute('meta[property="og:locale"]', 'content')).toBe('hr_HR');
    expect(attribute('meta[property="og:image"]', 'content')).toBe('https://learningwithtoma.com/og-image-hr.png');
    expect(attribute('meta[property="og:image:width"]', 'content')).toBe('1200');
  });

  it('should add, replace and remove the page\'s structured data', () => {
    pageMeta.setStructuredData({ '@type': 'LearningResource', name: 'Maze' });
    pageMeta.setStructuredData({ '@type': 'LearningResource', name: 'Trace </script>' });

    const scripts = document.head.querySelectorAll('script#page-data');
    expect(scripts.length).toBe(1);
    expect(scripts[0].getAttribute('type')).toBe('application/ld+json');
    expect(scripts[0].textContent).not.toContain('</script>');
    expect(JSON.parse(scripts[0].textContent ?? '')).toEqual({ '@type': 'LearningResource', name: 'Trace </script>' });

    pageMeta.setStructuredData(null);
    expect(document.head.querySelector('script#page-data')).toBeNull();
  });
});
