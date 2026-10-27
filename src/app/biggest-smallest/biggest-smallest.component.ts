import { Component } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

interface PositionedEmoji {
  emoji: string;
  x: number;
  y: number;
  size: number;
  isLargest: boolean;
  isSmallest: boolean;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ProblemItem {
  id: string;
  count: number;
  items: string[];
  positioned: PositionedEmoji[];
}

@Component({
  selector: 'app-biggest-smallest',
  templateUrl: './biggest-smallest.component.html',
  styleUrls: ['./biggest-smallest.component.css']
})
export class BiggestSmallestComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 6;
  maxItems = 10;
  readonly biggestColour = 'green';
  readonly smallestColour = 'blue';
  generatedItems: ProblemItem[] = [];
  showMinItemsError = false;

  constructor(readonly i18n: LanguageService) {}

  private readonly itemEmojis = [
    '🍎', '🍌', '🍒', '🍓', '🍊',
    '🐶', '🐱', '🐭', '🐹', '🐰',
    '⭐', '🌙', '☀️', '🌸', '🌻',
    '🎈', '🎁', '🎨', '🎭', '🎪'
  ];

  generateProblems(): void {
    this.showMinItemsError = false;

    const safeMaxItems = Math.max(3, Math.min(20, Number(this.maxItems) || 3));

    if (Number(this.maxItems) < 3) {
      this.showMinItemsError = true;
      return;
    }

    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    this.generatedItems = [];
    let previousEmoji = '';

    for (let i = 0; i < safeCount; i++) {
      const count = Math.floor(Math.random() * (safeMaxItems - 2)) + 3; // At least 3 items
      const emoji = this.getNextDifferentEmoji(previousEmoji);
      const items: string[] = Array.from({ length: count }, () => emoji);
      const positioned = this.positionItems(items);

      // Some items may not fit in the box, so report what was actually drawn.
      this.generatedItems.push({
        id: `biggest-smallest-${i}`,
        count: positioned.length,
        items: items.slice(0, positioned.length),
        positioned
      });

      previousEmoji = emoji;
    }
  }

  private getNextDifferentEmoji(previousEmoji: string): string {
    let emoji = this.itemEmojis[Math.floor(Math.random() * this.itemEmojis.length)];
    let attempts = 0;
    const maxAttempts = 50;

    while (emoji === previousEmoji && attempts < maxAttempts) {
      emoji = this.itemEmojis[Math.floor(Math.random() * this.itemEmojis.length)];
      attempts++;
    }

    return emoji;
  }

  private positionItems(items: string[]): PositionedEmoji[] {
    const CONTAINER_WIDTH = 400;
    const CONTAINER_HEIGHT = 180;
    const MIN_SIZE = 0.7;
    const MAX_SIZE = 5.5;
    const PADDING = 10;

    // Generate sizes with clear distinction between largest and smallest
    const sizes = this.generateDistinctSizes(items.length, MIN_SIZE, MAX_SIZE);

    const positioned: PositionedEmoji[] = [];
    const usedAreas: Rect[] = [];

    // Place the largest item first (an empty box always has room for it), then the rest from
    // smallest to largest so the smallest is placed second and as many items as possible fit.
    // Items that still don't fit are dropped, but never the largest or the smallest.
    const ascending = [...sizes].sort((a, b) => a - b);
    const placementOrder = [ascending[ascending.length - 1], ...ascending.slice(0, -1)];

    placementOrder.forEach((size, index) => {
      const dimension = size * 16 * 1.1; // rough estimate: 1rem = 16px, +10% for spacing
      const spot = this.findFreeSpot(dimension, usedAreas, CONTAINER_WIDTH, CONTAINER_HEIGHT, PADDING);

      if (spot) {
        usedAreas.push(spot);
        positioned.push({ emoji: items[index], x: spot.x, y: spot.y, size, isLargest: false, isSmallest: false });
      }
    });

    // Mark extremes among the items that were actually placed.
    const placedSizes = positioned.map(item => item.size);
    const largestSize = Math.max(...placedSizes);
    const smallestSize = Math.min(...placedSizes);
    positioned.forEach(item => {
      item.isLargest = item.size === largestSize;
      item.isSmallest = item.size === smallestSize;
    });

    // Shuffle so the DOM order doesn't reveal which item is which.
    return positioned.sort(() => Math.random() - 0.5);
  }

  private findFreeSpot(dimension: number, usedAreas: Rect[], width: number, height: number, padding: number): Rect | null {
    const maxX = width - dimension - padding;
    const maxY = height - dimension - padding;

    if (maxX < padding || maxY < padding) {
      return null;
    }

    const isFree = (area: Rect) => !usedAreas.some(used => this.checkOverlap(area, used));

    for (let attempt = 0; attempt < 50; attempt++) {
      const area = {
        x: padding + Math.random() * (maxX - padding),
        y: padding + Math.random() * (maxY - padding),
        w: dimension,
        h: dimension
      };

      if (isFree(area)) {
        return area;
      }
    }

    // Random attempts failed; scan the box systematically so a free spot is never missed.
    const GRID_STEP = 4;
    for (let y = padding; y <= maxY; y += GRID_STEP) {
      for (let x = padding; x <= maxX; x += GRID_STEP) {
        const area = { x, y, w: dimension, h: dimension };
        if (isFree(area)) {
          return area;
        }
      }
    }

    return null;
  }

  private generateDistinctSizes(count: number, min: number, max: number): number[] {
    // Create clear size variations by grouping items into size brackets
    const sizes: number[] = [];
    const step = (max - min) / Math.max(count - 1, 1);

    for (let i = 0; i < count; i++) {
      const baseSize = min + i * step;
      // Add minimal random variation to maintain size ordering while adding slight variety
      const variance = (Math.random() - 0.5) * step * 0.1;
      sizes.push(Math.max(min, Math.min(max, baseSize + variance)));
    }

    // Shuffle to randomize positions while maintaining size variety
    return sizes.sort(() => Math.random() - 0.5);
  }

  private checkOverlap(rect1: Rect, rect2: Rect): boolean {
    return !(rect1.x + rect1.w < rect2.x || rect1.x > rect2.x + rect2.w ||
             rect1.y + rect1.h < rect2.y || rect1.y > rect2.y + rect2.h);
  }

  printWorksheet(): void {
    window.print();
  }
}
