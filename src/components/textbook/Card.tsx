import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { createLocalDifficultyWord, createLocalisLearntWord } from "./wordapi";
import "./Card.scss";
import { wordUtils } from "./utils";
import WordAudio from "./WordAudio";
import {
  IUserWord,
  IWord,
  localWord,
  wordsList,
  IPagenatedResult,
} from "../../common/interfaces";

interface wordProps {
  setHardWordsCounter: (number: number) => void;
  setLearntWordsCounter: (number: number) => void;
  hardWordsCounter: number,
  learntWordsCounter: number,
  wordsArray: wordsList;
  word: IUserWord | IWord;
  localWords: Array<localWord>;
  updateLocalWords: (arr: localWord[]) => void;
  link: string;
  updateWords: (arr: IUserWord[]) => void;
  numbers: { page: number; section: number };
  isLoggedIn: boolean;
}

function Card(props: wordProps) {
  const {
    word,
    link,
    isLoggedIn,
    numbers,
    localWords,
    updateLocalWords,
    wordsArray,
    updateWords,
    setLearntWordsCounter,
    setHardWordsCounter,
    hardWordsCounter,
    learntWordsCounter
  } = props;
  let buttons = <div></div>;

  const [currentWord, setCurrentWord] = useState(word);

  if (isLoggedIn) {
    buttons = (
      <div className="word__interact">
        <button
          className="words__interact-hard"
          onClick={() => {
            const newLocalWord = createLocalDifficultyWord(currentWord);
            let ids = localWords.map((element) => element._id);

            if (ids.includes(newLocalWord._id)) {
              const filteredLocalWords = localWords.filter(
                (element) => element._id !== newLocalWord._id
              );
              updateLocalWords([...filteredLocalWords, newLocalWord]);
            } else {
              updateLocalWords([...localWords, newLocalWord]);
            }

            setCurrentWord({
              ...currentWord,
              userWord: newLocalWord.userWord,
            });
              if (numbers.section === 6) {
                updateWords(
                  (wordsArray as IUserWord[]).filter(
                    (element) => element._id !== (currentWord as IUserWord)._id
                  )
                );
              }
          }}
        >
          {(currentWord as IUserWord).userWord?.difficulty === "hard"
            ? "Убрать из сложных"
            : "Отметить как сложное"}
        </button>
        <button
          className="words__interact-learnt"
          onClick={() => {
            const newLocalWord = createLocalisLearntWord(currentWord);
            let ids = localWords.map((element) => element._id);
            
            if (ids.includes(newLocalWord._id)) {
              const filteredLocalWords = localWords.filter(
                (element) => element._id !== newLocalWord._id
                );
                console.log(filteredLocalWords, 'bef');
              updateLocalWords([...filteredLocalWords, newLocalWord]);
            } else {
              updateLocalWords([...localWords, newLocalWord]);
            }
            setCurrentWord({
              ...currentWord,
              userWord: newLocalWord.userWord,
            });
          }}
        >
          {(currentWord as IUserWord).userWord?.optional?.learnt === true
            ? "Убрать из изученных"
            : "Отметить как изученное"}
        </button>
      </div>
    );
  }

  return (
    <div className="word">
      <div className="word__desc">
        <div className="word__word">
          <div className="word__word-name">{word?.word}</div>
          <div className="word__word-transcription">{word?.transcription}</div>
          <div className="word__word-translation">{word?.wordTranslate}</div>
          <WordAudio
            audioLink={word?.audio}
            audioMeaningLink={word?.audioMeaning}
            audioExampleLink={word?.audioExample}
          />
        </div>
        <div className="word__meaning">
          <div
            className="word__meaning-eng"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(word?.textMeaning as string),
            }}
          />
          <div className="word__meaning-ru">{word?.textMeaningTranslate}</div>
        </div>
        <div className="word__example">
          <div
            className="word__example-eng"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(word?.textExample as string),
            }}
          />
          <div className="word__example-ru">{word?.textExampleTranslate}</div>
        </div>
        {buttons}
      </div>
      <img className="word__image" src={link} alt={word?.word} />
    </div>
  );
}

export default Card;
