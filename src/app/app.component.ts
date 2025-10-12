import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main>
      <header class="navbar">
        <a class="brand" [routerLink]="['/']">
          <img src="/assets/angular.svg" alt="Logo" class="logo" />
          <span class="brand-name">Loïs Odiardo</span>
        </a>
        <nav>
          <ul class="nav-links">
            <li><a [routerLink]="['/']">Accueil</a></li>
            <li><a [routerLink]="['/contact']">Contact</a></li>
            <li><a [routerLink]="['/about']">À propos</a></li>
            <li><a [routerLink]="['/projects']">Projets</a></li>
            <li><a [routerLink]="['/learn']">Apprentissages</a></li>
          </ul>
        </nav>
      </header>
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