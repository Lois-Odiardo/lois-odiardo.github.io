// everyone-john/everyone-john.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

            <button (click)="tirerObjectifs()" class="btn-tirer">
                {{ objectifsTires ? '🔄 Retirer les objectifs' : '🎲 Tirer les objectifs' }}
            </button>

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
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./everyone-john.component.css']
})
export class EveryoneJohnComponent {
    // Listes d'objectifs par difficulté (à remplacer par vos propres objectifs)
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

    objectifsTires: {
        difficulte1: string;
        difficulte2: string;
        difficulte3: string;
    } | null = null;

    tirerObjectifs(): void {
        this.objectifsTires = {
            difficulte1: this.tirerAleatoire(this.objectifsDifficulte1),
            difficulte2: this.tirerAleatoire(this.objectifsDifficulte2),
            difficulte3: this.tirerAleatoire(this.objectifsDifficulte3)
        };
    }

    private tirerAleatoire(liste: string[]): string {
        const index = Math.floor(Math.random() * liste.length);
        return liste[index];
    }
}