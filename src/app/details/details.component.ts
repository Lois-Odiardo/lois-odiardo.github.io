import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../project.service';
import {Project} from '../project';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <h1>{{ project?.name }}</h1>
      <div class="carte">
        <div class="cadre"><strong>Cadre du projet : {{ project?.cadre }}</strong></div>
        <div class="role"><strong>Rôle : {{ project?.role }}</strong></div>
        <div class="technologies"><strong>Technologies : {{ project?.technologie }}</strong></div>
        <div class="statut"><strong>Statut : {{ project?.state }}</strong></div>
      </div>

      <h2>Description du projet</h2>
      <div>{{ project?.description }}</div>
      <h3>Eléments clés du projet</h3>
      <div class="cles-container">
        <div class="cle-item" *ngFor="let cle of project?.cles">
          {{ cle }}
        </div>
      </div>


      <h2>Contribution personnelle</h2>
      <div>{{ project?.contribution }}</div>
      <h2>Liens du projet</h2>
      <div class="liens-container">
        <div *ngFor="let lien of project?.liens; let index = index" [attr.key]="index" class="lien-card">
          <a [href]="lien" target="_blank">
            {{ getLienLabel(lien) }}
          </a>
        </div>
      </div>



    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  project: Project | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const projectId = parseInt(this.route.snapshot.params['id'], 10);
    this.project = this.projectService.getProjectById(projectId);
  }
  submitApplication() {
    this.projectService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
    );
  }
  getLienLabel(lien: string): string {
    if (lien.includes('github')) {
      return 'GitHub';
    } else if (lien.includes('gitlab')) {
      return 'GitLab';
    } else {
      return 'Site';
    }
  }

}