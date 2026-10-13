import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import {
  buildPath,
  geometryFor,
  LINE_PATTERNS,
  LineComponent,
  LineSize,
  repeatWidth,
  START_X,
  VIEW_WIDTH
} from './line.component';

/** All x,y coordinate pairs in a path, in order (arc radii are written without a comma). */
function points(path: string): { x: number; y: number }[] {
  return Array.from(path.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)).map(m => ({ x: Number(m[1]), y: Number(m[2]) }));
}

const SIZES: LineSize[] = ['small', 'medium', 'large'];

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LineComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(LineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  for (const size of SIZES) {
    for (const pattern of LINE_PATTERNS) {
      it(`should draw a continuous ${size} "${pattern.key}" that stays between the guide lines`, () => {
        const g = geometryFor(size);
        const w = repeatWidth(pattern, g);

        // Each repetition must end exactly where the next one starts.
        const segmentEnd = points(pattern.segment(100, w, g)).pop()!;
        const nextStart = pattern.start(100 + w, g);
        expect(segmentEnd.x).toBeCloseTo(nextStart.x, 0);
        expect(segmentEnd.y).toBeCloseTo(nextStart.y, 0);

        // Wave paths contain curve control points outside the band; every other point is on the line.
        if (pattern.key !== 'wave') {
          points(buildPath(pattern, START_X, 4, g)).forEach(p => {
            expect(p.y).toBeGreaterThanOrEqual(g.top - 0.5);
            expect(p.y).toBeLessThanOrEqual(g.bottom + 0.5);
          });
        }

        expect(g.guideTop).toBeLessThan(g.top);
        expect(g.guideBottom).toBeGreaterThan(g.bottom);
        expect(g.guideBottom).toBeLessThan(g.height);
        // Leave most of the line empty for the child to continue.
        expect(START_X + 4 * w).toBeLessThan(VIEW_WIDTH / 2);
      });
    }
  }

  it('should scale pattern height and width with the size', () => {
    const [small, medium, large] = SIZES.map(geometryFor);
    const zigzag = LINE_PATTERNS[0];

    expect(small.bottom - small.top).toBeLessThan(medium.bottom - medium.top);
    expect(medium.bottom - medium.top).toBeLessThan(large.bottom - large.top);
    expect(repeatWidth(zigzag, small)).toBeLessThan(repeatWidth(zigzag, large));
  });

  it('should draw two thick repetitions followed by two dashed ones that join up', () => {
    component.problemCount = 20;
    component.size = 'large';
    component.generateProblems();
    const g = geometryFor('large');

    component.generatedItems.forEach(item => {
      const pattern = LINE_PATTERNS.find(p => p.key === item.pattern)!;
      const solidEnd = points(item.solidPath).pop()!;
      const dashedStart = points(item.dashedPath)[0];

      expect(item.solidPath).toBe(buildPath(pattern, START_X, 2, g));
      expect(item.dashedPath).toBe(buildPath(pattern, START_X + 2 * repeatWidth(pattern, g), 2, g));
      expect(solidEnd.x).toBeCloseTo(dashedStart.x, 0);
      expect(solidEnd.y).toBeCloseTo(dashedStart.y, 0);
    });
  });

  it('should mix random shapes by default without repeating the same shape twice in a row', () => {
    component.problemCount = 100;
    component.generateProblems();
    const shapes = component.generatedItems.map(item => item.pattern);

    expect(new Set(shapes).size).toBe(LINE_PATTERNS.length);
    for (let i = 1; i < shapes.length; i++) {
      expect(shapes[i]).not.toBe(shapes[i - 1]);
    }
  });

  it('should use only the chosen shape when one is selected', () => {
    component.shape = 'loops';
    component.problemCount = 10;
    component.generateProblems();

    component.generatedItems.forEach(item => expect(item.pattern).toBe('loops'));
  });

  it('should offer "Mixed" plus every shape, with translated names', () => {
    expect(component.shapes).toEqual(['mixed', ...LINE_PATTERNS.map(p => p.key)]);
    expect(component.shapeLabel('mixed')).toBe('Mixed');
    expect(component.shapeLabel('zigzag')).toBe('Zig-zag');

    component.i18n.language = 'croatian';
    expect(component.shapeLabel('wave')).toBe('Valovi');
    expect(component.sizeLabel('large')).toBe('Velika');
  });

  it('should show guide lines and mention them in the instruction only when chosen', () => {
    component.problemCount = 2;
    component.generateProblems();
    const compiled = fixture.nativeElement as HTMLElement;

    component.showGuides = true;
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.guides line').length).toBe(4);
    expect(component.instruction).toContain('Stay between the two lines.');

    component.showGuides = false;
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.guides line').length).toBe(0);
    expect(component.instruction).not.toContain('Stay between');
  });
});
