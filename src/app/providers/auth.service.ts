import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {Roles, User} from '../User';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public af: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
    // @ts-ignore
    this.userData$ = this.af.authState
      .pipe(switchMap((user: any) => {
        if (user != null) {
          console.log(user.uid);
          return this.db.object('user/' + user.uid).valueChanges();
        } else {
          return of (null);
        }
      }));
  }
  userData$: Observable<User>;
  static createUserData(user: any): void {
    firebase.database().ref('user/' + user.uid).set({
      email: user.email,
      roles: { admin: false, reader: false, worker: false, vip: true }
    });
  }
  singOut(): void{
    this.af.signOut().then( () => this.router.navigate(['/main']));
  }
  signIn(email: string, password: string): void{
    this.af.signInWithEmailAndPassword(email, password)
      .then( () => {
        this.router.navigate(['/listOfTrips']);
      })
      .catch( () => { alert('Niepoprawne dane'); });
  }
  register(email: string, password: string): void{
    this.af.createUserWithEmailAndPassword(email, password).then(result => {
      AuthService.createUserData(result.user);
    });
  }

  canEdit(user: User): boolean {
    return user && (user.roles.admin || user.roles.worker);
  }
  canDelete(user: User): boolean {
    return user && user.roles.admin;
  }
  canAdd(user: User): boolean {
    return user && user.roles.admin;
  }
  isVip(user: User): boolean {
    return user && user.roles.vip;
  }
  isWorker(user: User): boolean {
    return user && user.roles.worker;
  }
  isReader(user: User): boolean {
    return user && user.roles.reader;
  }
  isAdmin(user: User): boolean {
    return user && user.roles.admin;
  }

  setUserRole(uid: string, userRole: Roles): void {
    // if (uid === undefined) { console.log('elo'); return; }
    firebase.database().ref('user/' + uid + '/roles').update(userRole);
  }
}
