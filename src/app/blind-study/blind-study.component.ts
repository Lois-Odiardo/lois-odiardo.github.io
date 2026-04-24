import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';

type AppState = 'setup' | 'loading' | 'playing' | 'error' | 'finished';

interface AnimeThemeSong {
    animeName: string;
    type: string;
    songTitle: string;
    artist: string;
    audioUrl: string;
}

interface ATVideo {
    audio?: { link: string };
}

interface ATEntry {
    videos?: ATVideo[];
}

interface ATTheme {
    slug?: string;
    song?: {
        title?: string;
        artists?: { name: string }[];
    };
    animethemeentries?: ATEntry[];
}

interface ATAnime {
    name: string;
    animethemes?: ATTheme[];
}

interface ATResponse {
    anime?: ATAnime[];
}

@Component({
    selector: 'app-blind-study',
    standalone: true,
    imports: [],
    templateUrl: './blind-study.component.html',
    styleUrls: ['./blind-study.component.css']
})
export class BlindStudyComponent implements OnDestroy {
    private supabaseService = inject(SupabaseService);
    private router = inject(Router);

    private readonly MAL_BASE = 'https://api.myanimelist.net/v2';
    private readonly CORS_PROXY = 'https://corsproxy.io/?';
    private readonly AT_BASE = 'https://api.animethemes.moe';
    private readonly USERNAME = 'Lothi13';

    appState = signal<AppState>('setup');
    includeOpenings = signal(true);
    includeEndings = signal(true);
    includeInserts = signal(false);
    loadingMessage = signal('');
    errorMessage = signal('');

    canStart = computed(() =>
        this.includeOpenings() || this.includeEndings() || this.includeInserts()
    );

    playlist = signal<AnimeThemeSong[]>([]);
    currentIndex = signal(0);
    currentSong = computed(() => this.playlist()[this.currentIndex()] ?? null);
    isRevealed = signal(false);
    progress = signal(0);
    isPlaying = signal(false);
    isTransitioning = false;

    private audio = new Audio();

    isNavigating = false;

    constructor() {
        this.audio.addEventListener('timeupdate', () => {
            const { currentTime, duration } = this.audio;
            this.progress.set(isFinite(duration) && duration > 0 ? (currentTime / duration) * 100 : 0);
        });
        this.audio.addEventListener('ended', () => {
            if (!this.isNavigating) this.nextSong();
        });
        this.audio.addEventListener('error', () => {
            if (!this.isNavigating) this.nextSong();
        });
        this.audio.addEventListener('playing', () => this.isPlaying.set(true));
        this.audio.addEventListener('pause', () => this.isPlaying.set(false));

        this.router.events.pipe(
            filter(e => e instanceof NavigationStart)
        ).subscribe(() => {
            this.isNavigating = true;
            this.audio.pause();
            this.audio.src = '';
        });
    }

    ngOnDestroy(): void {
        this.audio.pause();
        this.audio.src = '';
    }

    async start(): Promise<void> {
        this.appState.set('loading');

        try {
            this.loadingMessage.set('Connexion à MyAnimeList...');
            const clientId = await firstValueFrom(this.supabaseService.getConfig('myanimelist_client_id'));
            if (!clientId) throw new Error('Client ID MyAnimeList introuvable.');

            this.loadingMessage.set('Chargement de la liste d\'animés...');
            const malIds = await this.fetchMalIds(clientId);
            if (malIds.length === 0) throw new Error('Aucun animé trouvé dans la liste.');

            const songs = await this.fetchSongs(malIds);

            const filtered = songs.filter(s => {
                const type = s.type.toLowerCase();
                if (this.includeOpenings() && type.startsWith('op')) return true;
                if (this.includeEndings() && type.startsWith('ed')) return true;
                if (this.includeInserts() && type.startsWith('in')) return true;
                return false;
            });

            if (filtered.length === 0) throw new Error('Aucune musique disponible pour les filtres sélectionnés.');

            this.playlist.set(this.shuffle(filtered));
            this.currentIndex.set(0);
            this.appState.set('playing');
            this.playCurrent();

        } catch (err) {
            this.errorMessage.set(err instanceof Error ? err.message : 'Une erreur est survenue.');
            this.appState.set('error');
        }
    }

    private async fetchMalIds(clientId: string): Promise<number[]> {
        const ids = new Set<number>();

        for (const status of ['completed', 'watching']) {
            try {
                const malUrl = `${this.MAL_BASE}/users/${this.USERNAME}/animelist?status=${status}&fields=id&limit=1000`;
                const res = await fetch(`${this.CORS_PROXY}${encodeURIComponent(malUrl)}`, {
                    headers: { 'X-MAL-CLIENT-ID': clientId }
                });
                const data = await res.json();
                (data.data ?? []).forEach((item: { node: { id: number } }) => ids.add(item.node.id));
            } catch {
                console.warn(`Impossible de charger la liste "${status}"`);
            }
        }

        return [...ids];
    }

    private async fetchSongs(malIds: number[]): Promise<AnimeThemeSong[]> {
        const all: AnimeThemeSong[] = [];

        for (let i = 0; i < malIds.length; i++) {
            this.loadingMessage.set(`Musiques : ${i + 1} / ${malIds.length} animés traités...`);

            try {
                const url = `${this.AT_BASE}/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${malIds[i]}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`;
                const res = await fetch(url);
                if (!res.ok) continue;

                const data: ATResponse = await res.json();

                for (const anime of data.anime ?? []) {
                    for (const theme of anime.animethemes ?? []) {
                        const songTitle: string = theme.song?.title ?? '???';
                        const artist: string = (theme.song?.artists ?? [])
                            .map((a: { name: string }) => a.name)
                            .join(', ') || '???';
                        const type: string = theme.slug ?? '???';

                        let audioUrl: string | null = null;
                        outer: for (const entry of theme.animethemeentries ?? []) {
                            for (const video of entry.videos ?? []) {
                                if (video.audio?.link) {
                                    audioUrl = video.audio.link;
                                    break outer;
                                }
                            }
                        }

                        if (audioUrl) {
                            all.push({ animeName: anime.name, type, songTitle, artist, audioUrl });
                        }
                    }
                }
            } catch {
                console.warn(`Erreur pour MAL ID: ${malIds[i]}`);
            }

            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return all;
    }

    private shuffle<T>(arr: T[]): T[] {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    playCurrent(): void {
        const song = this.currentSong();
        if (!song) { this.appState.set('finished'); return; }
        this.isRevealed.set(false);
        this.progress.set(0);
        this.audio.src = song.audioUrl;
        this.audio.load();
        this.audio.play()
            .catch(() => this.nextSong())
            .finally(() => { this.isTransitioning = false; });
    }

    nextSong(): void {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.audio.pause();
        const next = this.currentIndex() + 1;
        if (next >= this.playlist().length) {
            this.appState.set('finished');
            this.isTransitioning = false;
            return;
        }
        this.currentIndex.set(next);
        this.playCurrent();
    }

    reveal(): void {
        this.isRevealed.set(true);
    }

    restart(): void {
        this.audio.pause();
        this.playlist.set([]);
        this.currentIndex.set(0);
        this.isRevealed.set(false);
        this.progress.set(0);
        this.isTransitioning = false;
        this.appState.set('setup');
    }
}