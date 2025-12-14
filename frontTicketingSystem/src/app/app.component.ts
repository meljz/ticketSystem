import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent ],

  template: `
    <app-header></app-header>
      <main class="flex-1 ml-64 p-6 bg-gray-400">
        <router-outlet></router-outlet>
      </main>
  `,

  styleUrl: './app.component.css'
})
export class AppComponent {

}
