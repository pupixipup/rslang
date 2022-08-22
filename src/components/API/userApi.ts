import { IUserSignin } from "../../common/interfaces";
import { API } from "./api";
import { UserData } from "./userData";

export class UserApi {
  user: UserData;

  constructor() {
    this.user = new UserData();
  }

  async registerUser(email: string, password: string): Promise<void> {
    await API.createUser(email, password);
    await this.login(email, password);
  }
  async login(email: string, password: string): Promise<void>  {
      await API.signIn(email, password).then((data) => {
        localStorage.setItem('userData', JSON.stringify(data));
        this.user.setUser(data);
        this.user.setAuth(true);
        localStorage.setItem('isAuth', 'true');
      });
  }
  logout(): void  {
    this.user.setUser({} as IUserSignin);
    localStorage.removeItem('userData');
    API.signOut();
    this.user.setAuth(false);
    localStorage.removeItem('isAuth');
  }

}