import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SprintApi } from '../../API/sprintApi';
import './GameMenu.scss';

export function GameMenu () {
  let navigate = useNavigate();

  const navigateToSprint = async (section: number) => {
    navigate('/games/sprint', { state: {gameMenu: false, group: section, page: SprintApi.getRandomPage() }});
  }
  return (
    <div className='game-menu'>
      <div className="game-menu-block">
        <div className="game-menu-decription">
          Тренировка быстрого перевода.<br/>Выберите уровень сложности
        </div>
        <div className="game-menu-level">
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(0)}>1</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(1)}>2</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(2)}>3</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(3)}>4</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(4)}>5</button>
          <button className='game-menu-btn' onClick={(e) => navigateToSprint(5)}>6</button>
        </div>
      </div>
    </div>
  )
}