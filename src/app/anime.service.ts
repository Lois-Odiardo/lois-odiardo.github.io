import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap, firstValueFrom, from, BehaviorSubject } from 'rxjs';
import { map, catchError, filter, take } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';

export interface Anime {
    id: number;
    title: string;
    main_picture: {
        medium: string;
        large: string;
    };
    status?: string;
    genres?: Array<{ id: number; name: string }>;
    num_episodes?: number;
    average_episode_duration?: number; // Durée moyenne en secondes
    related_anime?: Array<{
        node: {
            id: number;
            title: string;
        };
        relation_type: string;
        relation_type_formatted: string;
    }>;
}

export interface AnimeListResponse {
    data: Array<{
        node: Anime;
    }>;
}

export interface RelatedAnime {
    id: number;
    title: string;
}

@Injectable({
    providedIn: 'root'
})
export class AnimeService {
    private readonly CORS_PROXY = 'https://corsproxy.io/?';
    private readonly API_BASE_URL = 'https://api.myanimelist.net/v2';
    private clientIdSubject = new BehaviorSubject<string | null>(null);

    private http = inject(HttpClient);
    private supabaseService = inject(SupabaseService);

    constructor() {
        // Charger la clé depuis Supabase au démarrage
        this.loadClientId();
    }

    private loadClientId(): void {
        this.supabaseService.getConfig('myanimelist_client_id').subscribe({
            next: (clientId) => {
                if (clientId) {
                    this.clientIdSubject.next(clientId);
                    console.log('MyAnimeList Client ID loaded from Supabase');
                } else {
                    console.error('MyAnimeList Client ID not found in Supabase');
                }
            },
            error: (err) => {
                console.error('Error loading MyAnimeList Client ID:', err);
            }
        });
    }

    private async getClientId(): Promise<string | null> {
        return firstValueFrom(
            this.clientIdSubject.pipe(
                filter(id => id !== null),
                take(1)
            )
        );
    }

    getPlanToWatch(username: string): Observable<Anime[]> {
        return from(this.getClientId()).pipe(
            switchMap(clientId => {
                if (!clientId) {
                    console.error('Client ID not loaded yet');
                    return of([]);
                }

                const malUrl = `${this.API_BASE_URL}/users/${username}/animelist?status=plan_to_watch&fields=main_picture,status,genres,num_episodes,average_episode_duration&limit=1000`;
                const url = `${this.CORS_PROXY}${encodeURIComponent(malUrl)}`;

                const headers = new HttpHeaders({
                    'X-MAL-CLIENT-ID': clientId
                });

                return this.http.get<AnimeListResponse>(url, { headers }).pipe(
                    map(response => response.data
                        .map(item => item.node)
                        .filter(anime =>
                            anime.status === 'finished_airing' ||
                            anime.status === 'currently_airing'
                        )
                    )
                );
            })
        );
    }

    getAnimeDetails(animeId: number): Observable<Anime> {
        return from(this.getClientId()).pipe(
            switchMap(clientId => {
                if (!clientId) {
                    return of({} as Anime);
                }

                const malUrl = `${this.API_BASE_URL}/anime/${animeId}?fields=id,title,main_picture,related_anime`;
                const url = `${this.CORS_PROXY}${encodeURIComponent(malUrl)}`;

                const headers = new HttpHeaders({
                    'X-MAL-CLIENT-ID': clientId
                });

                return this.http.get<Anime>(url, { headers }).pipe(
                    catchError(() => of({} as Anime))
                );
            })
        );
    }

    getRandomAnime(animeList: Anime[]): Anime | null {
        if (animeList.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * animeList.length);
        return animeList[randomIndex];
    }

    getPreviousSeason(anime: Anime): RelatedAnime | null {
        if (!anime.related_anime || anime.related_anime.length === 0) {
            return null;
        }

        const prequel = anime.related_anime.find(
            related => related.relation_type === 'prequel'
        );

        return prequel ? prequel.node : null;
    }

    getParentStory(anime: Anime): RelatedAnime | null {
        if (!anime.related_anime || anime.related_anime.length === 0) {
            return null;
        }

        const parentStory = anime.related_anime.find(
            related => related.relation_type === 'parent_story'
        );

        return parentStory ? parentStory.node : null;
    }

    // Calcule la durée totale estimée de l'anime
    getEstimatedDuration(anime: Anime): { hours: number; minutes: number; total_minutes: number } | null {
        if (!anime.num_episodes) {
            return null;
        }

        // Durée moyenne par épisode en minutes
        let avgDurationMinutes: number;

        if (anime.average_episode_duration) {
            // Si l'API fournit la durée (en secondes), on la convertit en minutes
            avgDurationMinutes = Math.round(anime.average_episode_duration / 60);
        } else {
            // Sinon, on utilise une valeur par défaut de 24 minutes (standard pour les animes)
            avgDurationMinutes = 24;
        }

        const totalMinutes = anime.num_episodes * avgDurationMinutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return {
            hours,
            minutes,
            total_minutes: totalMinutes
        };
    }
}