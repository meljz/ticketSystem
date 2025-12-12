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

  // hides initially the move and form
  showInput = false;
  moveInput = false;
  showAssign = false;

  // Tracking
  selectedTicketId: number | null = null;
  //assigneeTicketId: number | null = null;
  

  // Form fields
  newTicketTitle = '';
  ticketStatus = '';
  testWater = '';
  trial = true;

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

  //------shows create form--------------
  createTicket() {
    alert('hello');
    this.showInput = true;
    this.moveInput = false;
    this.selectedTicketId = null;
  }

  

  //-------Save a new ticket, then sends to backedn-------
  submitNewTicket() {
    if (this.newTicketTitle) {
      alert('ticket submitting!');
      this.ticketService.addTicket(this.newTicketTitle, this.moveStatus)
      .subscribe(() => {
         alert ('subscribe is being fired')
          this.newTicketTitle = '';
          this.showInput = false;
          this.refreshTickets();
        });
    }
  }


  createAssign(){
    alert ('showing assign section');
    this.showAssign = true;
  }

 confirmAssign(){
  alert("confirming ticket");
  this.showAssign = false; //will hide again the assign after submitng
 }

 //--------shows move form--------------
  moveTicket(id: number) {
    alert ('shows move section')
    this.selectedTicketId = id;
    this.moveInput = true;
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
