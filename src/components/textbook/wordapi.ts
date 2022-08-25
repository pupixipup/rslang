import { API } from "../API/api";
import { IUserWord } from "../../common/interfaces";

export async function addHardWord(word: IUserWord) {
    API.createUserWord(word!._id, { difficulty: 'hard' })
        .catch((err) => {
            console.log(word)
            API.updateUserWord(word!._id, { difficulty: 'hard', optional: {learnt: false}})
        })
}

export async function removeHardWord(word: IUserWord) {
    console.log(word)
    await API.updateUserWord((word as any)!['_id'], {difficulty: 'easy', optional: word?.userWord?.optional})
}

export async function addLearntWord(word:  IUserWord) {
    API.createUserWord(word!._id, { difficulty: 'easy', optional: {learnt: true} })
        .catch((err) => {
            API.updateUserWord(word!._id, { difficulty: word?.userWord?.difficulty as string, optional: {learnt: true} })
        })
}

