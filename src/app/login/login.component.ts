import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  login() {
    this.authService.signIn(this.email, this.password);
  }
}
