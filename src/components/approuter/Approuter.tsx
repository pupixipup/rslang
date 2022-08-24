import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Auth } from "../auth/Auth";
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
            </Routes>
          </section>
          </BrowserRouter>
        
      );
}

export default AppRouter;
