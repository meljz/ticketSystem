import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://localhost:8000/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  addTicket(title: string, status: string): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.post(this.apiUrl, { title, status }, { headers }); // magsend ng POST request 'to using this url na may kasamang title and status.
  }

  updateTicketStatus(id: number, status: string): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.put(`${this.apiUrl}/${id}`, { status }, { headers });
  }

  // In ticket.service.ts
assignTicket(ticketId: number, userId: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${ticketId}/assign`, { 
    assigned_to: userId 
  });
}

deleteTicket(id: number): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
