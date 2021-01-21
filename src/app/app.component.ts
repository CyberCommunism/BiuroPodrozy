import { Component } from '@angular/core';
import {AuthService} from './providers/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BiuroPodrozy';
  // tslint:disable-next-line:ban-types
  private isLoggedIn: Boolean | undefined;
  // tslint:disable-next-line:variable-name ban-types
  private user_Name: String | undefined;
  // tslint:disable-next-line:ban-types variable-name
  private user_email: String | undefined;
  constructor(public authService: AuthService, private router: Router) {

  }
}
