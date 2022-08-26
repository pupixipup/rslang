import { API } from "../API/api";
import { IUserWord, wordsList, localWord, IUserWordOptions } from "../../common/interfaces";


export async function sendLocalWords(localWordsList: localWord[]) {
  let requests: Promise<void>[] = [];
  console.log(localWordsList);
  localWordsList.forEach((word) => {
    requests.push(setWord(word._id, word.userWord));
  });
  await Promise.allSettled(requests);
  localWordsList = [];
}

export async function setWord(id: string, optional: IUserWordOptions) {
  API.createUserWord(id, { difficulty: 'hard',  })
      .catch((err) => {
          API.updateUserWord(id, { difficulty: 'hard', optional: {
              learnt: false
          }})
      })
}