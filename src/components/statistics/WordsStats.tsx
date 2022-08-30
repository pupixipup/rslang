import { IWordsStats } from "../../common/interfaces";

export function WordsStats(props: {stats:IWordsStats}){
  const {stats} = props;
  return (
    <table>
      <tbody>
    <tr>
      <td>Выучено за сегодня:</td>
      <td>{stats.learnedWords}</td>
    </tr>
    <tr>
      <td>Новых за сегодня:</td>
      <td>{stats.newWords}</td>
    </tr>
    </tbody>
  </table>
  )    
}