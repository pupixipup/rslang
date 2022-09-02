import { useState } from 'react';
import { IUserWord, IWord } from '../../../common/interfaces';
import { API } from '../../API/api';
import './ResultsGame.scss';

interface IProps {
  guessed: IWord[] | IUserWord[]; 
  notGuessed: IWord[] | IUserWord[];
}

export function ResultsGame (props: IProps) {
  const {guessed, notGuessed} = props;
  const [sound] = useState(new Audio());
  const resultItem = (el: IWord | IUserWord, idx: number) => {
    return(
      <div key={idx} className="results-item">
        <div className="results-sound" onClick={() => {
          sound.src = `${API.baseUrl}/${el.audio}`;
          sound.play();
        }}></div>
        <div className="results-en">{el.word}</div>
        <div className="hyphen">&mdash;</div>
        <div className="word-ru">{el.wordTranslate}</div>
      </div>
    )
  }
  return (
    <div className='results'>
      <div className="results-card">
        <div className="results-block results-wrong">
          <div className="results-title">Неправильные ответы: <span className='right-answers'>{notGuessed.length}</span></div>
          <div className="results-list">
            {notGuessed ? notGuessed.map((item, idx) => resultItem(item, idx)) : ''}
          </div>
        </div>
        <div className="results-block results-right">
          <div className="results-title">Правильные ответы: <span className='wrong-answers'>{guessed.length}</span></div>
          <div className="results-list">
          {guessed ? guessed.map((item, idx) => resultItem(item, idx)) : ''}
          </div>
        </div>
      </div>
    </div>
  )
}