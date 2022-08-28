import { localWord, IUserWord } from "../../common/interfaces";


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

  static getIdsArray(array: localWord[]) {
    return array.map((element) => element._id);
  }
  
  static getUniqueWords(array1: localWord[], array2: IUserWord[]) {
    const idsOnly = wordUtils.getIdsArray(array1);
    return array2.filter(element => !idsOnly.includes(element._id));
  }
}