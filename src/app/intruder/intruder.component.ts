import { Component } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { Translations } from '../i18n/translations';

export type ThemeKey = keyof Translations['intruder']['themes'];

export interface Theme {
  key: ThemeKey;
  /** Pictures that clearly belong to the theme. */
  pictures: string[];
  /** Hand-picked pictures that are obviously unrelated to this theme. */
  intruders: string[];
}

/**
 * Intruders are curated per theme rather than borrowed from other themes, so an intruder can
 * never accidentally fit (e.g. a crab is fine in "summer" but must never be a "sea" intruder).
 * Every theme needs at least MAX_THEME_PICTURES pictures and MAX_INTRUDERS intruders.
 */
export const THEMES: Theme[] = [
  {
    key: 'summer',
    pictures: ['🏖️', '🪣', '🌞', '🍉', '🍦', '🩴', '🕶️', '🐚', '🏄', '🦀', '🏊', '🌴'],
    intruders: ['☃️', '⛷️', '🎿', '🧣', '🧤', '🛷', '❄️', '🧥']
  },
  {
    key: 'winter',
    pictures: ['☃️', '❄️', '🧣', '🧤', '🎿', '⛸️', '🛷', '🧥', '🌨️', '🏂', '⛷️', '🥶'],
    intruders: ['🏖️', '🍉', '🩴', '🕶️', '🌻', '🏄', '🌴', '🩳']
  },
  {
    key: 'farm',
    pictures: ['🐄', '🐖', '🐑', '🐓', '🐐', '🐎', '🦃', '🐤', '🦆', '🐇'],
    intruders: ['🚗', '✈️', '🚀', '⚽', '🎸', '🔑', '☂️', '🧦']
  },
  {
    key: 'fruit',
    pictures: ['🍎', '🍌', '🍇', '🍓', '🍊', '🍐', '🍒', '🍑', '🍍', '🥝', '🍉', '🍋'],
    intruders: ['🚲', '🧦', '✏️', '🔑', '🪑', '👟', '🚂', '🎈']
  },
  {
    key: 'school',
    pictures: ['✏️', '📚', '🎒', '📏', '✂️', '🖍️', '📐', '🏫', '📓', '🧮'],
    intruders: ['🐳', '🌋', '🚜', '🛁', '🦒', '⛵', '🌵']
  },
  {
    key: 'transport',
    pictures: ['🚗', '🚌', '🚲', '✈️', '🚂', '🚢', '🚁', '🚑', '🚒', '🚀', '🛵', '🚕'],
    intruders: ['🍌', '🐸', '🌻', '🧁', '🐟', '🧸', '🍄']
  },
  {
    key: 'sea',
    pictures: ['🐟', '🐠', '🐙', '🦀', '🐬', '🐳', '🦈', '🐚', '🦞', '🐡', '🦑'],
    intruders: ['🚒', '🌵', '🎂', '🧦', '🪑', '🔨', '🕯️']
  },
  {
    key: 'clothes',
    pictures: ['👕', '👖', '👗', '🧦', '🧢', '👟', '🧥', '🧣', '🧤', '👒', '🩳', '👔'],
    intruders: ['🍌', '🐢', '🚗', '🔨', '🌳', '🍕', '🐝']
  },
  {
    key: 'sports',
    pictures: ['⚽', '🏀', '🎾', '🏈', '🏐', '⚾', '🏓', '🏸', '🛹', '🏆', '🚴'],
    intruders: ['🛏️', '🍰', '🐌', '🧸', '🛁', '🌙', '🍄']
  }
];

export const MAX_THEME_PICTURES = 8;
export const MAX_INTRUDERS = 4;

interface Picture {
  emoji: string;
  isIntruder: boolean;
}

interface IntruderItem {
  id: string;
  theme: ThemeKey;
  pictures: Picture[];
  answerRevealed?: boolean;
}

@Component({
  selector: 'app-intruder',
  templateUrl: './intruder.component.html',
  styleUrls: ['./intruder.component.css']
})
export class IntruderComponent {
  problemCount = 10;
  themeCount = 5;
  intruderCount = 1;
  generatedItems: IntruderItem[] = [];

  readonly themeCounts = Array.from({ length: MAX_THEME_PICTURES - 2 }, (_, i) => i + 3);

  constructor(readonly i18n: LanguageService) {}

  /** There must always be more theme pictures than intruders, otherwise the theme is unclear. */
  get intruderCounts(): number[] {
    return Array.from({ length: MAX_INTRUDERS }, (_, i) => i + 1).filter(count => count < this.themeCount);
  }

  onThemeCountChange(count: number): void {
    this.themeCount = count;
    if (this.intruderCount >= count) {
      this.intruderCount = count - 1;
    }
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const safeThemeCount = Math.max(3, Math.min(MAX_THEME_PICTURES, Number(this.themeCount) || 3));
    const safeIntruders = Math.max(1, Math.min(MAX_INTRUDERS, safeThemeCount - 1, Number(this.intruderCount) || 1));

    this.generatedItems = [];
    let deck: Theme[] = [];
    let previous: ThemeKey | null = null;

    for (let i = 0; i < safeCount; i++) {
      // Go through all themes before repeating one, and never use the same theme twice in a row.
      if (deck.length === 0) {
        deck = this.shuffle(THEMES);
        if (deck[0].key === previous && deck.length > 1) {
          [deck[0], deck[1]] = [deck[1], deck[0]];
        }
      }
      const theme = deck.shift() as Theme;
      previous = theme.key;

      const pictures: Picture[] = this.shuffle([
        ...this.shuffle(theme.pictures).slice(0, safeThemeCount).map(emoji => ({ emoji, isIntruder: false })),
        ...this.shuffle(theme.intruders).slice(0, safeIntruders).map(emoji => ({ emoji, isIntruder: true }))
      ]);

      this.generatedItems.push({ id: `intruder-${i}`, theme: theme.key, pictures });
    }
  }

  private shuffle<T>(values: T[]): T[] {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  themeName(theme: ThemeKey): string {
    return this.i18n.t.intruder.themes[theme];
  }

  revealAnswer(item: IntruderItem): void {
    item.answerRevealed = !item.answerRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
