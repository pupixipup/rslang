import { API } from './api';
const playAudios = (sounds: (string | undefined)[], setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const api = new API();
  let index = 0;
  let audio = new Audio();
  audio.src = `${api.baseUrl}/${sounds[index]}`;
  audio.play();
    audio.onended = () => { 
    index += 1;
    if (index < sounds.length) {
    audio.src = `${api.baseUrl}/${sounds[index]}`;
    audio.play();
  } else {
    audio.pause();
    setState(false);
    audio.currentTime = 0;
  }
}
}
export default playAudios