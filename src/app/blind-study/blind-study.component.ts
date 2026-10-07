import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationStart } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

type AppState = 'setup' | 'loading' | 'playing' | 'error' | 'finished';

// Une musique renvoyee par le backend (GET /api/blindtest/songs)
interface AnimeThemeSong {
    animeName: string;
    type: string;      // ex. "OP1", "ED2", "IN"
    songTitle: string;
    artist: string;
    audioUrl: string;
}

/**
 * PERFORMANCE :
 *  - AVANT : le navigateur interrogeait AnimeThemes anime par anime (des centaines
 *    de requetes a la suite) -> plusieurs minutes d'attente.
 *  - MAINTENANT : la playlist est preparee et mise en cache par le backend ;
 *    un seul appel suffit. Elle est aussi gardee en memoire pour la visite :
 *    "Recommencer" ne la retelecharge pas.
 *  - La musique suivante est pre-chargee pendant qu'on ecoute la musique
 *    actuelle -> "Suivant" demarre quasiment sans attente.
 */
@Component({
    selector: 'app-blind-study',
    standalone: true,
    imports: [],
    templateUrl: './blind-study.component.html',
    styleUrls: ['./blind-study.component.css']
})
export class BlindStudyComponent implements OnDestroy {
    private http = inject(HttpClient);
    private router = inject(Router);

    private readonly api = environment.apiUrl;

    // Playlist complete gardee entre deux parties (meme visite)
    private static songsCache: AnimeThemeSong[] | null = null;

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

    // Deux lecteurs : l'un joue, l'autre pre-charge la musique suivante.
    // A chaque "Suivant", on echange leurs roles.
    private audio = this.createAudio();
    private nextAudio = this.createAudio();
    private nextAudioUrl: string | null = null;

    isNavigating = false;

    constructor() {
        this.router.events.pipe(
            filter(e => e instanceof NavigationStart),
            takeUntilDestroyed() // se desabonne quand on quitte la page
        ).subscribe(() => {
            this.isNavigating = true;
            this.stopAll();
        });
    }

    ngOnDestroy(): void {
        this.stopAll();
    }

    // Cree un lecteur audio. Ses evenements ne sont pris en compte que
    // s'il est le lecteur actif (pas celui qui pre-charge).
    private createAudio(): HTMLAudioElement {
        const a = new Audio();
        a.preload = 'auto';

        a.addEventListener('timeupdate', () => {
            if (a !== this.audio) return;
            const { currentTime, duration } = a;
            this.progress.set(isFinite(duration) && duration > 0 ? (currentTime / duration) * 100 : 0);
        });
        a.addEventListener('ended', () => {
            if (a === this.audio && !this.isNavigating) this.nextSong();
        });
        a.addEventListener('error', () => {
            if (a === this.audio && !this.isNavigating && this.appState() === 'playing') this.nextSong();
        });
        a.addEventListener('playing', () => {
            if (a === this.audio) this.isPlaying.set(true);
        });
        a.addEventListener('pause', () => {
            if (a === this.audio) this.isPlaying.set(false);
        });
        return a;
    }

    private stopAll(): void {
        for (const a of [this.audio, this.nextAudio]) {
            a.pause();
            a.removeAttribute('src');
            a.load();
        }
        this.nextAudioUrl = null;
    }

    async start(): Promise<void> {
        this.isNavigating = false;
        this.appState.set('loading');

        try {
            const songs = await this.fetchSongs();
            if (songs.length === 0) throw new Error('Aucune musique trouvée.');

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

    // Un seul appel au backend, qui renvoie la playlist deja prete.
    private async fetchSongs(): Promise<AnimeThemeSong[]> {
        if (BlindStudyComponent.songsCache) {
            return BlindStudyComponent.songsCache;
        }

        this.loadingMessage.set('Chargement des musiques...');
        try {
            const songs = await firstValueFrom(
                this.http.get<AnimeThemeSong[]>(`${this.api}/blindtest/songs`)
            );
            BlindStudyComponent.songsCache = songs ?? [];
            return BlindStudyComponent.songsCache;
        } catch (err) {
            if (err instanceof HttpErrorResponse && err.status === 503) {
                throw new Error('La playlist est en cours de préparation, réessaie dans une minute.');
            }
            throw new Error('Impossible de charger les musiques.');
        }
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

        if (this.nextAudioUrl === song.audioUrl) {
            // La musique a deja ete pre-chargee : on echange les lecteurs.
            const previous = this.audio;
            this.audio = this.nextAudio;
            this.nextAudio = previous;
            previous.pause();
        } else {
            this.audio.src = song.audioUrl;
            this.audio.load();
        }
        this.nextAudioUrl = null;

        const player = this.audio;
        player.play()
            .then(() => {
                if (player === this.audio) this.isTransitioning = false;
            })
            .catch((err: unknown) => {
                if (player !== this.audio) return; // un autre morceau a pris le relais
                this.isTransitioning = false;
                // On ignore les lectures interrompues volontairement (Recommencer,
                // changement de page) : seule une vraie erreur fait passer a la suite.
                const aborted = err instanceof DOMException && err.name === 'AbortError';
                if (aborted || this.isNavigating || this.appState() !== 'playing') return;
                this.nextSong();
            });

        this.preloadNext();
    }

    // Commence a telecharger la musique suivante dans le lecteur inactif.
    private preloadNext(): void {
        const next = this.playlist()[this.currentIndex() + 1];
        if (!next) return;
        this.nextAudio.src = next.audioUrl;
        this.nextAudio.load();
        this.nextAudioUrl = next.audioUrl;
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
        this.stopAll();
        this.playlist.set([]);
        this.currentIndex.set(0);
        this.isRevealed.set(false);
        this.progress.set(0);
        this.isTransitioning = false;
        this.appState.set('setup');
    }
}