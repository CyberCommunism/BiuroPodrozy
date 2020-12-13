import { Component, OnInit } from '@angular/core';
import { AddToShoppingService } from '../add-to-shopping.service';
import { tripObj } from '../trip/tripObj';
@Component({
  selector: 'app-shopping',
  templateUrl: `./shopping.component.html`
})
export class ShoppingComponent implements OnInit {
  constructor(private data: AddToShoppingService) { }
  sum = 0;
  sumArr = [];
  howManyTrips = 0;
  tripList: Array<tripObj> = [];
  ngOnInit(): void {
    this.data.currentTripList.subscribe(y => {
       if (!(typeof y === 'undefined')){
         this.tripList = [];
         this.howManyTrips = 0;
         this.sum = 0;
         for (const t in y) {
          if (!(typeof t === 'undefined')) {
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
  isAlready(x: tripObj): boolean{
    let con = 0;
    for (const el of this.tripList){
      if (el === x){ con += 1; }
    }
    return con >= 2;
  }
}
