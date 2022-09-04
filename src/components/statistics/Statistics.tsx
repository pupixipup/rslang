import "./statistics.scss";
import { useContext, useEffect, useState } from "react";
import { IUserStats, IWordsStats } from "../../common/interfaces";
import { API } from "../API/api";
import { authContext } from "../app/App";
import Footer from "../footer/Footer";
import { GameStats } from "./GameStats";
import { WordsStats } from "./WordsStats";

function Statistics() {
  const ctx = useContext(authContext);
  const isAuth = ctx.isAuth;
  //const [isAuth, setIsAuth] = useState(ctx.isAuth);
  const [stats, setStats] = useState({
    learnedWords: 0,
    optional: {
      daystats:
      {
        date: "",
        gamestats: [],
        wordsstats: {
          learnedWords: 0,
          newWords: 0
        }
      }
   }
  } as IUserStats);
  const [isTodayStatsExists, setIsTodayStatsExists] = useState(false);
  const [gamesItems, setGamesItems] = useState<JSX.Element[]>([]);
  const [wordsStats, setWordStats] = useState({
    learnedWords: 0,
    newWords: 0
  } as IWordsStats);

//  / if(isAuth !== ctx.isAuth){
//     setIsAuth(ctx.isAuth);
//   }
  useEffect(() => {
    console.log('use effect');
    console.log("iaAuth" + isAuth);
    if(isAuth){
      console.log(isAuth);
      API.getUserStats()
      .then((data) => {
        console.log(data);
        console.log('data');
        setStats(data);
        const now = new Date();
        const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        //const date = "2022-9-2";
        console.log(data.optional.daystats.date + 'date' + date);
        if ((data.optional.daystats.date === undefined) || (date !== data.optional.daystats.date)) {
          setIsTodayStatsExists(false);
        } else {
          setIsTodayStatsExists(true);
          const items = data.optional.daystats.gamestats.map((item) =>
          <section  key={item.game}>
            {<GameStats stats={item} />}
          </section>
        )
          setGamesItems(items);
          setWordStats(data.optional.daystats.wordsstats);
        }
      })

    }
    

  }, [isAuth]);


  // console.log("today " + isTodayStatsExists);
  // console.log(stats);
  // console.log("iaAuth render " + isAuth);
  if(isAuth){
  if(isTodayStatsExists) return (
    <div>
    <div className="statistics">
      <div className="wrapper statistics__wrapper">
        <h1>Статистика</h1>
        <h3>Всего слов выучено: {stats.learnedWords}</h3>
        <h2>Статистика по играм за день</h2>
        <div className="gamestats-container">
        {gamesItems}
        </div>
        <h2>Статистика по словам за день</h2>
        {<WordsStats stats={wordsStats} />}
      </div>     
      </div> 
      <Footer />
    </div>
  );
  return (
    <div >
    <div className="statistics">
      <div className="wrapper statistics__wrapper">
        <h1>Статистика</h1>
        <h3>Всего выучено {stats.learnedWords}</h3>
        <h2 className="no-statistics">на сегодня статистики нет</h2>
      </div>
      </div>
      <Footer />
    </div>  
  );
  }
  return (
    <div>
    <div className="statistics">
      <div className="wrapper statistics__wrapper">
        <p className="no-statistics">Авторизуйтесь для получения статистики</p>
       </div>
       </div>
      <Footer />
    </div>  
  )
}


export default Statistics;