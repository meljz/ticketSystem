import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://localhost:8000/api/tickets';

  constructor(private http: HttpClient) {}

  //this is all getting all tickets 
  getTickets(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get<any>(this.apiUrl, { headers })
    .pipe(map((res: any) => res.getTickets));
  }

  getTicketById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
    });
    return this.http.get<any>(`${this.apiUrl}/api/tickets/${id}`, { headers });
  }

  

  addTicket(title: string, status: string): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.post(this.apiUrl, { title, status }, { headers });
  }

  updateTicketStatus(id: number, status: string): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.put(`${this.apiUrl}/${id}`, { status }, { headers });
  }

  assignTicket(ticketId: number, userId: string): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.put(`${this.apiUrl}/${ticketId}/assign`, { 
      assigned_to: userId 
    }, { headers });
  }

  deleteTicket(id: number): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}