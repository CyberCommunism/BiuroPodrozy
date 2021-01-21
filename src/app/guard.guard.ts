import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './providers/auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router )
  { }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
      return this.authService.userData$.pipe(
        take(1),
        map(user => {
          if (user) { return true; }
          else {
            this.router.navigate(['/login']).then(r => r);
            return false;
          }
        }));
  }
}

export class AddTripGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router )
  { }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< true | any >
  {
    return this.authService.userData$.pipe(
      take(1),
      map(user => {
        if (user && this.authService.canAdd(user)){
          return true;
        } else {
          return this.router.navigate(['/listOfTrips']).then(r => r);
        }
      }));
  }
}
export class LogInGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router )
  { }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    return this.authService.userData$.pipe(
      take(1),
      map(user => {
        return !!user;
      }));
  }
}
