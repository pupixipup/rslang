import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import icon from './assets/volume.svg';
import './styles/Audiogame.scss';
import { audioGame } from './audioGameCreator';

interface IGameLocationProps {
   gameMenu: boolean,
   section: number,
   page: number
}

export function Audiogame () {
let location = useLocation();
const locs = location.state as IGameLocationProps;
const [game] = useState(new audioGame(false, {page: locs.page, section: locs.section}));
console.log(game);
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