import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';

import { TicketComponent } from '../../ticket/ticket.component';

@Component({
  selector: 'app-kanboard',
  imports: [SidebarComponent, TicketComponent],
  templateUrl: './kanboard.component.html',
  styleUrl: './kanboard.component.css'
})
export class KanboardComponent {
    constructor(private router: Router) {}
      issues: { id: number; title: string; status: string }[] = [];

    // Receive new issue from child
    addIssue(issue: { id: number; title: string; status: string }) {
      this.issues.push(issue);
    }

    changeStatus(issue: any, newStatus: string) {
      issue.status = newStatus;
    }

}
