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
    <p>
        <span class="blue">Partie Réaliser :</span>
        <br><strong>AC 1 :</strong>Choisir et implémenter des architectures adaptées<br>
        <div>boutons</div><br>
        <br><strong>AC 2 :</strong>Faire évoluer une application existante<br>
        <div>boutons</div><br>
        <br><strong>AC 3 :</strong>Intégrer des solutions dans un environnement de production<br>
        <div>boutons</div><br>
    
        <span class="blue">Partie Optimiser :</span>
        <br><strong>AC 4 :</strong>Anticiper les résultats de diverses métriques<br>
        <div>boutons</div><br>
        <br><strong>AC 5 :</strong>Profiler, analyser et justifier le comportement d’un code existant<br>
        <div>boutons</div><br>
        <br><strong>AC 6 :</strong>Choisir et utiliser des bibliothèques dédiées au domaine d’application<br>
        <div>boutons</div><br>

        <span class="blue">Partie Collaborer :</span>
        <br><strong>AC 7 :</strong>Organiser et partager une veille numérique<br>
        <div>boutons</div><br>
        <br><strong>AC 8 :</strong>Identifier les enjeux de l’économie de l’innovation numérique<br>
        <div>boutons</div><br>
        <br><strong>AC 9 :</strong>Guider la conduite du changement informatique au sein d’une organisation<br>
        <div>boutons</div><br>
        <br><strong>AC 10 :</strong>Accompagner le management de projet informatique<br>
        <div>boutons</div><br>
    
  `,
  styleUrls: ['./learn.component.css'],
})
export class LearnComponent {

}
