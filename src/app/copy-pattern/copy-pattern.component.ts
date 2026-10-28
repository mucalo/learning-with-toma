import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

/** Distance between dots in SVG units, and the margin around the grid. */
export const SPACING = 10;
const MARGIN = 4;
/** Physical distance between dots on screen and paper, so dots and lines look the same at every grid size. */
const DOT_DISTANCE_REM = 2.4;

export interface Point {
  x: number;
  y: number;
}

/** A line between two neighbouring dots. */
export interface Segment {
  from: Point;
  to: Point;
}

const ORTHOGONAL: Point[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 }
];
const DIAGONAL: Point[] = [
  { x: 1, y: 1 },
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 }
];

const key = (a: Point, b: Point) =>
  a.x < b.x || (a.x === b.x && a.y < b.y) ? `${a.x},${a.y}-${b.x},${b.y}` : `${b.x},${b.y}-${a.x},${a.y}`;

/** How many lines fit on a grid: every horizontal and vertical link, plus one diagonal per square. */
export function maxLines(gridSize: number, diagonals: boolean): number {
  const orthogonal = 2 * gridSize * (gridSize - 1);
  return diagonals ? orthogonal + (gridSize - 1) ** 2 : orthogonal;
}

/**
 * Draws a random connected figure: a pencil walk from dot to dot that never repeats a line.
 * When it gets stuck it continues from a dot it already visited, so the figure stays connected.
 * Diagonals never cross each other, which keeps the figure easy to read and copy.
 */
export function generateFigure(gridSize: number, lineCount: number, diagonals: boolean): Segment[] {
  const target = Math.min(lineCount, maxLines(gridSize, diagonals));
  const directions = diagonals ? [...ORTHOGONAL, ...DIAGONAL] : ORTHOGONAL;
  const used = new Set<string>();
  const usedSquares = new Set<string>();
  const segments: Segment[] = [];
  const visited: Point[] = [];
  let current: Point = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
  visited.push(current);

  for (let attempts = 0; segments.length < target && attempts < 1000; attempts++) {
    const options = directions
      .map(d => ({ x: current.x + d.x, y: current.y + d.y }))
      .filter(next => next.x >= 0 && next.x < gridSize && next.y >= 0 && next.y < gridSize)
      .filter(next => !used.has(key(current, next)))
      .filter(next => next.x === current.x || next.y === current.y || !usedSquares.has(`${Math.min(current.x, next.x)},${Math.min(current.y, next.y)}`));

    if (options.length === 0) {
      current = visited[Math.floor(Math.random() * visited.length)];
      continue;
    }

    const next = options[Math.floor(Math.random() * options.length)];
    used.add(key(current, next));
    if (next.x !== current.x && next.y !== current.y) {
      usedSquares.add(`${Math.min(current.x, next.x)},${Math.min(current.y, next.y)}`);
    }
    segments.push({ from: current, to: next });
    visited.push(next);
    current = next;
  }

  return segments;
}

/**
 * A hand-drawn, recognisable figure. Each polyline is a list of [x, y] dots joined in order.
 * Lines only go across, down or at 45°, so every line runs exactly from dot to dot.
 */
export interface PatternFigure {
  key: string;
  polylines: [number, number][][];
}

