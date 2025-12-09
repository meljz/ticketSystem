import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type'; //this came from model/todo.type.ts
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  http = inject(HttpClient);

  todoItems: Array<Todo> = [{
    userId: 1,
    completed: false,
    title: 'Meljohn',
    id: 0,
  }, 
  {
    userId: 1,
    completed: false,
    title: 'Jay',
    id: 1,
  },
  {
    userId: 1,
    completed: false,
    title: 'Luna',
    id: 2,
  },
];
  constructor() { }
  getTodosFromAPI(){
    const url = 'https://jsonplaceholder.typicode.com/todos/';
    return this.http.get<Array<Todo>>(url);
  }
}
