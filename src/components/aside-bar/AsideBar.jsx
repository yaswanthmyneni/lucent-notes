import {
  AiOutlineHome,
  MdOutlineLabel,
  BsArchive,
  FiTrash,
} from "assets/icons/icons";
import { NavLink } from "react-router-dom";
import { useNotesContext } from "context";
import clsx from "clsx";
import "./AsideBar.css";

const AsideBar = () => {
  const { notesDispatch } = useNotesContext();

  return (
    <aside className="aside-bar">
      <ul className="ul-none aside-ul">
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            clsx("aside-link flex flex-start cursor", {
              "active-link": isActive,
            })
          }
        >
          <AiOutlineHome className="m-r-1rem aside-icons" /> Notes
        </NavLink>
        <NavLink
          to="/label"
          className={({ isActive }) =>
            clsx("aside-link flex flex-start cursor", {
              "active-link": isActive,
            })
          }
        >
          <MdOutlineLabel className="m-r-1rem aside-icons" />
          Labels
        </NavLink>
        <NavLink
          to="/archive"
          className={({ isActive }) =>
            clsx("aside-link flex flex-start cursor", {
              "active-link": isActive,
            })
          }
        >
          <BsArchive className="m-r-1rem aside-icons" />
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
          <FiTrash className="m-r-1rem aside-icons" />
          Trash
        </NavLink>
      </ul>
      <button
        className="btn btn-primary aside-btn"
        onClick={() => notesDispatch({ type: "DISPLAY_MODAL", payload: true })}
      >
        create new note
      </button>
    </aside>
  );
};

export { AsideBar };
