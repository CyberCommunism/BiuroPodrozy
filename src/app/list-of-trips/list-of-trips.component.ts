import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service/data-service.service';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-list-of-trips',
  templateUrl: './list-of-trips.component.html',
  styleUrls: ['./list-of-trips.component.css']
})
export class ListOfTripsComponent implements OnInit {

  constructor(private data: DataServiceService) {}

  tripsList: any;

  ngOnInit(): void {
    this.getTripList();
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
}
