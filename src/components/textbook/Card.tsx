import React, {useEffect, useLayoutEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import {API} from "../API/api";
import './Card.scss';
import WordAudio from './WordAudio';
import { IWord, IUserWordOptions } from "../../common/interfaces";

interface wordProps {
  word: IWord | undefined,
  link: string,
  numbers: { page: number, section: number },
  isLoggedIn: boolean,
  hardWords: string[],
  learntWords: string[]
}
function Card(props: wordProps) {
  const { word, link, isLoggedIn, hardWords, learntWords, numbers } = props;
  let [btnHardClass, setBtnHardClass] = useState('words__interact-hard');
  let [btnLearntClass, setBtnLearntClass] = useState('words__interact-learnt');
  let buttons = <div></div>;

    useEffect(() => {
        if (hardWords.includes(word!.word)) {
            setBtnHardClass('words__interact-hard markedAsHard');
            console.log(word!.word)
        }
    }, [hardWords, numbers]);

    useEffect(() => {
        if (learntWords.includes(word!.word)) {
            setBtnLearntClass('words__interact-learnt markedAsLearnt');
            console.log(word!.word)
        }
    }, [numbers, learntWords]);

    if (isLoggedIn) {
        buttons = <div className="word__interact">
            <button
                onClick={() => {
                    API.createUserWord(word!.id, { difficulty: 'hard' })
                        .catch((err) => {
                                API.updateUserWord(word!.id, { difficulty: 'hard', optional: word?.userWord?.optional})
                        })
                    setBtnHardClass('words__interact-hard markedAsHard')
                }}
                disabled={((btnHardClass === 'words__interact-hard') ? false : true)}
                className={ btnHardClass }>Отметить как сложное</button>
            <button
                onClick={() => {
                    API.createUserWord(word!.id, { difficulty: 'easy', optional: {isLearnt: 'true'} })
                        .catch((err) => {
                            API.updateUserWord(word!.id, { difficulty: word?.userWord?.difficulty as string, optional: {isLearnt: 'true'} })

                        })
                    setBtnLearntClass('words__interact-learnt markedAsLearnt')
                }}
                className={ btnLearntClass }>Отметить как изученное</button>
        </div>
    }

  return (
    <div className="word">
        <div className="word__desc">
      <div className="word__word">
        <div className="word__word-name">{word?.word}</div>
        <div className="word__word-transcription">{word?.transcription}</div>
        <div className="word__word-translation">{word?.wordTranslate}</div>
        <WordAudio 
        audioLink={word?.audio} 
        audioMeaningLink={word?.audioMeaning} 
        audioExampleLink={word?.audioExample}
        />
      </div>
      <div className="word__meaning">
        <div className="word__meaning-eng" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(word?.textMeaning as string)}}/>
        <div className="word__meaning-ru">{word?.textMeaningTranslate}</div>
      </div>
      <div className="word__example">
        <div className="word__example-eng" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(word?.textExample as string)}} />
        <div className="word__example-ru">{word?.textExampleTranslate}</div>
      </div>
            { buttons }
        </div>
      <img className="word__image" src={link} alt={word?.word} />
    </div>
  )
}

export default Card