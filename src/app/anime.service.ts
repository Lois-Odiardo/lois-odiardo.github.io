import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    private readonly MAL_API_URL = 'https://api.myanimelist.net/v2';
    private readonly CLIENT_ID = '4ae9ad3dac63a6b49906396700b78990';

    constructor(private http: HttpClient) {}

    getPlanToWatch(username: string): Observable<AnimeListResponse> {
        const headers = new HttpHeaders({
            'X-MAL-CLIENT-ID': this.CLIENT_ID
        });

        const url = `${this.MAL_API_URL}/users/${username}/animelist?status=plan_to_watch&fields=main_picture&limit=1000`;

        return this.http.get<AnimeListResponse>(url, { headers });
    }

    getRandomAnime(animeList: Anime[]): Anime | null {
        if (animeList.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * animeList.length);
        return animeList[randomIndex];
    }
}