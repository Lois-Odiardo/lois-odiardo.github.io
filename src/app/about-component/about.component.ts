import { Component } from '@angular/core';

@Component({
  selector: 'app-about-component',
  imports: [],
  template: `
    <section class="about-container">
      <div class="bio-section">
        <div class="bio-image">
          <img src="assets/scala.png" alt="Photo de Loïs Odiardo" class="profile-pic">
        </div>

        <div class="biography">
          <h1>Biographie</h1>
          <p>Je suis Loïs Odiardo, étudiant en troisième année de BUT Informatique à Montpellier.</p>
          <p>Je viens des alentours d'Aix-en-Provence, où j'ai passé mon bac général avec les spécialités Mathématiques, NSI et l'option Mathématiques expertes. J'ai toujours eu un attrait pour l'informatique et c'est pourquoi j'ai décidé de réaliser un BUT dans cette filière afin de mettre en pratique cette passion et de développer mes compétences.</p>
          <p>Ma spécialité au sein du BUT est la Réalisation d'Applications : Conception, Développement, Validation.</p>
          <p>On me définit comme étant un grand rêveur, naturellement dans ma bulle. Mes centres d'intérêt tels que les jeux de rôles, la lecture et la fiction en général me permettent de laisser libre cours à mon imagination, élément que je trouve essentiel dans le métier de développeur.</p>
          <p>A l'avenir, je souhaiterais devenir développeur fullstack dans une entreprise ou une association travaillant à la protection animale, valeur qui me semble nécessaire dans le monde actuel. Il est important de prendre soin de chacun, y compris des créatures qui peuplent notre planète, pour y préserver un écosystème et une biodiversité viable et riche.</p>
        </div>
      </div>

      <div class="cv-section">
        <h1>Curriculum Vitae</h1>
        <div class="cv-container">
          <img src="assets/OdiardoLois-CV.png" class="cv-display" alt="CV de Loïs Odiardo">
        </div>
        <a href="assets/OdiardoLois-CV.pdf" download class="cv-download">📥 Télécharger le CV</a>
      </div>
    </section>

  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

}
