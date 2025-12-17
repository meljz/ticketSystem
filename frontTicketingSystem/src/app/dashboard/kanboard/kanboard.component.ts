import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { TicketComponent } from '../../ticket/ticket.component';

@Component({
  selector: 'app-kanboard',
  imports: [SidebarComponent, TicketComponent],
  templateUrl: './kanboard.component.html',
  styleUrl: './kanboard.component.css'
})
export class KanboardComponent implements OnInit{
  constructor(
    private router: Router,
    public authService: AuthService
  ) {}


  issues: { id: number; title: string; status: string }[] = [];
  users: any[] = [];


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

    // Receive new issue from child
    addIssue(issue: { id: number; title: string; status: string }) {
      this.issues.push(issue);
    }

    changeStatus(issue: any, newStatus: string) {
      issue.status = newStatus;
    }


}
