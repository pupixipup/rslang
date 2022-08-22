import { IUserSignin } from '../../common/interfaces';

export class UserData {
  user: IUserSignin;
  isAuth: boolean;

  constructor() {
    this.user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : {};
    this.isAuth = this.isAuth = localStorage.getItem('isAuth') ? !!localStorage.getItem('isAuth') : false;
  }

  setUser (user: IUserSignin): void {
    this.user = user;
  }
  setAuth (bool: boolean): void {
    this.isAuth = bool;
  }
}