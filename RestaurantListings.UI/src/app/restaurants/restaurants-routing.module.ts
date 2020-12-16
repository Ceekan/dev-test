import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantItemComponent } from './restaurant-item/restaurant-item.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantsComponent } from './restaurants.component';
import { AuthorizationGuard } from '../shared/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { 
        path: 'list', 
        children: [
          {
            path: '',
            component: RestaurantListComponent
          },
          { 
            path: 'item/:id', 
            component: RestaurantItemComponent,            
            canActivate: [AuthorizationGuard],
          } 
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsRoutingModule {}
