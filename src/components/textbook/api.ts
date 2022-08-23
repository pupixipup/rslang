import constants from "../../constants";

export interface IWord {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export class API {
  static instance: {
     baseUrl: string, getWords: (page: number, group: number) => Promise<IWord[]>
    };
  baseUrl: string;
  constructor() {
    this.baseUrl = constants.baseUrl;
    if (typeof API.instance === 'object') {
      return API.instance;
    }
    API.instance = this;
    return API.instance;
  }

  async getWords(page: number, group: number): Promise<IWord[]> {
    const url = `${this.baseUrl}/words/?page=${page}&group=${group}`;
    const response = await fetch(url);
    const words = await response.json();
    return words;
  }
}
