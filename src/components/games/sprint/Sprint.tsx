import { useState } from 'react';
import './Sprint.scss';
import star from '../../../assets/icon/star.svg';
import { GameMenu } from '../gameMenu/GameMenu';
import { useLocation } from 'react-router-dom';

export function Sprint () {
  let {state} = useLocation() as {state: {gameMenu: boolean}};
  const [points, setPoints] = useState(10);
  const [english, setEnglish] = useState('english');
  const [russian, setRussian] = useState('russian');

  return state.gameMenu ? (
      <GameMenu/>
    ) : (
    <div className='sprint-wrapper'>
      <div className='sprint-timer'>
        <div className='sprint-time'>59</div>
      </div>
      <div className='sprint-card'>
        <div className="card-header">
          <div className="circle-block">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="points">
            {`+${points} очков за слово`}
          </div>
        </div>
        <div className="card-star">
          <img className='card-star-img' src={star} alt="star" />
          <img className='card-star-img' src={star} alt="star" />
          <img className='card-star-img' src={star} alt="star" />
          <img className='card-star-img' src={star} alt="star" />
        </div>
        <div className="card-words">
          <div className="card-word word-en">{english}</div>
          <div className="card-word word-ru">{russian}</div>
        </div>
        <div className="card-buttons">
          <button className='button btn-false'>Неверно</button>
          <button className='button btn-true'>Верно</button>
        </div>
      </div>
    </div>
    )
}