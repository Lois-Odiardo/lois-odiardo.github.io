import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private supabaseService = inject(SupabaseService);

  getAllProjects(): Observable<Project[]> {
    return this.supabaseService.getAllProjects();
  }

  getProjectById(id: number): Observable<Project | null> {
    return this.supabaseService.getProjectById(id);
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.supabaseService.getProjectsByCategory(category);
  }

  getProjectsByState(state: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
        map(projects => projects.filter(p => p.state === state))
    );
  }
}