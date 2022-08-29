import { ERROR, TOTAL_WORD, WORD_PER_PAGE } from "../../common/constants";
import { IUser, IUserSignin, IUserStats, IUserToken, IUserWord, IUserWordOptions, IUserWordUpload, IWord, IWordStats } from "../../common/interfaces";
import {API} from "./api";

export class WordsApi {
  /**
  * return all difficult words 
  * @getWords
  * @param {number} page - page
  * @returns {Promise<IUserWord[]>} array of words
  */
  static getDifficultWords(page?: number){
    const pageLength = page === undefined ? TOTAL_WORD : WORD_PER_PAGE;
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
  * @param {number} group - group
  * @param {number} page - page 
  * @returns {Promise<IUserWord[]>} array of words
  */
  static getUserWords(page: number, group: number){
    const pageLength =  WORD_PER_PAGE;
    return API.getAggregatedUserWords(group, 0, pageLength, JSON.stringify({"page" : page}))
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
          .catch((err: Error) => {throw new Error(err.message)}); 
  }

//если новое но помеченное то wordToUp.wordOptions = {smth, optional:{new: true}}
//если уже было то wordToUp.wordOptions = {smth, optional:{new: false}}
  static  uploadUserWord({wordToUp, isUserWord}: {wordToUp:IUserWordUpload, isUserWord: boolean}){  
    if(!isUserWord){
      //wordToUp.wordOptions.optional.new = false;
      return API.createUserWord(wordToUp.wordId, wordToUp.wordOptions)
          .catch((err: Error) => {throw new Error(err.message)}); 
    }
    return API.updateUserWord(wordToUp.wordId, wordToUp.wordOptions)
    .catch((err: Error) => {throw new Error(err.message)});
  }
  

  /*static uploadUserWordStat(wordsStats: IWordStats[], longestSeries: number){
    
  }*/

  static getUserStats() {
    return API.getUserStats()
          .catch((err: Error) => {throw new Error(err.message)}); 
  }

  static setUserStats(userStats: IUserStats){
    return API.setUserStats(userStats)
          .catch((err: Error) => {throw new Error(err.message)}); 
  }

}