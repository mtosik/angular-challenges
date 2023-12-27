import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[listItem]',
  standalone: true,
})
export class ListItemDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
  selector: 'app-card',
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  template: `
    <ng-content select="[card-image]"></ng-content>
    <section>
      @for (item of list; track $index) {
        <ng-template
          [ngTemplateOutlet]="listItemTemplate.templateRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>
    <ng-content select="[card-footer]"></ng-content>
    <ng-content></ng-content>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() addNewItemEmitter = new EventEmitter<void>();

  constructor() {}

  @ContentChild(ListItemDirective)
  listItemTemplate!: ListItemDirective;
}
