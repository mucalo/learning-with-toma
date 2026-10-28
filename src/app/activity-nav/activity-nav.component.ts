import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ACTIVITIES } from '../activities';
import { LanguageService } from '../i18n/language.service';

/**
 * A single-line row of links to every activity, with their icons, at the top of each activity
 * page, so users can jump straight from one activity to another. The current activity is dark and
 * scrolled into the middle. When the links don't fit, they scroll sideways; the arrow buttons are
 * always shown, and enabled only on the side that has more. Hidden when printing.
 */
@Component({
  selector: 'app-activity-nav',
  templateUrl: './activity-nav.component.html',
  styleUrls: ['./activity-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ActivityNavComponent implements AfterViewInit, OnDestroy {
  readonly activities = ACTIVITIES;

  @ViewChild('scroller') scroller?: ElementRef<HTMLElement>;
  @ViewChild('track') track?: ElementRef<HTMLElement>;

  canScrollBack = false;
  canScrollForward = false;

  private resizeObserver?: ResizeObserver;

  constructor(readonly i18n: LanguageService, private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    // The arrows depend on both the visible width (window size) and the links' width (language).
    if (typeof ResizeObserver !== 'undefined' && this.scroller && this.track) {
      this.resizeObserver = new ResizeObserver(() => this.zone.run(() => this.updateArrows()));
      this.resizeObserver.observe(this.scroller.nativeElement);
      this.resizeObserver.observe(this.track.nativeElement);
    }

    // routerLinkActive marks the current link only after the first render.
    setTimeout(() => {
      this.scrollToCurrent();
      this.updateArrows();
    });
    // The links change width once the web fonts arrive, so centre the current one again then.
    // (There are no fonts to wait for while the page is prerendered.)
    if (typeof document !== 'undefined') {
      document.fonts?.ready.then(() => this.zone.run(() => {
        this.scrollToCurrent();
        this.updateArrows();
      }));
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  /** Scrolls by most of the visible width, keeping a little of the previous view for context. */
  scroll(direction: 1 | -1): void {
    const scroller = this.scroller?.nativeElement;
    if (!scroller) {
      return;
    }
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.75, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  updateArrows(): void {
    const scroller = this.scroller?.nativeElement;
    if (!scroller) {
      return;
    }
    // A pixel of slack absorbs rounding at either end.
    this.canScrollBack = scroller.scrollLeft > 1;
    this.canScrollForward = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1;
  }

  private scrollToCurrent(): void {
    const scroller = this.scroller?.nativeElement;
    const current = scroller?.querySelector<HTMLElement>('[aria-current="page"]');
    if (scroller && current && scroller.scrollWidth > scroller.clientWidth) {
      // Measured on screen, so it doesn't matter which element the link's offsets are relative to.
      const link = current.getBoundingClientRect();
      const view = scroller.getBoundingClientRect();
      scroller.scrollLeft += link.left + link.width / 2 - (view.left + view.width / 2);
    }
  }
}
