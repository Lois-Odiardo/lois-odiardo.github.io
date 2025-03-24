import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from '../project/project.component';
import {Project} from '../project';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, ProjectComponent],
  template: `
    <section class="results">
      <app-project
          *ngFor="let projets of filteredProjectList"
          [project]="projets"
      ></app-project>
    </section>
  `,
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  projectList: Project[] = [];
  projectService: ProjectService = inject(ProjectService);
  filteredProjectList: Project[] = [];
  constructor() {
    this.projectList = this.projectService.getAllProjects();
    this.filteredProjectList = this.projectList;
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredProjectList = this.projectList;
      return;
    }
    this.filteredProjectList = this.projectList.filter((project) =>
        project?.name.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
