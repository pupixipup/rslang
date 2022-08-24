import { UserData } from "../components/API/userData"





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

export interface IUserWordOptions {
  difficulty: string,
  optional?: {
          learnt?: boolean,
          correctAnswers?: number,
          wrongAnswers?: number
  }
}

export interface IUserWordInfo extends IUserWordOptions{
  id: string, // id of record
  wordId: string
}

export interface IUserStatistics {
      learntWords: 0,
      optional?: {}
}

export interface IUserSettings {
      wordsPerDay: 0,
      optional?: {}
}

export interface IUserData {
  userData: UserData,
}

export interface IAggrResp{
  paginatedResults:[],
  totalCount: []
}

export interface IWordDescription{
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

export interface IWord extends IWordDescription {
  id: string,  
}

export interface IPagenatedResult extends IWordDescription{
  _id: string,
}

export interface IUserWord extends IPagenatedResult{
  userWord?: IUserWordOptions,
}