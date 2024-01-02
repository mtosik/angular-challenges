import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { todoGetActionGroup } from '../store/actions/todo.actions';
import { selectTodoList } from '../store/reducers/todo.reducer';
import { TodoComponent } from './todo/todo.component';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent],
  selector: 'app-root',
  template: `
    @for (todo of todosList(); track $index) {
      <div>
        <app-todo [todo]="todo"></app-todo>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  protected readonly todosList = this.store.selectSignal(selectTodoList);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(todoGetActionGroup.get());
  }
}
