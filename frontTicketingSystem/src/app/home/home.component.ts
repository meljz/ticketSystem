import { Component } from '@angular/core';
import { CounterComponent } from '../component/counter/counter.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TodosComponent } from '../todos/todos.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CounterComponent, SidebarComponent, TodosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { 
  keyupHandler(){
    console.log('hello this is key keyuphandler function ');
  }
}
