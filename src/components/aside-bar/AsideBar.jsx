import {
  AiOutlineHome,
  MdOutlineLabel,
  BsArchive,
  FiTrash,
} from "assets/icons/icons";
import { NavLink } from "react-router-dom";
import { useNotesContext } from "context";
import "./AsideBar.css";

const AsideBar = () => {
  const { notesDispatch } = useNotesContext();

  return (
    <aside className="aside-bar">
      <ul className="ul-none aside-ul">
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            isActive
              ? "aside-link flex flex-start cursor active-link"
              : "aside-link flex flex-start cursor"
          }
        >
          <AiOutlineHome className="m-r-1rem aside-icons" /> Notes
        </NavLink>
        <NavLink
          to="/label"
          className={({ isActive }) =>
            isActive
              ? "aside-link flex flex-start cursor active-link"
              : "aside-link flex flex-start cursor"
          }
        >
          <MdOutlineLabel className="m-r-1rem aside-icons" />
          Labels
        </NavLink>
        <NavLink
          to="/archive"
          className={({ isActive }) =>
            isActive
              ? "aside-link flex flex-start cursor active-link"
              : "aside-link flex flex-start cursor"
          }
        >
          <BsArchive className="m-r-1rem aside-icons" />
          Archive
        </NavLink>
        <NavLink
          to="/trash"
          className={({ isActive }) =>
            isActive
              ? "aside-link flex flex-start cursor active-link"
              : "aside-link flex flex-start cursor"
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
