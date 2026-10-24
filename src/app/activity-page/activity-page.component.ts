import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ACTIVITIES, Activity, ActivityKey, CATEGORIES } from '../activities';
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
export class ActivityPageComponent {
  @Input() hasWorksheet = false;
  @Output() generate = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();

  current: Activity = ACTIVITIES[0];
  /** Set by the worksheet once its rows are laid out on pages. */
  pageCount = 0;
  /** One other activity from each category, so "Try next" always offers some variety. */
  tryNext: Activity[] = [];

  constructor(readonly i18n: LanguageService) {}

  @Input() set activity(key: ActivityKey) {
    this.current = ACTIVITIES.find(activity => activity.key === key) ?? ACTIVITIES[0];
    this.tryNext = CATEGORIES
      .map(category => ACTIVITIES.find(activity => activity.category === category && activity.key !== key))
      .filter((activity): activity is Activity => !!activity);
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
