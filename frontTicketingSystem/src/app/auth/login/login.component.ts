import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router) {}

  //this receives the backend login json 
  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: res => 
          {
          
          localStorage.setItem('token', res.token); //saves token (sessionbased) from backend controller
          alert('login success'); 
          this.router.navigate(['/']);
          },

        error: err => console.error('Login failed:', err)
      });


  }
}

