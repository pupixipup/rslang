import { Auth } from "../components/auth/Auth";
import { Games } from "../components/games/Games";
import Home from "../components/home/Home";
import Statistics from "../components/statistics/Statistics";
import Textbook from "../components/textbook/Textbook";
import { Audiogame } from "../components/games/audiogame/Audiogame";
import AudiogameMenu from "../components/games/audiogame/AudiogameMenu";
import { Sprint } from "../components/games/sprint/Sprint";
import AudioStats from "../components/games/audiogame/AudioStats";
import About from "../components/about/About"

export const BASELINK = "http://localhost";
export const PORT = "5500";
export const RESERVE_TIME = 5000;
export const REFRESH_TOKEN_LIFE = 0.5 *60*60;
export const WORD_PER_PAGE = 20;
export const NUMBER_OF_PAGES_IN_GROUP = 30;
export const TOTAL_WORD = 3600;
export enum ERROR {
    already_exist = '417',
    forbidden = '403',
    unauthorized = '401',
    notfound = '404'
}
export const GROUP_DIFFICULT = 6;
export const SERIES_FOR_UPD = 3;

export const MENUITEMS =[
    {
        value: 'Главная',        
        link: '',
        element: (<Home/>)
    },
    {
        value: 'Войти',
        link: 'signin',
        element: (<Auth/>)
    },
    {
        value: 'Словарь',
        link: 'textbook',
        element: (<Textbook/>)
    },
    {
      value: 'Игры',
      link: 'games',
      element: (<Games/>) // to do
    },
    {
      value: 'Статистика',
      link: 'statistics',
      element: (<Statistics/>) // to do
    },
    {
      value: 'Спринт',
      link: 'games/sprint',
      element: (<Sprint/>)
    },
    {
      value: 'Аудиовызов',
      link: 'games/audio',
      element: (<Audiogame/>)
    },
    {
      value: 'Аудиовызов - меню',
      link: 'games/audio-menu',
      element: (<AudiogameMenu/>)
    },
    {
      value: 'Аудиовызов - статистика',
      link: 'games/audiostats',
      element: (<AudioStats/>)
    },
    {
      value: 'О команде',
      link: 'about',
      element: (<About/>)
    }
]
export const ROUTEITEMS = [
    {
      value: 'Sprint',
      link: 'sprint'
    },
    {
      value: 'Audio',
      link: 'audio'
    },
  ]
export enum GAMES_NAMES {
    sprint = "Спринт",
    audio = "Аудиовызов"
  }
