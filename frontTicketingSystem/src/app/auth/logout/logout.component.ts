import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(){
    this.authService.logout().subscribe({
      next: (res:any) => {
        console.log(res.message);
        localStorage.removeItem('token'); // destroy saved token
        localStorage.removeItem('name'); // destroys saved token
        this.router.navigate(['/login']); // redirect
      },
      error: err => console.error('Logout failed:', err)
    });
  }
}
