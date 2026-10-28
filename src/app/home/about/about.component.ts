import { Component } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import { scrollToSection } from '../home-sections';

/** The story behind the project, beside two photos, with a note leading to "Want to help?". */
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent {
  /**
   * Photos beside the About story: a hand-drawn worksheet first, then a child solving a printed
   * one. Their alt texts and captions are `about.photos`, in the same order.
   */
  readonly aboutPhotos = ['assets/about-hand-drawn.jpg', 'assets/about-child-solving.jpg'];

  constructor(readonly i18n: LanguageService) {}

  /** The link also sets the URL fragment; scrolling straight away works when clicked twice, too. */
  goTo(id: string): void {
    scrollToSection(id);
  }
}
