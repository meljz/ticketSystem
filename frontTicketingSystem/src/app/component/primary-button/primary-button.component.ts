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
    alert('checkmsg deleting 1');
    localStorage.removeItem('token'); // destroy saved token
    localStorage.removeItem('pangalan'); // destroy saved name
    alert('checkmsg deleting 2');
    this.router.navigate(['/login']); // redirect to login page
  }

  

}
