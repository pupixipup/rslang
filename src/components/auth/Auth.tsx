import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../API/userApi";
import { authContext } from "../app/App";
import './auth.scss';

export function Auth () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let navigate = useNavigate();
  const userApi = new UserApi();
  const {isAuth,changeIsAuth} = useContext(authContext); // NT 2022-08-31
  
  return (
    <div className="auth">
      <div className="auth__block">
        <label htmlFor="email" className="auth__lable">
          Email: 
        </label>
        <input
          className="auth__input"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          value={email}
          placeholder='Email' 
          id='email' />
      </div>
      <div className="auth__block">
        <label htmlFor="password" className="auth__lable">
          Пароль:
        </label>
        <input
          className="auth__input"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder='Пароль'
          id='password' />
      </div>
      <div className="auth__buttons">
        <button 
          className="auth__button"
          onClick={ async () => {
            await userApi.login(email, password);
            changeIsAuth(true);  // NT 2022-08-31
            navigate("/", { replace: true });
          }}>
            Войти
        </button>
        <button 
          className="auth__button"
          onClick={() => {
            userApi.registerUser(email, password)
            .then(() => changeIsAuth(true));   // NT 2022-08-31
            navigate("/", { replace: true });
          }}>
            Регистрация
        </button>
        <button onClick={() => {
          userApi.logout();
          changeIsAuth(false); // NT 2022-08-31
          navigate("/", { replace: true });
          }}>
            Выйти
        </button>
      </div> 
    </div>
  )
}