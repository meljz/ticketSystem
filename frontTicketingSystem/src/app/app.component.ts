import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from "./sidebar/sidebar.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent ],
  template: `

    <app-header></app-header>
    <main class="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
      <router-outlet></router-outlet>
    </main>
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
