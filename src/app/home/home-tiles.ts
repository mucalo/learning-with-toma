/** A tile in the home page grid: an activity card, or the testimonial at `index` in `testimonials.items`. */
export type HomeTile<A> =
  | { kind: 'activity'; activity: A }
  | { kind: 'testimonial'; index: number };

/** On wide screens every row holds this many activities plus one testimonial. */
export const ACTIVITIES_PER_ROW = 3;

/**
 * Mixes the testimonials in among the activities: one per row of four tiles, in random order and
 * at a random place in the row.
 *
 * The grid shows 4 columns, 2 on medium screens and 1 on phones, so a testimonial's place is
 * chosen so that it never sits right below the previous one in any of those layouts.
 */
export function layoutHomeTiles<A>(activities: A[], testimonialCount: number): HomeTile<A>[] {
  const testimonials = shuffle(Array.from({ length: testimonialCount }, (_, i) => i));
  const tiles: HomeTile<A>[] = [];
  let previousColumn: number | undefined;

  for (let start = 0, row = 0; start < activities.length || row < testimonials.length; start += ACTIVITIES_PER_ROW, row++) {
    const rowTiles: HomeTile<A>[] = activities
      .slice(start, start + ACTIVITIES_PER_ROW)
      .map(activity => ({ kind: 'activity', activity }));

    if (row < testimonials.length) {
      const column = pickColumn(rowTiles.length + 1, previousColumn);
      rowTiles.splice(column, 0, { kind: 'testimonial', index: testimonials[row] });
      previousColumn = column;
    }

    tiles.push(...rowTiles);
  }

  return tiles;
}

function pickColumn(rowLength: number, previous: number | undefined): number {
  const columns = Array.from({ length: rowLength }, (_, i) => i);
  const allowed = previous === undefined ? columns : columns.filter(column => isApart(previous, column));
  const choices = allowed.length > 0 ? allowed : columns;
  return choices[Math.floor(Math.random() * choices.length)];
}

/** Whether a testimonial at `column` stays apart from one at `previous` in the row above. */
function isApart(previous: number, column: number): boolean {
  const sameColumnOf4 = column === previous;
  // With 2 columns a row of four becomes two lines, so the 3rd/4th place sits above the 1st/2nd of the next row.
  const sameColumnOf2 = previous >= 2 && column === previous - 2;
  // With 1 column the last place of a row is followed directly by the first place of the next.
  const nextInOneColumn = previous === ACTIVITIES_PER_ROW && column === 0;
  return !sameColumnOf4 && !sameColumnOf2 && !nextInOneColumn;
}

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
