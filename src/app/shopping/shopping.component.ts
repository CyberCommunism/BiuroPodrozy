import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service/data-service.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-shopping',
  templateUrl: `./shopping.component.html`
})
export class ShoppingComponent implements OnInit {
  constructor(private data: DataServiceService) { }
  sum = 0;
  howManyTrips = 0;
  tripList: any;
  ngOnInit(): void {
    this.getListOfBookedTrips();
  }
  getListOfBookedTrips(): void{
    let x = 0;
    let y = 0;
    this.data.getList().pipe(
      map(changes =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) => {
            return ({key: c.payload.key, ...c.payload.val()}); }
        ).filter( (c: any) => c.booked > 0)
          .map((c: any) => {
            x += c.booked;
            y ++;
            return c;
          }))
    ).subscribe(
      list => {
        this.sum = x;
        this.howManyTrips = y;
        x = 0;
        y = 0;
        this.tripList = list;
      });
  }
}

