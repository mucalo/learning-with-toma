import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ACTIVITIES, Activity } from '../activities';
import { LanguageService } from '../i18n/language.service';

/**
 * A slim, single-line strip of links to every activity, shown at the top of each activity page,
 * so users can jump straight from one activity to another. The current activity is highlighted.
 * When the links don't fit, they scroll sideways; the arrow buttons are always shown, and enabled
 * only on the side that has more.
 * Below it, the current activity's title as the page heading. Hidden when printing.
 */
@Component({
  selector: 'app-activity-nav',
  templateUrl: './activity-nav.component.html',
  styleUrls: ['./activity-nav.component.css']
})
export class ActivityNavComponent implements AfterViewInit, OnDestroy {
  readonly activities = ACTIVITIES;
  /** The activity whose page this is, matched by its route. */
  readonly current?: Activity;

  @ViewChild('scroller') scroller?: ElementRef<HTMLElement>;
  @ViewChild('track') track?: ElementRef<HTMLElement>;

  canScrollBack = false;
  canScrollForward = false;

  private resizeObserver?: ResizeObserver;

  constructor(readonly i18n: LanguageService, private readonly zone: NgZone, route: ActivatedRoute) {
    const path = route.snapshot.routeConfig?.path;
    this.current = ACTIVITIES.find(activity => activity.route === `/${path}`);
  }

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
      scroller.scrollLeft = current.offsetLeft - (scroller.clientWidth - current.offsetWidth) / 2;
    }
  }
}
