import { Auth } from "../components/auth/Auth";
import { GameMenu } from "../components/games/gameMenu/GameMenu";
import Home from "../components/home/Home";
import Statistics from "../components/statistics/Statistics";
import Textbook from "../components/textbook/Textbook";

export const BASELINK = "http://localhost";
export const PORT = "5500";
export const RESERVE_TIME = 5000;
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
      element: (<GameMenu/>) // to do
    },
    {
      value: 'Статистика',
      link: 'statistics',
      element: (<Statistics/>) // to do
    },
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
