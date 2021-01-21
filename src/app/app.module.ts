import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';
import { AuthService } from './providers/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingComponent } from './shopping/shopping.component';
import {SearchPipe, SearchPrice, SearchStartDate, SearchSearch, SearchCurr} from './filtre/filtre.pipe';
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu/menu.component';
import { ListOfTripsComponent } from './list-of-trips/list-of-trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FiltreFieldComponent } from './list-of-trips/filtre-field/filtre-field.component';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { MainComponent } from './main/main.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserLineComponent } from './admin-panel/user-line/user-line.component';
import { TripLineComponent } from './admin-panel/trip-line/trip-line.component';
import {AddTripGuard, GuardGuard, LogInGuard, NotLogInGuard} from './guard.guard';

@NgModule({
    declarations: [
        AppComponent,
        TripComponent,
        ShoppingComponent,
        SearchPipe,
        SearchStartDate,
        SearchPrice,
        SearchSearch,
        SearchCurr,
        FormComponent,
        MenuComponent,
        ListOfTripsComponent,
        TripDetailsComponent,
        PageNotFoundComponentComponent,
        FiltreFieldComponent,
        LoginComponent,
        SingUpComponent,
        MainComponent,
        AdminPanelComponent,
        UserLineComponent,
        TripLineComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
