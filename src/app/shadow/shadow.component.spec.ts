import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { derangement, MAX_PAIRS, SHADOW_GROUPS, ShadowComponent } from './shadow.component';

const groups = Object.values(SHADOW_GROUPS);
const groupOf = (emoji: string) => groups.findIndex(group => group.includes(emoji));

describe('ShadowComponent', () => {
  let component: ShadowComponent;
  let fixture: ComponentFixture<ShadowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ShadowComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(ShadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have enough unique pictures, each in exactly one group', () => {
    expect(groups.length).toBeGreaterThanOrEqual(MAX_PAIRS);
    const all = groups.flat();
    expect(new Set(all).size).toBe(all.length);
    groups.forEach(group => expect(group.length).toBeGreaterThanOrEqual(MAX_PAIRS));
  });

  it('should never leave an element in its place when shuffling the shadows', () => {
    for (let n = 2; n <= MAX_PAIRS; n++) {
      for (let run = 0; run < 50; run++) {
        const order = derangement(n);
        expect([...order].sort()).toEqual(Array.from({ length: n }, (_, i) => i));
        order.forEach((value, index) => expect(value).not.toBe(index));
      }
    }
  });

  for (const difficulty of ['easy', 'hard'] as const) {
    for (const pairs of [3, 4, 5]) {
      it(`should build ${difficulty} lines of ${pairs} pictures with their shadows in a different order`, () => {
        component.difficulty = difficulty;
        component.pairCount = pairs;
        component.problemCount = 30;
        component.generateProblems();

        expect(component.generatedItems.length).toBe(30);
        component.generatedItems.forEach(item => {
          expect(item.pictures.length).toBe(pairs);
          expect(new Set(item.pictures).size).toBe(pairs);
          expect([...item.shadows].sort()).toEqual([...item.pictures].sort());
          item.pictures.forEach((picture, p) => {
            expect(item.shadows[item.answer[p]]).toBe(picture);
            expect(item.answer[p]).not.toBe(p);
          });

          const pictureGroups = new Set(item.pictures.map(groupOf));
          expect(pictureGroups.size).toBe(difficulty === 'easy' ? pairs : 1);
        });
      });
    }
  }

  it('should not use the same group on two hard lines in a row', () => {
    component.difficulty = 'hard';
    component.problemCount = 50;
    component.generateProblems();

    for (let i = 1; i < component.generatedItems.length; i++) {
      expect(groupOf(component.generatedItems[i].pictures[0])).not.toBe(groupOf(component.generatedItems[i - 1].pictures[0]));
    }
  });

  it('should draw the answer lines only when revealed', () => {
    component.problemCount = 1;
    component.pairCount = 4;
    component.generateProblems();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.shadow').length).toBe(4);
    expect(compiled.querySelectorAll('.answer-lines line').length).toBe(0);

    component.revealAnswer(component.generatedItems[0]);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.answer-lines line').length).toBe(4);
  });
});
