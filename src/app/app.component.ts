import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
   * of the same page scroll there themselves.
   */
  constructor(router: Router) {
    let trigger: NavigationStart['navigationTrigger'] = 'imperative';
    let lastPath: string | null = null;

    this.navigation = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        trigger = event.navigationTrigger;
      } else if (event instanceof NavigationEnd) {
        const path = event.urlAfterRedirects.split(/[?#]/)[0];
        if (lastPath !== null && path !== lastPath && trigger === 'imperative') {
          window.scrollTo({ top: 0, left: 0 });
        }
        lastPath = path;
      }
    });
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }
}
