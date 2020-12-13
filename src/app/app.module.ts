import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShoppingComponent } from './shopping/shopping.component';
import {SearchEndDate, SearchPipe, SearchPrice, SearchStartDate} from './filtre/filtre.component';
import { FormComponent } from './trip/form/form.component';

@NgModule({
    declarations: [
        AppComponent,
        TripComponent,
        ShoppingComponent,
        SearchPipe,
        SearchStartDate,
        SearchPrice,
        SearchEndDate,
        FormComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
