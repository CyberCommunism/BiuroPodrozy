import { Component, OnInit } from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {User} from '../User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // @ts-ignore
  user: User;
  constructor(private af: AuthService) {
    this.af.userData$.subscribe(user => this.user = user);
  }
  ngOnInit(): void {}
  logout(): void{
    this.af.singOut();
  }
}
