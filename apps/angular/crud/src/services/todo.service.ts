import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoInterface } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todoList = signal([] as TodoInterface[]);

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<TodoInterface[]>(
      'https://jsonplaceholder.typicode.com/todos',
    );
    // .subscribe((todos) => {
    //   this.todoList.set(todos);
    // });
  }

  updateTodo(todo: TodoInterface) {
    return this.http.put<TodoInterface>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(todo: TodoInterface) {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }

  error() {
    this.http.get(`https://jsonplaceholder.typicode.com/error/501`).subscribe();
  }
}
