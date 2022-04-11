import { Link } from "react-router-dom";
import heroImage from "assets/images/hero.svg";
import { Footer } from "components";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <main className="landing-page-main">
        <div className="grid grid-50-50">
          <div className="hero">
            <h1 className="hero-title">
              <strong class="color-success">Lucent</strong> Notes
            </h1>
            <h4>Meet your modern</h4>
            <h4 className="color-success">Note Taking App</h4>
            <p>
              Manage your daily tasks and workflow in a modern way and boost
              your efficiency without any efforts.
            </p>
            <div className="m-t-10rem">
              <Link to="/signup" className="btn btn-primary width-fc hero-link">
                Join now
              </Link>
              <Link to="/signin" className="hero-link">
                Already have an account?
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <img className="image-resp" src={heroImage} alt="hero" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export { LandingPage };
