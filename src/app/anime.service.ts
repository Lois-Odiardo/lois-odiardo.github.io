import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
    private readonly CLIENT_ID = '4ae9ad3dac63a6b49906396700b78990';
    private readonly CORS_PROXY = 'https://corsproxy.io/?';
    private readonly API_BASE_URL = 'https://api.myanimelist.net/v2';

    constructor(private http: HttpClient) {}

    getPlanToWatch(username: string): Observable<Anime[]> {
        const malUrl = `${this.API_BASE_URL}/users/${username}/animelist?status=plan_to_watch&fields=main_picture,status,genres,num_episodes&limit=1000`;
        const url = `${this.CORS_PROXY}${encodeURIComponent(malUrl)}`;

        const headers = new HttpHeaders({
            'X-MAL-CLIENT-ID': this.CLIENT_ID
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
    }

    getAnimeDetails(animeId: number): Observable<Anime> {
        const malUrl = `${this.API_BASE_URL}/anime/${animeId}?fields=id,title,main_picture,related_anime`;
        const url = `${this.CORS_PROXY}${encodeURIComponent(malUrl)}`;

        const headers = new HttpHeaders({
            'X-MAL-CLIENT-ID': this.CLIENT_ID
        });

        return this.http.get<Anime>(url, { headers }).pipe(
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
}