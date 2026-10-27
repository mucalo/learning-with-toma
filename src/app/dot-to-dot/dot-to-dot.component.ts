import { Component } from '@angular/core';
import { ALPHABETS } from '../i18n/alphabets';
import { LanguageService } from '../i18n/language.service';
import { DOT_FIGURES, DotFigure, DotFigureKey, Point, withDotCount } from './dot-figures';

export type LabelType = 'numbers' | 'letters';

/** How far a dot's label sits from the dot, away from the middle of the picture. */
const LABEL_DISTANCE = 6.5;

interface Dot {
  x: number;
  y: number;
  label: string;
  labelX: number;
  labelY: number;
}

interface DotItem {
  id: string;
  figure: DotFigureKey;
  dots: Dot[];
  closed: boolean;
  details?: string;
  /** Pictures are randomly mirrored for variety; details are mirrored with them. */
  mirrored: boolean;
  answerRevealed?: boolean;
}

/**
 * Places each dot's label just outside the outline: for a closed outline, perpendicular to it at
 * that dot (so labels on a flat edge sit beside the edge, not on it); otherwise away from the centre.
 */
export function placeDots(points: Point[], labels: string[], closed = false): Dot[] {
  const n = points.length;
  const cx = points.reduce((sum, [x]) => sum + x, 0) / n;
  const cy = points.reduce((sum, [, y]) => sum + y, 0) / n;
  // Which way round the outline goes decides which side of each edge is "outside".
  const area = points.reduce((sum, [x, y], i) => sum + x * points[(i + 1) % n][1] - points[(i + 1) % n][0] * y, 0);
  const outward = ([ax, ay]: Point, [bx, by]: Point): Point => {
    const length = Math.hypot(bx - ax, by - ay) || 1;
    return area > 0 ? [(by - ay) / length, -(bx - ax) / length] : [-(by - ay) / length, (bx - ax) / length];
  };

  return points.map(([x, y], i) => {
    let dx = x - cx;
    let dy = y - cy;
    if (closed && n >= 3) {
      const before = outward(points[(i - 1 + n) % n], points[i]);
      const after = outward(points[i], points[(i + 1) % n]);
      dx = before[0] + after[0];
      dy = before[1] + after[1];
    }
    const length = Math.hypot(dx, dy) || 1;
    return {
      x,
      y,
      label: labels[i],
      labelX: Math.round((x + (dx / length) * LABEL_DISTANCE) * 10) / 10,
      labelY: Math.round((y + (dy / length) * LABEL_DISTANCE) * 10) / 10
    };
  });
}

@Component({
  selector: 'app-dot-to-dot',
  templateUrl: './dot-to-dot.component.html',
  styleUrls: ['./dot-to-dot.component.css']
})
export class DotToDotComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 4;
  dotCount = 15;
  labelType: LabelType = 'numbers';
  generatedItems: DotItem[] = [];

  readonly labelTypes: LabelType[] = ['numbers', 'letters'];
  private readonly allDotCounts = [10, 15, 20, 25, 30];

  constructor(readonly i18n: LanguageService) {}

  /** With letters, a picture can't have more dots than the alphabet has letters. */
  get dotCounts(): number[] {
    const max = this.labelType === 'letters' ? ALPHABETS[this.i18n.language].length : Infinity;
    return this.allDotCounts.filter(count => count <= max);
  }

  onLabelTypeChange(type: LabelType): void {
    this.labelType = type;
    this.dotCount = Math.min(this.dotCount, Math.max(...this.dotCounts));
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const counts = this.dotCounts;
    const target = Math.max(counts[0], Math.min(Math.max(...counts), Number(this.dotCount) || counts[0]));
    const figures = DOT_FIGURES.filter(figure => figure.points.length <= target);
    const labels = this.labelsFor(target);
    let deck: DotFigure[] = [];
    let previous: DotFigure | undefined;

    this.generatedItems = Array.from({ length: safeCount }, (_, i) => {
      // Every fitting picture once before any repeats, never the same one twice in a row.
      if (deck.length === 0) {
        deck = [...figures].sort(() => Math.random() - 0.5);
        if (deck[0] === previous && deck.length > 1) {
          [deck[0], deck[1]] = [deck[1], deck[0]];
        }
      }
      const figure = deck.shift() as DotFigure;
      previous = figure;

      const mirrored = Math.random() < 0.5;
      const points = withDotCount(figure.points, figure.closed, target).map(([x, y]): Point => [mirrored ? 100 - x : x, y]);
      return {
        id: `dots-${i}`,
        figure: figure.key,
        dots: placeDots(points, labels, figure.closed),
        closed: figure.closed,
        details: figure.details,
        mirrored
      };
    });
  }

  private labelsFor(count: number): string[] {
    if (this.labelType === 'letters') {
      return ALPHABETS[this.i18n.language].slice(0, count);
    }
    return Array.from({ length: count }, (_, i) => String(i + 1));
  }

  get instruction(): string {
    return this.labelType === 'letters' ? this.i18n.t.dotToDot.instructionLetters : this.i18n.t.dotToDot.instructionNumbers;
  }

  labelTypeLabel(type: LabelType): string {
    return this.i18n.t.dotToDot.labelTypes[type];
  }

  figureName(item: DotItem): string {
    return this.i18n.t.dotToDot.figures[item.figure];
  }

  /** The finished outline, shown with the answer. */
  outline(item: DotItem): string {
    return item.dots.map(dot => `${dot.x},${dot.y}`).join(' ');
  }

  revealAnswer(item: DotItem): void {
    item.answerRevealed = !item.answerRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
