import { ACTIVITIES_PER_ROW, layoutHomeTiles } from './home-tiles';

describe('layoutHomeTiles', () => {
  const activities = Array.from({ length: 12 }, (_, i) => `activity-${i}`);

  function testimonialColumns(): number[] {
    const tiles = layoutHomeTiles(activities, 4);
    const rowLength = ACTIVITIES_PER_ROW + 1;
    return tiles.flatMap((tile, i) => (tile.kind === 'testimonial' ? [i] : []))
      .map((position, row) => {
        expect(Math.floor(position / rowLength)).withContext('one testimonial per row').toBe(row);
        return position % rowLength;
      });
  }

  it('should keep every activity in order and use every testimonial once', () => {
    const tiles = layoutHomeTiles(activities, 4);
    expect(tiles.length).toBe(16);
    expect(tiles.flatMap(tile => (tile.kind === 'activity' ? [tile.activity] : []))).toEqual(activities);
    expect(tiles.flatMap(tile => (tile.kind === 'testimonial' ? [tile.index] : [])).sort()).toEqual([0, 1, 2, 3]);
  });

  it('should never put a testimonial right below the previous one', () => {
    for (let run = 0; run < 200; run++) {
      const columns = testimonialColumns();
      for (let row = 1; row < columns.length; row++) {
        const [previous, column] = [columns[row - 1], columns[row]];
        expect(column).not.toBe(previous); // 4 columns
        expect(previous >= 2 && column === previous - 2).toBeFalse(); // 2 columns
        expect(previous === 3 && column === 0).toBeFalse(); // 1 column
      }
    }
  });
});
