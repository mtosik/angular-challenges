import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import {
  todoDeleteActionGroup,
  todoGetActionGroup,
  todoUpdateActionGroup,
} from '../actions/todo.actions';
import { selectTodoList } from '../reducers/todo.reducer';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store,
  ) {}

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoGetActionGroup.get),
      exhaustMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => todoGetActionGroup.success({ todoList: todos })),
          catchError(() => of(todoGetActionGroup.fail())),
        ),
      ),
    ),
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoUpdateActionGroup.update),
      withLatestFrom(this.store.select(selectTodoList)),
      exhaustMap(([action, todoList]) =>
        this.todoService.updateTodo(action.todo).pipe(
          map((todoUpdated) => {
            const indexOfUpdatedTodo = todoList.findIndex(
              (todo) => todo.id === todoUpdated.id,
            );
            const updatedList = [
              ...todoList.slice(0, indexOfUpdatedTodo),
              todoUpdated,
              ...todoList.slice(indexOfUpdatedTodo + 1),
            ];
            return todoUpdateActionGroup.success({ todoList: updatedList });
          }),
          catchError(() => of(todoUpdateActionGroup.fail())),
        ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoDeleteActionGroup.delete),
      withLatestFrom(this.store.select(selectTodoList)),
      exhaustMap(([action, todoList]) =>
        this.todoService.deleteTodo(action.todo).pipe(
          map(() => {
            const indexOfDeletedTodo = todoList.findIndex(
              (currentTodo) => currentTodo.id === action.todo.id,
            );

            const todoListAfterDelete = [
              ...todoList.slice(0, indexOfDeletedTodo),
              ...todoList.slice(indexOfDeletedTodo + 1),
            ];
            return todoDeleteActionGroup.success({
              todoList: todoListAfterDelete,
            });
          }),
          catchError(() => of(todoDeleteActionGroup.fail())),
        ),
      ),
    ),
  );
}
