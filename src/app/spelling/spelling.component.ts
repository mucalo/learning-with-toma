import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LanguageKey } from '../i18n/languages';
import { LanguageService } from '../i18n/language.service';

interface SpellingItem {
  word: string;
  emoji: string;
  letters: string[];
  displayGroups?: DisplayLetterGroup[];
  wordRevealed?: boolean;
}

interface DisplayLetterGroup {
  value: string;
  isCombined: boolean;
}

/** Digraphs that are one letter of the alphabet (Polish ch, cz, sz… are two letters). */
const DIGRAPHS: Record<LanguageKey, string[]> = {
  english: [],
  croatian: ['lj', 'nj', 'dž'],
  serbian: ['lj', 'nj', 'dž'],
  polish: []
};

@Component({
  selector: 'app-spelling',
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SpellingComponent {
  /** Fills exactly two A4 pages with the other settings at their defaults. */
  problemCount = 16;
  maxLetters = 10;
  generatedItems: SpellingItem[] = [];

  constructor(readonly i18n: LanguageService) {}

  private readonly wordBank: Record<LanguageKey, SpellingItem[]> = {
    english: [
      { word: 'sun', emoji: '☀️', letters: ['s', 'u', 'n'] },
      { word: 'moon', emoji: '🌙', letters: ['m', 'o', 'o', 'n'] },
      { word: 'star', emoji: '⭐', letters: ['s', 't', 'a', 'r'] },
      { word: 'cloud', emoji: '☁️', letters: ['c', 'l', 'o', 'u', 'd'] },
      { word: 'rain', emoji: '🌧️', letters: ['r', 'a', 'i', 'n'] },
      { word: 'snow', emoji: '❄️', letters: ['s', 'n', 'o', 'w'] },
      { word: 'apple', emoji: '🍎', letters: ['a', 'p', 'p', 'l', 'e'] },
      { word: 'banana', emoji: '🍌', letters: ['b', 'a', 'n', 'a', 'n', 'a'] },
      { word: 'cookie', emoji: '🍪', letters: ['c', 'o', 'o', 'k', 'i', 'e'] },
      { word: 'milk', emoji: '🥛', letters: ['m', 'i', 'l', 'k'] },
      { word: 'cake', emoji: '🎂', letters: ['c', 'a', 'k', 'e'] },
      { word: 'cupcake', emoji: '🧁', letters: ['c', 'u', 'p', 'c', 'a', 'k', 'e'] },
      { word: 'pizza', emoji: '🍕', letters: ['p', 'i', 'z', 'z', 'a'] },
      { word: 'sandwich', emoji: '🥪', letters: ['s', 'a', 'n', 'd', 'w', 'i', 'c', 'h'] },
      { word: 'juice', emoji: '🧃', letters: ['j', 'u', 'i', 'c', 'e'] },
      { word: 'water', emoji: '💧', letters: ['w', 'a', 't', 'e', 'r'] },
      { word: 'fish', emoji: '🐟', letters: ['f', 'i', 's', 'h'] },
      { word: 'bird', emoji: '🐦', letters: ['b', 'i', 'r', 'd'] },
      { word: 'bee', emoji: '🐝', letters: ['b', 'e', 'e'] },
      { word: 'frog', emoji: '🐸', letters: ['f', 'r', 'o', 'g'] },
      { word: 'turtle', emoji: '🐢', letters: ['t', 'u', 'r', 't', 'l', 'e'] },
      { word: 'rabbit', emoji: '🐰', letters: ['r', 'a', 'b', 'b', 'i', 't'] },
      { word: 'duck', emoji: '🦆', letters: ['d', 'u', 'c', 'k'] },
      { word: 'cat', emoji: '🐱', letters: ['c', 'a', 't'] },
      { word: 'dog', emoji: '🐶', letters: ['d', 'o', 'g'] },
      { word: 'book', emoji: '📖', letters: ['b', 'o', 'o', 'k'] },
      { word: 'pencil', emoji: '✏️', letters: ['p', 'e', 'n', 'c', 'i', 'l'] },
      { word: 'crayon', emoji: '🖍️', letters: ['c', 'r', 'a', 'y', 'o', 'n'] },
      { word: 'scissors', emoji: '✂️', letters: ['s', 'c', 'i', 's', 's', 'o', 'r', 's'] },
      { word: 'backpack', emoji: '🎒', letters: ['b', 'a', 'c', 'k', 'p', 'a', 'c', 'k'] },
      { word: 'school', emoji: '🏫', letters: ['s', 'c', 'h', 'o', 'o', 'l'] },
      { word: 'teacher', emoji: '👩‍🏫', letters: ['t', 'e', 'a', 'c', 'h', 'e', 'r'] },
      { word: 'ball', emoji: '⚽', letters: ['b', 'a', 'l', 'l'] },
      { word: 'kite', emoji: '🪁', letters: ['k', 'i', 't', 'e'] },
      { word: 'bike', emoji: '🚲', letters: ['b', 'i', 'k', 'e'] },
      { word: 'airplane', emoji: '✈️', letters: ['a', 'i', 'r', 'p', 'l', 'a', 'n', 'e'] },
      { word: 'train', emoji: '🚆', letters: ['t', 'r', 'a', 'i', 'n'] },
      { word: 'boat', emoji: '⛵', letters: ['b', 'o', 'a', 't'] },
      { word: 'bus', emoji: '🚌', letters: ['b', 'u', 's'] },
      { word: 'car', emoji: '🚗', letters: ['c', 'a', 'r'] },
      { word: 'house', emoji: '🏠', letters: ['h', 'o', 'u', 's', 'e'] },
      { word: 'bed', emoji: '🛏️', letters: ['b', 'e', 'd'] },
      { word: 'shoes', emoji: '👟', letters: ['s', 'h', 'o', 'e', 's'] },
      { word: 'hat', emoji: '🎩', letters: ['h', 'a', 't'] },
      { word: 'umbrella', emoji: '☔', letters: ['u', 'm', 'b', 'r', 'e', 'l', 'l', 'a'] },
      { word: 'flower', emoji: '🌸', letters: ['f', 'l', 'o', 'w', 'e', 'r'] },
      { word: 'tree', emoji: '🌳', letters: ['t', 'r', 'e', 'e'] },
      { word: 'leaf', emoji: '🍃', letters: ['l', 'e', 'a', 'f'] },
      { word: 'smile', emoji: '😊', letters: ['s', 'm', 'i', 'l', 'e'] },
      { word: 'castle', emoji: '🏰', letters: ['c', 'a', 's', 't', 'l', 'e'] }
    ],
    croatian: [
      { word: 'sunce', emoji: '☀️', letters: ['s', 'u', 'n', 'c', 'e'] },
      { word: 'mjesec', emoji: '🌙', letters: ['m', 'j', 'e', 's', 'e', 'c'] },
      { word: 'zvijezda', emoji: '⭐', letters: ['z', 'v', 'i', 'j', 'e', 'z', 'd', 'a'] },
      { word: 'oblak', emoji: '☁️', letters: ['o', 'b', 'l', 'a', 'k'] },
      { word: 'kiša', emoji: '🌧️', letters: ['k', 'i', 'š', 'a'] },
      { word: 'snijeg', emoji: '❄️', letters: ['s', 'n', 'i', 'j', 'e', 'g'] },
      { word: 'jabuka', emoji: '🍎', letters: ['j', 'a', 'b', 'u', 'k', 'a'] },
      { word: 'banana', emoji: '🍌', letters: ['b', 'a', 'n', 'a', 'n', 'a'] },
      { word: 'kolačić', emoji: '🍪', letters: ['k', 'o', 'l', 'a', 'č', 'i', 'ć'] },
      { word: 'mlijeko', emoji: '🥛', letters: ['m', 'l', 'i', 'j', 'e', 'k', 'o'] },
      { word: 'torta', emoji: '🎂', letters: ['t', 'o', 'r', 't', 'a'] },
      { word: 'sladoled', emoji: '🍦', letters: ['s', 'l', 'a', 'd', 'o', 'l', 'e', 'd'] },
      { word: 'pizza', emoji: '🍕', letters: ['p', 'i', 'z', 'z', 'a'] },
      { word: 'sendvič', emoji: '🥪', letters: ['s', 'e', 'n', 'd', 'v', 'i', 'č'] },
      { word: 'sok', emoji: '🧃', letters: ['s', 'o', 'k'] },
      { word: 'voda', emoji: '💧', letters: ['v', 'o', 'd', 'a'] },
      { word: 'riba', emoji: '🐟', letters: ['r', 'i', 'b', 'a'] },
      { word: 'ptica', emoji: '🐦', letters: ['p', 't', 'i', 'c', 'a'] },
      { word: 'pčela', emoji: '🐝', letters: ['p', 'č', 'e', 'l', 'a'] },
      { word: 'žaba', emoji: '🐸', letters: ['ž', 'a', 'b', 'a'] },
      { word: 'kornjača', emoji: '🐢', letters: ['k', 'o', 'r', 'n', 'j', 'a', 'č', 'a'] },
      { word: 'zec', emoji: '🐰', letters: ['z', 'e', 'c'] },
      { word: 'patka', emoji: '🦆', letters: ['p', 'a', 't', 'k', 'a'] },
      { word: 'mačka', emoji: '🐱', letters: ['m', 'a', 'č', 'k', 'a'] },
      { word: 'pas', emoji: '🐶', letters: ['p', 'a', 's'] },
      { word: 'knjiga', emoji: '📖', letters: ['k', 'n', 'j', 'i', 'g', 'a'] },
      { word: 'olovka', emoji: '✏️', letters: ['o', 'l', 'o', 'v', 'k', 'a'] },
      { word: 'bojica', emoji: '🖍️', letters: ['b', 'o', 'j', 'i', 'c', 'a'] },
      { word: 'škare', emoji: '✂️', letters: ['š', 'k', 'a', 'r', 'e'] },
      { word: 'ruksak', emoji: '🎒', letters: ['r', 'u', 'k', 's', 'a', 'k'] },
      { word: 'škola', emoji: '🏫', letters: ['š', 'k', 'o', 'l', 'a'] },
      { word: 'učitelj', emoji: '👩‍🏫', letters: ['u', 'č', 'i', 't', 'e', 'l', 'j'] },
      { word: 'lopta', emoji: '⚽', letters: ['l', 'o', 'p', 't', 'a'] },
      { word: 'zmaj', emoji: '🪁', letters: ['z', 'm', 'a', 'j'] },
      { word: 'bicikl', emoji: '🚲', letters: ['b', 'i', 'c', 'i', 'k', 'l'] },
      { word: 'zrakoplov', emoji: '✈️', letters: ['z', 'r', 'a', 'k', 'o', 'p', 'l', 'o', 'v'] },
      { word: 'vlak', emoji: '🚆', letters: ['v', 'l', 'a', 'k'] },
      { word: 'brod', emoji: '⛵', letters: ['b', 'r', 'o', 'd'] },
      { word: 'autobus', emoji: '🚌', letters: ['a', 'u', 't', 'o', 'b', 'u', 's'] },
      { word: 'auto', emoji: '🚗', letters: ['a', 'u', 't', 'o'] },
      { word: 'kuća', emoji: '🏠', letters: ['k', 'u', 'ć', 'a'] },
      { word: 'krevet', emoji: '🛏️', letters: ['k', 'r', 'e', 'v', 'e', 't'] },
      { word: 'cipela', emoji: '👟', letters: ['c', 'i', 'p', 'e', 'l', 'a'] },
      { word: 'šešir', emoji: '🎩', letters: ['š', 'e', 'š', 'i', 'r'] },
      { word: 'kišobran', emoji: '☔', letters: ['k', 'i', 'š', 'o', 'b', 'r', 'a', 'n'] },
      { word: 'cvijet', emoji: '🌸', letters: ['c', 'v', 'i', 'j', 'e', 't'] },
      { word: 'drvo', emoji: '🌳', letters: ['d', 'r', 'v', 'o'] },
      { word: 'list', emoji: '🍃', letters: ['l', 'i', 's', 't'] },
      { word: 'osmijeh', emoji: '😊', letters: ['o', 's', 'm', 'i', 'j', 'e', 'h'] },
      { word: 'dvorac', emoji: '🏰', letters: ['d', 'v', 'o', 'r', 'a', 'c'] }
    ],
    serbian: [
      { word: 'sunce', emoji: '☀️', letters: ['s', 'u', 'n', 'c', 'e'] },
      { word: 'mesec', emoji: '🌙', letters: ['m', 'e', 's', 'e', 'c'] },
      { word: 'zvezda', emoji: '⭐', letters: ['z', 'v', 'e', 'z', 'd', 'a'] },
      { word: 'oblak', emoji: '☁️', letters: ['o', 'b', 'l', 'a', 'k'] },
      { word: 'kiša', emoji: '🌧️', letters: ['k', 'i', 'š', 'a'] },
      { word: 'sneg', emoji: '❄️', letters: ['s', 'n', 'e', 'g'] },
      { word: 'jabuka', emoji: '🍎', letters: ['j', 'a', 'b', 'u', 'k', 'a'] },
      { word: 'banana', emoji: '🍌', letters: ['b', 'a', 'n', 'a', 'n', 'a'] },
      { word: 'kolačić', emoji: '🍪', letters: ['k', 'o', 'l', 'a', 'č', 'i', 'ć'] },
      { word: 'mleko', emoji: '🥛', letters: ['m', 'l', 'e', 'k', 'o'] },
      { word: 'torta', emoji: '🎂', letters: ['t', 'o', 'r', 't', 'a'] },
      { word: 'sladoled', emoji: '🍦', letters: ['s', 'l', 'a', 'd', 'o', 'l', 'e', 'd'] },
      { word: 'pizza', emoji: '🍕', letters: ['p', 'i', 'z', 'z', 'a'] },
      { word: 'sendvič', emoji: '🥪', letters: ['s', 'e', 'n', 'd', 'v', 'i', 'č'] },
      { word: 'sok', emoji: '🧃', letters: ['s', 'o', 'k'] },
      { word: 'voda', emoji: '💧', letters: ['v', 'o', 'd', 'a'] },
      { word: 'riba', emoji: '🐟', letters: ['r', 'i', 'b', 'a'] },
      { word: 'ptica', emoji: '🐦', letters: ['p', 't', 'i', 'c', 'a'] },
      { word: 'pčela', emoji: '🐝', letters: ['p', 'č', 'e', 'l', 'a'] },
      { word: 'žaba', emoji: '🐸', letters: ['ž', 'a', 'b', 'a'] },
      { word: 'kornjača', emoji: '🐢', letters: ['k', 'o', 'r', 'n', 'j', 'a', 'č', 'a'] },
      { word: 'zec', emoji: '🐰', letters: ['z', 'e', 'c'] },
      { word: 'patka', emoji: '🦆', letters: ['p', 'a', 't', 'k', 'a'] },
      { word: 'macka', emoji: '🐱', letters: ['m', 'a', 'c', 'k', 'a'] },
      { word: 'pas', emoji: '🐶', letters: ['p', 'a', 's'] },
      { word: 'knjiga', emoji: '📖', letters: ['k', 'n', 'j', 'i', 'g', 'a'] },
      { word: 'olovka', emoji: '✏️', letters: ['o', 'l', 'o', 'v', 'k', 'a'] },
      { word: 'bojica', emoji: '🖍️', letters: ['b', 'o', 'j', 'i', 'c', 'a'] },
      { word: 'škare', emoji: '✂️', letters: ['š', 'k', 'a', 'r', 'e'] },
      { word: 'ranac', emoji: '🎒', letters: ['r', 'a', 'n', 'a', 'c'] },
      { word: 'škola', emoji: '🏫', letters: ['š', 'k', 'o', 'l', 'a'] },
      { word: 'učitelj', emoji: '👩‍🏫', letters: ['u', 'č', 'i', 't', 'e', 'l', 'j'] },
      { word: 'lopta', emoji: '⚽', letters: ['l', 'o', 'p', 't', 'a'] },
      { word: 'zmaj', emoji: '🪁', letters: ['z', 'm', 'a', 'j'] },
      { word: 'bicikl', emoji: '🚲', letters: ['b', 'i', 'c', 'i', 'k', 'l'] },
      { word: 'avion', emoji: '✈️', letters: ['a', 'v', 'i', 'o', 'n'] },
      { word: 'voz', emoji: '🚆', letters: ['v', 'o', 'z'] },
      { word: 'brod', emoji: '⛵', letters: ['b', 'r', 'o', 'd'] },
      { word: 'autobus', emoji: '🚌', letters: ['a', 'u', 't', 'o', 'b', 'u', 's'] },
      { word: 'auto', emoji: '🚗', letters: ['a', 'u', 't', 'o'] },
      { word: 'kuća', emoji: '🏠', letters: ['k', 'u', 'ć', 'a'] },
      { word: 'krevet', emoji: '🛏️', letters: ['k', 'r', 'e', 'v', 'e', 't'] },
      { word: 'cipele', emoji: '👟', letters: ['c', 'i', 'p', 'e', 'l', 'e'] },
      { word: 'šešir', emoji: '🎩', letters: ['š', 'e', 'š', 'i', 'r'] },
      { word: 'kišobran', emoji: '☔', letters: ['k', 'i', 'š', 'o', 'b', 'r', 'a', 'n'] },
      { word: 'cvet', emoji: '🌸', letters: ['c', 'v', 'e', 't'] },
      { word: 'drvo', emoji: '🌳', letters: ['d', 'r', 'v', 'o'] },
      { word: 'list', emoji: '🍃', letters: ['l', 'i', 's', 't'] },
      { word: 'osmeh', emoji: '😊', letters: ['o', 's', 'm', 'e', 'h'] },
      { word: 'dvorac', emoji: '🏰', letters: ['d', 'v', 'o', 'r', 'a', 'c'] }
    ],
    polish: [
      { word: 'słońce', emoji: '☀️', letters: ['s', 'ł', 'o', 'ń', 'c', 'e'] },
      { word: 'księżyc', emoji: '🌙', letters: ['k', 's', 'i', 'ę', 'ż', 'y', 'c'] },
      { word: 'gwiazda', emoji: '⭐', letters: ['g', 'w', 'i', 'a', 'z', 'd', 'a'] },
      { word: 'chmura', emoji: '☁️', letters: ['c', 'h', 'm', 'u', 'r', 'a'] },
      { word: 'deszcz', emoji: '🌧️', letters: ['d', 'e', 's', 'z', 'c', 'z'] },
      { word: 'śnieg', emoji: '❄️', letters: ['ś', 'n', 'i', 'e', 'g'] },
      { word: 'jabłko', emoji: '🍎', letters: ['j', 'a', 'b', 'ł', 'k', 'o'] },
      { word: 'banan', emoji: '🍌', letters: ['b', 'a', 'n', 'a', 'n'] },
      { word: 'ciastko', emoji: '🍪', letters: ['c', 'i', 'a', 's', 't', 'k', 'o'] },
      { word: 'mleko', emoji: '🥛', letters: ['m', 'l', 'e', 'k', 'o'] },
      { word: 'tort', emoji: '🎂', letters: ['t', 'o', 'r', 't'] },
      { word: 'babeczka', emoji: '🧁', letters: ['b', 'a', 'b', 'e', 'c', 'z', 'k', 'a'] },
      { word: 'pizza', emoji: '🍕', letters: ['p', 'i', 'z', 'z', 'a'] },
      { word: 'kanapka', emoji: '🥪', letters: ['k', 'a', 'n', 'a', 'p', 'k', 'a'] },
      { word: 'sok', emoji: '🧃', letters: ['s', 'o', 'k'] },
      { word: 'woda', emoji: '💧', letters: ['w', 'o', 'd', 'a'] },
      { word: 'ryba', emoji: '🐟', letters: ['r', 'y', 'b', 'a'] },
      { word: 'ptak', emoji: '🐦', letters: ['p', 't', 'a', 'k'] },
      { word: 'pszczoła', emoji: '🐝', letters: ['p', 's', 'z', 'c', 'z', 'o', 'ł', 'a'] },
      { word: 'żaba', emoji: '🐸', letters: ['ż', 'a', 'b', 'a'] },
      { word: 'żółw', emoji: '🐢', letters: ['ż', 'ó', 'ł', 'w'] },
      { word: 'królik', emoji: '🐰', letters: ['k', 'r', 'ó', 'l', 'i', 'k'] },
      { word: 'kaczka', emoji: '🦆', letters: ['k', 'a', 'c', 'z', 'k', 'a'] },
      { word: 'kot', emoji: '🐱', letters: ['k', 'o', 't'] },
      { word: 'pies', emoji: '🐶', letters: ['p', 'i', 'e', 's'] },
      { word: 'książka', emoji: '📖', letters: ['k', 's', 'i', 'ą', 'ż', 'k', 'a'] },
      { word: 'ołówek', emoji: '✏️', letters: ['o', 'ł', 'ó', 'w', 'e', 'k'] },
      { word: 'kredka', emoji: '🖍️', letters: ['k', 'r', 'e', 'd', 'k', 'a'] },
      { word: 'nożyczki', emoji: '✂️', letters: ['n', 'o', 'ż', 'y', 'c', 'z', 'k', 'i'] },
      { word: 'plecak', emoji: '🎒', letters: ['p', 'l', 'e', 'c', 'a', 'k'] },
      { word: 'szkoła', emoji: '🏫', letters: ['s', 'z', 'k', 'o', 'ł', 'a'] },
      { word: 'piłka', emoji: '⚽', letters: ['p', 'i', 'ł', 'k', 'a'] },
      { word: 'latawiec', emoji: '🪁', letters: ['l', 'a', 't', 'a', 'w', 'i', 'e', 'c'] },
      { word: 'rower', emoji: '🚲', letters: ['r', 'o', 'w', 'e', 'r'] },
      { word: 'samolot', emoji: '✈️', letters: ['s', 'a', 'm', 'o', 'l', 'o', 't'] },
      { word: 'pociąg', emoji: '🚆', letters: ['p', 'o', 'c', 'i', 'ą', 'g'] },
      { word: 'łódka', emoji: '⛵', letters: ['ł', 'ó', 'd', 'k', 'a'] },
      { word: 'autobus', emoji: '🚌', letters: ['a', 'u', 't', 'o', 'b', 'u', 's'] },
      { word: 'auto', emoji: '🚗', letters: ['a', 'u', 't', 'o'] },
      { word: 'dom', emoji: '🏠', letters: ['d', 'o', 'm'] },
      { word: 'łóżko', emoji: '🛏️', letters: ['ł', 'ó', 'ż', 'k', 'o'] },
      { word: 'buty', emoji: '👟', letters: ['b', 'u', 't', 'y'] },
      { word: 'kapelusz', emoji: '🎩', letters: ['k', 'a', 'p', 'e', 'l', 'u', 's', 'z'] },
      { word: 'parasol', emoji: '☔', letters: ['p', 'a', 'r', 'a', 's', 'o', 'l'] },
      { word: 'kwiat', emoji: '🌸', letters: ['k', 'w', 'i', 'a', 't'] },
      { word: 'drzewo', emoji: '🌳', letters: ['d', 'r', 'z', 'e', 'w', 'o'] },
      { word: 'liść', emoji: '🍃', letters: ['l', 'i', 'ś', 'ć'] },
      { word: 'uśmiech', emoji: '😊', letters: ['u', 'ś', 'm', 'i', 'e', 'c', 'h'] },
      { word: 'zamek', emoji: '🏰', letters: ['z', 'a', 'm', 'e', 'k'] }
    ]
  };

  /** One box per letter; Croatian and Serbian digraphs (lj, nj, dž) share a box, as they are one letter. */
  private getDisplayLetterGroups(word: string, language: LanguageKey): DisplayLetterGroup[] {
    const lower = word.toLowerCase();
    const groups: DisplayLetterGroup[] = [];

    for (let i = 0; i < lower.length; ) {
      const digraph = DIGRAPHS[language].find(candidate => lower.startsWith(candidate, i));
      const value = digraph ?? lower[i];
      groups.push({ value, isCombined: !!digraph });
      i += value.length;
    }

    return groups;
  }

  getDisplayGroups(item: SpellingItem): DisplayLetterGroup[] {
    if (item.displayGroups && item.displayGroups.length) {
      return item.displayGroups;
    }

    return item.letters.map(letter => ({ value: letter, isCombined: false }));
  }

  generateProblems(): void {
    const language = this.i18n.language;
    const safeCount = Math.max(1, Math.min(100, Number(this.problemCount) || 1));
    const safeMaxLetters = Math.max(1, Math.min(10, Number(this.maxLetters) || 1));
    const pool = this.wordBank[language].filter(item => item.letters.length <= safeMaxLetters);

    if (pool.length === 0) {
      this.generatedItems = [];
      return;
    }

    this.generatedItems = [];
    let previousEmoji = '';
    const usedIndices = new Set<number>();

    for (let i = 0; i < safeCount; i++) {
      const source = this.getNextDifferentItem(pool, previousEmoji, usedIndices);
      if (!source) break;

      const displayGroups = this.getDisplayLetterGroups(source.word, language);
      this.generatedItems.push({
        word: source.word,
        emoji: source.emoji,
        letters: displayGroups.map(group => group.value),
        displayGroups
      });

      previousEmoji = source.emoji;
    }
  }

  private getNextDifferentItem(pool: SpellingItem[], previousEmoji: string, usedIndices: Set<number>): SpellingItem | null {
    const availableIndices = Array.from({ length: pool.length }, (_, i) => i).filter(i => !usedIndices.has(i));
    
    if (availableIndices.length === 0) {
      return null;
    }

    let attempts = 0;
    const maxAttempts = 50;
    let selectedIndex = -1;

    while (attempts < maxAttempts) {
      const randomIdx = Math.floor(Math.random() * availableIndices.length);
      selectedIndex = availableIndices[randomIdx];
      
      if (pool[selectedIndex].emoji !== previousEmoji) {
        break;
      }
      attempts++;
    }

    if (selectedIndex >= 0) {
      usedIndices.add(selectedIndex);
      return pool[selectedIndex];
    }

    return null;
  }

  revealWord(item: SpellingItem): void {
    item.wordRevealed = !item.wordRevealed;
  }

  removeItem(index: number): void {
    this.generatedItems.splice(index, 1);
  }

  printWorksheet(): void {
    window.print();
  }
}
