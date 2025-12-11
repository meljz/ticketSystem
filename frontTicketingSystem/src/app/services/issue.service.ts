import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private apiUrl = 'http://localhost:8000/api'; // your Lumen backend URL

  constructor(private http: HttpClient) {}

  // Fetch issues from backend
  getIssues() {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get(`${this.apiUrl}/issues`, { headers });
  }

  // Local in-memory issues (optional, for testing/demo)
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

  // Assign issue to a user
  assignIssue(issueId: number, userId: number) {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.put(`${this.apiUrl}/issues/${issueId}/assign`, { user_id: userId }, { headers });
  }
}
