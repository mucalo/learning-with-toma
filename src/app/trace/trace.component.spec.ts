import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ALPHABETS } from '../i18n/alphabets';
import { LANGUAGES } from '../i18n/languages';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { GLYPHS } from './glyphs';
import { DIGITS, TraceComponent, VIEW_WIDTHS, charactersFor, layoutCharacter, parseCustomCharacters } from './trace.component';

describe('Trace the Letters', () => {
  describe('glyphs', () => {
    it('should have a glyph for every letter of every language, in both cases, and every digit', () => {
      for (const { value } of LANGUAGES) {
        for (const type of ['uppercase', 'lowercase', 'numbers'] as const) {
          for (const character of charactersFor(type, value)) {
            expect(() => layoutCharacter(character)).withContext(`${value} ${character}`).not.toThrow();
          }
        }
      }
    });

    it('should start every stroke with an absolute move, so the start dot can be placed', () => {
      for (const [key, glyph] of Object.entries(GLYPHS)) {
        for (const stroke of glyph.strokes) {
          expect(stroke).withContext(key).toMatch(/^M-?\d/);
        }
      }
    });

    it('should lay out a digraph as two letters side by side, numbering strokes in writing order', () => {
      const layout = layoutCharacter('Lj');
      expect(layout.width).toBeGreaterThan(GLYPHS['L'].width + GLYPHS['j'].width);
      expect(layout.strokes.map(s => s.order)).toEqual([1, 2]);
      expect(layout.strokes[1].offset).toBeGreaterThan(0);
      expect(layout.dots.length).toBe(1);
    });

    it('should put the number of a stroke that starts where another one does on the other side', () => {
      const [stem, top] = layoutCharacter('E').strokes;
      expect(stem.labelDx).toBeLessThan(0);
      expect(top.labelDx).toBeGreaterThan(0);
    });
  });

  describe('parseCustomCharacters', () => {
    it('should read letters with or without spaces, in the chosen case, without duplicates', () => {
      expect(parseCustomCharacters('b d p', 'lowercase', 'english')).toEqual(['b', 'd', 'p']);
      expect(parseCustomCharacters('BDPb', 'uppercase', 'english')).toEqual(['B', 'D', 'P']);
    });

    it('should treat lj, nj and dž as one letter only in Croatian and Serbian', () => {
      expect(parseCustomCharacters('ljnjdž č', 'uppercase', 'croatian')).toEqual(['Lj', 'Nj', 'Dž', 'Č']);
      expect(parseCustomCharacters('lj', 'lowercase', 'english')).toEqual(['l', 'j']);
    });

    it('should keep only digits for numbers and only letters for letters', () => {
      expect(parseCustomCharacters('3, 5, x, 3', 'numbers', 'english')).toEqual(['3', '5']);
      expect(parseCustomCharacters('a1b', 'lowercase', 'english')).toEqual(['a', 'b']);
    });
  });

  describe('component', () => {
    let component: TraceComponent;
    let fixture: ComponentFixture<TraceComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FormsModule, RouterTestingModule],
        declarations: [TraceComponent, WorksheetComponent]
      }).compileComponents();

      TestBed.inject(LanguageService).language = 'croatian';
      fixture = TestBed.createComponent(TraceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should go through the alphabet in order, wrapping around', () => {
      component.problemCount = 32;
      component.generateProblems();
      const characters = component.generatedItems.map(item => item.character);
      expect(characters.slice(0, 8)).toEqual(['A', 'B', 'C', 'Č', 'Ć', 'D', 'Dž', 'Đ']);
      expect(characters.slice(30)).toEqual(['A', 'B']);
    });

    it('should use only the chosen letters when some are typed in', () => {
      component.traceType = 'lowercase';
      component.customCharacters = 'b d';
      component.problemCount = 5;
      component.generateProblems();
      expect(component.generatedItems.map(item => item.character)).toEqual(['b', 'd', 'b', 'd', 'b']);
    });

    it('should never repeat a character twice in a row in random order', () => {
      component.traceType = 'numbers';
      component.order = 'random';
      component.problemCount = 40;
      component.generateProblems();
      const characters = component.generatedItems.map(item => item.character);
      expect(characters.every(c => DIGITS.includes(c))).toBeTrue();
      characters.slice(1).forEach((c, i) => expect(c).not.toBe(characters[i]));
    });

    it('should leave room at the end of each row to write the letter alone', () => {
      component.problemCount = ALPHABETS.croatian.length;
      component.size = 'large';
      component.generateProblems();
      for (const item of component.generatedItems) {
        const lastCopyEnd = item.copyXs[item.copyXs.length - 1] + item.layout.width;
        expect(item.copyXs.length).toBeGreaterThan(0);
        expect(lastCopyEnd).withContext(item.character).toBeLessThanOrEqual(VIEW_WIDTHS.large * 0.5);
      }
    });

    it('should render one row per character with numbers instruction for digits', () => {
      component.traceType = 'numbers';
      component.problemCount = 3;
      component.generateProblems();
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelectorAll('.trace-svg').length).toBe(3);
      expect(element.textContent).toContain('Prati brojke po točkicama');
    });
  });
});
