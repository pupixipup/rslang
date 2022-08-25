import { ERROR, WORD_PER_PAGE } from "../../common/constants";
import { IUser, IUserSignin, IUserToken, IUserWord, IUserWordOptions, IUserWordUpload, IWord } from "../../common/interfaces";
import {API} from "./api";

export class WordsApi {
  /**
  * return all difficult words 
  * @getWords
  * @param {number} page - page
  * @returns {Promise<IUserWord[]>} array of words
  */
  static getDifficultWords(page?: number){
    const pageLength = page === undefined ? 3600 : WORD_PER_PAGE;
    return API.getAggregatedUserWords(undefined, page, pageLength, JSON.stringify({"userWord.difficulty" : "hard"}))
    .catch((err: Error) => {throw new Error(err.message)}); 
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

  static  uploadUserWord(wordToUp: IUserWordUpload){   
    return API.createUserWord(wordToUp.wordId, wordToUp.wordOptions)
      .catch((err: Error) => {
        if(err.message.includes(ERROR.already_exist))
          return API.updateUserWord(wordToUp.wordId, wordToUp.wordOptions)
            .catch((err: Error) => {throw new Error(err.message)});
        throw new Error(err.message);           
      })
  }

  static uploadUserWords(wordListToUp: IUserWordUpload[]){
    const arr = wordListToUp.map((item) => WordsApi.uploadUserWord(item));
    return Promise.allSettled(arr)
      .then(() => {})
  }
}