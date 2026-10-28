import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageKey } from '../i18n/languages';
import { LanguageService } from '../i18n/language.service';
import { Translations } from '../i18n/translations';

export type Position = keyof Translations['where']['positions'];
export const POSITIONS: Position[] = ['on', 'under', 'nextTo', 'above'];

/** Scene drawing area in SVG units; the floor is at FLOOR_Y. */
export const SCENE_WIDTH = 130;
export const SCENE_HEIGHT = 104;
export const FLOOR_Y = 96;
const CENTRE_X = SCENE_WIDTH / 2;

interface Spot {
  x: number;
  y: number;
  size: number;
}

/** Noun forms needed by the sentences: Croatian and Serbian prepositions take different cases. */
interface ThingNames {
  /** English noun, e.g. "table". */
  english: string;
  /** Genitive (ispod / iznad / pokraj stola) and locative (na stolu). */
  croatian: { gen: string; loc: string };
  serbian: { gen: string; loc: string };
}

/**
 * Objects are drawn as simple line art (not emoji) so "on", "under" (between the legs) and
 * "above" have exact, unambiguous places.
 */
export interface Thing {
  key: string;
  names: ThingNames;
  rects: { x: number; y: number; width: number; height: number }[];
  spots: Record<'on' | 'under' | 'above', Spot>;
  /** Horizontal distance from the centre for "next to" (standing on the floor). */
  sideOffset: number;
}

export const THINGS: Thing[] = [
  {
    key: 'table',
    names: { english: 'table', croatian: { gen: 'stola', loc: 'stolu' }, serbian: { gen: 'stola', loc: 'stolu' } },
    rects: [
      { x: 25, y: 50, width: 80, height: 6 },
      { x: 30, y: 56, width: 5, height: 40 },
      { x: 95, y: 56, width: 5, height: 40 }
    ],
    spots: { on: { x: 65, y: 40, size: 20 }, under: { x: 65, y: 86, size: 18 }, above: { x: 65, y: 11, size: 20 } },
    sideOffset: 55
  },
  {
    key: 'chair',
    names: { english: 'chair', croatian: { gen: 'stolice', loc: 'stolici' }, serbian: { gen: 'stolice', loc: 'stolici' } },
    rects: [
      { x: 44, y: 64, width: 42, height: 6 },
      { x: 80, y: 30, width: 6, height: 34 },
      { x: 46, y: 70, width: 5, height: 26 },
      { x: 79, y: 70, width: 5, height: 26 }
    ],
    spots: { on: { x: 61, y: 54, size: 20 }, under: { x: 65, y: 88, size: 14 }, above: { x: 62, y: 11, size: 20 } },
    sideOffset: 48
  },
  {
    key: 'bed',
    names: { english: 'bed', croatian: { gen: 'kreveta', loc: 'krevetu' }, serbian: { gen: 'kreveta', loc: 'krevetu' } },
    rects: [
      { x: 26, y: 60, width: 78, height: 12 },
      { x: 26, y: 42, width: 7, height: 30 },
      { x: 29, y: 72, width: 5, height: 24 },
      { x: 96, y: 72, width: 5, height: 24 }
    ],
    spots: { on: { x: 70, y: 50, size: 20 }, under: { x: 65, y: 86, size: 16 }, above: { x: 68, y: 13, size: 20 } },
    sideOffset: 54
  }
];

export interface Character {
  emoji: string;
  names: Record<LanguageKey, string>;
}

export const CHARACTERS: Character[] = [
  { emoji: '🐱', names: { english: 'cat', croatian: 'mačka', serbian: 'mačka' } },
  { emoji: '🐶', names: { english: 'dog', croatian: 'pas', serbian: 'pas' } },
  { emoji: '🐭', names: { english: 'mouse', croatian: 'miš', serbian: 'miš' } },
  { emoji: '🐰', names: { english: 'rabbit', croatian: 'zec', serbian: 'zec' } },
  { emoji: '⚽', names: { english: 'ball', croatian: 'lopta', serbian: 'lopta' } },
  { emoji: '🐦', names: { english: 'bird', croatian: 'ptica', serbian: 'ptica' } },
  { emoji: '🧸', names: { english: 'teddy bear', croatian: 'medo', serbian: 'meda' } }
];

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * A task sentence split around its preposition, so the preposition can be shown in bold without
 * searching for it in the text (in Croatian, "na" could also be part of another word).
 */
