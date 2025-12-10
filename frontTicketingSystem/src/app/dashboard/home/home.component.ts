import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { 
  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, send back to login
      this.router.navigate(['/login']);
    }
  }
}
