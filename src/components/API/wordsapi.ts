import { WORD_PER_PAGE } from "../../common/constants";
import { IUser, IUserSignin, IUserToken, IUserWord, IUserWordOptions, IWord } from "../../common/interfaces";
import {API} from "./api";

export class WordsApi {
  /**
  * return all difficult words 
  * @getWords
  * @param {number} page - page
  * @returns {Promise<IWord[]>} array of words
  */
  static getDifficultWords(page?: number){
    const pageLength = page === undefined ? 3600 : WORD_PER_PAGE;
    return API.getAggregatedUserWords(undefined, page, pageLength, JSON.stringify({"userWord.difficulty" : "hard"}))
    .catch((err: Error) => {throw new Error(err.message)}); 
  }

  static async setWord(id: string, userWord: IUserWordOptions, isUserWord: boolean) {
    if (isUserWord) {
      API.updateUserWord(id, userWord)
      console.log('updated');
      
    } else {
      console.log('created');
      API.createUserWord(id, { difficulty: userWord.difficulty, optional: { new: true, learnt: userWord?.optional?.learnt }});  
      }
  }

  /**
  * return user words 
  * @getWords
  * @param {number} page - page
  * @param {number} group - group
  * @returns {Promise<IUserWord[]>} array of words
  */
  static getUserWords(page: number, group: number){
    return API.getAggregatedUserWords(group, 0, WORD_PER_PAGE, JSON.stringify({"page" : page}))
      .catch((err: Error) => {throw new Error(err.message)});
  }
 /**
 * return all words from page and group
 * @getWords
 * @param {number} page - page
 * @param {number} group - group
 * @returns {Promise<IWord[]>} array of words
 */
  static getWords(page?: number, group?: number) {
    if (page === undefined) page = 0;
    if (group === undefined) group = 0;

    return API.getWords(page, group)    
  }
}