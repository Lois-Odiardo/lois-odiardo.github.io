import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    CobblemonService,
    CobblemonPlayer,
    PlayerPokedex,
    PokemonCell,
    DexEntry
} from './cobblemon.service';

@Component({
    selector: 'app-cobblemon',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="cobblemon-container">

            <!-- HEADER -->
            <div class="cobblemon-header">
                <div class="header-pokeball"></div>
                <h1>Cobblemon Académie</h1>
                <p class="cobblemon-subtitle">Pokédex des dresseurs du serveur</p>
            </div>

            <!-- CHARGEMENT -->
            <div *ngIf="loading" class="loading-container">
                <div class="pokeball-spinner"></div>
                <p>Chargement...</p>
            </div>

            <!-- LISTE DES JOUEURS -->
            <div *ngIf="!loading && !selectedPokedex" class="players-section">
                <h2 class="section-title">Dresseurs</h2>
                <div class="players-grid">
                    <div
                            *ngFor="let player of players"
                            class="player-card"
                            (click)="selectPlayer(player)"
                    >
                        <div class="player-avatar-container">
                            <img
                                    class="player-avatar"
                                    [src]="svc.getPlayerAvatarUrl(player.username, 128)"
                                    [alt]="player.username"
                                    loading="lazy"
                            />
                        </div>
                        <div class="player-info">
                            <h3 class="player-name">{{ player.username }}</h3>
                        </div>
                        <div class="player-card-arrow">▶</div>
                    </div>
                </div>

                <div *ngIf="players.length === 0 && !loading" class="empty-state">
                    <p>Aucun joueur configuré.</p>
                </div>
            </div>

            <!-- VUE POKÉDEX -->
            <div *ngIf="selectedPokedex" class="pokedex-section">

                <button class="btn-back" (click)="deselectPlayer()">◀ Retour</button>

                <!-- Profil joueur -->
                <div class="player-profile">
                    <img
                            class="profile-body"
                            [src]="svc.getPlayerBodyUrl(selectedPokedex.player.username, 256)"
                            [alt]="selectedPokedex.player.username"
                    />
                    <div class="profile-info">
                        <h2 class="profile-name">{{ selectedPokedex.player.username }}</h2>
                        <div class="main-stats">
                            <div class="main-stat captured-stat">
                                <span class="main-stat-value">{{ selectedPokedex.stats.captured }}</span>
                                <span class="main-stat-label">Capturés</span>
                            </div>
                            <div class="main-stat seen-stat">
                                <span class="main-stat-value">{{ selectedPokedex.stats.seen }}</span>
                                <span class="main-stat-label">Vus</span>
                            </div>
                            <div class="main-stat shiny-stat">
                                <span class="main-stat-value">{{ selectedPokedex.stats.shiny }}</span>
                                <span class="main-stat-label">Shiny</span>
                            </div>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div
                                        class="progress-fill captured-fill"
                                        [style.width.%]="(selectedPokedex.stats.captured / selectedPokedex.stats.total) * 100"
                                ></div>
                                <div
                                        class="progress-fill seen-fill"
                                        [style.width.%]="((selectedPokedex.stats.seen - selectedPokedex.stats.captured) / selectedPokedex.stats.total) * 100"
                                ></div>
                            </div>
                            <span class="progress-label">
                                {{ selectedPokedex.stats.seen }} / {{ selectedPokedex.stats.total }}
                            </span>
                        </div>
                    </div>

                </div>

                <!-- Filtres (toggle cumulatifs) -->
                <div class="filters-bar">
                    <span class="filters-label">Filtres :</span>
                    <button
                            class="filter-btn filter-captured"
                            [class.active]="filters.captured"
                            (click)="toggleFilter('captured')"
                    >
                        Capturés
                        <span class="filter-count">{{ selectedPokedex.stats.captured }}</span>
                    </button>
                    <button
                            class="filter-btn filter-seen"
                            [class.active]="filters.seen"
                            (click)="toggleFilter('seen')"
                    >
                        Vus
                        <span class="filter-count">{{ selectedPokedex.stats.seen }}</span>
                    </button>
                    <button
                            class="filter-btn filter-shiny"
                            [class.active]="filters.shiny"
                            (click)="toggleFilter('shiny')"
                    >
                        ★ Shiny
                        <span class="filter-count">{{ selectedPokedex.stats.shiny }}</span>
                    </button>
                    <button
                            class="filter-btn filter-legendary"
                            [class.active]="filters.legendary"
                            (click)="toggleFilter('legendary')"
                    >
                        ♦ Légendaires
                        <span class="filter-count">{{ selectedPokedex.stats.legendaries }}</span>
                    </button>
                    <button
                            class="filter-btn filter-alpha"
                            [class.active]="filters.alpha"
                            (click)="toggleFilter('alpha')"
                    >
                        ▲ Alpha
                        <span class="filter-count">{{ selectedPokedex.stats.alpha }}</span>
                    </button>
                    <button
                            class="filter-btn filter-reset"
                            *ngIf="hasActiveFilter()"
                            (click)="resetFilters()"
                    >
                        ✕ Reset
                    </button>
                </div>

                <!-- Légende -->
                <div class="legend">
                    <span class="legend-item"><span class="legend-dot dot-captured"></span>Capturé</span>
                    <span class="legend-item"><span class="legend-dot dot-shiny"></span>Shiny</span>
                    <span class="legend-item"><span class="legend-dot dot-seen"></span>Vu</span>
                    <span class="legend-item"><span class="legend-dot dot-unseen"></span>Inconnu</span>
                </div>

                <!-- Compteur résultat -->
                <div class="result-count" *ngIf="hasActiveFilter()">
                    {{ getFilteredGrid().length }} Pokémon
                </div>

                <!-- Grille Pokédex -->
                <div class="pokedex-grid">
                    <div
                            *ngFor="let cell of getFilteredGrid()"
                            class="poke-cell"
                            [ngClass]="getCellClasses(cell)"
                    >
                        <span class="poke-id">#{{ cell.dexId }}</span>
                        <div class="poke-sprite-wrap">
                            <img
                                    class="poke-sprite"
                                    [src]="cell.spriteUrl"
                                    [alt]="cell.name"
                                    loading="lazy"
                                    (error)="onSpriteError($event)"
                            />
                        </div>
                        <span class="poke-name">{{ cell.name }}</span>
                        <div class="poke-badges">
                            <span *ngIf="cell.status === 'captured-shiny'" class="badge badge-shiny" title="Shiny">★</span>
                            <span *ngIf="cell.isLegendary" class="badge badge-legendary" title="Légendaire">♦</span>
                            <span *ngIf="cell.isAlpha" class="badge badge-alpha" title="Alpha">▲</span>
                        </div>
                    </div>
                </div>

                <div *ngIf="getFilteredGrid().length === 0" class="empty-state">
                    <p>Aucun Pokémon trouvé.</p>
                </div>
            </div>

            <!-- ERREUR -->
            <div *ngIf="error" class="error-container">
                <p>{{ error }}</p>
                <button class="btn-retry" (click)="retry()">Réessayer</button>
            </div>
        </div>
    `,
    styleUrls: ['./cobblemon.component.css']
})
export class CobblemonComponent implements OnInit {
    svc = inject(CobblemonService);

    players: CobblemonPlayer[] = [];
    dex: DexEntry[] = [];
    selectedPokedex: PlayerPokedex | null = null;
    loading = true;
    error: string | null = null;

    // Filtres cumulatifs (toggle on/off)
    filters = {
        captured: false,
        seen: false,
        shiny: false,
        legendary: false,
        alpha: false
    };

    ngOnInit(): void {
        this.loading = true;
        this.svc.getPlayers().subscribe(players => {
            this.players = players;
            this.svc.getDex().subscribe(dex => {
                this.dex = dex;
                this.loading = false;
            });
        });
    }

    selectPlayer(player: CobblemonPlayer): void {
        this.loading = true;
        this.error = null;
        this.resetFilters();

        this.svc.getPlayerData(player).subscribe(data => {
            if (data) {
                this.selectedPokedex = this.svc.buildPokedex(player, data, this.dex);
            } else {
                this.error = `Impossible de charger les données de ${player.username}.`;
            }
            this.loading = false;
        });
    }

    deselectPlayer(): void {
        this.selectedPokedex = null;
        this.resetFilters();
        this.error = null;
    }

    toggleFilter(key: keyof typeof this.filters): void {
        this.filters[key] = !this.filters[key];
    }

    resetFilters(): void {
        this.filters = { captured: false, seen: false, shiny: false, legendary: false, alpha: false };
    }

    hasActiveFilter(): boolean {
        return Object.values(this.filters).some(v => v);
    }

    getFilteredGrid(): PokemonCell[] {
        if (!this.selectedPokedex) return [];
        const grid = this.selectedPokedex.grid;

        // Aucun filtre actif → tout afficher
        if (!this.hasActiveFilter()) return grid;

        // Filtres cumulatifs : un Pokémon passe si il satisfait TOUS les filtres actifs
        return grid.filter(cell => {
            if (this.filters.captured) {
                if (cell.status !== 'captured' && cell.status !== 'captured-shiny') return false;
            }
            if (this.filters.seen) {
                if (cell.status === 'unseen') return false;
            }
            if (this.filters.shiny) {
                if (cell.status !== 'captured-shiny') return false;
            }
            if (this.filters.legendary) {
                if (!cell.isLegendary) return false;
            }
            if (this.filters.alpha) {
                if (!cell.isAlpha) return false;
            }
            return true;
        });
    }

    getCellClasses(cell: PokemonCell): Record<string, boolean> {
        return {
            ['status-' + cell.status]: true,
            'is-legendary': cell.isLegendary && cell.status !== 'unseen',
            'is-alpha': cell.isAlpha
        };
    }

    onSpriteError(event: Event): void {
        (event.target as HTMLImageElement).src =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    }

    retry(): void {
        this.error = null;
        if (this.selectedPokedex) {
            this.selectPlayer(this.selectedPokedex.player);
        } else {
            this.ngOnInit();
        }
    }
}