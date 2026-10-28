import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpSectionComponent } from './help-section.component';
import { EmphasisPipe } from '../../i18n/emphasis.pipe';
import { LanguageService } from '../../i18n/language.service';
import { BUY_ME_A_COFFEE_URL, CONTACT_EMAIL, SITE_URL } from '../../links';

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

  it('should show the four ways to help as numbered cards', () => {
    const cards = Array.from(element.querySelectorAll('.help-card'));
    expect(cards.map(card => card.querySelector('h3')?.textContent)).toEqual(['Donate', 'Spread the word', 'Send feedback', 'Share photos or videos']);
    expect(cards.map(card => card.querySelector('.card-number')?.textContent)).toEqual(['1', '2', '3', '4']);
    expect(element.querySelector('#help-heading')?.textContent).toBe('Want to help?');
  });

  it('should show an example under each kind of feedback', () => {
    const items = Array.from(element.querySelectorAll('.feedback-list li'));
    expect(items.length).toBe(2);
    items.forEach(item => expect(item.querySelector('.example')?.textContent).toMatch(/^e\.g\. /));
  });

  it('should ask for photos where no child can be recognised, by e-mail', () => {
    const card = element.querySelectorAll('.help-card')[3];
    expect(card.querySelector('strong')?.textContent).toBe('no child can be recognised');
    expect(card.querySelectorAll('.photo-kinds li').length).toBe(4);
    expect(card.querySelector('.card-button')?.getAttribute('href')).toBe(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Learning with Toma – photos and videos')}`);
  });

  it('should link to the donation page and the contact e-mail', () => {
    expect(element.querySelector(`a[href="${BUY_ME_A_COFFEE_URL}"]`)).toBeTruthy();
    expect(element.querySelector(`a[href="mailto:${CONTACT_EMAIL}"]`)?.textContent).toBe(CONTACT_EMAIL);
    expect(element.textContent).not.toContain('{email}');
  });

  it('should share the home page address', () => {
    const facebook = element.querySelector('a[aria-label="Share on Facebook"]') as HTMLAnchorElement;
    const sharedUrl = new URL(facebook.href).searchParams.get('u');
    expect(sharedUrl).toBe(SITE_URL);
  });

  it('should confirm when the link is copied', async () => {
    spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    await component.copyLink();
    fixture.detectChanges();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(component.pageUrl);
    expect(element.textContent).toContain('Link copied!');
  });
});
