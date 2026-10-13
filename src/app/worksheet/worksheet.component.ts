import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

export interface WorksheetRowContext<T> {
  $implicit: T;
  index: number;
}

/**
 * Shared layout for every exercise worksheet.
 *
 * Renders the instruction as a table header so that, when printed, browsers repeat it at the
 * top of every page, and keeps each problem row on a single page.
 *
 * Usage:
 *   <app-worksheet [instruction]="i18n.t.myActivity.instruction" [items]="generatedItems">
 *     <ng-template let-item let-i="index">
 *       <div class="problem-row">...</div>
 *     </ng-template>
 *   </app-worksheet>
 */
@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css']
})
export class WorksheetComponent<T = unknown> {
  @Input() instruction = '';
  @Input() items: T[] = [];

  @ContentChild(TemplateRef) rowTemplate?: TemplateRef<WorksheetRowContext<T>>;
}
