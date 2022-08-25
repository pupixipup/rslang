import { API } from "../API/api";
import { IWord } from "../../common/interfaces";

export async function addHardWord(word:  IWord | undefined) {
    API.createUserWord(word!.id, { difficulty: 'hard' })
        .catch((err) => {
            console.log(word)
            API.updateUserWord(word!.id, { difficulty: 'hard', optional: word?.userWord?.optional})
        })
}

export async function removeHardWord(word:  IWord | undefined) {
    console.log(word)
    await API.updateUserWord((word as any)!['_id'], {difficulty: 'easy', optional: word?.userWord?.optional})
}

export async function addLearntWord(word:  IWord | undefined) {
    API.createUserWord(word!.id, { difficulty: 'easy', optional: {isLearnt: 'true'} })
        .catch((err) => {
            API.updateUserWord(word!.id, { difficulty: word?.userWord?.difficulty as string, optional: {isLearnt: 'true'} })
        })
}

