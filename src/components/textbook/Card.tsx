import React, { useState } from "react";
import DOMPurify from "dompurify";
import "./Card.scss";
import WordAudio from "./WordAudio";
import { WordsApi } from "../API/wordsapi";
import {
  IUserWord,
  IWord,
  localWord,
  wordsList
} from "../../common/interfaces";
import { wordUtils } from "./utils";

interface wordProps {
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
  } = props;
  let buttons = <div></div>;

  const [currentWord, setCurrentWord] = useState(word);

  if (isLoggedIn) {
    buttons = (
      <div className="word__interact">
        <button
          className="words__interact-hard"
          onClick={() => {
            const newLocalWord = wordUtils.createLocalDifficultyWord(currentWord);
            console.log(currentWord);
            wordUtils.updateLocalWord(localWords, newLocalWord, updateLocalWords);
            WordsApi.setWord(newLocalWord._id, newLocalWord.userWord, newLocalWord.isUserWord);
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
            const newLocalWord = wordUtils.createLocalisLearntWord(currentWord);
            wordUtils.updateLocalWord(localWords, newLocalWord, updateLocalWords);
            WordsApi.setWord(newLocalWord._id, newLocalWord.userWord, newLocalWord.isUserWord);
            setCurrentWord({
              ...currentWord,
              userWord: newLocalWord.userWord,
            });
            WordsApi.addLearntWordStats(currentWord.userWord?.optional?.learnt ? -1 : 1)
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
