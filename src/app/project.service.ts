import { Injectable } from '@angular/core';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly baseUrl = '../assets';

  // Liste des projets SANS IDs manuels - ils seront générés automatiquement
  private projectsData: Omit<Project, 'id'>[] = [
    {
      name: 'Portfolio',
      technologie: 'Angular',
      state: 'En cours',
      photo: `${this.baseUrl}/angular.svg`,
      cadre: 'Personnel',
      description: "Réalisation d'un site pour présenter l'ensemble de mes travaux universitaires, personnels et professionnels",
      contribution: 'Ensemble du site',
      liens: ['https://github.com/Lois-Odiardo/lois-odiardo.github.io'],
      role: 'Développeur',
      cles: ["Réalisation d'un site web dans son intégralité", "Utilisation d'Angular pour une application moderne"],
      dateDebut: '2026-10',
      categorie: 'Personnel',
    },
    {
      name: 'Stage 2024-25',
      technologie: 'C#, WPF, Kotlin',
      state: 'Terminé',
      photo: `${this.baseUrl}/coralis_france_logo.jpg`,
      cadre: 'Stage BUT3',
      description: "Mise en place d'un système GPS-RTK sur une tablette Windows et téléphone Android.\n\nLes deux applications doivent permettre de réaliser la prise de point GPS via une interface et permettre de les exporter vers la suite logicielle de Coralis.",
      contribution: 'Réalisation de 2 applications utilisant un système RTK pour les solutions de Coralis',
      liens: ['https://www.coralis.com/'],
      role: 'Développeur',
      cles: ["Apprentissage C#, WPF et Kotlin", "Manipulation de données GPS", "Développement d'applications multiplateformes"],
      dateDebut: '2024-04',
      dateFin: '2024-09',
      categorie: 'Professionnel',
    },
    {
      name: 'Autocompletion Scala',
      technologie: 'Scala',
      state: 'Terminé',
      photo: `${this.baseUrl}/scala.png`,
      cadre: 'Projet de cours',
      description: "Réalisation d'une application d'autocompletion de texte dans un terminal de commande. Le système utilise un arbre de Trie pour stocker et rechercher efficacement les mots, avec une méthode d'apprentissage permettant d'améliorer les suggestions au fil du temps.",
      contribution: "Réalisation d'une méthode d'apprentissage et de Tri",
      liens: ['https://github.com/Lois-Odiardo/autocompletion-scala'],
      role: 'Développeur',
      cles: ["Développement d'un arbre de Trie", "Développement d'une méthode d'apprentissage", "Programmation fonctionnelle en Scala"],
      dateDebut: '2024-01',
      dateFin: '2024-03',
      categorie: 'Scolaire',
    },
    {
      name: 'Exige - New Front',
      technologie: 'PHP, Symfony',
      state: 'Terminé',
      photo: `${this.baseUrl}/symfony.webp`,
      cadre: 'SAE BUT3',
      description: "Projet de modernisation d'un logiciel existant dans un langage adapté et durable. L'objectif est de garantir sa compatibilité avec les matériels informatiques actuels et futurs.\n\nLe programme original, développé en Basic, limite son exploitation en raison de son incompatibilité avec les dernières avancées technologiques. La version développée lors de ce projet est sous Symfony.",
      contribution: "J'ai intégralement réalisé la gestion du projet. J'ai développé le fonctionnement de jeu de l'application.",
      liens: ["https://gitlabinfo.iutmontp.univ-montp2.fr/sae-racdv-a3/exige-symfony"],
      role: 'Développeur Fullstack',
      cles: ["Initialisation d'un système de jeu", "Création d'une base de données", "Migration d'un logiciel legacy vers une architecture moderne"],
      dateDebut: '2023-11',
      dateFin: '2024-01',
      categorie: 'Scolaire',
    },
    {
      name: 'Alternance LUNDI MATIN',
      technologie: 'PHP, JavaScript, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/LundiMatin.webp`,
      cadre: 'Alternance BUT3',
      description: "La société LUNDI MATIN est spécialisée dans le développement de logiciels de gestion en ligne et d'applications mobiles. Ses logiciels sont conçus pour répondre aux besoins des entreprises actives dans le secteur du commerce.\n\nDans le cadre de mon alternance, j'ai intégré l'équipe de maintenance, dont la mission principale est de garantir la stabilité et la performance des différents logiciels de l'entreprise.",
      contribution: "Ma mission a consisté en la résolution des bugs et des problèmes qui peuvent survenir lors des nouvelles versions ou des mises à jour des logiciels. Je suis intervenu notamment sur des tâches liées aux connecteurs EDI (Échange de Données Informatisé), qui permettent au logiciel phare de l'entreprise de communiquer efficacement avec les sites d'e-commerce existants.",
      liens: ['https://www.lundimatin.fr/'],
      role: "Développeur en maintenance",
      cles: ["Résolution de bugs informatiques", "Analyse de code", "Installation de connecteurs EDI chez les clients", "Travail en équipe Agile"],
      dateDebut: '2023-09',
      dateFin: '2024-08',
      categorie: 'Professionnel',
    },
    {
      name: 'E:cclesia',
      technologie: 'PHP, Symfony, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/ECCLESIA.webp`,
      cadre: 'SAE BUT2',
      description: "Travail de SAE réalisé durant mon semestre 4 au BUT informatique. L'objectif était de développer un site internet fonctionnant à la manière d'un système de questions-réponses type StackOverflow. Pour ce faire, nous devions appliquer les compétences acquises durant les cours de développement web et de gestion de projet. Les consignes de projet étaient l'utilisation du langage PHP avec Symfony, l'application de la méthode Agile SCRUM et le respect de la demande d'un client fictif.",
      contribution: "Dans le cadre de ce projet, j'ai été le Scrum Master. J'ai également développé certains des systèmes de vote présents sur l'application.",
      liens: ['https://github.com/Stellatsuu/SAE-Ecclesia'],
      role: 'Développeur et Scrum Master',
      cles: ["Intégration de code métier", "Gestion complète des utilisateurs (Inscription, Authentification sécurisée, Déconnexion)", "Coordination d'équipe en tant que Scrum Master"],
      dateDebut: '2023-01',
      dateFin: '2023-06',
      categorie: 'Scolaire',
    },
    {
      name: 'ISTower',
      technologie: 'Unity, C#, PHP',
      state: 'Terminé',
      photo: `${this.baseUrl}/ISTower.jpg`,
      cadre: 'Nuit de l\'info',
      description: "Projet réalisé en une nuit comprenant un site web de prévention aux IST et un jeu de type Tower Defense incorporant les notions abordées dans le site. L'objectif était de sensibiliser les étudiants aux infections sexuellement transmissibles de manière ludique et interactive.",
      contribution: "J'ai participé au game design du jeu ainsi qu'au développement du pathfinding des ennemis",
      liens: ['https://github.com/Rafiki13/nuit-de-l-info-2022'],
      role: 'Développeur Unity',
      cles: ["Réalisation d'un projet complet en une nuit", "Apprentissage rapide du moteur Unity", "Développement d'algorithmes de pathfinding"],
      dateDebut: '2022-12',
      dateFin: '2022-12',
      categorie: 'Scolaire',
    },
    {
      name: 'Nyavigator',
      technologie: 'PHP, JavaScript, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/nyavigator.webp`,
      cadre: 'SAE BUT2',
      description: "Travail de groupe réalisé dans le cadre d'une SAE pour mon 3ème semestre au BUT informatique. L'objectif de ce projet était d'optimiser le temps de réponse d'une application de calcul de trajet. Nous devions accélérer ses calculs et y ajouter des fonctionnalités afin de la rendre plus performante et conviviale. Pour ce faire, nous avons appliqué nos nouvelles compétences en JavaScript, bases de données ainsi que PHP.",
      contribution: "J'ai participé au développement de l'algorithme de recherche du chemin le plus court (Dijkstra). J'ai également participé à la programmation de la partie création de compte utilisateur.",
      liens: ['https://github.com/Stellatsuu/SAE-Nyavigator'],
      role: 'Développeur',
      cles: ["Création d'algorithme de recherche du chemin le plus court", "Gestion complète des utilisateurs (Inscription, Authentification sécurisée, Déconnexion)", "Optimisation de performances"],
      dateDebut: '2022-09',
      dateFin: '2022-12',
      categorie: 'Scolaire',
    },
    {
      name: 'Stage Netia',
      technologie: 'Angular, TypeScript',
      state: 'Terminé',
      photo: `${this.baseUrl}/netia.jpeg`,
      cadre: 'Stage DUT',
      description: "Durant ce stage, j'ai réalisé une librairie de notifications dont l'objectif est, une fois intégrée à un logiciel, de permettre aux utilisateurs de recevoir des messages d'erreur, informatifs ou bien de réussite. Ceci dans l'objectif de pouvoir gérer un système de messagerie sans pour autant bloquer les utilisateurs dans leurs usages des logiciels, permettant ainsi de ne pas avoir à interagir avec la notification pour retrouver l'accès au logiciel.",
      contribution: "J'ai pu réaliser l'intégralité de cette librairie",
      liens: ['https://netia.com/'],
      role: 'Développeur',
      cles: ["Réalisation d'une librairie réutilisable", "Apprentissage du framework Angular", "Développement de composants UI non-bloquants"],
      dateDebut: '2022-04',
      dateFin: '2022-06',
      categorie: 'Professionnel',
    },
    {
      name: 'Nautilus Rush',
      technologie: 'Unity, C#',
      state: 'Terminé',
      photo: `${this.baseUrl}/nautilusRush.webp`,
      cadre: 'Game Jam',
      description: "L'objectif est de réaliser un jeu vidéo en 30h dans le cadre de la Code Game Jam - 6ème édition. La réalisation de ce jeu a été faite en groupe de 6 personnes. Cela nous a permis de travailler la cohésion de groupe sur une période restreinte et stressante. Cela a également permis l'usage de nouvelles technologies telles que Unity et le langage C#. Le jeu est un runner sous-marin où le joueur doit éviter des obstacles.",
      contribution: "Dans le cadre de ce projet, j'ai été le Scrum Master. J'ai également développé la gestion des collisions du jeu.",
      liens: ["https://doxah.itch.io/nautilus-rush"],
      role: 'Développeur et Scrum Master',
      cles: ["Réalisation d'un projet complet en 30h", "Gestion de groupe sous pression", "Développement de systèmes de collision", "Organisation Agile en temps limité"],
      dateDebut: '2023-02',
      dateFin: '2023-02',
      categorie: 'Scolaire',
    },
    {
      name: 'Les Aventuriers du Rail',
      technologie: 'Java, JavaFX',
      state: 'Terminé',
      photo: `${this.baseUrl}/aventuriers.webp`,
      cadre: 'SAE BUT1',
      description: "Travail de SAE réalisé durant mon semestre 2 au BUT informatique, réalisé en groupe de 2 étudiants. L'objectif de ce projet est triple. Tout d'abord développer la jouabilité du jeu de plateau 'Les Aventuriers du Rail'. Pour ce faire, nous avons implémenté l'ensemble des règles, situations et éléments de jeu dans le programme. Ensuite nous avons développé la partie interface graphique, avec la contrainte de la réaliser en JavaFX et de la rendre interactive. Enfin, le dernier objectif concernait l'intégration d'une règle en particulier : le joueur ayant la route la plus longue gagne des points supplémentaires. Ce dernier objectif a permis d'introduire la notion de graphe au projet.",
      contribution: "Dans le cadre de ce projet, nous avons équitablement réparti les tâches et nous avons tous deux touché à chaque partie nécessaire pour remplir l'objectif.",
      liens: ['https://github.com/A1-SAEs/aventuriers-du-rail'],
      role: 'Développeur',
      cles: ["Adaptation d'un jeu de plateau en solution informatique", "Réalisation d'une interface graphique interactive", "Implémentation d'un algorithme de graphe permettant la recherche du chemin le plus long", "Programmation orientée objet en Java"],
      dateDebut: '2022-03',
      dateFin: '2022-05',
      categorie: 'Scolaire',
    },
    {
      name: 'Random Anime Selector',
      technologie: 'Angular, TypeScript, API MyAnimeList',
      state: 'Terminé',
      photo: `${this.baseUrl}/anime-selector.png`,
      cadre: 'Personnel',
      description: "Application web permettant de sélectionner aléatoirement un anime depuis ma liste 'Plan to Watch' sur MyAnimeList. L'application utilise l'API officielle de MyAnimeList pour récupérer la liste des animes en attente de visionnage de mon compte et en affiche un au hasard avec ses informations détaillées (genres, nombre d'épisodes, saisons précédentes, etc.).",
      contribution: "Développement complet de l'application incluant l'intégration de l'API MyAnimeList, la gestion des requêtes CORS via un proxy, l'animation des transitions, et la création d'une interface utilisateur colorée et interactive.",
      liens: ['https://lois-odiardo.github.io/random-anime'],
      role: 'Développeur',
      cles: ["Intégration d'API REST externe", "Gestion des requêtes HTTP avec CORS", "Animations Angular"],
      dateDebut: '2025-01',
      dateFin: '2025-01',
      categorie: 'Personnel',
    },
    {
      name: 'Everyone is John - Générateur',
      technologie: 'Angular, TypeScript',
      state: 'Terminé',
      photo: `${this.baseUrl}/EVERYONE_IS_JOHN.jpg`,
      cadre: 'Personnel',
      description: "Générateur d'objectifs aléatoires pour le jeu de rôle 'Everyone is John'. L'application propose deux modes de jeu : un mode aléatoire qui génère 3 objectifs de difficulté croissante, et un mode thématique qui tire un ensemble d'objectifs cohérents autour d'un thème (cirque, espionnage, cuisine, etc.). Les joueurs peuvent changer leurs objectifs selon des règles spécifiques à chaque mode.",
      contribution: "Conception et développement complet de l'application, création de la logique de génération aléatoire, implémentation des règles de changement d'objectifs, et design d'une interface colorée et ludique avec animations CSS.",
      liens: ['https://lois-odiardo.github.io/everyone-john'],
      role: 'Développeur',
      cles: ["Développement d'une application à objectif ludique", "Gestion d'état et de logique de jeu", "Design CSS avancé avec animations", "Expérience utilisateur interactive"],
      dateDebut: '2025-01',
      dateFin: '2025-01',
      categorie: 'Personnel',
    },
  ];

  protected projectList: Project[] = [];

  constructor() {
    // Trier par date décroissante (plus récent d'abord) et assigner des IDs
    this.projectList = this.projectsData
        .sort((a, b) => {
          const dateA = a.dateFin || a.dateDebut;
          const dateB = b.dateFin || b.dateDebut;
          return dateB.localeCompare(dateA);
        })
        .map((project, index) => ({
          ...project,
          id: index
        }));
  }

  getAllProjects(): Project[] {
    return this.projectList;
  }

  getProjectById(id: number): Project | undefined {
    return this.projectList.find((project) => project.id === id);
  }

  // Filtrer par catégorie
  getProjectsByCategory(category: string): Project[] {
    return this.projectList.filter(project => project.cadre === category);
  }

  // Filtrer par état
  getProjectsByState(state: string): Project[] {
    return this.projectList.filter(project => project.state === state);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
        `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}