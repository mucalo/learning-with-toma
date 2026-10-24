import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';

/** A horizontal row of testimonials as pinned notes, scrolled with the arrows (never automatically). */
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('track') track!: ElementRef<HTMLElement>;

  /** Whether the row is scrolled all the way to either end; the matching arrow is then disabled. */
  atStart = true;
  atEnd = false;

  constructor(readonly i18n: LanguageService, private readonly changes: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateEnds();
    this.changes.detectChanges();
  }

  /** Scrolls by one note (its width plus the gap) in the given direction. */
  scroll(direction: 1 | -1): void {
    const track = this.track.nativeElement;
    const note = track.querySelector<HTMLElement>('.note');
    const step = note ? note.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0') : track.clientWidth;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  @HostListener('window:resize')
  updateEnds(): void {
    const track = this.track.nativeElement;
    this.atStart = track.scrollLeft <= 1;
    this.atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }
}
