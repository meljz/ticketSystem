import { Component } from '@angular/core';
import { KanboardComponent } from '../dashboard/kanboard/kanboard.component';
import { HomeComponent } from '../dashboard/home/home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
