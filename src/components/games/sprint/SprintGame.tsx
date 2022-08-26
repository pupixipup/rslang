import { useState } from "react";
import { SprintApi } from "../../API/sprintApi";
import star from '../../../assets/icon/star.svg';
import './SprintGame.scss';
import { useNavigate } from "react-router-dom";
import { Timer } from "../timer/Timer";

export function SprintGame () {
  // console.log(SprintApi.wordsAll);
  
  let navigate = useNavigate();
  window.addEventListener('beforeunload', () => navigate('/games/sprint', { state: {gameMenu: true} }));
  const levelPoints = [10, 20, 40, 80];
  const [points, setPoints] = useState(levelPoints[0]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [index, setIndex] = useState(1);
  const [english, setEnglish] = useState(SprintApi.wordsEn[0]);
  const [russian, setRussian] = useState(SprintApi.wordsRu[0]);
  const [circleIndex, setCircleIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(1);

  const renderWords = () => {
    setIndex(index + 1);
    setEnglish(SprintApi.wordsEn[index]);
    setRussian(SprintApi.wordsRu[index]);
    if(SprintApi.wordsEn.length === index) {
      navigate('/games/results');
    }
  };

  const isRight = () => {
    SprintApi.wordsAll.forEach((item) => {
      if (item.word === english && item.wordTranslate === russian) {
        setTotalPoints(totalPoints + 10);
      }
    });
    renderWords();
  };

  const isWrong = () => {
    SprintApi.wordsAll.forEach((item) => {
      if (item.word !== english && item.wordTranslate !== russian) {
        setTotalPoints(totalPoints + 10);
        checkCircle(circleIndex)
      }
    });
    renderWords();
  };

  const checkLevel = (i: number) => {
    const stars = document.querySelectorAll('.card-star-img');
    if (i <= 3) {
      stars[i].classList.add('active-star');
      setPoints(levelPoints[i]);
      setLevelIndex(levelIndex + 1);
    }
  };

  const checkCircle = (i: number) => {
    const circles = document.querySelectorAll('.circle');
    if (i > 2) {
      circles.forEach((circle) => {
        circle.classList.remove('active-circle');
      });
      setCircleIndex(0);
      checkLevel(levelIndex);
    } else {
      circles[i].classList.add('active-circle');
      setCircleIndex(circleIndex + 1);
    }
  };


  return (
    <div className='sprint-wrapper'>
      <div className="sprint-header">
        <Timer/>
        <div className="sprint-total">{totalPoints}</div>
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
          <img className='card-star-img active-star' src={star} alt="star" />
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
            isWrong();
          }}>Неверно</button>
          <button className='button btn-true' onClick={() => {
            isRight();
            }}>Верно</button>
        </div>
      </div>
    </div>
  )
}