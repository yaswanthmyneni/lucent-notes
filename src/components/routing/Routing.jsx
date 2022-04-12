import { Routes, Route } from "react-router-dom";
import { LandingPage } from "pages";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export { Routing };
