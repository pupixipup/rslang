
import { timeStamp } from "console";
import { GROUP_DIFFICULT, SERIES_FOR_UPD } from "../../common/constants";
import { IGameStats, IUserStats, IUserWordUpload, IWord, IWordStats } from "../../common/interfaces";
import { WordsApi } from "./wordsapi";

export class GameWordsProvider {
  private startWordsList: IWord[];
  private currWordsList: IWordStats[];
  private includeLearned: boolean;
  private correctAnswers = 0;
  private answers = 0;
  private series = 0;
  private longestSeries = 0;
  private game: string;
  private newWordsNumber = 0;
  private locLearned = 0;

  constructor(game: string, includeLearned: boolean) {
    this.startWordsList = [];
    this.currWordsList = [];
    this.game = game;
    this.includeLearned = includeLearned;
    //console.log(this.currWordsList);
  }
  getUserWordList(group: number, page?: number) {
    return this.getWords(group, page)
      .then((data) => {
        if (!this.includeLearned) {
          return data.filter((item) => !item.userWord?.optional?.learnt)
        }
        return data;
      })
      .then((data) => {
        this.startWordsList = [...data];        
        return data;
      })
      .catch((err: Error) => { throw new Error(err.message) });

  }
  guessed(id: string) {
    //console.log(this.currWordsList);
    this.correctAnswers += 1;
    this.answers += 1;
    this.series += 1;
    const index = this.currWordsList.findIndex((item) => item.id === id);
    if (index === -1) {
      this.currWordsList.push({ id: id, met: 1, guessed: 1, series: 1 } as IWordStats)
    } else {
      //console.log(this.currWordsList);
      this.currWordsList[index].met += 1;
      this.currWordsList[index].guessed += 1;
      this.currWordsList[index].series += 1;
    }
  }
  notGuessed(id: string) {
    this.answers += 1;
    if (this.series > this.longestSeries) this.longestSeries = this.series;
    this.series = 0;
    const index = this.currWordsList.findIndex((item) => item.id === id);
    if (index === -1) {
      this.currWordsList.push({ id: id, met: 1, guessed: 0, series: 0 } as IWordStats)
    } else {
      this.currWordsList[index].met += 1;
      this.currWordsList[index].series = 0;
    }
  }

  //количество новых слов
  //количество угаданных слов
  //количество сыгранных слов
  // самая длинная серия 
  getGameStats() {
    
    let res = {
      game: this.game,
      answers: this.answers,
      correctAnswers: this.correctAnswers,
      newWords: this.getNewWordsNumber(),
      longestSeries: this.series
    } as IGameStats;
    return res;
  }

