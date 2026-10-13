import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BiggestSmallestComponent } from './biggest-smallest.component';

describe('BiggestSmallestComponent', () => {
  let component: BiggestSmallestComponent;
  let fixture: ComponentFixture<BiggestSmallestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [BiggestSmallestComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(LanguageService).language = 'english';
    fixture = TestBed.createComponent(BiggestSmallestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate minimum items requirement', () => {
    component.maxItems = 2;
    component.generateProblems();
    expect(component.showMinItemsError).toBeTrue();
    expect(component.generatedItems.length).toBe(0);
  });

  it('should clear validation error on successful generation', () => {
    component.maxItems = 5;
    component.generateProblems();
    expect(component.showMinItemsError).toBeFalse();
    expect(component.generatedItems.length).toBeGreaterThan(0);
  });

  it('should generate problems with correct count', () => {
    component.problemCount = 5;
    component.maxItems = 10;
    component.generateProblems();
    expect(component.generatedItems.length).toBe(5);
  });

  it('should ensure at least 3 items per problem', () => {
    component.maxItems = 10;
    component.problemCount = 5;
    component.generateProblems();
    
    component.generatedItems.forEach(item => {
      expect(item.count).toBeGreaterThanOrEqual(3);
    });
  });

  it('should mark largest and smallest items correctly', () => {
    component.maxItems = 8;
    component.problemCount = 1;
    component.generateProblems();
    
    const item = component.generatedItems[0];
    const largestCount = item.positioned.filter(p => p.isLargest).length;
    const smallestCount = item.positioned.filter(p => p.isSmallest).length;
    expect(largestCount).toBe(1);
    expect(smallestCount).toBe(1);
  });

  it('should always keep exactly one largest and one smallest item, even in crowded rows', () => {
    component.maxItems = 20;
    component.problemCount = 100;
    component.generateProblems();

    component.generatedItems.forEach(item => {
      const sizes = item.positioned.map(p => p.size);
      const largest = item.positioned.filter(p => p.isLargest);
      const smallest = item.positioned.filter(p => p.isSmallest);

      expect(largest.length).toBe(1);
      expect(smallest.length).toBe(1);
      expect(largest[0].size).toBe(Math.max(...sizes));
      expect(smallest[0].size).toBe(Math.min(...sizes));
      expect(item.count).toBe(item.positioned.length);
      expect(item.count).toBeGreaterThanOrEqual(3);
    });
  });

  it('should generate instruction text with fixed colours', () => {
    component.i18n.language = 'english';
    const text = component.i18n.t.biggestSmallest.instruction;
    expect(text).toContain('green');
    expect(text).toContain('blue');
  });

  it('should support multiple languages with fixed colours', () => {
    component.i18n.language = 'english';
    const englishText = component.i18n.t.biggestSmallest.instruction;
    expect(englishText).toContain('Circle');
    expect(englishText).toContain('green');
    expect(englishText).toContain('blue');

    component.i18n.language = 'croatian';
    const croatianText = component.i18n.t.biggestSmallest.instruction;
    expect(croatianText).toContain('Označi');
    expect(croatianText).toContain('zelenom');
    expect(croatianText).toContain('plavom');

    component.i18n.language = 'serbian';
    const serbianText = component.i18n.t.biggestSmallest.instruction;
    expect(serbianText).toContain('Označi');
    expect(serbianText).toContain('zelenom');
    expect(serbianText).toContain('plavom');
  });

  it('should ensure no overlapping items', () => {
    component.maxItems = 10;
    component.problemCount = 1;
    component.generateProblems();
    
    const item = component.generatedItems[0];
    const positions = item.positioned;
    
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        const w1 = p1.size * 16 * 1.1;
        const h1 = p1.size * 16 * 1.1;
        const w2 = p2.size * 16 * 1.1;
        const h2 = p2.size * 16 * 1.1;
        
        const overlap = !(p1.x + w1 < p2.x || p1.x > p2.x + w2 ||
                         p1.y + h1 < p2.y || p1.y > p2.y + h2);
        expect(overlap).toBeFalsy();
      }
    }
  });
});
