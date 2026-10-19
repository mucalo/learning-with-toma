import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpSectionComponent } from './help-section.component';
import { EmphasisPipe } from '../../i18n/emphasis.pipe';
import { LanguageService } from '../../i18n/language.service';
import { BUY_ME_A_COFFEE_URL, CONTACT_EMAIL } from '../../links';

describe('HelpSectionComponent', () => {
  let component: HelpSectionComponent;
  let fixture: ComponentFixture<HelpSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpSectionComponent, EmphasisPipe]
    }).compileComponents();

    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(HelpSectionComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should show the three ways to help', () => {
    const titles = Array.from(element.querySelectorAll('.step-title')).map(title => title.textContent?.trim());
    expect(titles).toEqual(['1Donate', '2Spread the word', '3Send feedback']);
  });

  it('should link to the donation page and the contact e-mail', () => {
    expect(element.querySelector(`a[href="${BUY_ME_A_COFFEE_URL}"]`)).toBeTruthy();
    expect(element.querySelector(`a[href="mailto:${CONTACT_EMAIL}"]`)?.textContent).toBe(CONTACT_EMAIL);
    expect(element.textContent).not.toContain('{email}');
  });

  it('should share the home page address, without the in-app route', () => {
    const facebook = element.querySelector('a[aria-label="Share on Facebook"]') as HTMLAnchorElement;
    const sharedUrl = new URL(facebook.href).searchParams.get('u');
    expect(sharedUrl).toBe(`${window.location.origin}${window.location.pathname}`);
  });

  it('should confirm when the link is copied', async () => {
    spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    await component.copyLink();
    fixture.detectChanges();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(component.pageUrl);
    expect(element.textContent).toContain('Link copied!');
  });
});
