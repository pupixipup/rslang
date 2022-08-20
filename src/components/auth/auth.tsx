import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

export function Auth () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {userData} = useContext(Context);
  let navigate = useNavigate();
  
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
          await userData.login(email, password);
          navigate("/", { replace: true });
          }}>Войти</button>
        <button onClick={() => {
          const isAuth = localStorage.getItem('isAuth') === 'true';
          console.log(isAuth);
          if(!isAuth) {
            userData.registerUser(email, password);
            navigate("/", { replace: true });
          }
        }}>Регистрация</button>
        <button onClick={() => {
          userData.logout();
          // navigate("/auth", { replace: true });
          }}>Выйти</button>
      </div> 
    </div>
  )
}