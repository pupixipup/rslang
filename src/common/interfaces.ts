import { UserData } from "../components/API/userData"

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
  userWord?: {
    difficulty: string,
    optional?: {
      isLearnt?: boolean
    }
  }
}

export interface IUserReg {
  name?: string,
  email: string,
  password: string
}

export interface IUser {
  email: string,
  id: string,
  name?: string,
}

export interface IUserSignin {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}

export interface IUserToken {
  token: string,
  refreshToken: string,
}

export interface IUserWordOptions  {
  difficulty: string,
  optional?: {}
}
export interface IUserWord {
  id: string,
  difficulty: string, 
  wordId: string
}

export interface IUserStatistics {
      learnedWords: 0,
      optional?: {}
}

export interface IUserSettings {
      wordsPerDay: 0,
      optional?: {}
}

export interface IUserData {
  userData: UserData,
}

export interface IAggregatedWord {
  paginatedResults: IWord[],
  totalCount: Number[]
}

export interface IAggregatedUserWord {
  _id: string,
  word: string,
  wordTranslate: string,
}