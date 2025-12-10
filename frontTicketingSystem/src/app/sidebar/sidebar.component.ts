import { Component } from '@angular/core';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-sidebar',
  imports: [TodosComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
