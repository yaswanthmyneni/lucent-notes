import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>Made by Yaswanth Myneni</p>
      <div className="footer-flex">
        <a
          target="_blank"
          href="https://github.com/yaswanthmyneni/"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github social-links"></i>
        </a>
        <a
          target="_blank"
          href="https://linkedin.com/in/yaswanth-myneni-a0a7261b1"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin social-links"></i>
        </a>
        <a
          target="_blank"
          href="https://twitter.com/yaswanthtweets"
          rel="noreferrer"
        >
          <i className="fa-brands fa-twitter social-links"></i>
        </a>
      </div>
    </footer>
  );
};

export { Footer };
