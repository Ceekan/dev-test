import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Restaurant } from '../restaurants/restaurants.models';
import { RatingRequestCarrier } from '../shared/rating-request-carrier.models';
import { RatingResponseCarrier } from '../shared/rating-response-carrier.models';
import { Rating } from '../shared/rating.models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  API_URL: string = "api/";

  constructor(private http: HttpClient) {}

  /**
   * Gets the available restaurants.
   */
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.API_URL + "restaurants");
  }

  /**
   * Gets the filter tags.
   */
  getTags(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL + "restaurants/tags");
  }

  /**
   * Gets the available restaurants.
   */  
  getRestaurant(ratingRequestCarrier: RatingRequestCarrier): Observable<RatingResponseCarrier> {
    return this.http.post<RatingResponseCarrier>(this.API_URL + "restaurants/item", ratingRequestCarrier);
  }

  /**
   * Add restaurant rating for the signed user.
   */ 
  addUserRating(rating: Rating): Observable<boolean> {
    return this.http.post<boolean>(this.API_URL + "restaurants/rating", rating);
  }
}
