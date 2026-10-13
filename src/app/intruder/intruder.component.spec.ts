import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { IntruderComponent, MAX_INTRUDERS, MAX_THEME_PICTURES, THEMES } from './intruder.component';

describe('IntruderComponent', () => {
  let component: IntruderComponent;
  let fixture: ComponentFixture<IntruderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [IntruderComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(IntruderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have enough unique pictures and intruders in every theme, with no overlap', () => {
    THEMES.forEach(theme => {
      expect(new Set(theme.pictures).size).withContext(theme.key).toBe(theme.pictures.length);
      expect(new Set(theme.intruders).size).withContext(theme.key).toBe(theme.intruders.length);
      expect(theme.pictures.length).withContext(theme.key).toBeGreaterThanOrEqual(MAX_THEME_PICTURES);
      expect(theme.intruders.length).withContext(theme.key).toBeGreaterThanOrEqual(MAX_INTRUDERS);
      theme.intruders.forEach(intruder =>
        expect(theme.pictures).withContext(`${theme.key} ${intruder}`).not.toContain(intruder)
      );
    });
  });

  it('should have a translated name for every theme in every language', () => {
    const service = TestBed.inject(LanguageService);
    service.languages.forEach(language => {
      service.language = language.value;
      THEMES.forEach(theme => expect(service.t.intruder.themes[theme.key]).toBeTruthy());
    });
  });

  for (const [themeCount, intruderCount] of [[3, 1], [3, 2], [5, 4], [8, 1], [8, 4]]) {
    it(`should build lines of ${themeCount} theme pictures and ${intruderCount} intruders`, () => {
      component.themeCount = themeCount;
      component.intruderCount = intruderCount;
      component.problemCount = 30;
      component.generateProblems();

      expect(component.generatedItems.length).toBe(30);
      component.generatedItems.forEach(item => {
        const theme = THEMES.find(t => t.key === item.theme)!;
        const belonging = item.pictures.filter(p => !p.isIntruder).map(p => p.emoji);
        const intruders = item.pictures.filter(p => p.isIntruder).map(p => p.emoji);

        expect(belonging.length).toBe(themeCount);
        expect(intruders.length).toBe(intruderCount);
        belonging.forEach(emoji => expect(theme.pictures).toContain(emoji));
        intruders.forEach(emoji => expect(theme.intruders).toContain(emoji));
        expect(new Set(item.pictures.map(p => p.emoji)).size).toBe(item.pictures.length);
      });
    });
  }

  it('should never use the same theme on two lines in a row', () => {
    component.problemCount = 100;
    component.generateProblems();

    for (let i = 1; i < component.generatedItems.length; i++) {
      expect(component.generatedItems[i].theme).not.toBe(component.generatedItems[i - 1].theme);
    }
  });

  it('should keep fewer intruders than theme pictures', () => {
    component.intruderCount = 4;
    component.onThemeCountChange(3);

    expect(component.intruderCount).toBe(2);
    expect(component.intruderCounts).toEqual([1, 2]);
  });

  it('should only mark intruders once the answer is revealed', () => {
    component.problemCount = 1;
    component.intruderCount = 2;
    component.generateProblems();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.picture.revealed').length).toBe(0);

    component.revealAnswer(component.generatedItems[0]);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.picture.revealed').length).toBe(2);
    expect(compiled.querySelector('.theme-tag')?.textContent).toContain('Theme:');
  });
});
