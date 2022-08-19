import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.css';
import { IUserData } from './models/types';
import { UserData } from './models/userData';


const userData = new UserData();
export const Context = createContext<IUserData>({userData});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Context.Provider value={{userData}}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
