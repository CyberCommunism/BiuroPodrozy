import { Component, OnInit } from '@angular/core';
import {AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  email = '';
  password = '';
  constructor(private af: AuthService) { }

  ngOnInit(): void {
  }
  save(): void{
    this.af.register(this.email, this.password);
  }
}
