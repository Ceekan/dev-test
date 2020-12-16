import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faStar, faHome, faPhone, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RestaurantsService } from '../restaurants.service';
import { Observable, of } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { RatingResponseCarrier } from '../../shared/rating-response-carrier.models';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss'],
})
export class RestaurantItemComponent implements OnInit, OnDestroy {
  faStarIcon = faStar;
  faHomeIcon = faHome;
  faPhoneIcon = faPhone;
  faThumbsUpIcon = faThumbsUp;
  restaurantId!: string;
  ratingIndex: number = 0;
  alive: boolean = true;
  response!: RatingResponseCarrier;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private restaurantService: RestaurantsService, 
    private oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
         this.restaurantId = params["id"];
      });

    this.fetchRestuarant()
      .subscribe((data: RatingResponseCarrier) => {
          this.response = data;
      });
  }

  public get userId() {
      let claims: any = this.oauthService.getIdentityClaims();
      
      if (!claims) 
        return null;

      return claims.sub;
  }

  fetchRestuarant(): Observable<RatingResponseCarrier> {
    return this.restaurantService
      .getRestaurant({ restaurantId: this.restaurantId, userId: this.userId })      
      .pipe(
        takeWhile(() => this.alive), 
        switchMap((data: RatingResponseCarrier) => {
          return of(data);
        })
      );
	}

  ratingSubmitClick(event: any): void {
    this.saveUserRating(event)
      .subscribe((data: boolean) => {
          if (data) {
            this.router.navigate(['/restaurants']);
          }
      });
  }

  saveUserRating(starRating: number): Observable<boolean> {
    return this.restaurantService
      .addUserRating({ restaurantId: this.restaurantId, userId: this.userId, starRating: starRating.toString() })      
      .pipe(
        takeWhile(() => this.alive), 
        switchMap((data: boolean) => {
          return of(data);
        })
      );
	}

  ngOnDestroy(): void {
    this.alive = false;
  }
}
