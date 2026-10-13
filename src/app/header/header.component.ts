import { Component, Input } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = 'Learning with Toma';
  @Input() ctaUrl = 'https://buymeacoffee.com/mariomucalo';

  constructor(readonly i18n: LanguageService) {}
}
