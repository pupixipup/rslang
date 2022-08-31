import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import icon from './assets/volume.svg';
import './styles/Audiogame.scss';
import { audioGame } from './audioGameCreator';
import { gameUtils } from '../utils';
import { IWord, IUserWord } from '../../../common/interfaces';

interface IGameLocationProps {
   gameMenu: boolean,
   section: number,
   page: number
}

export function Audiogame () {
let location = useLocation();
const locs = location.state as IGameLocationProps;
const [game] = useState(new audioGame(false, {page: locs.page, section: locs.section}));
// const [words, setWords] = useState<IUserWord[]>([]);
const [wordsRow, setWordsRow] = useState(0);

useEffect(() => {
  const fetchWords = async () => {
    const data = await game.getFullWordlist();
    // await setWords(data);
    game.chunkedWords = gameUtils.chunkArray(data, 4);
    console.log(game.chunkedWords);
  }
  fetchWords();
}, []);

useEffect(() => {
// смена слов
}, [wordsRow]);

return (
 <div className='audiogame'>
    <div className='audiogame__wrapper'>
      <button className="audiogame__audio">
        <img src={icon} alt='play audio' className="audiogame__audio-icon" />
      </button>
    </div>
  </div>
)
}