import { Component, OnInit } from '@angular/core';
import { AddToShoppingService } from '../add-to-shopping.service';
@Component({
  selector: 'app-shopping',
  templateUrl: `./shopping.component.html`
})
export class ShoppingComponent implements OnInit {
  constructor(private data: AddToShoppingService) { }
  // @ts-ignore
  sum = 0;
  sumArr = [];
  // @ts-ignore
  howManyTrips = 0;
  // @ts-ignore
  // tslint:disable-next-line:ban-types
  tripList: Array<{
    name: string, aim: string,
    startTrip: string, endTrip: string,
    price: number, currency: string,
    maxSpace: number, description: string,
    imgURL: string, rate: Array<number>
  }> = [];
  ngOnInit(): void {
    this.data.currentTripList.subscribe(y => {
      // tslint:disable-next-line:triple-equals
       if (typeof y != 'undefined'){
         this.tripList = [];
         this.howManyTrips = 0;
         this.sum = 0;
         for (const t in y) {
          // tslint:disable-next-line:triple-equals
          if (typeof t != 'undefined') {
            const x = {
              name: y[t].name, aim: y[t].aim,
              startTrip: y[t].startTrip, endTrip: y[t].endTrip,
              price: y[t].price, currency: y[t].currency,
              maxSpace: y[t].maxSpace, description: y[t].description,
              imgURL: y[t].imgURL, rate: Array<number>()
            };
            this.tripList.push(x);
            this.howManyTrips += 1;
            this.sum += this.tripList[this.howManyTrips - 1].price;
          }
         }
       }
    });
  }
  // tslint:disable-next-line:typedef
  isAlready(x: {
    name: string, aim: string,
    startTrip: string, endTrip: string,
    price: number, currency: string,
    maxSpace: number, description: string,
    imgURL: string, rate: Array<number>
  }){
    let con = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.tripList.length ; i++){
      if (this.tripList[i] === x){
        con += 1;
      }
    }
    if (con >= 2){
      return true;
    }
    return false;
  }

}
