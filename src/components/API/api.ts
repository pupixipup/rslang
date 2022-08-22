import { UserData } from './userData';
import { BASELINK, PORT } from "../../common/constants";
import { IUser, IUserSignin, IUserToken, IUserWord, IUserWordOptions, IWord } from "../../common/interfaces";


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
  tokens = "tokens"
}

export class API {
 // static instance: API;
  private static baseUrl = BASELINK + ":" + PORT;
  private static userToken = "";
  private static userId = "";
  private static refreshToken ="";

  /*private static _init = (() => {
    API.baseUrl = BASELINK + ":" + PORT;
    API.userToken = "";
    API.userId = "";
  })();*/

  static loadAuthData(token: IUserSignin){
    API.userToken = token.token;
    API.userId = token.userId;
    API.refreshToken = token.refreshToken;
    console.log("loaded");
  }

  static signOut(){
    API.userToken = "";
    API.userId = "";
    API.refreshToken = "";
    console.log("signed out");
  }


/**
 * return all words from page and group
 * @getWords
 * @param {number} page - page
 * @param {number} group - group
 * @returns {Promise<IWord[]>} array of words
 */
  static async getWords(page?: number, group?: number) {
    if (page === undefined) page = 0;
    if (group === undefined) group = 0;

    return fetch(`${API.baseUrl}/${ENDPOINTS.words}?page=${page}&group=${group}`)
      .then((res) => res.json())
      .then((data) => data as IWord[]);
    
  }
/**
 * return word
 * @getWordById
 * @param {string} wordId - word id
 * @returns {Promise<IWord>} word
 */
  // getWordById: (id: string) => Promise(IWord)
  static async getWordById(id: string) {   
    return fetch(`${API.baseUrl}/${ENDPOINTS.words}/${id}`)
      .then((res) => res.json())
      .then((data) => data as IWord);    
  }
/**
 * create user
 * @getWordById
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {Promise<IUser>} user info
 */
  static async createUser(email:string, password: string) {    
    return fetch(
      `${API.baseUrl}/${ENDPOINTS.users}`,
      {
        method: METHODS.post,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password }) 
      })
      .then((res) => API.errorHandler(res))  // 
      .then((res) => res.json())
      .then((data) => data as IUser)
      .catch((err: Error) => {throw new Error(err.message)});
  }

  /**
 * sign in
 * @signIn
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {Promise<IUserToken>} user info
 */
  static async signIn(email:string, password: string){
    return fetch(
      `${API.baseUrl}/${ENDPOINTS.signin}`,
      {
        method: METHODS.post,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password }) 
      })
      .then((res) => API.errorHandler(res))  // 403 forbidden if other user or other token
      .then((res) => res.json())
      .then((data) => data as IUserSignin)
      .then((data) => {API.saveToken(data); console.log("signed in"); console.log(data); return data;})
      .catch((err: Error) => {throw new Error(err.message)});
  }
  /**
 * get token
 * @signIn
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {Promise<IUserToken>} user info
 */
  static async getToken() {
    return fetch(`${API.baseUrl}/${ENDPOINTS.users}/${API.userId}/${ENDPOINTS.tokens}`,
    {
      method: METHODS.get,
      headers: {
        'Authorization': `Bearer ${API.refreshToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => API.errorHandler(res))  // 403 forbidden if other user or other token
    .then((res) => res.json())
    .then((data) => data as IUserToken)
    .then((data) => {API.saveRefreshToken(data); console.log("refreshed token"); console.log(data); return data;})
    .catch((err: Error) => {throw new Error(err.message)});
}

// authorized requests
/** 
* get user
* @getUser
* @returns {Promise<IUser>} user info
*/
// authorized! getUser(id: string) => Promise<IUser>
  static async getUser() {   
    return API.authFetch(`${API.baseUrl}/${ENDPOINTS.users}/${API.userId}`)
      .then((res) => API.errorHandler(res))  // 403 forbidden if other user or other token
      .then((res) => res.json())
      .then((data) => data as IUser)   // {id: string, email: string}
      .catch((err: Error) => {throw new Error(err.message)});   
  }

  /**
   * update User
   * @updateUser
   * @param {string} email - user email
   * @param {string} password - user password
   * @returns {Promise<IUser>} user info
   */ 
  static async updateUser(email:string, password: string) {
    return API.authFetch(
      `${API.baseUrl}/${ENDPOINTS.users}/${API.userId}`,
      {
        method: METHODS.put,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }) 
      })
      .then((res) => API.errorHandler(res))  // 403 forbidden if other user or other token
      .then((res) => res.json())
      .then((data) => data as IUser)  // {id: string, email: string}
      .catch((err: Error) => {throw new Error(err.message)});
  }

  /**
   * getUserWords
   * @getUserWords
   * @returns {Promise<IUserWord[]>} array of words with info
   */ 
  static async getUserWords() {
    return API.authFetch(`${API.baseUrl}/${ENDPOINTS.users}/${API.userId}/${ENDPOINTS.words}`)
      .then((res) => API.errorHandler(res))  // 403 forbidden if other user or other token
      .then((res) => res.json())
      .then((data) => data as IUserWord[])
      .catch((err: Error) => {throw new Error(err.message)});
  }
 /**
   * update User
   * @updateUser
   * @param {string} wordId - word ID
   * @returns {Promise<IUser>} user info
   */ 
  static async createUserWord(wordId: string, wordOptions: IUserWordOptions) {    
    return API.authFetch(
      `${API.baseUrl}/${ENDPOINTS.users}/${API.userId}/${ENDPOINTS.words}/${wordId}`,
      {
        method: METHODS.post,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordOptions) 
      })
      .then((res) => API.errorHandler(res))  // 
      .then((res) => res.json())
      .then((data) => data as IUserWord)
      .catch((err: Error) => {throw new Error(err.message)}); //Error 417: such user word already exists
  }



// https://www.codementor.io/@obabichev/react-token-auth-12os8txqo1
// args of fetch api are typed in typescrypt
  private static async authFetch(input: RequestInfo, init?: RequestInit) {
    //const token = await tokenProvider.getToken();

    init = init || {};

    init.headers = {
        ...init.headers,
        Authorization: `Bearer ${API.userToken}`,
    };

    return fetch(input, init);
  };

 

  private static errorHandler(res: Response) {
    const status = res.status.toString();
    if(res.ok) return res;
      return res.text()
        .then((data) => {throw new Error(`Error ${status}: ${data}`)})   
  }

  private static saveToken(token:IUserSignin){
    API.userToken = token.token;
    API.userId = token.userId;
    API.refreshToken = token.refreshToken;
  }

  private static saveRefreshToken(token:IUserToken){
    API.userToken = token.token;
    API.refreshToken = token.refreshToken;
  }

  static getExpirationDateToken (token?: string): number | null {
    if (!token) {
      return null;
    }
    const jwt = JSON.parse(atob(token.split('.')[1]));
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  }

  static isExpired(exp?: number | null): boolean {
    if (!exp) {
      return false;
    }
    return Date.now() > exp;
  }

  static async getRefreshToken (): Promise<null | undefined> {
    const userData = new UserData();
    console.log(API.userToken);
    if(!API.userToken) {
      return null;
    }
    console.log(API.isExpired(API.getExpirationDateToken(API.userToken)));
    if (API.isExpired(API.getExpirationDateToken(API.userToken))) {
      userData.setAuth(false);
      localStorage.removeItem('isAuth');
      await API.getToken().then((resp) => {
        userData.user.token = resp.token;
        userData.user.refreshToken = resp.refreshToken;
        API.userToken = resp.token;
        API.refreshToken = resp.refreshToken;
        localStorage.setItem('userData', JSON.stringify(userData.user));
        localStorage.setItem('isAuth', 'true');
        userData.setAuth(true);
      }).catch((e) => console.log(e));
    }
  }
}