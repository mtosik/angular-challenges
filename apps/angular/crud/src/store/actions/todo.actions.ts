import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TodoInterface } from '../../models/todo.model';

export const todoGetActionGroup = createActionGroup({
  source: 'TODO/GET',
  events: {
    get: emptyProps(),
    success: props<{ todoList: TodoInterface[] }>(),
    fail: emptyProps(),
  },
});

export const todoUpdateActionGroup = createActionGroup({
  source: 'TODO/UPDATE',
  events: {
    update: props<{ todo: TodoInterface }>(),
    success: props<{ todoList: TodoInterface[] }>(),
    fail: emptyProps(),
  },
});

export const todoDeleteActionGroup = createActionGroup({
  source: 'TODO/DELETE',
  events: {
    delete: props<{ todo: TodoInterface }>(),
    success: props<{ todoList: TodoInterface[] }>(),
    fail: emptyProps(),
  },
});
