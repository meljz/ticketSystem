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
];
  constructor() { }
}
