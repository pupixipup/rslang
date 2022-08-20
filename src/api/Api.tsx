import { URL } from "../common/constants";
import { PATH } from "../common/constants";
import { User } from "../models/types";

export const createUser = async (user: User) => {
  const response = await fetch(PATH.newUser, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).catch();
  if (response.status === 417) {
    alert('Такой пользователь уже зарегистрирован');
  }
  if (response.status === 422) {
    alert('Некорректный E-mail или пароль');
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export const loginUser = async (user: User) => {
  const response = await fetch(PATH.signin, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();

  return data;
};

export const getToken = async (id: string, token: string) => {
  const response = await fetch(`${URL}users/${id}/tokens`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  
  return data;
};