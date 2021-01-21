// tslint:disable-next-line:class-name
export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
// tslint:disable-next-line:class-name
export interface Roles {
  admin: boolean;
  reader: boolean;
  worker: boolean;
  vip: boolean;
}
