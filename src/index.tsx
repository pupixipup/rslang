import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { IUserData } from './models/types';
import { UserData } from './models/userData';
import App from './app';


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

reportWebVitals();
