import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from '../../i18n/language.service';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let element: HTMLElement;
  let i18n: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeroComponent]
    }).compileComponents();

    i18n = TestBed.inject(LanguageService);
    i18n.language = 'english';
    fixture = TestBed.createComponent(HeroComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    i18n.language = 'english';
  });

  it('should show the heading with the highlighted words', () => {
    expect(element.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Printable worksheets for little learners, ready in seconds.');
    expect(element.querySelector('.highlight')?.textContent).toBe('little learners');
  });

  it('should lead to the activities and to "How it works"', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.hero-actions a'));
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/#activities', '/#how']);
  });

  it('should label the example worksheets with the real activity instructions in the current language', () => {
    i18n.language = 'croatian';
    fixture.detectChanges();
    const labels = Array.from(element.querySelectorAll('.sheet-label')).map(label => label.textContent);
    expect(labels).toEqual([i18n.t.shadow.instruction, i18n.t.sequence.instruction, i18n.t.spelling.instruction]);
    expect(element.querySelector('.hero-actions a')?.textContent).toContain('Odaberite aktivnost');
  });
});
