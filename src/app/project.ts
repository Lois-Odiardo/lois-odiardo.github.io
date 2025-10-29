export interface Project {
    id: number;
    name: string;
    cadre: string;
    state: string;
    photo: string;
    role: string;
    technologie: string;
    description: string;
    contribution: string;
    liens: string[];
    cles: string[];
    dateDebut: string; // Format: 'YYYY-MM' pour trier chronologiquement
    dateFin?: string; // Optionnel, pour les projets en cours
    categorie: 'Universitaires' | 'Professionnels' | 'Personnels'; // Catégorie du projet
}