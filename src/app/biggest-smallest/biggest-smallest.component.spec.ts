import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
    expect(component.validationError).toBe('Maximum items per problem must be at least 3.');
    expect(component.generatedItems.length).toBe(0);
  });

  it('should clear validation error on successful generation', () => {
    component.maxItems = 5;
    component.generateProblems();
    expect(component.validationError).toBe('');
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

  it('should generate instruction text with fixed colours', () => {
    component.language = 'english';
    const text = component.instructionText;
    expect(text).toContain('green');
    expect(text).toContain('blue');
  });

  it('should support multiple languages with fixed colours', () => {
    component.language = 'english';
    const englishText = component.instructionText;
    expect(englishText).toContain('Circle');
    expect(englishText).toContain('green');
    expect(englishText).toContain('blue');

    component.language = 'croatian';
    const croatianText = component.instructionText;
    expect(croatianText).toContain('Označi');

    component.language = 'serbian';
    const serbianText = component.instructionText;
    expect(serbianText).toContain('Označi');
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
