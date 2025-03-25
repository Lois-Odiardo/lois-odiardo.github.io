import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  template: `
    <section class="contact-container">
      <h2>Contactez-moi</h2>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/loïs-odiardo" target="_blank">
            <img src="assets/linkedin.svg" alt="LinkedIn"> LinkedIn
          </a>
        </li>
        <li>
          <a href="tel:+33123456789">
            <img src="assets/phone.svg" alt="Téléphone"> +33 7 83 40 61 91
          </a>
        </li>
        <li>
          <a href="mailto:lois.odiardo@gmail.com">
            <img src="assets/mail.svg" alt="Email"> lois.odiardo&#64;gmail.com
          </a>
        </li>
        <li>
          <a href="https://github.com/Lois-Odiardo" target="_blank">
            <img src="assets/github.svg" alt="GitHub"> GitHub
          </a>
        </li>
      </ul>
    </section>
  `,
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {

}
