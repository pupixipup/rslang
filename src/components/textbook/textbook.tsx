import React, { useEffect, useState } from 'react'
import constants from '../../constants';
import {createSectionsArray, Section} from './Section';
import {IWord, API } from './api';
import ReactPaginate from 'react-paginate'
import Card from './Card';
import './Textbook.scss';

function Textbook() {
  const wordsLocation = JSON.parse(window.localStorage.getItem('wordsLocation') as string) || [0, 0];
  const [numbers, setNumbers] = useState(wordsLocation);
  const [data, updateData] = useState<IWord[]>();

  const totalSections = 5;
  const sectionsArray: number[] = createSectionsArray(totalSections);

  window.addEventListener('beforeunload', () => {
    console.log('Unloading page');
    window.localStorage.setItem('wordsLocation', JSON.stringify(numbers));
  });

  useEffect(() => {
    const api = new API();
    api.getWords(numbers[0], numbers[1]).then((words) => {
      updateData(words);
    });
  }, [numbers]);

  return (
    <div>
    <div className="textbook">
    <div className="words">
      {
        data?.map((word, ndx) => {
          return <Card link={`${constants.baseUrl}/${word?.image}`} word={word} key={ndx}/>
        })
      }
     </div>
      <div className="sections">
        {
      sectionsArray.map((number) => {
        return <Section location={numbers} key={number} sectionId={number} setNumbers={setNumbers} />
      })
      }
      </div>
     </div>
     <ReactPaginate
      className="pagination"
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={30}
      forcePage={numbers[0]}
      onPageChange={ ({selected}) => {
        setNumbers([
          selected,
          numbers[1]]);
      }}
      />
  </div>
  )
}

export default Textbook;