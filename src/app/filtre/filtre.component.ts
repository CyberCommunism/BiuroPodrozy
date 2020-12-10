import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'getLocate',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  transform(tripList: {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[], country: string[]):
  // tslint:disable-next-line:max-line-length
    {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[]
  {
    if (!country || country.length === 0){
        return tripList;
      }
    if (!tripList){
        return [];
      }
    return tripList.filter(trip => country.includes(trip.aim));
  }
}
@Pipe({ name: 'getPrice' ,
  pure: false})
export class SearchPrice implements PipeTransform {
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  transform(tripList: {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[], price: number[]):
  // tslint:disable-next-line:max-line-length
    {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[]
  {
    if (!price || price.length === 0){
      return tripList;
    }
    if (!tripList){
      return [];
    }
    return tripList.filter(trip => price.includes(trip.price));
  }
}

@Pipe({ name: 'getStartDate' ,
  pure: false})
export class SearchStartDate implements PipeTransform {
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  transform(tripList: {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[], startDate: string[]):
  // tslint:disable-next-line:max-line-length
    {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[]
  {
    if (!startDate || startDate.length === 0){
      return tripList;
    }
    if (!tripList){
      return [];
    }
    return tripList.filter(trip => startDate.includes(trip.startTrip));
  }
}
@Pipe({ name: 'getEndDate' ,
  pure: false})
export class SearchEndDate implements PipeTransform {
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  transform(tripList: {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[], endDate: string[]):
  // tslint:disable-next-line:max-line-length
    {name: string, aim: string, startTrip: string, endTrip: string, price: number, currency: string, maxSpace: number, description: string, imgURL: string, rate: Array<number> }[]
  {
    if (!endDate || endDate.length === 0){
      return tripList;
    }
    if (!tripList){
      return [];
    }
    return tripList.filter(trip => endDate.includes(trip.endTrip));
  }
}

