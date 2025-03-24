import {Component, inject, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HousingService} from "../housing.service";
import {HousingLocation} from "../housinglocation";

@Component({
  selector: 'app-learn-component',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section>
      <span class="blue">Partie Réaliser :</span>
      <br><strong>AC 1 : </strong>Choisir et implémenter des architectures adaptées
      <p>La réalisation de mes projets <strong>Exige - new front</strong>,<strong>E::cclesia</strong> et <strong>Nyavigator</strong> ont nécessité la mise en place d'une architecture PHP adapté, que ce soit pour la gestion d'utilisateur ou de leur méthodes métiers.</p>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - new front</button>
        <button class="button" onclick="location.href='/details/5'">E::cclesia</button>
        <button class="button" onclick="location.href='/details/7'">Nyavigator</button>
      </div><br>

      <br><strong>AC 2 : </strong>Faire évoluer une application existante
      <p>Mes projets <strong>Exige - new front</strong> ainsi que mon <strong>Alternance</strong> on consisté respectivement en la modernisation d'une application et la correction et amélioration continue des logiciels de l'entreprise Lundi Matin.</p>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - new front</button>
        <button class="button" onclick="location.href='/details/3'">Alternance</button>
      </div><br>

      <br><strong>AC 3 : </strong>Intégrer des solutions dans un environnement de production
      <p>L'objectif de <strong>Nyavigator</strong> était d'intégrer un algorithme de recherche de chemin le plus court et d'en améloiorer ses performances. Il entre parfaitement dans le cadre de cette compétence.</p>
      <div>
        <button class="button" onclick="location.href='/details/7'">Nyavigator</button>
      </div><br>

      <span class="blue">Partie Optimiser :</span>
      <br><strong>AC 4 : </strong>Anticiper les résultats de diverses métriques
      <p>Le projet <strong>Nyavigator</strong>, qui visait à optimiser une application de calcul de trajet, impliquait l’analyse des performances et l’optimisation des temps de réponse.</p>
      <div>
        <button class="button" onclick="location.href='/details/7'">Nyavigator</button>
        <button class="button" onclick="location.href='/details/1'">Autocompletion Scala</button>
      </div><br>

      <br><strong>AC 5 : </strong>Profiler, analyser et justifier le comportement d’un code existant
      <p>Le projet <strong>Autocompletion Scala</strong> a nécessité l’analyse du comportement d’un algorithme d’apprentissage pour améliorer la rapidité et la pertinence des suggestions.</p>
      <div>
        <button class="button" onclick="location.href='/details/1'">Autocompletion Scala</button>
      </div><br>

      <br><strong>AC 6 : </strong>Choisir et utiliser des bibliothèques dédiées au domaine d’application
      <p>Les projets <strong>ISTower</strong> et <strong>Nautilus Rush</strong> ont nécessité l'usage de bibliothèques spécifiques. Le premier ayant besoin d'associer un site web et y intégrer un jeu vidéo, le deuxième demandant un système de colision étant la base du jeu.</p>
      <div>
        <button class="button" onclick="location.href='/details/4'">ISTower</button>
        <button class="button" onclick="location.href='/details/6'">Nautilus Rush</button>
      </div><br>

      <span class="blue">Partie Collaborer :</span>
      <br><strong>AC 7 : </strong>Organiser et partager une veille numérique
      <p>Mon <strong>Alternance 2023-24</strong> a impliqué une veille sur les technologies utilisées par mon entreprise, pour me permettre de corriger les bugs pouvant apparaitre lors d'un changemnet de version d'une des technologies.</p>
      <div>
        <button class="button" onclick="location.href='/details/3'">Alternance 2023-24</button>
      </div><br>

      <br><strong>AC 8 : </strong>Identifier les enjeux de l’économie de l’innovation numérique
      <p>Mon <strong>Alternance 2023-24</strong> m'a permis de comprendre les défis liés à la modernisation d'outils informatiques et à l'intégration d'innovations tout en respectant les besoins de l'entreprise.</p>
      <div>
        <button class="button" onclick="location.href='/details/3'">Alternance 2023-24</button>
      </div><br>

      <br><strong>AC 9 : </strong>Guider la conduite du changement informatique au sein d’une organisation
      <p>Le projet <strong>Exige - New Front</strong> a nécessité d'assurer la transition du logiciel et de l'accompagner dans le remplacement des technologies obsolètes utilisées vers de plus récentes.</p>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - New Front</button>
      </div><br>

      <br><strong>AC 10 : </strong>Accompagner le management de projet informatique
      <p>Ayant eu l'occasion d'être Scrum Master dans les projets <strong>Exige - New Front</strong> et <strong>E:cclesia</strong>, j'ai pu acquérir cette compétence permettant d'aider à la planification des projets ainsi qu'à une collaboration efficace.</p>
      <div>
        <button class="button" onclick="location.href='/details/2'">Exige - New Front</button>
        <button class="button" onclick="location.href='/details/5'">E:cclesia</button>
      </div><br>
    </section>

  `,
    styleUrls: ['./learn.component.css'],
})
export class LearnComponent {

}
