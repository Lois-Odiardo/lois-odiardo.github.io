// everyone-john/everyone-john.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ObjectifsThematiques {
    theme: string;
    difficulte1: string;
    difficulte2: string;
    difficulte3: string;
}

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

            <div class="mode-selector" *ngIf="!objectifsTires">
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
export class EveryoneJohnComponent {
    // Listes d'objectifs par difficulté
    private objectifsDifficulte1: string[] = [
        "Manger un sandwich",
        "Faire un compliment à un inconnu",
        "Acheter un café",
        "Siffler une chanson en public",
        "Prendre une photo avec quelqu'un",
        "Donner de l'argent à un musicien de rue",
        "Porter un chapeau pendant une heure",
        "Faire rire quelqu'un"
    ];

    private objectifsDifficulte2: string[] = [
        "Convaincre quelqu'un de vous prêter 20€",
        "Entrer dans un lieu privé sans autorisation",
        "Voler un objet dans un magasin",
        "Faire pleurer quelqu'un",
        "Obtenir le numéro de téléphone d'un inconnu",
        "Se faire inviter à un repas",
        "Ruiner un rendez-vous amoureux",
        "Provoquer une dispute entre deux personnes"
    ];

    private objectifsDifficulte3: string[] = [
        "Se faire arrêter par la police",
        "Détruire quelque chose de valeur",
        "Causer un accident",
        "Être interviewé par les médias",
        "Organiser une émeute",
        "Voler un véhicule",
        "Mettre le feu à quelque chose d'important",
        "Convaincre quelqu'un de commettre un crime"
    ];

    // Objectifs thématiques
    private objectifsThematiques: ObjectifsThematiques[] = [
        {
            theme: "Cirque 🎪",
            difficulte1: "Lancer une tarte à la crème au visage de quelqu'un",
            difficulte2: "Faire un salto arrière",
            difficulte3: "Dompter un tigre ou un animal dangereux"
        },
        {
            theme: "Espionnage 🕵️",
            difficulte1: "Porter des lunettes de soleil à l'intérieur pendant 1 heure",
            difficulte2: "Fouiller le sac ou les poches de quelqu'un sans se faire prendre",
            difficulte3: "Infiltrer un bâtiment sécurisé et photographier un document secret"
        },
        {
            theme: "Cuisine 👨‍🍳",
            difficulte1: "Faire goûter un plat que vous avez préparé à un inconnu",
            difficulte2: "Cuisiner un repas complet avec des ingrédients volés",
            difficulte3: "Organiser un dîner gastronomique pour 5 personnes dans un lieu insolite"
        },
        {
            theme: "Célébrité ⭐",
            difficulte1: "Signer un autographe à quelqu'un",
            difficulte2: "Convaincre 3 personnes que vous êtes une célébrité",
            difficulte3: "Organiser une conférence de presse improvisée"
        },
        {
            theme: "Mode 👗",
            difficulte1: "Porter un vêtement à l'envers toute la journée",
            difficulte2: "Échanger vos vêtements avec quelqu'un",
            difficulte3: "Organiser un défilé de mode improvisé dans un lieu public"
        },
        {
            theme: "Sport ⚽",
            difficulte1: "Faire 20 pompes en public",
            difficulte2: "Défier quelqu'un dans une compétition sportive et gagner",
            difficulte3: "Organiser un tournoi sportif improvisé avec au moins 8 participants"
        }
    ];

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

    tirerObjectifs(thematique: boolean): void {
        this.modeThematique = thematique;

        if (thematique) {
            const themeAleatoire = this.tirerAleatoire(this.objectifsThematiques);
            this.themeActuel = themeAleatoire.theme;
            this.objectifsTires = {
                difficulte1: themeAleatoire.difficulte1,
                difficulte2: themeAleatoire.difficulte2,
                difficulte3: themeAleatoire.difficulte3
            };
        } else {
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