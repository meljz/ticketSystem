import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
          localStorage.setItem('token', res.token); //saves token 
          localStorage.setItem('pangalan', res.user.name);//saves name
          alert('redirecting sa home '); 
          setTimeout(() => this.router.navigate(['/']), 500);
          },

        error: err => console.error('Login failed:', err)
      });  

  }
}

