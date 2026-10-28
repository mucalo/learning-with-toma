import { Component } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

export type Difficulty = 'easy' | 'hard';

/**
 * Pictures grouped by kind. Only emoji whose silhouette is still recognisable are listed
 * (e.g. penguin, owl, avocado and lemon became shapeless blobs and were left out).
 * "Easy" takes every picture from a different group, so the shapes differ a lot;
 * "hard" takes all pictures from one group, so the shapes are similar.
 */
export const SHADOW_GROUPS: Record<string, string[]> = {
  animals: ['🐘', '🦒', '🐢', '🐇', '🐌', '🦆', '🐟', '🦋', '🦀', '🐿️', '🐓', '🐎', '🐈', '🐕', '🦕'],
  fruitAndVegetables: ['🍎', '🍌', '🍐', '🍇', '🍒', '🍓', '🥕', '🍆', '🍄', '🥦', '🍉'],
  vehicles: ['🚗', '🚲', '✈️', '🚁', '⛵', '🚂', '🚀', '🛴', '🚜', '🛵'],
  objects: ['☂️', '🔑', '✂️', '🔨', '🕯️', '💡', '⏰', '🪑', '🎈', '✏️', '👓', '🔔', '🥄', '🧸', '🪁', '🎸'],
  clothes: ['👕', '👖', '👗', '🧦', '🧢', '👟', '🧤', '👢', '🩳', '👜'],
  nature: ['🌳', '🌵', '🌻', '🍁', '⭐', '🌙', '☁️', '❄️', '🌷', '🍀', '⚡', '🔥']
};

export const MIN_PAIRS = 3;
export const MAX_PAIRS = 5;

interface ShadowItem {
  id: string;
  pictures: string[];
  shadows: string[];
  /** For each picture (by position), the position of its shadow. */
  answer: number[];
  answerRevealed?: boolean;
}

/** A random order of 0..n-1 where no element stays in its place, so no shadow is directly below its picture. */
export function derangement(n: number): number[] {
  while (true) {
    const order = shuffle(Array.from({ length: n }, (_, i) => i));
    if (order.every((value, index) => value !== index)) {
      return order;
    }
  }
}

function shuffle<T>(values: T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

@Component({
    selector: 'app-shadow',
    templateUrl: './shadow.component.html',
    styleUrls: ['./shadow.component.css'],
    standalone: false
})
export class ShadowComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 6;
  pairCount = 4;
  difficulty: Difficulty = 'easy';
  generatedItems: ShadowItem[] = [];

  readonly pairCounts = Array.from({ length: MAX_PAIRS - MIN_PAIRS + 1 }, (_, i) => i + MIN_PAIRS);
  readonly difficulties: Difficulty[] = ['easy', 'hard'];

  constructor(readonly i18n: LanguageService) {}

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const pairs = Math.max(MIN_PAIRS, Math.min(MAX_PAIRS, Number(this.pairCount) || MIN_PAIRS));
    const groups = Object.values(SHADOW_GROUPS);

    this.generatedItems = [];
    let previousGroup: string[] | null = null;

    for (let i = 0; i < safeCount; i++) {
      let pictures: string[];

      if (this.difficulty === 'hard') {
        // All pictures from one group, and not the same group as the line before.
        const options = groups.filter(group => group !== previousGroup);
        const group = options[Math.floor(Math.random() * options.length)];
        pictures = shuffle(group).slice(0, pairs);
        previousGroup = group;
      } else {
        pictures = shuffle(groups)
          .slice(0, pairs)
          .map(group => group[Math.floor(Math.random() * group.length)]);
      }

      // shadows[answer[p]] is the shadow of pictures[p].
      const answer = derangement(pairs);
      const shadows: string[] = [];
      answer.forEach((shadowIndex, pictureIndex) => (shadows[shadowIndex] = pictures[pictureIndex]));

      this.generatedItems.push({ id: `shadow-${i}`, pictures, shadows, answer });
    }
  }

  gridColumns(item: ShadowItem): string {
    return `repeat(${item.pictures.length}, 1fr)`;
  }

  revealAnswer(item: ShadowItem): void {
    item.answerRevealed = !item.answerRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
