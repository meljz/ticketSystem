import { Component } from '@angular/core';
import { KanboardComponent } from '../kanboard/kanboard.component';
import { HomeComponent } from '../home/home.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    pangalan: string = '';

  ngOnInit() {
    this.pangalan = localStorage.getItem('pangalan') || '';
  }

}
