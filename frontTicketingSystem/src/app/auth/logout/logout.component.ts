import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  logout(){
    //snackbar
      this.snackBar.open ('logout success', 'close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['bg-red-500']
      });

    this.authService.logout().subscribe({
      next: (res:any) => {
        console.log(res.message);
        localStorage.removeItem('token'); // destroy saved token
        localStorage.removeItem('pangalan'); // destroys saved token
        localStorage.removeItem('pangalan_id');
        this.router.navigate(['/login']); // redirect
      },
      error: err => console.error('Logout failed:', err)
    });
  }
}
