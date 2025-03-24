import { Injectable } from '@angular/core';
import {Project} from './project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly baseUrl = '../assets';
  protected projectList: Project[] = [
    {
      id: 0,
      name: 'Portfolio',
      technologie: 'Angular2',
      state: 'En cours',
      photo: `${this.baseUrl}/angular.svg`,
      cadre: 'Personnel',
      description: "Réalisation d'un site pour présenter l'ensemble de mes travaux dans le modne de l'informatique.",
      contribution: 'Ensemble du site',
      liens: ['https://github.com/Lois-Odiardo/lois-odiardo.github.io'],
      role:'développeur',
      cles:["Réalisation d'un site web dans son intégralité"],
    },
    {
      id: 1,
      name: 'Autocompletion scala',
      technologie: 'Scala',
      state: 'En cours',
      photo: `${this.baseUrl}/scala.png`,
      cadre: 'Projet de cours',
      description: 'Ce projet conciste en la réalisation d\'une application d\'autocompletion de texte.',
      contribution: 'Ce projet est en bînome, je réalise donc 50% du travail de ce dernier.',
      liens: ['https://github.com/Lois-Odiardo/autocompletion-scala'],
      role:'Développeur',
      cles:["Développement d'un arbre de Trie","Développement d'un méthode d'apprentissage"],
    },
    {
      id: 2,
      name: 'Exige - New front',
      technologie: 'PHP, Symfony, Basic',
      state: 'Terminé',
      photo: `${this.baseUrl}/symfony.webp`,
      cadre: 'SAE - BUT3',
      description: 'Projet de modernisation dun logiciel existant en le recodant dans un langage adapté et durable, garantissant sa compatibilité avec les matériels informatiques actuels et futurs.\n' +
          '\n' +
          'Le programme original, développé en Basic, limite son exploitation en raison de son incompatibilité avec les avancées technologiques récentes. La version développé lors de ce projet est sous symfony',
      contribution: 'J\'ai participé de manière intégrale à la gestion de projet et  ait développé le fonctionnement de jeu de l\'application',
      liens: ["https://gitlabinfo.iutmontp.univ-montp2.fr/sae-racdv-a3/exige-symfony"],
      role:'Développeur Fullstack',
      cles:['Initialisation d\'un système de jeu','Création d\'une base de donnée'],
    },
    {
      id: 3,
      name: 'Alternance 2023-24',
      technologie: 'PHP, Javascript, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/LundiMatin.webp`,
      cadre: 'Alternance BUT3',
      description: 'La société Lundi Matin est spécialisée dans le développement de logiciels de gestion en ligne et d’applications mobiles, conçus pour répondre aux besoins des entreprises actives dans le secteur du commerce.\n' +
          '\n' +
          'Dans le cadre de mon alternance, j’ai intégré l’équipe de maintenance, dont la mission principale est de garantir la stabilité et la performance des différents logiciels de l’entreprise.',
      contribution: 'Ma mission a consisté en contribuer à la résolution des bugs et des problèmes qui peuvent survenir lors des nouvelles versions ou des mises à jour des logiciels. J\'ai intervenu notamment sur des tâches liées aux connecteurs EDI (Échange de Données Informatisé), qui permettent au logiciel phare de l’entreprise, LundiMatinBusiness, de communiquer efficacement avec les sites d’e-commerce existants.',
      liens: ['https://www.lundimatin.fr/'],
      role:'Membre de l\'équipe de maintenance informatique de Lundi Matin',
      cles:["Résolution de bug informatique","Analyse de code","Installation de connecteur chez les clients"],
    },
    {
      id: 4,
      name: 'ISTower',
      technologie: 'Unity, PHP',
      state: 'Terminé',
      photo: `${this.baseUrl}/ISTower.jpg`,
      cadre: 'Nuit de l\'info 2022',
      description: 'Projet réalisé en une nuit comprenant un site web de prévention aux IST et un jeu de type Tower défense incorporant les notions abordées dans le site.',
      contribution: "J'ai participé au game design du jeu ainsi qu'au développement de path-finding des ennemies",
      liens: ['https://github.com/Rafiki13/nuit-de-l-info-2022'],
      role:'Dévelppeur Unity',
      cles:['Réalisation d\'un projet en une nuit','Apprentissage du langage Unity'],
    },
    {
      id: 5,
      name: 'E:cclesia',
      technologie: 'PHP Symphony, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/ECCLESIA.webp`,
      cadre: 'SAE du semestre 5 de BUT',
      description: 'Travail de SAE réalisé durant mon semestre 3 au BUT informatique, l\'objectif était de développer un site internet fonctionnant à la manière d\'un question réponse. Nous devions appliquer nos compétences acquises durant les cours de développement web et de gestion de projet, notamment en utilisant le langage PHP mais aussi en appliquant la méthode Agiles SCRUM et en respectant la demande d\'un client fictif.',
      contribution: "J'ai développé certains des systèmes de vote présent sur l'application et également été le Scrum Master de  ce projet",
      liens: ['https://github.com/Stellatsuu/SAE-Ecclesia'],
      role:'Développeur et Scrum Master',
      cles:["Integration de code métier","Gestion complète des utilisateurs (inscription, authentification sécurisée, déconnexion)"],
    },
    {
      id: 6,
      name: 'Nautilus Rush',
      technologie: 'C#',
      state: 'Terminé',
      photo: `${this.baseUrl}/nautilusRush.webp`,
      cadre: 'Code game jam 6ème édition',
      description: 'Réalisé durant la Code Game Jam - 6 ème édition. Il s\'agit d\'un évènement ayant pour objectif de réaliser un jeu vidéo en 30h. Nous avons réalisé ce jeu en groupe de 6, cela nous as permis de travailler notre cohésion de groupe dans une période restreinte et également l\'usage de nouvelles technologie tel que Unity et le langage C#.',
      contribution: "J'ai participé à ce projet en développant les colisions du jeu et en prenant le rôle de Scrum Master",
      liens: ["https://doxah.itch.io/nautilus-rush"],
      role:'string',
      cles:['Réalisation d\'un projet en 30h'],
    },
    {
      id: 7,
      name: 'Nyavigator',
      technologie: 'PHP, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/nyavigator.webp`,
      cadre: 'SAE du semestre 3 de BUT',
      description: 'Travail de groupe réalisé dans le cadre d\'une SAE pour mon 4ème semestre au BUT informatique. L\'objectif de ce projet était d\'optimiser une application de calcul de trajet. Nous devions accélérer ses calculs et y ajouter des fonctionnalité afin de la rendre plus performante et intéressante à utiliser. Pour ce faire nous avons appliqués nous nouvelles compétences en JS, base de donnée ainsi que PHP.',
      contribution: "J'ai participé au développement de l'alogrithme de recherche de chemin le plus court ainsi qu'à la création de compte utilisateur",
      liens: ['https://github.com/Stellatsuu/SAE-Ecclesia'],
      role:'Développeur et Scrum Master',
      cles:["Création d'algorithme de recherche de chemin le plus court","Gestion complète des utilisateurs (inscription, authentification sécurisée, déconnexion)"],
    },
    {
      id: 8,
      name: 'Les aventuriers du rails',
      technologie: 'Java, JavaFX',
      state: 'Terminé',
      photo: `${this.baseUrl}/aventuriers.webp`,
      cadre: 'SAE du semestre 3 de BUT',
      description: 'Réalisé en groupe de 2 dans le cadre du troisième semestre de mon BUT informatique, l\'objectif de ce projet était divisé en 3 parties. Tout d\'abord réaliser les différents méthodes permettant de jouer à une partie d\'aventurier du rail, nous avons donc implémenté l\'ensemble des règles, situations et élément de jeu dans notre programme. La deuxième partie concernait l\'interface graphique, nous devions la réaliser en javaFX et la rendre interactive. Et enfin la dernière partie concernait une règle en particulier, le joueur ayant la route la plus longue gagne des points supplémentaires, nous avons donc introduit la notion de graphe à notre projet.',
      contribution: "J'ai participé à 50% à la réalisation de ce projet",
      liens: ['https://github.com/A1-SAEs/aventuriers-du-rail'],
      role:'Développeur',
      cles:["Adaptation d'un jeu en solution informatique","Réalisation d'une interface graphique intéractive","Implémentation d'un algorithme de graphe permettant la recherche du chemin le plus long"],
    },
  ];
  getAllProjects(): Project[] {
    return this.projectList;
  }
  getProjectById(id: number): Project | undefined {
    return this.projectList.find((project) => project.id === id);
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
        `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
