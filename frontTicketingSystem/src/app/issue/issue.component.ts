import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../services/issue.service'; // adjust path if needed
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css'
})
export class IssueComponent {
  @Input() moveStatus: string = ''; // column status from Kanban parent

  // UI state
  showInput = false;
  moveInput = false;

  // Tracking
  selectedIssueId: number | null = null;

  // Form fields
  newIssueTitle = '';
  issueStatus = '';

  constructor(
    private issueService: IssueService,
    private authService: AuthService) {}

  /** Show create issue form */
  createIssue() {
    this.showInput = true;
    this.moveInput = false;
    this.selectedIssueId = null;
  }

  /** Save a new issue into the shared service */
  submitNewIssue() {
    if (this.newIssueTitle.trim()) {
      this.issueService.addIssue(this.newIssueTitle.trim(), this.moveStatus);
      this.newIssueTitle = '';
      this.showInput = false;
    }
  }

  /** Trigger move form for a specific issue */
  moveIssue(id: number) {
    this.selectedIssueId = id;
    this.moveInput = true;
    this.showInput = false;
  }

  /** Confirm move and update issue status in the service */
  confirmMoveIssue() {
    if (this.selectedIssueId !== null && this.issueStatus) {
      this.issueService.updateIssueStatus(this.selectedIssueId, this.issueStatus);
      this.issueStatus = '';
      this.selectedIssueId = null;
      this.moveInput = false;
    }
  }

  /** Filter issues for this column */
  get filteredIssues() {
    return this.issueService.getIssuesByStatus(this.moveStatus);
  }

  /** Assign issue placeholder */
  assignIssue(id: number) {
    alert(`Assigning issue ${id}`);
  }

  ngOnInit() {
    this.issueService.getIssues().subscribe(res => {
      console.log('Issues from backend:', res);
    });
;
}

}
