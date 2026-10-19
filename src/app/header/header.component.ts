import { Component, Input } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { BUY_ME_A_COFFEE_URL } from '../links';
import { HOME_SECTIONS, scrollToSection } from '../home/home-sections';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() ctaUrl = BUY_ME_A_COFFEE_URL;

  readonly sections = HOME_SECTIONS;

  constructor(readonly i18n: LanguageService) {}

  /**
   * The link itself navigates to the home page with the section as fragment. When we are already
   * on the home page, scroll straight away (this also works when clicking the same item twice).
   */
  scrollTo(id: string): void {
    scrollToSection(id);
  }
}
