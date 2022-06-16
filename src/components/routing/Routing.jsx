import { Routes, Route } from "react-router-dom";
import {
  ArchivePage,
  LandingPage,
  LogoutPage,
  NotesPage,
  SignInPage,
  SignUpPage,
  TrashPage,
  PageNotFound,
} from "pages";
import { RequireAuth } from "components";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Private routes */}
      <Route element={<RequireAuth />}>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/trash" element={<TrashPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
    </Routes>
  );
};

export { Routing };
