import React, { useState, useEffect, MouseEventHandler } from 'react'
// import { IWord, API } from './api';
import playAudios from './playAudios';
interface linkProps {
  audioLink: string | undefined
  audioMeaningLink: string | undefined
  audioExampleLink: string | undefined
}

function WordAudio(props: linkProps) {
  const { audioLink , audioMeaningLink, audioExampleLink } = props;
  const sounds = [audioLink, audioMeaningLink, audioExampleLink]; 
  return (
    <div>
      <button onClick={() => {playAudios(sounds)}}> Play </button>
  </div>
  )
}

export default WordAudio