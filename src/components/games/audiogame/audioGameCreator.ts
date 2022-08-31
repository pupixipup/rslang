import { GameWordsProvider } from "../../API/GameWordsProvider";
import { GAMES_NAMES } from "../interfaces";
import { IUserWord } from '../../../common/interfaces';
import { gameUtils } from '../utils';

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
    let newWords = await this.gameProvider.getUserWordList(this.location.section, this.location.page);
    const MAX_PAGE = 29;
    let page = MAX_PAGE;
    this.words = [...this.words, ...newWords];
    let iterationCount = 0;
    while (this.words.length < this.wordsTotal && iterationCount < MAX_PAGE) {
      iterationCount += 1;
      page -= 1
      if (page < 0) page = MAX_PAGE;
      newWords = await this.gameProvider.getUserWordList(this.location.section, page);
      this.words = [...this.words, ...newWords];
    }
    
    const trimmedWords = gameUtils.trimArrayLength(this.words, 20);
    return trimmedWords;
  }
}