import { useContext, useEffect, useState } from "react";
import { IUserStats, IWordsStats } from "../../common/interfaces";
import { API } from "../API/api";
import { authContext } from "../app/App";
import Footer from "../footer/Footer";
import { GameStats } from "./GameStats";
import { WordsStats } from "./WordsStats";

function Statistics() {
  const {isAuth,changeIsAuth} = useContext(authContext);
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

  useEffect(() => {
    if(isAuth){
      API.getUserStats()
      .then((data) => {
        setStats(data);
        const now = new Date();
        //const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const date = "2022-8-30";
        if ((data.optional.daystats.date === undefined) || (date !== data.optional.daystats.date)) {
          setIsTodayStatsExists(false);
        } else {
          setIsTodayStatsExists(true);
          const items = data.optional.daystats.gamestats.map((item) =>
          <section key={item.game}>
            {<GameStats stats={item} />}
          </section>
        )
          setGamesItems(items);
          setWordStats(data.optional.daystats.wordsstats);
        }
      })

    }
    
  });

  if(isTodayStatsExists) return (
    <div className="statistics">
      <div className="wrapper">
        <h1>Статистика</h1>
        <h3>Всего выучено {stats.learnedWords}</h3>
        <h2>Статистика по играм за день</h2>
        {gamesItems}
        <h2>Статистика по словам за день</h2>
        {<WordsStats stats = {wordsStats}/>}
      </div>      
      <Footer />
    </div>
  );
  if(isAuth) return (
    <div className="statistics">
      <div className="wrapper">
        <h1>Статистика</h1>
        <h3>Всего выучено {stats.learnedWords}</h3>
        <h2>на сегодня статистики нет</h2>
      </div>
      <Footer />
    </div>  
  );
  return (
    <div className="statistics">
      <div className="wrapper">
        <h1>Авторизуйтесь для получения статистики</h1>
       </div>
      <Footer />
    </div>  
  )
}


export default Statistics;