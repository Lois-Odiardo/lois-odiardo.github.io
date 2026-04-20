import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [],
  template: `
    <div class="details-container">

      @if (error() && !loading()) {
        <div class="error-container">
          <h2>Erreur</h2>
          <p>{{ error() }}</p>
          <a class="back-button" (click)="goBack()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Retour aux projets
          </a>
        </div>
      }

      @if (project() && !loading()) {
        <a class="back-button" (click)="goBack()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Retour
        </a>

        <div class="details-header">
          <div class="header-content">
            <div class="title-section">
              <h1 class="project-name">{{ project()!.name }}</h1>
              <div class="project-meta">
                <span class="meta-badge"
                      [class.status-ongoing]="project()!.state === 'En cours'"
                      [class.status-completed]="project()!.state === 'Terminé'">
                  {{ project()!.state }}
                </span>
                <span class="meta-badge category">
                  {{ getCategoryIcon() }} {{ project()!.categorie }}
                </span>
              </div>
            </div>
            <div class="project-image-wrapper">
              <img [src]="project()!.photo" [alt]="project()!.name" class="project-hero-image" />
            </div>
          </div>
        </div>

        <div class="details-grid">

          <div class="info-card full-width">
            <div class="card-header">
              <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <h2>Technologies</h2>
            </div>
            <div class="tech-tags">
              @for (tech of technologies(); track tech) {
                <span class="tech-tag">{{ tech }}</span>
              }
            </div>
          </div>

          <div class="info-card full-width">
            <div class="card-header">
              <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <h2>Informations</h2>
            </div>
            <div class="card-content">
              <p><strong>Rôle :</strong> {{ project()!.role }}</p>
              <p><strong>Cadre :</strong> {{ project()!.cadre }}</p>
              <p><strong>Période :</strong>
                {{ formatDate(project()!.dateDebut) }} -
                {{ project()!.dateFin ? formatDate(project()!.dateFin) : 'En cours' }}
              </p>
            </div>
          </div>

          <div class="info-card full-width">
            <div class="card-header">
              <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <h2>Description</h2>
            </div>
            <p class="card-content description">{{ project()!.description }}</p>
          </div>

          <div class="info-card full-width">
            <div class="card-header">
              <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <h2>Ma contribution</h2>
            </div>
            <p class="card-content description">{{ project()!.contribution }}</p>
          </div>

          @if ((project()!.cles?.length ?? 0) > 0) {
            <div class="info-card full-width">
              <div class="card-header">
                <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <h2>Points clés</h2>
              </div>
              <ul class="key-points">
                @for (cle of project()!.cles; track cle) {
                  <li class="key-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    {{ cle }}
                  </li>
                }
              </ul>
            </div>
          }

          @if ((project()!.liens?.length ?? 0) > 0) {
            <div class="info-card full-width">
              <div class="card-header">
                <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <h2>Liens</h2>
              </div>
              <div class="project-links">
                @for (lien of project()!.liens; track lien) {
                  <a [href]="lien" target="_blank" rel="noopener noreferrer" class="external-link">
                    {{ getLinkText(lien) }}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                }
              </div>
            </div>
          }

        </div>
      }
    </div>
  `,
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  project = signal<Project | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  technologies = computed<string[]>(() => {
    const technologie = this.project()?.technologie;
    return technologie ? technologie.split(',').map(t => t.trim()) : [];
  });

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.params['id']);

    if (isNaN(projectId)) {
      this.error.set('ID de projet invalide');
      this.loading.set(false);
      return;
    }

    this.loadProject(projectId);
  }

  private loadProject(projectId: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        if (project) {
          this.project.set(project);
        } else {
          this.error.set('Projet non trouvé');
        }
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error('Erreur lors du chargement du projet:', err);
        this.error.set('Impossible de charger le projet. Vérifiez votre connexion.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  getCategoryIcon(): string {
    const iconMap: Record<string, string> = {
      'Universitaires': '🎓',
      'Professionnels': '💼',
      'Personnels': '🎨'
    };
    return iconMap[this.project()?.categorie ?? ''] ?? '';
  }

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    try {
      const [year, month] = dateStr.split('-');
      const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ];
      const monthIndex = parseInt(month) - 1;
      return (monthIndex >= 0 && monthIndex < 12) ? `${months[monthIndex]} ${year}` : dateStr;
    } catch {
      return dateStr;
    }
  }

  getLinkText(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  }
}