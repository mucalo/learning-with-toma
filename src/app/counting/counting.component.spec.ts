import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { WorksheetComponent } from '../worksheet/worksheet.component';
import { CountingComponent } from './counting.component';

describe('CountingComponent', () => {
  let component: CountingComponent;
  let fixture: ComponentFixture<CountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CountingComponent, WorksheetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(CountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate problems with correct count', () => {
    component.problemCount = 5;
    component.generateProblems();
    expect(component.generatedItems.length).toBe(5);
  });

  it('should respect max items limit', () => {
    component.maxItems = 3;
    component.generateProblems();
    component.generatedItems.forEach(item => {
      expect(item.count).toBeLessThanOrEqual(3);
    });
  });

  it('should toggle answer visibility on hint button click', () => {
    component.problemCount = 1;
    component.generateProblems();
    const item = component.generatedItems[0];
    expect(item.answerRevealed).toBeFalsy();
    component.revealAnswer(item);
    expect(item.answerRevealed).toBeTruthy();
  });

  it('should remove item when requested', () => {
    component.problemCount = 3;
    component.generateProblems();
    expect(component.generatedItems.length).toBe(3);
    component.removeItem(1);
    expect(component.generatedItems.length).toBe(2);
  });

  it('should display instruction text in selected language', () => {
    component.i18n.language = 'english';
    expect(component.i18n.t.counting.instruction).toBe('Count the number of items.');

    component.i18n.language = 'croatian';
    expect(component.i18n.t.counting.instruction).toBe('Broji broj predmeta.');

    component.i18n.language = 'serbian';
    expect(component.i18n.t.counting.instruction).toBe('Broji broj predmeta.');
  });
});
