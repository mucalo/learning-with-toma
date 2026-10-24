import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivityKey } from '../activities';
import { ACTIVITY_ICONS } from './activity-icons';

/** An activity's illustrated icon, used on the home page cards and around the activity pages. */
@Component({
  selector: 'app-activity-icon',
  template: '',
  styles: [':host { display: inline-flex; flex: none; } :host ::ng-deep svg { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityIconComponent implements OnChanges {
  @Input() activity!: ActivityKey;
  @Input() size = 80;

  @HostBinding('innerHTML') markup: SafeHtml = '';

  constructor(private readonly sanitizer: DomSanitizer) {}

  /** The icons are fixed strings from `ACTIVITY_ICONS`, so they can be trusted as markup. */
  ngOnChanges(): void {
    const svg = `<svg width="${this.size}" height="${this.size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${ACTIVITY_ICONS[this.activity]}</svg>`;
    this.markup = this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
