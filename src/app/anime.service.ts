import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Anime {
    id: number;
    title: string;
    main_picture: {
        medium: string;
        large: string;
    };
}

export interface AnimeListResponse {
    data: Array<{
        node: Anime;
    }>;
}

@Injectable({
    providedIn: 'root'
})
export class AnimeService {
    private readonly CLIENT_ID = '4ae9ad3dac63a6b49906396700b78990'; // À remplacer par votre vrai Client ID
    private readonly CORS_PROXY = 'https://corsproxy.io/?';

    constructor(private http: HttpClient) {}

    getPlanToWatch(username: string): Observable<Anime[]> {
        const malUrl = `https://api.myanimelist.net/v2/users/${username}/animelist?status=plan_to_watch&fields=main_picture&limit=1000`;
        const url = `${this.CORS_PROXY}${encodeURIComponent(malUrl)}`;

        const headers = new HttpHeaders({
            'X-MAL-CLIENT-ID': this.CLIENT_ID
        });

        console.log('Requête API MyAnimeList via proxy');

        return this.http.get<AnimeListResponse>(url, { headers }).pipe(
            map(response => response.data.map(item => item.node))
        );
    }

    getRandomAnime(animeList: Anime[]): Anime | null {
        if (animeList.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * animeList.length);
        return animeList[randomIndex];
    }
}