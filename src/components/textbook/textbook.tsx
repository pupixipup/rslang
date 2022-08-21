import React, { useEffect, useState } from "react";
import constants from "../../constants";
import { createSectionsArray, Section } from "./Section";
import { IWord, API } from "./api";
import ReactPaginate from "react-paginate";
import Card from "./Card";
import "./Textbook.scss";

function Textbook() {
  const wordsLocation = JSON.parse(
    window.localStorage.getItem("wordsLocation") as string
  ) || { page: 0, section: 0 };
  const [numbers, setNumbers] = useState(wordsLocation);
  const [data, updateData] = useState<IWord[]>();

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

  useEffect(() => {
    const api = new API();
    if (numbers.section === 6) {
      api.getWords(1, 5).then((words) => {
        updateData(words);
      });
      return;
    }
    api.getWords(numbers.page, numbers.section).then((words) => {
      updateData(words);
    });
  }, [numbers]);

  return (
    <div>
      { sectionDisplayer }
      <div className="textbook">
        <div className="words">
          {data?.map((word, ndx) => {
            return (
              <Card
                link={`${constants.baseUrl}/${word?.image}`}
                word={word}
                key={ndx}
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
  );
}

export default Textbook;
