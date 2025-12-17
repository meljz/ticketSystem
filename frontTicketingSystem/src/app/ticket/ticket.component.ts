import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  @Input() moveStatus: string = ''; // column status from Kanban parent

  users: any[] = []; // holds all users in array
  
  // for forms
  showInput = false;
  moveInput = false;
  showAssign = false;
  
  // Form fields
  newTicketTitle = '';
  ticketStatus = '';
  assignedUserId: string = ''; 
  
  tickets: any[] = []; // holds all tickets

  // Tracking
  selectedTicketId: number | null = null;
  selectedAssignTicketId: number | null = null;
  
  constructor(
    private ticketService: TicketService,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.refreshTickets();
    this.loadUsers(); 
  }

  /* ================= ALL CREATING TICKET LOGIC START=============================== */
  //------shows create form--------------
  createTicket() {
    this.showInput = true;
    this.moveInput = false;
    this.selectedTicketId = null;
    this.selectedAssignTicketId = null;
  }

  //-------Save a new ticket, then sends to backend-------
  submitNewTicket() {
    if (this.newTicketTitle.trim()) {
      this.ticketService.addTicket(this.newTicketTitle, this.moveStatus)
        .subscribe({
          next: (res) => {
            console.log("Created ticket", res);
            this.newTicketTitle = '';
            this.showInput = false;
            // Refresh tickets after successful creation
            this.refreshTickets();
          },
          error: (err) => {
            console.error("Error creating ticket:", err);
            alert("Failed to create ticket");
          }
        });
    }
  }
  /* ============================================================================== */

  /*===================ALL MOVE LOGICS START===============================*/
  //--------shows move form--------------
  moveTicket(id: number) {
    this.moveInput = true;
    this.selectedTicketId = id;
    this.showAssign = false; 
    this.showInput = false;
    this.selectedAssignTicketId = null;
  }

  //-------confirm a ticket, then saves new ticket into backend-------
  confirmMoveTicket() {
    if (this.selectedTicketId !== null && this.ticketStatus) {
      this.ticketService.updateTicketStatus(this.selectedTicketId, this.ticketStatus)
        .subscribe({
          next: () => {
            console.log("Ticket moved successfully");
            this.ticketStatus = '';
            this.selectedTicketId = null;
            this.moveInput = false; 
            this.refreshTickets();
          },
          error: (err) => {
            console.error("Error moving ticket:", err);
            alert("Failed to move ticket");
          }
        });
    }
  }
  /* ============================================================================== */

  /*====================ALL ASSIGNING LOGICS START================================ */
  createAssign(id: number) {
    this.showAssign = true;
    this.selectedAssignTicketId = id;
    this.moveInput = false;
    this.showInput = false;
    this.selectedTicketId = null;
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

    this.ticketService.assignTicket(this.selectedAssignTicketId, this.assignedUserId)
      .subscribe({
        next: (response) => {
          console.log('Ticket assigned successfully:', response);
          this.showAssign = false;
          this.assignedUserId = '';
          this.selectedAssignTicketId = null;
          this.refreshTickets();
        },
        error: (err) => {
          console.error("Error assigning ticket:", err);
          alert("Failed to assign ticket");
        }
      });
  }
  /* ============================================================================== */

  /*====================ALL SHOWING ASSIGN LOGICS START================================ */
  getAssignedUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }

  getAssignedUserEmail(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.email : '';
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
        this.users = data;
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }
  /* ============================================================================== */

  /*====================ALL DELETE LOGICS START================================ */
  deleteAssign(id: number) {
    
    this.ticketService.deleteTicket(id).subscribe({
      next: (response) => {
        console.log("Success deleting", response);
        this.refreshTickets(); 
      },
      error: (err) => {
        console.error("Delete failed", err);
        alert("Delete failed");
      }
    });
  }
  /* ============================================================================== */

  /** Filtered tickets for this column */
  get filteredTickets() {
    return this.tickets;
  }

  /** Refresh tickets from backend and filter by column status */
  refreshTickets() {
    this.ticketService.getTickets().subscribe({
      next: (response: any) => {
        console.log("Raw tickets from backend:", response);
        
        // Check if response has a getTickets property (based on your backend)
        const allTickets = response.getTickets || response;
        
        // Filter tickets by status for this column
        this.tickets = allTickets.filter((t: any) => t.status === this.moveStatus);
        
        console.log(`Filtered tickets for ${this.moveStatus}:`, this.tickets);
      },
      error: (err) => {
        console.error("Error fetching tickets:", err);
      }
    });
  }
}