import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { generateMaze, isOpen, Maze, MAZE_PAIRS, MAZE_SIZES, MazeComponent, solveMaze } from './maze.component';

function countOpenings(maze: Maze): number {
  let openings = 0;
  for (let row = 0; row < maze.size; row++) {
    for (let col = 0; col < maze.size; col++) {
      if (col < maze.size - 1 && !maze.right[row][col]) openings++;
      if (row < maze.size - 1 && !maze.bottom[row][col]) openings++;
    }
  }
  return openings;
}

function reachableCells(maze: Maze): number {
  const seen = new Set(['0,0']);
  const stack = [{ row: 0, col: 0 }];
  while (stack.length) {
    const cell = stack.pop()!;
    for (const next of [
      { row: cell.row - 1, col: cell.col },
      { row: cell.row + 1, col: cell.col },
      { row: cell.row, col: cell.col - 1 },
      { row: cell.row, col: cell.col + 1 }
    ]) {
      const key = `${next.row},${next.col}`;
      if (!seen.has(key) && next.row >= 0 && next.row < maze.size && next.col >= 0 && next.col < maze.size && isOpen(maze, cell, next)) {
        seen.add(key);
        stack.push(next);
      }
    }
  }
  return seen.size;
}

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MazeComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  for (const size of Object.values(MAZE_SIZES)) {
    it(`should generate ${size}×${size} mazes with exactly one route between any two cells`, () => {
      for (let run = 0; run < 10; run++) {
        const maze = generateMaze(size);
        // Every cell reachable, and exactly cells − 1 openings: a tree, so no loops and one route.
        expect(reachableCells(maze)).toBe(size * size);
        expect(countOpenings(maze)).toBe(size * size - 1);
      }
    });

    it(`should solve ${size}×${size} mazes from the top-left to the bottom-right through open passages`, () => {
      const maze = generateMaze(size);
      const path = solveMaze(maze);

      expect(path[0]).toEqual({ row: 0, col: 0 });
      expect(path[path.length - 1]).toEqual({ row: size - 1, col: size - 1 });
      for (let i = 1; i < path.length; i++) {
        expect(isOpen(maze, path[i - 1], path[i])).toBeTrue();
      }
    });
  }

  it('should generate the requested number of mazes, each with an animal and its food', () => {
    component.problemCount = 5;
    component.size = 'medium';
    component.generateProblems();

    expect(component.generatedItems.length).toBe(5);
    component.generatedItems.forEach(item => {
      expect(item.size).toBe(10);
      expect(MAZE_PAIRS).toContain([item.start, item.goal]);
    });
    expect(new Set(component.generatedItems.map(item => item.start)).size).toBe(5);
  });

  it('should label sizes with their grid dimensions in the selected language', () => {
    expect(component.sizeLabel('tiny')).toBe('Very small (5×5)');
    component.i18n.language = 'croatian';
    expect(component.sizeLabel('huge')).toBe('Vrlo veliki (16×16)');
  });

  it('should draw the solution only when revealed', () => {
    component.problemCount = 1;
    component.generateProblems();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.solution')).toBeNull();
    component.revealAnswer(component.generatedItems[0]);
    fixture.detectChanges();
    expect(compiled.querySelector('.solution')).not.toBeNull();
  });
});
