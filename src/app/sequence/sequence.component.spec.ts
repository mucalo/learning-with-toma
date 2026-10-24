import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { CELLS_PER_LINE, isValidPattern, SequenceComponent } from './sequence.component';

describe('SequenceComponent', () => {
  let component: SequenceComponent;
  let fixture: ComponentFixture<SequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SequenceComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(SequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reject patterns that are a repetition of a shorter pattern', () => {
    expect(isValidPattern(['A', 'A'])).toBeFalse();
    expect(isValidPattern(['A', 'A', 'A'])).toBeFalse();
    expect(isValidPattern(['A', 'B', 'A', 'B'])).toBeFalse();
    expect(isValidPattern(['A', 'B'])).toBeTrue();
    expect(isValidPattern(['A', 'A', 'B'])).toBeTrue();
    expect(isValidPattern(['A', 'B', 'B', 'A'])).toBeTrue();
  });

  it('should generate the requested number of lines', () => {
    component.problemCount = 7;
    component.generateProblems();
    expect(component.generatedItems.length).toBe(7);
  });

  for (const elementType of ['shapes', 'numbers', 'letters'] as const) {
    for (const patternLength of [2, 3, 4, 5]) {
      it(`should start every line with two recurrences of a valid ${patternLength}-item ${elementType} pattern`, () => {
        component.elementType = elementType;
        component.patternLength = patternLength;
        component.problemCount = 50;
        component.generateProblems();

        component.generatedItems.forEach(item => {
          expect(item.type).toBe(elementType);
          expect(item.pattern.length).toBe(patternLength);
          expect(item.shown).toEqual([...item.pattern, ...item.pattern]);
          expect(item.shown.length + item.continuation.length).toBe(CELLS_PER_LINE);
          item.continuation.forEach((value, i) => expect(value).toBe(item.pattern[i % item.pattern.length]));
          expect(isValidPattern(item.pattern)).withContext(item.pattern.join('')).toBeTrue();
          if (patternLength === 2) {
            expect(item.pattern[0]).not.toBe(item.pattern[1]);
          }
        });
      });
    }
  }

  it('should use exactly N items per pattern by default', () => {
    component.patternLength = 4;
    component.problemCount = 50;
    component.generateProblems();

    component.generatedItems.forEach(item => expect(item.pattern.length).toBe(4));
  });

  it('should vary the pattern length between 2 and N when "up to" is chosen', () => {
    component.elementType = 'numbers';
    component.patternLength = 5;
    component.lengthMode = 'upTo';
    component.problemCount = 100;
    component.generateProblems();

    const lengths = new Set(component.generatedItems.map(item => item.pattern.length));
    expect([...lengths].sort()).toEqual([2, 3, 4, 5]);
    component.generatedItems.forEach(item => {
      expect(isValidPattern(item.pattern)).toBeTrue();
      expect(item.shown.length + item.continuation.length).toBe(CELLS_PER_LINE);
    });
  });

  it('should only offer "exactly / up to" when the pattern has 3 or more items', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    component.patternLength = 2;
    fixture.detectChanges();
    expect(compiled.querySelector('#lengthMode')).toBeNull();

    component.patternLength = 3;
    fixture.detectChanges();
    const options = Array.from(compiled.querySelectorAll('#lengthMode option')).map(o => o.textContent?.trim());
    expect(options).toEqual(['Exactly 3', 'Up to 3']);
  });

  it('should ignore a stale "up to" choice once the pattern length is back to 2', () => {
    component.lengthMode = 'upTo';
    component.patternLength = 2;
    component.problemCount = 20;
    component.generateProblems();

    component.generatedItems.forEach(item => expect(item.pattern.length).toBe(2));
  });

  it('should only use triangles, circles and squares for shapes', () => {
    component.elementType = 'shapes';
    component.patternLength = 5;
    component.problemCount = 30;
    component.generateProblems();

    const used = new Set(component.generatedItems.flatMap(item => item.pattern));
    used.forEach(shape => expect(['triangle', 'circle', 'square']).toContain(shape));
  });

  it('should use letters from the selected language alphabet', () => {
    component.i18n.language = 'croatian';
    component.elementType = 'letters';
    component.patternLength = 5;
    component.problemCount = 100;
    component.generateProblems();

    const used = component.generatedItems.flatMap(item => item.pattern);
    used.forEach(letter => expect('ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ').toContain(letter));
  });

  it('should toggle the answer and remove lines', () => {
    component.problemCount = 3;
    component.generateProblems();
    const item = component.generatedItems[0];

    component.revealAnswer(item);
    expect(item.answerRevealed).toBeTrue();

    component.removeItem(0);
    expect(component.generatedItems.length).toBe(2);
  });

  it('should render shapes as labelled images and blanks for the continuation', () => {
    component.elementType = 'shapes';
    component.patternLength = 3;
    component.problemCount = 1;
    component.generateProblems();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.cell:not(.blank) svg[role="img"]').length).toBe(6);
    expect(compiled.querySelectorAll('.cell.blank').length).toBe(CELLS_PER_LINE - 6);
  });

  it('should fit every line on one row, ending at the edge of the line', () => {
    component.patternLength = 2;
    component.problemCount = 1;
    component.generateProblems();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sequence = compiled.querySelector('.sequence') as HTMLElement;
    // As wide as a line on an A4 sheet (210mm minus 12mm margins on each side).
    sequence.style.width = '186mm';
    const cells = Array.from(sequence.querySelectorAll<HTMLElement>('.cell'));
    const tops = new Set(cells.map(cell => cell.offsetTop));
    expect(tops.size).toBe(1);
    const last = cells[cells.length - 1].getBoundingClientRect();
    expect(Math.abs(last.right - sequence.getBoundingClientRect().right)).toBeLessThan(1);
  });
});
