import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main>
      <header class="brand-name">
        <nav class="navbar">
          <ul>
            <li><a [routerLink]="['/']">Accueil</a></li>
            <li><a [routerLink]="['/about']">À propos de moi</a></li>
            <li><a [routerLink]="['/projects']">Projets</a></li>
            <li><a [routerLink]="['/learn']">Apprentissages</a></li>
          </ul>
        </nav>
      </header>      
      <!-- Section principale pour le contenu -->
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio';
}
