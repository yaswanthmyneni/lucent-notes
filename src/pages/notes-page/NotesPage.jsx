import { AsideBar, NoteCard, NoteModal } from "components";
import { BiSearchAlt2, GoSettings } from "assets/icons/icons";
import { useNotesContext, useToastContext } from "context";
import { useEffect } from "react";
import { getNotes } from "utility";
import "./NotesPage.css";

const NotesPage = () => {
  // from notes context
  const {
    notesState: { user, isDisplayModal },
    notesDispatch,
  } = useNotesContext();
  const { notes } = user;

  // from toast context
  const { toastDispatch } = useToastContext();

  useEffect(() => {
    getNotes(notesDispatch, toastDispatch);
  }, [notesDispatch, toastDispatch]);

  return (
    <>
      <div className="page-wrapper">
        <AsideBar />
        <main className="notes-main">
          <div className="input-container notes-search-container">
            <BiSearchAlt2 />
            <input type="text" className="input notes-input" />
            <GoSettings className="filter-icon cursor" />
          </div>
          {notes?.length ? (
            // Object.keys(user).length > 0 &&
            notes.map((note) => <NoteCard key={note._id} note={note} />)
          ) : (
            <h1 className="text-center">The Notes Page is empty!</h1>
          )}
        </main>
      </div>
      {isDisplayModal && <NoteModal />}
    </>
  );
};

export { NotesPage };
