import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService, Anime } from '../anime.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-random-anime',
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

      <div *ngIf="!loading && !error && currentAnime" class="anime-display">
        <div class="anime-card" [@fadeSlide]="animationState">
          <div class="image-container">
            <img 
              [src]="currentAnime.main_picture?.large || currentAnime.main_picture?.medium" 
              [alt]="currentAnime.title"
              class="anime-image"
            />
          </div>
          <h2 class="anime-title">{{ currentAnime.title }}</h2>
        </div>

        <button (click)="showRandomAnime()" class="btn-random" [disabled]="isAnimating">
          🎲 Anime Aléatoire
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
    loading = false;
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
            next: (response) => {
                this.animeList = response.data.map(item => item.node);
                this.loading = false;

                if (this.animeList.length > 0) {
                    this.currentAnime = this.animeService.getRandomAnime(this.animeList);
                } else {
                    this.error = 'Aucun animé dans le plan to watch';
                }
            },
            error: (err) => {
                this.loading = false;
                this.error = 'Erreur lors du chargement des animés. Vérifiez votre Client ID MyAnimeList.';
                console.error('Erreur API MyAnimeList:', err);
            }
        });
    }

    showRandomAnime() {
        if (this.animeList.length === 0 || this.isAnimating) return;

        this.isAnimating = true;
        this.animationState = 'void';

        setTimeout(() => {
            this.currentAnime = this.animeService.getRandomAnime(this.animeList);
            this.animationState = 'visible';

            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }, 300);
    }
}