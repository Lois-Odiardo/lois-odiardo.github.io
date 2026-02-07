import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <main>
      <header class="navbar" *ngIf="!isFullscreenRoute">
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
      <section class="content" [class.fullscreen]="isFullscreenRoute">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portfolio';
  isFullscreenRoute = false;

  private router = inject(Router);

  // Routes qui prennent toute la page (sans navbar)
  private fullscreenRoutes = ['/cobblemon'];

  constructor() {
    this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.isFullscreenRoute = this.fullscreenRoutes.some(r => e.urlAfterRedirects.startsWith(r));
    });
  }
}