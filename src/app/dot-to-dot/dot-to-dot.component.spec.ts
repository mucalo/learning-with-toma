import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { DOT_FIGURES, Point, withDotCount } from './dot-figures';
import { DotToDotComponent, placeDots } from './dot-to-dot.component';

describe('Dot to Dot', () => {
  describe('withDotCount', () => {
    it('should keep every corner and add dots until it reaches the target', () => {
      const square: Point[] = [[0, 0], [100, 0], [100, 100], [0, 100]];
      const result = withDotCount(square, true, 8);
      expect(result.length).toBe(8);
      for (const corner of square) {
        expect(result).toContain(corner);
      }
      // Every edge was split once, so each new dot sits in the middle of an edge.
      expect(result).toContain([50, 0]);
      expect(result).toContain([0, 50]);
    });

    it('should not split the closing edge of an open outline', () => {
      const result = withDotCount([[0, 0], [10, 0], [100, 0]], false, 4);
      expect(result).toEqual([[0, 0], [10, 0], [55, 0], [100, 0]]);
    });
  });

  it('should have pictures for the smallest dot count, and none with more corners than the largest', () => {
    expect(DOT_FIGURES.some(figure => figure.points.length <= 10)).toBeTrue();
    expect(DOT_FIGURES.every(figure => figure.points.length <= 30)).toBeTrue();
  });

  it('should place labels outside the picture, away from its centre', () => {
    const [left, right] = placeDots([[0, 50], [100, 50]], ['1', '2']);
    expect(left.labelX).toBeLessThan(left.x);
    expect(right.labelX).toBeGreaterThan(right.x);
  });

  it('should place labels of a closed outline beside its edges, whichever way round it goes', () => {
    // A dot in the middle of the bottom edge: its label goes straight down, not onto the edge.
    for (const square of [
      [[0, 0], [100, 0], [100, 100], [50, 100], [0, 100]],
      [[0, 0], [0, 100], [50, 100], [100, 100], [100, 0]]
    ] as Point[][]) {
      const middle = placeDots(square, ['1', '2', '3', '4', '5'], true).find(dot => dot.x === 50)!;
      expect(middle.labelX).toBe(50);
      expect(middle.labelY).toBeGreaterThan(100);
    }
  });

  describe('component', () => {
    let component: DotToDotComponent;
    let fixture: ComponentFixture<DotToDotComponent>;
    let language: LanguageService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormsModule, RouterTestingModule],
        declarations: [DotToDotComponent, WorksheetComponent]
      }).compileComponents();

      language = TestBed.inject(LanguageService);
      language.language = 'english';
      fixture = TestBed.createComponent(DotToDotComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should give every picture exactly the chosen number of dots, numbered from 1', () => {
      component.dotCount = 20;
      component.problemCount = 12;
      component.generateProblems();

      for (const item of component.generatedItems) {
        expect(item.dots.map(dot => dot.label)).toEqual(Array.from({ length: 20 }, (_, i) => String(i + 1)));
      }
    });

    it('should only use pictures that fit the dot count, never the same one twice in a row', () => {
      component.dotCount = 10;
      component.problemCount = 12;
      component.generateProblems();
      const figures = component.generatedItems.map(item => item.figure);

      for (const key of figures) {
        expect(DOT_FIGURES.find(figure => figure.key === key)!.points.length).toBeLessThanOrEqual(10);
      }
      figures.slice(1).forEach((key, i) => expect(key).not.toBe(figures[i]));
    });

    it('should label dots with letters of the current alphabet, limited to its length', () => {
      component.onLabelTypeChange('letters');
      expect(component.dotCounts).toEqual([10, 15, 20, 25]);

      language.language = 'croatian';
      expect(component.dotCounts).toEqual([10, 15, 20, 25, 30]);
      component.dotCount = 10;
      component.generateProblems();
      expect(component.generatedItems[0].dots.map(dot => dot.label).slice(5, 8)).toEqual(['D', 'Dž', 'Đ']);
    });

    it('should show the picture and its name when the answer is revealed', () => {
      component.problemCount = 1;
      component.generateProblems();
      component.revealAnswer(component.generatedItems[0]);
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector('.answer')).toBeTruthy();
      expect(element.querySelector('.answer-name')?.textContent).toBe(component.figureName(component.generatedItems[0]));
    });
  });
});
