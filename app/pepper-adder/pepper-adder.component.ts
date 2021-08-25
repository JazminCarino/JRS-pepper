import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Pepper } from '../pepper.model';
import { PepperService } from '../pepper.service';

@Component({
  selector: 'pepper-adder',
  templateUrl: './pepper-adder.component.html',
  styleUrls: ['./pepper-adder.component.css'],
})
export class PepperAdderComponent implements OnInit {
  constructor(private pepperService: PepperService) {}

  pepper: Pepper = {
    name: '', 
    color:'',
    shu: {
      min:0, 
      max:0
    }
  }

  readonly colors = [
    'red', 'orange', 'green', 'brown', 'yellow'
  ]

  submitPepper(){
    if (this.pepper.name == '' || this.pepper.color == '') {
      console.log('Pepper must have name and color');
      return;
    }

    this.pepper.color = this.pepper.color.toLowerCase();

    if (this.pepper.shu.min > this.pepper.shu.max) {
      console.log("Peppers' S.H.U min cannot be greater than the max");
    }
    console.log("posting")
    this.pepperService.createPepper(this.pepper).subscribe(
      (response) => {
        alert('New pepper created');
      },
      (error) => {
        alert('Pepper was not created');
      }
    );
  }



  ngOnInit(): void {}
}
