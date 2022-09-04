import React from "react";
import Footer from "../footer/Footer";
import './Home.scss';

class Home extends React.Component{
  render(): React.ReactNode {
    return (
      <React.StrictMode>
        <div className="home">
          <div className="home-wrapper">
            <div className="home-content">
              <h1 className="home-title">RSLang</h1>
              <div className="home-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum rerum deleniti optio quos voluptatibus quis eius.</div>
              <button className="home-btn">О команде</button>
            </div>
            <div className="home-image"></div>
          </div>
          <Footer />
        </div>
      </React.StrictMode>
    );
  }    
}
export default Home;