import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { TodoInterface } from '../../models/todo.model';
import {
  todoDeleteActionGroup,
  todoGetActionGroup,
  todoUpdateActionGroup,
} from '../actions/todo.actions';

export interface TodoState {
  todoList: TodoInterface[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: TodoState = {
  todoList: [],
  loading: false,
  loaded: false,
};

export const todoReducer = createReducer(
  initialState,
  on(
    todoGetActionGroup.get,
    todoUpdateActionGroup.update,
    todoDeleteActionGroup.delete,
    (state) => ({
      ...state,
      loading: true,
      loaded: false,
    }),
  ),
  on(
    todoGetActionGroup.success,
    todoUpdateActionGroup.success,
    todoDeleteActionGroup.success,
    (state, action) => {
      return {
        ...state,
        loading: false,
        loaded: true,
        todoList: action.todoList,
      };
    },
  ),
  on(
    todoGetActionGroup.fail,
    todoUpdateActionGroup.fail,
    todoDeleteActionGroup.fail,
    (state) => ({
      ...state,
      loading: false,
      loaded: true,
      todoList: [],
    }),
  ),
);

export const selectTodo = createFeatureSelector<TodoState>('todo');

export const selectTodoList = createSelector(
  selectTodo,
  (state: TodoState) => state.todoList,
);

export const selectTodoLoaderState = createSelector(
  selectTodo,
  (state: TodoState) => state.loading,
);
