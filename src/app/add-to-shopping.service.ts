import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddToShoppingService {
  // @ts-ignore
  tripList: {
    name: string, aim: string,
    startTrip: string, endTrip: string,
    price: number, currency: string,
    maxSpace: number, description: string,
    imgURL: string, rate: Array<number>
  }[];
  currentTripList: BehaviorSubject<{
    name: string, aim: string,
    startTrip: string, endTrip: string,
    price: number, currency: string;
    maxSpace: number, description: string,
    imgURL: string, rate: Array<number>
  }[]>;
  constructor(){
    // @ts-ignore
    this.tripList = Array<{
      name: string, aim: string,
      startTrip: string, endTrip: string,
      price: number, currency: string,
      maxSpace: number, description: string,
      imgURL: string, rate: Array<number>
    }[]>();
    // @ts-ignore
    this.currentTripList = (new BehaviorSubject([]) as BehaviorSubject<{
      name: string, aim: string,
      startTrip: string, endTrip: string,
      price: number, currency: string,
      maxSpace: number, description: string,
      imgURL: string, rate: Array<number>
    }[]>);
    this.currentTripList.asObservable();
  }
  // tslint:disable-next-line:typedef
  addTripToShopping(trip: {
    name: string; aim: string;
    startTrip: string; endTrip: string;
    price: number; currency: string;
    maxSpace: number; description: string;
    imgURL: string; rate: Array<number>;
  }){
    this.tripList.push(trip);
    this.currentTripList.next(Object.assign({}, this.tripList));
  }
  // tslint:disable-next-line:typedef
  removeTripToShopping(trip: {
    name: string; aim: string;
    startTrip: string; endTrip: string;
    price: number; currency: string;
    maxSpace: number; description: string;
    imgURL: string; rate: Array<number>;
  },                   a: number){
    if (a === 1){
      const res = [];
      for (let i = 0 ; i < this.tripList.length ; i ++){
        if (this.tripList[i].name === trip.name){
          res.push(i);
        }
      }
      for (let i = res.length ; i >= 0 ; i--){
        this.tripList.splice(res[i], 1);
      }
    }
    if (a === 0){
      this.tripList.splice(this.tripList.indexOf(trip), 1);
    }
    this.currentTripList.next(Object.assign({}, this.tripList));
  }
}
