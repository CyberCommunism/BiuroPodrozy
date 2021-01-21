import {Injectable} from '@angular/core';
import {tripObj} from '../tripObj';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private db: AngularFireDatabase) { }

  getList(): Observable<any>{ return this.db.list('trips').snapshotChanges(); }
  addTrip(trip: tripObj): void{
    const trip1 = {
      name: trip.name,
      aim: trip.aim,
      startTrip: trip.startTrip,
      endTrip: trip.endTrip,
      price: trip.price,
      currency: trip.currency,
      maxSpace: trip.maxSpace,
      description: trip.description,
      imgURL: trip.imgURL,
      rate: trip.rate,
      booked: trip.booked,
      rateNum: trip.rateNum
    };
    this.db.list('trips').push(trip1);
  }
  update(key: string, value: any): void{
    this.db.list('trips').update(key, value).then(r => r);
  }
  remove(key: string): void{
    this.db.list('trips').remove(key).then(r => r);
  }
  getListOfUsers(): Observable<any>{ return this.db.list('user').snapshotChanges(); }
}
