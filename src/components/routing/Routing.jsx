import { Routes, Route } from "react-router-dom";
import { LandingPage, LogoutPage, SignInPage, SignUpPage } from "pages";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export { Routing };
