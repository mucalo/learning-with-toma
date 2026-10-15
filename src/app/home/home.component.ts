import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../i18n/language.service';
import { Translations } from '../i18n/translations';
import { scrollToSection } from './home-sections';

interface ActivityCard {
  key: keyof Translations['activities'];
  route: string;
  emoji: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  readonly activities: ActivityCard[] = [
    { key: 'spelling', route: '/spelling', emoji: '✏️' },
    { key: 'counting', route: '/counting', emoji: '🔢' },
    { key: 'biggestSmallest', route: '/biggest-smallest', emoji: '📏' },
    { key: 'sequence', route: '/sequence', emoji: '🔺' },
    { key: 'intruder', route: '/intruder', emoji: '🔍' },
    { key: 'line', route: '/line', emoji: '〰️' },
    { key: 'shadow', route: '/shadow', emoji: '👤' },
    { key: 'maze', route: '/maze', emoji: '🧩' },
    { key: 'where', route: '/where', emoji: '📍' },
    { key: 'copyPattern', route: '/copy-pattern', emoji: '📐' }
  ];

  /** Photos beside the About text; their alt texts are `about.photoAlts`, in the same order. */
  readonly aboutPhotos = ['assets/about-worksheet.svg', 'assets/about-worksheet-2.svg'];

  constructor(readonly i18n: LanguageService, private readonly route: ActivatedRoute) {}

  /** Arriving from another page through the menu (e.g. `#/#about`): scroll once everything is rendered. */
  ngAfterViewInit(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      setTimeout(() => scrollToSection(fragment));
    }
  }
}
