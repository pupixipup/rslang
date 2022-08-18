import React, { useEffect, useState } from 'react'
import {IWord, API } from './api';
import Pagination from './Pagination';
import ReactPaginate from 'react-paginate'
import Card from './Card';
import './Textbook.css';

function Textbook() {
  const wordsLocation = JSON.parse(window.localStorage.getItem('wordsLocation') as string) || [0, 0];
  const [numbers, setNumbers] = useState(wordsLocation);
  const [data, updateData] = useState<IWord[]>();

  useEffect(() => {
    const api = new API();
    api.getWords(numbers[0], numbers[1]).then((words) => {
      updateData(words);
    });
  }, [numbers]);

  function setPage(arr: number[]) {
    window.localStorage.setItem('wordsLocation', JSON.stringify(arr));
    setNumbers(arr);
    console.log(JSON.stringify(arr));
  }

  return (
    <div>
    <div className="textbook">
    <div className="words">
      {
        data?.map((word, ndx) => {
          return <Card word={word} key={ndx}/>
        })
      }
     </div>
      <div className="sections">
        <button onClick={() => {setPage([1, 0])}} className="sections__section">1</button>
        <button onClick={() => {setPage([1, 1])}} className="sections__section">2</button>
        <button onClick={() => {setPage([1, 2])}} className="sections__section">3</button>
        <button onClick={() => {setPage([1, 3])}} className="sections__section">4</button>
        <button onClick={() => {setPage([1, 4])}} className="sections__section">5</button>
        <button onClick={() => {setPage([1, 5])}} className="sections__section">6</button>
      </div>
     </div>
     <ReactPaginate
      className="pagination"
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={30}
      onPageChange={ ({selected}) => {
        setPage([
          selected,
          JSON.parse(window.localStorage.getItem('wordsLocation') as string)[1]]);
      }}
      />
  </div>
  )
}

export default Textbook;