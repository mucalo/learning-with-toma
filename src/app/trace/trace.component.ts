import { Component } from '@angular/core';
import { ALPHABETS } from '../i18n/alphabets';
import { LanguageKey } from '../i18n/languages';
import { LanguageService } from '../i18n/language.service';
import { BASELINE, DESCENDER, DIGRAPH_GAP, GLYPHS, MIDDLE, TOP, strokeStart } from './glyphs';

export type TraceType = 'uppercase' | 'lowercase' | 'numbers';
export type TraceOrder = 'alphabet' | 'random';
export type TraceSize = 'small' | 'medium' | 'large';

/** Row width in glyph units: the wider the row, the smaller the letters on the page. */
export const VIEW_WIDTHS: Record<TraceSize, number> = { small: 1500, medium: 1150, large: 850 };
/** Vertical extent of a row in glyph units, with room for carons and accents above capitals. */
export const VIEW_TOP = -40;
export const VIEW_BOTTOM = 150;
/** Where the model letter starts, and the gap between letters. */
const START_X = 30;
const GAP = 55;
/** The model and the dotted copies fill up to half the row; the rest is for writing alone. */
const TRACING_SHARE = 0.5;

export const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

/** Digraphs that count as one letter, per language (lowercase). */
const DIGRAPHS: Record<LanguageKey, string[]> = {
  english: [],
  croatian: ['dž', 'lj', 'nj'],
  serbian: ['dž', 'lj', 'nj']
};

export interface PlacedStroke {
  /** The glyph's path, drawn shifted right by `offset` (the second letter of a digraph). */
  d: string;
  offset: number;
  /** Start of the stroke, already shifted by `offset`. */
  start: [number, number];
  /** Writing order within the character, from 1. */
  order: number;
  /** Where the order number goes, relative to the start: left of it, or right when another stroke starts there too. */
  labelDx: number;
}

/** A character (a letter, a digraph such as "Lj", or a digit) laid out from x = 0. */
export interface CharacterLayout {
  width: number;
  strokes: PlacedStroke[];
  dots: [number, number][];
}

export function layoutCharacter(character: string): CharacterLayout {
  const strokes: PlacedStroke[] = [];
  const dots: [number, number][] = [];
  let x = 0;

  Array.from(character).forEach((key, i) => {
    const glyph = GLYPHS[key];
    if (!glyph) {
      throw new Error(`No glyph for "${key}"`);
    }
    if (i > 0) {
      x += DIGRAPH_GAP;
    }
    const offset = x;
    for (const d of glyph.strokes) {
      const [sx, sy] = strokeStart(d);
      const start: [number, number] = [sx + offset, sy];
      const sharesStart = strokes.some(other => Math.hypot(other.start[0] - start[0], other.start[1] - start[1]) < 14);
      strokes.push({ d, offset, start, order: strokes.length + 1, labelDx: sharesStart ? 11 : -11 });
    }
    for (const [dx, dy] of glyph.dots ?? []) {
      dots.push([dx + offset, dy]);
    }
    x += glyph.width;
  });

  return { width: x, strokes, dots };
}

/** Characters to practise, in alphabetical order, for a language and type. */
export function charactersFor(type: TraceType, language: LanguageKey): string[] {
  if (type === 'numbers') {
    return DIGITS;
  }
  const capitals = ALPHABETS[language];
  return type === 'uppercase' ? capitals : capitals.map(letter => letter.toLocaleLowerCase());
}

/**
 * Reads the "only these letters" field, e.g. "b d p" or "bdp", into characters of the chosen type.
 * Digraphs (lj, nj, dž) count as one letter in Croatian and Serbian. Unknown characters are skipped.
 */
export function parseCustomCharacters(text: string, type: TraceType, language: LanguageKey): string[] {
  const lower = text.toLocaleLowerCase();
  const digraphs = type === 'numbers' ? [] : DIGRAPHS[language];
  const result: string[] = [];

  for (let i = 0; i < lower.length; ) {
    const digraph = digraphs.find(d => lower.startsWith(d, i));
    const token = digraph ?? lower[i];
    i += token.length;

    const character = type === 'uppercase' ? token.charAt(0).toLocaleUpperCase() + token.slice(1) : token;
    const isDigit = /^\d$/.test(token);
    if ((type === 'numbers') !== isDigit) {
      continue;
    }
    if (Array.from(character).every(key => key in GLYPHS) && !result.includes(character)) {
      result.push(character);
    }
  }
  return result;
}

interface TraceItem {
  id: string;
  character: string;
  layout: CharacterLayout;
  /** x position of the solid model, then of each dotted copy. */
  modelX: number;
  copyXs: number[];
}

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 14;
  traceType: TraceType = 'uppercase';
  order: TraceOrder = 'alphabet';
  size: TraceSize = 'medium';
  customCharacters = '';
  generatedItems: TraceItem[] = [];
  /** The size the current worksheet was generated with. */
  generatedSize: TraceSize = 'medium';

  readonly traceTypes: TraceType[] = ['uppercase', 'lowercase', 'numbers'];
  readonly orders: TraceOrder[] = ['alphabet', 'random'];
  readonly sizes: TraceSize[] = ['small', 'medium', 'large'];
  readonly guides = { top: TOP, middle: MIDDLE, baseline: BASELINE, descender: DESCENDER };

  constructor(readonly i18n: LanguageService) {}

  get instruction(): string {
    return this.traceType === 'numbers' ? this.i18n.t.trace.instructionNumbers : this.i18n.t.trace.instructionLetters;
  }

  get viewWidth(): number {
    return VIEW_WIDTHS[this.generatedSize];
  }

  get viewBox(): string {
    return `0 ${VIEW_TOP} ${this.viewWidth} ${VIEW_BOTTOM - VIEW_TOP}`;
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const language = this.i18n.language;
    const custom = parseCustomCharacters(this.customCharacters, this.traceType, language);
    const pool = custom.length > 0 ? custom : charactersFor(this.traceType, language);
    let deck: string[] = [];
    let previous: string | undefined;

    this.generatedSize = this.size;
    this.generatedItems = Array.from({ length: safeCount }, (_, i) => {
      let character: string;
      if (this.order === 'alphabet') {
        character = pool[i % pool.length];
      } else {
        // Every character once before any repeats, and never the same one twice in a row.
        if (deck.length === 0) {
          deck = [...pool].sort(() => Math.random() - 0.5);
          if (deck[0] === previous && deck.length > 1) {
            [deck[0], deck[1]] = [deck[1], deck[0]];
          }
        }
        character = deck.shift() as string;
      }
      previous = character;
      return this.createItem(character, i);
    });
  }

  private createItem(character: string, index: number): TraceItem {
    const layout = layoutCharacter(character);
    const step = layout.width + GAP;
    const tracingEnd = VIEW_WIDTHS[this.generatedSize] * TRACING_SHARE;
    const copyXs: number[] = [];
    for (let x = START_X + step; x + layout.width <= tracingEnd || copyXs.length === 0; x += step) {
      copyXs.push(x);
    }
    return { id: `trace-${index}`, character, layout, modelX: START_X, copyXs };
  }

  typeLabel(type: TraceType): string {
    return this.i18n.t.trace.types[type];
  }

  orderLabel(order: TraceOrder): string {
    return this.i18n.t.trace.orders[order];
  }

  sizeLabel(size: TraceSize): string {
    return this.i18n.t.trace.sizes[size];
  }

  rowLabel(item: TraceItem): string {
    return this.i18n.t.trace.rowLabel.replace('{character}', item.character);
  }

  translate(x: number, offset = 0): string {
    return `translate(${x + offset} 0)`;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
