import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../i18n/language.service';
import { ACTIVITIES, Activity } from '../activities';
import { CONTACT_EMAIL } from '../links';
import { scrollToSection } from './home-sections';
import { HomeTile, layoutHomeTiles } from './home-tiles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  readonly activities = ACTIVITIES;

  /** Activities with testimonials mixed in; shuffled once per visit, so switching language keeps the layout. */
  readonly tiles: HomeTile<Activity>[];

  /** Photos beside the About text; their alt texts are `about.photoAlts`, in the same order. */
  readonly aboutPhotos = ['assets/about-worksheet.svg', 'assets/about-worksheet-2.svg'];

  readonly contactEmail = CONTACT_EMAIL;

  constructor(readonly i18n: LanguageService, private readonly route: ActivatedRoute) {
    this.tiles = layoutHomeTiles(this.activities, i18n.t.testimonials.items.length);
  }

  /** Arriving from another page through the menu (e.g. `#/#about`): scroll once everything is rendered. */
  ngAfterViewInit(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      setTimeout(() => scrollToSection(fragment));
    }
  }
}
