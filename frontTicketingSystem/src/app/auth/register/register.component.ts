import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar) {}

  //this receive the json in the backend that was sent
  register() {
  this.snackBar.open ('Register success, please login', 'close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['bg-red-500']
      });
  
  this.authService.register({ name: this.name, email: this.email, password: this.password })
    .subscribe({
      next: res => {
        console.log('Registered:', res);
        // clear inputs if you want
        this.name = '';
        this.email = '';
        this.password = '';
      },
      error: err => console.error('Error:', err)
    });
}

}
