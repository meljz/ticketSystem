import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:8000/auth'; // Lumen backend URL
 

  private apiUrl = `${environment.apiUrl}/auth`; //prod url

   users: any [] =[]; //i can use this in all components

  constructor(private http: HttpClient) {}

  getUsers(token: string): Observable<any[]> {
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
}


  loadUsers() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.getUsers(token).subscribe({
      next: (data) => {
        console.log('Backend response:', data);
        this.users = data; // ✅ stored in service
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }


  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}); // call Lumen logout
  }



}
