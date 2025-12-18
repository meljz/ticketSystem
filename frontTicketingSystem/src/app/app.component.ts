import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ],

  template: `
    <div class="flex flex-col h-screen">

  <main class="flex-1 overflow-y-auto ml-64 p-6 bg-gray-400">
    <router-outlet></router-outlet>
  </main>
</div>

  `,

  styleUrl: './app.component.css'
})
export class AppComponent {

}
