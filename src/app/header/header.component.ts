import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = 'Learning with Toma';
  @Input() subtitle = 'Helping children learn with warmth and care';
  @Input() ctaText = 'Donate to help children learn';
  @Input() ctaUrl = 'https://buymeacoffee.com/mariomucalo';
}
