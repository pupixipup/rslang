import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SprintApi } from '../../API/sprintApi';
import './GameMenu.scss';

export function GameMenu () {
  let navigate = useNavigate();

  const navigateToSprint = async (e: React.MouseEvent) => {
    navigate('/games/sprint', { state: {gameMenu: false, group: (Number((e.target as HTMLElement).textContent) - 1), page: SprintApi.getRandomPage(), learned: true} });
  }
  return (
    <div className='game-menu'>
      <div className="game-menu-block">
        <div className="game-menu-decription">
          Тренировка быстрого перевода.<br/>Выберите уровень сложности
        </div>
        <div className="game-menu-level">
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(e)}>1</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(e)}>2</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(e)}>3</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(e)}>4</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(e)}>5</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(e)}>6</button>
        </div>
      </div>
    </div>
  )
}