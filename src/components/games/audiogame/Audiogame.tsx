import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/Audiogame.scss';
import { audioGame } from './audioGameCreator';
import { gameUtils } from '../utils';
import { IUserWord } from '../../../common/interfaces';
import WordAudio from '../../textbook/WordAudio';
import playAudios from '../../textbook/playAudios';
import { API } from '../../API/api';

interface IGameLocationProps {
   gameMenu: boolean,
   section: number,
   page: number
}

export function Audiogame () {
let location = useLocation();
let navigate = useNavigate();
const locs = location.state as IGameLocationProps;
const [game] = useState(new audioGame(false, {page: locs.page, section: locs.section}));
const [wordsRow, setWordsRow] = useState(-1);
const [wordChunk, setWordChunk] = useState<IUserWord[]>([]);
const [attempts, setAttempts] = useState(5);
const [failedWords, setFailedWords] = useState<IUserWord[]>([]);
const [solvedWords, setSolvedWords] = useState<IUserWord[]>([]);
const [rightWord, setRightWord] = useState<IUserWord>();
const [isPlaying, setPlaying] = useState(false);


let inputRefs: Array<React.RefObject<HTMLButtonElement>> = [];

inputRefs = [
  useRef<HTMLButtonElement>(null),
  useRef<HTMLButtonElement>(null),
  useRef<HTMLButtonElement>(null),
  useRef<HTMLButtonElement>(null)
];


function goNextWord(word: IUserWord) {
    if (wordsRow < game.chunkedWords.length && attempts > 0) {
      setWordsRow(wordsRow + 1);
      if (gameUtils.areWordsEqual(rightWord!.word, word.word)) {
        setSolvedWords([...solvedWords, rightWord!]);
        if (API.isAuth()) {
          game.gameProvider.guessed(rightWord!._id);
        }
      } else {
        setAttempts(attempts - 1);
        setFailedWords([...failedWords, rightWord!]);
        if (API.isAuth()) {
          game.gameProvider.notGuessed(rightWord!._id);
        }
      }
    }
}

useEffect(() => {
  const fetchWords = async () => {
    const data = await game.getFullWordlist();
    game.chunkedWords = gameUtils.chunkArray(data, 4);
    setWordsRow(0);
  }
  fetchWords();
}, []);

useEffect(() => {
setWordChunk(game.chunkedWords[wordsRow]);
if (wordsRow === game.chunkedWords.length) {
  navigate('/games/audiostats', { state: {failedWords, solvedWords} });
  if (API.isAuth()) {
    game.gameProvider.uploadStats();
  }
}
}, [wordsRow]);

useEffect(() => {
 if (attempts === 0) {
  navigate('/games/audiostats', { state: {failedWords, solvedWords} });
  if (API.isAuth()) {
  game.gameProvider.uploadStats();
  }
 }
}, [attempts]);

useEffect(() => {
  if (wordChunk) {
    setRightWord(gameUtils.getRandomElement(wordChunk));
  }

  function listenFirstWordClicked(event: KeyboardEvent) {
    if (event.code === 'Digit1') {
      inputRefs[0].current!.click();
      inputRefs[0].current!.style.backgroundColor = 'black !important';
    }
  }
  function listenSecondWordClicked(event: KeyboardEvent) {
    if (event.code === 'Digit2') {
      inputRefs[1].current!.click();
    }
  }
  function listenThirdWordClicked(event: KeyboardEvent) {
    if (event.code === 'Digit3') {
      inputRefs[2].current!.click();
    }
  }
  function listenFourthWordClicked(event: KeyboardEvent) {
    if (event.code === 'Digit4') {
      // @ts-ignore
      inputRefs[3].current!.click();
    }
  }

  document.addEventListener('keyup', listenFirstWordClicked);
  document.addEventListener('keyup', listenSecondWordClicked);
  document.addEventListener('keyup', listenThirdWordClicked);
  document.addEventListener('keyup', listenFourthWordClicked);

  return () => {
    document.removeEventListener('keyup', listenFirstWordClicked);
  document.removeEventListener('keyup', listenSecondWordClicked);
  document.removeEventListener('keyup', listenThirdWordClicked);
  document.removeEventListener('keyup', listenFourthWordClicked);
  }
}, [wordChunk]);

useEffect(() => {
  playAudios([`${rightWord?.audio}`], setPlaying);
}, [rightWord]);

return (
 <div className='audiogame'>
    <div className='audiogame__wrapper'>
      <button className="audiogame__audio">
        <WordAudio
            audioLink={rightWord?.audio}
            audioMeaningLink={undefined}
            audioExampleLink={undefined}
          />
      </button>
      <div className="audiogame__options">
          {wordChunk ? wordChunk.map((word, ndx) => {
            return(<button
             ref={(inputRefs[ndx])}
             onClick={() => {goNextWord(word)}}
             key={word.word + ndx + '-audio'}
             className="audiogame__options-option">
              {word.wordTranslate}
            </button>);
          }) : ''}
      </div>
    </div>
  </div>
)
}