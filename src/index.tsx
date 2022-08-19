import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserData } from './models/UserData';
import { IUserData } from './models/types';


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
