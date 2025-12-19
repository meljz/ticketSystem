import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})  
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  //this receives the backend login json 
  login() {
    //snackbar
      this.snackBar.open ('Login success! Redirecting to Dashboard', 'close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['bg-red-500']
      });

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: res => 
          {
          localStorage.setItem('token', res.token); //saves token 
          localStorage.setItem('pangalan_id', res.user.id.toString()); // saves the names id rather then name. (this is not triggering yet)
          localStorage.setItem('pangalan', res.user.name);//saves name

          //alert('redirecting sa home '); 
          setTimeout(() => this.router.navigate(['/']), 500);
          },

        error: err => console.error('Login failed:', err)
      });  

  }
}

