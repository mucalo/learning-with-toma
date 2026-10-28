import { isPlatformBrowser } from '@angular/common';
import { NgModule, PLATFORM_ID, Type, inject } from '@angular/core';
import { CanActivateFn, Route, RouteReuseStrategy, Router, RouterModule, Routes } from '@angular/router';
import { ACTIVITIES, ActivityKey, PageKey, pagePath } from './activities';
import { LanguageService } from './i18n/language.service';
import { DEFAULT_LANGUAGE, LANGUAGES, LanguageKey } from './i18n/languages';
import { PageData, SamePageReuseStrategy } from './page-routing';
import { HomeComponent } from './home/home.component';
import { SpellingComponent } from './spelling/spelling.component';
import { CountingComponent } from './counting/counting.component';
import { BiggestSmallestComponent } from './biggest-smallest/biggest-smallest.component';
import { SequenceComponent } from './sequence/sequence.component';
import { IntruderComponent } from './intruder/intruder.component';
import { LineComponent } from './line/line.component';
import { ShadowComponent } from './shadow/shadow.component';
import { MazeComponent } from './maze/maze.component';
import { WhereComponent } from './where/where.component';
import { CopyPatternComponent } from './copy-pattern/copy-pattern.component';
import { TraceComponent } from './trace/trace.component';
import { DotToDotComponent } from './dot-to-dot/dot-to-dot.component';

const ACTIVITY_COMPONENTS: Record<ActivityKey, Type<unknown>> = {
  spelling: SpellingComponent,
  counting: CountingComponent,
  biggestSmallest: BiggestSmallestComponent,
  sequence: SequenceComponent,
  intruder: IntruderComponent,
  line: LineComponent,
  shadow: ShadowComponent,
  maze: MazeComponent,
  where: WhereComponent,
  copyPattern: CopyPatternComponent,
  trace: TraceComponent,
  dotToDot: DotToDotComponent
};

/**
 * The first page someone opens, if it is an English one: visitors who chose Croatian or Serbian
 * before, or whose browser is set to it, go to the same page in that language instead. Later
 * links, and the Croatian and Serbian addresses themselves, are left as they are.
 */
const preferredLanguageGuard: CanActivateFn = route => {
  const router = inject(Router);
  if (router.navigated || !isPlatformBrowser(inject(PLATFORM_ID))) {
    return true;
  }
  const { page, language } = route.data as PageData;
  const preferred = inject(LanguageService).preferredLanguage();
  if (!preferred || preferred === language) {
    return true;
  }
  return router.parseUrl(pagePath(page, preferred) + (route.fragment ? `#${route.fragment}` : ''));
};

function pageRoute(page: PageKey, language: LanguageKey, component: Type<unknown>): Route {
  const data: PageData = { page, language };
  return {
    path: pagePath(page, language).slice(1),
    component,
    data,
    canActivate: language === DEFAULT_LANGUAGE ? [preferredLanguageGuard] : []
  };
}

/** Every page in every language: `/`, `/maze`, `/hr`, `/hr/labirint`, `/sr`, `/sr/lavirint`… */
const routes: Routes = [
  ...LANGUAGES.flatMap(({ value }) => [
    pageRoute('home', value, HomeComponent),
    ...ACTIVITIES.map(activity => pageRoute(activity.key, value, ACTIVITY_COMPONENTS[activity.key]))
  ]),
  { path: '**', redirectTo: '' }
];

@NgModule({
  // Blocking: the first page (and a switch to the visitor's language) is settled before anything is shown.
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: SamePageReuseStrategy }]
})
export class AppRoutingModule { }
