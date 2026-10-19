/**
 * Single-line ("centreline") letters and digits for tracing, drawn the way children write them.
 *
 * Coordinates: y = 0 is the top line (capitals, ascenders), 50 the middle line (x-height),
 * 100 the baseline and 135 the descender line. x starts at 0 on the left of the glyph.
 * Each stroke is one SVG path drawn without lifting the pencil, in writing order; it must start
 * with an absolute "M x y" so the start dot can be placed there.
 */
export interface Glyph {
  /** Horizontal space the glyph takes up. */
  width: number;
  strokes: string[];
  /** Dots of i and j, written last. */
  dots?: [number, number][];
}

export const TOP = 0;
export const MIDDLE = 50;
export const BASELINE = 100;
export const DESCENDER = 135;

// Diacritics above a capital (centred on cx) and above a lowercase letter.
const capCaron = (cx: number) => `M${cx - 10} -24 L${cx} -12 L${cx + 10} -24`;
const capAcute = (cx: number) => `M${cx - 5} -12 L${cx + 7} -26`;
const lowCaron = (cx: number) => `M${cx - 9} 26 L${cx} 37 L${cx + 9} 26`;
const lowAcute = (cx: number) => `M${cx - 4} 37 L${cx + 7} 24`;

// Shapes shared by several letters.
const C_SHAPE = 'M66 18 C57 4 46 0 36 0 C14 0 0 22 0 50 C0 78 14 100 36 100 C47 100 58 95 66 82';
const S_SHAPE = 'M56 14 C50 4 40 0 30 0 C14 0 3 9 3 24 C3 40 18 45 30 49 C44 53 58 59 58 76 C58 92 46 100 30 100 C18 100 6 95 0 84';
const Z_SHAPE = 'M0 0 H60 L0 100 H60';
const LOW_C = 'M42 60 C37 53 30 50 23 50 C9 50 0 62 0 75 C0 89 9 100 23 100 C30 100 37 97 42 90';
/** The round part of a, d, g and q, starting at the top right. */
const LOW_BOWL = 'M44 60 C40 53 32 50 23 50 C9 50 0 62 0 75 C0 89 9 100 23 100 C32 100 40 96 44 88';
const LOW_S = 'M36 57 C32 52 26 50 19 50 C9 50 2 55 2 63 C2 72 11 74 19 76 C29 78 38 81 38 89 C38 96 30 100 19 100 C11 100 4 97 0 92';
const LOW_Z = 'M0 50 H42 L0 100 H42';
const LOW_D = ['M44 60 C40 53 32 50 23 50 C9 50 0 62 0 75 C0 89 9 100 23 100 C32 100 40 96 44 88', 'M45 0 V100'];

