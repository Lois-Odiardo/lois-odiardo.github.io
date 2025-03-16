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
      work in progress
    </p>
  `,
  styleUrls: ['./learn.component.css'],
})
export class LearnComponent {

}
