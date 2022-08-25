import './GameMenu.scss';

export function GameMenu () {
  return (
    <div className='game-menu'>
      <div className="game-menu-block">
        <div className="game-menu-decription">
          Тренировка быстрого перевода.<br/>Выберите уровень сложности
        </div>
        <div className="game-menu-level">
          <button className='game-menu-btn'>1</button>
          <button className='game-menu-btn'>2</button>
          <button className='game-menu-btn'>3</button>
          <button className='game-menu-btn'>4</button>
          <button className='game-menu-btn'>5</button>
          <button className='game-menu-btn'>6</button>
        </div>
      </div>
    </div>
  )
}