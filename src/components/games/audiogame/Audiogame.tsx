import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/Audiogame.scss';
import { audioGame } from './audioGameCreator';
import { gameUtils } from '../utils';
import { IUserWord } from '../../../common/interfaces';
import WordAudio from '../../textbook/WordAudio';
import playAudios from '../../textbook/playAudios';

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

useEffect(() => {
  const fetchWords = async () => {
    const data = await game.getFullWordlist();
    game.chunkedWords = gameUtils.chunkArray(data, 4);
    console.log(game.chunkedWords);
    setWordsRow(0);
  }
  fetchWords();
}, []);

useEffect(() => {
setWordChunk(game.chunkedWords[wordsRow]);
console.log(game.gameProvider.getGameStats(), 'stats');
if (wordsRow === game.chunkedWords.length) {
  navigate('/games/audiostats', { state: {failedWords, solvedWords} });
  game.gameProvider.uploadStats();
}
}, [wordsRow]);

useEffect(() => {
 if (attempts === 0) {
  console.log('game lost');
  navigate('/games/audiostats', { state: {failedWords, solvedWords} });
  game.gameProvider.uploadStats();
 }
}, [attempts]);

useEffect(() => {
  if (wordChunk) {
    setRightWord(gameUtils.getRandomElement(wordChunk));
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
      <div> right word: {rightWord?.word} - attempts: {attempts}</div>
      <div className="audiogame__options">
          {wordChunk ? wordChunk.map((word, ndx) => {
            return(<button
             onClick={() => {
              if (wordsRow < game.chunkedWords.length && attempts > 0) {
                setWordsRow(wordsRow + 1);
                if (gameUtils.areWordsEqual(rightWord!.word, word.word)) {
                  setSolvedWords([...solvedWords, word]);
                  game.gameProvider.guessed(word._id);
                } else {
                  setAttempts(attempts - 1);
                  setFailedWords([...failedWords, word]);
                  game.gameProvider.notGuessed(word._id);
                }
              }
            }}
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