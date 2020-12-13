import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {tripObj} from '../tripObj';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() emitter = new EventEmitter<tripObj>();
  constructor(private formBuilder: FormBuilder) { }
  // @ts-ignore
  modelForm: FormGroup;
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
  }
  addTrip(): void{
    const urlImg = 'https://source.unsplash.com/1000x900/?' + this.modelForm?.get('aimOfTrip')?.value;
    const x = {
      name: this.modelForm?.get('nameOfTrip')?.value,
      aim: this.modelForm?.get('aimOfTrip')?.value,
      startTrip: this.modelForm?.get('dateStartOfTrip')?.value,
      endTrip: this.modelForm?.get('dateEndOfTrip')?.value,
      price: this.modelForm?.get('priceOfTrip')?.value,
      currency: 'EURO',
      maxSpace: this.modelForm?.get('vacanciesOfTrip')?.value,
      description: this.modelForm?.get('descriptionOfTrip')?.value,
      imgURL: urlImg,
      rate: []
    };
    this.modelForm?.reset();
    this.emitter.emit(x);
  }
}
