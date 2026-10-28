import { Component, DoCheck, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ACTIVITIES, Activity, ActivityKey, CATEGORIES } from '../activities';
import { scrollBehavior } from '../home/home-sections';
import { LanguageService } from '../i18n/language.service';
import { SITE_URL } from '../links';
import { PageMetaService } from '../page-meta.service';

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
  styleUrls: ['./activity-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
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

  constructor(readonly i18n: LanguageService, private readonly title: Title, private readonly pageMeta: PageMetaService) {}

  /**
   * "Learning with Toma - Find the Intruder". Browsers use the page title for the tab, the print
   * job's name and the suggested file name when saving as PDF.
   */
  get pageTitle(): string {
    return `${this.i18n.t.header.appTitle} - ${this.i18n.t.activities[this.current.key].title}`;
  }

  /** What search results show under the title: the same text as under the page heading. */
  get pageDescription(): string {
    return `${this.i18n.t.activities[this.current.key].description} ${this.i18n.t.activityInfo[this.current.key].benefit}`;
  }

  /**
   * For search engines: the page is a free worksheet for ages 4–7, one step below the home page
   * (shown in results as "learningwithtoma.com › Maze").
   */
  get structuredData(): object {
    const url = SITE_URL + this.current.route.slice(1);
    const name = this.i18n.t.activities[this.current.key].title;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LearningResource',
          name,
          description: this.pageDescription,
          url,
          learningResourceType: 'Worksheet',
          typicalAgeRange: '4-7',
          isAccessibleForFree: true,
          inLanguage: this.i18n.languages.map(language => language.htmlLang),
          audience: { '@type': 'EducationalAudience', educationalRole: ['parent', 'teacher'] },
          isPartOf: { '@id': `${SITE_URL}#website` }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: this.i18n.t.header.appTitle, item: SITE_URL },
            { '@type': 'ListItem', position: 2, name, item: url }
          ]
        }
      ]
    };
  }

  /**
   * Keeps the title, description and structured data in step with the activity and the language
   * (which also sets the title and description, to the home page's).
   */
  ngDoCheck(): void {
    if (!this.printing && this.title.getTitle() !== this.pageTitle) {
      this.pageMeta.setTitle(this.pageTitle);
    }
    if (this.pageMeta.description !== this.pageDescription) {
      this.pageMeta.setDescription(this.pageDescription);
      this.pageMeta.setStructuredData(this.structuredData);
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
    this.pageMeta.setTitle(this.i18n.t.header.appTitle);
    this.pageMeta.setDescription(this.i18n.t.footer.description);
    this.pageMeta.setStructuredData(null);
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
