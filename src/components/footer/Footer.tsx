import React from "react";
import "./footer.scss";

class Footer extends React.Component{
    render() {
      return (
        <footer className="footer">
        <div className="wrapper footer__wrapper">
          <a 
            className="footer__logo" 
            href="https://rs.school/js/" 
            target="_blank"
            rel="noopener noreferrer">            
          </a>
          <p>2022</p>
          <div className="footer__team">
            <p className="copyright">
                GH <a 
                href="https://github.com/pupixipup" 
                target="_blank"
                rel="noopener noreferrer">pupixipup</a>
            </p> 
            <p className="copyright">
                GH <a 
                href="https://github.com/BlueOwll" 
                target="_blank"
                rel="noopener noreferrer">BlueOwll</a>
            </p>       
            <p className="copyright">
                GH <a 
                href="https://github.com/vpuzyrevich" 
                target="_blank"
                rel="noopener noreferrer">vpuzyrevich</a>
            </p> 
          </div>
        </div>
      </footer>
      );
    }
  }
  export default Footer;