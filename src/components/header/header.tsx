import React from "react";
import logo from '../../assets/img/6_1.jpg';
import "./header.scss";

class Header extends React.Component{
    render() {
      return (
        <header className="header">
          <div className="wrapper header__wrapper">
          <img src={logo} className="header__logo" alt="logo" />
          <h1>
            RS-Lang
          </h1>
          <h5>
            учим английские слова  
          </h5>        
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          </div>
        </header>
      );
    }  
  }
  export default Header;