import { Pipe, PipeTransform } from '@angular/core';
import { tripObj } from '../tripObj';
export class FiltrePipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
  }
}
@Pipe({
  name: 'getLocate',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(tripList: tripObj[], country: string[]): tripObj[] {
    if (!country || country.length === 0){ return tripList; }
    if (!tripList){ return []; }
    return tripList.filter(trip => country.includes(trip.aim));
  }
}
@Pipe({
  name: 'getPrice',
  pure: false
})
export class SearchPrice implements PipeTransform {
  transform(tripList: any, low: number, high: number): any {
    if (!tripList){ return []; }
    if (Number.isNaN(low) && Number.isNaN(high)) { return tripList; }
    if (Number.isNaN(low) && !Number.isNaN(high)) { return tripList.filter((trip: any ) => trip.price <= high); }
    if (!Number.isNaN(low) && Number.isNaN(high)) { return tripList.filter((trip: any ) => trip.price >= low); }
    if (!Number.isNaN(low) && !Number.isNaN(high)) { return tripList.filter((trip: any ) => trip.price >= low && trip.price <= high); }
  }
}
@Pipe({
  name: 'getDate',
  pure: false
})
export class SearchStartDate implements PipeTransform {
  transform(tripList: any, startDate: string, endDate: string): any {
    if (!tripList){ return []; }
    if (startDate === '' && endDate === ''){ return tripList; }
    if (startDate !== '' && endDate === '') {
      if (new Date(startDate)) {
        const d = new Date(startDate);
        return tripList.filter((trip: any) => (new Date(trip.startTrip) >= d ));
      }
    }
    if (startDate === '' && endDate !== ''){
      if (new Date(endDate)) {
        const d = new Date(endDate);
        return tripList.filter((trip: any) => (new Date(trip.endTrip) <= d ));
      }
    }
    if (startDate !== '' && endDate !== ''){
      if (new Date(startDate) && new Date(endDate)) {
        const d = new Date(startDate);
        const d1 = new Date(endDate);
        return tripList.filter((trip: any) => (new Date(trip.startTrip) >= d  && new Date(trip.endTrip) <= d1 ));
      }
    }
  }
}
@Pipe({
  name: 'getSearch',
  pure: false
})
export class SearchSearch implements PipeTransform {
  transform(tripList: any, x: string): any {
    if (!tripList){ return []; }
    if (x === '') { return tripList; }
    // tslint:disable-next-line:max-line-length
    return tripList.filter((trip: any) => ((trip.name.toLowerCase().includes(x.toLowerCase())) || trip.aim.toLowerCase().includes(x.toLowerCase())));
  }
}
@Pipe({
  name: 'getCurr',
  pure: false
})
export class SearchCurr implements PipeTransform {
  transform(tripList: any, x: boolean, isVip: boolean, isW: boolean): any {
    if (x && !isVip && !isW) {
      return tripList.filter((trip: any) => ((new Date(trip.startTrip) > new Date() && trip.booked < trip.maxSpace)));
    }
    else if (x && isVip && !isW) {
      return tripList.filter((trip: any) => ((new Date(trip.startTrip) > new Date())));
    } else {
      return tripList;
    }
  }
}
