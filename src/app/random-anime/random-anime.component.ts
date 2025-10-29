import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimeService, Anime} from '../anime.service';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
    selector: 'app-random-anime',
    standalone: true,
    imports: [CommonModule],
    template: `
        <article class="anime-container">
            <h1>Anime Aléatoire - Plan to Watch</h1>
            <p class="subtitle">Utilisateur: Lothi13</p>

            <div *ngIf="loading" class="loading">
                <div class="spinner"></div>
                <p>Chargement des animés...</p>
            </div>

            <div *ngIf="error" class="error">
                <p>{{ error }}</p>
                <button (click)="loadAnimeList()" class="btn-retry">Réessayer</button>
            </div>

            <div *ngIf="!loading && !error && !currentAnime && animeList.length > 0" class="initial-state">
                <div class="mystery-box">
                    <div class="question-mark">?</div>
                    <p class="mystery-text">Découvre un animé aléatoire !</p>
                </div>
                <button (click)="showRandomAnime()" class="btn-random btn-start">
                    🎲 Lancer l'aléatoire
                </button>
                <p class="anime-count">{{ animeList.length }} animés disponibles</p>
            </div>

            <div *ngIf="!loading && !error && currentAnime" class="anime-display">
                <div class="anime-card" [@fadeSlide]="animationState">
                    <div *ngIf="loadingDetails" class="loading-details">
                        <div class="spinner-small"></div>
                        <p>Chargement...</p>
                    </div>

                    <div class="image-container">
                        <img
                                [src]="currentAnime.main_picture.large || currentAnime.main_picture.medium"
                                [alt]="currentAnime.title"
                                class="anime-image"
                        />
                    </div>
                    <h2 class="anime-title">
                        <a [href]="'https://myanimelist.net/anime/' + currentAnime.id" target="_blank" rel="noopener noreferrer">
                            {{ currentAnime.title }}
                        </a>
                    </h2>

                    <div class="anime-info">
                        <div *ngIf="currentAnime.genres && currentAnime.genres.length > 0" class="info-section">
                            <span class="info-label">📚 Genres:</span>
                            <div class="genres-list">
                                <span *ngFor="let genre of currentAnime.genres" class="genre-tag">
                                    {{ genre.name }}
                                </span>
                            </div>
                        </div>

                        <div *ngIf="currentAnime.num_episodes" class="info-section">
                            <span class="info-label">🎬 Épisodes:</span>
                            <span class="info-value">{{ currentAnime.num_episodes }}</span>
                        </div>

                        <div *ngIf="estimatedDuration" class="info-section">
                            <span class="info-label">⏱️ Durée estimée:</span>
                            <span class="info-value">{{ formatDuration(estimatedDuration) }}</span>
                        </div>

                        <div *ngIf="previousSeason" class="info-section related-section">
                            <span class="info-label">⬅️ Saison précédente:</span>
                            <a [href]="'https://myanimelist.net/anime/' + previousSeason.id"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="related-link">
                                {{ previousSeason.title }}
                            </a>
                        </div>

                        <div *ngIf="parentStory" class="info-section related-section">
                            <span class="info-label">📖 Histoire principale:</span>
                            <a [href]="'https://myanimelist.net/anime/' + parentStory.id"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="related-link">
                                {{ parentStory.title }}
                            </a>
                        </div>
                    </div>
                </div>

                <button (click)="showRandomAnime()" class="btn-random" [disabled]="isAnimating || loadingDetails">
                    🎲 Autre Anime Aléatoire
                </button>

                <p class="anime-count">{{ animeList.length }} animés dans le plan to watch</p>
            </div>
        </article>
    `,
    styleUrls: ['./random-anime.component.css'],
    animations: [
        trigger('fadeSlide', [
            state('void', style({
                opacity: 0,
                transform: 'translateY(-20px) scale(0.95)'
            })),
            state('visible', style({
                opacity: 1,
                transform: 'translateY(0) scale(1)'
            })),
            transition('void => visible', [
                animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ]),
            transition('visible => void', [
                animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ])
        ])
    ]
})
export class RandomAnimeComponent implements OnInit {
    animeService = inject(AnimeService);

    animeList: Anime[] = [];
    currentAnime: Anime | null = null;
    previousSeason: { id: number; title: string } | null = null;
    parentStory: { id: number; title: string } | null = null;
    estimatedDuration: { hours: number; minutes: number; total_minutes: number } | null = null;
    loading = false;
    loadingDetails = false;
    error: string | null = null;
    animationState = 'visible';
    isAnimating = false;

    ngOnInit() {
        this.loadAnimeList();
    }

    loadAnimeList() {
        this.loading = true;
        this.error = null;

        this.animeService.getPlanToWatch('Lothi13').subscribe({
            next: (animeList) => {
                this.animeList = animeList;
                this.loading = false;

                if (this.animeList.length === 0) {
                    this.error = 'Aucun animé dans le plan to watch';
                }
            },
            error: (err) => {
                this.loading = false;

                if (err.status === 401 || err.status === 403) {
                    this.error = 'Erreur d\'authentification. Vérifiez votre Client ID MyAnimeList.';
                } else {
                    this.error = `Erreur lors du chargement des animés (${err.status || 'réseau'})`;
                }
            }
        });
    }

    showRandomAnime() {
        if (this.animeList.length === 0 || this.isAnimating || this.loadingDetails) return;

        this.isAnimating = true;
        this.animationState = 'void';

        setTimeout(() => {
            const selectedAnime = this.animeService.getRandomAnime(this.animeList);
            if (!selectedAnime) return;

            this.currentAnime = selectedAnime;
            this.previousSeason = null;
            this.parentStory = null;
            this.estimatedDuration = null;
            this.animationState = 'visible';

            // Calculer la durée estimée immédiatement
            this.estimatedDuration = this.animeService.getEstimatedDuration(selectedAnime);

            // Charger les détails supplémentaires (saisons liées)
            this.loadingDetails = true;
            this.animeService.getAnimeDetails(selectedAnime.id).subscribe({
                next: (details) => {
                    if (details.related_anime) {
                        this.previousSeason = this.animeService.getPreviousSeason(details);
                        this.parentStory = this.animeService.getParentStory(details);
                    }
                    this.loadingDetails = false;
                },
                error: () => {
                    this.loadingDetails = false;
                }
            });

            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }, 300);
    }

    formatDuration(duration: { hours: number; minutes: number; total_minutes: number }): string {
        if (duration.hours > 0) {
            return `${duration.hours}h ${duration.minutes}min`;
        }
        return `${duration.total_minutes}min`;
    }
}