export const FIGURES: PatternFigure[] = [
  // Fit a 3×3 grid
  { key: 'small house', polylines: [[[0, 1], [1, 0], [2, 1], [0, 1], [0, 2], [2, 2], [2, 1]]] },
  { key: 'arrow up', polylines: [[[1, 2], [1, 0]], [[0, 1], [1, 0], [2, 1]]] },
  { key: 'small stairs', polylines: [[[0, 2], [0, 1], [1, 1], [1, 0], [2, 0], [2, 2], [0, 2]]] },
  // Fit a 4×4 grid
  { key: 'house', polylines: [[[0, 1], [1, 0], [2, 1], [0, 1]], [[0, 1], [0, 3], [2, 3], [2, 1]], [[1, 3], [1, 2]]] },
  { key: 'plus', polylines: [[[1, 0], [2, 0], [2, 1], [3, 1], [3, 2], [2, 2], [2, 3], [1, 3], [1, 2], [0, 2], [0, 1], [1, 1], [1, 0]]] },
  // Fit a 5×5 grid
  { key: 'boat', polylines: [[[0, 3], [4, 3], [3, 4], [1, 4], [0, 3]], [[2, 3], [2, 0]], [[2, 0], [4, 2], [2, 2]]] },
  { key: 'arrow', polylines: [[[0, 2], [4, 2]], [[2, 0], [4, 2], [2, 4]]] },
  // A two-tier fir tree (a single triangle on a stick reads as an umbrella).
  { key: 'tree', polylines: [[[2, 0], [0, 2], [1, 2], [0, 3], [4, 3], [3, 2], [4, 2], [2, 0]], [[2, 3], [2, 4]]] },
  { key: 'heart', polylines: [[[2, 4], [0, 2], [0, 1], [1, 0], [2, 1], [3, 0], [4, 1], [4, 2], [2, 4]]] },
  { key: 'fish', polylines: [[[0, 1], [1, 0], [2, 0], [3, 1], [2, 2], [1, 2], [0, 1]], [[3, 1], [4, 0], [4, 2], [3, 1]]] },
  { key: 'envelope', polylines: [[[0, 0], [4, 0], [4, 3], [0, 3], [0, 0]], [[0, 0], [2, 2], [4, 0]]] },
  { key: 'rocket', polylines: [[[1, 4], [1, 1], [2, 0], [3, 1], [3, 4], [1, 4]], [[1, 3], [0, 4], [1, 4]], [[3, 3], [4, 4], [3, 4]]] },
  { key: 'crown', polylines: [[[0, 3], [0, 0], [1, 1], [2, 0], [3, 1], [4, 0], [4, 3], [0, 3]]] },
  { key: 'hourglass', polylines: [[[0, 0], [4, 0], [2, 2], [4, 4], [0, 4], [2, 2], [0, 0]]] },
  { key: 'stairs', polylines: [[[0, 4], [0, 3], [1, 3], [1, 2], [2, 2], [2, 1], [3, 1], [3, 0], [4, 0], [4, 4], [0, 4]]] },
  { key: 'castle', polylines: [[[0, 4], [0, 0], [1, 0], [1, 1], [3, 1], [3, 0], [4, 0], [4, 4], [0, 4]], [[2, 4], [2, 3]]] },
  { key: 'window', polylines: [[[0, 0], [4, 0], [4, 4], [0, 4], [0, 0]], [[2, 0], [2, 4]], [[0, 2], [4, 2]]] },
  { key: 'chair', polylines: [[[0, 0], [0, 4]], [[0, 2], [2, 2], [2, 4]]] },
  { key: 'table', polylines: [[[0, 0], [4, 0]], [[1, 0], [1, 2]], [[3, 0], [3, 2]]] },
  // Fits a 6×6 grid
  { key: 'kite', polylines: [[[2, 0], [4, 2], [2, 4], [0, 2], [2, 0]], [[2, 0], [2, 4]], [[0, 2], [4, 2]], [[2, 4], [3, 5]]] }
];

/** The figure's lines as segments, moved by the given offset. */
export function figureSegments(figure: PatternFigure, offset: Point = { x: 0, y: 0 }): Segment[] {
  return figure.polylines.flatMap(line =>
    line.slice(1).map(([x, y], i) => ({
      from: { x: line[i][0] + offset.x, y: line[i][1] + offset.y },
      to: { x: x + offset.x, y: y + offset.y }
    }))
  );
}

/** Width and height of a figure in dots. */
export function figureSize(figure: PatternFigure): { width: number; height: number } {
  const points = figure.polylines.flat();
  return {
    width: Math.max(...points.map(([x]) => x)) + 1,
    height: Math.max(...points.map(([, y]) => y)) + 1
  };
}

export function hasDiagonals(figure: PatternFigure): boolean {
  return figureSegments(figure).some(s => s.from.x !== s.to.x && s.from.y !== s.to.y);
}

