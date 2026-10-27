import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmphasisPipe } from '../../i18n/emphasis.pipe';
import { LanguageService } from '../../i18n/language.service';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AboutComponent, EmphasisPipe]
    }).compileComponents();

    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
  });

  it('should render the about section with its stats, photos and captions', () => {
    const about = fixture.nativeElement as HTMLElement;
    expect(about.querySelector('h2')?.textContent).toBe('A dad who couldn’t draw fast enough');
    expect(Array.from(about.querySelectorAll('.stat-value')).map(stat => stat.textContent)).toEqual(['12', '4–7', '3', '0 €']);
    expect(about.querySelectorAll('.about-reasons li').length).toBe(2);
    expect(about.querySelector('.learner-box h3')?.textContent).toBe('Made with every kind of learner in mind');
    const figures = Array.from(about.querySelectorAll('.about-figure'));
    expect(figures.length).toBe(fixture.componentInstance.aboutPhotos.length);
    expect(figures.map(figure => figure.querySelector('figcaption')?.textContent)).toEqual(['Where it all started', 'Sunday morning practice']);
    figures.forEach(figure => expect(figure.querySelector('img')?.getAttribute('alt')).toBeTruthy());
  });

  it('should end the learner box with a note to ask the child\'s teacher or speech therapist first', () => {
    const disclaimer = (fixture.nativeElement as HTMLElement).querySelector('.learner-box .learner-disclaimer');
    expect(disclaimer?.querySelector('strong')?.textContent).toBe('Important:');
    expect(disclaimer?.textContent).toContain('speech and language therapist');
  });

  it('should lead the About support note to the "Want to help?" section', () => {
    const about = fixture.nativeElement as HTMLElement;
    expect(about.querySelector('.support-note a')?.getAttribute('href')).toBe('/#help');
  });

  it('should show key phrases in bold without the ** markers', () => {
    const about = fixture.nativeElement as HTMLElement;
    expect(about.querySelector('strong')?.textContent).toBe('loved solving little puzzles, tasks and problems on paper');
    expect(about.textContent).not.toContain('**');
  });

  it('should keep each reason in one piece, with its bold part inside', () => {
    const reason = (fixture.nativeElement as HTMLElement).querySelector('.about-reasons li') as HTMLElement;
    expect(reason.children.length).toBe(1);
    expect(reason.querySelector('span strong')?.textContent).toBe('I really can’t draw');
  });
});
