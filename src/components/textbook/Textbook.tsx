import React, { useEffect, useState } from "react";
import { API } from '../API/api';
import {IAggregatedUserWord, IWord} from "../../common/interfaces";
import { createSectionsArray, Section } from "./Section";
import ReactPaginate from "react-paginate";
import Card from "./Card";
import "./Textbook.scss";

function Textbook() {
  const wordsLocation = JSON.parse(
    window.localStorage.getItem("wordsLocation") as string
  ) || { page: 0, section: 0 };

  const [numbers, setNumbers] = useState(wordsLocation);
  const [data, updateData] = useState<IWord[]>();
  const [isLoggedIn] = useState<boolean>(API.isAuth());
  const [hardArray, setHardWords] = useState([] as string[]);

  const totalSections = 6;
  const sectionsArray: number[] = createSectionsArray(totalSections);

  window.addEventListener("beforeunload", () => {
    window.localStorage.setItem("wordsLocation", JSON.stringify(numbers));
  });

  let pagination;
  let sectionDisplayer = <div className={`section-displayer section-${numbers.section}`}/>;

  if (numbers.section !== 6) {
    pagination = (
      <ReactPaginate
        className="pagination"
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={30}
        forcePage={numbers.page}
        onPageChange={({ selected }) => {
          setNumbers({
            page: selected,
            section: numbers.section,
          });
        }}
      />
    );
  }

  useEffect( () => {
    const fetchData = async () => {
      let words: IAggregatedUserWord[] | undefined | IWord[];
      if (numbers.section === 6) {
        words = await API.getWords(1, 5);
      } else {
      words = await API.getWords(numbers.page, numbers.section);
      }
      updateData(words);

      const hardWordsRaw = await API.getHardWords(0, 500);
      const hardWords: IAggregatedUserWord[] | IWord[] = hardWordsRaw[0].paginatedResults;
      const hardWordsIds = hardWords.map((element: IWord) => element.word);
      setHardWords(hardWordsIds);
    }
    fetchData();
  }, [numbers]);

  useEffect( () => {
    const fetchData = async () => {
      const hardWordsRaw = await API.getHardWords(0, 500);
      const hardWords: IAggregatedUserWord[] | IWord[] = hardWordsRaw[0].paginatedResults;
      const hardWordsIds = hardWords.map((element: IWord) => element.word);
      setHardWords(hardWordsIds);
    }
    fetchData();
  }, []);

  return (
    <React.StrictMode>
    <div className="textbook-wrapper">
      { sectionDisplayer }
      <div className="textbook">
        <div className="words">
          {data?.map((word, ndx) => {
            return (
              <Card
                hardWords={hardArray}
                link={`${API.baseUrl}/${word?.image}`}
                isLoggedIn={ isLoggedIn }
                key={word.id}
                word={word}
              />
            );
          })}
        </div>
        <div className="sections">
          {sectionsArray.map((number) => {
            return (
              <Section
                location={numbers}
                key={number}
                sectionId={number}
                setNumbers={setNumbers}
              />
            );
          })}
        </div>
      </div>
      <div>{pagination}</div>
    </div>
  </React.StrictMode>
  );
}

export default Textbook;