/** Figures that fit the grid and respect the "diagonal lines" choice. */
export function figuresFor(gridSize: number, diagonals: boolean): PatternFigure[] {
  return FIGURES.filter(figure => {
    const { width, height } = figureSize(figure);
    return width <= gridSize && height <= gridSize && (diagonals || !hasDiagonals(figure));
  });
}

export type DrawingType = 'random' | 'pictures' | 'mixed';

interface PatternItem {
  id: string;
  gridSize: number;
  segments: Segment[];
  /** Set for recognisable figures, e.g. "house". */
  figure?: string;
}

@Component({
  selector: 'app-copy-pattern',
  templateUrl: './copy-pattern.component.html',
  styleUrls: ['./copy-pattern.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class CopyPatternComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 10;
  gridSize = 4;
  lineCount = 6;
  diagonals = false;
  drawingType: DrawingType = 'mixed';
  generatedItems: PatternItem[] = [];

  readonly gridSizes = [3, 4, 5, 6];
  readonly drawingTypes: DrawingType[] = ['random', 'pictures', 'mixed'];
  readonly spacing = SPACING;

  constructor(readonly i18n: LanguageService) {}

  /** 3 lines up to as many as fit on the grid, capped at 16 to keep figures copyable. */
  get lineCounts(): number[] {
    const max = Math.min(16, maxLines(this.gridSize, this.diagonals));
    return Array.from({ length: max - 2 }, (_, i) => i + 3);
  }

  onGridSizeChange(size: number): void {
    this.gridSize = size;
    this.lineCount = Math.min(this.lineCount, Math.max(...this.lineCounts));
  }

  onDiagonalsChange(diagonals: boolean): void {
    this.diagonals = diagonals;
    this.lineCount = Math.min(this.lineCount, Math.max(...this.lineCounts));
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const size = Math.max(3, Math.min(6, Number(this.gridSize) || 4));
    const lines = Math.max(3, Math.min(Number(this.lineCount) || 3, maxLines(size, this.diagonals)));
    const figures = figuresFor(size, this.diagonals);
    let deck: PatternFigure[] = [];
    let previous: PatternFigure | null = null;

    this.generatedItems = Array.from({ length: safeCount }, (_, i) => {
      const usePicture = this.drawingType === 'pictures' || (this.drawingType === 'mixed' && i % 2 === 0);

      if (!usePicture || figures.length === 0) {
        return { id: `pattern-${i}`, gridSize: size, segments: generateFigure(size, lines, this.diagonals) };
      }

      // Show every fitting figure before repeating one, never the same figure twice in a row.
      if (deck.length === 0) {
        deck = [...figures].sort(() => Math.random() - 0.5);
        if (deck[0] === previous && deck.length > 1) {
          [deck[0], deck[1]] = [deck[1], deck[0]];
        }
      }
      const figure = deck.shift() as PatternFigure;
      previous = figure;

      // Place the figure at a random spot when the grid is bigger than the figure.
      const { width, height } = figureSize(figure);
      const offset = {
        x: Math.floor(Math.random() * (size - width + 1)),
        y: Math.floor(Math.random() * (size - height + 1))
      };
      return { id: `pattern-${i}`, gridSize: size, segments: figureSegments(figure, offset), figure: figure.key };
    });
  }

  drawingTypeLabel(type: DrawingType): string {
    return this.i18n.t.copyPattern.drawingTypes[type];
  }

  dots(item: PatternItem): Point[] {
    return Array.from({ length: item.gridSize * item.gridSize }, (_, i) => ({ x: i % item.gridSize, y: Math.floor(i / item.gridSize) }));
  }

  viewBox(item: PatternItem): string {
    const extent = (item.gridSize - 1) * SPACING + 2 * MARGIN;
    return `${-MARGIN} ${-MARGIN} ${extent} ${extent}`;
  }

  gridWidth(item: PatternItem): string {
    return `${(item.gridSize - 1 + (2 * MARGIN) / SPACING) * DOT_DISTANCE_REM}rem`;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
