import { API } from "../API/api";
import { IUserWord, IWord, wordsList, localWord, IUserWordOptions } from "../../common/interfaces";

export async function sendLocalWords(localWordsList: localWord[]) {
  let requests: Promise<void>[] = [];
  console.log(localWordsList);
  localWordsList.forEach((word) => {
    console.log(word);  
    requests.push(setWord(word._id, word.userWord, word.isUserWord));
  });
  await Promise.allSettled(requests);
  localWordsList = [];
}

export async function setWord(id: string, userWord: IUserWordOptions, isUserWord: boolean) {
  if (isUserWord) {
    API.updateUserWord(id, userWord)
  } else {
    API.createUserWord(id, { difficulty: userWord.difficulty});  
    }
    console.log('updated');
    
}

export function createLocalWord(difficultWord: IUserWord | IWord) {
  const newDifficulty = (difficultWord as IUserWord).userWord?.difficulty === 'hard' ? 'easy' : 'hard'
  const newIsLearnt = newDifficulty === 'hard' ? false : true;

  return { _id: (difficultWord as IUserWord)._id, userWord: {
    difficulty: newDifficulty, optional: { ...(difficultWord as IUserWord).userWord?.optional, learnt: newIsLearnt }
    }, isUserWord: !!(difficultWord as IUserWord).userWord }
}