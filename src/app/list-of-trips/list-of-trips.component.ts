import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service/data-service.service';
import { map } from 'rxjs/operators';
import { SetToPipe } from '../set-to-pipe';
import {AuthService} from '../providers/auth.service';
import {User} from '../User';

@Component({
  selector: 'app-list-of-trips',
  templateUrl: './list-of-trips.component.html',
  styleUrls: ['./list-of-trips.component.css']
})
export class ListOfTripsComponent implements OnInit {

  tripsList: any;
  // @ts-ignore
  dataToFiltre: SetToPipe;
  // @ts-ignore
  user: User;
  curr = false;
  isVipB = false;
  isWorkerB = false;
  constructor(private data: DataServiceService, public af: AuthService) {
    this.af.userData$.subscribe(user => {
      this.user = user;
      this.isWorkerB = this.isWorker(user);
      this.isVipB = this.isVip(user);
      this.curr = this.onlyCurrent(user);
    });
  }

  ngOnInit(): void {
    this.getTripList();
    this.dataToFiltre = {
      startData: '',
      endData: '',
      lowPrice: NaN,
      highPrice: NaN,
      country: ''
    };
  }
  getTripList(): void{
    this.data.getList().pipe(
      map(changes =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) => {
            return ({key: c.payload.key, ...c.payload.val()});
          }
        ))
    ).subscribe(
      list => {this.tripsList = list; });
  }
  makeWithData(x: SetToPipe): void{
    this.dataToFiltre = x;
  }
  onlyCurrent(user: any): boolean{
    return !user || ((this.isVip(user) || this.af.isReader(user)) && !this.af.isAdmin(user) && !this.af.isWorker(user));
  }
  isVip(user: any): boolean{
    return user && this.af.isVip(user);
  }
  isWorker(user: any): boolean{
    return user && this.af.isWorker(user);
  }
}
