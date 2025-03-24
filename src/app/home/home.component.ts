import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="presentation-container">
      <div class="presentation-content">
        <h1>Bienvenue dans mon portfolio</h1>
        <p>
          Je suis ravi de vous partager mon travail et vous en faire apprendre un peu plus sur moi.
          Vous retrouverez mes projets les plus récents et représentatifs dans la section
          <a routerLink="/projects">Projets</a> du menu, mon histoire dans la section
          <a routerLink="/about">À propos</a> et également les moyens de me contacter dans la section
          <a routerLink="/contact">Contact</a>.
        </p>
      </div>
    </section>

  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

}