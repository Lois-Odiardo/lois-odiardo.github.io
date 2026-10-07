import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { Project } from './project';
import { environment } from '../environments/environment';

export interface EveryoneJohnObjectif {
    id: number;
    difficulte: 1 | 2 | 3;
    objectif: string;
    is_thematique: boolean;
    theme?: string;
}

export interface ObjectifsThematiques {
    theme: string;
    difficulte1: string;
    difficulte2: string;
    difficulte3: string;
}

/**
 * Service d'acces au backend Spring Boot.
 * Memes signatures de methodes qu'avant : les composants ne changent pas.
 *
 * PERFORMANCE : la liste des projets est telechargee UNE seule fois par visite
 * puis gardee en memoire (shareReplay). Aller-retour liste -> details -> liste :
 * plus aucun appel reseau, affichage instantane.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
    private http = inject(HttpClient);
    private readonly api = environment.apiUrl;

    // Cache en memoire de la liste des projets (undefined = pas encore charge)
    private projects$?: Observable<Project[]>;

    // ===== PROJETS =====

    getAllProjects(): Observable<Project[]> {
        if (!this.projects$) {
            this.projects$ = this.http.get<Project[]>(`${this.api}/projects`).pipe(
                shareReplay(1)
            );
        }
        return this.projects$.pipe(
            catchError(err => {
                console.error('Error fetching projects:', err);
                this.projects$ = undefined; // on retentera au prochain appel
                return of([] as Project[]);
            })
        );
    }

    // Cherche d'abord dans la liste en cache ; sinon (lien direct vers /details/X
    // sur un projet absent de la liste), appel dedie au backend.
    getProjectById(id: number): Observable<Project | null> {
        return this.getAllProjects().pipe(
            switchMap(projects => {
                const found = projects.find(p => p.id === id);
                if (found) {
                    return of(found);
                }
                return this.http.get<Project>(`${this.api}/projects/${id}`).pipe(
                    catchError(err => {
                        console.error('Error fetching project:', err);
                        return of(null);
                    })
                );
            })
        );
    }

    getProjectsByCategory(categorie: string): Observable<Project[]> {
        return this.getAllProjects().pipe(
            map(projects => projects.filter(p => p.categorie === categorie))
        );
    }

    // ===== EVERYONE IS JOHN =====

    getObjectifsByDifficulte(difficulte: 1 | 2 | 3, thematique = false): Observable<EveryoneJohnObjectif[]> {
        const params = { difficulte: String(difficulte), thematique: String(thematique) };
        return this.http.get<EveryoneJohnObjectif[]>(`${this.api}/objectifs`, { params }).pipe(
            catchError(err => {
                console.error('Error fetching objectifs:', err);
                return of([] as EveryoneJohnObjectif[]);
            })
        );
    }

    getThemes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.api}/objectifs/themes`).pipe(
            catchError(err => {
                console.error('Error fetching themes:', err);
                return of([] as string[]);
            })
        );
    }

    getObjectifsByTheme(theme: string): Observable<ObjectifsThematiques | null> {
        return this.http.get<ObjectifsThematiques>(`${this.api}/objectifs/theme/${encodeURIComponent(theme)}`).pipe(
            catchError(err => {
                console.error('Error fetching thematic objectifs:', err);
                return of(null);
            })
        );
    }

    // Fonction utilitaire pour tirer un element aleatoire (inchangee)
    getRandomElement<T>(array: T[]): T | null {
        if (array.length === 0) return null;
        return array[Math.floor(Math.random() * array.length)];
    }
}