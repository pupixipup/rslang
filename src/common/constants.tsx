import { Auth } from "../components/auth/Auth";
import Home from "../components/home/Home";
import Statistics from "../components/statistics/Statistics";
import Textbook from "../components/textbook/Textbook";

export const BASELINK = "http://localhost";
export const PORT = "5500";
export const RESERVE_TIME = 5000;
export const WORD_PER_PAGE = 20;
export const TOTAL_WORD = 3600;
export enum ERROR {
    already_exist = '417'
}
export const GROUP_DIFFICULT = 6;
export const SERIES_FOR_UPD = 3;
export const GAMES = [{
    game: "sprint",
    img: "../../assets/img/6_1.jpg"
},
{

}

]
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
      element: (<Home/>) // to do
    },
    {
      value: 'Статистика',
      link: 'statistics',
      element: (<Statistics/>) // to do
    },
]
export enum GAMES_NAMES {
    sprint = "Спринт",
    audio = "Аудиовызов"
  }
