import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ import CommonModule
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-users',
  standalone: true, // ✅ standalone component
  imports: [CommonModule, SidebarComponent], // ✅ include CommonModule
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
     this.authService.getUsers(token).subscribe({
  next: (data) => {
    console.log('Backend response:', data); // should log array
    this.users = data; // assign directly
  },
  error: (err) => console.error('Error fetching users:', err)
});

  }
  }
  }
