import {Component, Input, OnInit} from '@angular/core';
import trips from '../../trips.json';
import { DataServiceService } from '../data-service/data-service.service';
import { tripObj } from '../tripObj';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  // @ts-ignore
  @Input() someTrip: tripObj;
  constructor(private data: DataServiceService) {}
  ngOnInit(): void {}
  getCurrency(s: string): string{
    switch (s){
      case 'EURO': return 'euro';
      case 'USD': return '$';
      case 'PLN': return 'zł';
      default : return 'Undefined';
    }
  }
  book(): void{
    if (this.someTrip.key != null) {
      this.data.update(this.someTrip.key, {booked: (this.someTrip.booked + 1)});
    }
  }
  cancel(): void{
    if (this.someTrip.key != null) {
      this.data.update(this.someTrip.key, {booked: (this.someTrip.booked - 1)});
    }
  }
  delete(): void{
    if (this.someTrip.key != null) {
      this.data.remove(this.someTrip.key);
    }
  }
}
