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
      description: "Réalisation d'un site pour présenter l'ensemble de mes travaux universitaires et professionnels",
      contribution: 'Ensemble du site',
      liens: ['https://github.com/Lois-Odiardo/lois-odiardo.github.io'],
      role:'Développeur',
      cles:["Réalisation d'un site web dans son intégralité"],
    },
    {
      id: 1,
      name: 'Stage 2024-25',
      technologie: 'C#, WPF, Kotlin',
      state: 'En cours',
      photo: `${this.baseUrl}/coralis_france_logo.jpg`,
      cadre: 'Stage BUT3',
      description: 'Mise en place d\'un système GPS-RTK sur une tablette Windows et téléphone Android'+
          '\n' +
          'Les deux applications doivent permettre de réaliser la prise de point GPS via une interface et permettre de les exporter vers la suite logicielle de Coralis',
      contribution: 'Réalisation de 2 applications utilisant un système RTK pour les solutions de Coralis',
      liens: ['https://www.coralis.com/'],
      role:'Développeur',
      cles:["Apprentissage C#, WPF et Kotlin","Manipulation de données gps"],
    },
    {
      id: 2,
      name: 'Autocompletion scala',
      technologie: 'Scala',
      state: 'Terminé',
      photo: `${this.baseUrl}/scala.png`,
      cadre: 'Projet de cours',
      description: 'Réalisation d\'une application d\'autocompletion de texte dans un terminal de commande',
      contribution: 'Réalisation d\'une méthode d\'apprentissage et de Tri',
      liens: ['https://github.com/Lois-Odiardo/autocompletion-scala'],
      role:'Développeur',
      cles:["Développement d'un arbre de Trie","Développement d'un méthode d'apprentissage"],
    },
    {
      id: 3,
      name: 'Exige - New front',
      technologie: 'PHP, Symfony, Basic',
      state: 'Terminé',
      photo: `${this.baseUrl}/symfony.webp`,
      cadre: 'SAE - BUT3',
      description: 'Projet de modernisation d\'un logiciel existant dans un langage adapté et durable. L\'objectif est de garantir sa compatibilité avec les matériels informatiques actuels et futurs.\n' +
          '\n' +
          'Le programme original, développé en Basic, limite son exploitation en raison de son incompatibilité avec les dernières avancées technologiques. La version développée lors de ce projet est sous symfony.',
      contribution: 'J\'ai intégralement réalisé la gestion du projet. J\'ai développé le fonctionnement de jeu de l\'application.',
      liens: ["https://gitlabinfo.iutmontp.univ-montp2.fr/sae-racdv-a3/exige-symfony"],
      role:'Développeur Fullstack',
      cles:['Initialisation d\'un système de jeu','Création d\'une base de donnée'],
    },
    {
      id: 4,
      name: 'Alternance 2023-24',
      technologie: 'PHP, Javascript, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/LundiMatin.webp`,
      cadre: 'Alternance BUT3',
      description: 'La société LUNDI MATIN est spécialisée dans le développement de logiciels de gestion en ligne et d’applications mobiles. Ses logiciels sont conçus pour répondre aux besoins des entreprises actives dans le secteur du commerce.\n' +
          '\n' +
          'Dans le cadre de mon alternance, j’ai intégré l’équipe de maintenance, dont la mission principale est de garantir la stabilité et la performance des différents logiciels de l’entreprise.',
      contribution: 'Ma mission a consisté en la résolution des bugs et des problèmes qui peuvent survenir lors des nouvelles versions ou des mises à jour des logiciels. Je suis intervenu notamment sur des tâches liées aux connecteurs EDI (Échange de Données Informatisé), qui permettent au logiciel phare de l’entreprise, de communiquer efficacement avec les sites d’e-commerce existants.',
      liens: ['https://www.lundimatin.fr/'],
      role:'Membre de l\'équipe de maintenance informatique de LUNDI MATIN',
      cles:["Résolution de bugs informatiques","Analyse de code","Installation de connecteurs chez les clients"],
    },
    {
      id: 5,
      name: 'ISTower',
      technologie: 'Unity, PHP',
      state: 'Terminé',
      photo: `${this.baseUrl}/ISTower.jpg`,
      cadre: 'Nuit de l\'info 2022',
      description: 'Projet réalisé en une nuit comprenant un site web de prévention aux IST et un jeu de type Tower défense incorporant les notions abordées dans le site.',
      contribution: "J'ai participé au game design du jeu ainsi qu'au développement de path-finding des ennemies",
      liens: ['https://github.com/Rafiki13/nuit-de-l-info-2022'],
      role:'Développeur Unity',
      cles:['Réalisation d\'un projet en une nuit','Apprentissage du langage Unity'],
    },
    {
      id: 6,
      name: 'E:cclesia',
      technologie: 'PHP Symphony, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/ECCLESIA.webp`,
      cadre: 'SAE du semestre 4 de BUT',
      description: 'Travail de SAE réalisé durant mon semestre 4 au BUT informatique. L\'objectif était de développer un site internet fonctionnant à la manière d\'un "question réponse". Pour ce faire, nous devions appliquer les compétences acquises durant les cours de développement web et de gestion de projet. Les consignes de projet étaient l\'utilisation du langage PHP, l\'application de la méthode Agiles SCRUM et le respect de la demande d\'un client fictif.',
      contribution: "Dans le cadre de ce projet, j'ai été le Scrum Master. J'ai également développé certains des systèmes de vote présents sur l'application.",
      liens: ['https://github.com/Stellatsuu/SAE-Ecclesia'],
      role:'Développeur et Scrum Master',
      cles:["Integration de code métier","Gestion complète des utilisateurs (Inscription, Authentification sécurisée, Déconnexion)"],
    },
    {
      id: 7,
      name: 'Netia',
      technologie: 'Angular',
      state: 'Terminé',
      photo: `${this.baseUrl}/netia.jpeg`,
      cadre: 'Stage DUT',
      description: 'Durant ce stage, j\'ai réalisé une librairie de notification dont l’objectif est, une fois intégré à un logiciel, de permettre aux utilisateurs de recevoir des messages d’erreur, informatif ou bien de réussite. Ceci dans l’objectif de pouvoir gérer un système de messagerie sans pour autant bloquer les utilisateurs dans leurs usages des logiciels permettant ainsi de ne pas avoir à interagir avec la notification pour retrouver l’accès au logiciel.',
      contribution: "J'ai pu réaliser l'entièrté de cette librairie",
      liens: ['https://netia.com/'],
      role:'Développeur',
      cles:["Réalisation d'une librairie","Apprentissage du langage Angular"],
    },
    {
      id: 8,
      name: 'Nautilus Rush',
      technologie: 'C#',
      state: 'Terminé',
      photo: `${this.baseUrl}/nautilusRush.webp`,
      cadre: 'Code game jam 6ème édition',
      description: "L'objectif est de réaliser un jeu en 30h dans le cadre de la Code Game Jam - 6ème édition. La réalisation de ce jeu a été faite en groupe de 6 personnes. Cela nous a permis de travailler la cohésion de groupe sur un période restreinte et stressante. Cela a également permis l'usage de nouvelles technologies telles que Unity et le langage C#.",
      contribution: "Dans le cadre de ce projet, j'ai été le Scrum Master. J'ai également développé la gestion des colisions du jeu.",
      liens: ["https://doxah.itch.io/nautilus-rush"],
      role:'Développeur et Scrum Master',
      cles:['Réalisation d\'un projet en 30h','Gestion de groupe'],
    },
    {
      id: 9,
      name: 'Nyavigator',
      technologie: 'PHP, SQL',
      state: 'Terminé',
      photo: `${this.baseUrl}/nyavigator.webp`,
      cadre: 'SAE du semestre 3 de BUT',
      description: 'Travail de groupe réalisé dans le cadre d\'une SAE pour mon 3ème semestre au BUT informatique. L\'objectif de ce projet était d\'optimiser le temps de réponse d\'une application de calcul de trajet. Nous devions accélérer ses calculs et y ajouter des fonctionnalité afin de la rendre plus performante et conviviale. Pour ce faire, nous avons appliqué nos nouvelles compétences en JS, base de donnée ainsi que PHP.',
      contribution: "J'ai participé au développement de l'algorithme de recherche de chemin le plus court. J'ai également participé à la programmation de la partie création de compte utilisateur.",
      liens: ['https://github.com/Stellatsuu/SAE-Ecclesia'],
      role:'Développeur et Scrum Master',
      cles:["Création d'algorithme de recherche de chemin le plus court","Gestion complète des utilisateurs (Inscription, Authentification sécurisée, Déconnexion)"],
    },
    {
      id: 10,
      name: 'Les aventuriers du rails',
      technologie: 'Java, JavaFX',
      state: 'Terminé',
      photo: `${this.baseUrl}/aventuriers.webp`,
      cadre: 'SAE du semestre 2 de BUT',
      description: 'Travail de SAE réalisé durant mon semestre 2 au BUT informatique, réalisé en groupe de 2 étudiants. L\'objectif de ce projet est triple. Tout d\'abord développer la jouabilité du jeu. Pour ce faire, nous avons implémenté l\'ensemble des règles, situations et éléments de jeu dans le programme. Ensuite nous avons développé la partie interface graphique, avec les contraintre de la réaliser en javaFX et de la rendre interactive. Enfin, le dernier objectif concernait l\'intégration d\'une règle en particulier : le joueur ayant la route la plus longue gagne des points supplémentaires. Ce dernier objectif a permis d\'introduire la notion de graphe au projet.',
      contribution: "Dans le cadre de ce projet, nous avons équitablement réparti les tâches et nous avons tous deux touché à chaque partie nécessaire pour remplir l'objectif.",
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
