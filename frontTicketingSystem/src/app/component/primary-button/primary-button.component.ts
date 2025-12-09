import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css'
})
export class PrimaryButtonComponent {
  constructor(private router: Router) {}

  titleButton = 'Hello';
   onClick() {
    //alert('Button clicked!');
    alert('Navigating to Home Page');
  }
  

}
