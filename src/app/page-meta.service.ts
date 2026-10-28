import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageOption } from './i18n/languages';
import { SITE_URL } from './links';

/**
 * What the page says about itself to browsers, search engines and link previews (WhatsApp,
 * Facebook, Viber…): its title, description, address, translations, language and structured
 * data. Each is written both as the standard tag and as its Open Graph twin, which link
 * previews read.
 *
 * The parts that are the same on every page (site name, preview type) are in `index.html`.
 */
@Injectable({ providedIn: 'root' })
export class PageMetaService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  setTitle(text: string): void {
    this.title.setTitle(text);
    this.meta.updateTag({ property: 'og:title', content: text });
  }

  get description(): string | null {
    return this.meta.getTag('name="description"')?.content ?? null;
  }

  setDescription(text: string): void {
    this.meta.updateTag({ name: 'description', content: text });
    this.meta.updateTag({ property: 'og:description', content: text });
  }

  /** The page's own address on the live site (the canonical link). */
  setUrl(url: string): void {
    this.headElement('link', 'canonical', 'rel').setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  /**
   * The same page in every language (`hreflang` links), so search engines show each visitor the
   * one in their language. `x-default` is for everyone else.
   */
  setTranslations(urls: { hreflang: string; url: string }[]): void {
    this.document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    for (const { hreflang, url } of urls) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }

  /** The preview's locale, and its image with the text in this language. */
  setLanguage(language: LanguageOption): void {
    this.meta.updateTag({ property: 'og:locale', content: language.ogLocale });
    // The size has to follow the image it belongs to.
    this.meta.updateTag({ property: 'og:image', content: SITE_URL + language.ogImage });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
  }

  /**
   * Structured data (schema.org JSON-LD) about this page in particular, or `null` to remove it.
   * What is true of every page, the site itself, is in `index.html`.
   */
  setStructuredData(data: object | null): void {
    const existing = this.document.head.querySelector('script#page-data');
    if (!data) {
      existing?.remove();
      return;
    }
    const script = this.headElement('script', 'page-data', 'id');
    script.setAttribute('type', 'application/ld+json');
    // "<" written as <, so no text can ever close the script element early.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }

  /** The head element with the given attribute value, created if it isn't there yet. */
  private headElement(tag: string, value: string, attribute: string): Element {
    let element = this.document.head.querySelector(`${tag}[${attribute}="${value}"]`);
    if (!element) {
      element = this.document.createElement(tag);
      element.setAttribute(attribute, value);
      this.document.head.appendChild(element);
    }
    return element;
  }
}
