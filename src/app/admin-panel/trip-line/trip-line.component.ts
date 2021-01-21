import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-trip-line',
  templateUrl: './trip-line.component.html',
  styleUrls: ['./trip-line.component.css']
})
export class TripLineComponent implements OnInit {
  @Input() tripData: any;
  constructor() { }

  ngOnInit(): void {
  }

}
