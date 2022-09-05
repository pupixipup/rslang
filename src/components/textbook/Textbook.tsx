import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../API/api";
import { WordsApi } from "../API/wordsapi";
import { wordUtils } from "./utils";
import {
  IUserWord,
  wordsList,
  localWord,
} from "../../common/interfaces";
import { createSectionsArray, Section } from "./Section";
import ReactPaginate from "react-paginate";
import Card from "./Card";
import "./Textbook.scss";
import { authContext } from "../app/App";


function Textbook() {
  const wordsLocation = JSON.parse(
    window.localStorage.getItem("wordsLocation") as string
  ) || { page: 0, section: 0 };

  const [numbers, setNumbers] = useState(wordsLocation);
  const [wrapperClass, setWrapperClass] = useState('textbook-wrapper')
  const [data, updateData] = useState<wordsList>([]);
  const [localWords, updateLocalWords] = useState<localWord[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(API.isAuth());
  const [learntWordsCounter, setLearntWordsCounter] = useState(0);
  const [hardWordsCounter, setHardWordsCounter] = useState(0);
  const [wordsAreLoaded, setLoadedState] = useState(false);

  const ctx = useContext(authContext);
  if(ctx.isAuth !== isLoggedIn){
    setIsLoggedIn(ctx.isAuth);
  }
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
        }}
      />
    );
  }

  useEffect(() => {
    const handleUnload = async () => {
      window.localStorage.setItem("wordsLocation", JSON.stringify(numbers));
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  });

  useEffect(() => {
    const fetchData = async () => {
      updateLocalWords([]);
      let words: wordsList;
      if (numbers.section === 6) {
        words = API.isAuth() ? await WordsApi.getDifficultWords() : [];
        console.log(words);
      } else {
        if (API.isAuth()) {
          words = await WordsApi.getUserWords(
            numbers.page,
            numbers.section
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
    const filteredData = wordUtils.getUniqueWords(localWords, data as IUserWord[]);
    setHardWordsCounter(wordUtils.countHardWords(filteredData)
     + wordUtils.countHardWords(localWords as localWord[] & IUserWord[]));
    setLearntWordsCounter(wordUtils.countLearntWords(filteredData)
     + wordUtils.countLearntWords(localWords as localWord[] & IUserWord[]));
  }, [wordsAreLoaded, localWords]);

  const navigateToSprint = () => {
    if(API.isAuth()) {
      navigate('/games/sprint', { state: {gameMenu: false, group: Number(numbers.section), page: numbers.page, learned: false} });
    } else {
      navigate('/games/sprint', { state: {gameMenu: false, group: Number(numbers.section), page: numbers.page, learned: true} });
    }
  }

  return (
    <React.StrictMode>
      <div className={wrapperClass}>
        {sectionDisplayer}
        <div className="textbook__games">
          <div
            className="textbook__games-game game-sprint"
            onClick={navigateToSprint}
          >
            Спринт
          </div>
          <div
            className="textbook__games-game game-audio"
            onClick={() => navigate('/games/audio', { state: {gameMenu: false, section: numbers.section, page: numbers.page} })}
          >
            Аудиовызов
          </div>
        </div>
        <div className="textbook">
          {!API.isAuth() && numbers.section === 6 ? loginWindow : ""}
          <div className="words">
            {data?.map((word) => {
              return (
                <Card
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
