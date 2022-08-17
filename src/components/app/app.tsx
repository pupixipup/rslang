import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Auth from '../auth/auth';
import Home from '../home/home';
import Words from '../words/words';
import './app.scss';
import Footer from '../footer/footer';
import Header from '../header/header';

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



export default App;
