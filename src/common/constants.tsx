import { Path } from "../models/types";

const URL = 'http://localhost:8000/';

export const PATH: Path = {
  newUser: `${URL}users`,
  signin: `${URL}signin`,
}