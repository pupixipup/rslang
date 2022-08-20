import { UserData } from "./userData";

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

export interface IAuth {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}