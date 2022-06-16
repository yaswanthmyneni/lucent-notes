import "./navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  MdOutlineLabel,
  BsArchive,
  FiTrash,
  GiHamburgerMenu,
  IoLogOutOutline,
} from "assets/icons/icons";
import { useNotesContext } from "context";
import clsx from "clsx";

const Navigation = () => {
  const encodedToken = localStorage.getItem("token");
  const location = useLocation();

  const {
    notesState: { isHamburger },
    notesDispatch,
  } = useNotesContext();

  return (
    <header className="header">
      <div className="navbar-container">
        <GiHamburgerMenu
          className="hamburger"
          onClick={() =>
            notesDispatch({ type: "HAMBURGER", payload: !isHamburger })
          }
        />
        <NavLink className="navbar" to="/">
          <h1 className="navbar-m-lr-1">LUCENT NOTES</h1>
        </NavLink>
        {location.pathname === "/" && (
          <NavLink
            className="navbar navbar-m-left-auto"
            to="/notes"
            state={{ from: location }}
          >
            <h5 className="navbar-m-lr-1">NOTES</h5>
          </NavLink>
        )}
        {encodedToken && (
          <NavLink
            className={`navbar ${
              location.pathname === "/" ? "" : "navbar-m-left-auto"
            }`}
            to="/logout"
            onClick={() => {
              localStorage.clear();
            }}
          >
            <h5 className="navbar-m-lr-1">LOGOUT</h5>
            <IoLogOutOutline className="logout-icon" />
          </NavLink>
        )}
      </div>
      {isHamburger && (
        <aside className="aside-bar in-navigation">
          <ul className="ul-none aside-ul">
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                clsx("aside-link flex flex-start cursor", {
                  "active-link": isActive,
                })
              }
            >
              <AiOutlineHome
                onClick={() =>
                  notesDispatch({ type: "HAMBURGER", payload: false })
                }
                className="m-r-1rem aside-icons"
              />{" "}
              Notes
            </NavLink>
            <NavLink
              to="/archive"
              className={({ isActive }) =>
                clsx("aside-link flex flex-start cursor", {
                  "active-link": isActive,
                })
              }
            >
              <BsArchive
                onClick={() =>
                  notesDispatch({ type: "HAMBURGER", payload: false })
                }
                className="m-r-1rem aside-icons"
              />
              Archive
            </NavLink>
            <NavLink
              to="/trash"
              className={({ isActive }) =>
                clsx("aside-link flex flex-start cursor", {
                  "active-link": isActive,
                })
              }
            >
              <FiTrash
                onClick={() =>
                  notesDispatch({ type: "HAMBURGER", payload: false })
                }
                className="m-r-1rem aside-icons"
              />
              Trash
            </NavLink>
          </ul>
          {location.pathname === "/notes" && (
            <button
              className="btn btn-primary aside-btn"
              onClick={() => {
                notesDispatch({ type: "DISPLAY_MODAL", payload: true });
                notesDispatch({ type: "HAMBURGER", payload: false });
              }}
            >
              create new note
            </button>
          )}
        </aside>
      )}
    </header>
  );
};

export { Navigation };
