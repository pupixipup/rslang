import { createUser, loginUser } from "../api/api";

export class UserData {
  user: {email?: string, password?: string};
  isAuth: boolean
  constructor() {
    this.user = {};
    this.isAuth = false;
  }
  setUser (user: {email?: string, password?: string}) {
    this.user = user;
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async registerUser(email: string, password: string): Promise<void> {
    await createUser({email: email, password: password}).then((resp) => {
      this.setUser(resp);
    });
    this.setAuth(true);
    localStorage.setItem('isAuth', 'true');
    await loginUser({email: email, password: password}).then((resp) => {
      localStorage.setItem('token', resp.token);
    });
  }
  async login(email: string, password: string): Promise<void>  {
    await loginUser({email: email, password: password}).then((resp) => {
      console.log(resp);
      localStorage.setItem('token', resp.token);
    });
    this.setAuth(true);
    localStorage.setItem('isAuth', 'true');
  }
  logout(): void  {
    this.setAuth(false);
    this.setUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
  }
}