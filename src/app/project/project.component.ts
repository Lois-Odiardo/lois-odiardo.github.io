import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../project';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="project-card">
      <div class="project-image-container">
        <img
            class="project-image"
            [src]="project.photo"
            [alt]="'Image de ' + project.name"
            crossorigin
        />
        <span class="project-status" [class]="getStatusClass()">
          {{ project.state }}
        </span>
      </div>

      <div class="project-content">
        <div class="project-header">
          <h2 class="project-title">{{ project.name }}</h2>
          <span class="project-category" [class]="getCategoryClass()">{{ project.categorie }}</span>
        </div>

        <div class="project-tech">
          <svg class="tech-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          <span>{{ project.technologie }}</span>
        </div>

        <div class="project-tech">
          <svg class="tech-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{{ formatDate() }}</span>
        </div>

        <p class="project-description">{{ getShortDescription() }}</p>

        <div class="project-footer">
          <span class="project-role">{{ project.role }}</span>
          <a class="project-link" [routerLink]="['/details', project.id]">
            Voir le projet
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `,
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  @Input() project!: Project;

  getStatusClass(): string {
    return this.project.state === 'En cours' ? 'status-ongoing' : 'status-completed';
  }

  getCategoryClass(): string {
    if (this.project.categorie === 'Universitaires') return 'category-school';
    if (this.project.categorie === 'Professionnels') return 'category-professional';
    return 'category-personal';
  }

  getShortDescription(): string {
    const maxLength = 120;
    if (this.project.description.length <= maxLength) {
      return this.project.description;
    }
    return this.project.description.substring(0, maxLength) + '...';
  }

  formatDate(): string {
    const formatMonth = (dateStr: string | undefined): string => {
      // Gestion du cas undefined ou null
      if (!dateStr) {
        return 'En cours';
      }

      try {
        const parts = dateStr.split('-');
        if (parts.length !== 2) {
          return dateStr; // Retourne la chaîne originale si format invalide
        }

        const [year, month] = parts;
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        const monthIndex = parseInt(month) - 1;

        if (monthIndex >= 0 && monthIndex < 12) {
          return `${months[monthIndex]} ${year}`;
        }
        return dateStr;
      } catch (error) {
        console.error('Erreur formatage date:', error);
        return dateStr || '';
      }
    };

    const debut = formatMonth(this.project.dateDebut);
    const fin = formatMonth(this.project.dateFin);

    return `${debut} - ${fin}`;
  }
}