import React from "react";
import { useNavigate } from "react-router-dom";
import { MENUITEMS } from "../../common/constants";
import Footer from "../footer/Footer";
import "./home.scss";

function Home() {
  let navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="wrapper home__wrapper">
          <p>Повторение - мать учения.

            Наше приложение превратит изучение английских слов в увлекательный процесс.

          </p>
          
          <div className="home__teambtn" onClick={() => navigate(MENUITEMS[9].link)}>
            О команде
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;