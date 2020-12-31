import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SetToPipe } from '../../set-to-pipe';
@Component({
  selector: 'app-filtre-field',
  templateUrl: './filtre-field.component.html',
  styleUrls: ['./filtre-field.component.css']
})
export class FiltreFieldComponent implements OnInit {
  flag = false;
  searchText = '';
  lowPrice = '';
  highPrice = '';
  startDateChosen = '';
  endDateChosen = '';
  @Output() newItemEvent = new EventEmitter<SetToPipe>();
  constructor() { }
  ngOnInit(): void {}
  doIt(): void {
    this.flag = !this.flag;
  }
  emit(): void {
    const x: SetToPipe = {
      startData: this.startDateChosen,
      endData: this.endDateChosen,
      // tslint:disable-next-line:radix
      lowPrice: parseInt(this.lowPrice),
      // tslint:disable-next-line:radix
      highPrice: parseInt(this.highPrice),
      country: this.searchText
    };
    console.log(x.country);
    console.log(typeof x.country);
    this.newItemEvent.emit(x);
  }
}
