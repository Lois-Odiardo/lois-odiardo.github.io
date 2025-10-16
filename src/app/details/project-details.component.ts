import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="details-container" *ngIf="project">
      <a routerLink="/" class="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Retour aux projets
      </a>

      <div class="details-header">
        <div class="header-content">
          <div class="title-section">
            <h1 class="project-name">{{ project.name }}</h1>
            <div class="project-meta">
              <span class="meta-badge" [class]="getStatusClass()">{{ project.state }}</span>
              <span class="meta-badge category">{{ project.cadre }}</span>
            </div>
          </div>

          <div class="project-image-wrapper">
            <img [src]="project.photo" [alt]="project.name" class="project-hero-image" crossorigin />
          </div>
        </div>
      </div>

      <div class="details-grid">
        <section class="info-card">
          <div class="card-header">
            <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <h2>Technologies utilisées</h2>
          </div>
          <div class="tech-tags">
            <span *ngFor="let tech of getTechArray()" class="tech-tag">{{ tech }}</span>
          </div>
        </section>

        <section class="info-card">
          <div class="card-header">
            <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h2>Rôle dans le projet</h2>
          </div>
          <p class="card-content">{{ project.role }}</p>
        </section>

        <section class="info-card full-width">
          <div class="card-header">
            <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h2>Description du projet</h2>
          </div>
          <p class="card-content description">{{ project.description }}</p>
        </section>

        <section class="info-card full-width">
          <div class="card-header">
            <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <h2>Ma contribution</h2>
          </div>
          <p class="card-content">{{ project.contribution }}</p>
        </section>

        <section class="info-card full-width">
          <div class="card-header">
            <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <h2>Points clés</h2>
          </div>
          <ul class="key-points">
            <li *ngFor="let cle of project.cles" class="key-point">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {{ cle }}
            </li>
          </ul>
        </section>

        <section class="info-card full-width" *ngIf="project.liens && project.liens.length > 0">
          <div class="card-header">
            <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <h2>Liens du projet</h2>
          </div>
          <div class="project-links">
            <a *ngFor="let lien of project.liens"
               [href]="lien"
               target="_blank"
               rel="noopener noreferrer"
               class="external-link">
              {{ formatUrl(lien) }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>

    <div class="error-container" *ngIf="!project">
      <h2>Projet non trouvé</h2>
      <p>Le projet que vous recherchez n'existe pas.</p>
      <a routerLink="/" class="back-button">Retour aux projets</a>
    </div>
  `,
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  project: Project | undefined;

  constructor() {
    const projectId = Number(this.route.snapshot.params['id']);
    this.project = this.projectService.getProjectById(projectId);
  }

  getTechArray(): string[] {
    return this.project?.technologie.split(',').map(tech => tech.trim()) || [];
  }

  getStatusClass(): string {
    return this.project?.state === 'En cours' ? 'status-ongoing' : 'status-completed';
  }

  formatUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }
}