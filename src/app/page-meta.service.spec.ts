import { TestBed } from '@angular/core/testing';
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

  it('should give the page its address on the live site, for search engines and link previews', () => {
    pageMeta.setPath('/maze');
    expect(attribute('link[rel="canonical"]', 'href')).toBe('https://learningwithtoma.com/maze');
    expect(attribute('meta[property="og:url"]', 'content')).toBe('https://learningwithtoma.com/maze');

    pageMeta.setPath('/');
    expect(attribute('link[rel="canonical"]', 'href')).toBe('https://learningwithtoma.com/');
    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
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
