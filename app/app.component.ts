import { Component } from '@angular/core';
import { Pepper } from './pepper.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedPepper;
  
  title = 'Pepper';

  onPepperSelected(pepper: Pepper){
    this.selectedPepper = pepper;
  }
}
