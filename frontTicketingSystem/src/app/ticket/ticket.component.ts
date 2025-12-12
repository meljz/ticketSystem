import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  @Input() moveStatus: string = ''; // column status from Kanban parent

  // UI state
  showInput = false;
  moveInput = false;

  // Tracking
  selectedTicketId: number | null = null;

  // Form fields
  newTicketTitle = '';
  ticketStatus = '';

  // Tickets loaded from backend
  tickets: any[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.refreshTickets();
  }

  /** Refresh tickets from backend and filter by column status */
  refreshTickets() {
    this.ticketService.getTickets().subscribe(res => {
      this.tickets = res.filter(t => t.status === this.moveStatus);
    });
  }

  /** Show create ticket form */
  createTicket() {
    alert('hello');
    this.showInput = true;
    this.moveInput = false;
    this.selectedTicketId = null;
  }

  /** Save a new ticket into backend */
  submitNewTicket() {
    if (this.newTicketTitle.trim()) {
      this.ticketService.addTicket(this.newTicketTitle.trim(), this.moveStatus)
        .subscribe(() => {
          this.newTicketTitle = '';
          this.showInput = false;
          this.refreshTickets();
        });
    }
  }

  /** Trigger move form for a specific ticket */
  moveTicket(id: number) {
    this.selectedTicketId = id;
    this.moveInput = true;
    this.showInput = false;
  }

  /** Confirm move and update ticket status in backend */
  confirmMoveTicket() {
    if (this.selectedTicketId !== null && this.ticketStatus) {
      this.ticketService.updateTicketStatus(this.selectedTicketId, this.ticketStatus)
        .subscribe(() => {
          this.ticketStatus = '';
          this.selectedTicketId = null;
          this.moveInput = false;
          this.refreshTickets();
        });
    }
  }

  /** Assign ticket to a user (placeholder user_id = 1) */
  assignTicket(id: number) {
    this.ticketService.assignTicket(id, 1).subscribe(() => this.refreshTickets());
  }

  /** Filtered tickets for this column */
  get filteredTickets() {
    return this.tickets;
  }
}
