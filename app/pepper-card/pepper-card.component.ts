import { Component, Input, OnInit } from '@angular/core';
import { Pepper } from '../pepper.model';
import { PepperService } from '../pepper.service';

@Component({
  selector: 'pepper-card',
  templateUrl: './pepper-card.component.html',
  styleUrls: ['./pepper-card.component.css']
})
export class PepperCardComponent implements OnInit {

  @Input() currentPepper: Pepper;

  readonly colors = [
    'red', 'orange', 'green', 'brown', 'yellow'
  ]

  updatePepper() {
    console.log(this.currentPepper)
    this.pepperService.update(this.currentPepper._id, this.currentPepper)
    .subscribe ((response) => {
      console.log(response)
    }, 
    (error) => {
      console.log(error)
    })
  }
  constructor(private pepperService: PepperService) {}

  ngOnInit(): void {
  }

}
