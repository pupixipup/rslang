import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../API/api";
import { WordsApi } from "../API/wordsapi";
import { wordUtils } from "./utils";
import {
  IUserWord,
  IWord,
  wordsList,
  localWord,
} from "../../common/interfaces";
import { sendLocalWords } from "./wordapi";
import { createSectionsArray, Section } from "./Section";
import ReactPaginate from "react-paginate";
import Card from "./Card";
import "./Textbook.scss";

function Textbook() {
  const wordsLocation = JSON.parse(
    window.localStorage.getItem("wordsLocation") as string
  ) || { page: 0, section: 0 };

  const [numbers, setNumbers] = useState(wordsLocation);
  const [wrapperClass, setWrapperClass] = useState('textbook-wrapper')
  const [data, updateData] = useState<wordsList>([]);
  const [localWords, updateLocalWords] = useState<localWord[]>([]);
  const [isLoggedIn] = useState<boolean>(API.isAuth());
  const [learntWordsCounter, setLearntWordsCounter] = useState(0);
  const [hardWordsCounter, setHardWordsCounter] = useState(0);
  const [wordsAreLoaded, setLoadedState] = useState(false);

  let navigate = useNavigate();
  const totalSections = 6;
  const sectionsArray: number[] = createSectionsArray(totalSections);

  let pagination;
  let sectionDisplayer = (
    <div className={`section-displayer section-${numbers.section}`} />
  );
  const loginWindow = (
    <div className="textbook__login">
      Войдите, чтобы увидеть добавленные сложные слова
    </div>
  );

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
          console.log(numbers.page);
        }}
      />
    );
  }

  useEffect(() => {
    const handleUnload = async () => {
      // saving current location in the storage
      window.localStorage.setItem("wordsLocation", JSON.stringify(numbers));
      // updating
      window.alert('Пожалуйста, подождите, пока данные загрузятся')
      await sendLocalWords(localWords);
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  });

  useEffect(() => {
    const fetchData = async () => {
      await sendLocalWords(localWords);
      updateLocalWords([]);
      let words: wordsList;
      if (numbers.section === 6) {
        if (API.isAuth()) {
          words = await WordsApi.getDifficultWords();
        } else {
          words = [];
        }
      } else {
        if (API.isAuth()) {
          words = await API.getAggregatedUserWords(
            numbers.section,
            numbers.page,
            20
          );
        } else {
          words = await API.getWords(numbers.page, numbers.section);
        }
      }
      updateData(words);
      setLoadedState(!wordsAreLoaded);
  };
    fetchData();
  }, [numbers]);

  useEffect(() => {
    let className = 'textbook-wrapper'
    if (hardWordsCounter === 20) className += ' allWordsHard';
    if (learntWordsCounter === 20) className += ' allWordsLearnt';
    setWrapperClass(className);
  }, [hardWordsCounter, learntWordsCounter, numbers]);


  useEffect(() => {
    const idsOnly = localWords.map((element) => element._id);
    const filteredData = (data as IUserWord[]).filter(element => !idsOnly.includes(element._id));
    console.log(filteredData, 'filt');
    
    setHardWordsCounter(wordUtils.countHardWords(filteredData as IUserWord[]) + wordUtils.countHardWords(localWords as localWord[] & IUserWord[]));
    setLearntWordsCounter(wordUtils.countLearntWords(filteredData as IUserWord[]) + wordUtils.countLearntWords(localWords as localWord[] & IUserWord[]));
  }, [wordsAreLoaded, localWords]);

  return (
    <React.StrictMode>
      <div className={wrapperClass}>
        {sectionDisplayer}
        <div className="textbook__games">
          <div
            className="textbook__games-game game-sprint"
            onClick={() => navigate("/games/sprint", { replace: true })}
          >
            Спринт
          </div>
          <div
            className="textbook__games-game game-audio"
            onClick={() => navigate("/games/games/audio", { replace: true })}
          >
            Аудиовызов
          </div>
        </div>
        <div className="textbook">
          {!API.isAuth() && numbers.section === 6 ? loginWindow : ""}
          <div className="words">
            {data?.map((word, ndx) => {
              return (
                <Card
                  learntWordsCounter={learntWordsCounter}
                  hardWordsCounter={hardWordsCounter}
                  setHardWordsCounter={setHardWordsCounter}
                  setLearntWordsCounter={setLearntWordsCounter}
                  localWords={localWords}
                  updateLocalWords={updateLocalWords}
                  wordsArray={data}
                  updateWords={updateData}
                  numbers={numbers}
                  link={`${API.baseUrl}/${word?.image}`}
                  isLoggedIn={isLoggedIn}
                  key={`${word.word}-${numbers.section}`}
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
