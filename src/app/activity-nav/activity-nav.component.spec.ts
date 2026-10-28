import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ACTIVITIES } from '../activities';
import { LanguageService } from '../i18n/language.service';
import { ActivityIconComponent } from '../activity-icon/activity-icon.component';
import { ActivityNavComponent } from './activity-nav.component';

@Component({
    template: '<app-activity-nav></app-activity-nav>',
    standalone: false
})
class MazePageComponent {}

/** Opens pages through the router, as the app does, so the nav sees the page's route. */
@Component({
    template: '<router-outlet></router-outlet>',
    standalone: false
})
class ShellComponent {}

describe('ActivityNavComponent', () => {
  let fixture: ComponentFixture<ShellComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'maze', component: MazePageComponent }])],
      declarations: [ActivityNavComponent, ActivityIconComponent, MazePageComponent, ShellComponent]
    }).compileComponents();

    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(ShellComponent);
    element = fixture.nativeElement as HTMLElement;
    await fixture.ngZone?.run(() => TestBed.inject(Router).navigateByUrl('/maze'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should link to every activity, each with its icon', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.activity-link'));
    expect(links.map(link => link.getAttribute('href'))).toEqual(ACTIVITIES.map(activity => activity.route));
    expect(links[0].textContent).toContain('Spelling');
    links.forEach(link => expect(link.querySelector('app-activity-icon svg')).withContext(link.href).toBeTruthy());
  });

  it('should mark the current activity', () => {
    const current = element.querySelectorAll('[aria-current="page"]');
    expect(current.length).toBe(1);
    expect(current[0].textContent).toContain('Maze');
    expect(current[0].classList).toContain('is-current');
  });

  it('should enable scroll arrows only on the side with more links', () => {
    element.style.display = 'block';
    element.style.width = '360px';
    const nav = fixture.debugElement.query(By.directive(ActivityNavComponent)).componentInstance as ActivityNavComponent;
    const scroller = element.querySelector('.scroller') as HTMLElement;
    const [back, forward] = Array.from(element.querySelectorAll<HTMLButtonElement>('.scroll-button'));

    scroller.scrollLeft = 0;
    nav.updateArrows();
    fixture.detectChanges();
    expect(back.disabled).toBeTrue();
    expect(forward.disabled).toBeFalse();

    scroller.scrollLeft = scroller.scrollWidth;
    nav.updateArrows();
    fixture.detectChanges();
    expect(back.disabled).toBeFalse();
    expect(forward.disabled).toBeTrue();
  });
});
