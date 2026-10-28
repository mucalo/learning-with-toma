import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import { scrollToSection } from '../home-sections';

/** Top of the home page: heading, short intro, the two main buttons and an example worksheet stack. */
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class HeroComponent {
  /** Each "Made for" chip gets one of the activity category tints, in order. */
  readonly audienceClasses = ['tint-letters', 'tint-numbers', 'tint-motor', 'tint-thinking'];

  constructor(readonly i18n: LanguageService) {}

  /** The links also set the URL fragment; scrolling straight away works when clicked twice, too. */
  goTo(id: string): void {
    scrollToSection(id);
  }
}
