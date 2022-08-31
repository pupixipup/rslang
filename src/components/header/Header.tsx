import React, { useContext } from "react";
import logo from '../../assets/img/6_1.jpg';
import { authContext } from "../app/App";
import "./header.scss";

function Header() {
  const {isAuth,changeIsAuth} = useContext(authContext);
  
  
      return (
        <React.StrictMode>
          <header className="header">
            <div className="wrapper header__wrapper">
              <img src={logo} className="header__logo" alt="logo" />
              <h1>
                RS-Lang
              </h1>
              <h5>
                учим английские слова  
              </h5>  
              <h5>{isAuth ? 'Auth' : 'not auth'}</h5>        
            </div>
          </header>
        </React.StrictMode>
      );
  }
  export default Header;