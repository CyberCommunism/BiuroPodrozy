import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {DataServiceService} from '../data-service/data-service.service';
import {User} from '../User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  stan = 0;
  // @ts-ignore
  users: User[];
  trips: any;
  constructor(private data: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
    this.getTripList();
  }
  getUserList(): void{
    this.data.getListOfUsers().pipe(
      map(changes =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) => {
          const res: User = {
            uid: c.payload.key,
            email: c.payload.val().email,
            roles: c.payload.val().roles
          };
          return (res);
          }
        ))
    ).subscribe(
      users => {
        this.users = users;
      });
  }
  getTripList(): void{
    this.data.getList().pipe(
      map(changes =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) => {
            return ({key: c.payload.key, ...c.payload.val()});
          }
        ))
    ).subscribe(
      list => {this.trips = list; });
  }
  arch(trip: any): boolean{
    return (new Date(trip.startTrip) < new Date());
  }
}
