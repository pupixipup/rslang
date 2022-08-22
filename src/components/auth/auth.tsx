import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../API/userApi";

export function Auth () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let navigate = useNavigate();
  const userApi = new UserApi();
  
  return (
    <div>
      <label>
        Email: 
        <input onChange={(e) => setEmail(e.target.value)} type="text" value={email} placeholder='Email' id='email' />
      </label>
      <label>
        Пароль:
        <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder='Пароль' id='password' />
      </label>
      <div>
        <button onClick={ async () => {
          await userApi.login(email, password);
          navigate("/", { replace: true });
          }}>Войти</button>
        <button onClick={() => {
          userApi.registerUser(email, password);
          navigate("/", { replace: true });
        }}>Регистрация</button>
        <button onClick={() => {
          userApi.logout();
          navigate("/", { replace: true });
          }}>Выйти</button>
      </div> 
    </div>
  )
}