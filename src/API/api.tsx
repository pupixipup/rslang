
import {BASELINK, PORT} from "../constants/constants";
import { IUser, IUserReg, IUserToken, IWord } from "../constants/interfaces";

const enum METHODS {
  get = "GET",
  post = "POST",
  delete = "DELETE",
  put = "PUT"
}
const enum ENDPOINTS {
  words = "words",
  users = "users",
  signin = "signin",
}

export class API {
  static instance: API;
  private baseUrl: string;
  private userToken = "";

  constructor() {
    this.baseUrl = BASELINK + ":" + PORT;
    if (API.instance) return API.instance;
    API.instance = this;
    return API.instance;
  }

  async getWords(page?: number, group?: number) {
    if (page === undefined) page = 0;
    if (group === undefined) group = 0;

    return fetch(`${this.baseUrl}/${ENDPOINTS.words}?page=${page}&group=${group}`)
      .then((res) => res.json())
      .then((data) => data as IWord[]);
    
  }

  async getWordById(id: string) {   
    return fetch(`${this.baseUrl}/${ENDPOINTS.words}/${id}`)
      .then((res) => res.json())
      .then((data) => data as IWord);    
  }

  async createUser(user: IUserReg) {    
    return fetch(
      `${this.baseUrl}/${ENDPOINTS.users}`,
      {
        method: METHODS.post,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
      })
      .then((res) => {
        if(res.ok) return res;
        return res.text()
          .then((data) => {throw new Error(data)})   
      })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err: Error) => {throw new Error(err.message)});
  }

  async signIn(email:string, password: string){
    return fetch(
      `${this.baseUrl}/${ENDPOINTS.signin}`,
      {
        method: METHODS.post,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password }) 
      })
      .then((res) => {
        if(res.ok) return res;
        return res.text()
          .then((data) => {throw new Error(data)})   
      })
      .then((res) => res.json())
      .then((data) => data as IUserToken)
      .then((data) => {this.saveToken(data.token); console.log(data); return data;})
      .catch((err: Error) => {throw new Error(err.message)});
  }


// authorized requests
  async getUser(id: string) {   
    return this.authFetch(`${this.baseUrl}/${ENDPOINTS.users}/${id}`)
      .then((res) => this.errorHandler(res))  // 403 forbidden if other user or other token
      .then((res) => res.json())
      .then((data) => data as IUser)   // {id: string, email: string}
      .catch((err: Error) => {throw new Error(err.message)});   
  }

  async updateUser(id:string, email:string, password: string) {
    return this.authFetch(
      `${this.baseUrl}/${ENDPOINTS.users}/${id}`,
      {
        method: METHODS.put,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }) 
      })
      .then((res) => {
        if(res.ok) return res;  // 403 forbidden if other user or other token
        return res.text()
          .then((data) => {throw new Error(data)})   
      })
      .then((res) => res.json())
      .then((data) => data as IUser)  // {id: string, email: string}
      .catch((err: Error) => {throw new Error(err.message)});
  }



// https://www.codementor.io/@obabichev/react-token-auth-12os8txqo1
// args of fetch api are typed in typescrypt
  private async authFetch(input: RequestInfo, init?: RequestInit) {
    //const token = await tokenProvider.getToken();

    init = init || {};

    init.headers = {
        ...init.headers,
        Authorization: `Bearer ${this.userToken}`,
    };

    return fetch(input, init);
  };

 

  private errorHandler(res: Response) {
      if (!res.ok) {
        throw new Error(res.statusText.toString());
      }
      return res;
  }
  private saveToken(token: string){
    this.userToken = token;    
  }

}