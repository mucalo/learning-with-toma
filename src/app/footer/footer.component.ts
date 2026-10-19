import { Component, Input } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { BUY_ME_A_COFFEE_URL } from '../links';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() ctaUrl = BUY_ME_A_COFFEE_URL;

  constructor(readonly i18n: LanguageService) {}
}
