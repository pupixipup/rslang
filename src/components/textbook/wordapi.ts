import { API } from "../API/api";
import { IUserWord, IWord, localWord, IUserWordOptions } from "../../common/interfaces";

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

export function createLocalDifficultyWord(difficultWord: IUserWord | IWord) {
  const oldIsLearnt = (difficultWord as IUserWord).userWord?.optional?.learnt;
  const newDifficulty = (difficultWord as IUserWord).userWord?.difficulty === 'hard' ? 'easy' : 'hard'
  const newIsLearnt = newDifficulty === 'hard' ? false : oldIsLearnt;

  return { _id: (difficultWord as IUserWord)._id, userWord: {
    difficulty: newDifficulty, optional: { ...(difficultWord as IUserWord).userWord?.optional, learnt: newIsLearnt }
    }, isUserWord: !!(difficultWord as IUserWord).userWord }
}

export function createLocalisLearntWord(difficultWord: IUserWord | IWord) {
  const oldIsLearnt = (difficultWord as IUserWord).userWord?.optional?.learnt;
  const newDifficulty = !oldIsLearnt ? 'easy' : (difficultWord as IUserWord).userWord?.difficulty!;  
  const newIsLearnt = !oldIsLearnt;

  return { _id: (difficultWord as IUserWord)._id, userWord: {
    difficulty: newDifficulty, optional: { ...(difficultWord as IUserWord).userWord?.optional, learnt: newIsLearnt }
    }, isUserWord: !!(difficultWord as IUserWord).userWord }
}