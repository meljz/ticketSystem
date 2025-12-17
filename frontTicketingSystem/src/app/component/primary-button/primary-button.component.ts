import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css'
})
export class PrimaryButtonComponent {

  constructor(
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get isAuthPage(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/register');
  }

  get pangalan(): string {
    return localStorage.getItem('pangalan') || '';
  }

  testing(){
    console.log('test');
  }
   
  logout() {
    alert('logout check msg');
    localStorage.removeItem('token'); // destroy saved token
    localStorage.removeItem('pangalan'); // destroy saved name
    this.router.navigate(['/login']); // redirect to login page
  }

  

  
  

}
