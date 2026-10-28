import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_URL } from './links';

/**
 * What the page says about itself to browsers, search engines and link previews (WhatsApp,
 * Facebook, Viber…): its title, description, address and structured data. Each is written both
 * as the standard tag and as its Open Graph twin, which link previews read.
 *
 * The parts that are the same on every page (preview image, site name) are in `index.html`.
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

  /** The page's own address on the live site (the canonical link), from a path such as `/maze`. */
  setPath(path: string): void {
    const url = SITE_URL + path.replace(/^\/+/, '');
    this.headElement('link', 'canonical', 'rel').setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });
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
