import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping/shopping.component';
import { ListOfTripsComponent } from './list-of-trips/list-of-trips.component';
import { FormComponent } from './form/form.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
const routes: Routes = [
  { path: 'listOfTrips', component: ListOfTripsComponent},
  { path: 'addNewTrip', component: FormComponent},
  { path: 'tripDetails/:id', component: TripDetailsComponent},
  { path: 'tripDetails', component: ListOfTripsComponent},
  { path: 'shopping', component: ShoppingComponent},
  { path: '', redirectTo: '/listOfTrips', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
