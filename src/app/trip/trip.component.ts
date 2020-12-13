import { Component, OnInit } from '@angular/core';
import trips from '../../trips.json';
import { AddToShoppingService } from '../add-to-shopping.service';
import { tripObj } from './tripObj';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  constructor(private data: AddToShoppingService) {}
  // ==================================================
  rate = new Array(trips.length).fill([]);
  userRate = new Array(trips.length).fill(0);
  whichRated = new Array(trips.length).fill(0);
  // ============================================
  chosenLoc: string[] = [];
  chosenPrice: number[] = [];
  chosenDate: string[] = [];
  chosenEDate: string[] = [];
  // ====================================================
  uniqueArrOfCountry: string[] | undefined;
  uniqueArrOfPrice: number[] | undefined;
  uniqueArrOfStartDate: string[] | undefined;
  uniqueArrOfEndDate: string[] | undefined;
  // =====================================================
  public tripList: tripObj[] = trips;
  howManyTrips = 0;
  booking = new Array(trips.length).fill(0);
  ngOnInit(): void {
    for (let i = 0; i < this.tripList.length; i++){ this.rate[i] = this.tripList[i].rate; }
    this.uniqueArrOfCountry = this.getUniqueCountry();
    this.uniqueArrOfStartDate = this.getUniqueSDate();
    this.uniqueArrOfEndDate = this.getUniqueEDate();
    this.uniqueArrOfPrice = this.getUniquePrice();
  }
  // ==================================================
  book(i: number): void{
    if (this.tripList[i].maxSpace > 0){
      this.tripList[i].maxSpace = (this.tripList[i].maxSpace - 1);
      this.booking[i] = (this.booking[i] + 1);
      this.howManyTrips = (this.howManyTrips + 1);
      this.addTripToShoppingList(this.tripList[i]);
    }
  }
  cancel(i: number): void{
    if (this.tripList[i].maxSpace < (this.tripList[i].maxSpace + this.booking[i])){
      this.tripList[i].maxSpace = (this.tripList[i].maxSpace + 1);
      this.booking[i] = (this.booking[i] - 1);
      this.howManyTrips = (this.howManyTrips - 1);
      this.removeTripToShoppingList(this.tripList[i], 0);
    }
  }
  delete(i: number): void{
    this.removeTripToShoppingList(this.tripList[i], 1);
    this.tripList.splice(i, 1);
    this.howManyTrips = (this.howManyTrips - this.booking[i]);
    this.booking.splice(i, 1);
    this.rate.splice(i, 1);
    this.userRate.splice(i , 1);
    this.whichRated.splice(i, 1);
  }
  addTrip(x: tripObj): void{
    this.tripList.push(x);
    this.rate.push([]);
    this.userRate.push(0);
    this.whichRated.push(0);
    this.booking.push(0);
    this.uniqueArrOfCountry = this.getUniqueCountry();
    this.uniqueArrOfPrice = this.getUniquePrice();
    this.uniqueArrOfStartDate = this.getUniqueSDate();
    this.uniqueArrOfEndDate = this.getUniqueEDate();
  }
  addTripToShoppingList(trip: tripObj): void{
    this.data.addTripToShopping(trip);
  }
  removeTripToShoppingList(trip: tripObj, a: number): void{
    this.data.removeTripToShopping(trip, a);
  }
  // ==================================================
  getCurrency(s: string): string{
    switch (s){
      case 'EURO': return 'euro';
      case 'USD': return '$';
      case 'PLN': return 'zł';
      default : return 'Undefined';
    }
  }
  getIndexOfMax(): number {
    let max = 0;
    let index = -1;
    for (let i = 0; i < this.tripList.length; i++){
      if (this.tripList[i].price > max){
        max = this.tripList[i].price;
        index = i;
      }
    }
    return index;
  }
  getIndexOfMin(): number{
    let min = this.tripList[0].price;
    let index = 0;
    for (let i = 0; i < this.tripList.length; i++){
      if (this.tripList[i].price < min){
        min = this.tripList[i].price;
        index = i;
      }
    }
    return index;
  }
  getStyle(i: number): object{
    if (i === this.getIndexOfMax()){ return {border: '5px solid green'}; }
    if (i === this.getIndexOfMin()){ return {border: '5px solid red'}; }
    return {border: 'none'};
  }
  getRate(i: number): number{
    return (this.rate[i].sum / this.rate[i].length);
  }
  fun(i: number): void{
    if (this.whichRated[i] === 0){ this.rate[i].push(this.userRate[i] - 0); }
    this.whichRated[i] = 1;
  }
  getTripList(): tripObj[]{
    return this.tripList;
  }
  getIndex(trip: tripObj): number{
    return this.tripList.indexOf(trip);
  }
  // ==================================================
  addTOuniqueArrOfCountry(x: string): void{
    if (this.chosenLoc.includes(x)){
      if (this.chosenLoc.length === 1){ this.chosenLoc = []; }
      else {
        const g = this.chosenLoc.indexOf(x);
        const f = this.chosenLoc;
        f.splice(g, 1);
        this.chosenLoc = f;
      }
    } else { this.chosenLoc.push(x); }
}
  addTOuniqueArrOfPrice(x: number): void{
    if (this.chosenPrice.includes(x)){
      if (this.chosenPrice.length === 1){ this.chosenPrice = []; }
      else {
        const g = this.chosenPrice.indexOf(x);
        const f = this.chosenPrice;
        f.splice(g, 1);
        this.chosenPrice = f;
      }
    } else { this.chosenPrice.push(x); }
  }
  addTOuniqueArrOfDate(x: string): void{
    if (this.chosenDate.includes(x)){
      if (this.chosenDate.length === 1){ this.chosenDate = []; }
      else {
        const g = this.chosenDate.indexOf(x);
        const f = this.chosenDate;
        f.splice(g, 1);
        this.chosenDate = f;
      }
    } else { this.chosenDate.push(x); }
  }
  addTOuniqueArrOfEDate(x: string): void{
    if (this.chosenEDate.includes(x)){
      if (this.chosenEDate.length === 1){ this.chosenEDate = []; }
      else {
        const g = this.chosenEDate.indexOf(x);
        const f = this.chosenEDate;
        f.splice(g, 1);
        this.chosenEDate = f;
      }
    } else { this.chosenEDate.push(x); }
  }
  // ==================================================
  getUniqueCountry(): string[]{
    const tmp = [];
    let flag = true;
    for (const i of this.tripList){
      flag = true;
      for (const j of tmp){
        if (j === i.aim){ flag = false; }
      }
      if (flag){ tmp.push(i.aim); }
    }
    tmp.sort();
    return tmp;
  }
  getUniqueSDate(): string[]{
    const tmp = [];
    let flag = true;
    for (const i of this.tripList){
      flag = true;
      for (const j of tmp){
        if (j === i.startTrip){ flag = false; }
      }
      if (flag){ tmp.push(i.startTrip); }
    }
    return tmp;
  }
  getUniqueEDate(): string[]{
    const tmp = [];
    let flag = true;
    for (const i of this.tripList){
      flag = true;
      for (const j of tmp){
        if (j === i.endTrip){ flag = false; }
      }
      if (flag){ tmp.push(i.endTrip); }
    }
    return tmp;
  }
  getUniquePrice(): number[]{
    const tmp = [];
    let flag = true;
    for (const i of this.tripList){
      flag = true;
      for (const j of tmp){
        if (j === i.price){ flag = false; }
      }
      if (flag){ tmp.push(i.price); }
    }
    tmp.sort();
    return tmp;
  }
}
