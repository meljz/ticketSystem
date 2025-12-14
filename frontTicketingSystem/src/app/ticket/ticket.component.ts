import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Add this for *ngFor
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service'; // ✅ Add this

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Add CommonModule
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  @Input() moveStatus: string = ''; // column status from Kanban parent
  users: any[] = []; // ✅ Will hold all users

  // hides initially the move and form
  showInput = false;
  moveInput = false;
  showAssign = false;

  // Tracking
  selectedTicketId: number | null = null;
  selectedAssignTicketId: number | null = null;
  

  // Form fields
  newTicketTitle = '';
  ticketStatus = '';
  assignedUserId: string = ''; // ✅ Add this to store selected user ID
  testWater = '';
  trial = true;

  // Tickets loaded from backend
  tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
    private authService: AuthService // ✅ Inject AuthService
  ) {}

  ngOnInit() {
    this.refreshTickets();
    this.loadUsers(); // ✅ Load users on init
  }

  /** ✅ Load all users from backend */
  loadUsers(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.authService.getUsers(token).subscribe({
      next: (data) => {
        console.log('Users loaded:', data);
        this.users = data;
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }
  
  /** Refresh tickets from backend and filter by column status */
  refreshTickets() {
    this.ticketService.getTickets().subscribe(res => {
      this.tickets = res.filter(t => t.status === this.moveStatus);
    });
  }

  //------shows create form--------------
  createTicket() {
    alert('create ticket');
    this.showInput = true;
    this.moveInput = false;
    this.selectedTicketId = null;
  }

  //-------Save a new ticket, then sends to backend-------
  submitNewTicket() {
    if (this.newTicketTitle) {
      alert('ticket submitting!');
      this.ticketService.addTicket(this.newTicketTitle, this.moveStatus)
      .subscribe(() => {
          this.newTicketTitle = '';
          this.showInput = false;
          this.refreshTickets();
        });
    }
  }

  createAssign(id: number){
    alert ('showing assign section');
    this.showAssign = true;
    this.selectedAssignTicketId = id;
    this.moveInput = false; // ✅ Hide move section
    this.showInput = false; // ✅ Hide create section
  }

 confirmAssign() {
  if (!this.assignedUserId) {
    alert('Please select a user to assign');
    return;
  }

  if (this.selectedAssignTicketId === null) {
    alert('No ticket selected');
    return;
  }

  // ✅ Call the API to save the assignment
  this.ticketService.assignTicket(this.selectedAssignTicketId, this.assignedUserId)
    .subscribe({
      next: (response) => {
        console.log('Ticket assigned successfully:', response);
        
        // Reset form
        this.showAssign = false;
        this.assignedUserId = '';
        this.selectedAssignTicketId = null;
        
        // ✅ Refresh tickets to show updated assignment
        this.refreshTickets();
      },
      error: (err) => {
        console.error('Error assigning ticket:', err);
        alert('Failed to assign ticket. Please try again.');
      }
    });
}

/** ✅ Get assigned user's name by ID */
getAssignedUserName(userId: number): string {
  const user = this.users.find(u => u.id === userId);
  return user ? user.name : 'Unknown User';
}

/** ✅ Get assigned user's email by ID (optional) */
getAssignedUserEmail(userId: number): string {
  const user = this.users.find(u => u.id === userId);
  return user ? user.email : '';
}
  //--------shows move form--------------
  moveTicket(id: number) {
    alert ('shows move section')
    this.moveInput = true;
    this.selectedTicketId = id;
    this.showAssign = false; // ✅ Hide assign section
    this.showInput = false; // ✅ Hide create section
  }

  //-------confirm a ticket, then saves new ticket into backend-------
  confirmMoveTicket() {
    if (this.selectedTicketId !== null && this.ticketStatus) {
      alert('moving ticket to chosen column')
      this.ticketService.updateTicketStatus(this.selectedTicketId, this.ticketStatus)
        .subscribe(() => {
          this.ticketStatus = '';
          this.selectedTicketId = null;
          this.moveInput = false; 
          this.refreshTickets();
        });
    }
  }

  //delete thisssss
  tryClick(){
    if(this.trial){
      alert('trial run');
    }
  }

  /** Filtered tickets for this column */
  get filteredTickets() {
    return this.tickets;
  }
}