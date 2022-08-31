import './app.scss';
import '../../style/normalize.scss';
import '../../style/fonts.scss';
import { createContext, useEffect, useState } from 'react';
import { API } from '../API/api';
import { UserData } from '../API/userData';
import { IUserData } from '../../common/interfaces';
import Header from '../header/Header';
import AppRouter from '../approuter/Approuter';
import Footer from '../footer/Footer';




export const authContext = createContext(
  {
    isAuth: false,
    changeIsAuth: (val: boolean) => {}
  });


function App () {
  const [isAuth, setIsAuth] = useState(false);

  
  useEffect(()=>{
     if (localStorage.getItem('userData')) {
     API.loadAuthData(JSON.parse(localStorage.getItem('userData') as string))
     API.getRefreshToken();
     setIsAuth(true);
   }
  },[])
  
  const changeIsAuth = (val:boolean) => {
    setIsAuth(val);
  }
  const value = {isAuth,changeIsAuth};

  return (
    <authContext.Provider value={value}>
      <div className="App">
        <Header />
        <main className="main">
          <AppRouter />     
        </main>
       </div>
    </authContext.Provider>
  );
}


export default App;
