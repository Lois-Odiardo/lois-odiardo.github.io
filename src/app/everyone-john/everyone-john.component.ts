import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService, ObjectifsThematiques } from '../supabase.service';

@Component({
    selector: 'app-everyone-john',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <div class="header">
                <h1>🎲 Everyone is John</h1>
                <p class="subtitle">Générateur d'objectifs aléatoires</p>
            </div>

            <div *ngIf="loading" class="loading">
                <div class="spinner"></div>
                <p>Chargement...</p>
            </div>

            <div class="mode-selector" *ngIf="!objectifsTires && !loading">
                <button (click)="tirerObjectifs(false)" class="btn-mode">
                    🎯 Tirer objectifs aléatoires
                </button>
                <button (click)="tirerObjectifs(true)" class="btn-mode btn-mode-thematique">
                    🎭 Tirer objectifs thématiques
                </button>
            </div>

            <div class="theme-banner" *ngIf="objectifsTires && modeThematique">
                <h3>{{ themeActuel }}</h3>
            </div>

            <div class="objectifs-container" *ngIf="objectifsTires">
                <div class="objectif difficulte-1">
                    <div class="objectif-badge">
                        <span class="badge-icon">⭐</span>
                        <span class="badge-level">Niveau 1</span>
                    </div>
                    <h2>Objectif Simple</h2>
                    <p class="objectif-text">{{ objectifsTires.difficulte1 }}</p>
                    <div class="objectif-footer">
                        <span class="points">+1 point</span>
                        <button
                                *ngIf="peutChangerObjectif(1)"
                                (click)="changerObjectif(1)"
                                class="btn-changer"
                                title="Changer cet objectif">
                            🔄
                        </button>
                    </div>
                </div>

                <div class="objectif difficulte-2">
                    <div class="objectif-badge">
                        <span class="badge-icon">⭐⭐</span>
                        <span class="badge-level">Niveau 2</span>
                    </div>
                    <h2>Objectif Complexe</h2>
                    <p class="objectif-text">{{ objectifsTires.difficulte2 }}</p>
                    <div class="objectif-footer">
                        <span class="points">+2 points</span>
                        <button
                                *ngIf="peutChangerObjectif(2)"
                                (click)="changerObjectif(2)"
                                class="btn-changer"
                                title="Changer cet objectif">
                            🔄
                        </button>
                    </div>
                </div>

                <div class="objectif difficulte-3">
                    <div class="objectif-badge">
                        <span class="badge-icon">⭐⭐⭐</span>
                        <span class="badge-level">Niveau 3</span>
                    </div>
                    <h2>Objectif Difficile</h2>
                    <p class="objectif-text">{{ objectifsTires.difficulte3 }}</p>
                    <div class="objectif-footer">
                        <span class="points">+3 points</span>
                        <button
                                *ngIf="peutChangerObjectif(3)"
                                (click)="changerObjectif(3)"
                                class="btn-changer"
                                title="Changer cet objectif">
                            🔄
                        </button>
                    </div>
                </div>
            </div>

            <div class="actions-footer" *ngIf="objectifsTires">
                <button (click)="reinitialiser()" class="btn-reset">
                    🔄 Nouvelle partie
                </button>
                <p class="info-changements" *ngIf="!modeThematique && !aChangeUnObjectif">
                    💡 Vous pouvez changer un objectif une seule fois
                </p>
                <p class="info-changements" *ngIf="modeThematique && !aChangeTousLesObjectifs">
                    💡 Vous pouvez changer tous les objectifs une seule fois
                </p>
            </div>
        </div>
    `,
    styleUrls: ['./everyone-john.component.css']
})
export class EveryoneJohnComponent implements OnInit {
    private supabaseService = inject(SupabaseService);

    // Cache des objectifs chargés depuis Supabase
    private objectifsDifficulte1: string[] = [];
    private objectifsDifficulte2: string[] = [];
    private objectifsDifficulte3: string[] = [];
    private themes: string[] = [];

    objectifsTires: {
        difficulte1: string;
        difficulte2: string;
        difficulte3: string;
    } | null = null;

    modeThematique = false;
    themeActuel = '';
    aChangeUnObjectif = false;
    aChangeTousLesObjectifs = false;
    objectifsChanges: Set<number> = new Set();
    loading = true;

    ngOnInit(): void {
        this.chargerObjectifs();
    }

    private chargerObjectifs(): void {
        this.loading = true;

        // Charger tous les objectifs aléatoires
        this.supabaseService.getObjectifsByDifficulte(1, false).subscribe({
            next: (objectifs) => {
                this.objectifsDifficulte1 = objectifs.map(o => o.objectif);
            }
        });

        this.supabaseService.getObjectifsByDifficulte(2, false).subscribe({
            next: (objectifs) => {
                this.objectifsDifficulte2 = objectifs.map(o => o.objectif);
            }
        });

        this.supabaseService.getObjectifsByDifficulte(3, false).subscribe({
            next: (objectifs) => {
                this.objectifsDifficulte3 = objectifs.map(o => o.objectif);
            }
        });

        // Charger les thèmes disponibles
        this.supabaseService.getThemes().subscribe({
            next: (themes) => {
                this.themes = themes;
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur chargement objectifs:', err);
                this.loading = false;
            }
        });
    }

    tirerObjectifs(thematique: boolean): void {
        this.modeThematique = thematique;

        if (thematique) {
            // Tirer un thème aléatoire
            const themeAleatoire = this.supabaseService.getRandomElement(this.themes);
            if (!themeAleatoire) return;

            this.themeActuel = themeAleatoire;

            // Charger les objectifs de ce thème
            this.supabaseService.getObjectifsByTheme(themeAleatoire).subscribe({
                next: (objectifs) => {
                    if (objectifs) {
                        this.objectifsTires = {
                            difficulte1: objectifs.difficulte1,
                            difficulte2: objectifs.difficulte2,
                            difficulte3: objectifs.difficulte3
                        };
                    }
                }
            });
        } else {
            // Mode aléatoire classique
            this.objectifsTires = {
                difficulte1: this.tirerAleatoire(this.objectifsDifficulte1),
                difficulte2: this.tirerAleatoire(this.objectifsDifficulte2),
                difficulte3: this.tirerAleatoire(this.objectifsDifficulte3)
            };
        }
    }

    peutChangerObjectif(niveau: number): boolean {
        if (this.modeThematique) {
            return !this.aChangeTousLesObjectifs;
        } else {
            return !this.aChangeUnObjectif && !this.objectifsChanges.has(niveau);
        }
    }

    changerObjectif(niveau: number): void {
        if (!this.objectifsTires) return;

        if (this.modeThematique) {
            // En mode thématique, on retirage tout le set
            this.tirerObjectifs(true);
            this.aChangeTousLesObjectifs = true;
        } else {
            // En mode aléatoire, on ne change qu'un seul objectif
            switch (niveau) {
                case 1:
                    this.objectifsTires.difficulte1 = this.tirerAleatoire(this.objectifsDifficulte1);
                    break;
                case 2:
                    this.objectifsTires.difficulte2 = this.tirerAleatoire(this.objectifsDifficulte2);
                    break;
                case 3:
                    this.objectifsTires.difficulte3 = this.tirerAleatoire(this.objectifsDifficulte3);
                    break;
            }
            this.objectifsChanges.add(niveau);
            this.aChangeUnObjectif = true;
        }
    }

    reinitialiser(): void {
        this.objectifsTires = null;
        this.modeThematique = false;
        this.themeActuel = '';
        this.aChangeUnObjectif = false;
        this.aChangeTousLesObjectifs = false;
        this.objectifsChanges.clear();
    }

    private tirerAleatoire<T>(liste: T[]): T {
        const index = Math.floor(Math.random() * liste.length);
        return liste[index];
    }
}