import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SprintApi } from '../../API/sprintApi';
import './GameMenu.scss';

export function GameMenu () {
  let navigate = useNavigate();
  SprintApi.clearWords();
  const choiceOfGroup = async (e: React.MouseEvent) => {
    const group = Number((e.target as HTMLElement).textContent);
    SprintApi.setGroup(group - 1);
    await SprintApi.getWordsRandome();
    navigate('/games/sprint', { state: {gameMenu: false} });
  }
  return (
    <div className='game-menu'>
      <div className="game-menu-block">
        <div className="game-menu-decription">
          Тренировка быстрого перевода.<br/>Выберите уровень сложности
        </div>
        <div className="game-menu-level">
          <button className='game-menu-btn' onClick={(e) => choiceOfGroup(e)}>1</button>
          <button className='game-menu-btn' onClick={(e) => choiceOfGroup(e)}>2</button>
          <button className='game-menu-btn' onClick={(e) => choiceOfGroup(e)}>3</button>
          <button className='game-menu-btn' onClick={(e) => choiceOfGroup(e)}>4</button>
          <button className='game-menu-btn' onClick={(e) => choiceOfGroup(e)}>5</button>
          <button className='game-menu-btn' onClick={(e) => choiceOfGroup(e)}>6</button>
        </div>
      </div>
    </div>
  )
}