import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { TodoInterface } from '../../models/todo.model';
import {
  todoDeleteActionGroup,
  todoUpdateActionGroup,
} from '../../store/actions/todo.actions';
import { selectTodoLoaderState } from '../../store/reducers/todo.reducer';

@Component({
  selector: 'app-todo',
  template: `
    {{ todo.title }}
    <button (click)="update(todo)" [disabled]="loadingState()">Update</button>
    <button (click)="delete(todo)" [disabled]="loadingState()">delete</button>
    @if (loadingState()) {
      <mat-spinner></mat-spinner>
    }
  `,
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class TodoComponent {
  @Input({ required: true }) todo!: TodoInterface;
  loadingState = this.store.selectSignal(selectTodoLoaderState);

  constructor(private store: Store) {}

  update(todo: TodoInterface) {
    this.store.dispatch(todoUpdateActionGroup.update({ todo }));
  }

  delete(todo: TodoInterface) {
    this.store.dispatch(todoDeleteActionGroup.delete({ todo }));
  }
}
