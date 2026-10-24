import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ACTIVITIES } from '../activities';
import { LanguageService } from '../i18n/language.service';
import { BUY_ME_A_COFFEE_URL, CONTACT_EMAIL } from '../links';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let element: HTMLElement;
  let i18n: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: '', children: [] }, ...ACTIVITIES.map(activity => ({ path: activity.route.slice(1), children: [] }))])],
      declarations: [FooterComponent]
    }).compileComponents();

    i18n = TestBed.inject(LanguageService);
    i18n.language = 'english';
    fixture = TestBed.createComponent(FooterComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    i18n.language = 'english';
  });

  it('should link to every home page section, the contact e-mail and the donation page', () => {
    const explore = Array.from(element.querySelectorAll<HTMLAnchorElement>('nav.footer-links a'));
    expect(explore.map(link => link.getAttribute('href'))).toEqual(['/#activities', '/#testimonials', '/#about', '/#help']);
    expect(element.querySelector(`a[href="mailto:${CONTACT_EMAIL}"]`)?.textContent).toBe(CONTACT_EMAIL);
    expect(element.querySelector('.keep-free a')?.getAttribute('href')).toBe(BUY_ME_A_COFFEE_URL);
  });

  it('should show the current year in the copyright line', () => {
    expect(element.querySelector('.footer-bottom')?.textContent).toBe(`© ${new Date().getFullYear()} Learning with Toma · Made by a dad of three`);
  });

  it('should show only a short line with a way back home on activity pages', async () => {
    await TestBed.inject(Router).navigateByUrl(ACTIVITIES[0].route);
    fixture.detectChanges();

    expect(element.querySelector('.footer-columns')).toBeNull();
    expect(element.querySelector('.footer-compact')?.textContent).toContain('Free printable worksheets for ages 4–7');
    expect(element.querySelector('.footer-compact a')?.getAttribute('href')).toBe('/');
  });
});
