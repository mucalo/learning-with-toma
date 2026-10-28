import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { paginate } from './paginate';
import { WorksheetComponent } from './worksheet.component';

@Component({
  template: `
    <app-worksheet instruction="Do the thing." [items]="items">
      <ng-template let-item let-i="index">
        <div class="problem-row" [style.height.px]="rowHeight">{{ i }}:{{ item }}</div>
      </ng-template>
    </app-worksheet>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
class HostComponent {
  items = ['a', 'b', 'c'];
  rowHeight = 40;
}

describe('paginate', () => {
  it('should fill each page with rows until the next one would not fit', () => {
    expect(paginate([40, 40, 40, 40, 40], 100)).toEqual([[0, 1], [2, 3], [4]]);
  });

  it('should give a row taller than a page a page of its own', () => {
    expect(paginate([30, 150, 30], 100)).toEqual([[0], [1], [2]]);
  });

  it('should return no pages for no rows', () => {
    expect(paginate([], 100)).toEqual([]);
  });
});

describe('WorksheetComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, WorksheetComponent]
    }).compileComponents();
  });

  async function render(rowHeight: number, items = ['a', 'b', 'c']): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.rowHeight = rowHeight;
    fixture.componentInstance.items = items;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should render every row in order, using the projected template', async () => {
    const element = await render(40);
    const rows = Array.from(element.querySelectorAll('.worksheet-row'));
    expect(rows.map(row => row.textContent?.trim())).toEqual(['0:a', '1:b', '2:c']);
  });

  it('should spread rows over A4 pages, repeating the instruction on each', async () => {
    // Each row is roughly half the usable height of an A4 sheet, so two fit on a page.
    const element = await render(440, ['a', 'b', 'c', 'd', 'e']);
    const sheets = Array.from(element.querySelectorAll('.sheet'));

    expect(sheets.length).toBe(3);
    expect(sheets.map(sheet => sheet.querySelectorAll('.worksheet-row').length)).toEqual([2, 2, 1]);
    sheets.forEach(sheet => expect(sheet.querySelector('.worksheet-instruction')?.textContent).toBe('Do the thing.'));
    expect(sheets[2].querySelector('.sheet-footer')?.textContent).toContain('3/3');
  });

  it('should lay the pages out again when a row is removed', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.rowHeight = 440;
    fixture.componentInstance.items = ['a', 'b', 'c'];
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.sheet').length).toBe(2);

    // The ✕ button removes rows in place, from the same array.
    fixture.componentInstance.items.splice(0, 1);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element.querySelectorAll('.sheet').length).toBe(1);
    expect(Array.from(element.querySelectorAll('.worksheet-row')).map(row => row.textContent?.trim())).toEqual(['0:b', '1:c']);
  });

  it('should keep short worksheets on a single page', async () => {
    const element = await render(40);
    expect(element.querySelectorAll('.sheet').length).toBe(1);
    expect(element.querySelector('.sheet-footer')?.textContent).not.toContain('/');
  });
});
