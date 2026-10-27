import { Component } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { Translations } from '../i18n/translations';

/** Drawing area width in SVG units. The SVG is stretched to the full width of the page. */
export const VIEW_WIDTH = 1000;
export const START_X = 30;
/** Repetitions drawn as a thick line, then as a dashed line to trace over. */
export const SOLID_REPEATS = 2;
export const DASHED_REPEATS = 2;

/** Pattern height at medium size; widths in LINE_PATTERNS are also for medium size. */
const BASE_BAND = 70;
/** Space above and below the pattern, and the gap between the pattern and a guide line. */
const MARGIN = 35;
const GUIDE_GAP = 13;

export type LineSize = 'small' | 'medium' | 'large';
export const SIZE_SCALE: Record<LineSize, number> = { small: 0.7, medium: 1, large: 1.4 };

export type LinePatternKey = keyof Translations['line']['patterns'];
export type ShapeChoice = LinePatternKey | 'mixed';

/** Vertical layout of one line at a given size. The pattern always stays between top and bottom. */
export interface LineGeometry {
  scale: number;
  top: number;
  bottom: number;
  middle: number;
  height: number;
  guideTop: number;
  guideBottom: number;
}

export function geometryFor(size: LineSize): LineGeometry {
  const scale = SIZE_SCALE[size];
  const top = MARGIN;
  const bottom = MARGIN + BASE_BAND * scale;
  return {
    scale,
    top,
    bottom,
    middle: (top + bottom) / 2,
    height: bottom + MARGIN,
    guideTop: top - GUIDE_GAP,
    guideBottom: bottom + GUIDE_GAP
  };
}

interface Point {
  x: number;
  y: number;
}

export interface LinePattern {
  key: LinePatternKey;
  /** Horizontal length of one repetition at medium size. */
  width: number;
  /** Where a repetition starting at x0 begins (always the same height, so repetitions join up). */
  start(x0: number, g: LineGeometry): Point;
  /** SVG path commands drawing one repetition of width w from start(x0) to start(x0 + w). */
  segment(x0: number, w: number, g: LineGeometry): string;
}

const r = (value: number) => Math.round(value * 10) / 10;
const pt = (x: number, y: number) => `${r(x)},${r(y)}`;

/** Shapes that are easy to continue by hand: every repetition ends where the next one starts. */
export const LINE_PATTERNS: LinePattern[] = [
  {
    key: 'zigzag',
    width: 70,
    start: (x0, g) => ({ x: x0, y: g.bottom }),
    segment: (x0, w, g) => `L${pt(x0 + w / 2, g.top)} L${pt(x0 + w, g.bottom)}`
  },
  {
    key: 'wave',
    width: 80,
    start: (x0, g) => ({ x: x0, y: g.middle }),
    // Quadratic control points at 2·peak − middle make each half-wave reach exactly top / bottom.
    segment: (x0, w, g) =>
      `Q${pt(x0 + w / 4, 2 * g.top - g.middle)} ${pt(x0 + w / 2, g.middle)} ` +
      `Q${pt(x0 + (3 * w) / 4, 2 * g.bottom - g.middle)} ${pt(x0 + w, g.middle)}`
  },
  {
    key: 'arches',
    width: 70,
    start: (x0, g) => ({ x: x0, y: g.bottom }),
    segment: (x0, w, g) => `A${r(w / 2)} ${r(g.bottom - g.top)} 0 0 1 ${pt(x0 + w, g.bottom)}`
  },
  {
    key: 'cups',
    width: 70,
    start: (x0, g) => ({ x: x0, y: g.top }),
    segment: (x0, w, g) => `A${r(w / 2)} ${r(g.bottom - g.top)} 0 0 0 ${pt(x0 + w, g.top)}`
  },
  {
    key: 'castle',
    width: 80,
    start: (x0, g) => ({ x: x0, y: g.bottom }),
    segment: (x0, w, g) =>
      `L${pt(x0, g.top)} L${pt(x0 + w / 2, g.top)} L${pt(x0 + w / 2, g.bottom)} L${pt(x0 + w, g.bottom)}`
  },
  {
    key: 'sawtooth',
    width: 70,
    start: (x0, g) => ({ x: x0, y: g.bottom }),
    segment: (x0, w, g) => `L${pt(x0 + w, g.top)} L${pt(x0 + w, g.bottom)}`
  },
  {
    key: 'loops',
    width: 80,
    start: (x0, g) => ({ x: x0, y: g.bottom }),
    // A looping trochoid: one loop per repetition, from the bottom line up to the top line.
    segment: (x0, w, g) => {
      const a = w / (2 * Math.PI);
      const b = 2.1 * a;
      const c = (g.bottom - g.top) / 2;
      const steps = 36;
      const points: string[] = [];
      for (let i = 1; i <= steps; i++) {
        const t = Math.PI + (2 * Math.PI * i) / steps;
        points.push(`L${pt(x0 + a * (t - Math.PI) - b * Math.sin(t), g.middle - c * Math.cos(t))}`);
      }
      return points.join(' ');
    }
  }
];

