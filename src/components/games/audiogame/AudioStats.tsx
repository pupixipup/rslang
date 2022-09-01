import React from 'react'
import { useLocation } from 'react-router-dom'
import { IWord, IUserWord } from '../../../common/interfaces';
import { gameUtils } from '../utils';
import './styles/AudioStats.scss';

interface IGameStats {
  solvedWords: IUserWord[],
  failedWords: IUserWord[],
  attempts: number
}

function AudioStats() {
  let location = useLocation();
  const stats = location.state as IGameStats;

  const rightWordNames = gameUtils.getWordNames(stats.solvedWords);
  const wrongWordNames = gameUtils.getWordNames(stats.failedWords);

  return (
    <div className="stats">
      <div className="stats__wrapper">
      <div className="stats__rightwords">
      <h3 className="stats__rightwords-title words-title">Правильные ответы:</h3>
      <div className="stats__words-container">
      {rightWordNames.map((word) => <div className="stats__rightwords-word stats-word">{word}</div>)}
      </div>
      </div>
      <div className="stats__wrongwords">
        <h3 className="stats__wrongwords-title words-title">Неправильные ответы:</h3>
        <div className="stats__words-container">
      {wrongWordNames.map((word) => <div className="stats__wrongwords-word stats-word">{word}</div>)}
        </div>
      </div>
    </div>
  </div>
  )
}

export default AudioStats