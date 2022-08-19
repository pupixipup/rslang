
import { createUser, loginUser } from "../api/api";
import { User } from "./types";

export class UserData {
  user: {email?: string, password?: string};
  isAuth: boolean
  constructor() {
    this.user = {};
    this.isAuth = false;
  }
  setUser (user: User) {
    this.user = user;
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async registerUser(email: string, password: string): Promise<void> {
    await createUser({email: email, password: password}).then((resp) => {
      this.setUser(resp);
      console.log(resp);
    });
    this.setAuth(true);
    await loginUser({email: email, password: password}).then((resp) => {
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', resp.token);
      }
    });
    
  }
  async login(email: string, password: string): Promise<void>  {
    await loginUser({email: email, password: password}).then((resp) => {
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', resp.token);
      }
    });
    this.setAuth(true);
  }
}