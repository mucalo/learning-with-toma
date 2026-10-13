import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import {
  CopyPatternComponent,
  figureSegments,
  figureSize,
  figuresFor,
  FIGURES,
  generateFigure,
  hasDiagonals,
  maxLines,
  Segment
} from './copy-pattern.component';

const pointKey = (p: { x: number; y: number }) => `${p.x},${p.y}`;
const lineKey = (s: Segment) => [pointKey(s.from), pointKey(s.to)].sort().join('-');

function isConnected(segments: Segment[]): boolean {
  if (segments.length === 0) return true;
  const neighbours = new Map<string, string[]>();
  segments.forEach(s => {
    const a = pointKey(s.from), b = pointKey(s.to);
    neighbours.set(a, [...(neighbours.get(a) ?? []), b]);
    neighbours.set(b, [...(neighbours.get(b) ?? []), a]);
  });
  const start = neighbours.keys().next().value as string;
  const seen = new Set([start]);
  const stack = [start];
  while (stack.length) {
    for (const next of neighbours.get(stack.pop()!) ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        stack.push(next);
      }
    }
  }
  return seen.size === neighbours.size;
}

describe('CopyPatternComponent', () => {
  let component: CopyPatternComponent;
  let fixture: ComponentFixture<CopyPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CopyPatternComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(CopyPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  for (const diagonals of [false, true]) {
    for (const size of [3, 4, 5, 6]) {
      it(`should draw connected ${size}×${size} figures${diagonals ? ' with diagonals' : ''} without repeated or crossing lines`, () => {
        for (let run = 0; run < 20; run++) {
          const lines = Math.min(12, maxLines(size, diagonals));
          const figure = generateFigure(size, lines, diagonals);

          expect(figure.length).toBe(lines);
          expect(new Set(figure.map(lineKey)).size).toBe(lines);
          expect(isConnected(figure)).toBeTrue();

          const squaresWithDiagonal = new Set<string>();
          figure.forEach(s => {
            const dx = Math.abs(s.to.x - s.from.x), dy = Math.abs(s.to.y - s.from.y);
            expect(Math.max(dx, dy)).toBe(1);
            [s.from, s.to].forEach(p => {
              expect(p.x).toBeGreaterThanOrEqual(0);
              expect(p.x).toBeLessThan(size);
              expect(p.y).toBeGreaterThanOrEqual(0);
              expect(p.y).toBeLessThan(size);
            });
            if (dx === 1 && dy === 1) {
              expect(diagonals).toBeTrue();
              const square = `${Math.min(s.from.x, s.to.x)},${Math.min(s.from.y, s.to.y)}`;
              expect(squaresWithDiagonal.has(square)).withContext('crossing diagonals').toBeFalse();
              squaresWithDiagonal.add(square);
            }
          });
        }
      });
    }
  }

  it('should have at least 10 recognisable figures drawn only with dot-to-dot lines', () => {
    expect(FIGURES.length).toBeGreaterThanOrEqual(10);
    expect(new Set(FIGURES.map(f => f.key)).size).toBe(FIGURES.length);

    FIGURES.forEach(figure => {
      const unitSteps = new Set<string>();
      figureSegments(figure).forEach(s => {
        const dx = s.to.x - s.from.x, dy = s.to.y - s.from.y;
        // Across, down or exactly 45°, so the line passes only through dots.
        expect(dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)).withContext(figure.key).toBeTrue();
        expect(dx !== 0 || dy !== 0).withContext(figure.key).toBeTrue();
        // Split into dot-to-dot steps: no step may be drawn twice (no overlapping lines).
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        for (let i = 0; i < steps; i++) {
          const from = { x: s.from.x + (dx / steps) * i, y: s.from.y + (dy / steps) * i };
          const step = lineKey({ from, to: { x: from.x + dx / steps, y: from.y + dy / steps } });
          expect(unitSteps.has(step)).withContext(`${figure.key} repeats ${step}`).toBeFalse();
          unitSteps.add(step);
        }
      });
      const { width, height } = figureSize(figure);
      expect(Math.max(width, height)).withContext(figure.key).toBeLessThanOrEqual(6);
      expect(Math.min(...figure.polylines.flat().map(([x]) => x))).toBe(0);
      expect(Math.min(...figure.polylines.flat().map(([, y]) => y))).toBe(0);
    });
  });

  it('should have figures for every grid size, with and without diagonals', () => {
    for (const size of [3, 4, 5, 6]) {
      expect(figuresFor(size, false).length).withContext(`${size} straight`).toBeGreaterThan(0);
      expect(figuresFor(size, true).length).withContext(`${size} diagonal`).toBeGreaterThan(figuresFor(size, false).length - 1);
      figuresFor(size, false).forEach(figure => expect(hasDiagonals(figure)).withContext(figure.key).toBeFalse());
    }
    expect(figuresFor(6, true).length).toBe(FIGURES.length);
  });

  it('should draw only recognisable figures, inside the grid, without repeating one twice in a row', () => {
    component.drawingType = 'pictures';
    component.gridSize = 6;
    component.diagonals = true;
    component.problemCount = 40;
    component.generateProblems();

    component.generatedItems.forEach(item => {
      expect(item.figure).toBeDefined();
      item.segments.forEach(s => [s.from, s.to].forEach(p => {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThan(6);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThan(6);
      }));
    });
    const keys = component.generatedItems.map(item => item.figure);
    expect(new Set(keys.slice(0, FIGURES.length)).size).toBe(FIGURES.length);
    for (let i = 1; i < keys.length; i++) {
      expect(keys[i]).not.toBe(keys[i - 1]);
    }
  });

  it('should only use straight-line figures when diagonal lines are off', () => {
    component.drawingType = 'pictures';
    component.gridSize = 5;
    component.diagonals = false;
    component.problemCount = 20;
    component.generateProblems();

    const straight = figuresFor(5, false).map(f => f.key);
    component.generatedItems.forEach(item => expect(straight).toContain(item.figure!));
  });

  it('should alternate pictures and random shapes in mixed mode', () => {
    component.drawingType = 'mixed';
    component.problemCount = 6;
    component.generateProblems();

    expect(component.generatedItems.map(item => item.figure !== undefined)).toEqual([true, false, true, false, true, false]);

    component.drawingType = 'random';
    component.generateProblems();
    component.generatedItems.forEach(item => expect(item.figure).toBeUndefined());
  });

  it('should offer only line counts that fit on the grid', () => {
    component.onGridSizeChange(3);
    expect(Math.max(...component.lineCounts)).toBe(12);
    component.lineCount = 12;
    component.onDiagonalsChange(true);
    expect(Math.max(...component.lineCounts)).toBe(16);
    component.lineCount = 16;
    component.onDiagonalsChange(false);
    expect(component.lineCount).toBe(12);
  });

  it('should render a model grid with lines and an empty grid with the same dots', () => {
    component.drawingType = 'random';
    component.problemCount = 2;
    component.gridSize = 4;
    component.lineCount = 7;
    component.generateProblems();
    fixture.detectChanges();
    const grids = (fixture.nativeElement as HTMLElement).querySelectorAll('.worksheet-row')[0].querySelectorAll('svg.grid');

    expect(grids.length).toBe(2);
    expect(grids[0].querySelectorAll('.stroke').length).toBe(7);
    expect(grids[0].querySelectorAll('.dot').length).toBe(16);
    expect(grids[1].querySelectorAll('.stroke').length).toBe(0);
    expect(grids[1].querySelectorAll('.dot').length).toBe(16);
  });
});
