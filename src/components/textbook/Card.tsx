import React, {useEffect, useLayoutEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import {API} from "../API/api";
import './Card.scss';
import WordAudio from './WordAudio';
import { IWord } from "../../common/interfaces";

interface wordProps {
  word: IWord | undefined,
  link: string,
  isLoggedIn: boolean,
  hardWords: string[]
}
function Card(props: wordProps) {
  const { word, link, isLoggedIn, hardWords } = props;
  let [btnClass, setBtnClass] = useState('words__interact-hard');
  let buttons = <div></div>;

    useEffect(() => {
        if (hardWords.includes(word!.word)) {
            setBtnClass('words__interact-hard markedAsHard');
        }
    }, [hardWords]);

    if (isLoggedIn) {
        buttons = <div className="word__interact">
            <button
                onClick={() => {
                    API.createUserWord(word!.id, { difficulty: 'hard' })
                        .catch((err) => {
                            if (err.message === 'Error 417: such user word already exists') {
                                API.updateUserWord(word!.id, { difficulty: 'hard'})
                            }
                        })
                    setBtnClass('words__interact-hard markedAsHard')
                }}
                className={ btnClass }>Mark as difficult</button>
            <button className="words__interact-learnt">Mark as learnt</button>
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