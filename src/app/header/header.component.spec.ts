import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      imports: [RouterTestingModule],
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
    expect(element.querySelector('.activities-toggle')?.textContent).toContain('Activities');
    expect(links.map(link => link.textContent?.trim())).toEqual(['About', 'How can I help?', 'Contact']);
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/#about', '/#help', '/#contact']);
  });

  it('should open the Activities dropdown with a link to every activity', () => {
    expect(element.querySelector('.activities-menu')).toBeNull();

    click('.activities-toggle');

    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.activities-menu-link'));
    expect(element.querySelector('.activities-toggle')?.getAttribute('aria-expanded')).toBe('true');
    expect(links.map(link => link.getAttribute('href'))).toEqual(ACTIVITIES.map(activity => activity.route));
    expect(element.querySelector('.all-activities-link')?.getAttribute('href')).toBe('/#activities');
  });

  it('should close open menus on Escape and on clicks outside the header', () => {
    click('.activities-toggle');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(element.querySelector('.activities-menu')).toBeNull();

    click('.activities-toggle');
    document.body.click();
    fixture.detectChanges();
    expect(element.querySelector('.activities-menu')).toBeNull();
  });

  it('should switch language from the language picker', () => {
    expect(element.querySelector('.language-toggle')?.textContent).toContain('EN');

    click('.language-toggle');
    const options = Array.from(element.querySelectorAll<HTMLButtonElement>('.language-option'));
    expect(options.map(option => option.textContent?.trim())).toEqual(['English', 'Hrvatski', 'Srpski']);
    options[1].click();
    fixture.detectChanges();

    expect(i18n.language).toBe('croatian');
    expect(element.querySelector('.language-list')).toBeNull();
    expect(element.querySelector('.language-toggle')?.textContent).toContain('HR');
    expect(element.querySelector('a.menu-link')?.textContent).toContain('O projektu');
  });

  it('should close the Activities dropdown when the language picker opens', () => {
    click('.activities-toggle');
    click('.language-toggle');
    expect(element.querySelector('.activities-menu')).toBeNull();
    expect(element.querySelector('.language-list')).not.toBeNull();
  });

  it('should open and close the small-screen menu', () => {
    click('.menu-toggle');
    expect(element.querySelector('.topbar')?.classList).toContain('menu-open');
    click('.menu-toggle');
    expect(element.querySelector('.topbar')?.classList).not.toContain('menu-open');
  });
});
