import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Project} from '../project';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
          class="listing-photo"
          [src]="project.photo"
          [alt]="'Image de ' + project.name"
          crossorigin
      />
      <div class="listing-details">
        <h2 class="listing-heading">{{ project.name }}</h2>
        <p class="listing-tech">{{ project.technologie }}</p>
        <p class="listing-state">{{ project.state }}</p>
        <a class="listing-link" [routerLink]="['/details', project.id]">En savoir plus</a>
      </div>
    </section>
  `,
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  @Input() project!: Project;
}