import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Auth } from "../auth/Auth";
import { Audiogame } from '../games/audiogame/Audiogame'
import AudioStats from '../games/audiogame/AudioStats'
import Home from "../home/Home";
import Textbook from "../textbook/Textbook";
import "./Approuter.scss";


const MENUITEMS =[
    {
        value: 'HOME',
        link: ''
    },
    {
        value: 'SIGN IN',
        link: 'signin'
    },
    {
        value: 'TEXTBOOK',
        link: 'textbook'
    },
    {
      value: 'Игры',
      link: 'games'
  },
]
const ROUTEITEMS = [
  {
    value: 'Sprint',
    link: 'sprint'
  },
  {
    value: 'Audio',
    link: 'audio'
  },
  {
    value: 'AudioStats',
    link: 'audiostats'
  }
]

  
function AppRouter() {
    const listItems = MENUITEMS.map((item) =>
      <li key={item.value}>
        <Link className="menu__item" to={item.link}> {item.value}</Link>
      </li>
    )
    return (
        <BrowserRouter>
          <div className="menu">
            <ul className="menu__list">{listItems}</ul>
          </div>
          <section className="content">
            <Routes>
              <Route path="/" element ={<Home />}/>
              <Route path={'/' + MENUITEMS[1].link} element ={<Auth />}/>
              <Route path={'/' + MENUITEMS[2].link} element ={<Textbook />}/>
              <Route path={'/' + MENUITEMS[3].link + '/' + ROUTEITEMS[1].link} element = {<Audiogame />}/>
              <Route path={'/' + MENUITEMS[3].link + '/' + ROUTEITEMS[2].link} element = {<AudioStats />}/>
            </Routes>
          </section>
          </BrowserRouter>
        
      );
}

export default AppRouter;
