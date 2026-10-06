import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

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
    average_episode_duration?: number; // Duree moyenne en secondes
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

/**
 * Service anime : appelle le backend (proxy MyAnimeList) au lieu de MAL direct.
 * Plus de cle cote front, plus de corsproxy.io.
 */
@Injectable({
    providedIn: 'root'
})
export class AnimeService {
    private http = inject(HttpClient);
    private readonly api = environment.apiUrl;

    getPlanToWatch(username: string): Observable<Anime[]> {
        return this.http.get<AnimeListResponse>(`${this.api}/anime/plan-to-watch/${encodeURIComponent(username)}`).pipe(
            map(response => (response.data ?? [])
                .map(item => item.node)
                .filter(anime =>
                    anime.status === 'finished_airing' ||
                    anime.status === 'currently_airing'
                )
            ),
            catchError(() => of([] as Anime[]))
        );
    }

    getAnimeDetails(animeId: number): Observable<Anime> {
        return this.http.get<Anime>(`${this.api}/anime/${animeId}`).pipe(
            catchError(() => of({} as Anime))
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

    // Calcule la duree totale estimee de l'anime (inchange)
    getEstimatedDuration(anime: Anime): { hours: number; minutes: number; total_minutes: number } | null {
        if (!anime.num_episodes) {
            return null;
        }

        let avgDurationMinutes: number;
        if (anime.average_episode_duration) {
            avgDurationMinutes = Math.round(anime.average_episode_duration / 60);
        } else {
            avgDurationMinutes = 24;
        }

        const totalMinutes = anime.num_episodes * avgDurationMinutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes, total_minutes: totalMinutes };
    }
}