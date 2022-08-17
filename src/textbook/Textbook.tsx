import React, { useEffect, useState } from 'react'
import {IWord, API } from './api';
import Card from './Card';

function Textbook() {
  const [data, updateData] = useState<IWord[]>();
  useEffect(() => {
    const api = new API();
    api.getWords(1, 2).then((words) => {
      updateData(words);
    });
  }, []);
  return (
    <div>
      {
        data?.map((word, ndx) => {
          return <Card word={word} key={ndx}/>
        })
      } 
     </div>
  )
}

export default Textbook;