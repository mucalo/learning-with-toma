import { Component, ElementRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import { LanguageKey, LanguageOption } from '../../i18n/languages';

/** Language switch in the header: a pill with the current flag and language name, opening a short list. */
@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class LanguagePickerComponent {
  open = false;

  constructor(readonly i18n: LanguageService, private readonly host: ElementRef<HTMLElement>) {}

  get current(): LanguageOption {
    return this.i18n.languages.find(option => option.value === this.i18n.language) ?? this.i18n.languages[0];
  }

  choose(value: LanguageKey): void {
    this.i18n.choose(value);
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.open = false;
  }
}
