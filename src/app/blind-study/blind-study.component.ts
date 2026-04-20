import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { firstValueFrom } from 'rxjs';

type AppState = 'setup' | 'loading' | 'playing' | 'error' | 'finished';

interface AnisongSong {
    animeENName: string;
    animeJPName: string;
    linked_ids: {
        myanimelist: number | null;
    };
    songType: string;
    songName: string;
    songArtist: string;
    audio: string | null;
}

@Component({
    selector: 'app-blind-study',
    standalone: true,
    imports: [],
    template: `
        <div class="bs-container">

            @if (appState() === 'setup') {
                <div class="bs-setup">
                    <div class="bs-logo">
                        <span class="bs-logo-icon">◉</span>
                        <h1>BlindStudy</h1>
                        <p>Teste ta connaissance des musiques d'anime</p>
                    </div>
                    <div class="bs-filters">
                        <label class="bs-checkbox" [class.checked]="includeOpenings()">
                            <input type="checkbox" [checked]="includeOpenings()" (change)="includeOpenings.set(!includeOpenings())">
                            <span class="bs-checkbox-box"></span>
                            Openings
                        </label>
                        <label class="bs-checkbox" [class.checked]="includeEndings()">
                            <input type="checkbox" [checked]="includeEndings()" (change)="includeEndings.set(!includeEndings())">
                            <span class="bs-checkbox-box"></span>
                            Endings
                        </label>
                        <label class="bs-checkbox" [class.checked]="includeInserts()">
                            <input type="checkbox" [checked]="includeInserts()" (change)="includeInserts.set(!includeInserts())">
                            <span class="bs-checkbox-box"></span>
                            Inserts
                        </label>
                    </div>
                    <button class="bs-start-btn" [disabled]="!canStart()" (click)="start()">
                        Lancer
                    </button>
                </div>
            }

            @if (appState() === 'loading') {
                <div class="bs-loading">
                    <div class="bs-spinner"></div>
                    <p class="bs-loading-msg">{{ loadingMessage() }}</p>
                </div>
            }

            @if (appState() === 'error') {
                <div class="bs-error">
                    <p>{{ errorMessage() }}</p>
                    <button (click)="appState.set('setup')">Retour</button>
                </div>
            }

            @if (appState() === 'playing' && currentSong()) {
                <div class="bs-player">
                    <div class="bs-track-info" [class.revealed]="isRevealed()">
                        @if (isRevealed()) {
                            <div class="bs-revealed">
                                <span class="bs-song-type">{{ currentSong()!.songType }}</span>
                                <h2 class="bs-song-title">{{ currentSong()!.songName }}</h2>
                                <p class="bs-song-artist">{{ currentSong()!.songArtist }}</p>
                                <p class="bs-anime-name">{{ currentSong()!.animeENName || currentSong()!.animeJPName }}</p>
                            </div>
                        } @else {
                            <div class="bs-hidden">
                                <div class="bs-playing-indicator" [class.playing]="isPlaying()">
                                    <span></span><span></span><span></span><span></span>
                                </div>
                                <p class="bs-mystery">???</p>
                            </div>
                        }
                    </div>

                    <div class="bs-progress-bar">
                        <div class="bs-progress-fill" [style.width.%]="progress()"></div>
                    </div>

                    <div class="bs-controls">
                        @if (!isRevealed()) {
                            <button class="bs-btn bs-btn-reveal" (click)="reveal()">Révéler</button>
                        }
                        <button class="bs-btn bs-btn-next" [disabled]="isTransitioning" (click)="nextSong()">
                            Suivant →
                        </button>
                    </div>

                    <p class="bs-counter">{{ currentIndex() + 1 }} / {{ playlist().length }}</p>
                </div>
            }

            @if (appState() === 'finished') {
                <div class="bs-finished">
                    <span class="bs-logo-icon">◉</span>
                    <h2>Playlist terminée !</h2>
                    <p>{{ playlist().length }} musiques jouées</p>
                    <button class="bs-start-btn" (click)="restart()">Recommencer</button>
                </div>
            }

        </div>
    `,
    styleUrls: ['./blind-study.component.css']
})
export class BlindStudyComponent implements OnDestroy {
    private supabaseService = inject(SupabaseService);

    private readonly CORS_PROXY = 'https://corsproxy.io/?';
    private readonly MAL_BASE = 'https://api.myanimelist.net/v2';
    private readonly ANISONG_BASE = 'https://anisongdb.com/api';
    private readonly CDN_BASE = 'https://naedist.animemusicquiz.com/';
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

    playlist = signal<AnisongSong[]>([]);
    currentIndex = signal(0);
    currentSong = computed(() => this.playlist()[this.currentIndex()] ?? null);
    isRevealed = signal(false);
    progress = signal(0);
    isPlaying = signal(false);
    isTransitioning = false;

    private audio = new Audio();

    constructor() {
        this.audio.addEventListener('timeupdate', () => {
            const { currentTime, duration } = this.audio;
            this.progress.set(isFinite(duration) && duration > 0 ? (currentTime / duration) * 100 : 0);
        });
        this.audio.addEventListener('ended', () => this.nextSong());
        this.audio.addEventListener('error', () => this.nextSong());
        this.audio.addEventListener('playing', () => this.isPlaying.set(true));
        this.audio.addEventListener('pause', () => this.isPlaying.set(false));
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
                if (!s.audio) return false;
                const type = (s.songType ?? '').toLowerCase();
                if (this.includeOpenings() && type.startsWith('opening')) return true;
                if (this.includeEndings() && type.startsWith('ending')) return true;
                if (this.includeInserts() && type.includes('insert')) return true;
                return false;
            });

            if (filtered.length === 0) throw new Error('Aucune musique disponible pour les filtres sélectionnés.');

            const shuffle = <T>(arr: T[]): T[] => {
                const a = [...arr];
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            };

            this.playlist.set(shuffle(filtered));
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


    private async fetchSongs(malIds: number[]): Promise<AnisongSong[]> {
        const BATCH = 200;
        const all: AnisongSong[] = [];

        for (let i = 0; i < malIds.length; i += BATCH) {
            const batch = malIds.slice(i, i + BATCH);
            const done = Math.min(i + BATCH, malIds.length);
            this.loadingMessage.set(`Musiques : ${done} / ${malIds.length} animés traités...`);

            try {
                const url = `${this.CORS_PROXY}${encodeURIComponent(`${this.ANISONG_BASE}/mal_ids_request`)}`;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mal_ids: batch,
                        ignore_duplicate: false,
                        opening_filter: true,
                        ending_filter: true,
                        insert_filter: true,
                        normal_broadcast: true,
                        dub: false,
                        rebroadcast: false,
                        standard: true,
                        instrumental: true,
                        chanting: true,
                        character: true
                    })
                });

                if (res.ok) {
                    const songs: AnisongSong[] = await res.json();
                    all.push(...songs);
                }
            } catch {
                console.warn(`Batch ${i}–${i + BATCH} échoué`);
            }

            await new Promise(resolve => setTimeout(resolve, 300));
        }
        return all;
    }

    playCurrent(): void {
        const song = this.currentSong();
        if (!song) { this.appState.set('finished'); return; }
        this.isRevealed.set(false);
        this.progress.set(0);
        this.audio.src = `${this.CDN_BASE}${song.audio}`;
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