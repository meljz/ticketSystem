import { Component, signal } from '@angular/core';
import { KanboardComponent } from '../kanboard/kanboard.component';
import { HomeComponent } from '../home/home.component';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    constructor(private router: Router) {}

   get pangalan(): string {
    return localStorage.getItem('pangalan') || '';
  }

   logout() {
    alert('logout check msg');
    localStorage.removeItem('token'); // destroy saved token
    localStorage.removeItem('pangalan'); // destroy saved name
    this.router.navigate(['/login']); // redirect to login page
  }


/* 
  pangalan: string = '';

  ngOnInit() {
    this.pangalan = localStorage.getItem('pangalan') || '';
  }
*/

}
