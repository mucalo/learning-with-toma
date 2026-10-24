import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LanguagePickerComponent } from './header/language-picker/language-picker.component';
import { LanguageService } from './i18n/language.service';

@Component({ template: 'Page' })
class PageComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: PageComponent },
          { path: 'maze', component: PageComponent }
        ])
      ],
      declarations: [AppComponent, HeaderComponent, LanguagePickerComponent, FooterComponent, PageComponent]
    }).compileComponents();

    TestBed.inject(LanguageService).language = 'english';
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the site title in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header .logo')?.getAttribute('aria-label')).toBe('Learning with Toma');
  });

  it('should translate the header when the language changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(LanguageService).language = 'croatian';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header a.menu-link')?.textContent).toContain('Aktivnosti');
    expect(compiled.querySelector('header .logo')?.getAttribute('aria-label')).toBe('Učimo s Tomom');
  });

  it('should start a newly opened page at the top, but not move for a section link on the same page', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    await fixture.ngZone?.run(() => router.navigateByUrl('/'));
    // Typed loosely: scrollTo has two signatures, and the spy would only accept the (x, y) one.
    const scrollTo: jasmine.Spy = spyOn(window, 'scrollTo');

    await fixture.ngZone?.run(() => router.navigateByUrl('/maze'));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0 });

    scrollTo.calls.reset();
    await fixture.ngZone?.run(() => router.navigateByUrl('/maze#top'));
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
