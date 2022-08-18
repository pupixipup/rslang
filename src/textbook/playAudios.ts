import { API } from './api';
const playAudios = (sounds: (string | undefined)[]) => {
  const api = new API();
  let index = 0;
  let audio = new Audio();
  audio.src = `${api.baseUrl}/${sounds[index]}`;
  audio.play();
  if (index < 3) {
  audio.onended = () => { 
    audio.src = `${api.baseUrl}/${sounds[index += 1]}`;
    audio.play();
  };
}
}
export default playAudios