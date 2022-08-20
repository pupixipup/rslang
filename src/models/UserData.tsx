import { createUser, getToken, loginUser } from "../api/api";
import { IAuth } from "./types";

export class UserData {
  user: IAuth;
  isAuth: boolean

  constructor() {
    this.user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : {};
    this.isAuth = localStorage.getItem('isAuth') ? !!localStorage.getItem('isAuth') : false;
  }
  setUser (user: IAuth) {
    this.user = user;
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async registerUser(email: string, password: string): Promise<void> {
    await createUser({email: email, password: password});
    await this.login(email, password);
  }
  async login(email: string, password: string): Promise<void>  {
    await loginUser({email: email, password: password}).then((resp) => {
      this.setUser(resp);
      localStorage.setItem('userData', JSON.stringify(resp));
    });
    this.setAuth(true);
    localStorage.setItem('isAuth', 'true');
  }
  logout(): void  {
    this.setAuth(false);
    this.setUser({} as IAuth);
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuth');
  }
  getExpirationDateToken (token?: string): number | null {
    if (!token) {
      return null;
    }
    const jwt = JSON.parse(atob(this.user.token.split('.')[1]));
    console.log(jwt);
    
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  }
  isExpired(exp?: number | null) {
    if (!exp) {
      return false;
    }
    return Date.now() > exp;
  }
  async refreshToken () {
    if (!this.user || !this.user.token) {
      return null;
    }
    
    if (this.isExpired(this.getExpirationDateToken(this.user.token))) {
      await getToken(this.user.userId, this.user.token).then((resp) => {
        this.user.token = resp.token;
        this.user.refreshToken = resp.refreshToken;
        this.setAuth(true);
      });
    }

  }
}