import { Component, OnInit } from '@angular/core';
import trips from '../../trips.json';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddToShoppingService } from '../add-to-shopping.service';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private data: AddToShoppingService) {}
  // ==================================================
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
  // @ts-ignore
  uniqueArrOfCountry: string[];
  // @ts-ignore
  uniqueArrOfPrice: number[];
  // @ts-ignore
  uniqueArrOfStartDate: string[];
  // @ts-ignore
  uniqueArrOfEndDate: string[];
  // ===========================================
  // @ts-ignore
  modelForm: FormGroup;
  title = 'json-file-read-angular';
  public tripList: {
    name: string,
    aim: string,
    startTrip: string,
    endTrip: string,
    price: number,
    currency: string,
    maxSpace: number,
    description: string,
    imgURL: string,
    rate: Array<number>
  }[] = trips;
  howManyTrips = 0;
  // @ts-ignore
  booking = new Array(trips.length).fill(0);
  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      nameOfTrip: new FormControl('', [Validators.max(15), Validators.required]),
      aimOfTrip: new FormControl('', [Validators.max(30), Validators.required]),
      descriptionOfTrip: new FormControl('', [Validators.max(400), Validators.required]),
      priceOfTrip: new FormControl('', [Validators.max(4), Validators.required]),
      dateStartOfTrip: new FormControl('', Validators.required),
      dateEndOfTrip: new FormControl('', Validators.required),
      vacanciesOfTrip: new FormControl('', [Validators.max(3), Validators.required])
    });
    for (let i = 0; i < this.tripList.length; i++){
      this.rate[i] = this.tripList[i].rate;
    }
    this.uniqueArrOfCountry = this.getUniqueCountry();
    this.uniqueArrOfStartDate = this.getUniqueSDate();
    this.uniqueArrOfEndDate = this.getUniqueEDate();
    this.uniqueArrOfPrice = this.getUniquePrice();
  }
  // tslint:disable-next-line:typedef
  book(i: number){
    if (this.tripList[i].maxSpace > 0){
      // @ts-ignore
      this.tripList[i].maxSpace = (this.tripList[i].maxSpace - 1);
      this.booking[i] = (this.booking[i] + 1);
      this.howManyTrips = (this.howManyTrips + 1);
      this.addTripToShoppingList(this.tripList[i]);
    }
  }
  // tslint:disable-next-line:typedef
  cancel(i: number){
    if (this.tripList[i].maxSpace < (this.tripList[i].maxSpace + this.booking[i])){
      // @ts-ignore
      this.tripList[i].maxSpace = (this.tripList[i].maxSpace + 1);
      this.booking[i] = (this.booking[i] - 1);
      this.howManyTrips = (this.howManyTrips - 1);
      this.removeTripToShoppingList(this.tripList[i], 0);
    }
  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  getCurrency(s: string): string {
    switch (s){
      case 'EURO': return 'euro';
      case 'USD': return '$';
      case 'PLN': return 'zł';
    }
  }
  // tslint:disable-next-line:typedef
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
  // tslint:disable-next-line:typedef
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
  // tslint:disable-next-line:typedef
  getStyle(i: number){
    if (i === this.getIndexOfMax()){
      return {border: '5px solid green'};
    }
    if (i === this.getIndexOfMin()){
      return {border: '5px solid red'};
    }
    return {border: 'none'};
  }
  // tslint:disable-next-line:typedef
  delete(i: number){
    this.removeTripToShoppingList(this.tripList[i], 1);
    this.tripList.splice(i, 1);
    this.howManyTrips = (this.howManyTrips - this.booking[i]);
    this.booking.splice(i, 1);
    this.rate.splice(i, 1);
    this.userRate.splice(i , 1);
    this.whichRated.splice(i, 1);
  }
  // tslint:disable-next-line:typedef
  addTrip(){
    const urlImg = 'https://source.unsplash.com/1000x900/?' + this.modelForm.get('aimOfTrip')?.value;
    const x = {
      name: this.modelForm.get('nameOfTrip')?.value,
      aim: this.modelForm.get('aimOfTrip')?.value,
      startTrip: this.modelForm.get('dateStartOfTrip')?.value,
      endTrip: this.modelForm.get('dateEndOfTrip')?.value,
      price: this.modelForm.get('priceOfTrip')?.value,
      currency: 'EURO',
      maxSpace: this.modelForm.get('vacanciesOfTrip')?.value,
      description: this.modelForm.get('descriptionOfTrip')?.value,
      imgURL: urlImg,
      rate: []
    };
    this.tripList.push(x);
    this.rate.push([]);
    this.userRate.push(0);
    this.whichRated.push(0);
    this.booking.push(0);
    this.modelForm.reset();
    this.uniqueArrOfCountry = this.getUniqueCountry();
    this.uniqueArrOfPrice = this.getUniquePrice();
    this.uniqueArrOfStartDate = this.getUniqueSDate();
    this.uniqueArrOfEndDate = this.getUniqueEDate();
  }
  // tslint:disable-next-line:typedef
  getRate(i: number){
    let s = 0;
    let j = 0;
    for (j = 0; j < this.rate[i].length ; j++){
      s += this.rate[i][j];
    }
    return (s / j);
  }
  // tslint:disable-next-line:typedef
  fun(i: number){
    if (this.whichRated[i] === 0){
      this.rate[i].push(this.userRate[i] - 0);
    }
    this.whichRated[i] = 1;
  }
  // tslint:disable-next-line:typedef
  addTripToShoppingList(trip: {
    name: string; aim: string;
    startTrip: string; endTrip: string;
    price: number; currency: string;
    maxSpace: number; description: string;
    imgURL: string; rate: Array<number>;
  }){
    this.data.addTripToShopping(trip);
  }
  // tslint:disable-next-line:typedef
  removeTripToShoppingList(trip: {
    name: string; aim: string;
    startTrip: string; endTrip: string;
    price: number; currency: string;
    maxSpace: number; description: string;
    imgURL: string; rate: Array<number>;
  },                       a: number){
    this.data.removeTripToShopping(trip, a);
  }
  // tslint:disable-next-line:typedef
  getTripList(){
    return this.tripList;
  }
  // tslint:disable-next-line:typedef
  getIndex(trip: {
    name: string; aim: string;
    startTrip: string; endTrip: string;
    price: number; currency: string;
    maxSpace: number; description: string;
    imgURL: string; rate: Array<number>;
  }){
    return this.tripList.indexOf(trip);
  }
  // tslint:disable-next-line:typedef
  addTOuniqueArrOfCountry(x: string){
    if (this.chosenLoc.includes(x)){
      if (this.chosenLoc.length === 1){
        // @ts-ignore
        this.chosenLoc = [];
      } else {
        const g = this.chosenLoc.indexOf(x);
        const f = this.chosenLoc;
        f.splice(g, 1);
        this.chosenLoc = f;
      }
    } else {
      this.chosenLoc.push(x);
    }
}
  // tslint:disable-next-line:typedef
  addTOuniqueArrOfPrice(x: number){
    if (this.chosenPrice.includes(x)){
      if (this.chosenPrice.length === 1){
        // @ts-ignore
        this.chosenPrice = [];
      } else {
        const g = this.chosenPrice.indexOf(x);
        const f = this.chosenPrice;
        f.splice(g, 1);
        this.chosenPrice = f;
      }
    } else {
      this.chosenPrice.push(x);
    }
  }
  // tslint:disable-next-line:typedef
  addTOuniqueArrOfDate(x: string){
    if (this.chosenDate.includes(x)){
      if (this.chosenDate.length === 1){
        // @ts-ignore
        this.chosenDate = [];
      } else {
        const g = this.chosenDate.indexOf(x);
        const f = this.chosenDate;
        f.splice(g, 1);
        this.chosenDate = f;
      }
    } else {
      this.chosenDate.push(x);
    }
  }
  // tslint:disable-next-line:typedef
  addTOuniqueArrOfEDate(x: string){
    if (this.chosenEDate.includes(x)){
      if (this.chosenEDate.length === 1){
        // @ts-ignore
        this.chosenEDate = [];
      } else {
        const g = this.chosenEDate.indexOf(x);
        const f = this.chosenEDate;
        f.splice(g, 1);
        this.chosenEDate = f;
      }
    } else {
      this.chosenEDate.push(x);
    }
  }
  // tslint:disable-next-line:typedef
  getUniqueCountry(): string[]{
    const tmp = [];
    let flag = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.tripList.length ; i++ ){
      flag = true;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0 ; j < tmp.length ; j++ ){
        if (tmp[j] === this.tripList[i].aim){
          flag = false;
        }
      }
      if (flag){
        tmp.push(this.tripList[i].aim);
      }
    }
    tmp.sort();
    return tmp;
  }
  getUniqueSDate(): string[]{
    const tmp = [];
    let flag = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.tripList.length ; i++ ){
      flag = true;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0 ; j < tmp.length ; j++ ){
        if (tmp[j] === this.tripList[i].startTrip){
          flag = false;
        }
      }
      if (flag){
        tmp.push(this.tripList[i].startTrip);
      }
    }
    return tmp;
  }
  getUniqueEDate(): string[]{
    const tmp = [];
    let flag = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.tripList.length ; i++ ){
      flag = true;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0 ; j < tmp.length ; j++ ){
        if (tmp[j] === this.tripList[i].endTrip){
          flag = false;
        }
      }
      if (flag){
        tmp.push(this.tripList[i].endTrip);
      }
    }
    return tmp;
  }
  getUniquePrice(): number[]{
    const tmp = [];
    let flag = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.tripList.length ; i++ ){
      flag = true;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0 ; j < tmp.length ; j++ ){
        if (tmp[j] === this.tripList[i].price){
          flag = false;
        }
      }
      if (flag){
        tmp.push(this.tripList[i].price);
      }
    }
    tmp.sort();
    return tmp;
  }
}
