import React from 'react';

import '../../style/normalize.scss';
import './app.scss';
import Footer from '../footer/footer';
import Header from '../header/header';
import AppRouter from '../approuter/approuter';



function App() {
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
