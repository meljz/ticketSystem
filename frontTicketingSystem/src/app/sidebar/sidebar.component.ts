import { Component } from '@angular/core';
import { TodosComponent } from '../todos/todos.component';
import { KanboardComponent } from '../dashboard/kanboard/kanboard.component';
import { HomeComponent } from '../dashboard/home/home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TodosComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
