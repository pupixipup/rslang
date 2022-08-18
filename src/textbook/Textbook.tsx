import React, { useEffect, useState } from 'react'
import {IWord, API } from './api';
import Card from './Card';
import './Textbook.css';

function Textbook() {
  const [numbers, setNumbers] = useState([1, 2]);
  const [data, updateData] = useState<IWord[]>();
  useEffect(() => {
    console.log(numbers);
    const api = new API();
    api.getWords(numbers[0], numbers[1]).then((words) => {
      updateData(words);
    });
  }, numbers);
  return (
    <div className="textbook">
    <div className="words">
      {
        data?.map((word, ndx) => {
          return <Card word={word} key={ndx}/>
        })
      } 
     </div>
     <div>
      <div className="sections">
        <button onClick={() => {setNumbers([1, 0])}} className="sections__section">1</button>
        <button onClick={() => {setNumbers([1, 1])}} className="sections__section">2</button>
        <button onClick={() => {setNumbers([1, 2])}} className="sections__section">3</button>
        <button onClick={() => {setNumbers([1, 3])}} className="sections__section">4</button>
        <button onClick={() => {setNumbers([1, 4])}} className="sections__section">5</button>
        <button onClick={() => {setNumbers([1, 5])}} className="sections__section">6</button>
      </div>
     </div>
    </div>
  )
}

export default Textbook;