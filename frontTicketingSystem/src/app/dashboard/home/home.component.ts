import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { KanboardComponent } from "../kanboard/kanboard.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  pangalan: string = '';
  pangalan_id: number | null = null;
  users: any[] = [];
  tickets: any[] = [];

   
  constructor(
    private router: Router,
    public authService: AuthService,
    public ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadUsers ();
    this.getTickets();
    this.pangalan = localStorage.getItem ('pangalan') || ''; //this is for the name
    this.pangalan_id = Number(localStorage.getItem('pangalan_id')); 

    const token = localStorage.getItem('token');
    if (!token){
      alert('you must login first');
      this.router.navigate(['/login']);
    }
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
        this.tickets = data; // ✅ Assign to component's users array
      }
    });
  }
  //-----------------------------------------------
  getTickets(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    //this should be firing 
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        console.log('Users loaded:', data);
        this.tickets = data; // will assign here
      },
      error: (err) => console.error('Error fetching users:', err)
    });

  }
  }

