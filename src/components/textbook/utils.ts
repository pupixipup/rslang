import { IUserWord, IWord } from "../../common/interfaces";

export class wordUtils {
  static areObjectsEqual(obj1: object, obj2: object) {
   return JSON.stringify(obj1) === JSON.stringify(obj2)
  }
}