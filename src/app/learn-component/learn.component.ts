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
      <p>J'ai choisi de réaliser mon portfolio sous Angular pour séparer les données, le visuel et les actions de mon site. Chaqu'une  des fonctionnalités présente est découpée en composants réutilisable et la logique métier est déléguée aux différents services créé et injecté dans les composants. Cette répartition claire des responsabilités permet d'optimiser les performances et permet à mon portfolio d'être facilement extensible.</p>
      <div class="image-container img-group-1">
        <img src="assets/projet1.png" alt="Photo de projet">
        <img src="assets/projet2.png" alt="Photo de projet">
      </div>
     
      <div>
        <button class="button" onclick="location.href='/details/0'">Portfolio</button>
      </div><br>

      <br><strong>AC 2 : </strong>Faire évoluer une application existante
      <p>Lors de ma SAE de 3ème année de BUT, j'ai été ammené à faire évoluer l'application Exige. Cette application utilisant à l'origine l'invite de commande comme interface et demandais à l'enseignant de renseigner les informations de l'ensemble des élèves à la main pour pouvoir le faire fonctionner. Il était nécessaire de revoir son affichage ainsi que son fonctionnement pour rendre son utilisation plus agréable et répondre aux besoins des utilisateurs. Pour se faire, nous avons réalisé une application web sous Symfony, permettant à chaque étudiant de remplir ses propres information et réduisant les contraintes de l'enseignant pour l'utilisation d'Exige.</p>
      <div class="image-container img-group-3">
        <img src="assets/exige.png" alt="Photo d'exige">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - new front</button>
      </div><br>

      <br><strong>AC 3 : </strong>Intégrer des solutions dans un environnement de production
      <p>Lors de mon stage de BUT 2, j'ai eu pour mission de réaliser une librairie de notification sous Angular. Ce projet m'a permis de mettre en place un processus complet d'intégration en production. J'ai conçu et développé cette librairie en veillant à son opérabiilité avec les logiciels existant et à ce qu'elle soit facilement déployable.</p>
      <div class="image-container img-group-2">
        <img src="assets/librairie.png" alt="Photo d'utilisation de librairie">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/7'">Stage à rajouter</button>
      </div><br>

      <span class="blue">Partie Optimiser :</span>
      <br><strong>AC 4 : </strong>Anticiper les résultats de diverses métriques
      <p>Dans le cadre de mon projet de SAE Nyavigator, j'ai eu l'occasion d'uitliser XDebug pour mesurer le temps d'exécution de notre code de recherche de chemin le plus court et ait pu évaluer son évolution sur différentes distances. Grâce à ceci nous avons pu identifier les améliorations nécessaires afin d'en réduire le temps d'exécution. Cette approche m'a permis de prévoir les effents de nos modifications apportées sur l'application et de garantir une amélioration des performances de notre projet.</p>
      <div class="image-container img-group-3">
        <img src="assets/nyavigator.png" alt="Photo d'utilisation de nyavigator">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/7'">Nyavigator</button>
      </div><br>

      <br><strong>AC 5 : </strong>Profiler, analyser et justifier le comportement d’un code existant
      <p>Le projet Nyavigateur a demandé la sélection d'un algorithme de recherche de chemin le plus court.</p>
      <p>Nous avons initialement implémenté l’algorithme de Dijkstra. Dans un graphe non orienté, à partir d’un point, cet algorithme recherche les voisins de ce point «
        en largeur ». Une représentation de cette méthode de recherche serait un cercle, partant du point de
        départ, dont on augmente graduellement le rayon.
        Cette solution est acceptable dans la plupart des cas. La complexité O de cet algorithme est O(nlog(n)),
        et on a la garantie de trouver le chemin le plus court entre deux points. Cependant, on peut y apporter
        des améliorations.</p>
      <div class="image-container img-group-4">
        <img src="assets/Dijkstra.gif" alt="Gif algorithme Dijkstra">
      </div>
      <p>L’algorithme A* (A étoile) modifie l’évaluation des distances sur le graphe : on additionne à
        la somme des distances des arêtes un paramètre, nommé heuristique*, qui est le plus généralement la
        distance à vol d’oiseau (euclidienne sur un plan, orthodromique sur une sphère) entre le point courant
        et le point d’arrivée. Ce paramètre donne donc un avantage aux trajets qui s’éloignent le moins de la direction du point
        d’arrivée : sur un graphe sans obstacles, A* s’étend en ligne droite vers le point d’arrivée, tandis que
        Dijkstra recherche chaque point avec la même priorité. A* n’est cependant admissible (garantissant le
        chemin le plus court) que lorsque l’heuristique est inférieure ou égale à la distance réelle sur le graphe
        (obtenue par somme des arêtes). Notre graphe étant une représentation de distances réelles, la
        distance à vol d’oiseau est nécessairement inférieure à la distance que l’on peut obtenir en parcourant
        des routes.</p>
      <div class="image-container img-group-4">
        <img src="assets/Astar.gif" alt="Gif algorithme A*">
      </div>
      
      <p>Si l’on choisit de faire un compromis entre précision et vitesse d’exécution, cependant, on peut choisir
        d’utiliser WA* (Weighted A Star). Cet algorithme multiplie l’heuristique par un poids, de sorte
        à donner une encore plus grande priorité aux trajets directs. Cela a l’avantage d’être extrêmement
        rapide, au détriment de l’admissibilité de l’algorithme. On remarque sur l'image ci-dessous que le nombre de nœuds explorés (en couleur), est bien moindre que
        celui de A*. Cependant, la distance calculée est légèrement supérieure.</p>
      <div class="image-container img-group-4">
        <img src="assets/WAstar.gif" alt="Gif algorithme WA*">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/7'">Nyavigator</button>
      </div><br>

      <br><strong>AC 6 : </strong>Choisir et utiliser des bibliothèques dédiées au domaine d’application
      <p>J'ai été amené à choisir et utiliser différentes bibliothèques au court de mes proejts. Ces bibliothèques m'ont permis de développer des solutions adaptées aux besoins spécifiques de mes différents projet.
      Parmis ces bibliothèques nous pouvont retrouver Twig et Doctrine. Twig m'a permis de structurer les différentes vues de mon projet en séparant distinctement la logique métier et le rendu visuel grâce à ses fonctionnalité d'héritage, de filtres et d'extensions.
      Doctrine m'a permi d'interagir avec la base de données de mon projet de manière efficace et sécurisée. J'ai pu mettre en oeuvre des relations entre entités (ManyToMany, OneToMany, etc...) et j'ai utilisé des migrations pour gérer l'évolution de ma base de données sans perte de données.
      Grâce à cette expérience, j'ai acquis une capacité d'analyse pour choisir les bibliothèques les plus adapté ainsi que maitriser leur intégration</p>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - new front</button>
      </div><br>

      <span class="blue">Partie Collaborer :</span>
      <br><strong>AC 7 : </strong>Organiser et partager une veille numérique
      <p>Dans le cadre de mes cours de communication, j'ai été ammené à réaliser une veille informationnelle et à la partager à mes camarades de classe. Pour cela j'ai utilisé un agrégateur de flux RSS pour suivre les publicatiosn de plusieurs site de press dans le domaine de la tech. Accompagné de recherche dans des bases de données et via des moteurs de recherche, j'ai été capable de restituer ma veille informationnelle à mes camarades de classe.</p>
      <div class="image-container img-group-5">
        <img src="assets/veille.png" alt="Image agrégateur">
      </div>
      <br>

      <br><strong>AC 8 : </strong>Identifier les enjeux de l’économie de l’innovation numérique
      <p>Lors de la nuit de l'info de 2022, j'ai été amené à réaliser avec mes camarades  un site web autour de la prévention concernant les IST. Cette expérience m'a poussé à faire des recherches concernant ce domaine et m'a offert une vision concrète de l'implication du numérique dans le domaine de la santé et de l'éducation. </p>
      <div class="image-container img-group-6">
        <img src="assets/ndi2022.png" alt="Image ndi 2022">
      </div>
      <div>
        <button class="button" onclick="location.href='/details/4'">ISTower</button>
      </div><br>

      <br><strong>AC 9 : </strong>Guider la conduite du changement informatique au sein d’une organisation
      <p>Lors de mon alternance chez LUNDI MATIN, j'ai réalisé une analyse critique de son environnement technique et y ai fait des suggestions d'amélioration à la manière d'un audit.</p>
      <p>LundiMatinBusiness est un logiciel de gestion commerciale en ligne. Un WorkFlow GitFlow a été mis en place pour ce projet, il est donc divisé en plusieurs branches utilisées par les développeurs : une branche par version utilisée par les clients, une branche pour préparer la version suivante de LMB et enfin une branche develop utilisée pour ajouter de nouvelles fonctionnalités et corriger des bugs.

      C’est un fonctionnement semblable à ce que l’on réalise lors de nos projets à l’IUT, à l’exception que nous n’avons pas de branches pour les versions précédentes de nos projets puisque nous n’en avons pas l’utilité.

      Le logiciel et fréquemment soumis à de nombreux « tests unitaires » et « tests utilisateurs », permettant de s’assurer du bon fonctionnement de ce dernier. Cependant, lorsqu’une fonctionnalité nouvellement réalisée vient à ne pas passer les tests, elle est immédiatement envoyée à la maintenance. Il arrive souvent que le développeur concerné n’ait préalablement pas testé le bon fonctionnement de cette nouveauté. Ce fonctionnement permet certes au développeur d’enchainer les tâches à réaliser en se détachant de la partie test mais charge arbitrairement le poste de travail de la maintenance.

      Il serait préférable que les développeurs s’assurent du bon fonctionnement de leur fonctionnalité par des tests en amont avant de les envoyer se faire tester en production. Cela aurait plusieurs avantages. Cela permettrait de garder un code cohérent mais réduirait également la quantité de bugs pouvant apparaitre à l’avenir.

      LundiMatinBusiness utilise une base de données SQL sous phpMyAdmin, les requêtes effectuées dessus ne sont pas très couteuses bien que le volume de données présent soit important. Cependant, il est très difficile d’y naviguer, il y a de nombreuses tables qui ont toutes leur utilité. De plus, leurs noms ne sont pas très explicites. Cela peut rendre difficile la compréhension de l’organisation de la base de données. Si la possibilité semble séduisante de remplacer cette base de données, changer cette base demanderait un effort et un coût beaucoup trop important pour être envisagé, la solution déjà existante est suffisante et convient aux besoins de l’entreprise.
    </p>
      <div>
        <button class="button" onclick="location.href='/details/3'">Alternance 2023-24</button>
      </div><br>

      <br><strong>AC 10 : </strong>Accompagner le management de projet informatique
      <p>Dans le cadre de plusieurs de mes projets, j'ai eu l'occasion d'occuper le rôle de Scrum Master, me permettant d'accompagner le management des projets informatiques. J'ai pu mettre en place différents daily mettings et rétrospective de sprint ainsi qu'à la répartition équilibrée des tâches au sein des développeurs. cette expérience m'a permis de développer les compétences clés pour mener unn projet informatique vers la réussite.</p>
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
