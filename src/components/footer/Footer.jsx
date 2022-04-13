import { FaGithub, FaLinkedin, FaTwitter } from "assets/icons/icons";
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
          <FaGithub className="social-links" />
        </a>
        <a
          target="_blank"
          href="https://linkedin.com/in/yaswanth-myneni-a0a7261b1"
          rel="noreferrer"
        >
          <FaLinkedin className="social-links" />
        </a>
        <a
          target="_blank"
          href="https://twitter.com/yaswanthtweets"
          rel="noreferrer"
        >
          <FaTwitter className="social-links" />
        </a>
      </div>
    </footer>
  );
};

export { Footer };
