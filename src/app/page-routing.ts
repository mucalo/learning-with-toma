import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';
import { PageKey } from './activities';
import { LanguageKey } from './i18n/languages';

/** What every page's route says about it (see `app-routing.module.ts`). */
export interface PageData {
  page: PageKey;
  language: LanguageKey;
}

/** The page and language of the route that is shown, if it is one of the site's pages. */
export function pageData(root: ActivatedRouteSnapshot): PageData | null {
  let route = root;
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route.data['page'] ? (route.data as PageData) : null;
}

/**
 * The same page in another language (`/maze` → `/hr/labirint`) keeps its component, so a
 * worksheet that is already made, and its settings, stay as they are and simply change language.
 */
@Injectable()
export class SamePageReuseStrategy extends BaseRouteReuseStrategy {
  override shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return super.shouldReuseRoute(future, current) || (!!future.data['page'] && future.data['page'] === current.data['page']);
  }
}
