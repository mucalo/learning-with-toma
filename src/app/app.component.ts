import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { pageUrl } from './activities';
import { DEFAULT_LANGUAGE, LANGUAGES } from './i18n/languages';
import { SITE_URL } from './links';
import { PageMetaService } from './page-meta.service';
import { pageData } from './page-routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppComponent implements OnDestroy {
  private readonly navigation: Subscription;

  /**
   * Opening a different page (e.g. an activity from the home page) starts it at the top. Back and
   * forward are left to the browser, which restores the earlier position, and links to a section
   * of the same page scroll there themselves. The same page in another language stays where it is.
   *
   * Each page also tells search engines its own address (the canonical link), so they list e.g.
   * `/maze` once, whatever was added to the address it was found at, and its address in the other
   * languages.
   */
  constructor(router: Router, pageMeta: PageMetaService) {
    let trigger: NavigationStart['navigationTrigger'] = 'imperative';
    let lastPage: string | null = null;

    this.navigation = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        trigger = event.navigationTrigger;
      } else if (event instanceof NavigationEnd) {
        const path = event.urlAfterRedirects.split(/[?#]/)[0];
        const data = pageData(router.routerState.snapshot.root);

        if (data) {
          pageMeta.setUrl(pageUrl(data.page, data.language));
          pageMeta.setTranslations([
            ...LANGUAGES.map(language => ({ hreflang: language.htmlLang, url: pageUrl(data.page, language.value) })),
            { hreflang: 'x-default', url: pageUrl(data.page, DEFAULT_LANGUAGE) }
          ]);
        } else {
          pageMeta.setUrl(SITE_URL + path.slice(1));
        }

        const page = data?.page ?? path;
        if (lastPage !== null && page !== lastPage && trigger === 'imperative') {
          window.scrollTo({ top: 0, left: 0 });
        }
        lastPage = page;
      }
    });
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }
}
