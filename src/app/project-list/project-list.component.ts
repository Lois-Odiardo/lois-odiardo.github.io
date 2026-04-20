import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from '../project/project.component';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectComponent, FormsModule],
  template: `
    <div class="project-list-container">

      @if (loading()) {
        <div class="loading-container">
          <div class="spinner"></div>
          <p>Chargement des projets...</p>
        </div>
      }

      @if (error() && !loading()) {
        <div class="error-container">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3>Erreur de chargement</h3>
          <p>{{ error() }}</p>
          <button (click)="loadProjects()" class="retry-btn">Réessayer</button>
        </div>
      }

      @if (!loading() && !error()) {
        <div class="filters-section">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
                type="text"
                placeholder="Rechercher..."
                #filter
                (input)="filterResults(filter.value)"
                class="search-input"
            />
          </div>

          <div class="filter-group">
            <div class="filter-buttons">
              <button
                  [class.active]="selectedStates().includes('En cours')"
                  (click)="toggleState('En cours')"
                  class="filter-btn state-filter ongoing">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                En cours
              </button>
              <button
                  [class.active]="selectedStates().includes('Terminé')"
                  (click)="toggleState('Terminé')"
                  class="filter-btn state-filter completed">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Terminés
              </button>
            </div>

            <div class="filter-buttons">
              <button
                  [class.active]="selectedCategories().includes('Universitaires')"
                  (click)="toggleCategory('Universitaires')"
                  class="filter-btn category-btn school">
                🎓 Universitaires
              </button>
              <button
                  [class.active]="selectedCategories().includes('Professionnels')"
                  (click)="toggleCategory('Professionnels')"
                  class="filter-btn category-btn professional">
                💼 Professionnels
              </button>
              <button
                  [class.active]="selectedCategories().includes('Personnels')"
                  (click)="toggleCategory('Personnels')"
                  class="filter-btn category-btn personal">
                🎨 Personnels
              </button>
            </div>
          </div>
        </div>

        <section class="results">
          @for (projet of filteredProjectList(); track projet.id) {
            <app-project [project]="projet" />
          }
        </section>

        @if (filteredProjectList().length === 0) {
          <div class="no-results">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <h3>Aucun projet trouvé</h3>
            <p>Essayez de modifier vos critères de recherche</p>
          </div>
        }
      }

    </div>
  `,
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);

  private projectList = signal<Project[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedStates = signal<string[]>([]);
  selectedCategories = signal<string[]>([]);
  searchText = signal('');

  // Recalculé automatiquement dès que l'un des signaux change
  filteredProjectList = computed(() => {
    let filtered = this.projectList();

    if (this.selectedStates().length > 0) {
      filtered = filtered.filter(p => this.selectedStates().includes(p.state));
    }

    if (this.selectedCategories().length > 0) {
      filtered = filtered.filter(p => this.selectedCategories().includes(p.categorie));
    }

    if (this.searchText()) {
      const text = this.searchText().toLowerCase();
      filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(text) ||
          p.technologie.toLowerCase().includes(text) ||
          p.description.toLowerCase().includes(text)
      );
    }

    return filtered;
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set(null);

    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projectList.set(projects);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error('Erreur lors du chargement des projets:', err);
        this.error.set('Impossible de charger les projets. Vérifiez votre connexion.');
        this.loading.set(false);
      }
    });
  }

  filterResults(text: string): void {
    this.searchText.set(text);
  }

  toggleState(state: string): void {
    this.selectedStates.update(states =>
        states.includes(state)
            ? states.filter(s => s !== state)
            : [...states, state]
    );
  }

  toggleCategory(category: string): void {
    this.selectedCategories.update(cats =>
        cats.includes(category)
            ? cats.filter(c => c !== category)
            : [...cats, category]
    );
  }
}