export const GLYPHS: Record<string, Glyph> = {
  // Capitals
  A: { width: 70, strokes: ['M35 0 L0 100', 'M35 0 L70 100', 'M13 62 H57'] },
  B: { width: 58, strokes: ['M0 0 V100', 'M0 0 H30 C54 0 54 48 30 48 H0', 'M30 48 C60 48 60 100 30 100 H0'] },
  C: { width: 66, strokes: [C_SHAPE] },
  Č: { width: 66, strokes: [C_SHAPE, capCaron(36)] },
  Ć: { width: 66, strokes: [C_SHAPE, capAcute(38)] },
  D: { width: 64, strokes: ['M0 0 V100', 'M0 0 H24 C51 0 64 22 64 50 C64 78 51 100 24 100 H0'] },
  Đ: { width: 72, strokes: ['M10 0 V100', 'M10 0 H32 C59 0 72 22 72 50 C72 78 59 100 32 100 H10', 'M0 50 H28'] },
  E: { width: 54, strokes: ['M0 0 V100', 'M0 0 H54', 'M0 50 H44', 'M0 100 H54'] },
  F: { width: 52, strokes: ['M0 0 V100', 'M0 0 H52', 'M0 50 H42'] },
  G: { width: 70, strokes: ['M66 18 C57 4 46 0 36 0 C14 0 0 22 0 50 C0 78 14 100 36 100 C56 100 70 86 70 64 V56 H42'] },
  H: { width: 62, strokes: ['M0 0 V100', 'M62 0 V100', 'M0 50 H62'] },
  I: { width: 0, strokes: ['M0 0 V100'] },
  J: { width: 44, strokes: ['M44 0 V72 C44 90 34 100 22 100 C9 100 0 90 0 76'] },
  K: { width: 58, strokes: ['M0 0 V100', 'M58 0 L0 60', 'M20 40 L58 100'] },
  L: { width: 48, strokes: ['M0 0 V100 H48'] },
  M: { width: 80, strokes: ['M0 0 V100', 'M0 0 L40 70 L80 0 V100'] },
  N: { width: 62, strokes: ['M0 0 V100', 'M0 0 L62 100 V0'] },
  O: { width: 80, strokes: ['M40 0 C18 0 0 22 0 50 C0 78 18 100 40 100 C62 100 80 78 80 50 C80 22 62 0 40 0'] },
  P: { width: 56, strokes: ['M0 0 V100', 'M0 0 H28 C56 0 56 54 28 54 H0'] },
  Q: { width: 80, strokes: ['M40 0 C18 0 0 22 0 50 C0 78 18 100 40 100 C62 100 80 78 80 50 C80 22 62 0 40 0', 'M50 72 L80 104'] },
  R: { width: 58, strokes: ['M0 0 V100', 'M0 0 H28 C56 0 56 54 28 54 H0', 'M28 54 L58 100'] },
  S: { width: 58, strokes: [S_SHAPE] },
  Š: { width: 58, strokes: [S_SHAPE, capCaron(30)] },
  T: { width: 60, strokes: ['M30 0 V100', 'M0 0 H60'] },
  U: { width: 60, strokes: ['M0 0 V66 C0 88 13 100 30 100 C47 100 60 88 60 66 V0'] },
  V: { width: 64, strokes: ['M0 0 L32 100 L64 0'] },
  W: { width: 96, strokes: ['M0 0 L22 100 L48 30 L74 100 L96 0'] },
  X: { width: 60, strokes: ['M0 0 L60 100', 'M60 0 L0 100'] },
  Y: { width: 64, strokes: ['M0 0 L32 50', 'M64 0 L32 50 V100'] },
  Z: { width: 60, strokes: [Z_SHAPE] },
  Ž: { width: 60, strokes: [Z_SHAPE, capCaron(30)] },

  // Lowercase
  a: { width: 45, strokes: [LOW_BOWL, 'M45 50 V100'] },
  b: { width: 48, strokes: ['M0 0 V100', 'M0 75 C0 60 10 50 24 50 C38 50 48 62 48 75 C48 88 38 100 24 100 C10 100 0 90 0 75'] },
  c: { width: 42, strokes: [LOW_C] },
  č: { width: 42, strokes: [LOW_C, lowCaron(22)] },
  ć: { width: 42, strokes: [LOW_C, lowAcute(24)] },
  d: { width: 45, strokes: LOW_D },
  đ: { width: 54, strokes: [...LOW_D, 'M34 20 H56'] },
  e: { width: 46, strokes: ['M0 75 H46 C46 60 36 50 23 50 C9 50 0 62 0 75 C0 89 9 100 23 100 C32 100 40 97 45 90'] },
  f: { width: 32, strokes: ['M32 6 C28 2 24 0 20 0 C12 0 8 6 8 16 V100', 'M0 50 H28'] },
  g: { width: 45, strokes: [LOW_BOWL, 'M45 50 V118 C45 130 36 135 24 135 C14 135 6 131 2 124'] },
  h: { width: 46, strokes: ['M0 0 V100', 'M0 68 C2 56 11 50 23 50 C37 50 46 58 46 72 V100'] },
  i: { width: 0, strokes: ['M0 50 V100'], dots: [[0, 32]] },
  j: { width: 24, strokes: ['M22 50 V120 C22 130 16 135 9 135 C5 135 2 134 0 131'], dots: [[22, 32]] },
  k: { width: 44, strokes: ['M0 0 V100', 'M42 50 L0 82', 'M16 70 L44 100'] },
  l: { width: 0, strokes: ['M0 0 V100'] },
  m: { width: 74, strokes: ['M0 50 V100', 'M0 66 C2 55 9 50 18 50 C30 50 37 57 37 70 V100', 'M37 66 C39 55 46 50 55 50 C67 50 74 57 74 70 V100'] },
  n: { width: 44, strokes: ['M0 50 V100', 'M0 66 C2 56 11 50 22 50 C36 50 44 58 44 72 V100'] },
  o: { width: 48, strokes: ['M24 50 C10 50 0 62 0 75 C0 89 10 100 24 100 C38 100 48 89 48 75 C48 62 38 50 24 50'] },
  p: { width: 48, strokes: ['M0 50 V135', 'M0 75 C0 60 10 50 24 50 C38 50 48 62 48 75 C48 88 38 100 24 100 C10 100 0 90 0 75'] },
  q: { width: 45, strokes: [LOW_BOWL, 'M45 50 V135'] },
  r: { width: 34, strokes: ['M0 50 V100', 'M0 70 C3 57 12 50 22 50 C27 50 31 51 34 54'] },
  s: { width: 38, strokes: [LOW_S] },
  š: { width: 38, strokes: [LOW_S, lowCaron(19)] },
  t: { width: 30, strokes: ['M10 10 V88 C10 96 15 100 22 100 C25 100 28 99 30 97', 'M0 50 H28'] },
  u: { width: 44, strokes: ['M0 50 V78 C0 92 9 100 22 100 C35 100 44 92 44 78', 'M44 50 V100'] },
  v: { width: 46, strokes: ['M0 50 L23 100 L46 50'] },
  w: { width: 70, strokes: ['M0 50 L16 100 L35 62 L54 100 L70 50'] },
  x: { width: 42, strokes: ['M0 50 L42 100', 'M42 50 L0 100'] },
  y: { width: 46, strokes: ['M0 50 L23 100', 'M46 50 L7 135'] },
  z: { width: 42, strokes: [LOW_Z] },
  ž: { width: 42, strokes: [LOW_Z, lowCaron(21)] },

  // Digits
  '0': { width: 56, strokes: ['M28 0 C12 0 0 22 0 50 C0 78 12 100 28 100 C44 100 56 78 56 50 C56 22 44 0 28 0'] },
  '1': { width: 30, strokes: ['M0 22 L28 0 V100'] },
  '2': { width: 56, strokes: ['M2 22 C6 8 16 0 29 0 C44 0 54 10 54 25 C54 45 30 62 0 100 H56'] },
  '3': { width: 54, strokes: ['M4 12 C10 4 18 0 28 0 C42 0 52 9 52 23 C52 38 41 47 26 47 C44 47 54 58 54 73 C54 90 42 100 27 100 C15 100 6 95 0 86'] },
  '4': { width: 60, strokes: ['M38 0 L0 68 H60', 'M44 38 V100'] },
  '5': { width: 54, strokes: ['M8 0 L4 44 C12 40 20 38 28 38 C44 38 54 52 54 68 C54 88 42 100 26 100 C14 100 6 95 0 87', 'M8 0 H50'] },
  '6': { width: 54, strokes: ['M46 8 C40 3 34 0 27 0 C10 0 0 22 0 54 C0 82 11 100 27 100 C43 100 54 88 54 70 C54 53 43 42 28 42 C14 42 3 52 0 64'] },
  '7': { width: 56, strokes: ['M0 0 H56 L18 100'] },
  '8': { width: 54, strokes: ['M46 10 C42 3 35 0 27 0 C14 0 4 9 4 23 C4 37 16 44 27 48 C40 52 54 60 54 75 C54 90 42 100 27 100 C12 100 0 90 0 75 C0 60 14 52 27 48 C38 44 50 37 50 23'] },
  '9': { width: 54, strokes: ['M54 30 C54 13 42 0 27 0 C12 0 0 13 0 30 C0 46 12 58 27 58 C42 58 54 46 54 30 V100'] }
};

/** Space between the glyphs of a digraph such as "Lj". */
export const DIGRAPH_GAP = 14;

/** Where a stroke starts: the coordinates of its opening "M x y". */
export function strokeStart(stroke: string): [number, number] {
  const match = /^M\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(stroke);
  if (!match) {
    throw new Error(`Stroke must start with "M x y": ${stroke}`);
  }
  return [Number(match[1]), Number(match[2])];
}
