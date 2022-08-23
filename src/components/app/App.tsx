import './app.scss';
import { createContext } from 'react';
import { API } from '../API/api';
import { UserData } from '../API/userData';
import { IUserData } from '../../common/interfaces';
import Header from '../header/Header';
import AppRouter from '../approuter/Approuter';
import Footer from '../footer/Footer';


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