import { AsideBar, FilterModal, NoteCard, NoteModal } from "components";
import { BiSearchAlt2, GoSettings } from "assets/icons/icons";
import { useNotesContext, useToastContext } from "context";
import { useEffect } from "react";
import { filterByLabel, filterByPriority, getNotes, sortByDate } from "utility";
import "./NotesPage.css";
import { useState } from "react";

const NotesPage = () => {
  const [isFilter, setIsFilter] = useState(false);
  // from notes context
  const {
    notesState: { user, isDisplayModal, label, priority, sortByLatest },
    notesDispatch,
  } = useNotesContext();
  const { notes } = user;

  // from toast context
  const { toastDispatch } = useToastContext();

  useEffect(() => {
    getNotes(notesDispatch, toastDispatch);
  }, [notesDispatch, toastDispatch]);

  // filters
  const filteredByLabel = filterByLabel(notes, label);
  const filteredByPriority = filterByPriority(filteredByLabel, priority);
  const filteredByDate = sortByDate(filteredByPriority, sortByLatest);

  return (
    <>
      <div className="page-wrapper">
        <AsideBar />
        <main className="notes-main">
          <div className="input-container notes-search-container">
            <BiSearchAlt2 />
            <label htmlFor="search-bar" className="notes-input-label">
              <input
                type="text"
                id="search-bar"
                className="input notes-input"
              />
            </label>
            <GoSettings
              className="filter-icon cursor"
              onClick={() => setIsFilter(!isFilter)}
            />
          </div>
          {isFilter && <FilterModal setIsFilter={setIsFilter} />}
          {filteredByDate?.length ? (
            filteredByDate.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))
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
