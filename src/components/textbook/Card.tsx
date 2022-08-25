import React, {useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import {addHardWord, addLearntWord, removeHardWord} from "./wordapi";
import './Card.scss';
import WordAudio from './WordAudio';
import { IWord } from "../../common/interfaces";

interface wordProps {
  wordsArray: IWord[],
  word: IWord | undefined,
  link: string,
  updateWords: (arr: IWord[]) => void,
  numbers: { page: number, section: number },
  isLoggedIn: boolean,
  hardWords: string[],
  learntWords: string[]
}
function Card(props: wordProps) {
  const { word, link, isLoggedIn, hardWords, learntWords, numbers, wordsArray, updateWords } = props;
  let [btnHardClass, setBtnHardClass] = useState('words__interact-hard');
  let [btnLearntClass, setBtnLearntClass] = useState('words__interact-learnt');
  let buttons = <div></div>;

    useEffect(() => {
        // toFix (there should be one general array, not two separated)
        if (hardWords.includes(word!.word)) {
            setBtnHardClass('words__interact-hard markedAsHard');
        }
    }, [hardWords, numbers]);

    useEffect(() => {
        // toFix (there should be one general array, not two separated)
        if (learntWords.includes(word!.word)) {
            setBtnLearntClass('words__interact-learnt markedAsLearnt');
        }
    }, [numbers, learntWords]);

    if (isLoggedIn) {
        buttons = <div className="word__interact">
            <button
                onClick={() => {
                    if (numbers.section !== 6) {
                    addHardWord(word).then(() => {
                    setBtnHardClass('words__interact-hard markedAsHard')
                    } );
                    } else {
                        removeHardWord(word);
                        updateWords(wordsArray.filter((el: IWord) => el.word !== word?.word));
                    }
                }}
                disabled={((btnHardClass === 'words__interact-hard' || numbers.section === 6) ? false : true)}
                className={ btnHardClass }>{ numbers.section === 6 ? 'Убрать из сложных' : 'Отметить как сложное'}</button>
            <button
                onClick={() => {
                    addLearntWord(word).then(() => {
                    setBtnLearntClass('words__interact-learnt markedAsLearnt')
                    })
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