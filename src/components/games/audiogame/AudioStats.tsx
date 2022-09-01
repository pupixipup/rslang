import React from 'react'
import { useLocation } from 'react-router-dom'
import { IWord, IUserWord } from '../../../common/interfaces';
import { gameUtils } from '../utils';

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
    <div>{ JSON.stringify(rightWordNames)}</div>
  )
}

export default AudioStats