import React from 'react';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import logo from '../../assets/img/6_1.jpg';
import Auth from '../auth/auth';
import Home from '../home/home';
import Words from '../words/words';
import './app.css';

enum MENU_ITEMS{
  HOME = 'home',
  AUTH = 'auth',
  WORDS = 'words',
}
enum MENU_LINKS{
  HOME = '/',
  AUTH = 'auth',
  WORDS = 'words',
}

interface MenuItemProps{
  value: MENU_ITEMS;
  linkTo: MENU_LINKS;
}

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="wrapper">          
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route path="/" element ={<Home />}/>
              <Route path={'/' + MENU_LINKS.WORDS} element ={<Words />}/>
              <Route path={'/' + MENU_LINKS.AUTH} element ={<Auth />}/>
            </Routes>            
          </BrowserRouter>
        </div>        
      </main>
      <Footer />
    </div>
  );
}
class Menu extends React.Component{
  renderItem(btnName: MENU_ITEMS, link: MENU_LINKS){
    const props = {value: btnName, linkTo: link}
    return <MenuItem {...props} />
  }
  render(): React.ReactNode {
    return (
      <div className="menu">
        {this.renderItem(MENU_ITEMS.HOME, MENU_LINKS.HOME)}
        {this.renderItem(MENU_ITEMS.AUTH, MENU_LINKS.AUTH)}
        {this.renderItem(MENU_ITEMS.WORDS, MENU_LINKS.WORDS)}
      </div>
    );
  }
}

class MenuItem extends React.Component <MenuItemProps>{  

  render() {
    console.log(this.props);
    return (      
        <Link className="menu-item" to={this.props.linkTo}> {this.props.value}</Link>
    );
  }
}

class Header extends React.Component{
  render() {
    return (
      <header className="header">
        <div className="wrapper header-wrapper">
        <img src={logo} className="logo" alt="logo" />
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
class Footer extends React.Component{
  render() {
    return (
      <footer className="footer">
      <div className="wrapper footer-wrapper">
        <a 
          className="footer-logo" 
          href="https://rs.school/js/" 
          target="_blank"
          rel="noopener noreferrer">            
        </a>
        <p>2022</p>
        <div className="footer-team">
          <p className="copyright">
              GH <a 
              href="https://github.com/pupixipup" 
              target="_blank"
              rel="noopener noreferrer">pupixipup</a>
          </p> 
          <p className="copyright">
              GH <a 
              href="https://github.com/BlueOwll" 
              target="_blank"
              rel="noopener noreferrer">BlueOwll</a>
          </p>       
          <p className="copyright">
              GH <a 
              href="https://github.com/vpuzyrevich" 
              target="_blank"
              rel="noopener noreferrer">vpuzyrevich</a>
          </p> 
        </div>
      </div>
    </footer>
    );
  }
}

export default App;
