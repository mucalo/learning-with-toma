import { Component, Input } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() ctaUrl = 'https://buymeacoffee.com/mariomucalo';

  constructor(readonly i18n: LanguageService) {}
}
