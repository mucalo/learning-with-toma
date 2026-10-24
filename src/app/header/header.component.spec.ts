import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { LanguageService } from '../i18n/language.service';
import { ACTIVITIES } from '../activities';
import { LanguagePickerComponent } from './language-picker/language-picker.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;
  let i18n: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(ACTIVITIES.map(activity => ({ path: activity.route.slice(1), children: [] })))],
      declarations: [HeaderComponent, LanguagePickerComponent]
    }).compileComponents();

    i18n = TestBed.inject(LanguageService);
    i18n.language = 'english';
    fixture = TestBed.createComponent(HeaderComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    i18n.language = 'english';
  });

  function click(selector: string): void {
    (element.querySelector(selector) as HTMLElement).click();
    fixture.detectChanges();
  }

  it('should link each menu item to its home page section', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a.menu-link'));
    expect(links.map(link => link.textContent?.trim())).toEqual(['Activities', 'Testimonials', 'About', 'Want to help?']);
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/#activities', '/#testimonials', '/#about', '/#help']);
  });

  it('should lead the Support button to the "Want to help?" section', () => {
    const support = element.querySelector<HTMLAnchorElement>('.support-link');
    expect(support?.textContent?.trim()).toBe('Support');
    expect(support?.getAttribute('href')).toBe('/#help');
  });

  it('should highlight Activities and offer a way back on activity pages', async () => {
    expect(element.querySelector('.all-activities')).toBeNull();

    await TestBed.inject(Router).navigateByUrl(ACTIVITIES[0].route);
    fixture.detectChanges();

    expect(element.querySelector('.menu-link.is-current')?.textContent?.trim()).toBe('Activities');
    expect(element.querySelector('.all-activities')?.getAttribute('href')).toBe('/#activities');
  });

  it('should switch language from the language picker', () => {
    expect(element.querySelector('.language-toggle')?.textContent).toContain('English');

    click('.language-toggle');
    const options = Array.from(element.querySelectorAll<HTMLButtonElement>('.language-option'));
    expect(options.map(option => option.textContent?.trim())).toEqual(['English', 'Hrvatski', 'Srpski']);
    options[1].click();
    fixture.detectChanges();

    expect(i18n.language).toBe('croatian');
    expect(element.querySelector('.language-list')).toBeNull();
    expect(element.querySelector('.language-toggle')?.textContent).toContain('Hrvatski');
    expect(element.querySelector('.logo-text')?.textContent).toContain('Učimo');
    expect(element.querySelector('a.menu-link')?.textContent).toContain('Aktivnosti');
  });

  it('should keep the small-screen menu open when the click lands on the ☰ icon itself', () => {
    (element.querySelector('.menu-toggle path') as SVGElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(element.querySelector('.site-header')?.classList).toContain('menu-open');
  });

  it('should open and close the small-screen menu', () => {
    click('.menu-toggle');
    expect(element.querySelector('.site-header')?.classList).toContain('menu-open');
    click('.menu-toggle');
    expect(element.querySelector('.site-header')?.classList).not.toContain('menu-open');
  });
});
