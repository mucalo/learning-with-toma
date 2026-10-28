import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { isActivityUrl } from '../activities';
import { HOME_SECTIONS, scrollBehavior, scrollToSection } from '../home/home-sections';
import { LanguageService } from '../i18n/language.service';
import { BUY_ME_A_COFFEE_URL, CONTACT_EMAIL } from '../links';

/**
 * Site footer: on the home page, the logo, links, contact e-mails and a "Keep it free" donation
 * card; on activity pages, a single line with a link back home.
 */
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnDestroy {
  readonly sections = HOME_SECTIONS;
  readonly donateUrl = BUY_ME_A_COFFEE_URL;
  readonly contactEmail = CONTACT_EMAIL;
  readonly heart = 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z';

  onActivityPage = false;

  private readonly navigation: Subscription;

  constructor(readonly i18n: LanguageService, router: Router) {
    this.navigation = router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => (this.onActivityPage = isActivityUrl(event.urlAfterRedirects)));
  }

  /** Fills in the current year, so the copyright line never goes stale. */
  year(text: string): string {
    return text.replace('{year}', String(new Date().getFullYear()));
  }

  mailto(subject: string): string {
    return `mailto:${this.contactEmail}?subject=${encodeURIComponent(subject)}`;
  }

  /** The links also set the URL fragment; scrolling straight away works on the home page, too. */
  goTo(id: string): void {
    scrollToSection(id);
  }

  toTop(): void {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }
}
