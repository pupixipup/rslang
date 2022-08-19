export interface IWord {
    id: string,
    group: 0,
    page: 0,
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

export interface IUserReg {
    name?: string,
    email: string,
    password: string
}

export interface IUser {
    email: string,
    id: string,
    name: string,
}

export interface IUserToken {
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string
      
}

export interface IUserWord  {
    difficulty: string,
    optional: {}
  }

export interface IUserStatistics {
        learnedWords: 0,
        optional: {}
}

export interface IUserSettings {
        wordsPerDay: 0,
        optional: {}
}