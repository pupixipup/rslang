import React from 'react';
import logo from '../../assets/img/6_1.jpg';
import './app.css';

enum MENU_ITEMS{
  AUTH = 'auth',
  WORDS = 'words',
}

interface MenuItemProps{
  value: MENU_ITEMS;
}

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="wrapper">
          <Menu />
        </div>        
      </main>
      <Footer />
    </div>
  );
}
class Menu extends React.Component{
  renderItem(btnName: MENU_ITEMS){
    return <MenuItem value = {btnName} />
  }
  render(): React.ReactNode {
    return (
      <div className="menu">
        {this.renderItem(MENU_ITEMS.AUTH)}
        {this.renderItem(MENU_ITEMS.WORDS)}
      </div>
    );
  }
}

class MenuItem extends React.Component <MenuItemProps>{  

  render() {
    return (
      <button className="menu-item">
        {this.props.value}
      </button>
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
        <p className="copyright">
            GH <a href="https://github.com/BlueOwll" target="_blank">BlueOwll</a> 2022

        </p> 
      </div>
    </footer>
    );
  }
}

export default App;
