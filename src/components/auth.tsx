import { useContext, useState } from "react"
import { Context } from "..";

export function LoginForm () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {userData} = useContext(Context);
  
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
        <button onClick={() => userData.login(email, password)}>Войти</button>
        <button onClick={() => userData.registerUser(email, password)}>Регистрация</button>
      </div>
    </div>
  )
}