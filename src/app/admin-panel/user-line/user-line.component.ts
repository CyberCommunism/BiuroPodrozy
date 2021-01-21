import {Component, Input, OnInit} from '@angular/core';
import {Roles, User} from '../../User';
import {AuthService} from '../../providers/auth.service';

@Component({
  selector: 'app-user-line',
  templateUrl: './user-line.component.html',
  styleUrls: ['./user-line.component.css']
})
export class UserLineComponent implements OnInit {
  // @ts-ignore
  @Input() userData: User;
  // @ts-ignore
  toUpDate: Roles;
  // @ts-ignore
  @Input() uid: string;
  flag1 = false;
  flag2 = false;
  flag3 = false;
  flag4 = false;
  constructor(private af: AuthService) {}

  ngOnInit(): void {
    this.toUpDate = this.userData.roles;
    // @ts-ignore
    this.uid = this.userData.uid;
  }
  save(): void{
    if (this.userData != null){
      this.af.setUserRole(this.userData.uid, this.toUpDate);
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = false;
      this.flag4 = false;
    }
  }
}
