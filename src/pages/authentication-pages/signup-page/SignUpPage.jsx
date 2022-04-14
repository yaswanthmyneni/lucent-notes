import { useLocation, useNavigate } from "react-router-dom";
import {
  useAuthenticationContext,
  useNotesContext,
  useToastContext,
} from "context";
import { submitSignUpDetails } from "utility";
import { FaAngleRight } from "assets/icons/icons";
import "./signup-page.css";

const SignUpPage = () => {
  // from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  // from local storage
  const encodedToken = localStorage.getItem("token");

  // from authentication Context
  const {
    authState: { email, password, confirmPassword, firstName, lastName },
    authDispatch,
  } = useAuthenticationContext();

  // from notes context
  const { notesDispatch } = useNotesContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  return (
    <>
      <main className="sign-up-main">
        <section className="sign-up sign-up-container">
          <div className="input-container signup-input-container">
            <h2 className="text-center">SignUp</h2>
            <form className="input-flex gap-0">
              <label htmlFor="firstname">First Name</label>
              <input
                className="input"
                type="text"
                id="firstname"
                name="firstname"
                value={firstName}
                required
                onChange={(e) =>
                  authDispatch({ type: "FIRST_NAME", payload: e.target.value })
                }
              />
              <label htmlFor="lastname">Last Name</label>
              <input
                className="input"
                type="text"
                id="lastname"
                name="lastname"
                required
                value={lastName}
                onChange={(e) =>
                  authDispatch({ type: "LAST_NAME", payload: e.target.value })
                }
              />
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
                onChange={(e) => {
                  authDispatch({ type: "PASSWORD", payload: e.target.value });
                }}
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                className="input"
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                required
                onChange={(e) => {
                  authDispatch({
                    type: "CONFIRM_PASSWORD",
                    payload: e.target.value,
                  });
                }}
              />
              {confirmPassword !== "" && password === confirmPassword ? (
                <p className="signup-margin-tb-4px color-green">
                  passwords are matched
                </p>
              ) : (
                confirmPassword !== "" && (
                  <p className="signup-margin-tb-4px color-red">
                    passwords are not matched
                  </p>
                )
              )}
              <label
                htmlFor="terms-and-conditions"
                className="signup-margin-top"
              >
                <input type="checkbox" id="terms-and-conditions" /> I accept all
                Terms & Conditions
              </label>
              <button
                className="btn btn-primary"
                onClick={(event) =>
                  submitSignUpDetails(
                    event,
                    email,
                    password,
                    firstName,
                    lastName,
                    navigate,
                    location,
                    encodedToken,
                    toastDispatch,
                    authDispatch,
                    notesDispatch
                  )
                }
              >
                Create New Account
              </button>
            </form>
            <p
              className="flex text-lg cursor signup-margin-tb-4px"
              onClick={() =>
                navigate("/signin", { state: { from: { pathname: "/" } } })
              }
            >
              Already have an account <FaAngleRight />
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export { SignUpPage };
