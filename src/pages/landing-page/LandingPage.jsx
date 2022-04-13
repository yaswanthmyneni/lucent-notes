import { Link } from "react-router-dom";
import heroImage from "assets/images/hero.svg";
import { Footer } from "components";
import { v4 as uuid } from "uuid";
import { useToastContext } from "context";
import "./LandingPage.css";

const LandingPage = () => {
  const { toastDispatch } = useToastContext();
  const encodedToken = localStorage.getItem("token");

  const alreadySignedIn = () => {
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: uuid(),
        className: "toast-warning",
        message: "Already Signed In",
      },
    });
  };

  return (
    <>
      <main className="landing-page-main">
        <div className="grid grid-50-50">
          <div className="hero">
            <h1 className="hero-title">
              <strong className="color-green">Lucent</strong> Notes
            </h1>
            <h4>Meet your modern</h4>
            <h4 className="color-green">Note Taking App</h4>
            <p>
              Manage your daily tasks and workflow in a modern way and boost
              your efficiency without any efforts.
            </p>
            <div className="m-t-10rem">
              <Link
                onClick={encodedToken && alreadySignedIn}
                to={!encodedToken && "/signup"}
                className="btn btn-primary width-fc hero-link"
                state={{ from: { pathname: "/" } }}
              >
                Join now
              </Link>
              <Link
                onClick={encodedToken && alreadySignedIn}
                to={!encodedToken && "/signin"}
                className="hero-link"
                state={{ from: { pathname: "/" } }}
              >
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
