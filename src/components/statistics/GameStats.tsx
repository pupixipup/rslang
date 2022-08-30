import { IGameStats } from "../../common/interfaces";

export function GameStats(props: {stats:IGameStats}){
  const {stats} = props;
  return (
    <div className="gamestats">
      <div className="gamestats__heading">
        <h3 className="gamestats__headingtext">{stats.game}</h3>
      </div>
      <table>
        <tbody>
    <tr>
      <td>Новых слов:</td>
      <td>{stats.newWords}</td>
    </tr>
    <tr>
      <td>Процент правильных ответов:</td>
      <td>{Math.round((stats.correctAnswers / stats.answers * 10000))/100} %</td>
    </tr>
    <tr>
      <td>Самая длинная серия правильных ответов:</td>
      <td>{stats.longestSeries}</td>
    </tr>
    </tbody>
  </table>
    </div>
  );   
}