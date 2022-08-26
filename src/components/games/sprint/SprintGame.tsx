import { useState } from "react";
import { SprintApi } from "../../API/sprintApi";
import star from '../../../assets/icon/star.svg';
import './SprintGame.scss';
import { useNavigate } from "react-router-dom";
import { Timer } from "../timer/Timer";

export function SprintGame () {
  let navigate = useNavigate();
  window.addEventListener('beforeunload', () => navigate('/games/sprint', { state: {gameMenu: true} }))
  const [points, setPoints] = useState(10);
  const [index, setIndex] = useState(1);
  const [english, setEnglish] = useState(SprintApi.wordsEn[0]);
  const [russian, setRussian] = useState(SprintApi.wordsRu[0]);

  const renderWords = () => {
    setIndex(index + 1);
    setEnglish(SprintApi.wordsEn[index]);
    setRussian(SprintApi.wordsRu[index]);
    if(SprintApi.wordsEn.length === index) {
      navigate('/games/results');
    }
  }

  return (
    <div className='sprint-wrapper'>
      <Timer/>
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
          <button className='button btn-false' onClick={() => {
            renderWords()
            console.log(index);
          }}>Неверно</button>
          <button className='button btn-true' onClick={() => {
            renderWords()
            console.log(index);
            }}>Верно</button>
        </div>
      </div>
    </div>
  )
}