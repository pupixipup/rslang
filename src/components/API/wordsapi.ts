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

  /**
  * return user words 
  * @getWords
  * @param {number} group - group
  * @param {number} page - page 
  * @returns {Promise<IUserWord[]>} array of words
  */
  static getUserWords(group: number, page?: number){
    const pageLength = page === undefined ? TOTAL_WORD : WORD_PER_PAGE;
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
  static getWords(group?: number, page?: number) {
    if (page === undefined) page = 0;
    if (group === undefined) group = 0;

    return API.getWords(group, page)
          .catch((err: Error) => {throw new Error(err.message)}); 
  }

//если новое но помеченное то wordToUp.wordOptions = {smth, optional:{new: true}}
//если уже было то wordToUp.wordOptions = {smth, optional:{new: false}}
  static  uploadUserWord(wordToUp: IUserWordUpload){  
    if(wordToUp.wordOptions.optional?.new === true){
      wordToUp.wordOptions.optional.new = false;
      return API.createUserWord(wordToUp.wordId, wordToUp.wordOptions)
          .catch((err: Error) => {throw new Error(err.message)}); 
    }
    return API.updateUserWord(wordToUp.wordId, wordToUp.wordOptions)
    .catch((err: Error) => {throw new Error(err.message)});
    
     /* .catch((err: Error) => {
        if(err.message.includes(ERROR.already_exist))
          return API.getUserWord(wordToUp.wordId)
            .then((res)=> {
              const record: IUserWordOptions = {
                difficulty: wordToUp.wordOptions.difficulty,
                optional:{
                  learnt: wordToUp.wordOptions.optional?.learnt,
                  wrongAnswers: (res.optional?.wrongAnswers || 0) + (wordToUp.wordOptions.optional?.wrongAnswers || 0),
                  correctAnswers: (res.optional?.correctAnswers || 0) + (wordToUp.wordOptions.optional?.correctAnswers || 0),
                }
              };
              return record;
            })
            .then((data) =>  API.updateUserWord(wordToUp.wordId, data))
            .catch((err: Error) => {throw new Error(err.message)});
        throw new Error(err.message);           
      })*/
  }

  static uploadUserWords(wordListToUp: IUserWordUpload[]){
    const arr = wordListToUp.filter((item) => item.wordOptions !== undefined)
    .map((item) => WordsApi.uploadUserWord(item));
  return Promise.allSettled(arr)
    .then(()=>{});
  }
  static uploadUserWordStat(wordsStats: IWordStats[], longestSeries: number){
    
  }

  static getUserStats() {
    return API.getUserStats()
          .catch((err: Error) => {throw new Error(err.message)}); 
  }

  static setUserStats(userStats: IUserStats){
    return API.setUserStats(userStats)
          .catch((err: Error) => {throw new Error(err.message)}); 
  }

}