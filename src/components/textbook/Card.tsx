import React from 'react';
import DOMPurify from 'dompurify';
import './Card.scss';
import WordAudio from './WordAudio';
import { IWord } from './api';
interface wordProps {
  word: IWord | undefined,
  link: string
}
function Card(props: wordProps) {
  const { word, link } = props;
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
        </div>
      <img className="word__image" src={link} alt={word?.word} />
    </div>
  )
}

export default Card