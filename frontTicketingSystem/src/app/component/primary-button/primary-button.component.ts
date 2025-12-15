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
   pangalan: string = '';


  constructor(
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get isAuthPage(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/register');
  }

   
  logout() {
    alert('logout check msg');
    localStorage.removeItem('token'); // destroy saved token
    localStorage.removeItem('pangalan'); // destroy saved name
    this.router.navigate(['/login']); // redirect to login page
  }

  
  ngOnInit() {
    this.pangalan = localStorage.getItem('pangalan') || '';
  }
  
  

}
