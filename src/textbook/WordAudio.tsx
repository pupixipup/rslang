import React, { useState } from 'react'
import playAudios from './playAudios';

interface linkProps {
  audioLink: string | undefined
  audioMeaningLink: string | undefined
  audioExampleLink: string | undefined
}


function WordAudio(props: linkProps) {
  const [isPlaying, setPlaying] = useState(false);
  const { audioLink , audioMeaningLink, audioExampleLink } = props;
  const sounds = [audioLink, audioMeaningLink, audioExampleLink]; 
  return (
    <div>
      <button onClick={() => {
        if (isPlaying === false) {
          setPlaying(!isPlaying); 
          playAudios(sounds, setPlaying);
        }
        }}> Play </button>
  </div>
  )
}

export default WordAudio