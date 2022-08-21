import React, { useContext } from 'react';
import './app.scss';
import Footer from '../footer/footer';
import Header from '../header/header';
import AppRouter from '../approuter/approuter';
import { Context } from '../..';



function App () {

  const {userData} = useContext(Context);

  if (localStorage.getItem('userData')) {
    userData.refreshToken();
  }

  console.log(userData.isAuth);
  console.log(userData.user);
  return (
    <div className="App">
      <Header />
      <main className="main">
        <AppRouter />     
      </main>
      <Footer />
    </div>
  );
}




export default App;
