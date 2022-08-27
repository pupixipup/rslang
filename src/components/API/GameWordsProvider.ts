
import { GROUP_DIFFICULT, SERIES_FOR_UPD } from "../../common/constants";
import { IGameStats, IUserWordUpload, IWord, IWordStats } from "../../common/interfaces";
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

  constructor(game: string, includeLearned: boolean) {
    this.startWordsList = [];
    this.currWordsList = [];
    this.game = game;
    this.includeLearned = includeLearned;
    //console.log(this.currWordsList);
  }
  getUserWordList(group: number, page?: number) {
    return this.getWords(group,page)
      .then((data) => {
        if(!this.includeLearned){
          return data.filter((item) => !item.userWord?.optional?.learnt)
        }
        return data;
      })
      .then((data)=>{
        this.startWordsList = [...data];
        return data;
      })
      .catch((err: Error) => {throw new Error(err.message)});
      
  }
  guessed(id: string){
    console.log(this.currWordsList);
    this.correctAnswers +=1;
    this.answers +=1;
    this.series +=1;
    const index = this.currWordsList.findIndex((item) => item.id === id);
    if (index === -1){      
      this.currWordsList.push({id: id, met: 1, guessed: 1, series: 1} as IWordStats)
    } else {
      //console.log(this.currWordsList);
      this.currWordsList[index].met += 1;
      this.currWordsList[index].guessed +=1;
      this.currWordsList[index].series +=1;
    }
  }
  notGuessed(id: string){
    this.answers +=1;
    if (this.series > this.longestSeries) this.longestSeries = this.series;
    this.series = 0;
    const index = this.currWordsList.findIndex((item) => item.id === id);
    if (index === -1){      
      this.currWordsList.push({id: id, met: 1, guessed: 0, series: 0} as IWordStats)
    } else {
      this.currWordsList[index].met += 1;
      this.currWordsList[index].series = 0;
    }
  }

  //количество новых слов
  //количество угаданных слов
  //количество сыгранных слов
  // самая длинная серия 
  getGameStat(){
    let res ={
      game: this.game,
      answers: this.answers,
      correctAnswers: this.correctAnswers,
      newWords: this.getNewWordsNumber(),
      longestSeries: this.series      
    } as IGameStats;
    console.log(this.calculateWordStats());
    return res;
  }

  uploadStat(){
    const {res, learned} = this.calculateWordStats();
    const arr = [
      this.uploadWordsStat(res),
      //this.uploadGameStat()
    ]
    return Promise.allSettled(arr);
  }
private uploadGameStat(){
  return WordsApi.getUserStats()
  .then((data) =>{

  })
}
private uploadWordsStat(wordListToUp: IUserWordUpload[]){
  return WordsApi.uploadUserWords(wordListToUp)
  .catch((err: Error) => {throw new Error(err.message)}); 
}

private calculateWordStats(){
  let learned = 0;
  const res = this.currWordsList.map((curritem) => {
    const wrongAnswers = curritem.met - curritem.guessed;
    const startItem = this.startWordsList.find((startitem) => curritem.id === startitem.id);
    if(startItem === undefined) throw new Error("dev_err: calculateStats: error in wordId");
      if(startItem.userWord === undefined) {
        if (curritem.series >= SERIES_FOR_UPD) learned +=1;
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
        if (startLearned){ 
          console.log("уже изучено");
          newLearned = wrongAnswers ? (curritem.series > SERIES_FOR_UPD) : startLearned;
          learned = newLearned ? learned : learned - 1;
        }else{
          console.log("еще не изучено");
          console.log(curritem.series);
          newLearned = curritem.series >= SERIES_FOR_UPD;
          learned = newLearned ? learned + 1 : learned;
          console.log(newLearned +"    learned = " + learned);
        }        
        const startCorrectAnswer = startItem.userWord.optional?.correctAnswers === undefined ? 0 : startItem.userWord.optional?.correctAnswers;
        const startWrongAnswer = startItem.userWord.optional?.wrongAnswers === undefined ? 0 : startItem.userWord.optional?.wrongAnswers;
        return {
          wordId: curritem.id,
          wordOptions: {
            difficulty: startItem.userWord.difficulty ,
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
  return {res: res, learned: learned};
}
  private getNewWordsNumber(){
    return  this.currWordsList.reduce((acc, curritem) =>{
      const index = this.startWordsList.findIndex((startitem) => curritem.id === startitem.id);
      if(this.startWordsList[index].userWord === undefined) return acc++;
      return acc;
    } , 0)
  }

  private getWords(group: number, page?: number){
    if(group === GROUP_DIFFICULT) 
      return WordsApi.getDifficultWords()
        .catch((err: Error) => {throw new Error(err.message)});  
    return WordsApi.getUserWords(group,page)    
      .catch((err: Error) => {throw new Error(err.message)});
  }
}