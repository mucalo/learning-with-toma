import { Component } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

interface PositionedEmoji {
  emoji: string;
  x: number;
  y: number;
  size: number;
}

interface CountingItem {
  id: string;
  count: number;
  items: string[];
  positioned: PositionedEmoji[];
  answerRevealed?: boolean;
}

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 6;
  maxItems = 10;
  generatedItems: CountingItem[] = [];

  constructor(readonly i18n: LanguageService) {}

  private readonly itemEmojis = [
    '🍎', '🍌', '🍒', '🍓', '🍊',
    '🐶', '🐱', '🐭', '🐹', '🐰',
    '⭐', '🌙', '☀️', '🌸', '🌻',
    '🎈', '🎁', '🎨', '🎭', '🎪'
  ];

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const safeMaxItems = Math.max(1, Math.min(20, Number(this.maxItems) || 1));

    this.generatedItems = [];
    let previousEmoji = '';

    for (let i = 0; i < safeCount; i++) {
      const count = Math.floor(Math.random() * safeMaxItems) + 1;
      const emoji = this.getNextDifferentEmoji(previousEmoji);
      const items: string[] = Array.from({ length: count }, () => emoji);
      const positioned = this.positionItems(items);

      this.generatedItems.push({
        id: `counting-${i}`,
        count,
        items,
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
    const MIN_SIZE = 1.5;
    const MAX_SIZE = 3;
    const PADDING = 10;

    const positioned: PositionedEmoji[] = [];
    const usedAreas: Array<{ x: number; y: number; w: number; h: number }> = [];

    for (const emoji of items) {
      const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
      const estimatedWidth = size * 16 * 1.1; // rough estimate: 1rem = 16px, +10% for spacing
      const estimatedHeight = size * 16 * 1.1;

      let positioned_item: PositionedEmoji | null = null;
      let attempts = 0;
      const maxAttempts = 50;

      while (!positioned_item && attempts < maxAttempts) {
        const x = Math.random() * (CONTAINER_WIDTH - estimatedWidth - PADDING * 2) + PADDING;
        const y = Math.random() * (CONTAINER_HEIGHT - estimatedHeight - PADDING * 2) + PADDING;

        const newArea = { x, y, w: estimatedWidth, h: estimatedHeight };

        // Check for overlap with existing items
        const hasOverlap = usedAreas.some(area => this.checkOverlap(newArea, area));

        if (!hasOverlap) {
          positioned_item = { emoji, x, y, size };
          usedAreas.push(newArea);
        }

        attempts++;
      }

      if (positioned_item) {
        positioned.push(positioned_item);
      }
    }

    return positioned;
  }

  private checkOverlap(rect1: { x: number; y: number; w: number; h: number }, rect2: { x: number; y: number; w: number; h: number }): boolean {
    return !(rect1.x + rect1.w < rect2.x || rect1.x > rect2.x + rect2.w ||
             rect1.y + rect1.h < rect2.y || rect1.y > rect2.y + rect2.h);
  }

  revealAnswer(item: CountingItem): void {
    item.answerRevealed = !item.answerRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
