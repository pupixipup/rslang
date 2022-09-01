import React, { useContext } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import logo from '../../assets/img/RSlang_logo.svg';
import { MENUITEMS } from "../../common/constants";
import { authContext } from "../app/App";
import "./header.scss";

function Header() {
  const {isAuth,changeIsAuth} = useContext(authContext);
  
  
      return (
        <React.StrictMode>
          <header className="header">
            <div className="wrapper header__wrapper">
              <BrowserRouter>
              <Link  to={MENUITEMS[2].link}>
                 <img src={logo} className="header__logo" alt="logo" />
              </Link>
              <h5>
                учим английские слова  
              </h5>  
              <h5>{isAuth ? 'Auth' : 'not auth'}</h5>   
              </BrowserRouter>              
            </div>
          </header>
        </React.StrictMode>
      );
  }
  export default Header;