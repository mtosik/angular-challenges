import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
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
    <button (click)="update(todo)" [disabled]="isLoading">Update</button>
    <button (click)="delete(todo)" [disabled]="isLoading">delete</button>
    @if (isLoading) {
      <mat-spinner></mat-spinner>
    }
  `,
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class TodoComponent implements OnInit {
  @Input({ required: true }) todo!: TodoInterface;
  isLoading = false;
  destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectTodoLoaderState)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((state) => !state),
      )
      .subscribe((state) => {
        this.isLoading = false;
      });
  }

  update(todo: TodoInterface) {
    this.isLoading = true;
    this.store.dispatch(todoUpdateActionGroup.update({ todo }));
  }

  delete(todo: TodoInterface) {
    this.isLoading = true;
    this.store.dispatch(todoDeleteActionGroup.delete({ todo }));
  }
}