  uploadStats() {
    const { res, learned } = this.calculateWordStats();
    const arr = [
      this.uploadWordsStat(res),
      this.uploadGameStat(learned),
    ]
    return Promise.all(arr);
  }
  private uploadGameStat(learned:number) {
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()-1}`;
    let newStat: IUserStats;
    console.log(date);
    return WordsApi.getUserStats()
      .then((data) => {  
        newStat = {...data};  
        newStat.learnedWords += learned;
        if (data.optional.daystats.date !== date){
          console.log("new date");
          newStat.optional.daystats.date = date;
          newStat.optional.daystats.gamestats = [];
          newStat.optional.daystats.gamestats.push(this.createNewDayStats());
         /* const dayStat = {
            date: data.optional.daystats.date,  
            learnedWords: data.optional.daystats.wordsstats.learnedWords,
            newWords: data.optional.daystats.wordsstats.newWords
          };*/
          newStat.optional.daystats.wordsstats.learnedWords = learned;
          newStat.optional.daystats.wordsstats.newWords = this.getNewWordsNumber();
          
          //newStat.optional.longstats.push(dayStat);
          console.log(data.optional.daystats);
          console.log(newStat);
        }else{
          const startGameDayStatsInd = newStat.optional.daystats.gamestats.findIndex((item) => item.game === this.game);
          if(startGameDayStatsInd === -1) {
            newStat.optional.daystats.gamestats.push(this.createNewDayStats());
          }else{
            const tmpGameStat = newStat.optional.daystats.gamestats[startGameDayStatsInd];            
            newStat.optional.daystats.gamestats[startGameDayStatsInd] = this.updateDayStats(tmpGameStat);
          }     
          newStat.optional.daystats.wordsstats.learnedWords += learned;
          newStat.optional.daystats.wordsstats.newWords += this.getNewWordsNumber();
        }
        
        //console.log("после присвоения newstat" +data.optional.daystats.date);
        //console.log(newStat);
        return WordsApi.setUserStats(newStat);
      })
      
  }
  private createNewDayStats(){
    const currStat = this.getGameStats();
    const res = {
      answers: currStat.answers,
      correctAnswers: currStat.correctAnswers,
      longestSeries: currStat.longestSeries,
      game: this.game,
      newWords: this.getNewWordsNumber(),
    } as IGameStats;
    return res;   
  }

  private updateDayStats(data: IGameStats){
    const res = {...data};
    const currStat = this.getGameStats();
    res.answers += currStat.answers;
    res.correctAnswers += currStat.correctAnswers;
    res.newWords += currStat.newWords;
    res.longestSeries = currStat.longestSeries > res.longestSeries ? currStat.longestSeries : res.longestSeries;
    return res;
  }

  private uploadWordsStat(wordListToUp: IUserWordUpload[]) {
    console.log("res");
    console.log(wordListToUp);
    
    return WordsApi.uploadUserWords(wordListToUp)
      .catch((err: Error) => { throw new Error(err.message) });
  }

  private calculateWordStats() {
    let learned = 0;
    const res = this.currWordsList.map((curritem) => {
      console.log(curritem);
      const wrongAnswers = curritem.met - curritem.guessed;
      const startItem = this.startWordsList.find((startitem) => curritem.id === startitem.id);
      if (startItem === undefined) throw new Error("dev_err: calculateStats: error in wordId");
      if (startItem.userWord === undefined) {
        if (curritem.series >= SERIES_FOR_UPD) learned += 1;
        console.log("новое слово");
        return {
          wordId: curritem.id,
          wordOptions: {
            difficulty: "normal",
            optional: {
              learnt: curritem.series >= SERIES_FOR_UPD,
              new: true,
              correctAnswers: curritem.guessed,
              wrongAnswers: wrongAnswers,
              series: curritem.series
            }
          }
        } as IUserWordUpload
      } else {
        console.log("исправляем слово");

        const startseries = startItem.userWord.optional?.series === undefined ? 0 : startItem.userWord.optional?.series;
        const startLearned = startItem.userWord.optional?.learnt === undefined ? false : startItem.userWord.optional?.learnt;
        let newLearned: boolean;
        if (startLearned) {
          console.log("уже изучено");
          newLearned = wrongAnswers ? (curritem.series >= SERIES_FOR_UPD) : startLearned;
          learned = newLearned ? learned : learned - 1;
        } else {
          console.log("еще не изучено");
          console.log(curritem.series);
          newLearned = curritem.series >= SERIES_FOR_UPD;
          learned = newLearned ? learned + 1 : learned;
          console.log(newLearned + "    learned = " + learned);
        }
        const startCorrectAnswer = startItem.userWord.optional?.correctAnswers === undefined ? 0 : startItem.userWord.optional?.correctAnswers;
        const startWrongAnswer = startItem.userWord.optional?.wrongAnswers === undefined ? 0 : startItem.userWord.optional?.wrongAnswers;
        return {
          wordId: curritem.id,
          wordOptions: {
            difficulty: newLearned ? "normal" : startItem.userWord.difficulty,
            optional: {
              learnt: newLearned,
              new: false,
              correctAnswers: curritem.guessed + startCorrectAnswer,
              wrongAnswers: wrongAnswers + startWrongAnswer,
              series: curritem.series + (wrongAnswers ? 0 : startseries)
            }
          }
        } as IUserWordUpload
      }
    });
    //console.log("res learned" + learned);
    //console.log(res);
    return { res: res, learned: learned };
    
  }
  private getNewWordsNumber() {
    return this.currWordsList.reduce((acc, curritem) => {
      const index = this.startWordsList.findIndex((startitem) => curritem.id === startitem.id);
      if (this.startWordsList[index].userWord === undefined) return acc++;
      return acc;
    }, 0)
  }

  private getWords(group: number, page?: number) {
    if (group === GROUP_DIFFICULT)
      return WordsApi.getDifficultWords()
        .catch((err: Error) => { throw new Error(err.message) });
    return WordsApi.getUserWords(group, page)
      .catch((err: Error) => { throw new Error(err.message) });
  }
}