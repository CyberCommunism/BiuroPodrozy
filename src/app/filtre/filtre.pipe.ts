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
  transform(tripList: tripObj[], low: number, high: number): tripObj[] {
    if (!tripList){ return []; }
    return tripList.filter(trip => trip.price >= low && trip.price <= high);
  }
}
@Pipe({
  name: 'getStartDate',
  pure: false
})
export class SearchStartDate implements PipeTransform {
  transform(tripList: tripObj[], startDate: string[]): tripObj[] {
    if (!startDate || startDate.length === 0){ return tripList; }
    if (!tripList){ return []; }
    return tripList.filter(trip => startDate.includes(trip.startTrip));
  }
}
@Pipe({
  name: 'getEndDate',
  pure: false
})
export class SearchEndDate implements PipeTransform {
  transform(tripList: tripObj[], endDate: string[]): tripObj[]{
    if (!endDate || endDate.length === 0){ return tripList; }
    if (!tripList){ return []; }
    return tripList.filter(trip => endDate.includes(trip.endTrip));
  }
}
/*
@Pipe({
  name: 'howManyFreeSpace',
  pure: false
})
export class SearchFreeSpace implements PipeTransform {
  transform(tripList: tripObj[], minimum: number): tripObj[]{
    if (!tripList){ return []; }
    return tripList.filter(trip => trip.maxSpace >= minimum);
  }
}
@Pipe({
  name: 'byRate',
  pure: false
})
export class SearchByRate implements PipeTransform {
  transform(tripList: tripObj[], minimum: number): tripObj[]{
    if (!tripList){ return []; }
    return tripList.filter(trip => ((trip.rate.reduce((sum, current) => sum + current, 0)) / trip.rate.length) >= minimum );
  }
}
 */
