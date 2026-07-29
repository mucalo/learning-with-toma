import { Component } from '@angular/core';

interface PositionedEmoji {
  emoji: string;
  x: number;
  y: number;
  size: number;
  isLargest: boolean;
  isSmallest: boolean;
}

interface ProblemItem {
  id: string;
  count: number;
  items: string[];
  positioned: PositionedEmoji[];
}

type LanguageKey = 'english' | 'croatian' | 'serbian';

@Component({
  selector: 'app-biggest-smallest',
  templateUrl: './biggest-smallest.component.html',
  styleUrls: ['./biggest-smallest.component.css']
})
export class BiggestSmallestComponent {
  language: LanguageKey = 'english';
  problemCount = 10;
  maxItems = 10;
  readonly biggestColour = 'green';
  readonly smallestColour = 'blue';
  generatedItems: ProblemItem[] = [];
  validationError = '';

  readonly languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'croatian', label: 'Croatian' },
    { value: 'serbian', label: 'Serbian' }
  ];

  private readonly itemEmojis = [
    '🍎', '🍌', '🍒', '🍓', '🍊',
    '🐶', '🐱', '🐭', '🐹', '🐰',
    '⭐', '🌙', '☀️', '🌸', '🌻',
    '🎈', '🎁', '🎨', '🎭', '🎪'
  ];

  get instructionText(): string {
    switch (this.language) {
      case 'croatian':
        return 'Označi kružnicom najveći predmet zelenom bojom, a najmanju plavu bojom.';
      case 'serbian':
        return 'Označi krugom najveći predmet zelenom bojom, a najmanji plavu bojom.';
      default:
        return 'Circle the biggest object with green colour and the smallest with blue colour.';
    }
  }

  generateProblems(): void {
    this.validationError = '';
    
    const safeMaxItems = Math.max(3, Math.min(20, Number(this.maxItems) || 3));
    
    if (Number(this.maxItems) < 3) {
      this.validationError = 'Maximum items per problem must be at least 3.';
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

      this.generatedItems.push({
        id: `biggest-smallest-${i}`,
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
    const MIN_SIZE = 0.7;
    const MAX_SIZE = 5.5;
    const PADDING = 10;

    // Generate sizes with clear distinction between largest and smallest
    const sizes = this.generateDistinctSizes(items.length, MIN_SIZE, MAX_SIZE);

    const positioned: PositionedEmoji[] = [];
    const usedAreas: Array<{ x: number; y: number; w: number; h: number }> = [];

    const largestSize = Math.max(...sizes);
    const smallestSize = Math.min(...sizes);

    for (let i = 0; i < items.length; i++) {
      const emoji = items[i];
      const size = sizes[i];
      const estimatedWidth = size * 16 * 1.1;
      const estimatedHeight = size * 16 * 1.1;

      let positioned_item: PositionedEmoji | null = null;
      let attempts = 0;
      const maxAttempts = 50;

      while (!positioned_item && attempts < maxAttempts) {
        const x = Math.random() * (CONTAINER_WIDTH - estimatedWidth - PADDING * 2) + PADDING;
        const y = Math.random() * (CONTAINER_HEIGHT - estimatedHeight - PADDING * 2) + PADDING;

        const newArea = { x, y, w: estimatedWidth, h: estimatedHeight };
        const hasOverlap = usedAreas.some(area => this.checkOverlap(newArea, area));

        if (!hasOverlap) {
          positioned_item = {
            emoji,
            x,
            y,
            size,
            isLargest: size === largestSize,
            isSmallest: size === smallestSize
          };
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

  private checkOverlap(rect1: { x: number; y: number; w: number; h: number }, rect2: { x: number; y: number; w: number; h: number }): boolean {
    return !(rect1.x + rect1.w < rect2.x || rect1.x > rect2.x + rect2.w ||
             rect1.y + rect1.h < rect2.y || rect1.y > rect2.y + rect2.h);
  }

  printWorksheet(): void {
    window.print();
  }
}
