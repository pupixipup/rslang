import Footer from "../footer/Footer";
import "./about.scss";

export default function About() {
    return (
        <div>
            <div className="about">
                
                <div className="about__wrapper">
                <h2>Наша команда</h2>
                <div className="section">

                
                    <div className="about__img">
                    </div>

                    <div className="team">
                        <div className="team__card">
                            <h3>Виктория</h3>
                            <p>разработала компоненты авторизации и игру "Спринт"</p>
                            <a className="team__git-nickname"
                                href="https://github.com/vpuzyrevich"
                                target="_blank"
                                rel="noopener noreferrer">vpuzyrevich</a>
                        </div>
                        <div className="team__card">
                            <h3>Наталья</h3>
                            <p>разработала компоненты статистики, главное меню</p>
                            <a className="team__git-nickname"
                                href="https://github.com/BlueOwll"
                                target="_blank"
                                rel="noopener noreferrer">BlueOwll</a>
                        </div>
                        <div className="team__card">
                            <h3>Ромас</h3>
                            <p>разработал словарь и игру "Аудиовызов"</p>
                            <a className="team__git-nickname"
                                href="https://github.com/pupixipup"
                                target="_blank"
                                rel="noopener noreferrer">pupixipup</a>
                        </div>

                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}