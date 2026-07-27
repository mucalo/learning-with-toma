import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() message = 'If this work helps a child, a parent, or a professional feel supported, a small donation can help keep it going with compassion and care.';
  @Input() ctaText = 'Donate to help children learn';
  @Input() ctaUrl = 'https://buymeacoffee.com/mariomucalo';
}