export interface SentenceParts {
  before: string;
  preposition: string;
  after: string;
}

export const sentenceText = (parts: SentenceParts) => parts.before + parts.preposition + parts.after;

/**
 * Builds the task sentence. Each language has its own grammar, so a new language must add a
 * builder here (the Record type makes a missing one a compile error).
 */
export const SENTENCES: Record<LanguageKey, (character: Character, thing: Thing, preposition: string, position: Position) => SentenceParts> = {
  english: (c, t, prep) => ({ before: `The ${c.names.english} is `, preposition: prep, after: ` the ${t.names.english}.` }),
  // "na" takes the locative (na stolu); "ispod", "iznad" and "pokraj" take the genitive (ispod stola).
  croatian: (c, t, prep, position) => ({
    before: `${capitalise(c.names.croatian)} je `,
    preposition: prep,
    after: ` ${position === 'on' ? t.names.croatian.loc : t.names.croatian.gen}.`
  }),
  serbian: (c, t, prep, position) => ({
    before: `${capitalise(c.names.serbian)} je `,
    preposition: prep,
    after: ` ${position === 'on' ? t.names.serbian.loc : t.names.serbian.gen}.`
  })
};

interface Scene {
  position: Position;
  spot: Spot;
}

interface WhereItem {
  id: string;
  thing: Thing;
  character: Character;
  target: Position;
  scenes: Scene[];
  answerRevealed?: boolean;
}

function shuffle<T>(values: T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Where the character is drawn for a position. "Next to" picks the left or right side at random. */
export function spotFor(thing: Thing, position: Position): Spot {
  if (position === 'nextTo') {
    const side = Math.random() < 0.5 ? -1 : 1;
    return { x: CENTRE_X + side * thing.sideOffset, y: FLOOR_Y - 10, size: 20 };
  }
  return thing.spots[position];
}

@Component({
    selector: 'app-where',
    templateUrl: './where.component.html',
    styleUrls: ['./where.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WhereComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 10;
  sceneCount = 3;
  selectedPositions: Record<Position, boolean> = { on: true, under: true, nextTo: true, above: true };
  generatedItems: WhereItem[] = [];

  readonly positions = POSITIONS;
  readonly viewBox = `0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`;
  readonly floorY = FLOOR_Y;
  readonly sceneWidth = SCENE_WIDTH;

  constructor(readonly i18n: LanguageService) {}

  get activePositions(): Position[] {
    return POSITIONS.filter(position => this.selectedPositions[position]);
  }

  /** Each picture in a line shows a different position, so there can't be more pictures than positions. */
  get sceneCounts(): number[] {
    return [2, 3, 4].filter(count => count <= this.activePositions.length);
  }

  /** At least two positions must stay selected, otherwise there is nothing to choose between. */
  canToggle(position: Position): boolean {
    return !this.selectedPositions[position] || this.activePositions.length > 2;
  }

  togglePosition(position: Position): void {
    if (!this.canToggle(position)) {
      return;
    }
    this.selectedPositions = { ...this.selectedPositions, [position]: !this.selectedPositions[position] };
    this.sceneCount = Math.min(this.sceneCount, this.activePositions.length);
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const active = this.activePositions;
    const scenes = Math.max(2, Math.min(active.length, Number(this.sceneCount) || 2));

    this.generatedItems = [];
    let previousTarget: Position | null = null;

    for (let i = 0; i < safeCount; i++) {
      // Vary the asked-for position from line to line.
      const targets: Position[] = active.filter(position => position !== previousTarget);
      const target: Position = targets[Math.floor(Math.random() * targets.length)];
      const others = shuffle(active.filter(position => position !== target)).slice(0, scenes - 1);
      const thing = THINGS[Math.floor(Math.random() * THINGS.length)];
      const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

      this.generatedItems.push({
        id: `where-${i}`,
        thing,
        character,
        target,
        scenes: shuffle([target, ...others]).map(position => ({ position, spot: spotFor(thing, position) }))
      });
      previousTarget = target;
    }
  }

  sentence(item: WhereItem): SentenceParts {
    const language = this.i18n.language;
    return SENTENCES[language](item.character, item.thing, this.i18n.t.where.positions[item.target], item.target);
  }

  positionLabel(position: Position): string {
    return this.i18n.t.where.positions[position];
  }

  revealAnswer(item: WhereItem): void {
    item.answerRevealed = !item.answerRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
