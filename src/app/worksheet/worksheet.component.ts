import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivityPageComponent } from '../activity-page/activity-page.component';
import { LanguageService } from '../i18n/language.service';
import { paginate } from './paginate';

export interface WorksheetRowContext<T> {
  $implicit: T;
  index: number;
}

/** Width of an A4 sheet in CSS pixels (210mm at 96 pixels per inch). */
const SHEET_WIDTH_PX = (210 / 25.4) * 96;
/** How many times in quick succession the rows may be re-laid out before the layout is kept. */
const MAX_LAYOUT_PASSES = 4;
const QUICK_SUCCESSION_MS = 1000;
/** Room on each side of the paper (the ? and ✕ buttons sit on the right), in sheet pixels. */
const BUTTON_GUTTER_PX = 2 * 56;

/**
 * Shared layout for every exercise worksheet: A4 pages, exactly as they print.
 *
 * Every page repeats the instruction at the top and has a small footer. Rows are measured once
 * rendered and spread over as many pages as needed, never splitting a problem. On screen the pages
 * are scaled to fit (CSS zoom); when printing they are full size, one sheet per page, so the
 * printout is what the preview shows.
 *
 * Each row's `.action-area` (the ? and ✕ buttons) sits beside the paper, so it never changes the
 * layout, and is hidden when printing.
 *
 * Usage:
 *   <app-worksheet [instruction]="i18n.t.myActivity.instruction" [items]="generatedItems">
 *     <ng-template let-item let-i="index">
 *       <div class="problem-row">...</div>
 *     </ng-template>
 *   </app-worksheet>
 */
@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class WorksheetComponent<T = unknown> implements OnInit, DoCheck, AfterViewChecked, OnDestroy {
  @Input() instruction = '';
  @Input() items: T[] = [];

  @ContentChild(TemplateRef) rowTemplate?: TemplateRef<WorksheetRowContext<T>>;

  /** Row indexes on each page. Until the rows are measured, they all sit on the first page. */
  pages: number[][] = [];
  zoom = 1;

  private seenItems?: T[];
  private seenLength = -1;
  /**
   * Re-layouts in quick succession. A row whose height depends on its neighbours could otherwise
   * move back and forth between pages forever; after a few quick passes the layout stays. Later
   * changes (a revealed answer, fonts arriving) start counting afresh.
   */
  private layoutPasses = 0;
  private lastLayout = 0;
  private resizeObserver?: ResizeObserver;

  constructor(
    readonly i18n: LanguageService,
    private readonly host: ElementRef<HTMLElement>,
    private readonly changes: ChangeDetectorRef,
    private readonly zone: NgZone,
    @Optional() private readonly activityPage?: ActivityPageComponent
  ) {}

  /** The activity's name for the page footer, when the worksheet is on an activity page. */
  get activityTitle(): string | null {
    return this.activityPage ? this.i18n.t.activities[this.activityPage.current.key].title : null;
  }

  ngOnInit(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.zone.run(() => this.fitToWidth()));
      this.resizeObserver.observe(this.host.nativeElement);
    }
    this.fitToWidth();
  }

  /** New or removed rows (the ✕ button removes rows in place): lay them all out again. */
  ngDoCheck(): void {
    if (this.items !== this.seenItems || this.items.length !== this.seenLength) {
      this.seenItems = this.items;
      this.seenLength = this.items.length;
      this.pages = [this.items.map((_, index) => index)];
    }
  }

  /**
   * Measures the rendered rows and spreads them over pages. Runs after every check, so it also
   * catches rows that change height (a new language, a revealed answer, fonts arriving); it only
   * re-renders when the pages actually change.
   */
  ngAfterViewChecked(): void {
    const body = this.host.nativeElement.querySelector<HTMLElement>('.sheet-body');
    const rows = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.worksheet-row'));
    if (!body || rows.length !== this.items.length) {
      return;
    }

    // Both are measured in the same (zoomed) coordinates, so the zoom cancels out.
    const available = body.getBoundingClientRect().height;
    const heights: number[] = [];
    rows.forEach(row => (heights[Number(row.dataset['index'])] = row.getBoundingClientRect().height));
    // Array.from turns gaps (a row that wasn't measured) into undefined, which some() would skip.
    if (!available || Array.from(heights).some(height => height === undefined)) {
      return;
    }

    const pages = paginate(heights, available);
    const now = Date.now();
    if (now - this.lastLayout > QUICK_SUCCESSION_MS) {
      this.layoutPasses = 0;
    }
    if (JSON.stringify(pages) !== JSON.stringify(this.pages) && this.layoutPasses < MAX_LAYOUT_PASSES) {
      this.layoutPasses++;
      this.lastLayout = now;
      Promise.resolve().then(() => {
        this.pages = pages;
        this.changes.detectChanges();
        this.reportPageCount();
      });
    } else {
      this.reportPageCount();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.activityPage) {
      this.activityPage.pageCount = 0;
    }
  }

  /** Scales the pages down to the space available; never up. */
  private fitToWidth(): void {
    const width = this.host.nativeElement.clientWidth;
    const zoom = width ? Math.min(1, width / (SHEET_WIDTH_PX + BUTTON_GUTTER_PX)) : 1;
    if (Math.abs(zoom - this.zoom) > 0.001) {
      this.zoom = zoom;
      this.changes.detectChanges();
    }
  }

  private reportPageCount(): void {
    if (this.activityPage && this.activityPage.pageCount !== this.pages.length) {
      const count = this.pages.length;
      Promise.resolve().then(() => (this.activityPage!.pageCount = count));
    }
  }
}
