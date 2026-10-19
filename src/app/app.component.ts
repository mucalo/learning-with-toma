import { Component } from '@angular/core';
import { BUY_ME_A_COFFEE_URL } from './links';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  buyMeACoffeeUrl = BUY_ME_A_COFFEE_URL;
}
