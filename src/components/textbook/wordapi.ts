import { API } from "../API/api";
import { IUserWord, wordsList, localWord, IUserWordOptions } from "../../common/interfaces";


export async function sendLocalWords(localWordsList: localWord[]) {
  let requests: Promise<void>[] = [];
  console.log(localWordsList);
  localWordsList.forEach((word) => {
    console.log(word);  
    requests.push(setWord(word._id, word.userWord));
  });
  await Promise.allSettled(requests);
  localWordsList = [];
}

export async function setWord(id: string, userWord: IUserWordOptions) {
  API.createUserWord(id, { difficulty: userWord.difficulty})
      .catch((err) => {
          API.updateUserWord(id, userWord)
      })
}