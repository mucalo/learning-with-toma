import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../../i18n/language.service';
import { TestimonialsComponent } from './testimonials.component';

describe('TestimonialsComponent', () => {
  let fixture: ComponentFixture<TestimonialsComponent>;
  let element: HTMLElement;
  let i18n: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [TestimonialsComponent] }).compileComponents();
    i18n = TestBed.inject(LanguageService);
    i18n.language = 'english';
    fixture = TestBed.createComponent(TestimonialsComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    i18n.language = 'english';
  });

  it('should show every testimonial as a note with its author', () => {
    const notes = Array.from(element.querySelectorAll('.note'));
    expect(notes.length).toBe(i18n.t.testimonials.items.length);
    expect(notes[0].querySelector('blockquote')?.textContent).toContain('Mary Jane is doing it with a smile');
    expect(notes[0].querySelector('strong')?.textContent).toBe('Peter');
    expect(notes[0].querySelector('.relation')?.textContent).toBe('Father of Mary Jane (7)');
  });

  it('should label the arrows and disable "previous" at the start of the row', () => {
    const [previous, next] = Array.from(element.querySelectorAll<HTMLButtonElement>('.arrow'));
    expect(previous.getAttribute('aria-label')).toBe('Previous testimonials');
    expect(next.getAttribute('aria-label')).toBe('Next testimonials');
    expect(previous.disabled).toBeTrue();
  });

  it('should scroll the row by one note when an arrow is pressed', () => {
    const track = element.querySelector('.track') as HTMLElement;
    const scrollBy = spyOn(track, 'scrollBy');
    (element.querySelectorAll<HTMLButtonElement>('.arrow')[1]).click();
    expect(scrollBy).toHaveBeenCalled();
    expect((scrollBy.calls.mostRecent().args[0] as ScrollToOptions).left).toBeGreaterThan(0);
  });
});
