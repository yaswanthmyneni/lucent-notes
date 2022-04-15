import axios from "axios";
import { getUniqueNumber } from "./common-functions";

const submitSignInDetails = async (
  event,
  email,
  password,
  navigate,
  location,
  encodedToken,
  toastDispatch,
  authDispatch,
  notesDispatch
) => {
  try {
    event.preventDefault();
    if (encodedToken) {
      return toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-error",
          message: "already logged in",
        },
      });
    }
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.encodedToken);
      notesDispatch({ type: "USER", payload: response.data.foundUser });
      authDispatch({ type: "CLEAR_SIGN_IN" });
      navigate(location?.state?.from?.pathname, { replace: true });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "logged in successfully",
        },
      });
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: getUniqueNumber(),
        className: "toast-error",
        message: "error! check console",
      },
    });
  }
};

const submitSignUpDetails = async (
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
) => {
  try {
    event.preventDefault();
    const regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (encodedToken) {
      return toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-error",
          message: "already logged in",
        },
      });
    }

    if (regexForEmail.test(email)) {
      const response = await axios.post("/api/auth/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.encodedToken);
        notesDispatch({ type: "USER", payload: response.data.createdUser });
        authDispatch({ type: "CLEAR_SIGN_UP" });
        navigate(location?.state?.from?.pathname, { replace: true });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: getUniqueNumber(),
            className: "toast-success",
            message: "signed up successfully",
          },
        });
      }
    } else {
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-warning",
          message: "Enter proper email format!",
        },
      });
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: getUniqueNumber(),
        className: "toast-error",
        message: "error! check console",
      },
    });
  }
};

export { submitSignInDetails, submitSignUpDetails };
