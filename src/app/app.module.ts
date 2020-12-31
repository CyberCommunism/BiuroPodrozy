import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingComponent } from './shopping/shopping.component';
import { SearchPipe, SearchPrice, SearchStartDate, SearchSearch } from './filtre/filtre.pipe';
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu/menu.component';
import { ListOfTripsComponent } from './list-of-trips/list-of-trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FiltreFieldComponent } from './list-of-trips/filtre-field/filtre-field.component';

@NgModule({
    declarations: [
        AppComponent,
        TripComponent,
        ShoppingComponent,
        SearchPipe,
        SearchStartDate,
        SearchPrice,
        SearchSearch,
        FormComponent,
        MenuComponent,
        ListOfTripsComponent,
        TripDetailsComponent,
        PageNotFoundComponentComponent,
        FiltreFieldComponent
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
