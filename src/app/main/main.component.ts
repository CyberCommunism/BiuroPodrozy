import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // @ts-ignore
  user: User;
  constructor(private af: AuthService) {this.af.userData$.subscribe(user => this.user = user);}
  ngOnInit(): void {}
  logout(): void{this.af.singOut();}
}
