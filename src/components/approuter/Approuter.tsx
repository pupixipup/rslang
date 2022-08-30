import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Auth } from "../auth/Auth";
import Home from "../home/Home";
import Statistics from "../statistics/Statistics";
import Textbook from "../textbook/Textbook";
import "./approuter.scss";


const MENUITEMS =[
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
const HomePage = (<Home/>);
  
function AppRouter() {
    const listItems = MENUITEMS.map((item) =>
      <li key={item.value}>
        <Link className="menu__item" to={item.link}> {item.value}</Link>
      </li>
    )
    const routeItems = MENUITEMS.map((item) =>
      <Route key={item.value} path={'/' + item.link} element ={item.element}/>
    )
    return (
        <BrowserRouter>
          <div className="menu">
            <ul className="menu__list">{listItems}</ul>
          </div>
          <section className="content">
            <Routes>
              {routeItems}
            </Routes>
          </section>
          </BrowserRouter>
        
      );
}

export default AppRouter;
