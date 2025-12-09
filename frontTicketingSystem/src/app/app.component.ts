import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { TodosService } from './services/todos.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, /*HomeComponent*/],
  template: `

  
  <app-header></app-header>


    <router-outlet></router-outlet>
    <!--<app-home></app-home>-->


 
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  //title = 'practiceAngular';
  //content = 'Welcome to Angular with TypeScript!';

  greet(){
    console.log ('Hello there👋!');
  }
}
