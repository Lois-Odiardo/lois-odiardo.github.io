import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project';

// Interface pour la BDD (snake_case)
interface ProjectDB {
    id: number;
    name: string;
    cadre: string;
    state: string;
    photo: string;
    role: string;
    technologie: string;
    description: string;
    contribution: string;
    liens: string[];
    cles: string[];
    date_debut: string;
    date_fin?: string;
    categorie: 'Universitaires' | 'Professionnels' | 'Personnels';
}

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

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        const supabaseUrl = 'https://gfollhdrysljdgsammcn.supabase.co'; // Remplacez par votre vraie URL
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmb2xsaGRyeXNsamRnc2FtbWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2Mzc5NDMsImV4cCI6MjA3NzIxMzk0M30.twyTwEypUrE_S75-uiT4C-sG_rKhxXEw-DLpKvOTBrA'; // Clé publique "anon" (safe côté client)

        this.supabase = createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: false, // Désactive la persistance de session (évite les locks)
                autoRefreshToken: false,
                detectSessionInUrl: false
            }
        });
    }

    // ===== CONFIGURATION =====

    getConfig(key: string): Observable<string | null> {
        return from(
            this.supabase
                .from('app_config')
                .select('value')
                .eq('key', key)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Error fetching config:', error);
                    return null;
                }
                return data?.value || null;
            })
        );
    }

    // ===== PROJETS =====

    // Fonction utilitaire pour convertir ProjectDB → Project
    private mapDbToProject(dbProject: ProjectDB): Project {
        return {
            id: dbProject.id,
            name: dbProject.name,
            cadre: dbProject.cadre,
            state: dbProject.state,
            photo: dbProject.photo,
            role: dbProject.role,
            technologie: dbProject.technologie,
            description: dbProject.description,
            contribution: dbProject.contribution,
            liens: dbProject.liens,
            cles: dbProject.cles,
            dateDebut: dbProject.date_debut,
            dateFin: dbProject.date_fin,
            categorie: dbProject.categorie
        };
    }

    getAllProjects(): Observable<Project[]> {
        return from(
            this.supabase
                .from('projects')
                .select('*')
                .order('date_fin', { ascending: false, nullsFirst: true })
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Error fetching projects:', error);
                    return [];
                }
                return (data as ProjectDB[]).map(p => this.mapDbToProject(p));
            })
        );
    }

    getProjectById(id: number): Observable<Project | null> {
        return from(
            this.supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Error fetching project:', error);
                    return null;
                }
                return this.mapDbToProject(data as ProjectDB);
            })
        );
    }

    getProjectsByCategory(categorie: string): Observable<Project[]> {
        return from(
            this.supabase
                .from('projects')
                .select('*')
                .eq('categorie', categorie)
                .order('date_fin', { ascending: false, nullsFirst: true })
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Error fetching projects by category:', error);
                    return [];
                }
                return (data as ProjectDB[]).map(p => this.mapDbToProject(p));
            })
        );
    }

    // ===== EVERYONE IS JOHN =====

    getObjectifsByDifficulte(difficulte: 1 | 2 | 3, thematique = false): Observable<EveryoneJohnObjectif[]> {
        return from(
            this.supabase
                .from('everyone_john_objectifs')
                .select('*')
                .eq('difficulte', difficulte)
                .eq('is_thematique', thematique)
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Error fetching objectifs:', error);
                    return [];
                }
                return data as EveryoneJohnObjectif[];
            })
        );
    }

    getThemes(): Observable<string[]> {
        return from(
            this.supabase
                .from('everyone_john_objectifs')
                .select('theme')
                .eq('is_thematique', true)
                .not('theme', 'is', null)
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Error fetching themes:', error);
                    return [];
                }
                // Dédupliquer les thèmes
                const themes = data.map((item: any) => item.theme);
                return [...new Set(themes)] as string[];
            })
        );
    }

    getObjectifsByTheme(theme: string): Observable<ObjectifsThematiques | null> {
        return from(
            this.supabase
                .from('everyone_john_objectifs')
                .select('*')
                .eq('theme', theme)
                .eq('is_thematique', true)
        ).pipe(
            map(({ data, error }) => {
                if (error || !data || data.length !== 3) {
                    console.error('Error fetching thematic objectifs:', error);
                    return null;
                }

                const obj1 = data.find((o: EveryoneJohnObjectif) => o.difficulte === 1);
                const obj2 = data.find((o: EveryoneJohnObjectif) => o.difficulte === 2);
                const obj3 = data.find((o: EveryoneJohnObjectif) => o.difficulte === 3);

                if (!obj1 || !obj2 || !obj3) return null;

                return {
                    theme,
                    difficulte1: obj1.objectif,
                    difficulte2: obj2.objectif,
                    difficulte3: obj3.objectif
                };
            })
        );
    }

    // Fonction utilitaire pour tirer un élément aléatoire
    getRandomElement<T>(array: T[]): T | null {
        if (array.length === 0) return null;
        return array[Math.floor(Math.random() * array.length)];
    }
}