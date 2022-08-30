import { GameWordsProvider } from "../../API/GameWordsProvider";
import { GAMES_NAMES } from "../interfaces";
import { IUserWord } from '../../../common/interfaces';

export class audioGame {
  includeLearned: boolean;
  gameProvider: GameWordsProvider;
  words: IUserWord[];
  wordsTotal: number;
  location: { page: number; section: number; };
  sectionsTotal: number;
  
  constructor(includeLearned: boolean, location: {page: number, section: number}) {
    this.includeLearned = includeLearned;
    this.location = location;
    this.gameProvider = new GameWordsProvider(GAMES_NAMES.audio, this.includeLearned);
    this.words = [];
    this.sectionsTotal = 6;
    this.wordsTotal = 20;
  }
  async getFullWordlist() {
    let newWords = await this.gameProvider.getUserWordList(this.location.page, this.location.section);
    this.words = [...this.words, ...newWords];
    let iterationCount = 0;
    while (this.words.length < this.wordsTotal && iterationCount < 7) {
      iterationCount += 1;
    }
  }
}