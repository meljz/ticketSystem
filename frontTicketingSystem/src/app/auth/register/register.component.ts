import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: res => console.log('Registered:', res),
        error: err => console.error('Error:', err)
      });
  }
}
