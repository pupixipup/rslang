import { NUMBER_OF_PAGES_IN_GROUP } from "../../common/constants";
import { IWord } from "../../common/interfaces";
import { API } from "./api";

export class SprintApi {

  static wordsAll: IWord[] = [];
  static wordsEn: string[] = [];
  static wordsRu: string[] = [];
  private static group = 0;
  private static page = 0;

  static getRandomPage (): number {
    return Math.floor(Math.random() * NUMBER_OF_PAGES_IN_GROUP);
  }
  static setGroup(group: number): void {
    this.group = group - 1;
  }
  static setPage(page: number):void {
    this.page = page;
  }
  static setWords(words: IWord[]):void {
    this.wordsAll = this.wordsAll.concat([...words]);
    words.forEach((word: IWord) => {
      this.wordsEn.push(word.word);
      this.wordsRu.push(word.wordTranslate);
    });
  }
  static async getWords() {
    await API.getWords(this.getRandomPage(), this.group).then(async(data) => {
      this.setWords(data);
      await API.getWords(this.getRandomPage(), this.group).then((data) => this.setWords(data));
    });

    this.mix(this.wordsRu);

    console.log(this.wordsEn);
    console.log(this.wordsRu);
  }
  static mix(array: string[]) {
    array.sort(() => Math.random() - 0.5);
  }

  static clearWords () {
    this.wordsAll = [];
    this.wordsEn = [];
    this.wordsRu = [];
  }
}