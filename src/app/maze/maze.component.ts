import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { Translations } from '../i18n/translations';

export type MazeSize = keyof Translations['maze']['sizes'];
export const MAZE_SIZES: Record<MazeSize, number> = { tiny: 5, small: 7, medium: 10, large: 13, huge: 16 };

/** SVG units per cell; walls are drawn with a non-scaling stroke, so this only sets proportions. */
export const CELL = 10;
const PADDING = 2;

/** Each animal starts top-left and has to reach its food bottom-right. */
export const MAZE_PAIRS: [string, string][] = [
  ['🐝', '🌻'],
  ['🐭', '🧀'],
  ['🐰', '🥕'],
  ['🐶', '🦴'],
  ['🐵', '🍌'],
  ['🐿️', '🌰'],
  ['🐻', '🍯'],
  ['🐱', '🐟'],
  ['🐼', '🎋'],
  ['🐛', '🍃'],
  ['🐔', '🌽']
];

export interface Cell {
  row: number;
  col: number;
}

/**
 * A square maze. `right[r][c]` / `bottom[r][c]` say whether the wall on that side of the cell
 * is still standing. The outer border is always closed.
 */
export interface Maze {
  size: number;
  right: boolean[][];
  bottom: boolean[][];
}

/**
 * Builds a "perfect" maze (exactly one path between any two cells, no loops) with a randomised
 * depth-first search, which gives long winding corridors that are fun to follow.
 */
export function generateMaze(size: number): Maze {
  const right = Array.from({ length: size }, () => Array<boolean>(size).fill(true));
  const bottom = Array.from({ length: size }, () => Array<boolean>(size).fill(true));
  const visited = Array.from({ length: size }, () => Array<boolean>(size).fill(false));
  const stack: Cell[] = [{ row: 0, col: 0 }];
  visited[0][0] = true;

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbours = [
      { row: current.row - 1, col: current.col },
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col - 1 },
      { row: current.row, col: current.col + 1 }
    ].filter(n => n.row >= 0 && n.row < size && n.col >= 0 && n.col < size && !visited[n.row][n.col]);

    if (neighbours.length === 0) {
      stack.pop();
      continue;
    }

    const next = neighbours[Math.floor(Math.random() * neighbours.length)];
    if (next.row === current.row) {
      right[current.row][Math.min(current.col, next.col)] = false;
    } else {
      bottom[Math.min(current.row, next.row)][current.col] = false;
    }
    visited[next.row][next.col] = true;
    stack.push(next);
  }

  return { size, right, bottom };
}

/** Whether there is an opening between two neighbouring cells. */
export function isOpen(maze: Maze, a: Cell, b: Cell): boolean {
  if (a.row === b.row && Math.abs(a.col - b.col) === 1) {
    return !maze.right[a.row][Math.min(a.col, b.col)];
  }
  if (a.col === b.col && Math.abs(a.row - b.row) === 1) {
    return !maze.bottom[Math.min(a.row, b.row)][a.col];
  }
  return false;
}

/** The route from the top-left to the bottom-right cell (breadth-first search). */
export function solveMaze(maze: Maze): Cell[] {
  const goal = maze.size - 1;
  const previous = new Map<string, Cell | null>([['0,0', null]]);
  const queue: Cell[] = [{ row: 0, col: 0 }];

  while (queue.length > 0) {
    const current = queue.shift() as Cell;
    if (current.row === goal && current.col === goal) {
      const path: Cell[] = [];
      for (let cell: Cell | null = current; cell; cell = previous.get(`${cell.row},${cell.col}`) ?? null) {
        path.unshift(cell);
      }
      return path;
    }
    for (const next of [
      { row: current.row - 1, col: current.col },
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col - 1 },
      { row: current.row, col: current.col + 1 }
    ]) {
      const key = `${next.row},${next.col}`;
      if (!previous.has(key) && next.row >= 0 && next.row < maze.size && next.col >= 0 && next.col < maze.size && isOpen(maze, current, next)) {
        previous.set(key, current);
        queue.push(next);
      }
    }
  }
  return [];
}

/** All walls as one SVG path. */
export function wallsPath(maze: Maze): string {
  const max = maze.size * CELL;
  const parts = [`M0,0 H${max} V${max} H0 Z`];
  for (let row = 0; row < maze.size; row++) {
    for (let col = 0; col < maze.size; col++) {
      const x = (col + 1) * CELL;
      const y = (row + 1) * CELL;
      if (col < maze.size - 1 && maze.right[row][col]) {
        parts.push(`M${x},${row * CELL} V${y}`);
      }
      if (row < maze.size - 1 && maze.bottom[row][col]) {
        parts.push(`M${col * CELL},${y} H${x}`);
      }
    }
  }
  return parts.join(' ');
}

interface MazeItem {
  id: string;
  size: number;
  viewBox: string;
  walls: string;
  solution: string;
  start: string;
  goal: string;
  answerRevealed?: boolean;
}

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class MazeComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 4;
  size: MazeSize = 'small';
  generatedItems: MazeItem[] = [];

  readonly sizes = Object.keys(MAZE_SIZES) as MazeSize[];
  readonly cell = CELL;

  constructor(readonly i18n: LanguageService) {}

  sizeLabel(size: MazeSize): string {
    const n = MAZE_SIZES[size];
    return `${this.i18n.t.maze.sizes[size]} (${n}×${n})`;
  }

  generateProblems(): void {
    const safeCount = Math.max(1, Math.min(20, Number(this.problemCount) || 1));
    const size = MAZE_SIZES[this.size] ?? MAZE_SIZES.small;
    const pairs = [...MAZE_PAIRS].sort(() => Math.random() - 0.5);

    this.generatedItems = Array.from({ length: safeCount }, (_, i) => {
      const maze = generateMaze(size);
      const centre = (n: number) => n * CELL + CELL / 2;
      const solution = solveMaze(maze)
        .map((cell, index) => `${index === 0 ? 'M' : 'L'}${centre(cell.col)},${centre(cell.row)}`)
        .join(' ');
      const [start, goal] = pairs[i % pairs.length];
      const extent = size * CELL;

      return {
        id: `maze-${i}`,
        size,
        viewBox: `${-PADDING} ${-PADDING} ${extent + 2 * PADDING} ${extent + 2 * PADDING}`,
        walls: wallsPath(maze),
        solution,
        start,
        goal
      };
    });
  }

  revealAnswer(item: MazeItem): void {
    item.answerRevealed = !item.answerRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
