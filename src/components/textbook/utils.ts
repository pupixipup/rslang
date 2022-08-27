import { IUser, IUserWord, IWord } from "../../common/interfaces";

export class wordUtils {
  static areObjectsEqual(obj1: object, obj2: object) {
   return JSON.stringify(obj1) === JSON.stringify(obj2)
  }
  static countHardWords(array: IUserWord[]) {
    return array.filter((element) => element.userWord?.difficulty === 'hard').length;
  }
  static countLearntWords(array: IUserWord[]) {
    return array.filter((element) => {
      if (element.userWord?.optional?.learnt === undefined) return false;
      return element.userWord?.optional?.learnt}).length;
  }
}