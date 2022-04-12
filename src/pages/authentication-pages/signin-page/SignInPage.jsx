import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthenticationContext, useToastContext } from "context";
import { submitSignInDetails } from "utility";
import { FaAngleRight } from "assets/icons/icons";
import "./signin-page.css";

const SignInPage = () => {
  // getting encodedToken from localStorage
  const encodedToken = localStorage.getItem("token");

  // Authentication Context
  const {
    authState: { email, password },
    authDispatch,
  } = useAuthenticationContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  // from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <main className="sign-in">
        <div className="input-container sign-in-container">
          <h2 className="text-center">SignIn</h2>
          <form className="input-flex">
            <label htmlFor="email">Email Id</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) =>
                authDispatch({ type: "EMAIL", payload: e.target.value })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) =>
                authDispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
            <div className="m-top-8px sign-in-flex">
              <label className="cursor" htmlFor="remember-me">
                <input className="cursor" type="checkbox" id="remember-me" />{" "}
                Remember me
              </label>
              <Link to="/forgot-password" className="cursor">
                forgot your password?
              </Link>
            </div>
            <button
              className="btn btn-primary"
              onClick={(event) =>
                submitSignInDetails(
                  event,
                  email,
                  password,
                  navigate,
                  location,
                  encodedToken,
                  toastDispatch,
                  authDispatch
                )
              }
            >
              SignIn
            </button>
            <button
              className="btn btn-primary"
              onClick={(event) =>
                submitSignInDetails(
                  event,
                  "adarshbalika@gmail.com",
                  "adarshBalika123",
                  navigate,
                  location,
                  encodedToken,
                  toastDispatch,
                  authDispatch
                )
              }
            >
              guest sign-in
            </button>
          </form>
          <p
            className="text-lg cursor signup-margin-tb-4px flex"
            onClick={() =>
              navigate("/signup", { state: { from: { pathname: "/" } } })
            }
          >
            Create New Account <FaAngleRight />
          </p>
        </div>
      </main>
    </>
  );
};

export { SignInPage };
