import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { sendLocalWords } from "./wordapi";
import './Card.scss';
import WordAudio from './WordAudio';
import { IUserWord, IWord, localWord, wordsList, IPagenatedResult } from "../../common/interfaces";

interface wordProps {
  wordsArray: wordsList,
  word: IUserWord | IWord,
  localWords: Array<localWord>,
  updateLocalWords: (arr: localWord[]) => void,
  link: string,
  updateWords: (arr: IUserWord[]) => void,
  numbers: { page: number, section: number },
  isLoggedIn: boolean
}


function Card(props: wordProps) {
  const { word, link, isLoggedIn, numbers, localWords, updateLocalWords } = props;
  let buttons = <div></div>;
  
  const [difficultWord, setDifficultWord] = useState(word);

  useEffect(() => {

  }, [difficultWord]);

  if (isLoggedIn) {
    buttons = <div className="word__interact">
      <button
        className='words__interact-hard'
        onClick={() => {
          const newDifficulty = (difficultWord as IUserWord).userWord?.difficulty === 'hard' ? 'easy' : 'hard'
          const newIsLearnt = newDifficulty === 'hard' ? false : true;
          const newLocalWord = { _id: (word as IPagenatedResult)._id, userWord: {
             difficulty: newDifficulty, optional: { ...(word as IUserWord).userWord?.optional, newIsLearnt }
             }, isUserWord: !!(word as IUserWord).userWord }

             let ids = localWords.map((element) => element._id);
            if (!ids.includes(newLocalWord._id)){
              updateLocalWords([...localWords, newLocalWord]);
            }

            setDifficultWord({ ...difficultWord, userWord: {
              ...(difficultWord as IUserWord).userWord, difficulty: newDifficulty
            }});
        }}
      >
        {(difficultWord as IUserWord).userWord?.difficulty === 'hard' ? 'Убрать из сложных' : 'Отметить как сложное'}
      </button>
      <button
        className='words__interact-learnt'>
        {(difficultWord as IUserWord).userWord?.optional?.learnt === true ? 'Убрать из изученных' : 'Отметить как изученное'}
      </button>
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
          <div className="word__meaning-eng" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(word?.textMeaning as string) }} />
          <div className="word__meaning-ru">{word?.textMeaningTranslate}</div>
        </div>
        <div className="word__example">
          <div className="word__example-eng" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(word?.textExample as string) }} />
          <div className="word__example-ru">{word?.textExampleTranslate}</div>
        </div>
        {buttons}
      </div>
      <img className="word__image" src={link} alt={word?.word} />
    </div>
  )
}

export default Card