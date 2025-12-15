import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { KanboardComponent } from "../kanboard/kanboard.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
   
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');;;
    if (!token){
      alert('you must login first');
      this.router.navigate(['/login']);
    }

  }


}
