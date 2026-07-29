import { Component } from '@angular/core';

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

type LanguageKey = 'english' | 'croatian' | 'serbian';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  language: LanguageKey = 'english';
  problemCount = 10;
  maxItems = 10;
  generatedItems: CountingItem[] = [];

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
        return 'Broji broj predmeta.';
      case 'serbian':
        return 'Broji broj predmeta.';
      default:
        return 'Count the number of items.';
    }
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const safeMaxItems = Math.max(1, Math.min(20, Number(this.maxItems) || 1));

    this.generatedItems = Array.from({ length: safeCount }, (_, index) => {
      const count = Math.floor(Math.random() * safeMaxItems) + 1;
      const selectedEmoji = this.itemEmojis[Math.floor(Math.random() * this.itemEmojis.length)];
      const items: string[] = Array.from({ length: count }, () => selectedEmoji);
      const positioned = this.positionItems(items);

      return {
        id: `counting-${index}`,
        count,
        items,
        positioned
      };
    });
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
