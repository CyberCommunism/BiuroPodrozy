import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service/data-service.service';
import { map } from 'rxjs/operators';
import {AuthService} from '../providers/auth.service';
import {User} from '../User';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  routeSub: string | undefined;
  currTrip: any;
  booked = 0;
  rate = 0;
  rateNum = 0;
  rateChose = 'Rate here';
  // @ts-ignore
  user: User;
  constructor(private route: ActivatedRoute,
              private data: DataServiceService,
              private router: Router,
              public af: AuthService) {
    this.af.userData$.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeSub = params.id;
    });
    if (this.routeSub === undefined ){
      this.router.navigate(['/listOfTrips']).then(r => r);
    } else {
      this.data.getList().pipe(
        map(changes =>
          changes.map((c: { payload: { key: any; val: () => any; }; }) => {
            return ({key: c.payload.key, ...c.payload.val()}); }
          ).filter( (c: any) => c.key === this.routeSub)
            .map((c: any) => {
              return c;
            }))
      ).subscribe(list => {
        if (list[0] === undefined){
          this.router.navigate(['/listOfTrips']).then(r => r);
        }
        this.booked = list[0].booked;
        this.rate = list[0].rate;
        this.rateNum = list[0].rateNum;
        this.currTrip = list;
      } );
    }
  }
  book(): void{
    if (this.routeSub != null) {
      this.data.update(this.routeSub, {booked: (this.booked + 1)});
    }
  }
  cancel(): void{
    if (this.routeSub != null) {
      this.data.update(this.routeSub, {booked: (this.booked - 1)});
    }
  }
  delete(): void{
    if (this.routeSub != null) {
      this.data.remove(this.routeSub);
      this.router.navigate(['/listOfTrips']).then(r => r);
    }
  }
  addToRate(): void {
    if (this.routeSub != null && this.rateChose != null) {
      // tslint:disable-next-line:radix
      this.data.update(this.routeSub, {rate: (this.rate + parseInt(this.rateChose))});
      this.data.update(this.routeSub, {rateNum: (this.rateNum + 1)});
    }
  }
}
