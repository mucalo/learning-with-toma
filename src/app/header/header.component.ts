import { Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { isActivityUrl } from '../activities';
import { LanguageService } from '../i18n/language.service';
import { HOME_SECTIONS, scrollBehavior, scrollToSection } from '../home/home-sections';

/**
 * Sticky header: logo, links to the home page sections, language picker and a Support button that
 * leads to the "Want to help?" section. On activity pages "Activities" is highlighted and an
 * "All activities" button leads back to the activity cards. On small screens the links fold away
 * behind a ☰ button.
 */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnDestroy {
  readonly sections = HOME_SECTIONS;

  /** The ☰ menu on small screens. */
  menuOpen = false;
  onActivityPage = false;

  private readonly navigation: Subscription;

  constructor(readonly i18n: LanguageService, private readonly router: Router, private readonly host: ElementRef<HTMLElement>) {
    this.navigation = router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.onActivityPage = isActivityUrl(event.urlAfterRedirects);
        this.menuOpen = false;
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * The link itself navigates to the home page with the section as fragment. When we are already
   * on the home page, scroll straight away (this also works when clicking the same item twice).
   */
  goToSection(id: string): void {
    this.menuOpen = false;
    scrollToSection(id);
  }

  /** The logo goes to the top of the home page, also when we are already there. */
  goHome(): void {
    this.menuOpen = false;
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }

  /**
   * Uses the click's path rather than its target: the ☰ icon swaps its path when the menu opens,
   * so by now the clicked element may already be gone from the page.
   */
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!event.composedPath().includes(this.host.nativeElement)) {
      this.menuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.menuOpen = false;
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }
}
