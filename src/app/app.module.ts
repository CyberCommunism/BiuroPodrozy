import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingComponent } from './shopping/shopping.component';
import { SearchEndDate, SearchPipe, SearchPrice, SearchStartDate } from './filtre/filtre.pipe';
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu/menu.component';
import { ListOfTripsComponent } from './list-of-trips/list-of-trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
    declarations: [
        AppComponent,
        TripComponent,
        ShoppingComponent,
        SearchPipe,
        SearchStartDate,
        SearchPrice,
        SearchEndDate,
        FormComponent,
        MenuComponent,
        ListOfTripsComponent,
        TripDetailsComponent,
        PageNotFoundComponentComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
