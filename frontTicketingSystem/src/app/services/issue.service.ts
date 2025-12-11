import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IssueService {
  issues: { id: number; title: string; status: string }[] = [];

  addIssue(title: string, status: string) {
    const newId = this.issues.length + 1;
    this.issues.push({ id: newId, title, status });
  }

  updateIssueStatus(id: number, newStatus: string) {
    const issue = this.issues.find(i => i.id === id);
    if (issue) {
      issue.status = newStatus;
    }
  }

  getIssuesByStatus(status: string) {
    return this.issues.filter(i => i.status === status);
  }
}
