import { Pipe, PipeTransform } from '@angular/core';

export interface TextPart {
  text: string;
  bold: boolean;
}

/**
 * Splits translated text into plain and bold parts, where bold parts are wrapped in `**…**`.
 * Lets translations highlight key phrases without using innerHTML:
 *
 *   <ng-container *ngFor="let part of text | emphasis">
 *     <strong *ngIf="part.bold">{{ part.text }}</strong>
 *     <ng-container *ngIf="!part.bold">{{ part.text }}</ng-container>
 *   </ng-container>
 */
@Pipe({
  name: 'emphasis',
  standalone: false
})
export class EmphasisPipe implements PipeTransform {
  transform(text: string): TextPart[] {
    return text
      .split('**')
      .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
      .filter(part => part.text.length > 0);
  }
}
