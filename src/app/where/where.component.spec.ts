import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { CHARACTERS, FLOOR_Y, Position, POSITIONS, SENTENCES, SCENE_HEIGHT, SCENE_WIDTH, sentenceText, spotFor, THINGS, WhereComponent } from './where.component';

describe('WhereComponent', () => {
  let component: WhereComponent;
  let fixture: ComponentFixture<WhereComponent>;
  let i18n: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [WhereComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    i18n = TestBed.inject(LanguageService);
    i18n.language = 'english';
    fixture = TestBed.createComponent(WhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should build grammatical sentences in every language', () => {
    const cat = CHARACTERS.find(c => c.emoji === '🐱')!;
    const table = THINGS.find(t => t.key === 'table')!;
    const prep = (language: 'english' | 'croatian' | 'serbian' | 'polish', position: Position) => {
      i18n.language = language;
      return i18n.t.where.positions[position];
    };

    expect(sentenceText(SENTENCES.english(cat, table, prep('english', 'under'), 'under'))).toBe('The cat is under the table.');
    expect(sentenceText(SENTENCES.english(cat, table, prep('english', 'nextTo'), 'nextTo'))).toBe('The cat is next to the table.');
    // Croatian / Serbian: "na" + locative, the others + genitive.
    expect(sentenceText(SENTENCES.croatian(cat, table, prep('croatian', 'on'), 'on'))).toBe('Mačka je na stolu.');
    expect(sentenceText(SENTENCES.croatian(cat, table, prep('croatian', 'under'), 'under'))).toBe('Mačka je ispod stola.');
    expect(sentenceText(SENTENCES.croatian(cat, table, prep('croatian', 'nextTo'), 'nextTo'))).toBe('Mačka je pokraj stola.');
    expect(sentenceText(SENTENCES.serbian(cat, table, prep('serbian', 'nextTo'), 'nextTo'))).toBe('Mačka je pored stola.');
    expect(sentenceText(SENTENCES.serbian(cat, THINGS.find(t => t.key === 'chair')!, prep('serbian', 'on'), 'on'))).toBe('Mačka je na stolici.');
    // Polish: na + locative, pod / nad + instrumental, obok + genitive.
    expect(sentenceText(SENTENCES.polish(cat, table, prep('polish', 'on'), 'on'))).toBe('Kot jest na stole.');
    expect(sentenceText(SENTENCES.polish(cat, table, prep('polish', 'under'), 'under'))).toBe('Kot jest pod stołem.');
    expect(sentenceText(SENTENCES.polish(cat, table, prep('polish', 'nextTo'), 'nextTo'))).toBe('Kot jest obok stołu.');
    expect(sentenceText(SENTENCES.polish(cat, THINGS.find(t => t.key === 'bed')!, prep('polish', 'above'), 'above'))).toBe('Kot jest nad łóżkiem.');
  });

  it('should split out exactly the preposition, as a whole word, in every language', () => {
    i18n.languages.forEach(({ value: language }) => {
      i18n.language = language;
      CHARACTERS.forEach(character => THINGS.forEach(thing => POSITIONS.forEach(position => {
        const preposition = i18n.t.where.positions[position];
        const parts = SENTENCES[language](character, thing, preposition, position);
        const context = `${language} ${character.emoji} ${thing.key} ${position}`;
        expect(parts.preposition).withContext(context).toBe(preposition);
        expect(parts.before).withContext(context).toMatch(/ $/);
        expect(parts.after).withContext(context).toMatch(/^ /);
      })));
    });
  });

  it('should keep every character inside the scene and on the right side of the object', () => {
    THINGS.forEach(thing => {
      POSITIONS.forEach(position => {
        const spot = spotFor(thing, position);
        const half = spot.size / 2;
        expect(spot.x - half).withContext(`${thing.key} ${position}`).toBeGreaterThanOrEqual(0);
        expect(spot.x + half).withContext(`${thing.key} ${position}`).toBeLessThanOrEqual(SCENE_WIDTH);
        expect(spot.y - half).withContext(`${thing.key} ${position}`).toBeGreaterThanOrEqual(0);
        expect(spot.y + half).withContext(`${thing.key} ${position}`).toBeLessThanOrEqual(FLOOR_Y + 1);
      });
      const top = Math.min(...thing.rects.map(r => r.y));
      // "Above" floats clearly higher than "on", which sits on the object.
      expect(thing.spots.above.y + thing.spots.above.size / 2).toBeLessThan(top - 8);
      expect(thing.spots.on.y).toBeGreaterThan(thing.spots.above.y + 15);
    });
    expect(SCENE_HEIGHT).toBeGreaterThan(FLOOR_Y);
  });

  for (const scenes of [2, 3, 4]) {
    it(`should build lines of ${scenes} scenes that each show a different position, including the answer`, () => {
      component.sceneCount = scenes;
      component.problemCount = 40;
      component.generateProblems();

      component.generatedItems.forEach(item => {
        const positions = item.scenes.map(scene => scene.position);
        expect(positions.length).toBe(scenes);
        expect(new Set(positions).size).toBe(scenes);
        expect(positions).toContain(item.target);
      });
      for (let i = 1; i < component.generatedItems.length; i++) {
        expect(component.generatedItems[i].target).not.toBe(component.generatedItems[i - 1].target);
      }
    });
  }

  it('should only use the selected positions and always keep at least two', () => {
    component.togglePosition('above');
    component.togglePosition('nextTo');
    expect(component.activePositions).toEqual(['on', 'under']);
    expect(component.sceneCounts).toEqual([2]);
    expect(component.sceneCount).toBe(2);

    component.togglePosition('under');
    expect(component.activePositions).toEqual(['on', 'under']);

    component.problemCount = 20;
    component.generateProblems();
    component.generatedItems.forEach(item => item.scenes.forEach(scene => expect(['on', 'under']).toContain(scene.position)));
  });

  it('should show the sentence in the selected language and mark the answer when revealed', () => {
    component.problemCount = 1;
    component.generateProblems();
    i18n.language = 'croatian';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.sentence')?.textContent).toMatch(/ je (na|ispod|pokraj|iznad) /);
    expect(compiled.querySelector('.sentence .preposition')?.textContent).toBe(i18n.t.where.positions[component.generatedItems[0].target]);
    expect(compiled.querySelectorAll('.scene.correct').length).toBe(0);

    component.revealAnswer(component.generatedItems[0]);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.scene.correct').length).toBe(1);
  });
});
