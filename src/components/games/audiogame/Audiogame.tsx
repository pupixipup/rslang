import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import icon from './assets/volume.svg';
import './styles/Audiogame.scss';
import { audioGame } from './audioGameCreator';
import { gameUtils } from '../utils';
import { IWord, IUserWord, IUser } from '../../../common/interfaces';
import { wordUtils } from '../../textbook/utils';

interface IGameLocationProps {
   gameMenu: boolean,
   section: number,
   page: number
}

export function Audiogame () {
let location = useLocation();
const locs = location.state as IGameLocationProps;
const [game] = useState(new audioGame(false, {page: locs.page, section: locs.section}));
const [wordsRow, setWordsRow] = useState(-1);
const [wordChunk, setWordChunk] = useState<IUserWord[]>([]);
const [attempts, setAttempts] = useState(5);
const [rightWord, setRightWord] = useState<IUserWord>();

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
}, [wordsRow]);

useEffect(() => {
  if (wordChunk) {
    setRightWord(gameUtils.getRandomElement(wordChunk));
  }
}, [wordChunk]);

useEffect(() => {
 if (attempts === 0) {
  console.log('game lost');
 }
}, [attempts]);

return (
 <div className='audiogame'>
    <div className='audiogame__wrapper'>
      <button className="audiogame__audio">
        <img src={icon} alt='play audio' className="audiogame__audio-icon" />
      </button>
      <div> {rightWord?.word} - {attempts}</div>
      <div className="audiogame__options">
          {wordChunk ? wordChunk.map((word, ndx) => {
            return(<button
             onClick={() => {
              if (wordsRow < game.chunkedWords.length - 1) {
                setWordsRow(wordsRow + 1);
                if (gameUtils.areWordsEqual(rightWord!.word, word.word)) {
                } else {
                  setAttempts(attempts - 1);
                }
              } else {
                // finish game
              }
            }}
             key={word.word + ndx + '-audio'}
             className="audiogame__options-option">
              {word.word}
            </button>);
          }) : ''}
      </div>
    </div>
  </div>
)
}