import { Component, inject } from '@angular/core';
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
                [class.active]="selectedCategories.includes('Scolaire')"
                (click)="toggleCategory('Scolaire')"
                class="filter-btn category-btn school">
              🎓 Scolaire
            </button>
            <button
                [class.active]="selectedCategories.includes('Professionnelle')"
                (click)="toggleCategory('Professionnelle')"
                class="filter-btn category-btn professional">
              💼 Professionnel
            </button>
            <button
                [class.active]="selectedCategories.includes('Personnelle')"
                (click)="toggleCategory('Personnelle')"
                class="filter-btn category-btn personal">
              🎨 Personnel
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

      <div class="no-results" *ngIf="filteredProjectList.length === 0">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h3>Aucun projet trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
      </div>
    </div>
  `,
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  projectList: Project[] = [];
  projectService: ProjectService = inject(ProjectService);
  filteredProjectList: Project[] = [];
  selectedStates: string[] = [];
  selectedCategories: string[] = [];
  searchText: string = '';

  constructor() {
    this.projectList = this.projectService.getAllProjects();
    this.filteredProjectList = this.projectList;
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