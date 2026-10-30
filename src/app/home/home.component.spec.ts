import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { LanguageService } from '../i18n/language.service';
import { HOME_SECTIONS } from './home-sections';
import { EmphasisPipe } from '../i18n/emphasis.pipe';
import { HelpSectionComponent } from './help-section/help-section.component';
import { HeroComponent } from './hero/hero.component';
import { ActivityIconComponent } from '../activity-icon/activity-icon.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AboutComponent } from './about/about.component';
import { ACTIVITIES, Activity, pagePath } from '../activities';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent, HeroComponent, ActivityIconComponent, TestimonialsComponent, AboutComponent, HelpSectionComponent, EmphasisPipe]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a spelling activity card link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Spelling');
    expect(compiled.querySelector('a[href$="/spelling"]')).toBeTruthy();
  });

  it('should render every menu section on the page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    for (const section of HOME_SECTIONS) {
      expect(compiled.querySelector(`#${section.id}`)).withContext(section.id).toBeTruthy();
    }
  });

  it('should render the three "How it works" steps, which the hero links to', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const steps = Array.from(compiled.querySelectorAll('#how .how-step'));
    expect(steps.map(step => step.querySelector('h3')?.textContent)).toEqual(['Pick an activity', 'Make it yours', 'Print and play']);
    expect(steps.map(step => step.querySelector('.how-number')?.textContent)).toEqual(['1', '2', '3']);
    expect(compiled.querySelector('#how h2')?.textContent).toBe('How it works');
  });

  it('should switch the site language from the languages band', () => {
    const i18n = TestBed.inject(LanguageService);
    // Choosing opens the same page in that language (see LanguageService); here it just switches.
    spyOn(i18n, 'choose').and.callFake(value => (i18n.language = value));
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.language-buttons button'));
    expect(buttons.map(button => button.textContent?.trim())).toEqual(['English', 'Hrvatski', 'Srpski', 'Polski']);
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');

    buttons[2].click();
    fixture.detectChanges();

    expect(i18n.choose).toHaveBeenCalledWith('serbian');
    expect(buttons[2].getAttribute('aria-pressed')).toBe('true');
    expect(compiled.querySelector('#languages-heading')?.textContent).toBe('Svaki radni list na vašem jeziku');
    i18n.language = 'english';
  });

  it('should link a card with its icon to every activity, in order', () => {
    const cards = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.activity-card'));
    expect(cards.map(card => card.getAttribute('href'))).toEqual(ACTIVITIES.map(englishPath));
    cards.forEach(card => expect(card.querySelector('app-activity-icon svg')).withContext(card.href).toBeTruthy());
    expect(cards[0].querySelector('.card-category')?.textContent).toBe('Letters & words');
  });

  it('should filter the activities by category and mark the pressed filter', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const filters = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.filters .filter'));
    expect(filters.map(button => button.textContent?.trim())).toEqual(['All 12', 'Letters & words', 'Numbers & size', 'Fine motor', 'Thinking']);
    expect(filters[0].getAttribute('aria-pressed')).toBe('true');

    filters[3].click();
    fixture.detectChanges();

    const shown = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.activity-card')).map(card => card.getAttribute('href'));
    expect(shown).toEqual(ACTIVITIES.filter(activity => activity.category === 'motor').map(englishPath));
    expect(filters[3].getAttribute('aria-pressed')).toBe('true');
    expect(filters[0].getAttribute('aria-pressed')).toBe('false');

    filters[0].click();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.activity-card').length).toBe(ACTIVITIES.length);
  });
});

function englishPath(activity: Activity): string {
  return pagePath(activity.key, 'english');
}
