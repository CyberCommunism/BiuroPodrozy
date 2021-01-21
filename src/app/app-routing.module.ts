import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping/shopping.component';
import { ListOfTripsComponent } from './list-of-trips/list-of-trips.component';
import { FormComponent } from './form/form.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {MainComponent} from './main/main.component';
import {AddTripGuard, GuardGuard, LogInGuard } from './guard.guard';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
const routes: Routes = [
  { path: 'main', component: MainComponent },

  { path: 'login', component: LoginComponent },


  { path: 'adminPanel', component: AdminPanelComponent },
  { path: 'singUp', component: SingUpComponent },

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
