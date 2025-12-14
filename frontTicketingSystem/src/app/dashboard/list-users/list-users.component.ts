import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];

  constructor(public authService: AuthService) {} // ✅ Make it public so template can access it

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.authService.getUsers(token).subscribe({
      next: (data) => {
        console.log('Users loaded:', data);
        this.users = data; // ✅ Assign to component's users array
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }
}