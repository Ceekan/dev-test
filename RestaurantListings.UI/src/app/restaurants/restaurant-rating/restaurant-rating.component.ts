import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-restaurant-rating',
  templateUrl: './restaurant-rating.component.html',
  styleUrls: ['./restaurant-rating.component.scss'],
})
export class RestaurantRatingComponent implements OnInit {
  @Input() 
  index!: number;

  @Output() 
  submitRating: EventEmitter<number> = new EventEmitter<number>();

  ratingName!: string;
  
  constructor() {}

  ngOnInit(): void {
    this.ratingName = "restaurant_star_" + this.index;
  }
  
  onClick(value: number): void {
    this.submitRating.emit(value);
  }
}
