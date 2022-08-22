import './app.scss';
import Footer from '../footer/footer';
import Header from '../header/header';
import AppRouter from '../approuter/approuter';
import { createContext } from 'react';
import { API } from '../API/api';
import { UserData } from '../API/userData';
import { IUserData } from '../../common/interfaces';

const userData = new UserData();
export const Context = createContext<IUserData>({userData});


function App () {

  if (localStorage.getItem('userData')) {
    API.loadAuthData(JSON.parse(localStorage.getItem('userData') as string))
    API.getRefreshToken();
  }

  return (
    <Context.Provider value={{userData}}>
      <div className="App">
        <Header />
        <main className="main">
          <AppRouter />     
        </main>
        <Footer />
      </div>
    </Context.Provider>
  );
}




export default App;
