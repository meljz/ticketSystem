import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [RouterLink, ],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css'
})
export class PrimaryButtonComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // destroy saved token
    localStorage.removeItem('name'); // destroy saved name
    alert('Logged out successADADASfully');
    this.router.navigate(['/login']); // redirect to login page
  }

  login(){
    

  }

  

}
