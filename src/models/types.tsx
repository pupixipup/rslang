import { UserData } from "./UserData";

export type Path = {
  newUser: string,
  signin: string;
}

export interface User {
  email: string,
  password: string
}

export interface IUserData {
  userData: UserData,
}