import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { LanguageService } from '../i18n/language.service';
import { HOME_SECTIONS } from './home-sections';
import { EmphasisPipe } from '../i18n/emphasis.pipe';
import { HelpSectionComponent } from './help-section/help-section.component';
import { CONTACT_EMAIL } from '../links';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent, HelpSectionComponent, EmphasisPipe]
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

  it('should render the about section', () => {
    const about = (fixture.nativeElement as HTMLElement).querySelector('#about') as HTMLElement;
    expect(about.querySelector('h2')?.textContent).toContain('About Learning with Toma');
    expect(about.querySelectorAll('.about-list li').length).toBe(2);
    expect(about.querySelectorAll('.about-figure img').length).toBe(component.aboutPhotos.length);
  });

  it('should render every testimonial among the activity cards', () => {
    const grid = (fixture.nativeElement as HTMLElement).querySelector('.activity-grid') as HTMLElement;
    const testimonials = grid.querySelectorAll('.testimonial-card');
    expect(grid.querySelectorAll('.activity-card').length).toBe(component.activities.length);
    expect(testimonials.length).toBe(4);
    const peter = Array.from(testimonials).find(card => card.querySelector('.testimonial-name')?.textContent === 'Peter');
    expect(peter?.querySelector('.testimonial-relation')?.textContent).toBe('father of Mary Jane (7)');
    expect(peter?.querySelector('blockquote')?.textContent).toContain('Mary Jane is doing it with a smile');
  });

  it('should render the contact section with the e-mail link', () => {
    const contact = (fixture.nativeElement as HTMLElement).querySelector('#contact') as HTMLElement;
    expect(contact.querySelector('h2')?.textContent).toContain('Contact');
    expect(contact.querySelector(`a[href="mailto:${CONTACT_EMAIL}"]`)?.textContent).toBe(CONTACT_EMAIL);
  });

  it('should show key phrases in bold without the ** markers', () => {
    const about = (fixture.nativeElement as HTMLElement).querySelector('#about') as HTMLElement;
    expect(about.querySelector('strong')?.textContent).toBe('loved solving little puzzles, tasks and problems on paper');
    expect(about.textContent).not.toContain('**');
  });
});
