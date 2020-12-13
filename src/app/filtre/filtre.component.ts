import { Pipe, PipeTransform } from '@angular/core';
import { tripObj } from '../trip/tripObj';
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
  transform(tripList: tripObj[], price: number[]): tripObj[] {
    if (!price || price.length === 0){ return tripList; }
    if (!tripList){ return []; }
    return tripList.filter(trip => price.includes(trip.price));
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
