import { Component } from '@angular/core';

interface ActivityCard {
  title: string;
  description: string;
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
    {
      title: 'Spelling',
      description: 'Practice spelling with picture prompts.',
      route: '/spelling',
      emoji: '✏️'
    },
    {
      title: 'Counting',
      description: 'Count objects and write the number.',
      route: '/counting',
      emoji: '🔢'
    },
    {
      title: 'Biggest and Smallest',
      description: 'Circle the biggest and smallest objects.',
      route: '/biggest-smallest',
      emoji: '📏'
    }
  ];
}
