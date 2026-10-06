import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiService = inject(ApiService);

  getAllProjects(): Observable<Project[]> {
    return this.apiService.getAllProjects();
  }

  getProjectById(id: number): Observable<Project | null> {
    return this.apiService.getProjectById(id);
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.apiService.getProjectsByCategory(category);
  }

  getProjectsByState(state: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
        map(projects => projects.filter(p => p.state === state))
    );
  }
}