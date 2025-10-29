import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from '../project/project.component';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectComponent, FormsModule],
  template: `
    <div class="project-list-container">
      <!-- Spinner de chargement -->
      <div *ngIf="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Chargement des projets...</p>
      </div>

      <!-- Message d'erreur -->
      <div *ngIf="error && !loading" class="error-container">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>Erreur de chargement</h3>
        <p>{{ error }}</p>
        <button (click)="loadProjects()" class="retry-btn">Réessayer</button>
      </div>

      <!-- Contenu principal -->
      <div *ngIf="!loading && !error">
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
                  [class.active]="selectedStates.includes('En cours')"
                  (click)="toggleState('En cours')"
                  class="filter-btn state-filter ongoing">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                En cours
              </button>
              <button
                  [class.active]="selectedStates.includes('Terminé')"
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
                  [class.active]="selectedCategories.includes('Universitaires')"
                  (click)="toggleCategory('Universitaires')"
                  class="filter-btn category-btn school">
                🎓 Universitaires
              </button>
              <button
                  [class.active]="selectedCategories.includes('Professionnels')"
                  (click)="toggleCategory('Professionnels')"
                  class="filter-btn category-btn professional">
                💼 Professionnels
              </button>
              <button
                  [class.active]="selectedCategories.includes('Personnels')"
                  (click)="toggleCategory('Personnels')"
                  class="filter-btn category-btn personal">
                🎨 Personnels
              </button>
            </div>
          </div>
        </div>

        <section class="results">
          <app-project
              *ngFor="let projet of filteredProjectList"
              [project]="projet"
          ></app-project>
        </section>

        <div class="no-results" *ngIf="filteredProjectList.length === 0 && !loading">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>Aucun projet trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projectList: Project[] = [];
  projectService: ProjectService = inject(ProjectService);
  filteredProjectList: Project[] = [];
  selectedStates: string[] = [];
  selectedCategories: string[] = [];
  searchText: string = '';
  loading: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;

    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projectList = projects;
        this.filteredProjectList = projects;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets:', err);
        this.error = 'Impossible de charger les projets. Vérifiez votre connexion.';
        this.loading = false;
      }
    });
  }

  filterResults(text: string) {
    this.searchText = text;
    this.applyFilters();
  }

  toggleState(state: string) {
    const index = this.selectedStates.indexOf(state);
    if (index > -1) {
      this.selectedStates.splice(index, 1);
    } else {
      this.selectedStates.push(state);
    }
    this.applyFilters();
  }

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.projectList;

    // Filtre par état (si au moins un état sélectionné)
    if (this.selectedStates.length > 0) {
      filtered = filtered.filter(p => this.selectedStates.includes(p.state));
    }

    // Filtre par catégorie (si au moins une catégorie sélectionnée)
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(p => this.selectedCategories.includes(p.categorie));
    }

    // Filtre par texte de recherche
    if (this.searchText) {
      filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          p.technologie.toLowerCase().includes(this.searchText.toLowerCase()) ||
          p.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.filteredProjectList = filtered;
  }
}