/** Width of one repetition of a pattern at the given geometry's size. */
export function repeatWidth(pattern: LinePattern, g: LineGeometry): number {
  return pattern.width * g.scale;
}

/** Draws `repeats` repetitions of a pattern starting at x0, as one continuous path. */
export function buildPath(pattern: LinePattern, x0: number, repeats: number, g: LineGeometry): string {
  const w = repeatWidth(pattern, g);
  const start = pattern.start(x0, g);
  const segments = Array.from({ length: repeats }, (_, i) => pattern.segment(x0 + i * w, w, g));
  return `M${pt(start.x, start.y)} ${segments.join(' ')}`;
}

interface LineItem {
  id: string;
  pattern: LinePatternKey;
  viewBox: string;
  guideTop: number;
  guideBottom: number;
  start: Point;
  solidPath: string;
  dashedPath: string;
  /** Dash and gap lengths, scaled with the size so small curves stay easy to follow. */
  dash: string;
}

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 16;
  shape: ShapeChoice = 'mixed';
  size: LineSize = 'medium';
  showGuides = true;
  generatedItems: LineItem[] = [];

  readonly shapes: ShapeChoice[] = ['mixed', ...LINE_PATTERNS.map(p => p.key)];
  readonly sizes: LineSize[] = ['small', 'medium', 'large'];
  readonly viewWidth = VIEW_WIDTH;

  constructor(readonly i18n: LanguageService) {}

  get instruction(): string {
    const t = this.i18n.t.line;
    return this.showGuides ? `${t.instruction} ${t.guidesInstruction}` : t.instruction;
  }

  shapeLabel(shape: ShapeChoice): string {
    const t = this.i18n.t.line;
    return shape === 'mixed' ? t.mixed : t.patterns[shape];
  }

  sizeLabel(size: LineSize): string {
    return this.i18n.t.line[size];
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const g = geometryFor(this.size);
    const fixed = LINE_PATTERNS.find(p => p.key === this.shape);
    this.generatedItems = [];
    let previous: LinePattern | null = null;

    for (let i = 0; i < safeCount; i++) {
      // "Mixed" picks a random shape for every line, never the same one twice in a row.
      const options: LinePattern[] = LINE_PATTERNS.filter(p => p !== previous);
      const pattern: LinePattern = fixed ?? options[Math.floor(Math.random() * options.length)];
      const dashedStart = START_X + SOLID_REPEATS * repeatWidth(pattern, g);

      this.generatedItems.push({
        id: `line-${i}`,
        pattern: pattern.key,
        viewBox: `0 0 ${VIEW_WIDTH} ${r(g.height)}`,
        guideTop: g.guideTop,
        guideBottom: r(g.guideBottom),
        start: pattern.start(START_X, g),
        solidPath: buildPath(pattern, START_X, SOLID_REPEATS, g),
        dashedPath: buildPath(pattern, dashedStart, DASHED_REPEATS, g),
        dash: `${r(10 * g.scale)} ${r(9 * g.scale)}`
      });
      previous = pattern;
    }
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
