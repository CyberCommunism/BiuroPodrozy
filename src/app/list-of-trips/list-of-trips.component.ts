import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service/data-service.service';
import { map } from 'rxjs/operators';
import { SetToPipe } from '../set-to-pipe';
@Component({
  selector: 'app-list-of-trips',
  templateUrl: './list-of-trips.component.html',
  styleUrls: ['./list-of-trips.component.css']
})
export class ListOfTripsComponent implements OnInit {

  tripsList: any;
  // @ts-ignore
  dataToFiltre: SetToPipe;
  constructor(private data: DataServiceService) {}

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
}
