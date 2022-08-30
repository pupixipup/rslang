import { useEffect, useState } from "react";
import { SprintApi } from "../../API/sprintApi";
import star from '../../../assets/icon/star.svg';
import './SprintGame.scss';
import { useNavigate } from "react-router-dom";
import { Timer } from "../timer/Timer";
import pathCorrectAnswer from '../../../assets/audio/correct-answer.mp3';
import pathWrongAnswer from '../../../assets/audio/wrong-answer.mp3'
import { ResultsGame } from "../results/ResultsGame";

export function SprintGame () {
  let navigate = useNavigate();
  window.addEventListener('beforeunload', () => navigate('/games/sprint', { state: {gameMenu: true} }));
  const levelPoints = [10, 20, 40, 80];
  const [totalPoints, setTotalPoints] = useState(0);
  const [index, setIndex] = useState(0);
  let random = (): number => (Math.random() > 0.5) ? (index + 1): SprintApi.createRandomId();
  const [indexRu, setIndexRu] = useState(() => random());
  const [circleIndex, setCircleIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [audioCorrect] = useState(new Audio(pathCorrectAnswer));
  const [audioWrong] = useState(new Audio(pathWrongAnswer));
  const [time, setTime] = useState(true);

  console.log(index, indexRu);


  const renderWords = () => {
    setIndex((index) => index + 1);
    setIndexRu(random());
    if(SprintApi.wordsEn.length === index) {
      navigate('/games/results');
    }
  };

  const removeActiveCircles = () => {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle) => {
      circle.classList.remove('active-circle');
    });
    setCircleIndex(0);
  };

  const isRight = () => {
    if (index === indexRu) {
      setTotalPoints(totalPoints + levelPoints[levelIndex]);
      checkCircle(circleIndex);
      audioCorrect.play();
    } else {
      removeActiveCircles();
      audioWrong.play();
    }
    renderWords();
  };

  const isWrong = () => {
    if (index !== indexRu) {
      setTotalPoints(totalPoints + levelPoints[levelIndex]);
      checkCircle(circleIndex);
      audioCorrect.play();

    } else {
      removeActiveCircles();
      audioWrong.play();
    }
    renderWords();
  };

  const checkLevel = (i: number) => {
    const stars = document.querySelectorAll('.card-star-img');
    const circles = document.querySelectorAll('.circle');

    if (i <= 3) {
      stars[i].classList.add('active-star');
      setLevelIndex(levelIndex => levelIndex + 1);
    }
    if (i >= 3) {
      setLevelIndex(3);
      circles[0].classList.add('active-circle');
      circles[1].classList.add('hide');
      circles[2].classList.add('hide');
    }
  };

  const checkCircle = (i: number) => {
    const circles = document.querySelectorAll('.circle');
    if (i > 2) {
      removeActiveCircles();
      checkLevel(levelIndex + 1);
    } else {
      circles[i].classList.add('active-circle');
      setCircleIndex(circleIndex + 1);
    }
  };

  const updateTime = (value: boolean) => {
    setTime(value);
  }

  return time ? (
    <div className='sprint-wrapper'>
      <div className="sprint-header">
        <Timer updateTime={updateTime}/>
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
            {`+${levelPoints[levelIndex]} очков за слово`}
          </div>
        </div>
        <div className="card-star">
          <img className='card-star-img active-star' src={star} alt="star" />
          <img className='card-star-img' src={star} alt="star" />
          <img className='card-star-img' src={star} alt="star" />
          <img className='card-star-img' src={star} alt="star" />
        </div>
        <div className="card-words">
          <div className="card-word word-en">{SprintApi.wordsEn[index]}</div>
          <div className="card-word word-ru">{SprintApi.wordsRu[indexRu]}</div>
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
  ) : (
    <ResultsGame />
  )
}