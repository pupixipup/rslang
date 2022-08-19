import React from 'react';
import './Card.css';
import WordAudio from './WordAudio';
import { IWord, API } from './api';
interface wordProps {
  word: IWord | undefined
}
function Card(props: wordProps) {
  const api = new API();
  return (
    <div className="word">
      <div className="word__word">
        <div className="word__word-name">{props.word?.word}</div>
        <div className="word__word-transcription">{props.word?.transcription}</div>
        <div className="word__word-translation">{props.word?.wordTranslate}</div>
        <WordAudio 
        audioLink={props.word?.audio} 
        audioMeaningLink={props.word?.audioMeaning} 
        audioExampleLink={props.word?.audioExample}
        />
      </div>
      <div className="word__meaning">
        <div className="word__meaning-eng">{props.word?.textMeaning}</div>
        <div className="word__meaning-ru">{props.word?.textMeaningTranslate}</div>
      </div>
      <div className="word__example">
        <div className="word__example-eng">{props.word?.textExample}</div>
        <div className="word__example-ru">{props.word?.textExampleTranslate}</div>
      </div>
      <div>{}</div>
      <img src={`${api.baseUrl}/${props.word?.image}`} alt={props.word?.word} />
    </div>
  )
}

export default Card