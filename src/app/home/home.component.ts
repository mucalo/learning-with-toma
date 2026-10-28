import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../i18n/language.service';
import { ACTIVITIES, Activity, ActivityCategory, CATEGORIES } from '../activities';
import { scrollToSection } from './home-sections';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements AfterViewInit {
  readonly activities = ACTIVITIES;
  readonly categories = CATEGORIES;

  /** Category picked in the activity filter; `null` shows every activity. */
  category: ActivityCategory | null = null;

  constructor(readonly i18n: LanguageService, private readonly route: ActivatedRoute) {}

  get visibleActivities(): Activity[] {
    return this.category ? this.activities.filter(activity => activity.category === this.category) : this.activities;
  }

  get allLabel(): string {
    return this.i18n.t.activitiesSection.all.replace('{count}', String(this.activities.length));
  }

  /** Arriving from another page through the menu (e.g. `#/#about`): scroll once everything is rendered. */
  ngAfterViewInit(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      setTimeout(() => scrollToSection(fragment));
    }
  }
}
