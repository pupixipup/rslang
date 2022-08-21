import React from 'react';

import '../../style/normalize.scss';
import './app.scss';
import '../../style/fonts.scss';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Approuter from '../approuter/Approuter';



function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Approuter />
      </main>
      <Footer />
    </div>
  );
}




export default App;
