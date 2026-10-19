import { Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { ACTIVITIES } from '../activities';
import { LanguageService } from '../i18n/language.service';
import { BUY_ME_A_COFFEE_URL } from '../links';
import { HOME_SECTIONS, scrollToSection } from '../home/home-sections';

/**
 * Title, menu, language picker and donate button. "Activities" opens a dropdown with every
 * activity; on small screens the whole menu folds away behind a ☰ button.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  @Input() ctaUrl = BUY_ME_A_COFFEE_URL;

  readonly activities = ACTIVITIES;
  /** "Activities" has its own dropdown, so only the other sections are plain menu links. */
  readonly sections = HOME_SECTIONS.filter(section => section.id !== 'activities');

  /** The ☰ menu on small screens. */
  menuOpen = false;
  activitiesOpen = false;

  private readonly navigation: Subscription;

  constructor(readonly i18n: LanguageService, router: Router, private readonly host: ElementRef<HTMLElement>) {
    this.navigation = router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.closeAll());
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleActivities(): void {
    this.activitiesOpen = !this.activitiesOpen;
  }

  /**
   * The link itself navigates to the home page with the section as fragment. When we are already
   * on the home page, scroll straight away (this also works when clicking the same item twice).
   */
  goToSection(id: string): void {
    this.closeAll();
    scrollToSection(id);
  }

  closeAll(): void {
    this.menuOpen = false;
    this.activitiesOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (!this.host.nativeElement.querySelector('.activities-item')?.contains(target)) {
      this.activitiesOpen = false;
    }
    if (!this.host.nativeElement.contains(target)) {
      this.menuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closeAll();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }
}
