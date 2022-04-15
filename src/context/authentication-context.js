import { createContext, useContext, useReducer } from "react";

const AuthenticationContext = createContext();
const useAuthenticationContext = () => useContext(AuthenticationContext);

const authenticationReducer = (state, { type, payload }) => {
  switch (type) {
    case "EMAIL":
      return { ...state, email: payload };
    case "PASSWORD":
      return { ...state, password: payload };
    case "CONFIRM_PASSWORD":
      return { ...state, confirmPassword: payload };
    case "FIRST_NAME":
      return { ...state, firstName: payload };
    case "LAST_NAME":
      return { ...state, lastName: payload };
    case "CLEAR_SIGN_UP":
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    case "CLEAR_SIGN_IN":
      return {
        ...state,
        email: "",
        password: "",
      };
    default:
      return state;
  }
};

const AuthenticationProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authenticationReducer, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const value = { authState, authDispatch };
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { useAuthenticationContext, AuthenticationProvider };
