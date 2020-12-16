import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap, takeWhile } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Restaurant } from 'app/restaurants/restaurants.models';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Filter } from 'app/shared/filter.models';
import { faStar, faHome, faPhone, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantListComponent implements OnInit, OnDestroy {
  faStarIcon = faStar;
  faHomeIcon = faHome;
  faPhoneIcon = faPhone;
  faThumbsUpIcon = faThumbsUp;
  ratingIndex: number = 0;

  get emptyResults(): boolean {
    return !this.restaurants || this.restaurants.length < 1;
  }

  restaurants: Restaurant[] | null = null;

  tags!: Observable<string[]>;

  filters = new BehaviorSubject<Filter>({
    search: "",
    tags: [],
    vegan: false,
    familyFriendly: false
  });

  alive = true;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.filters
      .pipe(
        switchMap((filters) =>
          this.restaurantsService
            .getRestaurants()
            .pipe(
              takeWhile(() => this.alive),
              map((restaurants) => this.filterRestaurants(restaurants, filters))
            )
        )
      )
      .subscribe((restaurants) => (this.restaurants = restaurants));

    this.tags = this.restaurantsService
      .getTags()
      .pipe(map((data) => data.flatMap((x) => x)));
  }

  onFiltersChange(filter: Filter): void {
    this.filters.next(filter);
  }
 
  private filterRestaurants(
    restaurants: Restaurant[],
    filter: Filter
  ): Restaurant[] {
    if (filter.search) {
      restaurants = restaurants.filter((x) => x.name.toLowerCase().indexOf(filter.search.toLowerCase()) > -1);
    }

    filter.tags?.forEach((tag: string) => {
      restaurants = restaurants.filter((x) => x.tags.indexOf(tag) > -1);
    });

    if (filter.vegan) {
      restaurants = restaurants.filter((x) => x.veganFriendly);
    }

    if (filter.familyFriendly) {
      restaurants = restaurants.filter((x) => x.familyFriendly);
    }

    return restaurants;
  }
 
  ngOnDestroy(): void {
    this.alive = false;
  }
}
