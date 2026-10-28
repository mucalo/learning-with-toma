import { Component } from '@angular/core';
import { LanguageKey } from '../i18n/languages';
import { LanguageService } from '../i18n/language.service';

export type ElementType = 'shapes' | 'numbers' | 'letters';
/** Whether every pattern has exactly N items, or each line picks a length from 2 to N. */
export type LengthMode = 'exactly' | 'upTo';
type Shape = 'triangle' | 'circle' | 'square';

/**
 * Boxes on one line of the worksheet: the pattern shown twice, then empty boxes up to the end of
 * the line. Worksheets are always A4, so a line is always 186mm (about 703px) wide, which fits 15
 * boxes of 2.5rem with their gaps. Keep in step with `.sequence` in the component's styles.
 */
export const CELLS_PER_LINE = 15;

interface SequenceItem {
  id: string;
  type: ElementType;
  /** One recurrence of the pattern. */
  pattern: string[];
  /** The pattern repeated twice, shown at the start of the line. */
  shown: string[];
  /** The expected continuation, one empty box per element, filling the rest of the line. */
  continuation: string[];
  answerRevealed?: boolean;
}

const SHAPES: Shape[] = ['triangle', 'circle', 'square'];
const NUMBERS = '0123456789'.split('');
// Single-character letters of each alphabet (digraphs such as lj, nj, dž are left out).
const LETTERS: Record<LanguageKey, string[]> = {
  english: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  croatian: 'ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ'.split(''),
  serbian: 'ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ'.split('')
};

/**
 * A pattern is usable when it is not itself a repetition of a shorter pattern.
 * This rules out a single repeated element (AAA) and, for example, ABAB as a "pattern of 4",
 * and forces a pattern of 2 to use two different elements.
 */
export function isValidPattern(pattern: readonly string[]): boolean {
  const length = pattern.length;
  for (let period = 1; period < length; period++) {
    if (length % period === 0 && pattern.every((value, i) => value === pattern[i % period])) {
      return false;
    }
  }
  return length >= 2;
}

@Component({
    selector: 'app-sequence',
    templateUrl: './sequence.component.html',
    styleUrls: ['./sequence.component.css'],
    standalone: false
})
export class SequenceComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 24;
  elementType: ElementType = 'shapes';
  patternLength = 3;
  lengthMode: LengthMode = 'exactly';
  generatedItems: SequenceItem[] = [];

  readonly elementTypes: ElementType[] = ['shapes', 'numbers', 'letters'];
  readonly patternLengths = [2, 3, 4, 5];
  readonly lengthModes: LengthMode[] = ['exactly', 'upTo'];

  constructor(readonly i18n: LanguageService) {}

  /** "Exactly 2" and "up to 2" are the same, so the choice is only offered from 3 upwards. */
  get showLengthMode(): boolean {
    return Number(this.patternLength) >= 3;
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const safeLength = Math.max(2, Math.min(5, Number(this.patternLength) || 2));
    const varyLength = this.showLengthMode && this.lengthMode === 'upTo';
    const symbols = this.getSymbols(this.elementType);
    const usedPatterns = new Set<string>();

    this.generatedItems = [];

    for (let i = 0; i < safeCount; i++) {
      const length = varyLength ? 2 + Math.floor(Math.random() * (safeLength - 1)) : safeLength;
      let pattern = this.createPattern(symbols, length);

      // Prefer a pattern that isn't already on the worksheet (shapes only have a few options).
      for (let attempt = 0; attempt < 20 && usedPatterns.has(pattern.join('|')); attempt++) {
        pattern = this.createPattern(symbols, length);
      }
      usedPatterns.add(pattern.join('|'));

      this.generatedItems.push({
        id: `sequence-${i}`,
        type: this.elementType,
        pattern,
        shown: [...pattern, ...pattern],
        // The shown part is whole recurrences, so the blanks carry on from the pattern's start.
        continuation: Array.from({ length: CELLS_PER_LINE - 2 * pattern.length }, (_, index) => pattern[index % pattern.length])
      });
    }
  }

  private getSymbols(type: ElementType): string[] {
    switch (type) {
      case 'shapes':
        return SHAPES;
      case 'numbers':
        return NUMBERS;
      default:
        return LETTERS[this.i18n.language];
    }
  }

  private createPattern(symbols: string[], length: number): string[] {
    const maxDistinct = Math.min(length, symbols.length);

    for (let attempt = 0; attempt < 100; attempt++) {
      const distinct = 2 + Math.floor(Math.random() * (maxDistinct - 1));
      const palette = this.pickDistinct(symbols, distinct);
      const pattern = Array.from({ length }, () => palette[Math.floor(Math.random() * palette.length)]);

      if (isValidPattern(pattern)) {
        return pattern;
      }
    }

    // Practically unreachable; "ABB…B" is always a valid pattern.
    const [first, second] = this.pickDistinct(symbols, 2);
    return [first, ...Array.from({ length: length - 1 }, () => second)];
  }

  private pickDistinct(symbols: string[], count: number): string[] {
    const pool = [...symbols];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  shapeLabel(shape: string): string {
    return this.i18n.t.sequence[shape as Shape] ?? shape;
  }

  revealAnswer(item: SequenceItem): void {
    item.answerRevealed = !item.answerRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
