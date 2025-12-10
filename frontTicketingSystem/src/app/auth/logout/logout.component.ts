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
        localStorage.removeItem('token'); // ❌ destroy token
        this.router.navigate(['/login']); // ✅ go back to login
      },
      error: err => console.error('Logout failed:', err)
    });
  }
}
