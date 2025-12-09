import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {

  todoService = inject(TodosService); //this can be use inject TodoService in anything.

  // since its signal() it can hold value of the moment, and todoItems is ccurrently empty.
  todoItems = signal<Array<Todo>>([]); 

  // this will update the value currenly todoItems has, since its initial is empty
  ngOnInit(): void {
    console.log(this.todoService.todoItems);
    this.todoItems.set(this.todoService.todoItems)
    
  }
}
