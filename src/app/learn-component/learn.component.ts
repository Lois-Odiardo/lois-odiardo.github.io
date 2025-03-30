import {Component, inject, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-learn-component',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section>
      <span class="blue">Partie Réaliser :</span>
      <br><strong>AC 1 : </strong>Choisir et implémenter des architectures adaptées
      <br><br>
      <p>Le choix du langage pour la réalisation de mon portfolio s'est porté sur Angular.</p>
      <p>L'objectif est de pouvoir séparer les données, le visuel et les actions de mon site.</p>
      <p>Chaque fonctionnalité présente sur le site est découpée en composants réutilisables.</p>
      <p>La logique métier est déléguée aux différents services qui sont créés et injectés dans les composants.</p>
      <p>La séparation des responsabilités entre les composants et les services permet deux choses : optimiser les performances du site, rendre mon portfolio facilement extensible.</p>
      <br>
      <div class="image-container img-group-1">
        <img src="assets/projet1.png" alt="Photo de projet">
        <img src="assets/projet2.png" alt="Photo de projet">
      </div>
     
      <div>
        <button class="button" onclick="location.href='/details/0'">Portfolio</button>
      </div><br>

      <br><strong>AC 2 : </strong>Faire évoluer une application existante
      <br><br>
      <p>Cet apprentissage critique a été vu entre autre lors de ma SAE de 3ème année de BUT dont le sujet était l'évolution de l'application Exige.</p>
      <p>Exige est un logiciel éducatif de simulation de gestion d'entreprise en équipe.</p>
      <p>Une fois cette application lancée, elle utilisait l'invite de commande comme interface.</p>
      <p>L'enseignant devait renseigner pour l'ensemble des élèves toutes les informations nécessaires au bon fonctionnement du logiciel</p>
      <p>L'évolution de l'application a consisté en la création d'un nouvel affichage ainsi que la révision de son fonctionnement.</p>
      <p>L'objectif était de rendre son utilisation plus agréable et répondre aux besoins des utilisateurs.</p>
      <p> Pour se faire, nous avons réalisé une application web sous Symfony, permettant à chaque étudiant de remplir ses propres informations, réduisant ainsi les contraintes de l'enseignant pour l'utilisation d'Exige.</p>
      <br>
      <div class="image-container img-group-3">
        <img src="assets/exige2.png" alt="Photo d'exige">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - new front</button>
      </div><br>

      <br><strong>AC 3 : </strong>Intégrer des solutions dans un environnement de production
      <br><br>
      <p>Lors de mon stage de BUT 2, j'ai eu pour mission de réaliser une librairie de notifications sous Angular.</p>
      <p>Ce projet m'a permis de mettre en place un processus complet d'intégration en production.</p>
      <p>J'ai conçu et développé cette librairie en veillant à deux aspects : assurer son opérabilité avec les logiciels existants, mais également rendre cette librairie facilement déployable.</p>
      <br>
      <div class="image-container img-group-2">
        <img src="assets/librairie.png" alt="Photo d'utilisation de librairie">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/6'">Stage 2022-23</button>
      </div><br>

      <span class="blue">Partie Optimiser :</span>
      <br><strong>AC 4 : </strong>Anticiper les résultats de diverses métriques
      <br><br>
      <p>Cet apprentissage critique a été vu entre autre lors de ma SAE Nyavigator de 2ème année de BUT.</p>
      <p>Le sujet était de chercher le chemin le plus court entre deux villes en France avec un temps d'exécution le plus court possible.</p>
      <p>Pour mesurer le temps d'exécution de notre code de recherche du chemin le plus court, j'ai utilisé le logiciel XDebug.</p>
      <p>J'ai procédé à plusieurs itérations en jouant sur des parcours plus ou moins longs, ce qui a permis d'évaluer le temps de réponse sur différentes distances.</p>
      <p>C'est grâce à cette méthode que j'ai identifié les améliorations nécessaires pour réduire les temps d'exécution.</p>
      <p>Par cette approche, il m'a été possible de prévoir les effets des modifications apportées sur l'application et de garantir une amélioration continue des performances du projet.</p>
      <br>
      <div class="image-container img-group-3">
        <img src="assets/nyavigator.png" alt="Photo d'utilisation de nyavigator">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/8'">Nyavigator</button>
      </div><br>

      <br><strong>AC 5 : </strong>Profiler, analyser et justifier le comportement d’un code existant
      <br><br>
      <p>Cet apprentissage critique a été vu entre autre lors de ma SAE Nyavigator de 2ème année de BUT.</p>
      <p>Le sujet était de chercher le chemin le plus court entre deux villes en France avec un temps d'exécution le plus court possible.</p>
      <p>Pour chercher le chemin le plus court, j'ai utilisé plusieurs algorithmes.</p>
      <p>J'ai initialement implémenté l’algorithme de Dijkstra. Cet algorithme recherche les voisins d'un point en largeur dans un graphe non orienté à partir de ce point.</p>
      <p>Ainsi, une représentation de cette méthode de recherche serait un cercle, partant du point de départ, dont on augmente graduellement le rayon. Cette solution est acceptable dans la plupart des cas.</p>
      <p>Le profilage de cette solution montre que l'on peut y apporter des améliorations.</p>
      <br>
      <div class="image-container img-group-4">
        <img src="assets/Dijkstra.gif" alt="Gif algorithme Dijkstra">
      </div>
      <p>La première amélioration a consisté à implémenter l’algorithme A*.</p>
      <p>Cet algorithme modifie l’évaluation des distances sur le graphe en additionnant un paramètre, nommé heuristique, à la somme des distances des arrêtes.</p>
      <p>Une représentation de cette méthode de recherche serait le vol d'un oiseau en direction d'une cible qu'il ne perdrait pas de vue en cas d'obstacle.</p>
      <p>A* s'étend donc en ligne droite, élargie son champ d'action si elle rencontre l'équivalent d'une butée, puis reprend le vol d'oiseau lorsque la butée est passée.</p>
      <p>A* est donc intrasectement plus efficace que Dijkstra.</p>
      <p>Il n'en reste pas moins que l'algorithme A* peut être optimisé car il continue à chercher le chemin le plus court dans plusieurs directions simultanées.</p>
      <div class="image-container img-group-4">
        <img src="assets/Astar.gif" alt="Gif algorithme A*">
      </div>
      
      <p>La seconde amélioration a consisté à agir sur le paramètre heuristique de A*.</p>
      <p>Pour réaliser cette optimisation, on a choisi d'utiliser WA*. Cet algorithme introduit un coefficient, appelé poids, à l'heuristique. Cette méthode simule la notion de priorité aux trajets directs.</p>
      <p>L'algorithme WA*, revient à faire un compromis entre précision de calcul et vitesse d'exécution de celui-ci.</p>
      <div class="image-container img-group-4">
        <img src="assets/WAstar.gif" alt="Gif algorithme WA*">
      </div>
      <p>Le profilage, l'analyse du code à chaque étape, et le choix de paramètre adéquat ont permis d'optimiser le développement et d'obtenir un résultat répondant au cahier des charges.</p>
      <br>
      <div>
        <button class="button" onclick="location.href='/details/8'">Nyavigator</button>
      </div><br>

      <br><strong>AC 6 : </strong>Choisir et utiliser des bibliothèques dédiées au domaine d’application
      <br><br>
      <p>Cet apprentissage critique a été vu au travers des différents projets tout au long du BUT.</p>
      <p>Les bibliothèques sont des outils d'aide au développement que j'ai été ammené à choisir et utiliser pour développer des solutions adaptées aux besoins spécifiques de mes différents projets.</p>
      <br>
      <p>A titre d'exemple, parmis ces bibliothèques, nous pouvons retrouver Doctrine et Twig :</p>
      <br>
      <p>Doctrine m'a permis d'interagir avec la base de données de l'un de mes projets de manière efficace et sécurisée. Il m'a permis de mettre en oeuvre des relations entre entités (ManyToMany, OneToMany, etc...). J'ai également utilisé Doctrine pour réaliser des migrations afin de gérer l'évolution de ma base de données sans perte de données.</p>
      <br>
      <p>Twig m'a permis de structurer les différentes vues de mon projet en séparant distinctement la logique métier et le rendu visuel grâce à ses fonctionnalité d'héritage, de filtres et d'extensions.</p>
      <br>
      <div class="image-container img-group-3">
        <img src="assets/twig.png" alt="Image d'utilisation de Twig">
        <img src="assets/the_feed.png" alt="Image de The feed">
      </div>
      <br>
      <p>Grâce à cette expérience, j'ai acquis la capacité d'analyse pour choisir les bibliothèques les plus adaptées ainsi que maîtriser leur intégration.</p>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - new front</button>
      </div><br>

      <span class="blue">Partie Collaborer :</span>
      <br><strong>AC 7 : </strong>Organiser et partager une veille numérique
      <br><br>
      <p>Dans le cadre de mes cours de communication, j'ai été ammené à réaliser une veille informationnelle et à la partager à mes camarades de classe.</p>
      <p>Pour cela, j'ai utilisé un agrégateur de flux RSS pour suivre les publications de plusieurs sites de presse dans le domaine de la tech.</p>
      <p>Cette restitution de veille informationnelle a pu se faire grâce à l'agrégateur de flux RSS mais également par la recherche dans des bases de données de presse via des moteurs de recherche dédiés.</p>
      <br>
      <div class="image-container img-group-5">
        <img src="assets/veille.png" alt="Image agrégateur">
      </div>
      <br>
      <br><strong>AC 8 : </strong>Identifier les enjeux de l’économie de l’innovation numérique
      <br><br>
      <p>Cet apprentissage critique a été vu au travers de mon alternance au sein de la société LUNDI MATIN.</p>
      <p>Cette société édite un ERP nommé “LundiMatinBusiness”.</p>
      <br>
      <div class="image-container img-group-6">
        <img src="assets/lundimatin-business.svg" alt="Image lm">
      </div>
      <br>
      <p>Un système ERP (Enterprise resource planning) est un logiciel que les entreprises utilisent pour gérer leurs activités quotidiennes telles que la comptabilité, les achats, la gestion de projets, la gestion des risques, la conformité, ainsi que les opérations de supply chain.</p>
      <p>De nos jours, un ERP est une solution informatisée globale et intégrée en entreprise. Mais cela n’a pas toujours été le cas. D’une gestion papier en passant par des tableurs pilotés manuellement, l’économie fonctionnait au rythme de l’homme.</p>
      <p>L’innovation numérique a totalement changé le concept de gestion, tout est intégré, tout est accessible en temps réel. Les nouveaux ERP intègrent du prédictif permettant de prendre des décisions stratégiques.</p>
      <p>Ma fonction de maintenancier au sein des équipes de LundiMatinBusiness chez LUNDI MATIN m’a permis d’être un intervenant actif de la digitalisation de la gestion d’entreprise.</p>
      
      <br>
      <div>
        <button class="button" onclick="location.href='/details/3'">Alternance 2023-24</button>
      </div><br>

      <br><strong>AC 9 : </strong>Guider la conduite du changement informatique au sein d’une organisation
      <br><br>
      <p>Lors de mon alternance chez LUNDI MATIN, j'ai réalisé une analyse critique de son environnement technique. En procédant à la manière d'un audit, j'ai pu faire des suggestions d'amélioration.</p>
        <br>
      <div class="image-container img-group-7">
        <img src="assets/LundiMatin.webp" alt="image lm">
      </div>
        <br>
      <p>Les logiciels développés chez LUNDI MATIN sont soumis à de nombreux « tests unitaires » et « tests utilisateurs », permettant de s’assurer du bon fonctionnement de ces derniers. Ainsi, lorsqu’une fonctionnalité nouvellement réalisée vient à ne pas passer les tests, elle est immédiatement envoyée à la maintenance pour analyse du bug et développement du correctif.</p>
      <p>Ce fonctionnement tend à passer la charge de contrôle du développeur vers le maintenancier.</p>
      <br>
      <p>L’amélioration que j’ai proposée, dans le cadre de cette alternance et présentée en soutenance, est de faire réaliser une partie des tests par le développeur comme travail préparatoire avant mise en production.</p>
      <br>
      <p>La réalisation de tests fonctionnels par les développeurs permettrait d’augmenter la qualité de développement qui part en production. Elle allégerait l'activité des équipes de maintenance et permettrait par conséquent une charge de travail plus équilibrée. Il en résulterait moins de bug chez les clients.</p>
      <br>
      <p>Ma première étape, pour diminuer le nombre de bugs “simples” chez les maintenanciers, a été de rajouter une étape de tests fonctionnels chez les développeurs.</p>
      <p>Dans un second temps, j’ai proposé de détacher un membre de l’équipe maintenance pour aller seconder l’équipe dev dans le cadre de pré-tests. Là encore, cette démarche a permis d’augmenter la qualité des fonctionnalités issues des équipes de dev.</p>
      <p>Pour suivre l’impact de cette proposition, il a été demandé de mettre en place des routines d’évaluation d’impact, comparant deux périodes de travail similaires : avec et sans la présence du maintenancier auprès du dev.</p>
      <br>
      <p>A terme, cette solution devrait permettre d’alléger le nombre de maintenanciers qui pourraient être réassignés aux équipes de dev.</p>

      <div>
        <button class="button" onclick="location.href='/details/3'">Alternance 2023-24</button>
      </div><br>

      <br><strong>AC 10 : </strong>Accompagner le management de projet informatique
      <br><br>
      <p>Dans le cadre de plusieurs de mes projets, j'ai eu l'occasion d'occuper le rôle de Scrum Master.</p>
      <p>Ce rôle m'a permis d'accompagner le management des projets informatiques.</p>
      <p>Les différents outils de gestion de projet utilisés par le Scrum Master, assurent le bon déroulé, le suivi et l'atteinte des objectifs de chaque projet.</p>
      <p>Ainsi, j'ai pu mettre en place différents outils de reporting comme les daily mettings pour assurer les actions journalières et des retrospectives de sprint, qui permettent de faire un point sur la période écoulée.</p>
      <p>Ces temps de reporting, ont permis de réaliser la redistribution des tâches au sein des développeurs.</p>
      <p>Cette expérience m'a permis de développer les compétences clés pour mener un projet informatique vers la réussite.</p>
      <br>
      <div class="image-container img-group-7">
        <img src="assets/scrumboat.png" alt="Image du scrumboat">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/5'">E:cclesia</button>
      </div><br>
    </section>

  `,
    styleUrls: ['./learn.component.css'],
})
export class LearnComponent {

}
