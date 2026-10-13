import { Component } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { Translations } from '../i18n/translations';

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
export class HomeComponent {
  readonly activities: ActivityCard[] = [
    { key: 'spelling', route: '/spelling', emoji: '✏️' },
    { key: 'counting', route: '/counting', emoji: '🔢' },
    { key: 'biggestSmallest', route: '/biggest-smallest', emoji: '📏' },
    { key: 'sequence', route: '/sequence', emoji: '🔺' }
  ];

  constructor(readonly i18n: LanguageService) {}
}
