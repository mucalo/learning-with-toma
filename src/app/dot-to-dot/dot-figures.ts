import { Translations } from '../i18n/translations';

export type DotFigureKey = keyof Translations['dotToDot']['figures'];
export type Point = [number, number];

/**
 * A picture to reveal by joining dots. Coordinates are in a 100 × 100 box (y grows downwards).
 * `points` are the corners of the outline in drawing order; more dots are added along the longest
 * edges when a worksheet asks for more. A closed outline ends back at the first dot.
 */
export interface DotFigure {
  key: DotFigureKey;
  points: Point[];
  closed: boolean;
  /** Small solid details drawn from the start (eyes, a door…), as an SVG path. */
  details?: string;
}

const circle = (cx: number, cy: number, r: number) => `M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy}`;

export const DOT_FIGURES: DotFigure[] = [
  {
    key: 'house',
    closed: true,
    points: [[10, 46], [50, 8], [90, 46], [80, 46], [80, 92], [20, 92], [20, 46]],
    details: 'M42 92 V68 H58 V92 M28 56 H40 V66 H28 Z M60 56 H72 V66 H60 Z'
  },
  {
    key: 'car',
    closed: true,
    // The wheels are part of the outline, so no numbers end up inside them.
    points: [
      [4, 66], [4, 46], [18, 42], [30, 18], [68, 18], [82, 42], [96, 46], [96, 66], [86, 66],
      [83, 77], [74, 82], [65, 77], [62, 66], [38, 66], [35, 77], [26, 82], [17, 77], [14, 66]
    ],
    details: 'M36 40 L42 26 H64 L72 40 Z'
  },
  {
    key: 'boat',
    closed: true,
    points: [[8, 64], [46, 64], [46, 6], [84, 56], [52, 56], [52, 64], [92, 64], [78, 88], [22, 88]],
    details: 'M4 96 Q14 92 24 96 T44 96 T64 96 T84 96 T100 96'
  },
  {
    key: 'star',
    closed: true,
    points: [[50, 4], [61.2, 36.6], [95.6, 37.2], [68.1, 57.9], [78.2, 90.8], [50, 71], [21.8, 90.8], [31.9, 57.9], [4.4, 37.2], [38.8, 36.6]]
  },
  {
    key: 'mushroom',
    closed: true,
    points: [[50, 10], [72, 14], [88, 28], [94, 46], [64, 46], [64, 88], [36, 88], [36, 46], [6, 46], [12, 28], [28, 14]],
    details: `${circle(30, 32, 5)} ${circle(52, 24, 6)} ${circle(72, 34, 5)}`
  },
  {
    key: 'fish',
    closed: true,
    points: [[8, 50], [20, 34], [38, 26], [56, 28], [70, 38], [90, 22], [86, 50], [90, 78], [70, 62], [56, 72], [38, 74], [20, 66]],
    details: `${circle(24, 44, 2.5)} M30 56 Q36 60 42 56`
  },
  {
    key: 'rocket',
    closed: true,
    points: [[50, 4], [62, 16], [68, 32], [68, 66], [82, 80], [82, 94], [66, 84], [34, 84], [18, 94], [18, 80], [32, 66], [32, 32], [38, 16]],
    details: `${circle(50, 40, 7)} M42 88 L50 98 L58 88`
  },
  {
    key: 'cat',
    closed: true,
    points: [[20, 30], [18, 6], [40, 22], [60, 22], [82, 6], [80, 30], [90, 50], [86, 72], [72, 88], [50, 94], [28, 88], [14, 72], [10, 50]],
    details: `${circle(36, 50, 3)} ${circle(64, 50, 3)} M46 60 H54 L50 65 Z M50 65 V70 M32 64 H14 M32 70 L16 75 M68 64 H86 M68 70 L84 75`
  },
  {
    key: 'heart',
    closed: true,
    points: [[50, 30], [60, 18], [74, 14], [88, 20], [94, 34], [90, 50], [74, 68], [50, 90], [26, 68], [10, 50], [6, 34], [12, 20], [26, 14], [40, 18]]
  },
  {
    key: 'tree',
    closed: true,
    points: [[50, 4], [72, 30], [62, 30], [82, 56], [68, 56], [90, 82], [56, 82], [56, 96], [44, 96], [44, 82], [10, 82], [32, 56], [18, 56], [38, 30], [28, 30]]
  },
  {
    key: 'apple',
    closed: true,
    points: [[50, 26], [62, 20], [76, 22], [88, 34], [90, 52], [84, 72], [72, 88], [60, 92], [50, 88], [40, 92], [28, 88], [16, 72], [10, 52], [12, 34], [24, 22], [38, 20]],
    details: 'M50 26 Q50 14 56 6 M53 16 Q64 6 74 12 Q63 20 53 16'
  },
  {
    key: 'butterfly',
    closed: true,
    points: [[50, 30], [64, 14], [84, 10], [92, 24], [86, 42], [70, 50], [86, 60], [90, 78], [76, 90], [60, 82], [50, 64], [40, 82], [24, 90], [10, 78], [14, 60], [30, 50], [14, 42], [8, 24], [16, 10], [36, 14]],
    // A short body only: anything longer runs into the numbers of the dots at its ends.
    details: 'M50 40 V56'
  }
];

/**
 * Adds dots along the outline until there are `target` of them, always splitting the longest
 * edge, so the corners stay and the dots end up evenly spread.
 */
export function withDotCount(points: Point[], closed: boolean, target: number): Point[] {
  const result = [...points];
  while (result.length < target) {
    let longest = 0;
    let longestIndex = 0;
    const edgeCount = closed ? result.length : result.length - 1;
    for (let i = 0; i < edgeCount; i++) {
      const [ax, ay] = result[i];
      const [bx, by] = result[(i + 1) % result.length];
      const length = Math.hypot(bx - ax, by - ay);
      if (length > longest) {
        longest = length;
        longestIndex = i;
      }
    }
    const [ax, ay] = result[longestIndex];
    const [bx, by] = result[(longestIndex + 1) % result.length];
    result.splice(longestIndex + 1, 0, [Math.round(((ax + bx) / 2) * 10) / 10, Math.round(((ay + by) / 2) * 10) / 10]);
  }
  return result;
}
