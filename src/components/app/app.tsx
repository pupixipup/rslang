import React from 'react';

import './app.scss';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import AppRouter from '../approuter/Approuter';



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
