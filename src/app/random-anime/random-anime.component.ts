import { Component, inject, OnInit, signal } from '@angular/core';
import { AnimeService, Anime } from '../anime.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-random-anime',
    standalone: true,
    imports: [],
    template: `
        <article class="anime-container">
            <h1>Anime Aléatoire - Plan to Watch</h1>
            <p class="subtitle">Utilisateur: Lothi13</p>

            @if (loading()) {
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement des animés...</p>
                </div>
            }

            @if (error()) {
                <div class="error">
                    <p>{{ error() }}</p>
                    <button (click)="loadAnimeList()" class="btn-retry">Réessayer</button>
                </div>
            }

            @if (!loading() && !error() && !currentAnime() && animeList().length > 0) {
                <div class="initial-state">
                    <div class="mystery-box">
                        <div class="question-mark">?</div>
                        <p class="mystery-text">Découvre un animé aléatoire !</p>
                    </div>
                    <button (click)="showRandomAnime()" class="btn-random btn-start">
                        🎲 Lancer l'aléatoire
                    </button>
                    <p class="anime-count">{{ animeList().length }} animés disponibles</p>
                </div>
            }

            @if (!loading() && !error() && currentAnime()) {
                <div class="anime-display">
                    <div class="anime-card" [@fadeSlide]="animationState()">

                        @if (loadingDetails()) {
                            <div class="loading-details">
                                <div class="spinner-small"></div>
                                <p>Chargement...</p>
                            </div>
                        }

                        <div class="image-container">
                            <img
                                    [src]="currentAnime()!.main_picture.large || currentAnime()!.main_picture.medium"
                                    [alt]="currentAnime()!.title"
                                    class="anime-image"
                            />
                        </div>
                        <h2 class="anime-title">
                            <a [href]="'https://myanimelist.net/anime/' + currentAnime()!.id" target="_blank" rel="noopener noreferrer">
                                {{ currentAnime()!.title }}
                            </a>
                        </h2>

                        <div class="anime-info">
                            @if (currentAnime()!.genres && currentAnime()!.genres!.length > 0) {
                                <div class="info-section">
                                    <span class="info-label">📚 Genres:</span>
                                    <div class="genres-list">
                                        @for (genre of currentAnime()!.genres!; track genre.id) {
                                            <span class="genre-tag">{{ genre.name }}</span>
                                        }
                                    </div>
                                </div>
                            }

                            @if (currentAnime()!.num_episodes) {
                                <div class="info-section">
                                    <span class="info-label">🎬 Épisodes:</span>
                                    <span class="info-value">{{ currentAnime()!.num_episodes }}</span>
                                </div>
                            }

                            @if (estimatedDuration()) {
                                <div class="info-section">
                                    <span class="info-label">⏱️ Durée estimée:</span>
                                    <span class="info-value">{{ formatDuration(estimatedDuration()!) }}</span>
                                </div>
                            }

                            @if (previousSeason()) {
                                <div class="info-section related-section">
                                    <span class="info-label">⬅️ Saison précédente:</span>
                                    <a [href]="'https://myanimelist.net/anime/' + previousSeason()!.id"
                                       target="_blank" rel="noopener noreferrer" class="related-link">
                                        {{ previousSeason()!.title }}
                                    </a>
                                </div>
                            }

                            @if (parentStory()) {
                                <div class="info-section related-section">
                                    <span class="info-label">📖 Histoire principale:</span>
                                    <a [href]="'https://myanimelist.net/anime/' + parentStory()!.id"
                                       target="_blank" rel="noopener noreferrer" class="related-link">
                                        {{ parentStory()!.title }}
                                    </a>
                                </div>
                            }
                        </div>
                    </div>

                    <button (click)="showRandomAnime()" class="btn-random" [disabled]="isAnimating() || loadingDetails()">
                        🎲 Autre Anime Aléatoire
                    </button>
                    <p class="anime-count">{{ animeList().length }} animés dans le plan to watch</p>
                </div>
            }
        </article>
    `,
    styleUrls: ['./random-anime.component.css'],
    animations: [
        trigger('fadeSlide', [
            state('void', style({ opacity: 0, transform: 'translateY(-20px) scale(0.95)' })),
            state('visible', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
            transition('void => visible', [animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
            transition('visible => void', [animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
        ])
    ]
})
export class RandomAnimeComponent implements OnInit {
    private animeService = inject(AnimeService);

    animeList = signal<Anime[]>([]);
    currentAnime = signal<Anime | null>(null);
    previousSeason = signal<{ id: number; title: string } | null>(null);
    parentStory = signal<{ id: number; title: string } | null>(null);
    estimatedDuration = signal<{ hours: number; minutes: number; total_minutes: number } | null>(null);
    loading = signal(false);
    loadingDetails = signal(false);
    error = signal<string | null>(null);
    animationState = signal('visible');
    isAnimating = signal(false);

    ngOnInit(): void {
        this.loadAnimeList();
    }

    loadAnimeList(): void {
        this.loading.set(true);
        this.error.set(null);

        this.animeService.getPlanToWatch('Lothi13').subscribe({
            next: (animeList) => {
                this.animeList.set(animeList);
                this.loading.set(false);
                if (animeList.length === 0) {
                    this.error.set('Aucun animé dans le plan to watch');
                }
            },
            error: (err: { status?: number }) => {
                this.loading.set(false);
                if (err.status === 401 || err.status === 403) {
                    this.error.set('Erreur d\'authentification. Vérifiez votre Client ID MyAnimeList.');
                } else {
                    this.error.set(`Erreur lors du chargement des animés (${err.status ?? 'réseau'})`);
                }
            }
        });
    }

    showRandomAnime(): void {
        if (this.animeList().length === 0 || this.isAnimating() || this.loadingDetails()) return;

        this.isAnimating.set(true);
        this.animationState.set('void');

        setTimeout(() => {
            const selectedAnime = this.animeService.getRandomAnime(this.animeList());
            if (!selectedAnime) return;

            this.currentAnime.set(selectedAnime);
            this.previousSeason.set(null);
            this.parentStory.set(null);
            this.estimatedDuration.set(this.animeService.getEstimatedDuration(selectedAnime));
            this.animationState.set('visible');
            this.loadingDetails.set(true);

            this.animeService.getAnimeDetails(selectedAnime.id).subscribe({
                next: (details) => {
                    if (details.related_anime) {
                        this.previousSeason.set(this.animeService.getPreviousSeason(details));
                        this.parentStory.set(this.animeService.getParentStory(details));
                    }
                    this.loadingDetails.set(false);
                },
                error: () => this.loadingDetails.set(false)
            });

            setTimeout(() => this.isAnimating.set(false), 500);
        }, 300);
    }

    formatDuration(duration: { hours: number; minutes: number; total_minutes: number }): string {
        return duration.hours > 0
            ? `${duration.hours}h ${duration.minutes}min`
            : `${duration.total_minutes}min`;
    }
}