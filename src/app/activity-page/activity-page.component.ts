import { Component, DoCheck, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ACTIVITIES, Activity, ActivityKey, CATEGORIES } from '../activities';
import { scrollBehavior } from '../home/home-sections';
import { LanguageService } from '../i18n/language.service';

/**
 * The page around every activity's worksheet: activity switcher, title, the settings panel (with
 * the language, the activity's own fields, Generate and Print), the worksheet preview, tips for
 * grown-ups and other activities to try next.
 *
 * Usage:
 *   <app-activity-page activity="maze" [hasWorksheet]="items.length > 0" (generate)="..." (print)="...">
 *     <div settings>…the activity's own fields…</div>
 *     <app-worksheet …></app-worksheet>
 *   </app-activity-page>
 */
@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.css']
})
export class ActivityPageComponent implements DoCheck, OnDestroy {
  @Input() hasWorksheet = false;
  @Output() generate = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();

  @ViewChild('preview') preview?: ElementRef<HTMLElement>;

  current: Activity = ACTIVITIES[0];
  /** Set by the worksheet once its rows are laid out on pages. */
  pageCount = 0;
  /** One other activity from each category, so "Try next" always offers some variety. */
  tryNext: Activity[] = [];

  /** While the print dialog is open, the title holds the file-name-safe version. */
  private printing = false;

  constructor(readonly i18n: LanguageService, private readonly title: Title) {}

  /**
   * "Learning with Toma - Find the Intruder". Browsers use the page title for the tab, the print
   * job's name and the suggested file name when saving as PDF.
   */
  get pageTitle(): string {
    return `${this.i18n.t.header.appTitle} - ${this.i18n.t.activities[this.current.key].title}`;
  }

  /** Keeps the title in step with the activity and the language (which also sets the title). */
  ngDoCheck(): void {
    if (!this.printing && this.title.getTitle() !== this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  /** Characters that aren't allowed in file names (e.g. the "?" in "Where Is It?") are left out. */
  @HostListener('window:beforeprint')
  beforePrint(): void {
    this.printing = true;
    this.title.setTitle(this.pageTitle.replace(/[\\/:*?"<>|]+/g, '').trim());
  }

  @HostListener('window:afterprint')
  afterPrint(): void {
    this.printing = false;
    this.title.setTitle(this.pageTitle);
  }

  ngOnDestroy(): void {
    this.title.setTitle(this.i18n.t.header.appTitle);
  }

  @Input() set activity(key: ActivityKey) {
    this.current = ACTIVITIES.find(activity => activity.key === key) ?? ACTIVITIES[0];
    this.tryNext = CATEGORIES
      .map(category => ACTIVITIES.find(activity => activity.category === category && activity.key !== key))
      .filter((activity): activity is Activity => !!activity);
  }

  /**
   * Generates the worksheet, then brings the top of the preview into view, just below the header:
   * the button is often lower down the panel, and on small screens the preview is below it.
   */
  onGenerate(): void {
    this.generate.emit();
    // After the worksheet has rendered.
    setTimeout(() => this.preview?.nativeElement.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }));
  }

  /** "3 pages · A4", with the plural form the current language needs (1 stranica, 2 stranice, 5 stranica). */
  get pageCountLabel(): string {
    const option = this.i18n.languages.find(language => language.value === this.i18n.language);
    const form = new Intl.PluralRules(option?.htmlLang).select(this.pageCount);
    const forms = this.i18n.t.activityPage.pageCount;
    const text = form === 'one' ? forms.one : form === 'few' ? forms.few : forms.other;
    return text.replace('{count}', String(this.pageCount));
  }

  get seeAllLabel(): string {
    return this.i18n.t.activityPage.seeAll.replace('{count}', String(ACTIVITIES.length));
  }
}
