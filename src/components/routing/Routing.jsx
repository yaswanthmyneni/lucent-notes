import { Routes, Route } from "react-router-dom";
import {
  ArchivePage,
  LandingPage,
  LogoutPage,
  NotesPage,
  SignInPage,
  SignUpPage,
  TrashPage,
} from "pages";
import { RequireAuth } from "components";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/notes"
        element={
          <RequireAuth>
            <NotesPage />
          </RequireAuth>
        }
      />
      <Route
        path="/trash"
        element={
          <RequireAuth>
            <TrashPage />
          </RequireAuth>
        }
      />
      <Route
        path="/archive"
        element={
          <RequireAuth>
            <ArchivePage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export { Routing };
