import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WorksheetComponent } from './worksheet.component';

@Component({
  template: `
    <app-worksheet instruction="Do the thing." [items]="items">
      <ng-template let-item let-i="index">
        <div class="problem-row">{{ i }}:{{ item }}</div>
      </ng-template>
    </app-worksheet>
  `
})
class HostComponent {
  items = ['a', 'b', 'c'];
}

describe('WorksheetComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, WorksheetComponent]
    }).compileComponents();
  });

  it('should render the instruction in the table header so it repeats on every printed page', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('thead .worksheet-instruction')?.textContent).toContain('Do the thing.');
  });

  it('should render one table row per item using the projected template', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const rows = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr.worksheet-row'));

    expect(rows.map(row => row.textContent?.trim())).toEqual(['0:a', '1:b', '2:c']);
  });
});
