import { LanguageKey } from './languages';

/**
 * Capital letters of each alphabet, in alphabetical order, including digraphs that count as one
 * letter (Dž, Lj, Nj). Lowercase versions are `letter.toLocaleLowerCase()`. Polish digraphs (ch, cz, sz…)
 * are written as two letters and aren't in its alphabet.
 */
export const ALPHABETS: Record<LanguageKey, string[]> = {
  english: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  croatian: ['A', 'B', 'C', 'Č', 'Ć', 'D', 'Dž', 'Đ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Lj', 'M', 'N', 'Nj', 'O', 'P', 'R', 'S', 'Š', 'T', 'U', 'V', 'Z', 'Ž'],
  serbian: ['A', 'B', 'C', 'Č', 'Ć', 'D', 'Dž', 'Đ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Lj', 'M', 'N', 'Nj', 'O', 'P', 'R', 'S', 'Š', 'T', 'U', 'V', 'Z', 'Ž'],
  polish: 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ'.split('')
};
