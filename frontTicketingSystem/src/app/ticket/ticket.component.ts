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
      .subscribe((res) => {
        console.log ("created ticket",res)
          this.newTicketTitle = '';
          this.showInput = false;
          this.refreshTickets();
        });
    }
  }

  /* ============================================================================== */


  


/*===================ALL MOVE LOGICS START===============================*/

  //--------shows move form--------------
  moveTicket(id: number) {
    alert ('shows move section')
    this.moveInput = true;
    this.selectedTicketId = id;
    this.showAssign = false; 
    this.showInput = false; 
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

  /* ============================================================================== */






  /*====================ALL ASSIGNING LOGICS START================================ */

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

  //  Calling the API to save the assignment
  this.ticketService.assignTicket(this.selectedAssignTicketId, this.assignedUserId)
    .subscribe({
      next: (response) => {
        console.log('Ticket assigned successfully:', response);
        
        // Reset form
        this.showAssign = false;
        this.assignedUserId = '';
        this.selectedAssignTicketId = null;
        
        //  Refresh tickets to show updated assignment
        this.refreshTickets();
      },
    });
}

  /* ============================================================================== */





/*====================ALL SHOWING ASSIGN LOGICS START================================ */

/*  Get assigned user's name by ID */
getAssignedUserName(userId: number): string {
  const user = this.users.find(u => u.id === userId);
  return user ? user.name : 'Unknown User';
}

/*  Get assigned user's email by ID (optional) */
getAssignedUserEmail(userId: number): string {
  const user = this.users.find(u => u.id === userId);
  return user ? user.email : '';
}

/* Load all users from backend (also used in the assigning login)*/
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
  alert('deleting...'); // checking delete 

  this.ticketService.deleteTicket(id).subscribe({
    next: (response) => {
      console.log("success deleting", response);
      this.refreshTickets(); 
    },
    error: (err) => {
      console.error("delete failed", err);
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
  this.ticketService.getTickets().subscribe(res => {
    console.log("Raw tickets from backend:", res);
    this.tickets = res.filter(t => t.status === this.moveStatus);
    console.log("Filtered tickets for", this.moveStatus, this.tickets);
  });
}

}