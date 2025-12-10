import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TodosComponent } from '../../todos/todos.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, TodosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { 
  keyupHandler(){
    console.log('hello this is key keyuphandler function ');
  }
}
